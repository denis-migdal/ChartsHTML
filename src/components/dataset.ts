import GraphComponent from ".";
import LISS from "@LISS/src/";
import LazyComputedSignal from "@LISS/src/signals/LazyComputedSignal";
import { ContextProvider } from "./tooltip";
import { PropertiesDescriptor } from "@LISS/src/properties/PropertiesManager";
import STRING_PARSER  from "@LISS/src/properties/parser/STRING_PARSER";
import COLOR_PARSER   from "@LISS/src/properties/parser/COLOR_PARSER";
import RAWDATA_PARSER from "@LISS/src/properties/parser/RAWDATA_PARSER";
import FSTRING_PARSER from "@LISS/src/properties/parser/FSTRING_PARSER";
import FSTRING_ARRAY_PARSER from "@LISS/src/properties/parser/FSTRING_ARRAY_PARSER";


// attrs: ['type', 'color', 'tooltip', 'hide']
export default class Dataset extends GraphComponent {

    static override PropertiesDescriptor: PropertiesDescriptor = {
        ...GraphComponent.PropertiesDescriptor,
        "color": {
            parser : COLOR_PARSER,
            default: "black"
        },
        "content"    : RAWDATA_PARSER,
        "type"       :  STRING_PARSER,
        "tooltip"    : FSTRING_PARSER,
        "datalabels" : FSTRING_ARRAY_PARSER,
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
            name: this.value.name,
            data: [],
            type: null as null|string
        }
    }

    override onUpdate(): void {

        this.dataset.type = this.value.type;

        this.dataset.data = this.ChartJSData.value;

        this.dataset.backgroundColor = this.dataset.borderColor = this.value.color;
    }

    // =============== TOOLTIP & DATALABELS ====================

    readonly ctx = new ContextProvider();

    // tooltips

    get hasTooltip() {
        return this.value.tooltip !== null;
    }
    
    tooltip(context: any) {

        const tooltip = this.value.tooltip;

        if( tooltip === null)
            return null;

        this.ctx.context = context;

        return tooltip( this.ctx )
    }

    get hasDatalabels() {
        return this.value.datalabels !== null;
    }

    private datalabels_id: number = 0;

    on_datalabels_click() {
        ++this.datalabels_id;
    }

    datalabels(context: any) {

        const datalabels = this.value.datalabels;

        if( datalabels === null)
            return null;

        this.ctx.context = context;

        return datalabels( this.datalabels_id, this.ctx );
    }

    // =============== EXPORTS ====================

    // exports (+toJSON)

    toCSV() {

        const name = ""; //this.propertiesManager.getValue('name');

        const data = this.value.data as Record<string, number>[]; // when hide, #dataset.data is [].

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