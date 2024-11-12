import Line from './Line'

import LISS from "../../../libs/LISS/src/index.ts";

export default class HLine extends LISS({extends: Line}) {

    constructor() {
        super();

        this.setAttrDefault('showPoints', 'false');
    }

    override _contentParser(content: string) {
        return [{x:Number.NEGATIVE_INFINITY,y:+content}, {x:Number.POSITIVE_INFINITY,y:+content}];
    }

    override tooltip(context: any) {
        
        if(context.dataIndex !== 0)
            return null;
        return super.tooltip(context);

    }
}


LISS.define('curve-hline', HLine);