import { ShadowCfg } from "./types";
import { LISSState } from "./state";
import { setCstrHost } from "./LISSBase";
import { isDOMContentLoaded, waitDOMContentLoaded } from "./utils";
let id = 0;
const sharedCSS = new CSSStyleSheet();
export function getSharedCSS() {
    return sharedCSS;
}
export function buildLISSHost(Liss) {
    const { host, attrs, content_factory, stylesheets, shadow, } = Liss.LISSCfg;
    // attrs proxy
    const GET = Symbol('get');
    const SET = Symbol('set');
    const properties = Object.fromEntries(attrs.map(n => [n, {
            enumerable: true,
            get: function () { return this[GET](n); },
            set: function (value) { return this[SET](n, value); }
        }]));
    class Attributes {
        #data;
        #defaults;
        #setter;
        [GET](name) {
            return this.#data[name] ?? this.#defaults[name] ?? null;
        }
        ;
        [SET](name, value) {
            return this.#setter(name, value); // required to get a clean object when doing {...attrs}
        }
        constructor(data, defaults, setter) {
            this.#data = data;
            this.#defaults = defaults;
            this.#setter = setter;
            Object.defineProperties(this, properties);
        }
    }
    const alreadyDeclaredCSS = new Set();
    const waitReady = new Promise(async (r) => {
        await waitDOMContentLoaded();
        await Promise.all(Liss.LISSCfg.deps);
        isReady = true;
        r();
    });
    // No deps and DOM already loaded.
    let isReady = Liss.LISSCfg.deps.length == 0 && isDOMContentLoaded();
    const params = { ...Liss.LISSCfg.params }; //Object.assign({}, Liss.LISSCfg.params, _params);
    //
    const whenDepsResolved = Promise.all(Liss.LISSCfg.deps);
    let isDepsResolved = false;
    (async () => {
        await whenDepsResolved;
        isDepsResolved = true;
    })();
    class LISSHostBase extends host {
        // adopt state if already created.
        state = this.state ?? new LISSState(this);
        // ============ DEPENDENCIES ==================================
        static whenDepsResolved = whenDepsResolved;
        static get isDepsResolved() {
            return isDepsResolved;
        }
        // ============ INITIALIZATION ==================================
        static Base = Liss;
        #base = null;
        get base() {
            return this.#base;
        }
        get isInitialized() {
            return this.#base !== null;
        }
        whenInitialized;
        #whenInitialized_resolver;
        initialize(params = {}) {
            if (this.isInitialized)
                throw new Error('Element already initialized!');
            if (!this.constructor.isDepsResolved)
                throw new Error("Dependencies hasn't been loaded !");
            Object.assign(this.#params, params);
            this.#base = this.init();
            if (this.isConnected)
                this.#base.onDOMConnected();
            return this.#base;
        }
        // =================================
        #params = params;
        get params() {
            return this.#params;
        }
        updateParams(params) {
            if (this.isInitialized)
                // @ts-ignore
                return this.base.updateParams(params);
            // wil be given to constructor...
            Object.assign(this.#params, params);
        }
        // ============== Attributes ===================
        #attrs_flag = false;
        #attributes = {};
        #attributesDefaults = {};
        #attrs = new Attributes(this.#attributes, this.#attributesDefaults, (name, value) => {
            this.#attributes[name] = value;
            this.#attrs_flag = true; // do not trigger onAttrsChanged.
            if (value === null)
                this.removeAttribute(name);
            else
                this.setAttribute(name, value);
        });
        setAttrDefault(name, value) {
            if (value === null)
                delete this.#attributesDefaults[name];
            else
                this.#attributesDefaults[name] = value;
        }
        get attrs() {
            return this.#attrs;
        }
        // ============== Content ===================
        #content = null;
        get content() {
            return this.#content;
        }
        getPart(name) {
            return this.hasShadow
                ? this.#content?.querySelector(`::part(${name})`)
                : this.#content?.querySelector(`[part="${name}"]`);
        }
        getParts(name) {
            return this.hasShadow
                ? this.#content?.querySelectorAll(`::part(${name})`)
                : this.#content?.querySelectorAll(`[part="${name}"]`);
        }
        get hasShadow() {
            return shadow !== 'none';
        }
        /*** CSS ***/
        get CSSSelector() {
            if (this.hasShadow || !this.hasAttribute("is"))
                return this.tagName;
            return `${this.tagName}[is="${this.getAttribute("is")}"]`;
        }
        // ============== Impl ===================
        // h4cky
        #extra_cstr_args;
        constructor(params, base, ...extra_cstr_args) {
            super();
            this.#extra_cstr_args = extra_cstr_args;
            Object.assign(this.#params, params);
            let { promise, resolve } = Promise.withResolvers();
            this.whenInitialized = promise;
            this.#whenInitialized_resolver = resolve;
            if (base !== undefined) {
                this.#base = base;
                this.init(); // call the resolver
            }
            if ("_whenUpgradedResolve" in this)
                this._whenUpgradedResolve();
        }
        // ====================== DOM ===========================		
        disconnectedCallback() {
            this.base.onDOMDisconnected();
        }
        connectedCallback() {
            // TODO: life cycle options
            if (this.isInitialized) {
                this.base.onDOMConnected();
                return;
            }
            // TODO: life cycle options
            if (this.state.isReady) {
                this.initialize(); // automatically calls onDOMConnected
                return;
            }
            (async () => {
                await this.state.isReady;
                if (!this.isInitialized)
                    this.initialize();
            })();
        }
        get shadowRoot() {
            console.warn("called");
            if (shadow === ShadowCfg.SEMIOPEN)
                return null;
            return super.shadowRoot;
        }
        init() {
            customElements.upgrade(this);
            //TODO: wait parents/children depending on option...
            // shadow
            this.#content = this;
            if (shadow !== 'none') {
                const mode = shadow === ShadowCfg.SEMIOPEN ? 'open' : shadow;
                this.#content = this.attachShadow({ mode });
                //@ts-ignore
                //this.#content.addEventListener('click', onClickEvent);
                //@ts-ignore
                //this.#content.addEventListener('dblclick', onClickEvent);
            }
            // attrs
            for (let obs of attrs)
                this.#attributes[obs] = this.getAttribute(obs);
            // css
            if (shadow !== 'none')
                this.#content.adoptedStyleSheets.push(sharedCSS);
            if (stylesheets.length) {
                if (shadow !== 'none')
                    this.#content.adoptedStyleSheets.push(...stylesheets);
                else {
                    const cssselector = this.CSSSelector;
                    // if not yet inserted :
                    if (!alreadyDeclaredCSS.has(cssselector)) {
                        let style = document.createElement('style');
                        style.setAttribute('for', cssselector);
                        let html_stylesheets = "";
                        for (let style of stylesheets)
                            for (let rule of style.cssRules)
                                html_stylesheets += rule.cssText + '\n';
                        style.innerHTML = html_stylesheets.replace(':host', `:is(${cssselector})`);
                        document.head.append(style);
                        alreadyDeclaredCSS.add(cssselector);
                    }
                }
            }
            // content
            const content = content_factory(this.attrs, this.params, this);
            if (content !== undefined)
                this.#content.append(content);
            // build
            // h4ck, okay because JS is monothreaded.
            setCstrHost(this);
            let obj = this.base === null ? new Liss(params, ...this.#extra_cstr_args) : this.base;
            this.#base = obj;
            // default slot
            if (this.hasShadow && this.#content.childNodes.length === 0)
                this.#content.append(document.createElement('slot'));
            this.#whenInitialized_resolver(this.base);
            return this.base;
        }
        // attrs
        static observedAttributes = attrs;
        attributeChangedCallback(name, oldValue, newValue) {
            if (this.#attrs_flag) {
                this.#attrs_flag = false;
                return;
            }
            this.#attributes[name] = newValue;
            if (!this.isInitialized)
                return;
            if (this.base.onAttrChanged(name, oldValue, newValue) === false) {
                this.#attrs[name] = oldValue; // revert the change.
            }
        }
    }
    ;
    return LISSHostBase;
}
//# sourceMappingURL=LISSHost.js.map