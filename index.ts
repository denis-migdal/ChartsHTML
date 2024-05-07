import LISS from "LISS";

import {Chart, Tooltip, Filler, LinearScale, ScatterController, PointElement, LineElement, BarController, BarElement, ChartDataset, ScaleOptionsByType, ScaleOptions} from 'chart.js';
import type { ChartType, TooltipItem } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(Tooltip, Filler, ScatterController, PointElement, LineElement, LinearScale, BarController, BarElement, zoomPlugin);

import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

//TODO: remove
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

const CSS = `
:host {
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

    constructor() {
        super();

        this.#canvas = document.createElement('canvas');
        this.content.append(this.#canvas);

		this.#initGraph();

        /* 

        // axis
		this.#sourceXRange = new SourceInstance<RANGE_TYPE>(
        					this.sourceProvider,
        					options.xrange,
        					() => this.#setRange('x' , this.#sourceXRange.getValue() ) );
		this.#sourceYRange = new SourceInstance<RANGE_TYPE>(
        					this.sourceProvider,
        					options.yrange,
        					() => this.#setRange('y' , this.#sourceYRange.getValue() ) );
		this.#sourceY2Range = new SourceInstance<RANGE_TYPE>(
        					this.sourceProvider,
        					options.y2range,
        					() => this.#setRange('y2', this.#sourceY2Range.getValue() ) );

        this.#setRange('x' , this.#sourceXRange.getValue() );
        this.#setRange('y' , this.#sourceYRange.getValue() );
        this.#setRange('y2', this.#sourceY2Range.getValue() );


        // curves
		for(let element_name in elements)
			this.addElement(element_name, elements[element_name]);
        */
    }

    // FOR INTERNAL USE ONLY
    get _chartJS() {
        return this.#chartjs;
    }

	#initGraph() {

		let ctx = this.#canvas.getContext('2d')!;


		// https://github.com/chartjs/chartjs-plugin-zoom
		/*let zoom_options = {
			pan: {
				enabled: true,
				mode: 'xy' as const,
			},
			limits: {
				y: {},
				x: {}
			},
			zoom: {
				wheel: {
					enabled: this.#options.zoom?.direction !== 'none',
					speed: 0.1
				},
				mode: (this.#options.zoom?.direction ?? 'xy') as "xy"|"x"|"y"
			}
		};

		let direction = this.#options.tooltip?.direction ?? 'xy';
		let [mode, intersect]: ["x"|"y"|"point", boolean] =
							direction === 'xy'
									? ['point', true]
									: [direction, false]
*/

        const config: any = { //TODO: find real type
			//type: 'scatter', collides with Violin/BoxPlot.
            data: {
				datasets: []
			},
			options: {
				locale: 'en-IN',
				animation: false,
				maintainAspectRatio: false,
                scales: {},
                /*
				onHover: (e: any) => {

					if( ! e.chart.tooltip?.opacity) {
						this.#canvas.classList.remove('clickable');
						return;
					}

					this.#canvas.classList.add('clickable');
				},
				onClick: (e: any) => {

					if( ! e.chart.tooltip?.opacity)
						return;

					let name = e.chart.tooltip.dataPoints[0].dataset.label!;
					this.#elements[name].changePointLabel();

					this._update();
				},
				scales: {
					x: {
						ticks: {
							maxRotation: 0,
							minRotation: 0
						},
					},
					y: {
						ticks: {
							maxRotation: 0,
							minRotation: 0
						},
					}
				},
				hover: {
					mode,
					intersect
				},
				plugins: {
					datalabels: {
						backgroundColor: (context: any) => {
				        	return context.dataset.pointBackgroundColor ?? context.dataset.backgroundColor ?? 'black';
				        },
				        borderRadius: 4,
				        color: 'white',
				        borderColor: 'white',
				        font: {
				          weight: 'bold'
				        },
						formatter: (value, context) => {

							let name = context.dataset.label!;

							return this.#elements[name].getPointLabel(context as any);
						}
					},
					zoom: zoom_options,
					legend: {
						display: false
					},
					tooltip: {
						mode,
						intersect,
						titleFont: {
							family: 'Courier New'
						},
						bodyFont: {
							family: 'Courier New'
						},
						filter: <TType extends ChartType>(context: TooltipItem<TType>) => {
							let name = (context.dataset as ChartDataset<TType>).label!;
							return this.#elements[name].filter(context);
						},
						/*itemSort: <TTypeA extends ChartType, TTypeB extends ChartType>(a: TooltipItem<TTypeA>, b: TooltipItem<TTypeB>) => {

							let diff = a.dataset.order - b.dataset.order;
							if( diff !== 0)
								return diff;
							
							diff = a.datasetIndex - b.datasetIndex;

							if( diff !== 0)
								return diff;

							return a.dataIndex - b.dataIndex;
						},*//*
						callbacks: {
							title: (context) => {

								if( ! context.length || ! this.#options.tooltip?.title )
									return '';

								let name = context[0].dataset.label!;

								let element = this.#elements[name];
							
								let label  = element.getLabel(context[0]);
								let xlabel = element.getXLabel(context[0]);

								return evalTStringWithContext(this.#options.tooltip.title,
									{
										x    :   +xlabel!, //TODO...
										label: `${label}`
									});
							},
							label: (context) => {

								let name = context.dataset.label!;
								return this.#elements[name].tooltip(context);
							}
						}
					}
				},*/
			}
		};
        for(let elem of LISS.qsaSync('[slot]') )
            elem.attach(config);

		this.#chartjs = new Chart(ctx, config);
	}
}

import "./scale.ts";
import "./dataset.ts";


LISS.define('chart-html', ChartHTML);