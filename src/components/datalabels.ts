import GraphComponent from "./";
import LISS from "@LISS/src/";
import Dataset from "./dataset";

import { PropertiesDescriptor } from "@LISS/src/properties/PropertiesManager";
import RAWDATA_PARSER from "@LISS/src/properties/parser/RAWDATA_PARSER";
import COLOR_PARSER from "@LISS/src/properties/parser/COLOR_PARSER";
import STRING_PARSER from "@LISS/src/properties/parser/STRING_PARSER";
import LISSFather from "@LISS/src/LISSClasses/LISSFather";

export default class Datalabels extends GraphComponent {

    static override PropertiesDescriptor: PropertiesDescriptor = {
            ...GraphComponent.PropertiesDescriptor,
            "content": RAWDATA_PARSER,
            "color"  : {
                parser: COLOR_PARSER,
                default: "black"
            },
            "type": STRING_PARSER,
            "tooltip": STRING_PARSER
            /* "tooltip"    : PROPERTY_FSTRING */
        };

    // current label idx being printed for each Dataset.
    #idx = new WeakMap<Dataset, number>();

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

                if( ref.properties.name === null) //TODO: remove condition ?
                    return null;

                let idx   = this.#idx.get(ref) ?? 0;

                const labels = (ref.constructor as any).datalabels;

                const label = Object.keys(labels);

                ref.ctx.context = context;

                return labels[label[idx]](ref.ctx);
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

            if(dataset.properties.name === null) //TODO: remove condition ?
                return;

            let idx   = this.#idx.get(dataset) ?? 0;
            
            idx = ++idx % Object.keys((dataset.constructor as any).datalabels).length;

            this.#idx.set(dataset, idx);

            this.chart!.requestUpdate();
        }
    }
}

LISS.define('chart-datalabels', Datalabels);