
import {Chart} from 'chart.js';

export default class GraphComponent {

    #chart?: Chart;

    constructor() {
    }

    get chart() {
        return this.#chart!;
    }

    // redefine
    _insert() {}
    _update() {}

    //internal
    //TODO !!! rename !!!
    onAttrChanged(_name: string, _oldValue: string, _newValue: string): false | void {
        this._update();
        if(this.#chart !== undefined)
            this.#chart.update('none'); //TODO move 2 father - move 2 update
    }

    // external
    _attach(chart: Chart) {
        this.#chart = chart;
        this._insert();
        this._update();
    }
    _detach() {}
}