import { PropertiesDescriptor } from "@LISS/src/properties/PropertiesManager";
import GraphComponent from ".";
import LISS from "@LISS/src";

import RAWDATA_PARSER from "@LISS/src/properties/parser/RAWDATA_PARSER";
import STRING_PARSER  from "@LISS/src/properties/parser/STRING_PARSER";
import NUMBER_PARSER  from "@LISS/src/properties/parser/NUMBER_PARSER";
import LISSFather from "@LISS/src/LISSClasses/LISSFather";

export default class Scale extends GraphComponent {

    static override PropertiesDescriptor: PropertiesDescriptor = {
        ...GraphComponent.PropertiesDescriptor,
        "content"    : RAWDATA_PARSER,
        "position"   : STRING_PARSER,
        "min"        : NUMBER_PARSER,
        "max"        : NUMBER_PARSER,
    };

    override onUpdate() {//TODO: validate config...

        const name     = this.properties.name;
        const position = this.properties.position;

        let labels   = this.properties.content;
        let min      = this.properties.min;
        let max      = this.properties.max;

        if( name === null)
            throw new Error('name is null');

        // range...
        if(labels != null && labels.length === 2 && typeof labels[0] === "number" && typeof labels[1] === "number" ) {
            [min, max] = labels;
            labels = null;
        }

        let scale = this.chartJS!.options.scales![name]!;
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
    override onChartUpdate() {

        const chartJS = this.chartJS!;

        const scale_name = this.properties.name;
        const scale = chartJS.options.scales![scale_name]!;

        if(scale.type !== 'linear')
            return;

        let min = this.properties.min ?? Number.POSITIVE_INFINITY;
        let max = this.properties.max ?? Number.NEGATIVE_INFINITY;

        let getValue = (p: any) => p[scale_name];

        if( min === Number.POSITIVE_INFINITY ) {

            let tmin;
            for(let dataset of chartJS.data.datasets) {
                tmin = value_min(dataset.data, getValue);
                if( tmin < min)
                    min = tmin;
            }
        }
        if( max === Number.NEGATIVE_INFINITY ) {

            let tmax;
            for(let dataset of chartJS.data.datasets) {
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

    override onAttach() {
        const name = this.properties.name;
        this.chartJS!.options.scales![name] = {};
    }

    override onDetach(): void {
        const name = this.properties.name;
        delete (this.father as any).chartJS.options.scales![name];
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