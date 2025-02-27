import Dataset from '../dataset'

import LISS from "@LISS/src/";
import { PropertiesDescriptor } from '@LISS/src/properties/PropertiesManager';

import BOOLEAN_PARSER  from "@LISS/src/properties/parser/BOOLEAN_PARSER";

export default class Line extends Dataset {

	static override PropertiesDescriptor: PropertiesDescriptor = {
	...Dataset.PropertiesDescriptor,
	"type"       : "scatter" as const,
	"show-points": BOOLEAN_PARSER
	};

	protected override computeChartJSData(data: any) {
		
        if(data === null)
			return [];

		return data.map( (p: [number, number]|number, idx:number) => {
			if( ! Array.isArray(p) )
				return {x: idx, y: p};
			return {x:p[0],y: p[1]}
		});
    }

	override buildDataset() {

		const dataset = super.buildDataset();

        dataset.showLine    = true;
        dataset.borderWidth = 2;
        dataset.parsing     = false;
        dataset.normalized  = true;

		return dataset;
	}

	//TODO...
    override onUpdate() {

        super.onUpdate();

		if( ! this.properties.showPoints )
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