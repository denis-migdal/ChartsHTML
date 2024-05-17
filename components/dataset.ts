import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

import type { ChartType, TooltipItem } from "chart.js";

export default class Dataset extends LISS.extendsLISS(GraphComponent, {attributes: ['type', 'color', 'tooltip']}) {

    #chart?: ChartHTML;

    constructor() {
        super();
        this.host.setAttribute('slot', 'dataset');
    }

    #dataset = {
        name: this.attrs.name,
        data: [],
        type: this.attrs.type
    };
    get dataset() {
        return this.#dataset as any;
    }

    // override
    protected override _contentParser(content: string) {
        return JSON.parse(content);
    }

    override _insert(): void {
        this.chart.insertDataset(this);
    }

    override _update(): void {
        //TODO: validate config...
        const {type, color} = this.attrs;
        
        this.#dataset.type = type;
        this.#dataset.data = this.contentParsed;

        if(color !== null) {
            this.dataset.borderColor = color;
            this.dataset.backgroundColor = color;
        }
    }

    // add values
    additionalValues(context: any) {

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

    // tooltips
    tooltip(context: any) {
        if(this.attrs.tooltip === null)
            return "";
        return this.chart.evalTString( this.attrs.tooltip, this.additionalValues(context) );
    }

    // datalabel

    //TODO...
	#curDatalabel = 'none';
    #datalabels: Record<string, string|null> = {
		none  : "",
		name:  '${name}',
		y: '${y}',
        x: '${x}'
	};

    getDatalabel<TType extends ChartType>( context: TooltipItem<TType>): string|number|null {

        const datalabel = this.#datalabels[this.#curDatalabel];
        if(datalabel === "")
            return null;
		return this.chart.evalTString(datalabel, this.additionalValues(context) );
	}

    datalabelToggle(name?: string) {

		if(name) {
			this.#curDatalabel = name;
			return;
		}

		let labels = Object.keys(this.#datalabels);
		let idx = labels.indexOf(this.#curDatalabel);
		idx = (idx + 1) % labels.length;

		this.#curDatalabel = labels[idx];
    }

    /*

	changePointLabel() {

	}

	*/

}
LISS.define('chart-dataset', Dataset);