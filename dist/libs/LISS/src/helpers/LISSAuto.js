import { LISS } from "../LISSBase";
import { define } from "../customRegistery";
import { html } from "../utils";
// should be improved (but how ?)
const script = document.querySelector('script[autodir]');
if (script !== null) {
    const RESSOURCES = [
        "index.js",
        "index.bry",
        "index.html",
        "index.css"
    ];
    const KnownTags = new Set();
    const SW = new Promise(async (resolve) => {
        await navigator.serviceWorker.register(script.getAttribute('sw') ?? "/sw.js", { scope: "/" });
        if (navigator.serviceWorker.controller) {
            resolve();
            return;
        }
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            resolve();
        });
    });
    let components_dir = script.getAttribute('autodir');
    if (components_dir[0] === '.')
        components_dir = window.location.pathname + components_dir; // getting an absolute path.
    if (components_dir[components_dir.length - 1] !== '/')
        components_dir += '/';
    // observe for new injected tags.
    new MutationObserver((mutations) => {
        for (let mutation of mutations)
            for (let addition of mutation.addedNodes)
                if (addition instanceof HTMLElement)
                    addTag(addition);
    }).observe(document, { childList: true, subtree: true });
    for (let elem of document.querySelectorAll("*"))
        addTag(elem);
    async function addTag(tag) {
        const tagname = (tag.getAttribute('is') ?? tag.tagName).toLowerCase();
        if (!tagname.includes('-') || KnownTags.has(tagname))
            return;
        KnownTags.add(tagname);
        await SW; // ensure SW is installed.
        const filenames = RESSOURCES;
        const resources = await Promise.all(filenames.map(file => {
            const file_path = `${components_dir}${tagname}/${file}`;
            return file.endsWith('.js') ? _import(file_path, true)
                : _fetchText(file_path, true);
        }));
        const files = {};
        for (let i = 0; i < filenames.length; ++i)
            if (resources[i] !== undefined)
                files[filenames[i]] = resources[i];
        const content = files["index.html"];
        const css = files["index.css"];
        let host = undefined;
        if (tag.hasAttribute('is'))
            host = tag.constructor;
        const opts = {
            ...content !== undefined && { content },
            ...css !== undefined && { css },
            ...host !== undefined && { host },
        };
        return defineWebComponent(tagname, files, opts);
    }
    function defineWebComponent(tagname, files, opts) {
        const js = files["index.js"];
        const content = files["index.html"];
        let klass = null;
        if (js !== undefined)
            klass = js(opts);
        else if (content !== undefined) {
            klass = LISSAuto(opts.content, opts.css, opts.host);
        }
        if (klass === null)
            throw new Error(`Missing files for WebComponent ${tagname}.`);
        return define(tagname, klass);
    }
    // ================================================
    // =============== LISS internal tools ============
    // ================================================
    async function _fetchText(uri, isLissAuto = false) {
        const options = isLissAuto
            ? { headers: { "liss-auto": "true" } }
            : {};
        const response = await fetch(uri, options);
        if (response.status !== 200)
            return undefined;
        if (isLissAuto && response.headers.get("status") === "404")
            return undefined;
        return await response.text();
    }
    async function _import(uri, isLissAuto = false) {
        // test for the module existance.
        if (isLissAuto && await _fetchText(uri, isLissAuto) === undefined)
            return undefined;
        try {
            return (await import(/* webpackIgnore: true */ uri)).default;
        }
        catch (e) {
            console.log(e);
            return undefined;
        }
    }
}
//TODO: improve ?
export function LISSAuto(content, css, host) {
    const opts = { content, css, host };
    //TODO: {}
    //TODO: CSS_factory too ??? ou css-toto="toto" (?)
    opts.content_factory = (str) => {
        str = str.replaceAll(/\$\{([\w]+)\}/g, (_, name) => {
            return `<liss value="${name}"></liss>`;
        });
        //TODO: ${} in attr
        // - detect start ${ + end }
        // - register elem + attr name
        // - replace. 
        const content = html `${str}`;
        let spans = content.querySelectorAll('liss[value]');
        return (_a, _b, elem) => {
            // can be optimized...
            for (let span of spans)
                span.textContent = elem.getAttribute(span.getAttribute('value'));
            return content.cloneNode(true);
        };
    };
    const klass = class WebComponent extends LISS(opts) {
        constructor(...args) {
            super(...args);
            const css_attrs = this.host.getAttributeNames().filter(e => e.startsWith('css-'));
            for (let css_attr of css_attrs)
                this.host.style.setProperty(`--${css_attr.slice('css-'.length)}`, this.host.getAttribute(css_attr));
        }
    };
    return klass;
}
//# sourceMappingURL=LISSAuto.js.map