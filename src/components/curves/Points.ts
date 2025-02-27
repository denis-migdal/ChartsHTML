import Dataset from '../dataset'

import LISS from "@LISS/src/";
import { PropertiesDescriptor } from '@LISS/src/properties/PropertiesManager';

export default class Points extends Dataset {

    static override PropertiesDescriptor: PropertiesDescriptor = {
        ...Dataset.PropertiesDescriptor,
        "type"       : "scatter" as const,
    };

    protected override computeChartJSData(data: any) {
		
        if(data === null)
            return [];

        return data.map( (p: [number, number]) => {return {x:p[0],y: p[1]} });
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