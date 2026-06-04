// @ts-ignore Runtime module is served from the prebuilt lowcode bundle.
import { init, GVC } from '../lowcode/glitterBundle/GVController.js';

const html = String.raw;

export class Aaa {
  static render(gvc: GVC) {
    return gvc.bindView(() => {
      const id = gvc.glitter.getUUID();
      let loading = true;
      return {
        bind: id,
        view: () => {
          if (loading) {
            return html`<p>loading</p>`;
          } else {
            return html`<p>work</p>`;
          }
        },
        divCreate: {},
        onCreate: () => {
          if (loading) {
            setTimeout(() => {
              loading = false;
              gvc.notifyDataChange(id);
            }, 2000);
          }
        },
      };
    });
  }
}
