# 變更說明：擴充 React/GVC 的改名與表單示例

## 變更目的與背景

本次調整延伸既有 React 與 GVC 對照頁，新增「改名」與「表單儲存」示例，
讓兩種寫法可在同一頁面下直接比較互動行為與資料更新方式。

## 主要修改檔案與模組

- `client/src/pages/ReactPage.tsx`
  - React 展示頁新增 `RenameReact`、`FormReact` 區塊。
- `client/src/react-view/FormReact.tsx`
  - 新增 React 表單示例（姓名、手機、標籤輸入與儲存輸出）。
- `client/src/react-view/RenameReact.tsx`
  - 新增 React 改名示例（state 更新自動重繪）。
- `client/src/lib/sandbox/pages/FormGVC.ts`
  - 新增 GVC 表單示例，對應 React 版行為。
- `client/src/lib/sandbox/pages/RenameReact.ts`
  - 新增 GVC 改名示例，展示資料改變後畫面更新。
- `client/src/lib/sandbox/pages/RenderGVC.ts`
  - 既有 render 示例調整。
- `client/src/lib/sandbox/home.ts`
  - sandbox 首頁整合新增示例輸出。
- `client/public/sandbox/home.js`、`client/public/sandbox/pages/*.js`
  - 同步最新 sandbox 編譯產物（含 FormGVC、RenameReact、RenderGVC）。
- `client/src/lib/lowcode/glitterBundle/module/PageManager.ts`
  - lowcode bundle 相關模組同步更新與輸出檔。

## 核心邏輯調整說明

1. React 側新增對照元件：
   - `RenameReact` 用 `useState` 示範資料變更觸發重繪。
   - `FormReact` 示範多欄位表單、Enter 新增標籤與資料輸出。
2. GVC 側新增對照元件：
   - `FormGVC` 以 `gvc.bindView` 維護表單狀態並透過 `notifyDataChange` 更新畫面。
   - `RenameGVC` 示範資料更新後的重新渲染行為。
3. 展示頁整合：
   - `ReactPage` 與 sandbox `home` 同步納入新示例，維持 React/GVC 對照一致。

## 測試或驗證方式與結果

- 指令：`pnpm gvc:build`
- 結果：成功（exit code 0）。
- 指令：`pnpm --filter ./client build`
- 結果：成功（exit code 0），完成 `tsc -b && vite build`。
- 補充：針對本次變更與新增檔案執行敏感關鍵字掃描，未發現明顯憑證或連線字串。

## 可能影響範圍與注意事項

- `public/sandbox` 為編譯產物，後續若調整 sandbox 原始碼需再次執行 `pnpm gvc:build`。
- 新增示例會影響展示頁內容順序與輸出體積，若要縮減可再拆為可選載入。
- `GlobalValue` 相關檔案目前僅先建立，若要啟用需補上實際邏輯與頁面掛載。
