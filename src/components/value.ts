import { inherit, PropertiesDescriptor, PROPERTY_RAWDATA } from "properties/PropertiesDescriptor.ts";
import GraphComponent from ".";
import LISS from "../../libs/LISS/src/index.ts";

export const properties = {
    "content"    : PROPERTY_RAWDATA,
} satisfies PropertiesDescriptor;

// name is fixed for now ?

export default class Value extends inherit(GraphComponent, properties) {

    override onAttach() {
        this.graph.signals.set(this.properties.name, this.propertiesManager.properties["content"].value);
    }

    override onDetach() {
        this.graph.signals.clear(this.properties.name);
    }

    override onUpdate(): void {
        //TODO: name changed
    }
}
LISS.define('chart-value', Value);