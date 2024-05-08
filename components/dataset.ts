import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

import {Chart} from 'chart.js';

export default class Dataset extends LISS.extendsLISS(GraphComponent, {attributes: ['type', 'color']}) {

    #chart?: ChartHTML;

    constructor() {
        super();
        this.host.setAttribute('slot', 'dataset');
    }

    #dataset = {
        data: [],
        type: this.attrs.type
    };
    get dataset() {
        return this.#dataset as any;
    }

    override _insert(): void {
        //@ts-ignore
        this.chart._chartJS.data.datasets.push(this.#dataset);
    }

    override _update(): void {
        //TODO: validate config...
        const {type, color} = this.attrs;
        
        this.#dataset.type = type;
        this.#dataset.data = this.contentParsed;

        if(color !== null) {
            this.dataset.borderColor = '#00FF00';
            this.dataset.backgroundColor = '#00FF00';
        }
    }
}
LISS.define('chart-dataset', Dataset);