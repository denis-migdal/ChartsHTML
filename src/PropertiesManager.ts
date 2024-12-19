import { SignalEventMerger } from "LISS/src/x";
import { Property } from "Propery";

export class PropertiesManager {

    constructor(target: HTMLElement) {
        // @ts-ignore
        const attrs = target.constructor.observedAttributes;

        this.createProperty("content", target.textContent);

        for(let attr of attrs)
            this.createProperty(attr, target.getAttribute(attr));

        // @ts-ignore
        target.attributeChangedCallback = (name: string, oldV: string|null, newV: string|null) => {
            if( oldV === newV )
                return;
            this.properties[name].raw.value = newV;
        }

        new MutationObserver( () => {
            this.properties.content.raw.value = target.textContent;
        }).observe(target, {characterData: true, subtree: true});
    }

    protected createProperty(name: string, value: string|null) {
        const property = this.properties[name] = new Property(value);
        this.changes.add( property.value );
    }

    getValue(name: string) {
        return this.properties[name].value.value;
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