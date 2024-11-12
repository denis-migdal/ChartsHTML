import GraphComponent from '.';
import LISS, { ShadowCfg } from "../../libs/LISS/src/index.ts";
import Dataset from './dataset';
import { StringEval } from '..';

export default class Datasets extends LISS({extends: GraphComponent, shadow: ShadowCfg.OPEN, attrs: ['type', 'tooltip', 'color', 'colors']}) {

    constructor() {
        super();
        this.host.setAttribute('slot', 'datasets');
    }

    #curves: Dataset[] = [];

    #colors_eval = new StringEval<string[]>(this);

    override _update(): void {

        for(let curve of this.#curves)
            curve._detach();

        const contents = this.contentParsed ?? [];


        //TODO: generic ???
        let colors: string[]|null = null;
        if( this.attrs.colors !== null) {
            this.#colors_eval.setString( this.attrs.colors );
            colors = this.#colors_eval.eval();
        }

        this.#curves = contents.map( (content: any, i: number) => {

            if( typeof content !== "string")
                content = JSON.stringify(content);

            return LISS.buildSync(this.attrs.type as any, {
                content: [content],
                parent : this.content as any,
                attrs: {
                    name: `${this.attrs.name}.${i}`,
                    color: colors?.[i] ?? this.attrs.color ?? 'black',
                    tooltip: this.attrs.tooltip!
                }
            });
        });

        for(let curve of this.#curves)
            curve._attach(this.chart);

    }
}


LISS.define('chart-datasets', Datasets);