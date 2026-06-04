// @ts-ignore Runtime module is served from the prebuilt lowcode bundle.
import { init } from '../../lowcode/glitterBundle/GVController.js';

const html = String.raw;

init(import.meta.url, (gvc: any, glitter: any, gBundle: any) => {
  const vm = {
    count: 0,
    name: 'GVC Sandbox',
  };

  return {
    onCreateView: () => html`
      <div style="padding:32px;font-family:sans-serif;">
        <h1>${vm.name}</h1>

        ${gvc.bindView({
          bind: 'counter-block',
          view: () => html`
            <p style="font-size:2rem;">Count: <b>${vm.count}</b></p>
          `,
        })}

        <button onclick="${gvc.event(() => {
          vm.count++;
          gvc.notifyDataChange('counter-block');
        })}">
          +1
        </button>

        <button onclick="${gvc.event(() => {
          vm.count = 0;
          gvc.notifyDataChange('counter-block');
        })}" style="margin-left:8px;">
          Reset
        </button>
      </div>
    `,
    onCreate: () => {
      console.log('home page created');
    },
    onDestroy: () => {
      console.log('home page destroyed');
    },
  };
});
