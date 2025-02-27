import LISS from "@LISS/src/";
import Line from './Line'

import { PropertiesDescriptor } from '@LISS/src/properties/PropertiesManager';


export default class HLine extends Line {

    static override PropertiesDescriptor: PropertiesDescriptor = {
        ...Line.PropertiesDescriptor,
        "show-points": false as const
    };

    protected override computeChartJSData(data: any) {
		
        if(data === null)
            return [];

        return [{x:Number.POSITIVE_INFINITY, y:data}, {x:Number.NEGATIVE_INFINITY, y:data}];
    }

    override tooltip(context: any) {
        
        // show only one
        if(context.dataIndex !== 0)
            return null;
        return super.tooltip(context);

    }

}

LISS.define('curve-hline', HLine);