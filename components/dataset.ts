import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

import {Chart} from 'chart.js';

export default class Dataset extends LISS({extends: GraphComponent, attributes: ['name', 'type', 'color']}) {

    #chart?: ChartHTML;

    constructor() {
        super();
        this.host.setAttribute('slot', 'dataset');

        const observer = new MutationObserver( () => {
            this._update()
            
            if(this.chart !== undefined)
                this.chart.update('none'); //TODO move 2 father - move 2 update
        });
        observer.observe(this.host, {characterData: true, subtree: true});
    }

    #dataset = {
        data: [],
        type: this.attrs.type
    };

    #data:any;
    get data() {
        return this.#data;
    }

    get dataset() {
        return this.#dataset as any;
    }

    override _insert(): void {
        //@ts-ignore
        this.chart.data.datasets.push(this.#dataset);
    }

    get curve_data() {
        return this.#data;
    }

    override _update(): void {
        //TODO: validate config...
        const {type, color} = this.attrs;
        
        this.#dataset.type = type;

        this.#data = JSON.parse(this.host.textContent!); //TODO fct override
        this.#dataset.data = this.curve_data;

        if(color !== null) {
            this.dataset.borderColor = '#00FF00';
            this.dataset.backgroundColor = '#00FF00';
        }
    }
}
LISS.define('chart-dataset', Dataset);