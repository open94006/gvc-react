import { useEffect, useState } from 'react';

export function RenderReact() {
  // []：只在 mount 後執行一次
  useEffect(() => {
    console.log('React-1: 僅第一次掛載後執行一次');
  }, []);

  // 無填寫：每次 render 後都執行
  useEffect(() => {
    console.log(`React-2: 每次 render 後都執行 (data: ${String(data)}, count: ${count})`);
  });

  // [data]：data 改變後才執行
  const [count, setCount] = useState(0);
  const [data, setData] = useState(true);
  useEffect(() => {
    console.log(`React-3: data 產生變化才執行 (data: ${String(data)}, count: ${count})`);
  }, [data]);

  return (
    <div>
      <h3>2. Render</h3>
      <div>{data ? '元件已顯示' : '元件已隱藏'}</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        <button
          onClick={() => {
            setCount(() => count + 1);
            setData(true);
          }}
        >
          true
        </button>
        <button
          onClick={() => {
            setCount(() => count - 1);
            setData(false);
          }}
        >
          false
        </button>
      </div>
    </div>
  );
}
