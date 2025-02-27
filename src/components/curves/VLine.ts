import Line from './Line'

import LISS from "@LISS/src/";
import { PropertiesDescriptor } from '@LISS/src/properties/PropertiesManager';

export default class VLine extends Line {

    static override PropertiesDescriptor: PropertiesDescriptor = {
        ...Line.PropertiesDescriptor,
        "show-points": false as const
    };

    protected override computeChartJSData(data: any) {
		
        if(data === null)
            return [];

        return [{x:data,y:Number.POSITIVE_INFINITY}, {x:data,y:Number.NEGATIVE_INFINITY}];
    }

    override tooltip(context: any) {
        
        // show only one
        if(context.dataIndex !== 0)
            return null;
        return super.tooltip(context);

    }

}


LISS.define('curve-vline', VLine);