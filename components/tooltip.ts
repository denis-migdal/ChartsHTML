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

        this.chart._chartJS.options.plugins.tooltip = {

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

                    console.log(context.dataset.name, this.chart.getDataset(context.dataset.name));

                    return this.chart.getDataset(context.dataset.name).tooltip(context);
                }
            }
        };
    }

    override _update(): void {
        //TODO...
    }
}

LISS.define('chart-tooltip', Tooltip);


/*
    tooltip: {
        //ZOOM...
        mode,
        intersect,


        filter: <TType extends ChartType>(context: TooltipItem<TType>) => {
            let name = (context.dataset as ChartDataset<TType>).label!;
            return this.#elements[name].filter(context);
        },
        /*
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