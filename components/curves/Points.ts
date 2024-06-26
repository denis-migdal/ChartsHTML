import Dataset from '../dataset'

import LISS from "LISS";

//@ts-ignore : "Property 'onAttrChanged' is protected in type 'Line' but public in type 'Dataset'." WTF ???
export default class Points extends Dataset {

    constructor() {
        super();

		this.setAttrDefault('type', 'scatter');
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