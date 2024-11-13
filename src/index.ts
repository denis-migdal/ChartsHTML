import LISS from "../libs/LISS/src/index.ts";

import {Chart, Tooltip, Filler, LinearScale, ScatterController, PointElement, LineElement, BarController, BarElement, ChartDataset, ScaleOptionsByType, ScaleOptions} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(Tooltip, Filler, ScatterController, PointElement, LineElement, LinearScale, BarController, BarElement, ChartDataLabels, zoomPlugin);

export class StringEval<T> {

	constructor(component: any) {
		this.#component = component;
	}

	#component: any;

	#string: string|null = null;
	#fct: ((args:any) => T)|null = null;
	#result: T|undefined = undefined;

	setString(str: string|null) {

		if(str !== null) {
			str = str.trim();
			if(str.length === 0)
				str = null;
		}

		if(str === this.#string)
			return;

		this.#result    = undefined;
		this.#fct       = null;
		this.#string    = str;
	}
	eval(context: Record<string, any> = {}) {
		if(this.#string === null)
			return null;
		if(this.#fct === null)
			this.#fct = new Function('{v,c}', `return ${this.#string}`) as any;
		return this.#result = this.#fct!( this.#component.chart.evalContext(context) );
	}
	value() {
		if(this.#result === undefined)
			return this.eval({});
		return this.#result;
	}
}

//TODO: remove
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

const CSS = `
:host {
	position: relative;
    display: block;
    width: 100%;
    height: 100%;

    & > canvas {
        width: 100%;
        height: 100%;
    }
}
`;

export default class ChartHTML extends LISS({css: CSS, attrs: ["measure-render-time"]}) {

    #canvas: HTMLCanvasElement;
    #chartjs!: Chart;


    protected override onDOMConnected(): void {
		this.updateAll();
    }

    constructor() {
        super();

        this.#canvas = document.createElement('canvas');
        this.content.append(this.#canvas);

		this.#initGraph();
    }

	#values: Record<string, any> = {}
	getValue(name: string) {
		return this.#values[name];
	}
	setValue(name: string, value: any) {
		this.#values[name] = value;
		this.updateAll();
	}

	addComponent(Component: Constructor<Dataset>, params: Record<string,string|null> = {}) {
		
		let instance = new Component(params);
		this.host.append(instance.host);
		instance._attach(this);

		this.#components.push(instance);

		//instance._before_chart_update();
		//this.update();
	}

	evalContext(context = {}) {
		return {c: context, v: this.#values};
	}

	#datasets: Record<string, Dataset> = {};
	getDatasetNames() {
		return Object.keys(this.#datasets);
	}
	insertDataset(dataset: Dataset) {
		
		const dataset_data = dataset.dataset;

        this._chartJS.data.datasets.push(dataset_data);
		if(dataset_data.name !== null)
			this.#datasets[dataset_data.name] = dataset;
	}
	removeDataset(dataset: Dataset) {

		const dataset_data = dataset.dataset;
		if(dataset_data.name !== null)
			delete this.#datasets[dataset_data.name];

		const idx = this._chartJS.data.datasets.indexOf(dataset_data);
		this._chartJS.data.datasets.splice(idx, 1);
	}
	getDataset(name: string) {
		return this.#datasets[name];
	}

    // FOR INTERNAL USE ONLY
    get _chartJS(): Chart {
        return this.#chartjs;
    }

	#initGraph() {

		let ctx = this.#canvas.getContext('2d')!;

        const config: any = { //TODO: find real type
			//type: 'scatter', collides with Violin/BoxPlot.
            data: {
				datasets: []
			},
			plugins: [],
			options: {
				locale: 'en-IN',
				animation: false,
				responsive: true,
				maintainAspectRatio: false,
                scales: {},
				plugins: {
					datalabels: false
				},

				
                /*
				plugins: 
					legend: {
						display: false
					},
				*/
			}
		};

		// not working ?
		/*config.options.plugins.decimation = {
			enabled: true,
  			algorithm: 'min-max',
		}*/

		if(this.attrs["measure-render-time"] === "true") {

			let lastRender: number = 0;

			config.plugins.push({
				beforeRender: () => { lastRender = Date.now() },
				afterRender : () => { 
					console.warn(`Graph rendered in ${Date.now() - lastRender}ms`);
				}
			})
		}

		//h4ck - required for correct pan initialization...
		this.#chartjs = config; 
		this.#isUpdatingAll = true;

        this.#components = LISS.qsaSync('[slot]', this.host); //TODO sync.
        for(let elem of this.#components)
            elem._attach(this);

		for(let elem of this.#components)
			elem._before_chart_update();

		this.#chartjs = new Chart(ctx, config);

		this.#isUpdatingAll = false;
	}

	#components: any[] = [];

	#isUpdatingAll: boolean = false;
	updateAll() {

		if( ! this.isInDOM )
			return;

		if( this.#isUpdatingAll )
			return;
		this.#isUpdatingAll = true;

		this._chartJS.resize();

		for(let elem of this.#components)
			elem.update(); //TODO...

		this.update();

		this.#isUpdatingAll = false;
	}

	update() {

		if( ! this.isInDOM )
			return;

		//TODO: set animation framerequest
		//TODO: vs updateAll
		//TODO: attached/detached...

		for(let elem of this.#components)
			elem._before_chart_update();

		this._chartJS.update('none');
	}

	toCSV() {
		return Object.values(this.#datasets).map( d => d.toCSV() ).join('\n');
	}

	get zoom() {
		return LISS.qsSync('chart-zoom', this.host);
	}
}


//TOOLS
(Number.prototype as any).toPercentStr = function() {
	return `${(this.valueOf() * 100).toFixed(2).padStart(6, ' ')}%`;
}

import "./components/value.ts";

import "./components/tooltip.ts";
import "./components/datalabels.ts";
import "./components/zoom.ts";

import "./components/scale.ts";

import "./components/datasets.ts";
import "./components/dataset.ts";
import Line from './components/curves/Line';
import './components/curves/HLine';
import './components/curves/VLine';
import './components/curves/Timelapse';
import './components/curves/Bars';
import './components/curves/Histogram';
import './components/curves/Points';
import Dataset from "./components/dataset";
import { Constructor } from "LISS/src/types.ts";

ChartHTML.Line = Line;

LISS.define('chart-html', ChartHTML);