# ETF Holdings 自動更新系統

## 概述

本系統提供自動化的 ETF holdings 數據更新機制，解決以下問題：
- ✅ ETF 數量多，手動維護成本高
- ✅ stockanalysis.com 權重會變化，需要定期更新
- ✅ 自動驗證交易所標籤（NYSE vs NASDAQ）
- ✅ GitHub Actions 每月自動更新

## 系統架構

```
scripts/update-etf-holdings.ts  → 更新腳本（爬取 + 驗證交易所）
public/data/etf-holdings/       → JSON 數據存放目錄
.github/workflows/               → GitHub Actions 自動化
```

## 手動更新

### 更新單個 ETF

```bash
npm run update-etf VGT
```

### 更新多個 ETF

```bash
npm run update-etf -- --symbols VGT,VFH,VHT
```

或

```bash
npm run update-etf VGT VFH VHT
```

### 更新所有 Vanguard ETF

```bash
npm run update-etf:vanguard
```

## 自動更新（GitHub Actions）

### 排程更新

- **頻率**: 每月 1 號凌晨 2:00 UTC
- **範圍**: 所有 Vanguard ETF
- **自動化**: 自動 commit 並 push 更新

### 手動觸發

1. 前往 GitHub Actions 頁面
2. 選擇 "Update ETF Holdings" workflow
3. 點擊 "Run workflow"
4. 輸入要更新的 ETF symbols（或使用預設值 "all-vanguard"）

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
npm run update-etf QQQ
```

### 2. 批量新增

修改 `scripts/update-etf-holdings.ts`，在 `main()` 函數中加入你的 ETF list：

```typescript
const myETFs = ['QQQ', 'SPY', 'IWM', 'DIA'];
```

然後執行：

```bash
npm run update-etf -- --symbols QQQ,SPY,IWM,DIA
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

## 已支援的 Vanguard ETF

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
