import { CounterReact } from '../react-view/CounterReact';

export function ReactPage() {
  return (
    <section style={{ padding: 20 }}>
      <h2>React Page</h2>
      <p>這裡的元件是由 React 寫法產生的</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: 20, alignItems: 'start' }}>
        {CounterReact()}
        {CounterReact()}
      </div>
    </section>
  );
}
