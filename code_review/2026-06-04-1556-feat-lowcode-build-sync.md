# 變更說明：lowcode 與 sandbox 編譯輸出同步調整

## 變更目的與背景

本次調整聚焦在 lowcode 原始碼、sandbox 產物與前端入口的同步。
目標是讓本地開發可用 `build:bundle` 與 `build:sandbox` 穩定產出，並讓頁面入口與目錄命名一致，降低後續維護成本。

## 主要修改檔案與模組

- `client/package.json`
  - 新增/調整 `build:bundle`、`build:sandbox`、`build:watch` 等腳本，將編譯流程拆分。
- `client/src/lib/lowcode/**`
  - 同步 lowcode 源碼與相依靜態資源。
- `client/public/lowcode/**`、`client/public/sandbox/**`
  - 同步最新編譯輸出與 sourcemap 相關檔案。
- `client/src/lib/sandbox/**`
  - 調整 sandbox 入口與頁面檔案結構。
- `client/src/pages/GvcPage.tsx`、`client/src/App.tsx`
  - 將頁面元件路徑統一到 `pages`，並更新 App 入口引用。
- `code-review/*` 與 `code_review/*`
  - 既有說明文件路徑改為 `code_review`，維持規範一致。
- `ai/git-commit-rule.md`
  - 更新提交規範內容（含白名單條目與目錄命名）。

## 核心邏輯調整說明

1. 編譯流拆分：

- 以 `build:bundle` 負責 `public/lowcode/glitterBundle` 編譯。
- 以 `build:sandbox` 負責 `src/lib/sandbox` 編譯。

2. 產物與源碼同步：

- `src/lib/lowcode`、`public/lowcode`、`public/sandbox` 三者同步更新，避免執行時版本落差。

3. 頁面結構整理：

- `GvcPage` 調整到 `src/pages`，並更新 `App.tsx` import，讓頁面路徑更一致。

4. 文件路徑一致化：

- 由 `code-review` 轉為 `code_review`，符合現行提交規範。

## 測試或驗證方式與結果

- 指令：`npm run build:bundle`
- 結果：成功（exit code 0）。
- 指令：`npm run build:sandbox`
- 結果：成功（exit code 0）。
- 補充：針對本次修改檔案執行敏感關鍵字掃描，未發現明顯憑證與連線字串洩漏情況。

## 可能影響範圍與注意事項

- lowcode 與 sandbox 產物檔案數量較多，後續若需精簡版控體積可再討論是否引入產物管理策略。
- 本次包含規範文件與路徑整理，若其他同事仍使用舊路徑 `code-review`，需同步更新工作習慣。
