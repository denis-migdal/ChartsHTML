import Line from './Line'

import LISS from "LISS";

export default class Timelapse extends Line {

    constructor() {
        super();
    }

    override _contentParser(content: unknown) {

        const data = content as [string, number,number][];

        const points = new Array(data.length * 3);

        for(let i = 0; i < data.length; ++i) {
            points[3*i]   = {x: data[i][1], y: 1, label: data[i][0]};
            points[3*i+1] = {x: data[i][2], y: 0, label: data[i][0]};
            points[3*i+2] = {x: null, y:null};
        }

        return points;
    }

    override _update() {
        super._update();

        this.dataset.cubicInterpolationMode = 'monotone';
    }

}


LISS.define('curve-timelapse', Timelapse);