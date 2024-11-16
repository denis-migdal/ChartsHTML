
import LISS, {ShadowCfg} from "../../libs/LISS/src/index.ts";;
import type {ChartHTML} from '..';
import { StringEval } from "../StringEval";

//TODO: observe content too...
class DataManager {

    #elem: HTMLElement;
    #data: Record<string, string|null> = {};
    #defaults: Record<string, string|null> = {};

    constructor(elem: HTMLElement) {
        this.#elem = elem;
    }

    //TODO: default value
    //TODO: include parsing ?

    setDefault(name: string, value: string) {
        this.#defaults[name] = value;
    }

    setValue(name: string, value: string|null, updateAttr = true) {
        this.#data[name] = value;

        if(value === null) {
            this.#elem.removeAttribute(name);
            return;
        }
        if( updateAttr )
            this.#elem.setAttribute(name, value!);
    }

    getValue(name: string) {
        let value = this.#data[name];
        if( value === undefined )
            value = this.#data[name] = this.#elem.getAttribute(name);

        if( value === null && name in this.#defaults)
            return this.#defaults[name];
        return value;
    }
}

// ,attrs: ['name']
export default class GraphComponent extends LISS({shadow: ShadowCfg.NONE}) {

    protected data = new DataManager(this.host);

    static override readonly observedAttributes = ['name'];
    override attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
        if(oldValue === newValue)
            return;
        this.data.setValue(name, newValue, false);

        this._update();
        if(this.#chart !== undefined)
            this.#chart.update();
    }

    #chart?: ChartHTML;

    constructor(params: Record<string,any> = {}) {

        super();

        for(let key in params ) {
            if( key === "content" ) {
                if( typeof params.content === "string" ) {
                    this.host.textContent = "str:" + params.content;
                    continue;
                }
                if( typeof params.content === 'function') {
                    this._content_eval.setString(params.content);
                }
                this.host.textContent = JSON.stringify(params.content);
                continue;
            }
            this.data.setValue(key, params[key], false);
        }

        this.#contentInit();
    }

    // TextContent
    protected _content_eval = new StringEval<any>(this);
    #content_parsed: undefined|any = undefined;
    #contentInit() {
        const observer = new MutationObserver( () => {

            this._content_eval.setString(this.host.textContent);

            this._update();
            
            if(this.chart !== undefined)
                this.chart.update();
        });
        observer.observe(this.host, {characterData: true, subtree: true});

        this._content_eval.setString(this.host.textContent);
    }
    protected _contentParser(content: unknown): any {
        return content;
    }

    get contentParsed() {
        if(this.#content_parsed !== undefined)
            return this.#content_parsed;

        return this.#content_parsed = this._contentParser( this._content_eval.eval({}) );
    }

    // chart
    get chart() {
        return this.#chart!;
    }

    update() {
        this.#content_parsed = undefined;
        this._update();
    }

    // redefine
    _insert() {}
    _update() {}
    _before_chart_update() {}
    //TODO !!! rename !!!

    // external
    _attach(chart: ChartHTML) {

        this.#chart = chart;
        this._insert();

        if( this.isConnected)
            this._update();
    }
    _detach() {}
}