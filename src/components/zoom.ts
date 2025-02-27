import STRING_PARSER from "@LISS/src/properties/parser/STRING_PARSER";
import GraphComponent from ".";
import LISS from "@LISS/src";
import { PropertiesDescriptor } from "@LISS/src/properties/PropertiesManager";
import LISSFather from "@LISS/src/LISSClasses/LISSFather";

export default class ChartZoom extends GraphComponent {

    static override PropertiesDescriptor: PropertiesDescriptor = {
        ...GraphComponent.PropertiesDescriptor,
        "direction" : {
            parser : STRING_PARSER,
            default: "xy"
        }
    };

    override onDetach(): void {
        delete (this.father as any).chartJS.options.plugins!.zoom;
    }

    override onAttach(): void {

		// https://github.com/chartjs/chartjs-plugin-zoom
        const zoom = this.chartJS!.options.plugins!.zoom!;

        zoom.limits = {};
        zoom.zoom   = {
            wheel: {
                enabled: false,
                speed: 0.1
            }
        }
        
        zoom.pan = {enabled: true};
                /*
                onPanComplete: () => {

                    console.warn('?', this.chart._chartJS.scales["x"].min, this.chart._chartJS.scales["x"].max )
                }*/
                /* onPanComplete */
        /*
            onZoomComplete: () => {
                console.warn('?', this.chart._chartJS.scales["x"].min, this.chart._chartJS.scales["x"].max )
            }
        */
    }

    // compute zoom limits (only works on x/y axis for now)
    override onChartUpdate() {

        const chartJS = this.chartJS!

        const direction = this.properties.direction;
        const zoom_limits = chartJS.options.plugins!.zoom!.limits!;
        const scales      = chartJS.options.scales!;

        if(direction === 'none')
            return;

        for(let scale_name in chartJS.options.scales! ) {
            
            if(scales[scale_name]!.type !== 'linear') {
                zoom_limits[scale_name] = {};
                continue;
            }

            zoom_limits[scale_name] = {
                min: scales[scale_name]!.min as number,
                max: scales[scale_name]!.max as number,
            }
        }
    }

    override onUpdate(): void {

        const direction = this.properties.direction as "x"|"y"|"xy"|"none";

        const cfg = this.chartJS!.options.plugins!.zoom!;

        cfg.zoom!.wheel!.enabled = direction !== 'none';
        cfg.pan!.mode = cfg.zoom!.mode = direction! as any; //TODO validate
    }

    reset() {
        this.chartJS!.resetZoom();
    }
}
LISS.define('chart-zoom', ChartZoom);