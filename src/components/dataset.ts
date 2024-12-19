import { StringEval } from "../StringEval";
import GraphComponent from ".";
import LISS, { _extends } from "../../libs/LISS/src/index.ts";

import type { ChartType, TooltipItem } from "chart.js";

// attrs: ['type', 'color', 'tooltip', 'hide']
export default class Dataset extends LISS({extends: GraphComponent}) {

    static override observedAttributes = [...GraphComponent.observedAttributes, 'type', 'color', 'tooltip', 'hide'];

    constructor(...args: any[]) {
        super(...args);

        this.host.setAttribute('slot', 'dataset');
        this.data.setDefault('color', 'black');
    }

    #dataset = {
        name: this.data.getValue('name'),
        data: [],
        type: null as null|string
    };
    get dataset() {
        console.warn("called ?");
        return this.#dataset as any;
    }

    toggleShow() {
        //TODO: hidden...
        this.data.setValue('hide', `${ this.isShown }`);

        this.update();
        this.chart!.update();

        return this.isShown;
    }
    get isShown() {
        return this.data.getValue('hide') !== "true";
    }

    override _insert(): void {
        this.chart.insertDataset(this);
    }

    override _detach(): void {
        this.chart.removeDataset(this);
    }

    override _update(): void {

        //TODO: validate config...

        const type  = this.data.getValue('type');
        const color = this.data.getValue('color');
        const hide  = this.data.getValue('hide');
    
        this.#dataset.type = type!;
        this.#dataset.data = hide === "true" ? [] : this.contentParsed;

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
    #tooltipEval = new StringEval<string>(this);
    tooltip(context: any) {

        const tooltip = this.data.getValue('tooltip');

        if( tooltip === null)
            return "";

        this.#tooltipEval.setString(tooltip);
        return this.#tooltipEval.eval( this.additionalContext(context) );
    }

    // datalabel

    //TODO: better...
	#curDatalabel = 'none';
    #datalabels: Record<string, string|null> = {
		none  : null,
		name  :  '${ctx.name}',
        x     : '${ctx.x}',
		y     : '${ctx.y}',
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

        const name = this.data.getValue('name');

        const data = this.contentParsed as Record<string, number>[]; // when hide, #dataset.data is [].

        // Get the keys.
        const keys_set = new Set<string>();
        for(let point of data)
            for(let key in point)
                keys_set.add(key);

        let lines = new Array<string>();
        const keys = [...keys_set].sort()
        for(let key of keys) {

            let line = [name, key, ...data.map( p => p[key])];

            lines.push(line.join('\t'));
        }

        return lines.join(`\n`);
    }
}
LISS.define('chart-dataset', Dataset);