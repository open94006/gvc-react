// @ts-ignore Runtime module is served from the prebuilt lowcode bundle.
import { init, GVC } from '../lowcode/glitterBundle/GVController.js';
import { Aaa } from './pages/aaa.js';

init(import.meta.url, (gvc: GVC) => {
  const vm = {
    count: 0,
    name: 'GVC Sandbox',
    bind_id: 'home-view',
  };

  const onCreateView = () => {
    return gvc.bindView({
      bind: vm.bind_id,
      view: () => {
        return Aaa.render(gvc);
      },
      onCreate: () => {},
    });
  };

  return {
    onCreateView,
  };
});
