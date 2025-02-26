import LISS from "@LISS/index.ts";

import {Chart, Tooltip, Filler, LinearScale, ScatterController, PointElement, LineElement, BarController, BarElement, ChartDataset, ScaleOptionsByType, ScaleOptions} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin      from 'chartjs-plugin-zoom';

Chart.register(Tooltip, Filler, ScatterController, PointElement, LineElement, LinearScale, BarController, BarElement, ChartDataLabels, zoomPlugin);

import {CategoryScale} from 'chart.js'; 
import Dataset from "./components/dataset";
import { Signal, SignalEvent, SignalManager, ThrottledSignalEvent } from "LISS/src/x";
import GraphComponent from "components/index";
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

/* not required ?
function resize(entries: ResizeObserverEntry[]) {
	for(let i = 0; i < entries.length; ++i)
		(entries[i].target as any).controler._chartJS.resize();
}

const observer = new ResizeObserver(resize);*/

export default class ChartHTML extends LISS({css: CSS}) {

    #canvas: HTMLCanvasElement;
    #chartjs!: Chart;

	readonly signals = new SignalManager();

    constructor(params: Record<string, any>) {
        super();

        for(let name in params)
			this.signals.set(name, new Signal(params[name]) );

        this.#canvas = document.createElement('canvas');
        this.content.append(this.#canvas);

		this.#initGraph();

		this.#ev.listen( () => {
			this.onUpdate();
		})

		new MutationObserver( (records: MutationRecord[]) => {
			
			for(let i = 0; i < records.length; ++i) {
				const {addedNodes, removedNodes} = records[i];

				for(let j = 0; j < addedNodes.length; ++j) {
					const component = LISS.getControlerSync<GraphComponent>(addedNodes[j] as HTMLElement);
					this.#onAttach(component);
				}

				for(let j = 0; j < removedNodes.length; ++j) {
					const component = LISS.getControlerSync<GraphComponent>(removedNodes[j] as HTMLElement);
					this.#onDetach(component);
				}

				this.requestUpdate();
			}

        }).observe(this.host, {childList: true});
    }

	// components

	#onAttach(component: GraphComponent) {
		this.#components.push(component);
		component.onAttach();
	}
	#onDetach(component: GraphComponent) {
		this.#components.splice(this.#components.indexOf(component) );
		component.onDetach();
	}

	#components: GraphComponent[] = [];
	add(instance: GraphComponent): this
	add(Component: Constructor<GraphComponent>   , params: Record<string,string|null>): this
	add(arg1: GraphComponent|Constructor<GraphComponent>, params: Record<string,string|null> = {}) {
		
		if( typeof arg1 === "function" )
			arg1 = new arg1(params);

		const instance = arg1;

		instance.attachTo(this);

		return this;
	}

	remove(instance: GraphComponent): this {

		// triggers Observer
		instance.detach();

		return this;
	}

	//TODO...
	// Datasets : why (?) -> remove during attach/detach refactor ?
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
					},
                    zoom: {
                        pan: {
                            /* required for proper pan init */
                            enabled: true
                        }
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

		//this.#chartjs = config; 
		this.#chartjs = new Chart(ctx, config);
        // h4ck for correct pan init.
        const zoom = this.#chartjs.config.options!.plugins!.zoom!;
        zoom.pan!.enabled = false;
 
        this.#components = LISS.qsaSync(':scope > *', this.host);

        for(let elem of this.#components) {
			this.add(elem);
			elem.onAttach();
		}
		
		this.requestUpdate();
	}

	#changes = new SignalEvent();
	#ev = new ThrottledSignalEvent(this.#changes);

    protected override connectedCallback(): void {
		this._chartJS.resize(); // required for JS API
		//observer.observe(this.host);
		this.#ev.blockSignal(false);
    }
	protected override disconnectedCallback(): void {
		//observer.unobserve(this.host);
		this.#ev.blockSignal(true);
    }

	requestUpdate() {
		this.#changes.trigger();
	}

	onUpdate() {

		//TODO: if waiting
		for(let elem of this.#components)
			elem.onUpdate();

		for(let elem of this.#components)
			elem.onChartUpdate();

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