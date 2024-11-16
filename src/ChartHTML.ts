import LISS from "../libs/LISS/src/index.ts";
import { Constructor } from "LISS/src/types.ts";

import {Chart, Tooltip, Filler, LinearScale, ScatterController, PointElement, LineElement, BarController, BarElement, ChartDataset, ScaleOptionsByType, ScaleOptions} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin      from 'chartjs-plugin-zoom';

Chart.register(Tooltip, Filler, ScatterController, PointElement, LineElement, LinearScale, BarController, BarElement, ChartDataLabels, zoomPlugin);

//TODO: remove
import {CategoryScale} from 'chart.js'; 
import Dataset from "./components/dataset.ts";
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

export default class ChartHTML extends LISS({css: CSS}) {

    #canvas: HTMLCanvasElement;
    #chartjs!: Chart;


    protected override connectedCallback(): void {
		this.updateAll();
    }

    constructor(params: Record<string, any>) {
        super();

        for(let name in params)
            this.setValue(name, params[name]);

        this.#canvas = document.createElement('canvas');
        this.content.append(this.#canvas);

		this.#initGraph();
    }

    //TODO: use Data...
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

		instance._before_chart_update();
		this.update();
	}

	evalContext(context = {}) {
		return {ctx: context, values: this.#values};
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
					datalabels: {
                        display: false,
                    },
					tooltip   : {
						enabled: false
					}
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

		if(this.host.getAttribute("measure-render-time") === "true") {

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

		if( ! this.isConnected )
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

		if( ! this.isConnected )
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

LISS.define('chart-html', ChartHTML);