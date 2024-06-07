import Line from './Line'

import LISS from "LISS";

export default class HLine extends Line {

    constructor() {
        super();
    }

    override _contentParser(content: string) {
        return [{x:Number.NEGATIVE_INFINITY,y:+content}, {x:Number.POSITIVE_INFINITY,y:+content}];
    }

    override _update() {
        super._update();

        this.dataset.cubicInterpolationMode = 'monotone';
        this.dataset.pointRadius = 0;
    }

}


LISS.define('curve-hline', HLine);