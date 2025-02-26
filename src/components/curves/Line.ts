import Dataset from '../dataset'

import LISS from "../../../libs/LISS/src/index.ts";
import { LazyComputedSignal, ROSignal } from 'LISS/src/x.ts';
import { inherit, PropertiesDescriptor, PROPERTY_BOOLEAN } from 'properties/PropertiesDescriptor.ts';

const properties = {
	"type"       : "scatter" as const,
	"show-points": PROPERTY_BOOLEAN
} satisfies PropertiesDescriptor;

export default class Line extends inherit(Dataset, properties) {

	protected computeLine(source: ROSignal<any>) {

		const data = source.value;

		if(data === null)
			return [];

		return data.map( (p: [number, number]|number, idx:number) => {
			if( ! Array.isArray(p) )
				return {x: idx, y: p};
			return {x:p[0],y: p[1]}
		});
	}

	protected _line = new LazyComputedSignal(this.propertiesManager.properties["content"].value,
											this.computeLine);

	constructor(args: any) {
        super(args);
		console.warn("Line built");
		this._data.source = this._line;
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