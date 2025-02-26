import { SignalEventMerger } from "LISS/src/x";
import { Property } from "./Property";
import { PropertyFullDescriptor } from "./PropertiesDescriptor";
import { ChartHTML } from "index";
import GraphComponent from "components";
import { LISSHost } from "LISS/src/types";

export class PropertiesManager {

    //TODO: graph as signal...
    #target: GraphComponent;

    get target() {
        console.warn("?", this.#target.constructor.name);
        return this.#target;
    }

    get graph() {
        if( ! this.#target.isAttached )
            return null;
        return this.#target.graph;
    }

    constructor(target: GraphComponent) {

        // TODO: real type...
        // @ts-ignore
        const propertiesDescriptor = target.constructor.propertiesDescriptor;

        this.#target = target;

        //TODO...
        for(let prop_name in propertiesDescriptor) {

            const initialValue = prop_name === "content" 
                                ? target.host.textContent
                                : target.host.getAttribute(prop_name);

            this.createProperty(prop_name,
                                initialValue,
                                propertiesDescriptor[prop_name]);
        }

        // @ts-ignore
        target.host.attributeChangedCallback = (name: string, oldV: string|null, newV: string|null) => {
            if( oldV === newV )
                return;
            this.properties[name].raw.value = newV;
        }

        new MutationObserver( () => {
            this.properties.content.raw.value = target.host.textContent;
        }).observe(target.host, {characterData: true, subtree: true});
    }

    //TODO: add type...
    protected createProperty(name: string, initial_value: string|null, descriptor: PropertyFullDescriptor<any>) {
        const property = this.properties[name] = new Property(this, initial_value, descriptor);
        this.changes.add( property.value );
    }

    getValue(name: string) {
        return this.properties[name].value.value;
    }

    setValue(name: string, value: any) {
        this.properties[name].setValue(value);
    }

    getValues(...names: string[]) {
        const result: Record<string, any> = {};
        for(let i = 0; i < names.length; ++i)
            result[names[i]] = this.properties[names[i]].value.value;

        return result;
    }

    setDefaultValue(name: string, value: any) {
        this.properties[name].setDefaultValue(value);
    }

    readonly changes = new SignalEventMerger();

    readonly properties: Record<string, Property> = {};
}