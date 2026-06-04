# 變更說明：React 與 GVC 展示頁整合

## 變更目的與背景

本次調整將前端首頁改為同時展示 React 與 GVC 兩種渲染方式，並整理 GVC 建置流程。
目標是讓 lowcode/sandbox 產物可透過獨立指令產生，同時讓主應用只聚焦在 React 頁面本身的編譯與展示。

## 主要修改檔案與模組

- `package.json`
  - 新增根目錄 `gvc:build`、`gvc:watch` 指令，統一從 workspace 觸發 GVC 編譯。
- `client/package.json`
  - 新增 `gvc:clean`、`gvc:build`、`gvc:watch` 指令，將 sandbox 與 lowcode bundle 編譯拆開管理。
- `client/tsconfig.app.json`
  - 排除 `src/lib/lowcode` 與 `src/lib/sandbox`，避免主應用 build 被 lowcode 原始碼阻塞。
- `client/src/App.tsx`
  - 首頁改為組合 Header、Main、Footer，並同時掛載 GVC 與 React 頁面。
- `client/src/pages/GvcPage.tsx`
  - 保留 GVC 初始化邏輯，作為 GVC 區塊展示頁。
- `client/src/pages/ReactPage.tsx`、`client/src/layouts/**`、`client/src/react-view/**`
  - 新增 React 展示頁與頁面排版元件。
- `client/src/lib/sandbox/home.ts`、`client/src/lib/sandbox/pages/CounterGVC.ts`
  - 新增 GVC counter 範例並更新 sandbox 入口。
- `client/public/sandbox/**`
  - 同步最新 sandbox 編譯輸出，移除不再使用的舊產物。

## 核心邏輯調整說明

1. 主應用與 GVC 編譯解耦：
   - React app build 不再直接檢查 `src/lib/lowcode` 與 `src/lib/sandbox` 原始碼。
   - GVC 相關資源改由 `gvc:build` / `gvc:watch` 單獨管理。
2. 首頁展示結構調整：
   - `App.tsx` 改為頁框佈局，`Main` 內同時放入 `GvcPage` 與 `ReactPage`。
3. sandbox 範例更新：
   - `home.ts` 使用 `CounterGVC` 展示可重複掛載的 GVC counter 元件。
4. 編譯產物整理：
   - 清理舊的 sandbox lowcode 輸出與未使用頁面，只保留目前示例需要的產物。

## 測試或驗證方式與結果

- 指令：`pnpm gvc:build`
- 結果：成功（exit code 0）。
- 指令：`pnpm --filter ./client build`
- 結果：成功（exit code 0），完成 `tsc -b && vite build`。
- 補充：對本次修改檔案執行敏感關鍵字掃描，未發現明顯憑證或連線字串。

## 可能影響範圍與注意事項

- 之後若修改 `src/lib/lowcode` 或 `src/lib/sandbox`，需額外執行 `pnpm gvc:build` 才會更新對應產物。
- `client/public/sandbox` 目前只保留本次展示所需頁面，若依賴舊頁面路徑需同步調整。
- 主應用 build 與 GVC build 已分流，CI 若需要完整驗證，應同時執行兩組指令。
