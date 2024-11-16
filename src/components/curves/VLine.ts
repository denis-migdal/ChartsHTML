import Line from './Line'

import LISS from "../../../libs/LISS/src/index.ts";

export default class VLine extends LISS({extends: Line}) {

    constructor(...args: any[]) {
        super(...args);

        this.data.setDefault('showPoints', 'false');
    }

    override _contentParser(content: string) {
        return [{x:+content,y:Number.POSITIVE_INFINITY}, {x:+content,y:Number.NEGATIVE_INFINITY}];
    }

    override tooltip(context: any) {
        
        if(context.dataIndex !== 0)
            return null;
        return super.tooltip(context);

    }

}


LISS.define('curve-vline', VLine);