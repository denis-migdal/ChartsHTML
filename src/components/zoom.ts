import GraphComponent from ".";
import LISS from "../../libs/LISS/src/index.ts";;

export default class ChartZoom extends LISS({extends: GraphComponent}) {

    constructor(...args: any[]) {
        super(...args);
        this.host.setAttribute('slot', 'options');

        this.data.setDefault('direction', 'xy');
    }

    override _insert(): void {
		// https://github.com/chartjs/chartjs-plugin-zoom
        this.chart._chartJS.options.plugins!.zoom = {
            pan: {
				enabled: true,
                onPanComplete: () => {

                    console.warn('?', this.chart._chartJS.scales["x"].min, this.chart._chartJS.scales["x"].max )
                }
                /* onPanComplete */
			},
			limits: {},
			zoom: {
				wheel: {
					enabled: true,
					speed: 0.1
				},
                onZoomComplete: () => {
                    console.warn('?', this.chart._chartJS.scales["x"].min, this.chart._chartJS.scales["x"].max )
                }
			}
        }

    }

    // compute zoom limits (only works on x/y axis for now)
    override _before_chart_update() {

        const direction = this.data.getValue('direction');
        const zoom_limits = this.chart._chartJS.options.plugins!.zoom!.limits!;
        const scales = this.chart._chartJS.options.scales!;

        if(direction === 'none')
            return;

        for(let scale_name in this.chart._chartJS.options.scales! ) {
            
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

    override _update(): void {

        const direction = this.data.getValue('direction') as "x"|"y"|"xy"|"none";

        this.chart._chartJS.options.plugins!.zoom!.zoom!.wheel!.enabled = direction !== 'none';
        this.chart._chartJS.options.plugins!.zoom!.zoom!.mode           = direction! as any; //TODO validate
        this.chart._chartJS.options.plugins!.zoom!.pan!.mode            = direction! as any; //TODO validate
    }

    reset() {
        this.chart._chartJS.resetZoom();
    }
}
LISS.define('chart-zoom', ChartZoom);