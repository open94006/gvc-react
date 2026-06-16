import { useEffect, useId, useMemo, useRef, useState } from 'react';

export function CallRandomIdReact() {
  const [times, setTimes] = useState(0);
  const crypto_id = crypto.randomUUID();
  const [state_id] = useState(crypto.randomUUID());
  const use_id = useId();
  const memo_id = useMemo(() => crypto.randomUUID(), []);
  const ref = useRef(crypto.randomUUID());

  useEffect(() => {
    console.log({
      crypto_id, // ❌ 原生 JS 的生成方法，但沒有 react 追蹤，改變前端後就會改值
      use_id, // ❌ 這是拿來做綁定元素間的 id 用的，例如 Label-Input
      state_id, // ⚠️ 還算堪用，但通常會有後面的 setXXX 去更改值
      memo_id, // ⚠️ useMemo 建議用在數值運算紀錄上，不太適合記值
      ref_id: ref.current, // ✅ 絕對適合，並只會出現在 useEffect 或是函式計算中，不會被改
    });
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h3>6. Call Random Id</h3>
      <div>第 {times} 次，查看console</div>
      <button onClick={() => setTimes(() => times + 1)}>刷新</button>
    </div>
  );
}
