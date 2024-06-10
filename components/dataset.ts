import type ChartHTML from "../";
import { StringEval } from "../";
import GraphComponent from "./";
import LISS from "LISS";

import type { ChartType, TooltipItem } from "chart.js";

export default class Dataset extends LISS.extendsLISS(GraphComponent, {attributes: ['type', 'color', 'tooltip', 'hide']}) {

    #chart?: ChartHTML;

    constructor() {
        super();
        this.host.setAttribute('slot', 'dataset');
    }

    #dataset = {
        name: this.attrs.name,
        data: [],
        type: ""
    };
    get dataset() {
        return this.#dataset as any;
    }

    override _insert(): void {
        this.chart.insertDataset(this);
    }

    override _update(): void {
        //TODO: validate config...

        const type  = this.attrs.type;
        const color = this.attrs.color;
        
        this.#dataset.type = type!;
        this.#dataset.data = this.attrs.hide === "true" ? [] : this.contentParsed;

        if(color !== null) {
            this.dataset.borderColor = color;
            this.dataset.backgroundColor = color;
        }
    }

    // add values
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

    // tooltips
    #tooltipEval = new StringEval(this);
    tooltip(context: any) {
        if(this.attrs.tooltip === null)
            return "";

        this.#tooltipEval.setString(this.attrs.tooltip);
        return this.#tooltipEval.eval( this.additionalContext(context) );
    }

    // datalabel

    //TODO: better...
	#curDatalabel = 'none';
    #datalabels: Record<string, string|null> = {
		none  : null,
		name  :  '`${c.name}`',
		y: '`${c.y}`',
        x: '`${c.y}`'
	};

    #datalabelEval = new StringEval<string>(this);
    getDatalabel<TType extends ChartType>( context: TooltipItem<TType>): string|number|null {

        const datalabel = this.#datalabels[this.#curDatalabel]!;
        if(datalabel === "")
            return null;

        this.#datalabelEval.setString(datalabel);
        return this.#datalabelEval.eval( this.additionalContext(context) );
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

    toCSV() {

        const data = this.contentParsed as Record<string, number>[]; // when hide, #dataset.data is [].

        // Get the keys.
        const keys_set = new Set<string>();
        for(let point of data)
            for(let key in point)
                keys_set.add(key);

        let lines = new Array<string>();
        const keys = [...keys_set].sort()
        for(let key of keys) {

            let line = [this.attrs.name, key, ...data.map( p => p[key])];

            lines.push(line.join('\t'));
        }

        return lines.join(`\n`);
    }
}
LISS.define('chart-dataset', Dataset);