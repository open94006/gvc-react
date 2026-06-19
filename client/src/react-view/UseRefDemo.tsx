/* eslint-disable react-hooks/refs */
import React, { useState, useRef } from 'react';

export function UseRefDemo() {
  const [text, setText] = useState('');

  // 使用 useRef 紀錄渲染次數，初始值為 1
  const renderCount = useRef(1);

  // 每次組件重新渲染，useEffect 就會執行
  // 我們手動讓 renderCount.current 加 1
  // 重點：這個加 1 的動作本身「不會」再引發下一次渲染，避免了無限迴圈
  React.useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <p>你輸入的文字：{text}</p>
      <p>組件重新渲染次數（不包含這一次）：{renderCount.current}</p>
    </div>
  );
}
