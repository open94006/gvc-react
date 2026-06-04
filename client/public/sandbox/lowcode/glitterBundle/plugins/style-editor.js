const glitter = window.glitter;
glitter.htmlGenerate.share.styleEditor = {
    render: (obj) => {
        return glitter.htmlGenerate.editeText({
            gvc: obj.gvc,
            title: '',
            default: obj.widget.css.style[obj.tag] || obj.def,
            placeHolder: `輸入設計樣式`,
            callback: (text) => {
                obj.widget.css.style[obj.tag] = text;
                obj.widget.refreshComponent();
            }
        });
    }
};
function styleValue(obj) {
    obj.widget.css.style[obj.tag] = obj.widget.css.style[obj.tag] ?? [];
    return;
}
export {};
//# sourceMappingURL=style-editor.js.map