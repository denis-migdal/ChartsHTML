import Line from './Line'

import LISS from "LISS";

export default class VLine extends Line {

    constructor() {
        super();

        this.setAttrDefault('showPoints', 'false');
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