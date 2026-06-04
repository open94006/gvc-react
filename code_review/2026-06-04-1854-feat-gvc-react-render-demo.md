# 變更說明：新增 GVC 與 React 的 Render 生命週期示例

## 變更目的與背景

本次調整在既有 React/GVC 對照頁面中補上「Render 行為」示例，
讓開發者可同時觀察 GVC 與 React 在初始化、重繪、銷毀時機的差異。

## 主要修改檔案與模組

- `client/src/lib/sandbox/pages/RenderGVC.ts`
  - 新增 GVC 版 Render 示範元件，展示 `onInitial`、`onCreate`、`onDestroy` 觸發時機。
- `client/src/lib/sandbox/pages/CounterGVC.ts`
  - 調整/整理既有 Counter 元件，配合新示例頁整合。
- `client/src/lib/sandbox/home.ts`
  - 將 `RenderGVC` 納入 sandbox 首頁輸出。
- `client/src/react-view/RenderReact.tsx`
  - 新增 React 版 Render 示範元件，對應 `useEffect` 不同依賴策略。
- `client/src/pages/ReactPage.tsx`
  - React 對照頁新增 `RenderReact` 顯示。
- `client/public/sandbox/pages/RenderGVC.js` 與相關 map
  - 新增對應 sandbox 編譯產物。
- `client/public/sandbox/home.js`、`client/public/sandbox/pages/CounterGVC.js`
  - 同步編譯後產物。
- `client/src/lib/lowcode/glitterBundle/module/PageManager.ts`、`client/public/lowcode/glitterBundle/module/PageManager.ts`
  - 同步 lowcode bundle 相關變更與輸出檔。

## 核心邏輯調整說明

1. GVC Render 示範：
   - `RenderGVC` 透過內層/外層 `bindView` 控制 widget 生命週期，
     並以按鈕觸發「重繪」與「移除」來觀察 callback。
2. React Render 示範：
   - `RenderReact` 使用多組 `useEffect`（`[]`、無依賴、`[data]`）展示對應觸發時機。
3. 對照頁整合：
   - `ReactPage` 與 sandbox `home` 都加入 Render 示例，形成可直接比較的操作介面。

## 測試或驗證方式與結果

- 指令：`pnpm gvc:build`
- 結果：成功（exit code 0）。
- 指令：`pnpm --filter ./client build`
- 結果：成功（exit code 0），完成 `tsc -b && vite build`。
- 補充：對本次變更檔案進行敏感關鍵字掃描，未發現明顯憑證或連線字串。

## 可能影響範圍與注意事項

- `public/sandbox` 為編譯產物，若後續修改 `src/lib/sandbox` 內容需重新執行 `pnpm gvc:build` 同步。
- `PageManager` 的同步變更會影響低代碼頁面渲染流程，後續若再調整請一併更新輸出檔。
