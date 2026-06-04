import { useState } from 'react';

export function CounterReact() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>1. Counter</h3>
      <div>
        <p>Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>Click</button>
      </div>
    </div>
  );
}
