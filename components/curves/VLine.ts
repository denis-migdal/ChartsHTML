import Line from './Line'

import LISS from "LISS";

export default class VLine extends Line {

    constructor() {
        super();
    }

    override _contentParser(content: string) {
        return [{x:+content,y:Number.POSITIVE_INFINITY}, {x:+content,y:Number.NEGATIVE_INFINITY}];
    }

    override _update() {
        super._update();

        this.dataset.cubicInterpolationMode = 'monotone';
        this.dataset.pointRadius = 0;
    }

}


LISS.define('curve-vline', VLine);