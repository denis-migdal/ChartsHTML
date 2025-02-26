import Dataset from '../dataset'

import LISS from "../../../libs/LISS/src/index.ts";
import { inherit, PropertiesDescriptor } from 'properties/PropertiesDescriptor.ts';
import { LazyComputedSignal } from 'LISS/src/x.ts';


const properties = {
    "type"       : "scatter" as const
} satisfies PropertiesDescriptor;

export default class Points extends inherit(Dataset, properties) {

    protected _points = new LazyComputedSignal(this.propertiesManager.properties["content"].value, (source) => {
    
        const data = source.value;

        if(data === null)
            return [];

        return data.map( (p: [number, number]) => {return {x:p[0],y: p[1]} });
    });
        
    constructor(args: any) {
        super(args);

        this._data.source = this._points;
    }

    override buildDataset() {
        const dataset = super.buildDataset();

        dataset.borderWidth = 2;
        dataset.parsing = false;
        dataset.showLine = false;

        return dataset;
    }
}


LISS.define('curve-points', Points);