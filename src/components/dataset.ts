import GraphComponent from ".";
import LISS, { _extends } from "../../libs/LISS/src/index.ts";
import { LazyComputedSignal } from "LISS/src/x.ts";
import { inherit, PropertiesDescriptor, PROPERTY_COLOR, PROPERTY_FSTRING, PROPERTY_RAWDATA, PROPERTY_STRING } from "properties/PropertiesDescriptor.ts";
import { ContextProvider } from "./tooltip.ts";


export const properties = {
    "content"    : PROPERTY_RAWDATA,
    "name"       : PROPERTY_STRING,
    "color"      : {
        type: PROPERTY_COLOR,
        default: "black"
    },
	"type"       : PROPERTY_STRING,
    "tooltip"    : PROPERTY_FSTRING
} satisfies PropertiesDescriptor;

// attrs: ['type', 'color', 'tooltip', 'hide']
export default class Dataset extends inherit(GraphComponent, properties) {
    
    constructor(args: any) {
        super(args);

        this.propertiesManager.changes.add( this._data );
    }

    // data

    protected _data = new LazyComputedSignal(this.propertiesManager.properties["content"].value, (v) => v.value);
    get data(): any {
        return this._data.value;
    }

    // dataset

    readonly dataset = this.buildDataset();
    buildDataset(): any {
        return {
            name: this.properties.name,
            data: [],
            type: null as null|string
        }
    }

    override onAttach(): void {
        // .controler might not be set yet...
        this.graph.insertDataset(this);
    }

    override onDetach(): void {
        this.graph.removeDataset(this);
    }


    override onUpdate(): void {

        this.dataset.type = this.properties.type;
        this.dataset.data = this.data;

        this.dataset.backgroundColor = this.dataset.borderColor = this.properties.color;
    }

    readonly ctx = new ContextProvider();
    
    // tooltips
    tooltip(context: any) {

        //TODO: use property
        const tooltip = this.propertiesManager.getValue('tooltip');

        if( tooltip === null)
            return "";

        this.ctx.context = context;

        //TODO...
        // @ts-ignore
        return tooltip( this.ctx )
    }

    // datalabel

    static datalabels = {
        none: () => null,
        name: (ctx: any) => ctx.name,
        xy  : (ctx: any) => `(${ctx.x},${ctx.y})`,
        x   : (ctx: any) => ctx.x,
        y   : (ctx: any) => ctx.y,
    }

    // exports (+toJSON)

    toCSV() {

        const name = this.propertiesManager.getValue('name');

        const data = this.properties.data as Record<string, number>[]; // when hide, #dataset.data is [].

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