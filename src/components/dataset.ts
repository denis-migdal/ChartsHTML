import { StringEval } from "../StringEval";
import GraphComponent from ".";
import LISS, { _extends } from "../../libs/LISS/src/index.ts";

import type { ChartType, TooltipItem } from "chart.js";

// attrs: ['type', 'color', 'tooltip', 'hide']
export default class Dataset extends LISS({extends: GraphComponent}) {

    static override observedAttributes = [
        ...GraphComponent.observedAttributes,
        'type', 'color', 'tooltip',
    ];

    constructor(args: any) {
        super(args);

        this.host.setAttribute('slot', 'dataset');
        this.propertiesManager.setDefaultValue("color", "black");
    }

    #dataset = {
        name: this.propertiesManager.getValue('name'),
        data: [],
        type: null as null|string
    };
    get dataset() {
        return this.#dataset as any;
    }

    override _insert(): void {
        this.chart.insertDataset(this);
    }

    override _detach(): void {
        this.chart.removeDataset(this);
    }

    //TODO: setter
    get type(): string|null {
        return this.propertiesManager.getValue("type");
    }
    get color(): string {
        return this.propertiesManager.getValue("color");
    }
    get data(): any {
        return this.propertiesManager.getValue("content");
    }

    override _update(): void {

        this.#dataset.type = this.type;
        this.#dataset.data = this.data;

        this.dataset.backgroundColor = this.dataset.borderColor = this.color;
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

        const tooltip = this.propertiesManager.getValue('tooltip');

        if( tooltip === null)
            return "";

        //TODO...
        // @ts-ignore
        return tooltip(  this.additionalContext(context) )
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

        const name = this.propertiesManager.getValue('name');

        const data = this.dataset_data.value as Record<string, number>[]; // when hide, #dataset.data is [].

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