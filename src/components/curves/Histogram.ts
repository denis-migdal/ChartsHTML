import LISS from "@LISS/src";
import Bars from './Bars';

import { PropertiesDescriptor } from "@LISS/src/properties/PropertiesManager";

import INTEGER_PARSER from "@LISS/src/properties/parser/INTEGER_PARSER";

// precision
export default class Histogram extends Bars {

    static override PropertiesDescriptor: PropertiesDescriptor = {
        ...Bars.PropertiesDescriptor,
        "precision"   : INTEGER_PARSER
    };

    protected override computeChartJSData(data: any) {
		
        if(data === null || this.chart === null)
			return [];

        //TODO: better ?
        const min = this.chartJS!.options.scales!.x?.min as number ?? 0;
        const max = this.chartJS!.options.scales!.x?.max as number ?? 1;
        const precision = +( this.value.precision ?? 10);

        const sorted = true;

        const step = (max-min)/precision;

        if( ! sorted )
            throw new Error('not implemented !');
            // values = Float64Array.from(values).sort() as unknown as number[];

        let histo     = new Array(precision).fill(0);
        
        let offset = 0;

        for(let i = 0; i < histo.length - 1; ++i) {

            const threshold = min + (i+1) * step; // avoid +=

            while( offset !== data.length && data[offset] < threshold ) {
                ++histo[i];
                ++offset;
            }
        }

        histo[histo.length-1] = data.length - offset;

        const bars = histo.map( (v,idx) => {
            let value: number|null = v/data.length;
            if( value === 0)
                value = null;

            return {x: min + (idx+0.5) * step, y: value};
        });

        return bars;
    }
}


LISS.define('curve-histogram', Histogram);