import Dataset from '../dataset'

import LISS from "LISS";

//@ts-ignore : "Property 'onAttrChanged' is protected in type 'Line' but public in type 'Dataset'." WTF ???
export default class Line extends LISS.extendsLISS(Dataset, {attributes: ['show-points', 'decimate']}) {

    constructor() {
        super();

		this.setAttrDefault('type', 'scatter');
    }

    /* TODO ... */
    override _contentParser(content: string) {

		const data = super._contentParser(content);

		if(data === undefined)
			return [];

		if(this.attrs.decimate !== null) {

			/*
			this.chart._chartJS.options.onResize = (...args) => {

				console.warn(this.chart.host.getBoundingClientRect());
				console.warn(args);

				// precision = 1px

				//TODO: update...
			}*/

			//h4ck: min-max for proper scale computation...
			/*
			let points = [{
						x: value_min(data, (p: any) => p[0]),
						y: value_min(data, (p: any) => p[1])
					},{x: 0.5,y:0.5},
					{
						x: value_max(data, (p: any) => p[0]),
						y: value_max(data, (p: any) => p[1])
					}];

			return points;*/

		}

		return data.map( (p: [number, number]) => {return {x:p[0],y: p[1]} });
    }

    override _update() {
        super._update();

        this.dataset.showLine = true;
        this.dataset.borderWidth = 2;
        this.dataset.parsing = false;
        this.dataset.normalized =  true;

		if( this.attrs["show-points"] === "false")
			this.dataset.pointRadius = 0;

        /* this.#dataset = {
        	label: name,
			order: - (options['z-index'] ?? 0)
        };

        if( this.options.fill ) {

        	let color = this.options.fill === true
        					? this.options.color
        					: this.options.fill;

			this.#dataset.fill = {
				target: 'origin',
				above: color
			};
        }*/
    }

}


LISS.define('curve-line', Line);