import { useNavigate } from 'react-router';
import { useCounter } from './ZustandCountCounter';

export const ZustandCountAddView = () => {
  const navigate = useNavigate();
  const count = useCounter(state => state.count);
  const incrementEvent = useCounter(state => state.increment);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
      <h3>5. Global Value New Add Page</h3>
      <div>{count}</div>
      <div style={{ display: 'flex', gap: 4 }}>
        <button onClick={() => incrementEvent(1)}>+1</button>
        <button onClick={() => navigate('..')}>切換到 Home</button>
      </div>
    </div>
  );
};
