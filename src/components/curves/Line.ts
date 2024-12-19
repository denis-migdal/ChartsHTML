import Dataset from '../dataset'

import LISS from "../../../libs/LISS/src/index.ts";

// ['show-points', 'decimate']
export default class Line extends LISS({extends: Dataset}) {
	
	static override observedAttributes = [
        ...Dataset.observedAttributes,
        'show-points'
    ];

    constructor(args: any) {
		
        super(args);

		this.propertiesManager.setDefaultValue('type', 'scatter');

		this.propertiesManager.properties["show-points"].addPreproc( (value: string) => {
			return Boolean(value);
		});
		this.propertiesManager.properties["content"].addPreproc( (data: any, prev) => {

			if(data === null)
				return [];

			return data.map( (p: [number, number]|number, idx:number) => {
				if( ! Array.isArray(p) )
					return {x: idx, y: p};
				return {x:p[0],y: p[1]}
			});

			/* const decimate = this.data.getValue('decimate');

			if(decimate !== null) {

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

				return points;
			} */
		});
    }

	get showPoints(): boolean {
		return this.propertiesManager.getValue('show-points'); 
	}

	override get data(): Record<string, number>[] {
		return this.propertiesManager.getValue("content");
	}

    override _update() {
        super._update();

        this.dataset.showLine    = true;
        this.dataset.borderWidth = 2;
        this.dataset.parsing     = false;
        this.dataset.normalized  =  true;

		const show = this.showPoints;
		if( ! show )
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