import Dataset from '../dataset'

import LISS from "../../../libs/LISS/src/index.ts";
import { inherit, PropertiesDescriptor, PROPERTY_BOOLEAN } from 'properties/PropertiesDescriptor.ts';
import { LazyComputedSignal, ROSignal } from 'LISS/src/x.ts';

const properties = {
    "type"       : "bar" as const,
    "reverded"   : PROPERTY_BOOLEAN
} satisfies PropertiesDescriptor;

export default class Bars extends inherit(Dataset, properties) {

    protected computeBars(source: ROSignal<any>) {
    
        const data = source.value;

        if(data === null)
            return [];

		return data.map( (p: [number, number]) => {return {x:p[0],y: p[1]} }) as {x: number, y:number|null}[];
    };
    
    protected _bars = new LazyComputedSignal(this.propertiesManager.properties["content"].value,
                                            this.computeBars.bind(this) );

    constructor(args: any) {
        super(args);
        this._data.source = this._bars;
    }

    override buildDataset() {
        
        const dataset = super.buildDataset();

        dataset.borderWidth   = 0;
        dataset.barPercentage = 1;
        dataset.categoryPercentage = 2;
        dataset.inflateAmount = 1; // hide artifacts.
        dataset.grouped = false;

        //dataset.barThickness = "flex"; // not working properly...

        dataset.parsing = false;
        dataset.normalized = true;

        //dataset.labels = ["1", "2", "3", "4"];

        return dataset;
    }

    override onUpdate() {
        super.onUpdate();

        // h4ck to set min/max values.
        if(this.dataset.data.length > 1) {

            let data = this._bars.value as {x:number, y:number|null}[];
            const min = data[0].x;
            const max = data[data.length-1].x;

            let width = Number.POSITIVE_INFINITY;
            for(let i = 1; i < data.length; ++i) {
                const w = data[i].x - data[i-1].x;
                if( w < width)
                    width = w;
            }

            if( this.properties.reversed )
                data = data.map( (p) => {return {x: p.x, y: p.y !== null ? -p.y : null} });

            this.dataset.data = [
                {x: min -width/2, y:null},
                ...data,
                {x: max +width/2, y:null}
            ]
        }
    }
}


LISS.define('curve-bars', Bars);