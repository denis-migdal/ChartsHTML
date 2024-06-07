import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

import {Chart} from 'chart.js';

//TODO: direction... (with zoom...)
export default class Tooltip extends LISS.extendsLISS(GraphComponent, {attributes: ['direction']}) {

    constructor() {
        super();
        this.host.setAttribute('slot', 'options');

        //TODO : move 2 parents....
        const observer = new MutationObserver( () => {
            this._update()
        });
        observer.observe(this.host, {characterData: true, subtree: true});
    }

    //TODO: refactor (cf Dataset)
    protected additionalContext(context: any) {

        return {
            name:  context.dataset.name,
            x:     (context?.parsed as any)?.x
                ?? (context.dataset as any)?.data[context.dataIndex]?.x
                ?? (context.dataset as any)?.data[context.dataIndex]?.[0]
                ?? null,

            y:      (context?.parsed as any)?.y
                ?? (context.dataset as any)?.data[context.dataIndex]?.y
                ?? (context.dataset as any)?.data[context.dataIndex]?.[1]
                ?? null

        };

    }

    override _insert(): void {

		let mode = (this.attrs.direction ?? 'point') as "x"|"y"|"point";
        let intersect = mode === "point";

        this.chart._chartJS.options.plugins!.tooltip = {

            mode,
            intersect,

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
                    return this._contentParser( this._content_eval.eval(this.additionalContext(context[0]) ) );
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
    tooltip: {

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