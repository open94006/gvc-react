# 變更目的與背景

本次調整主要補齊 React Router 相對路徑導覽行為，並新增 Zustand 狀態共享示範頁與 useRef 重渲染示範頁，讓 `Home` 下的子路由切換與 demo 動線更一致。

## 主要修改檔案與模組

- `client/src/routers/MainRouter.tsx`
- `client/src/react-view/zustand/ZustandAddView.tsx`
- `client/src/react-view/zustand/ZustandCountView.tsx`
- `client/src/react-view/UseRefDemo.tsx`
- `client/src/react-view/zustand-demo/UseConfigStore.tsx`
- `client/src/react-view/zustand-demo/ZustandDemoView.tsx`
- `client/src/react-view/zustand-demo/Preview.tsx`

## 核心邏輯調整說明

1. 將 `zustandAdd` 路由改為 `Home` 子路由相對路徑，並同步修正 `navigate` 方式：
   - `navigate('/zustandAdd')` 改為 `navigate('zustandAdd')`
   - `navigate('/')` 改為 `navigate('..')`
2. 新增 `useRef` 教學範例元件 `UseRefDemo`，展示 ref 變動不會觸發重新渲染。
3. 新增 `zustand-demo` 模組：
   - `UseConfigStore.tsx` 建立共享狀態 `text`
   - `ZustandDemoView.tsx` 提供輸入與寫入狀態流程
   - `Preview.tsx` 讀取 store 並支援回上一層編輯頁
4. 在 `MainRouter` 新增對應路由：
   - `useRefDemo`
   - `/zustandDemo` 與其 `preview` 子路由

## 測試或驗證方式與結果

- 執行命令：`pnpm --dir client build`
- 結果：成功完成 TypeScript 編譯與 Vite 打包，無建置錯誤。

## 可能影響範圍與注意事項

- `Home` 下既有子路由的導覽邏輯已改為相對路徑寫法，後續新增同層路由時建議維持一致。
- `zustand-demo` 為示範頁，不影響既有商業流程，但會增加前端路由入口。
