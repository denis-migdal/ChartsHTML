import type ChartHTML from "ChartsHTML";
import LISS from "LISS";

export default class Scale extends LISS({attributes: ['name', 'min', 'max', 'position']}) {

    #chart?: ChartHTML;

    constructor() {
        super();
        this.host.setAttribute('slot', 'scale');
    }

    attach(config: any) { //TODO: find real type


        //TODO: validate config...
        const {name,position,min,max} = this.attrs;
        if( name === null)
            throw new Error('name is null');

        const labels_text = this.host.textContent!.trim();

        let scale: any = {};
        if(labels_text !== '') {

            const labels = labels_text.split(',').map(l => l.trim());
            console.warn(labels);
            scale = {
                type   : "category",
                offset : true,
                labels,
                grid: {
                    offset: true
                },
            };

            if( name[0] === 'y') {
                scale.reverse = true;
                scale.ticks = {
                    padding: 0,
                    align: 'start',
                    crossAlign: 'center',
                    maxRotation: 90,
                    minRotation: 90
                };
            }

        } else {

            scale = { //TODO find real type
                min: min,
                max: max,
                beginAtZero: true,
                type: 'linear',
                offset : false,
                grid: {
                    offset: false,
                },
            };
        }

        if( position !== null)
            scale.position = position;

        config.options.scales![this.attrs.name!] = scale;
    }
}
LISS.define('chart-scale', Scale);