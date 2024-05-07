import type ChartHTML from "ChartsHTML";
import LISS from "LISS";

export default class Dataset extends LISS({attributes: ['name', 'type']}) {

    #chart?: ChartHTML;

    constructor() {
        super();
        this.host.setAttribute('slot', 'dataset');
    }

    attach(config: any) { //TODO: find real type


        //TODO: validate config...
        const {type} = this.attrs;
        
        const dataset = {
            data: JSON.parse(this.host.textContent!)
        };

        if( type !== null)
            dataset.type = type;

        console.warn(dataset);

        config.data.datasets.push(dataset);
    }
}
LISS.define('chart-dataset', Dataset);