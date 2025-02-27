import GraphComponent from ".";
import LISS from "@LISS/src/";
import LazyComputedSignal from "@LISS/src/signals/LazyComputedSignal";
import { ContextProvider } from "./tooltip";
import { PropertiesDescriptor } from "@LISS/src/properties/PropertiesManager";
import STRING_PARSER  from "@LISS/src/properties/parser/STRING_PARSER";
import COLOR_PARSER   from "@LISS/src/properties/parser/COLOR_PARSER";
import RAWDATA_PARSER from "@LISS/src/properties/parser/RAWDATA_PARSER";
import FSTRING_PARSER from "@LISS/src/properties/parser/FSTRING_PARSER";


// attrs: ['type', 'color', 'tooltip', 'hide']
export default class Dataset extends GraphComponent {

    static override PropertiesDescriptor: PropertiesDescriptor = {
        ...GraphComponent.PropertiesDescriptor,
        "color": {
            parser : COLOR_PARSER,
            default: "black"
        },
        "content"    : RAWDATA_PARSER,
        "name"       :  STRING_PARSER,
        "type"       :  STRING_PARSER,
        "tooltip"    : FSTRING_PARSER
    };

    protected computeChartJSData(data: any) { return data; }

    protected ChartJSData = new LazyComputedSignal(this.manager.getSignal("content"),
                                                   (signal) => this.computeChartJSData(signal.value) );

    // dataset
    // @ts-ignore (WTF)
    readonly dataset = this.buildDataset();
    override readonly datasets = [
        this.dataset
    ];

    buildDataset(): any {

        return {
            dataset: this,
            name: this.properties.name,
            data: [],
            type: null as null|string
        }
    }

    override onUpdate(): void {

        this.dataset.type = this.properties.type;

        console.warn("called", this.ChartJSData.value);

        this.dataset.data = this.ChartJSData.value;

        this.dataset.backgroundColor = this.dataset.borderColor = this.properties.color;
    }

    // =============== TOOLTIP ====================

    readonly ctx = new ContextProvider();
    
    // tooltips
    tooltip(context: any) {

        const tooltip = this.properties.tooltip;

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

        const name = ""; //this.propertiesManager.getValue('name');

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