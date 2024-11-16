import Dataset from '../dataset'

import LISS from "../../../libs/LISS/src/index.ts";

export default class Points extends LISS({extends: Dataset}) {

    constructor(...args: any[]) {
        super(...args);

        this.data.setDefault('type', 'scatter');
    }

    /* TODO ... */
    override _contentParser(content: string) {

		const data = super._contentParser(content);

		if(data === undefined)
			return [];

		return data.map( (p: [number, number]) => {return {x:p[0],y: p[1]} });
    }

    override _update() {
        super._update();

        this.dataset.borderWidth = 2;
        this.dataset.parsing = false;

        this.dataset.showLine = false;
    }

}


LISS.define('curve-points', Points);