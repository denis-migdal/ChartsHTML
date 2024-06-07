import Dataset from '../dataset'

import LISS from "LISS";

export default class Line extends Dataset {

    constructor() {
        super();

		//todo set default
		this.setAttrDefault('type', 'scatter');
    }

    /* TODO ... */
    override _contentParser(content: string) {

		const data = super._contentParser(content);

		console.warn('line update', data);

		if(data === undefined)
			return [];

		return data.map( (p: [number, number]) => {return {x:p[0],y: p[1]} });
    }

    override _update() {
        super._update();

        //TODO...

        //TODO: extends curve
        this.dataset.showLine = true;
        this.dataset.borderWidth = 2;
        this.dataset.parsing = false;
        this.dataset.normalized =  true;

        //TODO: curve opts
        //this.dataset.cubicInterpolationMode = 'monotone';
        //this.dataset.pointRadius = 0;

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


/*

export default class AppElementGraphCurve extends AppElementGraphElement {

	#dataset: ChartDataset;
	#values: Points = [];

	#sourcePos: SourceInstance<Points>;

	override get options(): Types["Options"] {
		return super.options as Types["Options"];
	}

	constructor(graph: AppElementGraph, name: string, options: Types['Options']) {
        super(module.id, graph, name, options);

        this.#dataset = {
        	type: 'scatter',
        	label: name,
			showLine: true,
			pointRadius: options.showpts ? 3 : 2/2,
			borderWidth: 2,
			borderColor    : options.color,
			backgroundColor: options.color,
			data:[],
			normalized: true,
			parsing: false,
			order: - (options['z-index'] ?? 0)
        };

        if( this.options.monotone )
        	this.#dataset.cubicInterpolationMode = "monotone";

        if( this.options.fill ) {

        	let color = this.options.fill === true
        					? this.options.color
        					: this.options.fill;

			this.#dataset.fill = {
				target: 'origin',
				above: color
			};
        }

        graph._chart.data.datasets.push(this.#dataset);
        
        this.#sourcePos = new SourceInstance<Points>( graph.sourceProvider, this.options.points, () => this.update() );
        this.update();
    }

    override _subElements(): List1D<AppElementGraphElement> {
		return new ROList1D<AppElementGraphElement>([]);
	}
	override _datasets   (): List1D<ChartDataset> {
		return new ROList1D([this.#dataset]);
	}

    _update() {

    	this.#values = this.#sourcePos.getValue() ?? [];

    	let values!: [number,number][];
    	if(this.options.precision && this.#values.length > 2 )
	    	values = setCurvePrecision(this.#values,
	    								[this.graph._chart.options.scales!.x?.min as number|undefined, this.graph._chart.options.scales!.x?.max as number|undefined],
	    								[this.graph._chart.options.scales!.y?.min as number|undefined, this.graph._chart.options.scales!.y?.max as number|undefined],
	    								this.options.precision);
	    else
	    	values = this.#values as [number,number][];

    	this.#dataset.data = values.map(v => { return {x: v[0], y: v[1]}; }) as any;
    }

	get datastr() {

		let x = (this.#values ?? []).map( e => e[0] );
		let y = (this.#values ?? []).map( e => e[1] );

		return `Curve\t${this.options.color}\nx\t${x.join('\t')}\ny\t${y.join('\t')}\n`;
    }
}
*/