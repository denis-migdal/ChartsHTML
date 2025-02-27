import LISS from "@LISS/src/";

import {Chart as ChartJS, Tooltip, Filler, LinearScale, ScatterController, PointElement, LineElement, BarController, BarElement, ChartDataset, ScaleOptionsByType, ScaleOptions} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin      from 'chartjs-plugin-zoom';

ChartJS.register(Tooltip, Filler, ScatterController, PointElement, LineElement, LinearScale, BarController, BarElement, ChartDataLabels, zoomPlugin);
ChartJS.register(CategoryScale);

import {CategoryScale} from 'chart.js'; 
import Dataset from "./components/dataset";
import GraphComponent from "./components/";
import LISSFather from "@LISS/src/LISSClasses/LISSFather";

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

export default class Chart extends LISS({css: CSS}, LISSFather) {

	get components(): readonly GraphComponent[] {
		return this.LISSChildren as any;
	}

    constructor(params: Record<string, any>) {
        super();
    }
	//readonly signals = new SignalManager();
	//for(let name in params)
	//	this.signals.set(name, new Signal(params[name]) );
    
	// =========== Chart ===========

    // FOR INTERNAL USE ONLY
	protected readonly chartJS!: ChartJS;

	protected override onInit(): void {
		this.#initChartJS();
	}

	#initChartJS() {

        const canvas = document.createElement('canvas');
        this.content.append(canvas);

		let ctx = canvas.getContext('2d')!;

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

		// @ts-ignore
		this.chartJS = new ChartJS(ctx, config);
        // h4ck for correct pan init.
        const zoom = this.chartJS.config.options!.plugins!.zoom!;
        zoom.pan!.enabled = false;
	}

	//TODO: declare
    protected connectedCallback(): void {
		if( this.chartJS !== undefined )
			this.chartJS.resize(); // required for JS API
    }

	get zoom() {
		return this.querySelector('chart-zoom'); //TODO...
	}

	// =========== Update ===========

	override onUpdate() {

		super.onUpdate();

		let offset = 0;
		for(let elem of this.components) {

			const datasets = elem.datasets;
			for(let i = 0; i < datasets.length ; ++i )
				this.chartJS.data.datasets[offset++] = datasets[i];
		}

		//TODO: revalidate datasets
		//TODO: get dataset from () ?

		for(let elem of this.components)
			(elem as any).onUpdate(); //TODO: only if requested update

		for(let elem of this.components)
			elem.onChartUpdate();

		this.chartJS.update('none');
	}

	toCSV() {
		throw new Error("Not implemented");
		//return Object.values(this.#datasets).map( d => d.toCSV() ).join('\n');
	}
}

LISS.define('chart-html', Chart);