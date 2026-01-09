# ETF Holdings 自動更新系統

## 概述

本系統提供自動化的 ETF holdings 數據更新機制，解決以下問題：
- ✅ ETF 數量多，手動維護成本高
- ✅ stockanalysis.com 權重會變化，需要定期更新
- ✅ 自動驗證交易所標籤（NYSE vs NASDAQ）
- ✅ GitHub Actions 每月自動更新
- ✅ 支援多 Provider（Vanguard、SPDR、iShares）

## 系統架構

```
scripts/update-etf-holdings.ts  → 更新腳本（爬取 + 驗證交易所）
public/data/etf-holdings/       → JSON 數據存放目錄
.github/workflows/               → GitHub Actions 自動化
```

## 支援的 ETF Providers

| Provider | ETFs 數量 | 說明 |
|----------|-----------|------|
| Vanguard | 11 | 部門型 ETF（科技、金融、能源等） |
| SPDR | 11 | Sector Select SPDR Fund 系列 |
| iShares US | 11 | iShares U.S. 系列部門 ETF |

### Vanguard ETFs
- VGT - Vanguard Information Technology ETF
- VFH - Vanguard Financials ETF
- VDE - Vanguard Energy ETF
- VHT - Vanguard Health Care ETF
- VIS - Vanguard Industrials ETF
- VDC - Vanguard Consumer Staples ETF
- VCR - Vanguard Consumer Discretionary ETF
- VAW - Vanguard Materials ETF
- VNQ - Vanguard Real Estate ETF
- VPU - Vanguard Utilities ETF
- VOX - Vanguard Communication Services ETF

### SPDR ETFs
- XLK - Technology Select Sector SPDR Fund
- XLF - Financial Select Sector SPDR Fund
- XLE - Energy Select Sector SPDR Fund
- XLV - Health Care Select Sector SPDR Fund
- XLI - Industrial Select Sector SPDR Fund
- XLP - Consumer Staples Select Sector SPDR Fund
- XLY - Consumer Discretionary Select Sector SPDR Fund
- XLB - Materials Select Sector SPDR Fund
- XLRE - Real Estate Select Sector SPDR Fund
- XLU - Utilities Select Sector SPDR Fund
- XLC - Communication Services Select Sector SPDR Fund

### iShares US ETFs
- IYW - iShares U.S. Technology ETF
- IYF - iShares U.S. Financials ETF
- IYE - iShares U.S. Energy ETF
- IYH - iShares U.S. Healthcare ETF
- IYJ - iShares U.S. Industrials ETF
- IYK - iShares U.S. Consumer Staples ETF
- IYC - iShares U.S. Consumer Discretionary ETF
- IYM - iShares U.S. Basic Materials ETF
- IYR - iShares U.S. Real Estate ETF
- IDU - iShares U.S. Utilities ETF
- IYZ - iShares U.S. Telecommunications ETF

## 手動更新

### 更新單個 ETF

```bash
pnpm run update-etf VGT
```

### 更新多個 ETF

```bash
pnpm run update-etf -- --symbols VGT,VFH,VHT
```

或

```bash
pnpm run update-etf VGT VFH VHT
```

### 批次更新（按 Provider）

#### 更新所有 Vanguard ETF

```bash
pnpm run update-etf:vanguard
```

或

```bash
tsx scripts/update-etf-holdings.ts --all-vanguard
```

#### 更新所有 SPDR ETF

```bash
pnpm run update-etf:spdr
```

或

```bash
tsx scripts/update-etf-holdings.ts --all-spdr
```

#### 更新所有 iShares US ETF

```bash
pnpm run update-etf:ishares
```

或

```bash
tsx scripts/update-etf-holdings.ts --all-ishares
```

#### 更新所有 Providers（33 ETFs）

```bash
pnpm run update-etf:all
```

或

```bash
tsx scripts/update-etf-holdings.ts --all
```

### 使用 Provider 參數

