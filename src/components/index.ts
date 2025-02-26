
import LISS, {ShadowCfg} from "@LISS";
import type {ChartHTML} from '..';

import { PropertiesManager } from "properties/PropertiesManager.ts";
import { PropertiesDescriptor, PROPERTY_STRING } from "properties/PropertiesDescriptor.ts";
import ROSignal from "@LISS/src/signals/ROSignal";
import Signal   from "@LISS/src/signals/Signal";

/****/

export default class GraphComponent extends LISS({shadow: ShadowCfg.NONE}) {

    static propertiesDescriptor: PropertiesDescriptor = {
        name: {type: PROPERTY_STRING}
    };

    static override readonly observedAttributes = ['name']; 

    static readonly PropertiesBuilder = {} as any;

    protected propertiesManager: PropertiesManager;
    readonly properties: any;

    constructor(params: Record<string,any>) {
        super();

        this.propertiesManager = new PropertiesManager(this);
        this.properties = new (this.constructor as any).PropertiesBuilder(this.propertiesManager)

        console.warn("built", this.constructor.name);

        for( let key in params )
            this.properties[key] = params[key];

        this.propertiesManager.changes.listen( () => {
            if( this.isAttached )
                this.graph.requestUpdate();
        });
    }
    
    onUpdate() {}
    onChartUpdate() {}

    #graph = new Signal<ChartHTML>();
    get graphSignal(): ROSignal<ChartHTML> {
        console.warn('!', this.constructor.name);
        console.warn( this instanceof GraphComponent );
        return this.#graph;
    }
    get graph() {
        const graph = this.#graph.value;
        if(graph === null)
            throw new Error("Not attached !");
        return graph;
    }
    get isAttached() {
        return this.#graph.value !== null;
    }

    attachTo(chart: ChartHTML) {
        this.#graph.value = chart;
        // triggers host
        if( this.host.parentElement !== chart.host)
            chart.host.append(this.host);
    }
    detach() {
        this.#graph.clear();
        this.host.remove();
    }

    onAttach() {}
    onDetach() {}
}