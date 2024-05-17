import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

import {Chart} from 'chart.js';

export default class Value extends GraphComponent {

    constructor() {
        super();
        this.host.setAttribute('slot', 'dataset');

        const observer = new MutationObserver( () => {
            this._update()
        });
        observer.observe(this.host, {characterData: true, subtree: true});
    }

    override _update(): void {
        //TODO: validate config...
        this.chart.setValue(this.attrs.name, this.contentParsed);
    }
}
LISS.define('chart-value', Value);