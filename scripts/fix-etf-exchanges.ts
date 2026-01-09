#!/usr/bin/env tsx

import * as fs from 'fs/promises';
import * as path from 'path';
import { STOCK_EXCHANGE_MAP } from '../lib/constants';

interface Holding {
    name: string;
    displayName: string;
}

interface ETFConfig {
    symbol: string;
    name: string;
    sourceUrl: string;
    holdings: Holding[];
}

async function fixETFExchangeCodes(): Promise<void> {
    const dataDir = path.join(process.cwd(), 'public', 'data', 'etf-holdings');
    const files = await fs.readdir(dataDir);
    const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'EUAD.json');

    let totalFixed = 0;
    let totalErrors = 0;

    console.log('🔧 Fixing exchange codes in ETF holdings JSON files...\n');

    for (const file of jsonFiles) {
        const filePath = path.join(dataDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        let etf: ETFConfig;

        try {
            etf = JSON.parse(content);
        } catch (e) {
            console.error(`❌ Error parsing ${file}: ${e}`);
            totalErrors++;
            continue;
        }

        const fixedHoldings: Holding[] = [];
        let fileFixedCount = 0;

        for (const holding of etf.holdings) {
            const [currentExchange, ticker] = holding.name.split(':');
            const correctExchange = STOCK_EXCHANGE_MAP[ticker];

            if (correctExchange && currentExchange !== correctExchange) {
                console.log(`  🔄 ${file}: ${currentExchange}:${ticker} -> ${correctExchange}:${ticker}`);
                fixedHoldings.push({
                    name: `${correctExchange}:${ticker}`,
                    displayName: holding.displayName
                });
                fileFixedCount++;
            } else {
                fixedHoldings.push(holding);
            }
        }

        if (fileFixedCount > 0) {
            etf.holdings = fixedHoldings;
            await fs.writeFile(filePath, JSON.stringify(etf, null, 2), 'utf-8');
            console.log(`✅ ${file}: Fixed ${fileFixedCount} exchange codes`);
            totalFixed += fileFixedCount;
        } else {
            console.log(`✓ ${file}: No changes needed`);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 FIX SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total files processed: ${jsonFiles.length}`);
    console.log(`Total fixes applied: ${totalFixed}`);
    console.log(`Errors: ${totalErrors}`);
    console.log('\n✨ Exchange code fixing complete!');
}

fixETFExchangeCodes().catch(console.error);
