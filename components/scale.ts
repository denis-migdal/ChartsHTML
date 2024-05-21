import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

export default class Scale extends LISS.extendsLISS(GraphComponent, {attributes: ['min', 'max', 'position']}) {

    #chart?: ChartHTML;

    constructor() {
        super();

        this.host.setAttribute('slot', 'scale');
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
                beginAtZero: true,
                type: 'linear',
                offset : false,
                grid: {
                    offset: false,
                },
            });

            if( min !== null)
                scale.min = +min;
            if( max !== null)
                scale.max = +max;

        }

        if( position !== null)
            //@ts-ignore
            scale.position = position;

    }

    // compute implicit min/max.
    override _before_chart_update() {

        const scale_name = this.attrs.name!
        const scale = this.chart._chartJS.options.scales![scale_name]!;

        if(scale.type !== 'linear')
            return;

        let max = Number.NEGATIVE_INFINITY;

        if( this.attrs.min === null ) {

            let min = Number.POSITIVE_INFINITY;

            let pos;
            for(let dataset of this.chart._chartJS.data.datasets) {

                for(let point of dataset.data) {
                    pos = (point as any)[scale_name];
                    if( pos !== null && pos < min )
                        min = pos;
                }
            }

            if( min !== Number.POSITIVE_INFINITY)
                scale.min = min;
        }
        if( this.attrs.max === null ) {

            let max = Number.NEGATIVE_INFINITY;

            let pos;
            for(let dataset of this.chart._chartJS.data.datasets) {

                for(let point of dataset.data) {
                    pos = (point as any)[scale_name];
                    if( pos !== null && pos > max )
                        max = pos;
                }
            }

            if( max !== Number.NEGATIVE_INFINITY)
                scale.max = max;
        }
    }


    override _insert() {
        this.chart._chartJS.options.scales![this.attrs.name!] = {};
    }
}
LISS.define('chart-scale', Scale);