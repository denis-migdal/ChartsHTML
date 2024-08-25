import GraphComponent from '.';
import LISS, { ShadowCfg } from "LISS";
import Dataset from './dataset';

export default class Datasets extends LISS.extendsLISS(GraphComponent, {shadow: ShadowCfg.OPEN, attributes: ['type']}) {

    constructor() {
        super();
        this.host.setAttribute('slot', 'datasets');
    }

    #curves: Dataset[] = [];

    override _update(): void {

        for(let curve of this.#curves)
            curve._detach();

        const contents = this.contentParsed ?? [];

        this.#curves = contents.map( (content: any, i: number) => {

            if( typeof content !== "string")
                content = JSON.stringify(content);

            return LISS.buildSync(this.attrs.type as any, {
                content: [content],
                parent : this.content as any,
                attrs: {
                    name: `${this.attrs.name}.${i}`
                }
            });
        });

        for(let curve of this.#curves)
            curve._attach(this.chart);

    }
}


LISS.define('chart-datasets', Datasets);