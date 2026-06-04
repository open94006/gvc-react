const html = String.raw;
export class Aaa {
    static render(gvc) {
        return gvc.bindView(() => {
            const id = gvc.glitter.getUUID();
            let loading = true;
            return {
                bind: id,
                view: () => {
                    if (loading) {
                        return html `<p>loading</p>`;
                    }
                    else {
                        return html `<p>work</p>`;
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
//# sourceMappingURL=aaa.js.map