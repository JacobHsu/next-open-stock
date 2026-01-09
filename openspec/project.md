# Project Context

## Purpose
OpenStock is an open-source alternative to expensive market platforms. It provides real-time stock tracking, personalized alerts, and detailed company insights — built openly by the Open Dev Society, forever free. It is NOT a brokerage and does not provide financial advice.

## Tech Stack
- **Core**: Next.js 15 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS v4, shadcn/ui, Radix UI primitives, Lucide icons
- **Auth & Database**: Better Auth (email/password), MongoDB + Mongoose
- **Market Data**: Finnhub API (stock search, profiles, news), TradingView widgets (charts, heatmaps)
- **Automation**: Inngest (events, cron jobs, AI inference via Gemini)
- **Email**: Nodemailer (Gmail transport)
- **Utilities**: react-hook-form, cmdk (command palette), next-themes

## Project Conventions

### Code Style
- TypeScript strict mode enabled
- ESLint extends `next/core-web-vitals` and `next/typescript`
- Path aliases: `@/*` maps to project root
- Tailwind v4 (no separate config file) with CSS variables
- shadcn/ui "new-york" style components in `@/components/ui`
- Utility functions centralized in `@/lib/utils.ts`
- Class merging via `cn()` utility (clsx + tailwind-merge)

### Architecture Patterns
- **App Router**: Route groups `(auth)` and `(root)` for layout separation
- **Server Actions**: All data fetching in `lib/actions/*.ts` with `'use server'` directive
- **Client Components**: Minimal client-side code, use Server Actions for data
- **Caching**: React `cache()` for memoized server functions, Next.js `revalidate` for fetch
- **Composability**: Small UI primitives combined via composition (Radix + CVA)
- **Error Handling**: Graceful fallbacks with empty arrays, logged errors
- **Types**: Global types in `types/global.d.ts`, shared interfaces across modules

### Testing Strategy
- No dedicated test framework configured yet
- Manual testing via `pnpm test:db` for MongoDB connectivity
- `pnpm lint` for code quality

### Git Workflow
- Main branch: `main` / `master`
- Feature branches for contributions
- Conventional commit messages encouraged
- PRs welcome with screenshots for UI changes
- AGPL-3.0 license (copyleft - must release source for derivatives)

## Domain Context
- **Market Data**: Finnhub provides stock quotes, company profiles, and news (free tier may have delays)
- **TradingView**: Embedded widgets for charts (candlestick, baseline), technical analysis, company info
- **User Data**: Watchlist per user (MongoDB), unique symbol constraint per user
- **Automation**: 
  - `app/user.created` event → AI welcome email (Gemini)
  - Daily cron → Personalized news summary based on watchlist

## Important Constraints
- **Copyleft License**: AGPL-3.0 — any deployed version must open-source its source code
- **External APIs**: Finnhub rate limits, TradingView widgets require connectivity
- **Server-only secrets**: Keep API keys server-side; `NEXT_PUBLIC_*` variables exposed to browser
- **Email**: Gmail transport may require App Password if 2FA enabled

## External Dependencies
- **Finnhub API**: `FINNHUB_API_KEY` for market data
- **TradingView**: Widgets (no API key needed)
- **Google Gemini**: `GEMINI_API_KEY` for AI-generated welcome emails
- **Gmail**: `NODEMAILER_EMAIL` / `NODEMAILER_PASSWORD` for email delivery
- **Inngest**: Local dev via `npx inngest-cli@latest dev`
