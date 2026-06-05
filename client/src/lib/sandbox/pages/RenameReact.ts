// @ts-ignore
import { GVC } from '../../lowcode/glitterBundle/GVController.js';

const html = String.raw;

export function RenameGVC(gvc: GVC) {
  const id = gvc.glitter.getUUID();
  const vm = { name: '尚未改名' };

  return gvc.bindView({
    bind: id,
    dataList: [{ obj: vm, key: 'name' }],
    view: () => {
      return html`
        <h3>3. Auto Render</h3>
        <div>${vm.name}</div>
        <button
          onclick="${gvc.event(() => {
            vm.name = '已更名';
          })}"
        >
          Rename
        </button>
      `;
    },
  });
}
