import { widgetComponent } from "./widget.js";
export const containerComponent = {
    render: (gvc, widget, setting, hoverID, subData) => {
        widget.data.setting = widget.data.setting ?? [];
        widget.data.styleEd = widget.data.styleEd ?? {};
        const glitter = window.glitter;
        return {
            view: () => {
                return widgetComponent.render(gvc, widget, setting, hoverID, subData, {
                    widgetComponentID: gvc.glitter.getUUID()
                }).view();
                // return htmlGenerate.render(gvc, {
                //     class: `${glitter.htmlGenerate.styleEditor(widget.data.styleEd).class()}`,
                //     style: glitter.htmlGenerate.styleEditor(widget.data.styleEd).style()
                // })
            },
            editor: (() => {
                return widgetComponent.render(gvc, widget, setting, hoverID, subData, {
                    widgetComponentID: gvc.glitter.getUUID()
                }).editor();
            })
        };
    }
};
//# sourceMappingURL=container.js.map