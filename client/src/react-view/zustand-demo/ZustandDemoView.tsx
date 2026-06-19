import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useConfigStore } from './UseConfigStore';

export function ZustandDemoView() {
  const negative = useNavigate();
  const getText = useConfigStore(cfg => cfg.text);
  const updateEvent = useConfigStore(cfg => cfg.updateText);
  const [word, setWord] = useState(getText);

  return (
    <>
      <h2>Zustand Demo</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <input
          type="text"
          onChange={e => {
            const formatWord = e.target.value.trim();
            setWord(formatWord);
          }}
          value={word}
        />
        <button
          onClick={() => {
            console.log({ word });
            updateEvent(word);
          }}
        >
          確認並查看
        </button>
        <button
          onClick={() => {
            negative('preview');
          }}
        >
          Preview
        </button>
      </div>
    </>
  );
}
