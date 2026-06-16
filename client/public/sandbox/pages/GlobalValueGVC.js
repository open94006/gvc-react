const html = String.raw;
export function GlobalValueGVC(gvc) {
    const listBindId = crypto.randomUUID();
    // 寫入：任意地方皆可，無需 import
    gvc.glitter.share.currentUser = { name: 'Daniel' };
    // 把重繪函數掛到 share，讓子元件可以觸發父元件更新
    gvc.glitter.share.refreshList = () => {
        gvc.notifyDataChange(listBindId);
    };
    return gvc.bindView({
        bind: listBindId,
        view: () => {
            // 讀取與呼叫：任意元件直接存取
            const user = gvc.glitter.share.currentUser;
            return html `
        <h3>5. Global Value</h3>
        <div>${JSON.stringify(user)}</div>
        <button
          onclick="${gvc.event(() => {
                gvc.glitter.share.currentUser = { name: 'Daniel Lin' };
                gvc.glitter.share.refreshList();
            })}"
        >
          Rename
        </button>
      `;
        },
    });
}
//# sourceMappingURL=GlobalValueGVC.js.map