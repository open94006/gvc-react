// @ts-ignore Runtime module is served from the prebuilt lowcode bundle.
import { init } from '../../lowcode/glitterBundle/GVController.js';
const html = String.raw;
init(import.meta.url, (gvc) => {
    const vm = {
        count: 0,
        name: 'GVC Sandbox',
    };
    return {
        onCreateView: () => {
            console.info(2);
            return gvc.bindView({
                bind: 'home-view',
                view: () => {
                    return html `
            <div style="padding: 20px;">
              <h1>${vm.name}</h1>
              <p>Count: ${vm.count}</p>
              <button
                onclick="${gvc.event(() => {
                        vm.count++;
                        gvc.notifyDataChange('home-view');
                    })}"
              >
                Increment
              </button>
            </div>
          `;
                },
                onCreate: () => {
                    // setTimeout(() => {
                    //     vm.count++;
                    //     gvc.notifyDataChange('home-view');
                    // }, 1000);
                },
            });
        },
        onCreate: () => {
            console.info(3);
            console.log('home page created');
        },
        onDestroy: () => {
            console.log('home page destroyed');
        },
    };
});
//# sourceMappingURL=home.js.map