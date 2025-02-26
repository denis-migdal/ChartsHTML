import Line from './Line'

import LISS from "../../../libs/LISS/src/index.ts";
import { inherit, PropertiesDescriptor } from 'properties/PropertiesDescriptor.ts';
import { ROSignal } from 'LISS/src/x.ts';

const properties = {
    "show-points": false as const
} satisfies PropertiesDescriptor;

export default class HLine extends inherit(Line, properties) {

    protected override computeLine(source: ROSignal<any>) {
        const data = source.value;

        if(data === null)
            return [];

        return [{x:Number.POSITIVE_INFINITY, y:data}, {x:Number.NEGATIVE_INFINITY, y:data}];
    };

    override tooltip(context: any) {
        
        // show only one
        if(context.dataIndex !== 0)
            return null;
        return super.tooltip(context);

    }

}

LISS.define('curve-hline', HLine);