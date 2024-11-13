import type ChartHTML from "..";
import GraphComponent from ".";
import LISS from "../../libs/LISS/src/index.ts";;

import {Chart} from 'chart.js';

export default class Value extends LISS({extends: GraphComponent}) {

    constructor(...args: any[]) {
        super(...args);
        this.host.setAttribute('slot', 'dataset');

        const observer = new MutationObserver( () => {
            this._update()
        });
        observer.observe(this.host, {characterData: true, subtree: true});
    }

    override _update(): void {

        //TODO: validate config...
        this.chart.setValue(this.attrs.name!, this.contentParsed);
    }
}
LISS.define('chart-value', Value);