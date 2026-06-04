// @ts-ignore Runtime module is served from the prebuilt lowcode bundle.
import { init } from '../lowcode/glitterBundle/GVController.js';
import { CounterGVC } from './pages/CounterGVC.js';
const html = String.raw;
init(import.meta.url, (gvc) => {
    const bind_id = 'home-view';
    const onCreateView = () => {
        return gvc.bindView({
            bind: bind_id,
            view: () => {
                return html ` <div>
            <h2>GVC</h2>
            <p>這裡的元件是由 GVC 產生</p>
          </div>
          <div style="display: flex; flex-direction: column; align-items: start; margin-top: 20px; gap: 20px;">
            ${[CounterGVC(gvc), CounterGVC(gvc)].join('')}
          </div>`;
            },
            divCreate: {
                style: 'padding: 20px',
            },
        });
    };
    return { onCreateView };
});
//# sourceMappingURL=home.js.map