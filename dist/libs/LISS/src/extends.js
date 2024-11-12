import { LISS as _LISS } from "./LISSBase";
import { buildLISSHost } from "LISSHost";
export class ILISS {
}
export default LISS;
export function LISS(opts) {
    if (opts.extends !== undefined && "Host" in opts.extends) // we assume this is a LISSBaseCstr
        return _extends(opts);
    return _LISS(opts);
}
function _extends(opts) {
    if (opts.extends === undefined) // h4ck
        throw new Error('please provide a LISSBase!');
    const base = opts.extends.LISSCfg;
    const host = opts.host ?? base.host;
    let deps = base.deps;
    if (opts.deps !== undefined)
        deps = [...deps, ...opts.deps];
    let attrs = base.attrs;
    if (opts.attrs !== undefined)
        attrs = [...attrs, ...opts.attrs];
    let params = base.params;
    if (opts.params !== undefined)
        params = Object.assign(params, opts.params);
    //TODO: issues with async content/CSS + some edge cases...
    let content_factory = base.content_factory;
    if (opts.content !== undefined)
        // @ts-ignore
        content_factory = opts.content_factory(opts.content);
    let stylesheets = base.stylesheets;
    if (opts.css !== undefined)
        // @ts-ignore
        stylesheets = [...stylesheets, ...opts.css];
    const shadow = opts.shadow ?? base.shadow;
    class ExtendedLISS extends opts.extends {
        //TODO: fix types...
        static LISSCfg = {
            host,
            deps,
            attrs,
            params,
            content_factory,
            stylesheets,
            shadow,
        };
        static _Host;
        //TODO: fix TS type...
        static get Host() {
            if (this._Host === undefined)
                this._Host = buildLISSHost(this); //TODO: fix type error (why???)
            return this._Host;
        }
    }
    return ExtendedLISS;
}
/*
function extendsLISS<Extends extends Class,
    Host    extends HTMLElement,
    Attrs1   extends string,
    Attrs2   extends string,
    Params  extends Record<string,any>,
    T extends LISSReturnType<Extends, Host, Attrs1, Params>>(Liss: T,
        parameters: {
            shadow      ?: ShadowCfg,
            attributes  ?: readonly Attrs2[],
            dependencies?: readonly Promise<any>[]
        }) {

    const attributes   = [...Liss.Parameters.attributes  , ...parameters.attributes  ??[]];
    const dependencies = [...Liss.Parameters.dependencies, ...parameters.dependencies??[]];

    const params = Object.assign({}, Liss.Parameters, {
        attributes,
        dependencies
    });
    if( parameters.shadow !== undefined)
        params.shadow = parameters.shadow;

    // @ts-ignore : because TS stupid
    class ExtendedLISS extends Liss {
        constructor(...t: any[]) {
            // @ts-ignore : because TS stupid
            super(...t);
        }

        protected override get attrs() {
            return super.attrs as Record<Attrs2|Attrs1, string|null>;
        }

        static override Parameters = params;
    }

    return ExtendedLISS;
}
LISS.extendsLISS = extendsLISS;
*/ 
//# sourceMappingURL=extends.js.map