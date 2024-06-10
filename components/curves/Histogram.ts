import Bars from './Bars';

import LISS from "LISS";

export default class Histogram extends LISS.extendsLISS(Bars, {attributes: ['precision']}) {

    constructor() {
        super();
    }

    override _contentParser(content: unknown) {

        const data = content as undefined| readonly number[];

        if( data === undefined)
            return super._contentParser(undefined);

        //TODO: better ?
        const min = this.chart._chartJS.options.scales!.x!.min as number;
        const max = this.chart._chartJS.options.scales!.x!.max as number;
        const precision = +(this.attrs.precision ?? 10);

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

            return [min + (idx+0.5) * step, value];
        });

        return super._contentParser( bars );
    }
}


LISS.define('curve-histogram', Histogram);