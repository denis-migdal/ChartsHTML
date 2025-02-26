import { inherit, PROPERTY_STRING } from "properties/PropertiesDescriptor.ts";
import GraphComponent from ".";
import LISS from "../../libs/LISS/src/index.ts";;

const properties = {
    "direction"  : {
        type   : PROPERTY_STRING,
        default: "xy"
    }
}

export default class ChartZoom extends inherit(GraphComponent, properties) {

    override onDetach(): void {
        delete this.graph._chartJS.options.plugins!.zoom;
    }

    override onAttach(): void {
		// https://github.com/chartjs/chartjs-plugin-zoom
        const zoom = this.graph._chartJS.options.plugins!.zoom!;

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

        const direction = this.properties.direction;
        const zoom_limits = this.graph._chartJS.options.plugins!.zoom!.limits!;
        const scales = this.graph._chartJS.options.scales!;

        if(direction === 'none')
            return;

        for(let scale_name in this.graph._chartJS.options.scales! ) {
            
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

        this.graph._chartJS.options.plugins!.zoom!.zoom!.wheel!.enabled = direction !== 'none';
        this.graph._chartJS.options.plugins!.zoom!.zoom!.mode           = direction! as any; //TODO validate
        this.graph._chartJS.options.plugins!.zoom!.pan!.mode            = direction! as any; //TODO validate
    }

    reset() {
        this.graph._chartJS.resetZoom();
    }
}
LISS.define('chart-zoom', ChartZoom);