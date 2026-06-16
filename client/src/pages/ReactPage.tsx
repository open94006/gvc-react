import { CounterReact } from '../react-view/CounterReact';
import { FormReact } from '../react-view/FormReact';
import { ZustandCountView } from '../react-view/zustand/ZustandCountView';
import { RenameReact } from '../react-view/RenameReact';
import { RenderReact } from '../react-view/RenderReact';
import { CallRandomIdReact } from '../react-view/CallRandomIdReact';

export function ReactPage() {
  return (
    <section style={{ padding: 20 }}>
      <h2>React Page</h2>
      <p>這裡的元件是由 React 寫法產生</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: 20, alignItems: 'start' }}>
        {<CounterReact />}
        {<RenderReact />}
        {<RenameReact />}
        {<FormReact />}
        {<ZustandCountView />}
        {<CallRandomIdReact />}
      </div>
    </section>
  );
}
