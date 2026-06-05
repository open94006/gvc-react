import { useState } from 'react';

export function RenameReact() {
  const [name, setName] = useState('尚未更名');

  return (
    <div>
      <h3>3. Auto Render</h3>
      <div>{name}</div>
      <button
        onClick={() => {
          setName('已更名');
        }}
      >
        Rename
      </button>
    </div>
  );
}
