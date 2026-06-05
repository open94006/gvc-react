const html = String.raw;
export function RenderGVC(gvc) {
    let visible = true;
    const widgetContainer = gvc.bindView({
        bind: 'container',
        view: () => {
            if (!visible) {
                return html `<p>元件已移除</p>`; // ← widget 不在這裡，DOM 消失 → onDestroy 觸發
            }
            return html `
        <!-- 實際的 widget -->
        ${gvc.bindView({
                bind: 'widget',
                view: () => html `<p>元件存在中</p>`,
                onInitial: () => {
                    // 僅第一次掛載後執行一次
                    console.log('GVC-1: 僅第一次掛載後執行一次');
                },
                onCreate: () => {
                    // 每次重繪後執行（負責重新綁定 DOM 事件）
                    console.log('GVC-2: 每次重繪後執行（負責重新綁定 DOM 事件）');
                },
                onDestroy: () => {
                    // 元件銷毀時清理資源
                    console.log('GVC-3: 銷毀時清理資源');
                },
            })}
      `;
        },
    });
    return html `<div>
    <h3>2. Render</h3>
    ${widgetContainer}
    <div style="display: flex; gap: 6px; margin-top: 10px;">
      <button
        onclick="${gvc.event(() => {
        gvc.notifyDataChange('widget'); // 重繪 widget
    })}"
      >
        Widget 刷新
      </button>
      <button
        onclick="${gvc.event(() => {
        visible = false;
        gvc.notifyDataChange('container'); // 重繪 container → widget 消失
    })}"
      >
        Widget 移除
      </button>
    </div>
  </div>`;
}
//# sourceMappingURL=RenderGVC.js.map