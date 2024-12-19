import { _element2tagname } from "../utils";
export function define(tagname, ComponentClass) {
    let Host = ComponentClass;
    // Brython class
    let bry_class = null;
    if ("$is_class" in ComponentClass) {
        bry_class = ComponentClass;
        ComponentClass = bry_class.__bases__.filter((e) => e.__name__ === "Wrapper")[0]._js_klass.$js_func;
        ComponentClass.Host.Controler = class {
            #bry;
            constructor(...args) {
                // @ts-ignore
                this.#bry = __BRYTHON__.$call(bry_class, [0, 0, 0])(...args);
            }
            #call(name, args) {
                // @ts-ignore
                return __BRYTHON__.$call(__BRYTHON__.$getattr_pep657(this.#bry, name, [0, 0, 0]), [0, 0, 0])(...args);
            }
            get host() {
                // @ts-ignore
                return __BRYTHON__.$getattr_pep657(this.#bry, "host", [0, 0, 0]);
            }
            static observedAttributes = bry_class["observedAttributes"];
            attributeChangedCallback(...args) {
                return this.#call("attributeChangedCallback", args);
            }
            connectedCallback(...args) {
                return this.#call("connectedCallback", args);
            }
            disconnectedCallback(...args) {
                return this.#call("disconnectedCallback", args);
            }
        };
    }
    if ("Host" in ComponentClass)
        Host = ComponentClass.Host;
    const Class = Host.Cfg.host;
    let htmltag = _element2tagname(Class) ?? undefined;
    const opts = htmltag === undefined ? {}
        : { extends: htmltag };
    console.warn("define", tagname);
    customElements.define(tagname, Host, opts);
}
;
export function getName(element) {
    // instance
    if ("host" in element)
        element = element.host;
    if (element instanceof Element) {
        const name = element.getAttribute('is') ?? element.tagName.toLowerCase();
        if (!name.includes('-'))
            throw new Error(`${name} is not a WebComponent`);
        return name;
    }
    // cstr
    if ("Host" in element)
        element = element.Host;
    const name = customElements.getName(element);
    if (name === null)
        throw new Error("Element is not defined!");
    return name;
}
export function isDefined(elem) {
    if (elem instanceof HTMLElement)
        elem = getName(elem);
    if (typeof elem === "string")
        return customElements.get(elem) !== undefined;
    if ("Host" in elem)
        elem = elem.Host;
    return customElements.getName(elem) !== null;
}
export async function whenDefined(elem) {
    if (elem instanceof HTMLElement)
        elem = getName(elem);
    if (typeof elem === "string") {
        await customElements.whenDefined(elem);
        return customElements.get(elem);
    }
    // TODO: listen define...
    throw new Error("Not implemented yet");
}
/*
// TODO: implement
export async function whenAllDefined(tagnames: readonly string[]) : Promise<void> {
    await Promise.all( tagnames.map( t => customElements.whenDefined(t) ) )
}
*/
export function getHostCstr(elem) {
    // we can't force a define.
    return whenDefined(elem);
}
export function getHostCstrSync(elem) {
    if (elem instanceof HTMLElement)
        elem = getName(elem);
    if (typeof elem === "string") {
        let host = customElements.get(elem);
        if (host === undefined)
            throw new Error(`${elem} not defined yet!`);
        return host;
    }
    if ("Host" in elem)
        elem = elem.Host;
    if (customElements.getName(elem) === null)
        throw new Error(`${elem} not defined yet!`);
    return elem;
}
//# sourceMappingURL=DEFINED.js.map