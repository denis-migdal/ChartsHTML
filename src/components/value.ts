import GraphComponent from ".";
import LISS from "@LISS/src";

/*
export const properties = {
    "content"    : PROPERTY_RAWDATA,
} satisfies PropertiesDescriptor;

// name is fixed for now ?

inherit(GraphComponent, properties)
*/

export default class Value extends GraphComponent {

    override onAttach() {
        //this.graph.signals.set(this.properties.name, this.propertiesManager.properties["content"].value);
    }

    override onDetach() {
        //this.graph.signals.clear(this.properties.name);
    }

    override onUpdate(): void {
        //TODO: name changed
    }
}
LISS.define('chart-value', Value);