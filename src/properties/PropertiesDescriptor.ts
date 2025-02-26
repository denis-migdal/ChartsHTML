import LISS from "@LISS";
import { PropertiesManager } from "./PropertiesManager";
import { ChartHTML } from "@ChartsHTML/";
import LazyComputedSignal from "@LISS/src/signals/LazyComputedSignal";
import ROSignal           from "@LISS/src/signals/ROSignal";

function generateSignal<T>(value: string): ROSignal<T> {

    const signals = new SignalManager();

    function addSignal(_: unknown, name: string) {

        signals.init(name);
        return "signals.get('"+ name +"').value";
    }

    value = value.replaceAll(/%\{([\w_]+)\}/g, addSignal);
    value = value.replaceAll(/%([\w_]+)/g    , addSignal);

    // TODO: () => ...

    const fct = new Function("signals", `return ${value};`);

    return new LazyComputedSignal(signals, () => fct(signals) );
}

//TODO: values/signals
export const PROPERTY_BOOLEAN = (value: string) => {

    if( value === "true" )
        return true;
    if( value === "false")
        return false;

    return generateSignal<boolean>(value);
}
export const PROPERTY_INT     = (value: string) => {

    if( value.includes('%') )
        return generateSignal<number>(value);

    return parseInt(value)
};

export const PROPERTY_NUMBER  = (value: string) => {

    if( value.includes('%') )
        return generateSignal<number>(value);

    return parseFloat(value)
};
export const PROPERTY_STRING  = (value: string) => {

    if( value.includes('%') )
        return generateSignal<string>(value);

    return value;
};
export const PROPERTY_COLOR   = PROPERTY_STRING;
export const PROPERTY_RAWDATA = (value: string) => {

    if( value.includes('%') )
        return generateSignal<any>(value);

    return new Function(`return ${value};`)();
};

//TODO: build function from function or template
export const PROPERTY_FSTRING = (value: string, g: ChartHTML) => {

    //TODO...
    
    value = value.replaceAll(/@\{([\w_]+)\}/g, (_, word) => "${ctx." + word + "}");
    value = value.replaceAll(/@([\w_]+)/g, (_, word) => `ctx.${word}`);

    return new Function("ctx", "return `" + value + "`;");
};

// this.constructor type:
// https://github.com/microsoft/TypeScript/issues/32452

// property

export type PropertyFullDescriptor<T> = {
    type    : ((v: string) => T),
    default?: T,
} | {
    value   : T
};

export type PropertyDescriptor<T> = 
   PropertyFullDescriptor<T>
 | ((v: string) => T)
 | T
 | {
    default : T
};

// tools
export type PropertyType<T> = T extends PropertyDescriptor<infer U>
                        ? U
                        : never;

export type Converter<T extends string> = T extends `${infer pre}-${infer post}`
            ? `${pre}${Capitalize<post>}`
            : T;

export type Properties<T extends PropertiesDescriptor> = {
    [K in keyof T as K extends string ? Converter<K> : never]: PropertyType<T[K]>
}

export function convertAttr2Prop<T extends string>(attr_name: T): Converter<T> {

	let result: string = attr_name;

	let pos = -1;
	while( (pos = result.indexOf('-')) !== -1 ) {
		result = result.slice(0, pos) + result[pos+1].toUpperCase() + result.slice(pos+2);
	}

	return result as any;
}

//TODO: better type deductions...
export function mergeDescriptors<U extends PropertiesDescriptor, V extends PropertiesDescriptor>(src: U, add: V)
	: U & V
{
	let result = {...src};

	for(let key in add) {
		if( key in src )
			result[key] = {... result[key]};
		else
			result[key] = {} as any;

		const added = add[key];

		if( typeof added === "object" && ("type" in added || "value" in added || "default" in added) )
			Object.assign(result[key], added);
		else if( typeof added === "function" )
			result[key].type = added;
		else
			result[key].value = added;
	}

	return result as any;
}

// properties

export type PropertiesDescriptor = Record<string, PropertyDescriptor<any>>;
export type PropertiesFullDescriptor = Record<string, PropertyFullDescriptor<any>>;

// mixin

type Cstr<T> = {
    new(...args: any[]) : T,
    observedAttributes  : string[],
    propertiesDescriptor: PropertiesDescriptor,
    PropertiesBuilder   : any
}

export function inherit<T extends Cstr<any>, U extends PropertiesDescriptor>(
                base                : T,
                addPropertiesDescriptor: U = {} as U)
    : T & Cstr<{
        readonly properties: Properties<U>
    }> & { propertiesDescriptor: U }
{
    const propertiesDescriptor = mergeDescriptors(base.propertiesDescriptor, addPropertiesDescriptor);

    const properties_names = [...base.observedAttributes, ...Object.keys(addPropertiesDescriptor) ];

    // build properties
    class Properties {
        private _propertiesManager: PropertiesManager;
        constructor(propertiesManager: PropertiesManager) {
            this._propertiesManager = propertiesManager;
        }
    }
    const props: Record<string, PropertiesDescriptor> = {};
    for(let name of ["content", ...properties_names]) {

        const key = convertAttr2Prop(name);

        props[key] = {
            enumerable: true,
            get: function (this: Properties) {
                // @ts-ignore
                return this._propertiesManager.getValue(name);
            },
            set: function (this: Properties, value: any) {
                // @ts-ignore
                this._propertiesManager.setValue(name, value)
            }
        }
    }
    Object.defineProperties(Properties.prototype, props);

    // build base class
    return class X extends LISS({extends: base}) {
        //TODO: remove fixed
        static override observedAttributes = properties_names;

        // for propManager
        static override propertiesDescriptor = propertiesDescriptor;
        // for properties
        static override readonly PropertiesBuilder = Properties;
    }
}