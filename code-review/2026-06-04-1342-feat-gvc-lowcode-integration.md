# 變更說明：GVC lowcode runtime 整合

## 變更目的與背景

本次調整將前端入口由原本示範用的 React + Express API 呼叫頁，改為載入 GVC lowcode runtime。
目標是讓 React 應用啟動後，直接進入 lowcode 頁面渲染流程，作為後續 lowcode 編輯器與頁面能力整合基礎。

## 主要修改檔案與模組

- `.gitignore`
  - 新增 `.vscode/` 忽略規則。
- `client/src/App.tsx`
  - 移除舊有 API demo，改為渲染 `GvcPage`。
- `client/src/gvc-pages/GvcPage.tsx`
  - 新增 GVC 頁面元件；初始化時動態注入 jQuery 與 sandbox 初始化腳本。
- `client/src/global.d.ts`
  - 補充全域型別宣告（`$`、`Swal`、`Storage` 擴充）。
- `client/eslint.config.js`
  - 調整 ignore 路徑，排除 `public` 與 `src/lib/sandbox`。
- `client/tsconfig.app.json`
  - 排除 `src/lib/sandbox`，避免非 app 主程式碼影響型別建置。
- `client/public/lowcode/**`、`client/public/sandbox/**`
  - 新增 lowcode runtime 與靜態資源。
- `client/src/lib/sandbox/**`
  - 新增 sandbox 程式碼與對應輸出檔。

## 核心邏輯調整說明

1. App 入口改為 lowcode 導向：
   - `App.tsx` 直接渲染 `GvcPage`，不再依賴後端 `api/hello`。
2. GVC 初始化機制：
   - `GvcPage` 於掛載時注入 `jquery.js`，其載入完成後再注入 `/sandbox/GlitterInitial.js`。
   - 透過 `window.__gvcInitialized` 防止重複初始化。
3. 工具鏈相容性調整：
   - ESLint 與 TypeScript 設定排除 lowcode/sandbox 產物，降低非核心碼干擾。

## 測試或驗證方式與結果

- 指令：`pnpm --filter ./client build`
- 結果：成功完成 `tsc -b && vite build`，產生 dist 輸出，無建置錯誤。
- 補充：對 staged 變更檔案執行敏感關鍵字掃描，未發現明顯憑證或連線字串外洩。

## 可能影響範圍與注意事項

- 前端首頁行為已由 demo API 顯示改為 lowcode runtime 初始化。
- 若 lowcode runtime 對外部全域（例如 jQuery）有相依，需確保部署路徑與載入順序維持一致。
- `public/lowcode` 與 `src/lib/sandbox` 內容量較大，後續若要精簡可再規劃拆分與資產管理策略。
