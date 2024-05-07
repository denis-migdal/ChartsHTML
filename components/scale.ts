import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

import {Chart} from 'chart.js';

export default class Scale extends LISS({extends: GraphComponent, attributes: ['name', 'min', 'max', 'position']}) {

    #chart?: ChartHTML;

    constructor() {
        super();
        this.host.setAttribute('slot', 'scale');

        const observer = new MutationObserver( () => {
            this._update()
            
            if(this.chart !== undefined)
                this.chart.update('none'); //TODO move 2 father - move 2 update
        });
        observer.observe(this.host, {characterData: true, subtree: true});
    }

    #data: any = {};

    override _update() {//TODO: validate config...

        const {name,position,min,max} = this.attrs;
        if( name === null)
            throw new Error('name is null');

        const labels_text = this.host.textContent!.trim();

        let scale = this.chart.options.scales![name]!;
        if(labels_text !== '') {

            const labels = labels_text.split(',').map(l => l.trim());
            
            Object.assign(scale, {
                type   : "category",
                offset : true,
                labels,
                grid: {
                    offset: true
                },
            });

            if( name[0] === 'y') {
                scale.reverse = true;
                scale.ticks = {
                    padding: 0,
                    align: 'start',
                    crossAlign: 'center',
                    maxRotation: 90,
                    minRotation: 90
                };
            }

        } else {

            Object.assign(scale, { //TODO find real type
                min: min,
                max: max,
                beginAtZero: true,
                type: 'linear',
                offset : false,
                grid: {
                    offset: false,
                },
            });
        }

        if( position !== null)
            //@ts-ignore
            scale.position = position;
    }


    override _insert() {
        this.chart.options.scales![this.attrs.name!] = {};
    }
}
LISS.define('chart-scale', Scale);