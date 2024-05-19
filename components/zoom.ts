import type ChartHTML from "../";
import GraphComponent from "./";
import LISS from "LISS";

import {Chart} from 'chart.js';

export default class ChartZoom extends LISS.extendsLISS(GraphComponent, {attributes:['direction']}) {

    constructor() {
        super();
        this.host.setAttribute('slot', 'options');
    }

    override _insert(): void {
		// https://github.com/chartjs/chartjs-plugin-zoom
        this.chart._chartJS.options.plugins.zoom = {
            pan: {
				enabled: true
			},
			limits: {
				y: { /*TODO...
                    min: 0,
                    max: 10*/
                },
				x: {}
			},
			zoom: {
				wheel: {
					enabled: true,
					speed: 0.1
				},
				mode: 'xy'
			}
        }

    }

    override _update(): void {

        this.chart._chartJS.options.plugins.zoom.zoom.wheel.enabled = this.attrs.direction !== 'none';
        this.chart._chartJS.options.plugins.zoom.zoom.mode          = this.attrs.direction;
    }

    reset() {
        this.chart._chartJS.resetZoom();
    }
}
LISS.define('chart-zoom', ChartZoom);