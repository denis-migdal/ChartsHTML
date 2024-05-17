import Line from './Line'

import LISS from "LISS";

export default class HLine extends Line {

    constructor() {
        super();
        this.host.setAttribute('type', 'scatter');
    }

    override _contentParser(content: string) {
        return [{x:-Number.MAX_VALUE,y:+content}, {x:Number.MAX_VALUE,y:+content}];
    }

    override _update() {
        super._update();

        this.dataset.cubicInterpolationMode = 'monotone';
        this.dataset.pointRadius = 0;

        /* this.#dataset = {
        	label: name,
			order: - (options['z-index'] ?? 0)
        };

        if( this.options.fill ) {

        	let color = this.options.fill === true
        					? this.options.color
        					: this.options.fill;

			this.#dataset.fill = {
				target: 'origin',
				above: color
			};
        }*/
    }

}


LISS.define('curve-hline', HLine);