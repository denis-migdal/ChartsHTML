import { setCstrHost } from "./LISSControler";
import { States } from "./LifeCycle/states";
// LISSHost must be build in define as it need to be able to build
// the defined subclass.
let id = 0;
const sharedCSS = new CSSStyleSheet();
export function getSharedCSS() {
    return sharedCSS;
}
let __cstr_controler = null;
export function setCstrControler(_) {
    __cstr_controler = _;
}
export function buildLISSHost(Liss, 
// can't deduce : cause type deduction issues...
hostCstr, content_generator_cstr, args) {
    const content_generator = new content_generator_cstr(args);
    class LISSHost extends hostCstr {
        static Cfg = {
            host: hostCstr,
            content_generator: content_generator_cstr,
            args
        };
        // ============ DEPENDENCIES ==================================
        static whenDepsResolved = content_generator.whenReady();
        static get isDepsResolved() {
            return content_generator.isReady;
        }
        // ============ INITIALIZATION ==================================
        static Controler = Liss;
        #controler = null;
        get controler() {
            return this.#controler;
        }
        get isInitialized() {
            return this.#controler !== null;
        }
        whenInitialized;
        #whenInitialized_resolver;
        //TODO: get real TS type ?
        #params;
        initialize(...params) {
            if (this.isInitialized)
                throw new Error('Element already initialized!');
            if (!this.constructor.isDepsResolved)
                throw new Error("Dependencies hasn't been loaded !");
            if (params.length !== 0) {
                if (this.#params.length !== 0)
                    throw new Error('Cstr params has already been provided !');
                this.#params = params;
            }
            this.#controler = this.init();
            if (this.isConnected)
                this.#controler.connectedCallback();
            return this.#controler;
        }
        // ============== Content ===================
        #internals = this.attachInternals();
        #states = this.#internals.states;
        #content = this;
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
        attachShadow(init) {
            const shadow = super.attachShadow(init);
            // @ts-ignore closed IS assignable to shadowMode...
            this.shadowMode = init.mode;
            this.#content = shadow;
            return shadow;
        }
        get hasShadow() {
            return this.shadowMode !== 'none';
        }
        /*** CSS ***/
        get CSSSelector() {
            if (this.hasShadow || !this.hasAttribute("is"))
                return this.tagName;
            return `${this.tagName}[is="${this.getAttribute("is")}"]`;
        }
        // ============== Impl ===================
        constructor(...params) {
            super();
            this.#states.add(States.LISS_UPGRADED);
            content_generator.whenReady().then(() => {
                this.#states.add(States.LISS_READY);
            });
            this.#params = params;
            let { promise, resolve } = Promise.withResolvers();
            this.whenInitialized = promise;
            this.#whenInitialized_resolver = resolve;
            const controler = __cstr_controler;
            __cstr_controler = null;
            if (controler !== null) {
                this.#controler = controler;
                this.init(); // call the resolver
            }
            if ("_whenUpgradedResolve" in this)
                this._whenUpgradedResolve();
        }
        // ====================== DOM ===========================		
        disconnectedCallback() {
            if (this.controler !== null)
                this.controler.disconnectedCallback();
        }
        connectedCallback() {
            // TODO: life cycle options
            if (this.isInitialized) {
                this.controler.connectedCallback();
                return;
            }
            // TODO: instance deps
            if (content_generator.isReady) {
                this.initialize(); // automatically calls onDOMConnected
                return;
            }
            (async () => {
                await content_generator.whenReady();
                if (!this.isInitialized)
                    this.initialize();
            })();
        }
        static get observedAttributes() {
            return LISSHost.Controler.observedAttributes;
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (this.#controler)
                this.#controler.attributeChangedCallback(name, oldValue, newValue);
        }
        shadowMode = null;
        init() {
            // no needs to set this.#content (already host or set when attachShadow)
            content_generator.generate(this);
            //@ts-ignore
            //this.#content.addEventListener('click', onClickEvent);
            //@ts-ignore
            //this.#content.addEventListener('dblclick', onClickEvent);
            if (this.#controler === null) {
                // h4ck, okay because JS is monothreaded.
                setCstrHost(this);
                this.#controler = new LISSHost.Controler(...this.#params);
            }
            this.#states.add(States.LISS_INITIALIZED);
            this.#whenInitialized_resolver(this.controler);
            return this.controler;
        }
    }
    ;
    return LISSHost;
}
//# sourceMappingURL=LISSHost.js.map