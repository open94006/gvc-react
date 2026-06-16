# 變更說明：整合 React Router 與 Zustand 對照示例

## 變更目的與背景

本次調整在既有 GVC/React 對照頁上，加入 React Router 與 Zustand 的示例流程，
並補充 React 端更多互動示範（隨機 ID、表單、全域狀態切頁）。

## 主要修改檔案與模組

- `client/src/App.tsx`
  - 入口改為 `RouterProvider`，由路由控管主畫面。
- `client/src/routers/MainRouter.tsx`
  - 新增主路由設定，包含 `Home` 與 `/zustandAdd` 頁面。
- `client/src/react-view/Home.tsx`
  - 新增 Home 組件，整合 `Main`、`GvcPage`、`ReactPage`。
- `client/src/pages/ReactPage.tsx`
  - 新增 `ZustandCountView`、`CallRandomIdReact`，擴充對照範例。
- `client/src/react-view/zustand/*`
  - 新增 Zustand store 與兩個頁面（count view / add view）。
- `client/src/react-view/CounterReact.tsx`
  - 調整為 styled-components 寫法。
- `client/src/react-view/RenderReact.tsx`
  - 調整 render 示範內容。
- `client/src/react-view/FormReact.tsx`、`client/src/react-view/RenameReact.tsx`
  - 新增 React 互動示例。
- `client/src/lib/sandbox/home.ts`
  - GVC 入口加入 `GlobalValueGVC`。
- `client/src/lib/sandbox/pages/CounterGVC.ts`
  - 調整 GVC counter 示範。
- `client/src/lib/sandbox/pages/GlobalValueGVC.ts`
  - 新增 GVC 全域狀態示範。
- `client/public/sandbox/**`
  - 同步最新 sandbox 編譯輸出檔。
- `client/package.json`、`client/pnpm-lock.yaml`
  - 新增 `styled-components` 相關依賴與 lockfile。
- `memo.md`
  - 新增本次 GVC/React 對照學習心得筆記。

## 核心邏輯調整說明

1. 路由化入口：
   - React app 以 `react-router` 控制頁面流，`Home` 為主展示頁，`/zustandAdd` 為全域狀態操作頁。
2. 全域狀態對照：
   - 使用 Zustand 建立 `useCounter` store，在兩個頁面間共享/更新 `count`。
3. React 互動示範擴充：
   - 補上 `CallRandomIdReact`、`FormReact`、`RenameReact`，強化和 GVC 對照學習情境。
4. GVC 端同步：
   - `home.ts` 與 `GlobalValueGVC.ts` 對齊 React 全域狀態示範。

## 測試或驗證方式與結果

- 指令：`pnpm gvc:build`
- 結果：成功（exit code 0）。
- 指令：`pnpm --filter ./client build`
- 結果：成功（exit code 0），完成 `tsc -b && vite build`。
- 補充：對本次修改與新增檔案執行敏感關鍵字掃描，未發現明顯憑證或連線字串。

## 可能影響範圍與注意事項

- 入口改為路由模式後，若後續新增頁面需同步更新 `MainRouter.tsx`。
- `public/sandbox` 為編譯產物，修改 sandbox 原始碼後需再次執行 `pnpm gvc:build`。
- Zustand 為全域狀態管理，重整頁面後資料會回到初始值；若需持久化可再加 storage 機制。
