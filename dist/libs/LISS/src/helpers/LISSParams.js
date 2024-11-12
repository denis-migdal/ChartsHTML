import { define } from "customRegistery";
import { LISS } from "LISSBase";
import { ShadowCfg } from "types";
// Normally :
// Parent upgrade -> children upgrade -> children init -> manipulate parent host -> parent init.
// If deps -> need a tool for "waitChildrenInit" or "waitParentInit".
export class LISSParams extends LISS({
    shadow: ShadowCfg.NONE,
    css: [`:host {display: none}`],
    attrs: ["type"]
}) {
    #name;
    #value;
    #parent;
    // dirty h4ck...
    constructor(p = {}, init = true) {
        super();
        this.#name = this.host.getAttribute("name");
        this.#parent = this.host.parentElement;
        if (init)
            this.init();
    }
    init() {
        // TODO: observe content...
        this.onValueChanged(this.host.textContent);
    }
    //TODO
    get type() {
        return this.attrs.type ?? "JSON";
    }
    _parseContent(value) {
        const type = this.type;
        if (type === "JSON")
            return JSON.parse(value);
        if (type === "JS") {
            //TODO: may be improved ?
            const args = Object.keys(this.getArgs());
            this.#fct = new Function(...args, `return ${value}`);
            return this.call(...Object.values(args));
        }
        throw new Error("not implemented!");
    }
    #fct = null;
    call(...args) {
        return this.#fct(...args);
    }
    onValueChanged(value) {
        this.#value = this._parseContent(value);
        /*
        // do not updated if not in DOM.
        if( ! this.#parent?.isInDOM)
            return;*/
        this.#parent.updateParams(this.#value);
    }
    getArgs() {
        return {};
    }
}
if (customElements.get("liss-params") === undefined)
    define("liss-params", LISSParams);
//# sourceMappingURL=LISSParams.js.map