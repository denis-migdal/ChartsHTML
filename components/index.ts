
import LISS, {ShadowCfg} from "LISS";
import type ChartHTML from './';

export default class GraphComponent extends LISS({shadow: ShadowCfg.NONE,attributes: ['name']}) {

    #chart?: ChartHTML;

    constructor() {
        super();

        this.#contentInit();
    }

    // TextContent
    #content_raw: string|null = null;
    #content_parsed: any = undefined;
    #contentInit() {
        const observer = new MutationObserver( () => {

            this.#content_raw = this.host.textContent;
            this.#content_parsed = undefined;

            this._update();
            
            if(this.chart !== undefined)
                this.chart._chartJS.update('none'); //TODO move 2 father - move 2 update
        });
        observer.observe(this.host, {characterData: true, subtree: true});

        this.#content_raw = this.host.textContent;
    }
    protected _contentParser(content: string) {
        return JSON.parse(content);
    }
    get contentParsed() {
        if(this.#content_parsed !== undefined)
            return this.#content_parsed;
        if( this.#content_raw === null)
            return this.#content_parsed = null;

        let content = this.#content_raw;
        if( content[0] === '@' )
            content = this.chart.getValue(content);
        return this.#content_parsed = this._contentParser(content);
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

    //internal
    //TODO !!! rename !!!

    #parsed_attrs = null;
    #parsed_content = null;

    override onAttrChanged(_name: string, _oldValue: string, _newValue: string): false | void {

        this._update();
        if(this.#chart !== undefined)
            this.#chart._chartJS.update('none'); //TODO move 2 father - move 2 update
    }

    // external
    _attach(chart: ChartHTML) {
        this.#chart = chart;
        this._insert();
        this._update();
    }
    _detach() {}
}