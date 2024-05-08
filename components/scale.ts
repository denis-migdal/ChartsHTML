import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

import {Chart} from 'chart.js';

export default class Scale extends LISS.extendsLISS(GraphComponent, {attributes: ['min', 'max', 'position']}) {

    #chart?: ChartHTML;

    constructor() {
        super();

        this.host.setAttribute('slot', 'scale');
    }

    protected override _contentParser(content: string) {

        if( content.trim() === '')
            return null;
        return content.split(',').map(l => l.trim());
    }

    #data: any = {};

    override _update() {//TODO: validate config...

        const {name,position,min,max} = this.attrs;
        if( name === null)
            throw new Error('name is null');

        const labels = this.contentParsed;

        let scale = this.chart._chartJS.options.scales![name]!;
        if(labels !== null) {

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
        this.chart._chartJS.options.scales![this.attrs.name!] = {};
    }
}
LISS.define('chart-scale', Scale);