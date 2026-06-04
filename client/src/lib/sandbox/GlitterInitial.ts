'use strict';
// @ts-ignore Runtime module is served from the prebuilt lowcode bundle.
import { Glitter } from '../lowcode/glitterBundle/Glitter.js';
// @ts-ignore Runtime module is served from the prebuilt lowcode bundle.
import { GVCType } from '../lowcode/glitterBundle/module/PageManager.js';

declare const $: any;

const glitter = new Glitter(window);
(window as any).glitter = glitter;
(window as any).rootGlitter = glitter;

function listenElementChange(query: string) {
  const targetElement: any = document.querySelector(query);
  const observer = new MutationObserver(function (mutationsList) {
    Object.keys(glitter.elementCallback).map(dd => {
      if (glitter.elementCallback[dd].rendered && !glitter.elementCallback[dd].doc.querySelector(`[gvc-id="${dd}"]`)) {
        glitter.elementCallback[dd].rendered = false;
        glitter.elementCallback[dd].onDestroy();
      }
    });
    for (let mutation of mutationsList) {
      if (mutation.addedNodes.length > 0) {
        //@ts-ignore
        for (const b of mutation.addedNodes) {
          traverseHTML(b, document);
        }
      }
    }
  });
  observer.observe(targetElement, { childList: true, subtree: true });
}

function traverseHTML(element: any, document: any) {
  try {
    if (element.classList.contains('page-box')) {
      const pageConfig = glitter.pageConfig.find(dd => {
        return `page${dd.id}` === element.getAttribute('id');
      });
      if (
        (window as any).glitter.share.to_menu &&
        glitter.pageConfig.filter(dd => {
          return dd.type === GVCType.Page;
        }).length > 1
      ) {
        element.style.display = 'none';
        (window as any).glitter.share.time_back = setTimeout(() => {
          window.history.back();
        });
        return;
      }
      (window as any).glitter.share.to_menu = false;
      if (pageConfig && pageConfig.initial) {
        const scroll_top = pageConfig.scrollTop;
        [0, 100, 200, 300, 400, 500, 600, 700].map(dd => {
          setTimeout(() => {
            (document.querySelector('html') as any).scrollTop = scroll_top;
          }, dd);
        });

        function loop(element: any) {
          if (element && element.onResumeEvent) {
            element && element.onResumeEvent && element.onResumeEvent();
          }
          let children = element.children;
          if (children && children.length > 0) {
            for (let j = 0; j < children.length; j++) {
              loop(children[j]);
            }
          }
        }

        loop(element);

        return;
      }
      pageConfig && (pageConfig.initial = true);
    }
  } catch (e) {}
  let children = element.children;
  if (children && children.length > 0) {
    for (let j = 0; j < children.length; j++) {
      traverseHTML(children[j], document);
    }
  }
  if (element && element.getAttribute && element.getAttribute('glem') === 'bindView') {
    const id = element.getAttribute('gvc-id') as string;
    glitter.elementCallback[id].element = element;
    (glitter.elementCallback[id] as any).first_paint = (glitter.elementCallback[id] as any).first_paint ?? true;

    function renderBindView() {
      glitter.consoleLog(`renderBindView`);

      function notifyLifeCycle() {
        try {
          setTimeout(() => {
            glitter.elementCallback[element.getAttribute('gvc-id') as string].updateAttribute();
          });
        } catch (e) {
          glitter.deBugMessage(e);
        }
        try {
          glitter.elementCallback[element.getAttribute('gvc-id') as string].onInitial();
        } catch (e) {
          glitter.deBugMessage(e);
        }
        try {
          glitter.elementCallback[element.getAttribute('gvc-id') as string].onCreate();
        } catch (e) {
          glitter.deBugMessage(e);
        }
      }

      try {
        if (document.querySelector(`[gvc-id="${id}"]`)) {
          glitter.elementCallback[id].doc = document;
          glitter.elementCallback[id].rendered = true;
          if (!document.querySelector(`[gvc-id="${id}"]`).wasRender) {
            if (typeof glitter.elementCallback[id].initial_view === 'string') {
              glitter.elementCallback[id].initial_view = undefined;
              notifyLifeCycle();
            } else {
              let view = glitter.elementCallback[id].getView();

              function _start() {
                if (typeof view === 'string') {
                  const html = glitter.renderView.replaceGlobalValue(view);
                  try {
                    $(document.querySelector(`[gvc-id="${id}"]`)).html(html);
                  } catch (e: any) {
                    $(document.querySelector(`[gvc-id="${id}"]`)).html(e);
                  }
                  notifyLifeCycle();
                } else {
                  view.then(data => {
                    const html = glitter.renderView.replaceGlobalValue(data);
                    try {
                      $(document.querySelector(`[gvc-id="${id}"]`)).html(html);
                    } catch (e: any) {
                      $(document.querySelector(`[gvc-id="${id}"]`)).html(e);
                    }
                    notifyLifeCycle();
                  });
                }
              }

              _start();
            }
          } else if (document.querySelector(`[gvc-id="${id}"]`).onResumeEvent) {
            setTimeout(() => {
              document.querySelector(`[gvc-id="${id}"]`).onResumeEvent();
            });
          }
          if (document.querySelector(`[gvc-id="${id}"]`)) {
            document.querySelector(`[gvc-id="${id}"]`).recreateView = () => {
              if (document.querySelector(`[gvc-id="${id}"]`) !== null) {
                document.querySelector(`[gvc-id="${id}"]`).wasRecreate = true;
                document.querySelector(`[gvc-id="${id}"]`).wasRender = false;
                if (!document.querySelector(`[gvc-id="${id}"]`).style.height) {
                  const height = document.querySelector(`[gvc-id="${id}"]`).offsetHeight;
                  if (height) {
                    document.querySelector(`[gvc-id="${id}"]`).style.height = height + 'px';
                  }
                  setTimeout(() => {
                    if (
                      document.querySelector(`[gvc-id="${id}"]`) !== null &&
                      document.querySelector(`[gvc-id="${id}"]`).style.height === height + 'px'
                    ) {
                      document.querySelector(`[gvc-id="${id}"]`).style.removeProperty('height');
                    }
                  }, 10);
                }
                renderBindView();
              }
            };
            document.querySelector(`[gvc-id="${id}"]`).wasRender = true;
          }
        }
      } catch (e) {
        glitter.deBugMessage(e);
      }
    }

    let wasRecreate = false;
    for (const b of $(element).parents()) {
      if (b.getAttribute('glem') === 'bindView') {
        wasRecreate = (b as any).wasRecreate;
        break;
      }
    }
    if (wasRecreate) {
      element.wasRecreate = true;
    }
    renderBindView();
  } else {
    for (const b of element.attributes ?? []) {
      glitter.renderView.replaceAttributeValue(
        {
          key: b.name,
          value: b.value,
        },
        element
      );
    }
  }
  if (!(glitter.share.EditorMode === true)) {
    const inputString = element.innerHTML || element.innerText || element.textContent;
    inputString != glitter.renderView.replaceGlobalValue(inputString) &&
      (element.innerHTML = glitter.renderView.replaceGlobalValue(inputString));
  }
}

