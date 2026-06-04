export function Main({ ViewGVC, ViewReact }: { ViewGVC: React.ReactNode; ViewReact: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: 20, gap: 20 }}>
      <div style={{ flex: 1 }}>{ViewGVC}</div>
      <div style={{ flex: 1 }}>{ViewReact}</div>
    </div>
  );
}
