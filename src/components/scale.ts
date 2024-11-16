import GraphComponent from ".";
import LISS from "../../libs/LISS/src/index.ts";;

export default class Scale extends LISS({extends: GraphComponent}) {

    constructor(...args: any[]) {
        super(...args);

        this.host.setAttribute('slot', 'scale');
    }

    #data: any = {};

    override _update() {//TODO: validate config...

        const name     = this.data.getValue('name');
        const position = this.data.getValue('position');
        const min      = this.data.getValue('min');
        const max      = this.data.getValue('max');

        if( name === null)
            throw new Error('name is null');

        let labels = this.contentParsed; //TODO: null or undefined ? not clear...

        // range...
        if(labels != null && labels.length === 2 && typeof labels[0] === "number" && typeof labels[1] === "number" ) {
            this.data.setValue('min', `${labels[0]}`, false);
            this.data.setValue('max', `${labels[1]}`, false);
            labels = null;
        }

        let scale = this.chart._chartJS.options.scales![name]!;
        if(labels != null) {

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

        const scale_name = this.data.getValue('name')!
        const scale = this.chart._chartJS.options.scales![scale_name]!;

        if(scale.type !== 'linear')
            return;

        const vmin = this.data.getValue('min');
        const vmax = this.data.getValue('max');

        let min = +(vmin ?? Number.POSITIVE_INFINITY);
        let max = +(vmax ?? Number.NEGATIVE_INFINITY);

        let getValue = (p: any) => p[scale_name];

        if( min === Number.POSITIVE_INFINITY ) {

            let tmin;
            for(let dataset of this.chart._chartJS.data.datasets) {
                tmin = value_min(dataset.data, getValue);
                if( tmin < min)
                    min = tmin;
            }
        }
        if( max === Number.NEGATIVE_INFINITY ) {

            let tmax;
            for(let dataset of this.chart._chartJS.data.datasets) {
                tmax = value_max(dataset.data, getValue);
                if( tmax > max)
                    max = tmax;
            }
        }

        if( min === max ) {
            min = min - Math.abs(min);
            max = max + Math.abs(max);
        }

        if( min !== Number.POSITIVE_INFINITY)
            scale.min = min;
        else
            delete scale.min;

        if( max !== Number.NEGATIVE_INFINITY)
            scale.max = max;
        else
            delete scale.max;
    }


    override _insert() {
        const name = this.data.getValue('name')!;
        this.chart._chartJS.options.scales![name] = {};
    }
}
LISS.define('chart-scale', Scale);

export function value_min<T>(points: readonly T[], value: (point: T) => number) {

    let min = Number.POSITIVE_INFINITY;

    let pos;
    for(let point of points) {
        pos = value(point);
        if( pos === Number.NEGATIVE_INFINITY || pos === null)
            continue;
        if( pos < min )
            min = pos;
    }

    return min;
}
export function value_max<T>(points: readonly T[], value: (point: T) => number) {

    let max = Number.NEGATIVE_INFINITY;

    let pos;
    for(let point of points) {
        pos = value(point);
        if( pos === Number.POSITIVE_INFINITY || pos === null)
            continue;

        if( pos > max )
            max = pos;
    }

    return max;
}