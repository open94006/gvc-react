import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

export function CounterReact() {
  const [count, setCount] = useState(0);

  const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
  `;

  const CustomerTitle = styled.div`
    font-size: 16px;
    letter-spacing: 3px;
    color: white;
    animation: ${fadeIn} 0.3s ease;
  `;

  return (
    <div>
      <CustomerTitle>1. Counter</CustomerTitle>
      <div>
        <p>Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>Click</button>
      </div>
    </div>
  );
}
