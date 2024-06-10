import Dataset from '../dataset'

import LISS from "LISS";

export default class Bars extends Dataset {

    constructor() {
        super();

		this.setAttrDefault('type', 'bar');
    }

    /* TODO ... */
    override _contentParser(content: string) {

		const data = super._contentParser(content);

        console.warn("?");
        return [0.1,0.2,0.3,0.4];

		if(data === undefined)
			return [];

		return []; //TODO: data.map( (p: [number, number]) => {return {x:p[0],y: p[1]} });
    }

    override _update() {
        super._update();

        this.dataset.borderWidth   = 1; // 0
        this.dataset.barPercentage = 1;
        this.dataset.categoryPercentage = 1;
        this.dataset.backgroundColor = "green";
        this.dataset.grouped = false;


        this.dataset.labels = ["1", "2", "3", "4"];

        this.dataset.scales = {
            x: {
                labels : [0.5, "2", "3", "4"]
            }
        }

        //(this.chart._chartJS.options!.scales!.x! as any).labels = [0.5, "2", "3", "4"]; // required for bars (strange...)
    }
}


LISS.define('curve-bars', Bars);