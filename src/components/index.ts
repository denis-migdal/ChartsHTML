import LISS from "@LISS/src/";

import { PropertiesDescriptor } from "@LISS/src/properties/PropertiesManager";
import STRING_PARSER from "@LISS/src/properties/parser/STRING_PARSER";
import LISSChild from "@LISS/src/LISSClasses/LISSChild";
import { BubbleDataPoint, ChartDataset, ChartTypeRegistry, Point } from "chart.js";
import Chart from "@ChartsHTML/Chart";

type ChartJSDataset = ChartDataset<keyof ChartTypeRegistry, (number | Point | [number, number] | BubbleDataPoint | null)[]>;

export default class GraphComponent extends LISS({
    shadow: null,
}, LISSChild) {

    get chart(): null|Chart {
        return this.father as null|Chart;
    }
    get chartJS() {
        // @ts-ignore
        return this.chart?.chartJS ?? null;
    }

    static override PropertiesDescriptor: PropertiesDescriptor = {
        name: {parser: STRING_PARSER}
    };

    readonly datasets = new Array<ChartJSDataset>();
    
    onChartUpdate() {}
}