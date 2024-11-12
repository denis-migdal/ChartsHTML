import { ShadowCfg } from "./types";
import { buildLISSHost } from "./LISSHost";
import { _element2tagname, isShadowSupported, html } from "./utils";
let __cstr_host = null;
export function setCstrHost(_) {
    __cstr_host = _;
}
export function DEFAULT_CONTENT_FACTORY(content) {
    if (typeof content === "string") {
        content = content.trim();
        if (content.length === 0)
            content = undefined;
        if (content !== undefined)
            content = html `${content}`;
        // TODO LISSAuto parser...
        // only if no JS...
        // tolerate non-opti (easier ?) or span[value] ?
        // => record element with target...
        // => clone(attrs, params) => for each span replace then clone.
        // https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string
        //let str = (content as string).replace(/\$\{(.+?)\}/g, (_, match) => this.getAttribute(match)??'')
    }
    if (content instanceof HTMLTemplateElement)
        content = content.content;
    return () => content?.cloneNode(true);
}
export function LISS({ 
// JS Base
extends: _extends = Object, /* extends is a JS reserved keyword. */ params = {}, 
// non-generic
deps = [], 
// HTML Base
host = HTMLElement, observedAttributes = [], // for vanilla compat.
attrs = observedAttributes, 
// non-generic
content, content_factory: _content_factory = DEFAULT_CONTENT_FACTORY, css, shadow = isShadowSupported(host) ? ShadowCfg.SEMIOPEN : ShadowCfg.NONE } = {}) {
    if (shadow !== ShadowCfg.NONE && !isShadowSupported(host))
        throw new Error(`Host element ${_element2tagname(host)} does not support ShadowRoot`);
    const all_deps = [...deps];
    let content_factory;
    // content processing
    if (content instanceof Promise || content instanceof Response) {
        let _content = content;
        content = null;
        all_deps.push((async () => {
            _content = await _content;
            if (_content instanceof Response) // from a fetch...
                _content = await _content.text();
            LISSBase.LISSCfg.content_factory = _content_factory(_content);
        })());
    }
    else {
        content_factory = _content_factory(content);
    }
    // CSS processing
    let stylesheets = [];
    if (css !== undefined) {
        if (!Array.isArray(css))
            // @ts-ignore : todo: LISSOpts => should not be a generic ?
            css = [css];
        // @ts-ignore
        stylesheets = css.map((c, idx) => {
            if (c instanceof Promise || c instanceof Response) {
                all_deps.push((async () => {
                    c = await c;
                    if (c instanceof Response)
                        c = await c.text();
                    stylesheets[idx] = process_css(c);
                })());
                return null;
            }
            return process_css(c);
        });
    }
    class LISSBase extends _extends {
        constructor(...args) {
            super(...args);
            // h4ck, okay because JS is monothreaded.
            if (__cstr_host === null)
                __cstr_host = new this.constructor.Host({}, this);
            this.#host = __cstr_host;
            __cstr_host = null;
        }
        #host; // prevents issue #1...
        // LISS Configs
        static LISSCfg = {
            host,
            deps,
            attrs,
            params,
            content_factory,
            stylesheets,
            shadow,
        };
        get state() {
            return this.#host.state;
        }
        get host() {
            return this.#host;
        }
        //TODO: get the real type ?
        get content() {
            return this.#host.content;
        }
        // attrs
        get attrs() {
            return this.#host.attrs;
        }
        setAttrDefault(attr, value) {
            return this.#host.setAttrDefault(attr, value);
        }
        onAttrChanged(_name, _oldValue, _newValue) { }
        // for vanilla compat.
        get observedAttributes() {
            return this.attrs;
        }
        attributeChangedCallback(...args) {
            this.onAttrChanged(...args);
        }
        // parameters
        get params() {
            return this.#host.params;
        }
        updateParams(params) {
            Object.assign(this.#host.params, params);
        }
        // DOM
        get isInDOM() {
            return this.#host.isConnected;
        }
        onDOMConnected() {
            this.connectedCallback();
        }
        onDOMDisconnected() {
            this.disconnectedCallback();
        }
        // for vanilla compat
        connectedCallback() { }
        disconnectedCallback() { }
        get isConnected() {
            return this.isInDOM;
        }
        static _Host;
        static get Host() {
            if (this._Host === undefined)
                this._Host = buildLISSHost(this); //TODO: fix type error (why???)
            return this._Host;
        }
    }
    return LISSBase;
}
function process_css(css) {
    if (css instanceof CSSStyleSheet)
        return css;
    if (css instanceof HTMLStyleElement)
        return css.sheet;
    let style = new CSSStyleSheet();
    if (typeof css === "string") {
        style.replaceSync(css); // replace() if issues
        return style;
    }
    throw new Error("Should not occurs");
}
//# sourceMappingURL=LISSBase.js.map