glitter.share.traverseHTML = traverseHTML;
if ((window as any).GL !== undefined) {
  glitter.deviceType = glitter.deviceTypeEnum.Android;
  document.cookie = `glitter_device_type=android; path=/; max-age=3600`;
} else if (navigator.userAgent.includes('iosGlitter')) {
  glitter.deviceType = glitter.deviceTypeEnum.Ios;
  document.cookie = `glitter_device_type=ios; path=/; max-age=3600`;
} else {
  document.cookie = `glitter_device_type=web; path=/; max-age=3600`;
}
listenElementChange(`#glitterPage`);
listenElementChange(`#Navigation`);
listenElementChange(`head`);
glitter.closeDrawer();
glitter.setHome('./pages/home.js', 'home', {});

function glitterInitial() {
  if (glitter.deviceType !== glitter.deviceTypeEnum.Android) {
    window.addEventListener('popstate', function (e) {
      console.log(`popstate=>>`);
      glitter.goBack();
    });
  }
  glitter.getBoundingClientRect = document.querySelector('html')!.getBoundingClientRect();
  if (glitter.deviceType !== glitter.deviceTypeEnum.Web) {
    var css = document.createElement('style');
    css.type = 'text/css';
    var style = ` -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;`;
    if ((css as any).styleSheet) (css as any).styleSheet.cssText = style;
    else css.appendChild(document.createTextNode(style));
    document.getElementsByTagName('head')[0].appendChild(css);
  }
}

glitterInitial();

(window as any).glitter.share.postMessageCallback = [];
window.addEventListener('message', (event: any) => {
  (window as any).glitter.share.postMessageCallback = (window as any).glitter.share.postMessageCallback.filter(
    function (obj: any, index: number, array: any) {
      return array.findIndex((item: any) => item.id === obj.id) === index;
    }
  );

  (window as any).glitter.share.postMessageCallback.map((dd: any) => {
    dd.fun(event);
  });
});
