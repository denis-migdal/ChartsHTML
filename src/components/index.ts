
import LISS, {ShadowCfg} from "../../libs/LISS/src/index.ts";;
import type ChartHTML from '..';
import { StringEval } from "..";

export default class GraphComponent extends LISS({shadow: ShadowCfg.NONE,attrs: ['name']}) {

    #chart?: ChartHTML;

    constructor(params: Record<string,any> = {}) {
        super();

        for(let key in params ) {
            if( key === "content" ) {
                if( typeof params.content === "string" ) {
                    this.host.textContent = "str:" + params.content;
                    continue;
                }
                this.host.textContent = JSON.stringify(params.content);
                continue;
            }
            this.attrs[key] = params[key];
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

    override onAttrChanged(_name: string, _oldValue: string, _newValue: string): false | void {

        this._update();
        if(this.#chart !== undefined)
            this.#chart.update();
    }

    // external
    _attach(chart: ChartHTML) {
        this.#chart = chart;
        this._insert();

        if( this.isInDOM)
            this._update();
    }
    _detach() {}
}