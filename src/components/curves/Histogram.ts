import Bars from './Bars';

import LISS from "../../../libs/LISS/src/index.ts";
import { inherit, PropertiesDescriptor, PROPERTY_INT } from 'properties/PropertiesDescriptor.ts';
import { ROSignal } from 'LISS/src/x.ts';

const properties = {
    "precision"  : PROPERTY_INT
} satisfies PropertiesDescriptor;

// precision
export default class Histogram extends inherit(Bars, properties) {

    protected override computeBars(source: ROSignal<any>) {
        const data = source.value;

        if(data === null || ! this.isAttached )
            return [];

        //TODO: better ?
        const min = this.graph._chartJS.options.scales!.x?.min as number ?? 0;
        const max = this.graph._chartJS.options.scales!.x?.max as number ?? 1;
        const precision = +( this.properties.precision ?? 10);

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