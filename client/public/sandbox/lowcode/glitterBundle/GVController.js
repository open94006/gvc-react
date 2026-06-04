'use strict';
import { GVCType } from './module/PageManager.js';
const $ = window.$;
class LifeCycle {
    notifyDataChange() {
        $('body').html(this.onCreateView());
    }
    constructor() {
        this.onResume = function () { };
        this.onPause = function () { };
        this.onDestroy = function () { };
        this.onCreate = function () { };
        this.onCreateView = function () {
            return '';
        };
        this.cssInitial = function () {
            return '';
        };
    }
}
export class GVC {
    constructor() {
        this.glitter = window.glitter;
        this.parameter = {
            clickMap: {},
            pageConfig: undefined,
            bindViewList: {},
            clickID: 0,
            styleList: [],
            jsList: [],
            styleLinks: [],
        };
        this.share = {};
        this.recreateView = () => { };
    }
    closeDialog() {
        this.glitter.closeDiaLog(this.parameter.pageConfig?.tag);
    }
    getBundle() {
        this.parameter.pageConfig.obj = this.parameter.pageConfig.obj ?? {};
        return this.parameter.pageConfig?.obj;
    }
    notifyDataChange(id) {
        const gvc = this;
        try {
            const refresh = (id) => {
                if (gvc.getBindViewElem(id).length === 0) {
                    return;
                }
                gvc.parameter.bindViewList[id].divCreate = gvc.parameter.bindViewList[id].divCreate ?? {};
                const divCreate = typeof gvc.parameter.bindViewList[id].divCreate === 'function' ? gvc.parameter.bindViewList[id].divCreate() : gvc.parameter.bindViewList[id].divCreate;
                $(`[gvc-id="${gvc.id(id)}"]`).attr('class', divCreate.class ?? '');
                $(`[gvc-id="${gvc.id(id)}"]`).attr('style', divCreate.style ?? '');
                gvc.glitter.elementCallback[gvc.id(id)].updateAttribute();
                function notifyLifeCycle() {
                    if (gvc.parameter.bindViewList[id].onCreate) {
                        gvc.parameter.bindViewList[id].onCreate();
                    }
                }
                function refreshView() {
                    const view = gvc.glitter.elementCallback[gvc.id(id)].getView();
                    if (typeof view === 'string') {
                        $(`[gvc-id="${gvc.id(id)}"]`).html(view);
                        notifyLifeCycle();
                    }
                    else {
                        view.then((resolve) => {
                            $(`[gvc-id="${gvc.id(id)}"]`).html(resolve);
                            notifyLifeCycle();
                        });
                    }
                }
                refreshView();
            };
            const convID = function () {
                if (typeof id === 'object') {
                    id.map(function (id) {
                        refresh(id);
                    });
                }
                else {
                    refresh(id);
                }
            };
            convID();
        }
        catch (e) {
            if (gvc.glitter.debugMode) {
                console.error(e);
            }
        }
    }
    getBindViewElem(id) {
        const gvc = this;
        return $(`[gvc-id="${gvc.id(id)}"]`);
    }
    addObserver(obj, callback, viewBind) {
        const gvc = this;
        try {
            if (obj.initial) {
                callback();
            }
            var map = obj.obj;
            if (!map.GlitterJsonStringConversionGetData) {
                var tMap = {};
                map.GlitterJsonStringConversionGetData = function () {
                    return tMap;
                };
            }
            if (!map.GlitterObServerCallBack) {
                var callba = [];
                map.GlitterObServerCallBack = function () {
                    return callba;
                };
            }
            if (viewBind) {
                if (map.GlitterObServerCallBack().filter(function (it) {
                    return it.viewBind === viewBind;
                }).length === 0) {
                    map.GlitterObServerCallBack().push({ key: obj.key, callback: callback, viewBind: viewBind });
                }
            }
            else {
                map.GlitterObServerCallBack().push({ key: obj.key, callback: callback });
            }
            var keys = Object.keys(map);
            for (var a = 0; a < keys.length; a++) {
                let keyVa = keys[a];
                if (keyVa !== 'GlitterJsonStringConversionGetData' && keyVa !== 'GlitterObServerCallBack' && keyVa === obj.key) {
                    gvc.glitter.deBugMessage('add-' + obj.key);
                    if (!map.GlitterJsonStringConversionGetData()[keyVa]) {
                        map.GlitterJsonStringConversionGetData()[keyVa] = map[keyVa];
                    }
                    Object.defineProperty(map, keyVa, {
                        get: function () {
                            return map.GlitterJsonStringConversionGetData()[keyVa];
                        },
                        set(v) {
                            map.GlitterJsonStringConversionGetData()[keyVa] = v;
                            map.GlitterObServerCallBack().map(function (it) {
                                try {
                                    if (it.key === keyVa) {
                                        it.callback({ key: it.key, value: v });
                                    }
                                }
                                catch (e) {
                                    gvc.glitter.deBugMessage(e);
                                    gvc.glitter.deBugMessage(e.stack); // this will work on chrome, FF. will no not work on safari
                                    gvc.glitter.deBugMessage(e.line); // this will work on safari but not on IPhone
                                }
                            });
                        },
                    });
                }
            }
            if (map[obj.key] === undefined) {
                map[obj.key] = '';
                Object.defineProperty(map, obj.key, {
                    get: function () {
                        return map.GlitterJsonStringConversionGetData()[obj.key];
                    },
                    set(v) {
                        map.GlitterJsonStringConversionGetData()[obj.key] = v;
                        map.GlitterObServerCallBack().map(function (it) {
                            try {
                                if (it.key === obj.key) {
                                    it.callback({ key: it.key, value: v });
                                }
                            }
                            catch (e) {
                                gvc.glitter.deBugMessage(e);
                                gvc.glitter.deBugMessage(e.stack); // this will work on chrome, FF. will no not work on safari
                                gvc.glitter.deBugMessage(e.line); // this will work on safari but not on IPhone
                            }
                        });
                    },
                });
            }
        }
        catch (e) {
            gvc.glitter.deBugMessage(e);
            gvc.glitter.deBugMessage(e.stack); // this will work on chrome, FF. will no not work on safari
            gvc.glitter.deBugMessage(e.line); // this will work on safari but not on IPhone
        }
    }
    initialElemCallback(id) {
        const gvc = this;
        gvc.glitter.elementCallback[id] = gvc.glitter.elementCallback[id] ?? {
            onCreate: () => { },
            onInitial: () => { },
            notifyDataChange: () => { },
            getView: () => '',
            updateAttribute: () => { },
            onDestroy: () => { },
            rendered: false,
        };
    }
    bindView(map) {
        const gvc = this;
        if (typeof map === 'function') {
            map = map();
        }
        gvc.initialElemCallback(gvc.id(map.bind));
        if (map.dataList) {
            map.dataList.map(function (data) {
                function refreshView() {
                    const view = map.view();
                    if (typeof view === 'string') {
                        $(`[gvc-id="${gvc.id(map.bind)}"]`).html(view);
                    }
                    else {
                        view.then((resolve) => {
                            $(`[gvc-id="${gvc.id(map.bind)}"]`).html(resolve);
                        });
                    }
                }
                refreshView();
                gvc.addObserver(data, function () {
                    refreshView();
                    if (map.onCreate()) {
                        map.onCreate();
                    }
                });
            });
        }
        gvc.parameter.bindViewList[map.bind] = map;
        gvc.glitter.elementCallback[gvc.id(map.bind)].onInitial = map.onInitial ?? (() => { });
        gvc.glitter.elementCallback[gvc.id(map.bind)].onCreate = map.onCreate ?? (() => { });
        gvc.glitter.elementCallback[gvc.id(map.bind)].onDestroy = map.onDestroy ?? (() => { });
        gvc.glitter.elementCallback[gvc.id(map.bind)].getView = map.view;
        gvc.glitter.elementCallback[gvc.id(map.bind)].updateAttribute = () => {
            try {
                const id = gvc.id(map.bind);
                const divCreate2 = typeof map.divCreate === 'function' ? map.divCreate() : map.divCreate;
                (divCreate2.option ?? []).map((dd) => {
                    try {
                        const element = $(`[gvc-id="${id}"]`);
                        if ((dd.value.includes('clickMap') || dd.value.includes('editorEvent')) && dd.key.substring(0, 2) === 'on') {
                            try {
                                const funString = `${dd.value}`;
                                element.get(0).off(dd.key.substring(2));
                                element.get(0).addEventListener(dd.key.substring(2), function () {
                                    if (gvc.glitter.htmlGenerate.isEditMode() && !gvc.glitter.share.EditorMode) {
                                        if (funString.indexOf('editorEvent') !== -1) {
                                            eval(funString.replace('editorEvent', 'clickMap'));
                                        }
                                        else if (dd.key !== 'onclick') {
                                            eval(funString);
                                        }
                                    }
                                    else {
                                        eval(funString);
                                    }
                                });
                            }
                            catch (e) {
                                gvc.glitter.deBugMessage(e);
                            }
                        }
                        else {
                            element.attr(dd.key, dd.value);
                        }
                    }
                    catch (e) {
                        gvc.glitter.deBugMessage(e);
                    }
                });
            }
            catch (e) { }
        };
        const divCreate = (typeof map.divCreate === 'function' ? map.divCreate() : map.divCreate) ?? { elem: 'div' };
        // const data = map.view()
        return `<${divCreate.elem ?? 'div'}  class="${divCreate.class ?? ''}" style="${divCreate.style ?? ''}" 
 glem="bindView"  gvc-id="${gvc.id(map.bind)}"
 ${gvc.map((divCreate.option ?? []).map((dd) => {
            return ` ${dd.key}="${dd.value}"`;
        }))}
></${divCreate.elem ?? 'div'}>`;
    }
    event(fun, noCycle) {
        const gvc = this;
        if (noCycle === undefined) {
            gvc.parameter.clickID++;
            gvc.parameter.clickMap[`${gvc.parameter.clickID}`] = {
                fun: fun,
                noCycle: false,
            };
            return `clickMap['${gvc.parameter.pageConfig.id}']['${gvc.parameter.clickID}'].fun(this,event);`;
        }
        else {
            gvc.parameter.clickMap[noCycle] = {
                fun: fun,
                noCycle: true,
            };
            return `clickMap['${gvc.parameter.pageConfig.id}']['${noCycle}'].fun(this,event);`;
        }
    }
    editorEvent(fun, noCycle) {
        const gvc = this;
        if (noCycle === undefined) {
            gvc.parameter.clickID++;
            gvc.parameter.clickMap[`${gvc.parameter.clickID}`] = {
                fun: fun,
                noCycle: false,
            };
            return `editorEvent['${gvc.parameter.pageConfig.id}']['${gvc.parameter.clickID}'].fun(this,event);`;
        }
        else {
            gvc.parameter.clickMap[noCycle] = {
                fun: fun,
                noCycle: true,
            };
            return `editorEvent['${gvc.parameter.pageConfig.id}']['${noCycle}'].fun(this,event);`;
        }
    }
    addStyle(style) {
        const gvc = this;
        let sl = {
            id: gvc.glitter.getUUID(),
            style: style,
        };
        if (!gvc.parameter.styleList.find((dd) => {
            return dd.style === style;
        })) {
            var css = document.createElement('style');
            css.type = 'text/css';
            css.id = sl.id;
            if (css.styleSheet)
                css.styleSheet.cssText = style;
            else
                css.appendChild(document.createTextNode(style));
            /* Append style to the tag name */
            document.getElementsByTagName('head')[0].appendChild(css);
            gvc.parameter.styleList.push(sl);
        }
    }
    async addStyleLink(fs) {
        const gvc = this;
        function add(filePath) {
            var head = document.head;
            const id = gvc.glitter.getUUID();
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = filePath;
            link.id = id;
            if (!gvc.parameter.styleLinks.find((dd) => {
                return dd.src === filePath;
            })) {
                gvc.parameter.styleLinks.push({
                    id: id,
                    src: filePath,
                });
                head.appendChild(link);
            }
        }
        if (typeof fs === 'string') {
            add(fs);
        }
        else {
            fs.map((dd) => {
                add(dd);
            });
        }
    }
    addMtScript(urlArray, success, error) {
        const glitter = this.glitter;
        const that = this;
        let index = 0;
        function addScript() {
            if (index === urlArray.length) {
                success();
                return;
            }
            var scritem = urlArray[index];
            scritem.id = glitter.getUUID();
            if (that.parameter.jsList.find((dd) => {
                return dd.src === scritem.src;
            })) {
                index++;
                addScript();
                return;
            }
            that.parameter.jsList.push(scritem);
            let script = document.createElement('script');
            try {
                if (script.readyState) {
                    //IE
                    script.onreadystatechange = () => {
                        if (script.readyState === 'loaded' || script.readyState === 'complete') {
                            script.onreadystatechange = null;
                            index++;
                            addScript();
                        }
                    };
                }
                else {
                    //其餘瀏覽器支援onload
                    script.onload = () => {
                        if (success !== undefined) {
                            index++;
                            addScript();
                        }
                    };
                }
                if (scritem.type === 'text/babel') {
                    glitter.$('body').append(`<script type="text/babel" src="${scritem.src}"></script>`);
                }
                else if (scritem.type !== undefined) {
                    script.setAttribute('type', scritem.type);
                    script.setAttribute('src', scritem.src ?? scritem);
                    script.setAttribute('id', scritem.id ?? undefined);
                    document.getElementsByTagName('head')[0].appendChild(script);
                }
                else {
                    script.setAttribute('src', scritem.src ?? scritem);
                    script.setAttribute('id', scritem.id ?? undefined);
                    document.getElementsByTagName('head')[0].appendChild(script);
                }
            }
            catch (e) {
                error(`Add ${urlArray[index]} ERROR`);
            }
        }
        addScript();
    }
    id(id) {
        const gvc = this;
        return `${gvc.parameter.pageConfig.id}${id}`;
    }
    map(array) {
        let html = '';
        array.map((d) => {
            html += d;
        });
        return html;
    }
}
export function init(url, fun, gt) {
    const glitter = gt ?? window.glitter;
    const gvc = new GVC();
    gvc.glitter = glitter;
    gvc.parameter.pageConfig = glitter.nowPageConfig;
    const pageData = fun(gvc, glitter, glitter.nowPageConfig?.obj);
    if (!glitter.modelJsList.find((data) => {
        return data.src === glitter.nowPageConfig?.src;
    })) {
        glitter.modelJsList.push({
            src: glitter.nowPageConfig.src,
            create: (glitter) => {
                init(glitter.nowPageConfig.src, fun, window.glitter);
            },
        });
    }
    const lifeCycle = new LifeCycle();
    lifeCycle.onResume = pageData.onResume ?? lifeCycle.onResume;
    lifeCycle.onPause = pageData.onPause ?? lifeCycle.onPause;
    lifeCycle.onDestroy = pageData.onDestroy ?? lifeCycle.onDestroy;
    lifeCycle.onCreate = pageData.onCreate ?? lifeCycle.onCreate;
    lifeCycle.onCreateView = pageData.onCreateView;
    lifeCycle.cssInitial = pageData.cssInitial ?? lifeCycle.cssInitial;
    gvc.recreateView = () => {
        $(`#page${gvc.parameter.pageConfig.id}`).html(lifeCycle.onCreateView());
    };
    if ($('.page-loading').length > 0) {
        $('.page-loading').remove();
    }
    window.clickMap = window.clickMap ?? {};
    switch (gvc.parameter.pageConfig?.type) {
        case GVCType.Dialog:
            $('#page' + gvc.parameter.pageConfig.id).html(lifeCycle.onCreateView());
            glitter.setAnimation(gvc.parameter.pageConfig);
            break;
        case GVCType.Page:
            $('#page' + gvc.parameter.pageConfig.id).html(lifeCycle.onCreateView());
            glitter.setAnimation(gvc.parameter.pageConfig);
            break;
    }
    window.clickMap[gvc.parameter.pageConfig.id] = gvc.parameter.clickMap;
    lifeCycle.onCreate();
    gvc.parameter.pageConfig.deleteResource = (destroy) => {
        window.clickMap[gvc.parameter.pageConfig.id] = undefined;
        lifeCycle.onPause();
        gvc.parameter.styleLinks.map((dd) => {
            $(`#${dd.id}`).remove();
        });
        gvc.parameter.styleList.map((dd) => {
            $(`#${dd.id}`).remove();
        });
        gvc.parameter.jsList.map((dd) => {
            $(`#${dd.id}`).remove();
        });
        if (destroy) {
            lifeCycle.onDestroy();
        }
    };
}
//# sourceMappingURL=GVController.js.map