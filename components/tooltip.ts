import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

import {Chart} from 'chart.js';

//TODO: direction... (with zoom...)
export default class Tooltip extends GraphComponent {

    constructor() {
        super();
        this.host.setAttribute('slot', 'options');

        //TODO : move 2 parents....
        const observer = new MutationObserver( () => {
            this._update()
        });
        observer.observe(this.host, {characterData: true, subtree: true});
    }

    override _insert(): void {

        this.chart._chartJS.options.plugins!.tooltip = {

            titleFont: {
                family: 'Courier New'
            },
            bodyFont: {
                family: 'Courier New'
            },
            //TODO: filter (multi-dataset feature).

            callbacks: {

                // Tooltip title (depends graph)
                title: (context: any) => {
                    return this.contentParsed
                },
                // One line per points
                label: (context: any) => {

                    return this.chart.getDataset(context.dataset.name).tooltip(context);
                }
            }
        };
    }
}

LISS.define('chart-tooltip', Tooltip);


/*


		let direction = this.#options.tooltip?.direction ?? 'xy';
		let [mode, intersect]: ["x"|"y"|"point", boolean] =
							direction === 'xy'
									? ['point', true]
									: [direction, false]
                                    
    tooltip: {
        //ZOOM...
        mode,
        intersect,

        filter: <TType extends ChartType>(context: TooltipItem<TType>) => {
            let name = (context.dataset as ChartDataset<TType>).label!;
            return this.#elements[name].filter(context);
        },
    }
}*/

/*itemSort: <TTypeA extends ChartType, TTypeB extends ChartType>(a: TooltipItem<TTypeA>, b: TooltipItem<TTypeB>) => {

            let diff = a.dataset.order - b.dataset.order;
            if( diff !== 0)
                return diff;
            
            diff = a.datasetIndex - b.datasetIndex;

            if( diff !== 0)
                return diff;

            return a.dataIndex - b.dataIndex;
        },*/