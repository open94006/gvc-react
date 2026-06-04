import { useEffect, useState } from 'react';

export function RenderReact() {
  // []：只在 mount 後執行一次
  useEffect(() => {
    console.log('React-1: 僅第一次掛載後執行一次');
  }, []);

  // 無填寫：每次 render 後都執行
  useEffect(() => {
    console.log(`React-2: 每次 render 後都執行 (data=${String(data)})`);
  });

  // [data]：data 改變後才執行
  const [data, setData] = useState(true);
  useEffect(() => {
    if (data) {
      console.log('React-3: data=true 才執行 (useEffect 本身有執行)');
    }
  }, [data]);

  return (
    <div>
      <h3>2. Render</h3>
      <div>{data ? '元件已顯示' : '元件已隱藏'}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
        <button
          onClick={() => {
            setData(!data);
          }}
        >
          Widget 改值
        </button>
      </div>
    </div>
  );
}
