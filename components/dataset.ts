import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

import {Chart} from 'chart.js';

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

    /* 
	protected _getX<TType extends ChartType>( context: TooltipItem<TType> ): string|number|null {

		return ( context?.parsed as any)?.x
			?? (context.dataset as any)?.data[context.dataIndex]?.x
			?? (context.dataset as any)?.data[context.dataIndex]?.[0]
			?? null;
	}
	protected _getY<TType extends ChartType>( context: TooltipItem<TType> ): string|number|null {

		return (context?.parsed as any)?.y
			?? (context.dataset as any)?.data[context.dataIndex]?.y
			?? (context.dataset as any)?.data[context.dataIndex]?.[1]
			?? null;
	}*/

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

    tooltip(context: any) {
        if(this.attrs.tooltip === null)
            return "";
        return this.chart.evalTString( this.attrs.tooltip, this.additionalValues(context) );
    }

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
}
LISS.define('chart-dataset', Dataset);