import GraphComponent from "./index.ts";
import LISS from "../../libs/LISS/src/index.ts";
import Dataset from "./dataset.ts";
import { inherit, PropertiesDescriptor } from "properties/PropertiesDescriptor.ts";

/*
export const properties = {
    "content"    : PROPERTY_RAWDATA,
    "name"       : PROPERTY_STRING,
    "color"      : {
        type: PROPERTY_COLOR,
        default: "black"
    },
    "type"       : PROPERTY_STRING,
    "tooltip"    : PROPERTY_FSTRING
} satisfies PropertiesDescriptor;*/

export default class Datalabels extends inherit(GraphComponent, {}) {

    #idx = new WeakMap<Dataset, number>();

    override onDetach(): void {
        delete this.graph._chartJS.options.plugins!.datalabels;
        delete this.graph._chartJS.options.onClick;
        delete this.graph._chartJS.options.onHover;
    }

    override onAttach(): void {

        this.graph._chartJS.options.plugins!.datalabels = {

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
                const name = (context.dataset as any).name;
                if( name === null)
                    return null;

                const ref = this.graph.getDataset(name);
                let idx   = this.#idx.get(ref) ?? 0;

                const labels = (ref.constructor as any).datalabels;

                const label = Object.keys(labels);

                ref.ctx.context = context;

                return labels[label[idx]](ref.ctx);
            }
        };

        //TODO:
        this.graph._chartJS.options.onHover = (e: any) => {

            if( ! e.chart.tooltip?.opacity) {
                this.graph.host.classList.remove('clickable');
                return;
            }

            this.graph.host.classList.add('clickable');
        };
        this.graph._chartJS.options.onClick = (ev: any) => {


            const elems = ev.chart.getElementsAtEventForMode(ev, 'point', { intersect: true }, true);
           
            if(elems.length === 0)
                return;

            const dataset = ev.chart.data.datasets[elems[0].datasetIndex];

            if(dataset.name === null)
                return;

            const ref = this.graph.getDataset(dataset.name);
            let idx   = this.#idx.get(ref) ?? 0;
            
            idx = ++idx % Object.keys((ref.constructor as any).datalabels).length;

            this.#idx.set(ref, idx);

            this.graph.requestUpdate();
        }
    }
}

LISS.define('chart-datalabels', Datalabels);