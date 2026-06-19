import { useNavigate } from 'react-router';
import { useConfigStore } from './UseConfigStore';

export function Preview() {
  const negative = useNavigate();
  const text = useConfigStore(cfg => cfg.text);

  return (
    <>
      <h2>Zustand Preview</h2>
      <h3>{text}</h3>
      <button
        onClick={() => {
          negative('..');
        }}
      >
        回到編輯頁面
      </button>
    </>
  );
}
