import GraphComponent from ".";
import LISS from "../../libs/LISS/src/index.ts";;

export default class Value extends LISS({extends: GraphComponent}) {

    constructor(...args: any[]) {
        super(...args);
        this.host.setAttribute('slot', 'dataset');

        const observer = new MutationObserver( () => {
            this._update()
        });
        observer.observe(this.host, {characterData: true, subtree: true});
    }

    override _update(): void {
        //TODO: signal...
        //TODO: validate config...
        this.chart.setValue(this.data.getValue('name')!, this.parsedContent.value);
    }
}
LISS.define('chart-value', Value);