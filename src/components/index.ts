
import LISS, {ShadowCfg} from "../../libs/LISS/src/index.ts";;
import type {ChartHTML} from '..';

import { PropertiesManager } from "PropertiesManager.ts";

/****/

export default class GraphComponent extends LISS({shadow: ShadowCfg.NONE}) {

    static override readonly observedAttributes = ['name'];

    protected propertiesManager = new PropertiesManager(this.host);

    constructor(params: Record<string,any>) {
        super();

        this.propertiesManager.changes.listen( () => {

            // TODO: wait chart.update()
            // TODO: only update if changes (here).
                // request update vs update...
            // TODO: chart.js throttle
            this._update();
            
            if(this.chart !== undefined)
                this.chart.update();
        });


        /* for(let key in params ) {
            if( key === "content" ) {
                if( typeof params.content === "string" ) {
                    this.host.textContent = "str:" + params.content;
                    continue;
                }
                if( typeof params.content === 'function') {
                    throw new Error("not implemented yet");
                    //this.parsedContent.value = params.content;
                }
                this.host.textContent = JSON.stringify(params.content);
                continue;
            }
            this.data.setValue(key, params[key], false);
        }*/
    }

    /****/
    #chart?: ChartHTML;

    // chart
    get chart() {
        return this.#chart!;
    }

    update() {
        this._update();
    }
    _update() {}
    _before_chart_update() {}

    //TODO: review attach/detach system...
    // redefine
    _insert() {}
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