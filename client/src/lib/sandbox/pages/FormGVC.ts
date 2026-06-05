// @ts-ignore
import { GVC } from '../../lowcode/glitterBundle/GVController.js';

const html = String.raw;

export function FormGVC(gvc: GVC) {
  const id = gvc.glitter.getUUID();
  const vm = {
    name: '',
    phone: '',
    tags: [],
  };

  return gvc.bindView({
    bind: id,
    view: () => {
      return html`
        <h3>4. Save Form</h3>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <input
            placeholder="請輸入姓名"
            onchange="${gvc.event((e: any) => {
              const text = e.value;
              vm.name = text.trim();
              gvc.notifyDataChange(id);
            })}"
            value="${vm.name}"
          />
          <input
            placeholder="請輸入手機"
            onchange="${gvc.event((e: any) => {
              const text = e.value;
              vm.phone = text.trim();
              gvc.notifyDataChange(id);
            })}"
            value="${vm.phone}"
          />
          <input
            placeholder="請新增標籤"
            onchange="${gvc.event((e: any) => {
              const text = e.value;
              if (text && text.length > 0 && !vm.tags.includes(text)) {
                vm.tags.push(text);
                gvc.notifyDataChange(id);
              }
            })}"
          />
          <ul>
            ${vm.tags.map(tag => html`<li>${tag}</li>`).join('')}
          </ul>
        </div>
        <button
          onclick="${gvc.event(() => {
            console.log(vm);
          })}"
        >
          Save Form
        </button>
      `;
    },
    divCreate: {
      style: '',
    },
  });
}
