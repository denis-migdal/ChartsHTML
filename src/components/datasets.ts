import GraphComponent from '.';
import LISS, { ShadowCfg } from "../../libs/LISS/src/index.ts";
import Dataset from './dataset';
import { StringEval } from '../StringEval';

export default class Datasets extends LISS({extends: GraphComponent, shadow: ShadowCfg.OPEN}) {

    constructor(...args: any[]) {
        super(...args);
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
        const vcolors = this.data.getValue('colors');
        if( vcolors !== null) {
            this.#colors_eval.setString( vcolors );
            colors = this.#colors_eval.eval();
        }

        const type = this.data.getValue('type');
        const name = this.data.getValue('name');
        const tooltip = this.data.getValue('tooltip');
        const color   = this.data.getValue('color');

        this.#curves = contents.map( (content: any, i: number) => {

            if( typeof content !== "string")
                content = JSON.stringify(content);

            // TODO: unimplemented ?
            throw new Error('Not implemented !');
            /*
            return LISS.buildSync(type as any, {
                content: [content],
                parent : this.content as any,
                attrs: {
                    name: `${name}.${i}`,
                    color: colors?.[i] ?? color ?? 'black',
                    tooltip: tooltip!
                }
            });*/
        });

        for(let curve of this.#curves)
            curve._attach(this.chart);

    }
}


LISS.define('chart-datasets', Datasets);