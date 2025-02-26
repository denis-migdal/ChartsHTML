import LazyComputedSignal from "@LISS/src/signals/LazyComputedSignal";
import Signal from "@LISS/src/signals/Signal";
import { PropertyFullDescriptor } from "./PropertiesDescriptor";
import { PropertiesManager } from "./PropertiesManager";

// raw : string (from attr or content)
// value  : T

export type PropertyType<T = any> = (v: string) => T;

const  STRING_PROPERTY = (value: string) => value;

export class Property<T = any> {

    #manager: PropertiesManager;

    // what if default value is function ?
    constructor(manager: PropertiesManager, value: string|null, descriptor: PropertyFullDescriptor<T>|null = null) {

        this.#manager = manager;

        descriptor ??= {type: STRING_PROPERTY as PropertyType<T>};

        if( "default" in descriptor)
            this.setDefaultValue(descriptor.default);
        if( "value"   in descriptor) // TODO: fixed value...
            this.setDefaultValue(descriptor.value);

        this.raw    = new Signal<string>(value);

        this.raw.listen( () => {
            let value = this.raw.value;

            if( value === null) {
                this.#internal_value.value = null;
                return;
            }

            value = value.trim();

            const result = (descriptor as any).type( value );
            if( result instanceof LazyComputedSignal) {
                this.value.source = result;

                const gsignal = this.#manager.target.graphSignal;
                const manager = result.source as SignalManager;

                const updateSignals = () => {
                    const g = gsignal.value;
                    if( g !== null)
                        for(let name of manager.names())
                            manager.set(name, g.signals.get(name) );
                    else
                        for(let name of manager.names())
                            manager.clear(name);
                }
                gsignal.listen( updateSignals )
                updateSignals();
            } else
                this.#internal_value.value = result;
        });

        this.#internal_value.listen( () => {
            this.value.source = this.#internal_value;
        });

        this.value  = new LazyComputedSignal(this.#internal_value, (signal) => {
            return signal.value ?? this.#defaultValue;
        });

        this.raw.trigger();
    }

    #defaultValue: T|null = null;
    setDefaultValue(value: T|null) {
        this.#defaultValue = value;
    }

    setValue(value: T|null) {
        this.#internal_value.value = value;
    }

    readonly #internal_value = new Signal<T>();

    readonly raw;
    readonly value;
}