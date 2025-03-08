import GraphComponent from ".";
import LISS from "@LISS/src/";
import STRING_PARSER  from "@LISS/src/properties/parser/STRING_PARSER";
import FSTRING_PARSER from "@LISS/src/properties/parser/FSTRING_PARSER";
import { PropertiesDescriptor } from "@LISS/src/properties/PropertiesManager";

import { ChartType, TooltipItem} from 'chart.js';
import Dataset from "./dataset";

export class ContextProvider {
    
    #context!: any;
    set context(context: any) {
        this.#context = context;
    }

    get name() {
        return this.#context.dataset.name;
    }
    get x() {
        const context = this.#context;
        return (context?.parsed as any)?.x
            ?? (context.dataset as any)?.data[context.dataIndex]?.x
            ?? (context.dataset as any)?.data[context.dataIndex]?.[0]
            ?? null;
    }

    get y() {
        const context = this.#context;
        return (context?.parsed as any)?.y
        ?? (context.dataset as any)?.data[context.dataIndex]?.y
        ?? (context.dataset as any)?.data[context.dataIndex]?.[1]
        ?? null
    }      
}


export default class Tooltip extends GraphComponent {

    static override PropertiesDescriptor: PropertiesDescriptor = {
        ...GraphComponent.PropertiesDescriptor,
        "content"    : FSTRING_PARSER,
        "direction"  :  STRING_PARSER
    };

    readonly #ctx = new ContextProvider();
    
    readonly #config = {

        enabled: true,

        mode     : "point" as "x"|"y"|"point",
        intersect: true,

        titleFont: {
            family: 'Courier New'
        },
        bodyFont: {
            family: 'Courier New'
        },
        filter: <TType extends ChartType>(context: TooltipItem<TType>) => {

            const point = context.parsed as any;
            if( point.x === null || point.y === null )
                return false;

            const dataset = ((context.dataset as any).dataset as Dataset)!;

            return dataset.hasTooltip;
        },

        callbacks: {

            // Tooltip title (depends graph)
            title: (context: any) => {

                if(context.length === 0)
                    return null;

                this.#ctx.context = context[0];

                return this.value.content(this.#ctx);
            },
            // One line per points
            label: (context: any) => {
                return ((context.dataset as any).dataset as Dataset)!.tooltip(context) as string;
            }
        }
    };

    override onDetach(): void {
        delete this.chartJS!.options.hover;
        delete this.chartJS!.options.plugins!.tooltip;
    }

    override onAttach(): void {

        let direction = this.value.direction;
        if( direction === "xy" || direction === null)
            direction = "point";

		let mode = direction as "x"|"y"|"point";
        let intersect = mode === "point";

        this.chartJS!.options.hover = {
            mode,
            intersect
        };

        this.#config.mode      = mode;
        this.#config.intersect = intersect;

        this.chartJS!.options.plugins!.tooltip = this.#config;
    }
}

LISS.define('chart-tooltip', Tooltip);

/*            
    tooltip: {

        filter: <TType extends ChartType>(context: TooltipItem<TType>) => {
            let name = (context.dataset as ChartDataset<TType>).label!;
            return this.#elements[name].filter(context);
        },
    }
}*/

/*itemSort: <TTypeA extends ChartType, TTypeB extends ChartType>(a: TooltipItem<TTypeA>, b: TooltipItem<TTypeB>) => {

            let diff = a.dataset.order - b.dataset.order;
            if( diff !== 0)
                return diff;
            
            diff = a.datasetIndex - b.datasetIndex;

            if( diff !== 0)
                return diff;

            return a.dataIndex - b.dataIndex;
        },*/