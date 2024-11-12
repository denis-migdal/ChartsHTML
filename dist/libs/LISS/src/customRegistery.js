import { _element2tagname } from "./utils";
let x;
// Go to state DEFINED
export function define(tagname, ComponentClass) {
    // could be better.
    if ("Base" in ComponentClass) {
        ComponentClass = ComponentClass.Base;
    }
    const Class = ComponentClass.LISSCfg.host;
    let htmltag = _element2tagname(Class) ?? undefined;
    const LISSclass = ComponentClass.Host; //buildLISSHost<T>(ComponentClass, params);
    const opts = htmltag === undefined ? {}
        : { extends: htmltag };
    customElements.define(tagname, LISSclass, opts);
}
;
export async function whenDefined(tagname) {
    return await customElements.whenDefined(tagname);
}
export async function whenAllDefined(tagnames) {
    await Promise.all(tagnames.map(t => customElements.whenDefined(t)));
}
export function isDefined(name) {
    return customElements.get(name) !== undefined;
}
export function getName(element) {
    if ("Host" in element.constructor)
        element = element.constructor.Host;
    if ("Host" in element)
        element = element.Host;
    if ("Base" in element.constructor)
        element = element.constructor;
    if ("Base" in element) {
        const name = customElements.getName(element);
        if (name === null)
            throw new Error("not defined!");
        return name;
    }
    if (!(element instanceof Element))
        throw new Error('???');
    const name = element.getAttribute('is') ?? element.tagName.toLowerCase();
    if (!name.includes('-'))
        throw new Error(`Element ${name} is not a WebComponent`);
    return name;
}
export function getHostCstr(name) {
    return customElements.get(name);
}
export function getBaseCstr(name) {
    return getHostCstr(name).Base;
}
//# sourceMappingURL=customRegistery.js.map