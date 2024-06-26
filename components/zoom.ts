import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

import {Chart} from 'chart.js';

export default class ChartZoom extends LISS.extendsLISS(GraphComponent, {attributes:['direction']}) {

    constructor() {
        super();
        this.host.setAttribute('slot', 'options');

        this.setAttrDefault('direction', 'xy');
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

        const direction = this.attrs.direction;
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

        this.chart._chartJS.options.plugins!.zoom!.zoom!.wheel!.enabled = this.attrs.direction !== 'none';
        this.chart._chartJS.options.plugins!.zoom!.zoom!.mode           = this.attrs.direction! as any; //TODO validate
        this.chart._chartJS.options.plugins!.zoom!.pan!.mode            = this.attrs.direction! as any; //TODO validate
    }

    reset() {
        this.chart._chartJS.resetZoom();
    }
}
LISS.define('chart-zoom', ChartZoom);