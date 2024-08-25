import type ChartHTML from "../index.ts";
import GraphComponent from "./index.ts";
import LISS from "LISS";

import {Chart} from 'chart.js';

export default class Datalabels extends GraphComponent {

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

        this.chart._chartJS.options.plugins!.datalabels = {
            backgroundColor: (context: any) => {
                return context.dataset.pointBackgroundColor ?? context.dataset.backgroundColor ?? 'black';
            },
            borderRadius: 4,
            color: 'white',
            borderColor: 'white',
            font: {
              weight: 'bold'
            },
            formatter: (_value, context) => {
                const name = (context.dataset as any).name;
                if( name === null)
                    return null;
                return this.chart.getDataset(name).getDatalabel(context as any);
            }
        };

        //TODO:
        this.chart._chartJS.options.onHover = (e: any) => {

            if( ! e.chart.tooltip?.opacity) {
                this.chart.host.classList.remove('clickable');
                return;
            }

            this.chart.host.classList.add('clickable');
        };
        this.chart._chartJS.options.onClick = (context: any) => {

            if( ! context.chart.tooltip?.opacity)
                return;

            const dataset =  context.chart.tooltip.dataPoints[0].dataset;
            if(dataset.name === null)
                return;
            
            this.chart.getDataset(dataset.name).datalabelToggle();
            this.chart.update();
        }
    }
}

LISS.define('chart-datalabels', Datalabels);
