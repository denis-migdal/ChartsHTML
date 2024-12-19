
export class StringEval<T> {

	constructor(component: any) {
		this.#component = component;
	}

	#component: any;

	#string: string|null = null;
	#fct: ((args:any) => T)|null = null;
	#result: T|undefined = undefined;

	setString(str: string|null|Function) {

		if( str instanceof Function ) {
			this.#result    = undefined;
			this.#fct       = str as any;
			this.#string    = null;

			return;
		}

		if(str !== null) {
			str = str.trim();
			if(str.length === 0)
				str = null;
		}

		if(str === this.#string)
			return;

		this.#result    = undefined;
		this.#fct       = null;
		this.#string    = str;
	}
	eval(context: Record<string, any> = {}) {

		if( this.#fct === null ) {

			let str = this.#string;

			if( str === null)
				return null;

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
					prefix = "raw_js";
				} else if( str.includes('${') ) {
					prefix = "template"
				} else {
					prefix = "str"
				}
			}

			if( prefix === "json" )
				return this.#result = JSON.parse(str);

			if( prefix === "str" )
				return this.#result = str as T;

			if( prefix === "template" )
				str = '`' + str + '`';

			if( prefix === "js" )
				str = "(" + str + ")({values,ctx})";

			this.#fct = new Function('{values,ctx}', `return ${str}`) as any;
		}

		return this.#result = this.#fct!( this.#component.chart?.evalContext?.(context) ?? {} );
	}
	value() {
		if(this.#result === undefined)
			return this.eval({});
		return this.#result;
	}
}