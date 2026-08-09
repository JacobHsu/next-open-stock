#!/usr/bin/env tsx
/**
 * Update the QQQ (Nasdaq-100) constituent list in lib/configs/nasdaq100-config.ts.
 *
 * Runs from CI (the monthly "Update ETF Holdings" workflow). Source is the
 * official Nasdaq index API — Nasdaq is the index provider, so it is the
 * authoritative list. Every Nasdaq-100 member is Nasdaq-listed by definition,
 * so the exchange is always NASDAQ.
 *
 * Fails closed: if the API is unreachable/blocked or returns an implausibly
 * short list, the script exits non-zero WITHOUT writing, so the workflow never
 * commits a garbled config. The list is sorted alphabetically by ticker so the
 * diff is STABLE — it only changes on real index reconstitutions, keeping the
 * workflow's commit-on-diff step quiet the rest of the year.
 */

import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';

const NASDAQ_API_URL = 'https://api.nasdaq.com/api/quote/list-type/nasdaq100';
const CONFIG_PATH = path.join(process.cwd(), 'lib', 'configs', 'nasdaq100-config.ts');
const MIN_EXPECTED = 90; // safety floor: never overwrite with a short/garbled list

interface Holding {
  symbol: string;
  name: string;
}

function cleanName(raw: string): string {
  return raw
    .replace(/\[[^\]]*\]/g, '') // footnote markers
    .replace(/\s+Class [A-Z].*$/i, '')
    .replace(/\s+Series [A-Z].*$/i, '')
    .replace(/\s+Ordinary Shares.*$/i, '')
    .replace(/\s+American Depositary Shares.*$/i, '')
    .replace(/\s+Capital Stock.*$/i, '')
    .replace(/\s+Common Stock.*$/i, '')
    .replace(/\s+\([^)]*\)\s*$/, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function escapeForSingleQuote(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

interface NasdaqApiRow {
  symbol: string;
  companyName: string;
}

/** Fetch the Nasdaq-100 constituents from the official Nasdaq index API. */
async function fetchHoldings(): Promise<Holding[]> {
  const { data } = await axios.get(NASDAQ_API_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      Accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    timeout: 30_000,
  });

  const rows: NasdaqApiRow[] = data?.data?.data?.rows ?? [];

  return rows
    .map((row) => ({
      symbol: String(row.symbol ?? '').trim().toUpperCase(),
      name: cleanName(String(row.companyName ?? '')),
    }))
    .filter((holding) => holding.symbol && holding.name);
}

/** Read the current QQQ tickers from the config for diff reporting. */
function extractCurrentQqqSymbols(configSource: string): string[] {
  const qqqIdx = configSource.indexOf("name: 'QQQ'");
  const symOpen = configSource.indexOf('symbols: [', qqqIdx);
  const arrEnd = configSource.indexOf('\n            ],', symOpen);
  if (qqqIdx === -1 || symOpen === -1 || arrEnd === -1) return [];

  const block = configSource.slice(symOpen, arrEnd);
  return [...block.matchAll(/name:\s*'NASDAQ:([A-Z.]+)'/g)].map((m) => m[1]);
}

/** Rewrite the QQQ symbols array in the config with the new holdings. */
function spliceIntoConfig(configSource: string, holdings: Holding[]): string {
  const qqqIdx = configSource.indexOf("name: 'QQQ'");
  const symOpen = configSource.indexOf('symbols: [', qqqIdx);
  const arrStart = symOpen + 'symbols: ['.length;
  const arrEnd = configSource.indexOf('\n            ],', arrStart);

  if (qqqIdx === -1 || symOpen === -1 || arrEnd === -1) {
    throw new Error('Could not locate the QQQ symbols array in the config');
  }

  const lines = holdings.map((h) => {
    const displayName = escapeForSingleQuote(`${h.symbol} - ${h.name}`);
    return `                { name: 'NASDAQ:${h.symbol}', displayName: '${displayName}' },`;
  });

  const before = configSource.slice(0, arrStart);
  const after = configSource.slice(arrEnd); // starts with "\n            ],"
  const next = `${before}\n${lines.join('\n')}${after}`;

  if (!next.includes("name: 'EWT'")) {
    throw new Error('Sanity check failed: EWT group missing after splice');
  }
  return next;
}

async function main(): Promise<void> {
  console.log(`📡 Fetching Nasdaq-100 constituents from ${NASDAQ_API_URL}`);
  const holdings = (await fetchHoldings()).sort((a, b) => a.symbol.localeCompare(b.symbol));

  if (holdings.length < MIN_EXPECTED) {
    throw new Error(
      `Refusing to update: only parsed ${holdings.length} holdings (expected >= ${MIN_EXPECTED}). ` +
        `Upstream may be blocked or its response shape changed.`
    );
  }

  const configSource = await fs.readFile(CONFIG_PATH, 'utf-8');
  const current = new Set(extractCurrentQqqSymbols(configSource));
  const incoming = new Set(holdings.map((h) => h.symbol));

  const added = [...incoming].filter((s) => !current.has(s));
  const removed = [...current].filter((s) => !incoming.has(s));

  console.log(`✅ Parsed ${holdings.length} constituents`);
  if (added.length === 0 && removed.length === 0) {
    console.log('ℹ️  No membership change vs current config.');
  } else {
    console.log(`➕ ADD (${added.length}): ${added.join(', ') || '—'}`);
    console.log(`➖ REMOVE (${removed.length}): ${removed.join(', ') || '—'}`);
  }

  const next = spliceIntoConfig(configSource, holdings);
  if (next === configSource) {
    console.log('💤 Config already up to date — no write.');
    return;
  }

  await fs.writeFile(CONFIG_PATH, next, 'utf-8');
  console.log(
    `💾 Updated ${path.relative(process.cwd(), CONFIG_PATH)} with ${holdings.length} QQQ holdings`
  );
}

main().catch((error) => {
  console.error('❌ update-nasdaq100 failed:', error instanceof Error ? error.message : error);
  process.exit(1);
});
