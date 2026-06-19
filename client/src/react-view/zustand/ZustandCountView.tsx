import { useNavigate } from 'react-router';
import { useCounter } from './ZustandCountCounter';

export const ZustandCountView = () => {
  const navigate = useNavigate();
  const count = useCounter(state => state.count);
  const resetCount = useCounter(state => state.resetCount);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h3>5. Global Value</h3>
      <div>{count}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={() => resetCount()}>重置</button>
        <button onClick={() => navigate('zustandAdd')}>切換到 Add View</button>
      </div>
    </div>
  );
};
