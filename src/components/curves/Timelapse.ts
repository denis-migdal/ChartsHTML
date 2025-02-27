import LISS from "@LISS/src/";
import Line from './Line'


export default class Timelapse extends Line {

    protected override computeChartJSData(data: any) {
		
        if(data === null)
            return [];

        if(data === null)
            return [];

        const points = new Array(data.length * 3);

        for(let i = 0; i < data.length; ++i) {
            points[3*i]   = {x: data[i][1], y: 1, label: data[i][0]};
            points[3*i+1] = {x: data[i][2], y: 0, label: data[i][0]};
            points[3*i+2] = {x: null, y:null};
        }

        return points;
    }

    override buildDataset() {
        const dataset = super.buildDataset();

        dataset.cubicInterpolationMode = 'monotone';

        return dataset;
    }
}


LISS.define('curve-timelapse', Timelapse);