const html = String.raw;
const css = String.raw;
export function CounterGVC(gvc) {
    const id = gvc.glitter.getUUID();
    const vm = { count: 0 };
    return gvc.bindView({
        bind: id,
        view: () => {
            return html `
        <div>
          <h3 class="gvc-title">1. Counter</h3>
          <div>
            <p>Count: ${vm.count}</p>
            <button
              onclick="${gvc.event(() => {
                vm.count++;
                gvc.notifyDataChange(id);
            })}"
            >
              Click
            </button>
          </div>
        </div>
      `;
        },
        onCreate: () => {
            gvc.addStyle(css `
        .gvc-title {
          font-size: 16px;
          color: red;
          letter-spacing: 2px;
        }
      `);
        },
    });
}
//# sourceMappingURL=CounterGVC.js.map