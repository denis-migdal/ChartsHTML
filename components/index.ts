
import LISS from "LISS";
import type ChartHTML from './';

export default class GraphComponent extends LISS() {

    #chart?: ChartHTML;

    constructor() {
        super();
    }

    get chart() {
        return this.#chart!;
    }

    // redefine
    _insert() {}
    _update() {}

    //internal
    //TODO !!! rename !!!

    #parsed_attrs = null;
    #parsed_content = null;

    override onAttrChanged(_name: string, _oldValue: string, _newValue: string): false | void {

        this._update();
        if(this.#chart !== undefined)
            this.#chart._chartJS.update('none'); //TODO move 2 father - move 2 update
    }

    // external
    _attach(chart: ChartHTML) {
        this.#chart = chart;
        this._insert();
        this._update();
    }
    _detach() {}
}