```bash
tsx scripts/update-etf-holdings.ts --provider spdr
tsx scripts/update-etf-holdings.ts --provider ishares
tsx scripts/update-etf-holdings.ts --provider vanguard
```

## 自動更新（GitHub Actions）

### 排程更新

- **頻率**: 每月 1 號凌晨 2:00 UTC
- **範圍**: 所有 Providers（33 ETFs）
- **自動化**: 自動 commit 並 push 更新

### 手動觸發

1. 前往 GitHub Actions 頁面
2. 選擇 "Update ETF Holdings" workflow
3. 點擊 "Run workflow"
4. 選擇更新方式：
   - **Provider**: vanguard, spdr, ishares, 或 all（預設）
   - **Symbols**: 自訂 ETF 符號（覆蓋 Provider 選項）

## 交易所驗證機制

腳本使用三層驗證機制確保交易所標籤正確：

1. **已知映射表** (最快)
   - 內建常見股票的交易所映射
   - 無需 API 呼叫，速度快

2. **Finnhub API** (備用)
   - 對於未知股票，使用 Finnhub API 查詢
   - 需要設定 `FINNHUB_API_KEY` 環境變數

3. **快取機制**
   - 同一次執行中，已查詢的股票會被快取
   - 避免重複 API 呼叫

## 設定 Finnhub API Key

### 本地開發

在 `.env` 檔案中加入：

```env
FINNHUB_API_KEY=your_api_key_here
```

### GitHub Actions

1. 前往 Repository Settings > Secrets and variables > Actions
2. 新增 Secret: `FINNHUB_API_KEY`
3. 值為你的 Finnhub API key

## 新增 ETF

### 1. 手動新增單個 ETF

```bash
pnpm run update-etf QQQ
```

### 2. 批量新增

修改 `scripts/update-etf-holdings.ts`，在 `ALL_PROVIDERS` 物件中加入你的 ETF：

```typescript
const ISHARES_ETFS = [
    'IYW', 'IYF', 'IYE', 'IYH', 'IYJ', 'IYK', 'IYC', 'IYM', 'IYR', 'IDU', 'IYZ',
    'QQQ', 'SPY', 'IWM', 'DIA',  // 新增
];
```

然後執行：

```bash
pnpm run update-etf -- --symbols QQQ,SPY,IWM,DIA
```

### 3. 更新 GitHub Actions

如果想讓 GitHub Actions 也自動更新新加入的 ETF，修改腳本中的 ETF list。

## 數據格式

每個 ETF 的 JSON 檔案格式：

```json
{
  "symbol": "VGT",
  "name": "Vanguard Information Technology ETF",
  "sourceUrl": "https://stockanalysis.com/etf/vgt/holdings/",
  "holdings": [
    {
      "name": "NASDAQ:NVDA",
      "displayName": "NVDA - NVIDIA Corporation (16.61%)"
    }
  ]
}
```

## 使用數據

在 Next.js 頁面中使用：

```typescript
import { fetchETFHoldings } from '@/lib/types/etf-holdings';

const etfData = await fetchETFHoldings('VGT');
if (etfData) {
  console.log(etfData.holdings);
}
```

## 故障排除

### 問題：交易所標籤錯誤

**解決方案**：
1. 檢查是否有設定 `FINNHUB_API_KEY`
2. 如果是常見股票，可以加入到 `KNOWN_EXCHANGES` 映射表中

### 問題：抓取失敗

**可能原因**：
- stockanalysis.com 網站結構改變
- 網路連線問題
- Rate limiting

**解決方案**：
1. 檢查網站是否可訪問
2. 增加延遲時間（腳本中的 `setTimeout`）
3. 手動重試

### 問題：GitHub Actions 失敗

**檢查**：
1. `FINNHUB_API_KEY` secret 是否設定
2. 查看 Actions log 確認錯誤訊息

## 維護建議

- 每月自動更新已足夠（權重變化不頻繁）
- 新增 ETF 時建議手動執行一次確認
- 定期檢查 GitHub Actions log
- 監控 33 個 ETF JSON 檔案的完整性
