//import { inherit, PropertiesDescriptor, PROPERTY_COLOR, PROPERTY_FSTRING, PROPERTY_RAWDATA, PROPERTY_STRING } from 'properties/PropertiesDescriptor.ts';
import GraphComponent from '.';
import LISS from "@LISS/src/";
import Dataset from './dataset';

/*
export const properties = {
    "content"    : PROPERTY_RAWDATA,
    "name"       : PROPERTY_STRING,
    "colors"     : PROPERTY_RAWDATA,
    "color"      : {
        type: PROPERTY_COLOR,
        default: "black"
    },
    "type"       : PROPERTY_STRING,
    "tooltip"    : PROPERTY_FSTRING
} satisfies PropertiesDescriptor;

inherit(GraphComponent, properties)
*/

export default class Datasets extends GraphComponent {

    #curves: Dataset[] = [];

    override onUpdate(): void {

        for(let curve of this.#curves)
            ;//curve.detach(); // TODO: optimize...

        const contents = this.properties.content ?? [];

        //TODO: generic ???
        /*
        let colors: string[]|null = this.properties.colors;

        const type = this.properties.type;
        const name = this.properties.name;
        const tooltip = this.properties.tooltip;
        const color   = this.properties.color; */

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
            ;//curve.attachTo(this.graph);

    }
}


LISS.define('chart-datasets', Datasets);