import { LazyComputedSignal, Signal } from "LISS/src/x";

export class Property<T = unknown> {

    constructor(value: string|null) {
        this.raw    = new Signal<string>(value);

        // converts string into data or () => data
        this.parsed = new LazyComputedSignal(this.raw   , (signal) => {
            const value = signal.value;
            if( value === null)
                return null;

            return parseString(value.trim());
        });

        // TODO: processings
        this.value  = new LazyComputedSignal(this.parsed, (signal) => {

            let value = signal.value as any;
            if( typeof value === "function" )
                value = value({}); //TODO args

            value = this.#preproc(value);

            return value ?? this.#defaultValue;
        });
    }

    #preproc = (a: any) => a;
    addPreproc(preproc: (value: any, previous: (value: any) => T ) => T) {
        const previous = this.#preproc;
        this.#preproc = (a: any) => preproc(a, previous);
    }

    #defaultValue: T|null = null;
    setDefaultValue(value: T|null) {
        this.#defaultValue = value;
    }

    readonly raw;
    readonly parsed;
    readonly value;
}



function parseString<T = unknown>(str: string) {

    let prefix = str.slice(0, str.indexOf(':') );
    if( ! ["js", "str", "template", "raw_js", "json"].includes(prefix) )
        prefix = "";
    else {
        str = str.slice(prefix.length+1);
    }

    // deduce string type...
    if(prefix === "") {
        if(str.startsWith('({') ) {
            prefix = "js";
        } else if(str[0] === '(' || str[0] === '[' || str[0] === '{' || str.startsWith("values") || str.startsWith("ctx") ) {
            // can't use JSON.
            console.warn("JS");
            prefix = "raw_js";
        } else if( str.includes('${') ) {
            prefix = "template"
        } else {
            prefix = "str"
        }
    }

    if( prefix === "json" )
        return JSON.parse(str) as T;

    if( prefix === "str" )
        return str as T;

    if( prefix === "template" )
        str = '`' + str + '`';

    if( prefix === "js" )
        str = "(" + str + ")({values,ctx})";

    return new Function('{values,ctx}', `return ${str}`) as (arg:Record<string, any>) => T|null;
}