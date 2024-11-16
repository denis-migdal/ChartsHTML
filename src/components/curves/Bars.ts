import Dataset from '../dataset'

import LISS from "../../../libs/LISS/src/index.ts";

//['reversed']
export default class Bars extends LISS({extends: Dataset}) {

    constructor(...args: any[]) {
        super(...args);

        this.data.setDefault('type', 'bar');
    }

    /* TODO ... */
    override _contentParser(content: unknown) {

        const data = content as undefined| readonly [number,number][];

		if(data === undefined)
			return [];

		return data.map( (p: [number, number]) => {return {x:p[0],y: p[1]} });
    }

    override _update() {
        super._update();

        // h4ck to set min/max values.
        if(this.dataset.data.length > 1) {

            let data = this.dataset.data;
            const min = data[0].x;
            const max = data[data.length-1].x;

            let width = Number.POSITIVE_INFINITY;
            for(let i = 1; i < data.length; ++i) {
                const w = data[i].x - data[i-1].x;
                if( w < width)
                    width = w;
            }

            if( this.data.getValue('reversed') === "true" )
                data = data.map( (p:any) => {return {x: p.x, y: p.y !== null ? -p.y : null} });

            this.dataset.data = [
                {x: min -width/2, y:null},
                ...data,
                {x: max +width/2, y:null}
            ]
        }

        this.dataset.borderWidth   = 0;
        this.dataset.barPercentage = 1;
        this.dataset.categoryPercentage = 2;
        this.dataset.inflateAmount = 1; // hide artifacts.
        this.dataset.grouped = false;

        //this.dataset.barThickness = "flex"; // not working properly...

        this.dataset.parsing = false;
        this.dataset.normalized = true;


        //this.dataset.labels = ["1", "2", "3", "4"];
    }
}


LISS.define('curve-bars', Bars);