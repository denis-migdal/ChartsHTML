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

        console.log(color);

        if(color !== null) {
            this.dataset.borderColor = color;
            this.dataset.backgroundColor = color;
        }
    }
}
LISS.define('chart-dataset', Dataset);