import GraphComponent from "./";
import LISS from "@LISS/src/";
import Dataset from "./dataset";

export default class Datalabels extends GraphComponent {

    override onDetach(): void {

        const opts = this.chartJS!.options;

        delete opts.plugins!.datalabels;
        delete opts.onClick;
        delete opts.onHover;
    }

    override onAttach(): void {

        this.chartJS!.options.plugins!.datalabels = {

            //enabled: true,

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

                const ref = (context.dataset as any).dataset as Dataset;
                
                return ref.datalabels(context);
            }
        };

        //TODO:
        this.chartJS!.options.onHover = (e: any) => {
            this.chart!.classList.toggle('clickable', e.chart.tooltip?.opacity);
        };

        this.chartJS!.options.onClick = (ev: any) => {

            const elems = ev.chart.getElementsAtEventForMode(ev, 'point', { intersect: true }, true);
           
            if(elems.length === 0)
                return;

            const dataset = (ev.chart.data.datasets[elems[0].datasetIndex] as any).dataset as Dataset;
            dataset.on_datalabels_click();
            this.chart!.requestUpdate();
        }
    }
}

LISS.define('chart-datalabels', Datalabels);