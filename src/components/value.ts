import { PropertiesDescriptor } from "@LISS/src/properties/PropertiesManager";
import GraphComponent from ".";
import LISS from "@LISS/src";
import RAWDATA_PARSER from "@LISS/src/properties/parser/RAWDATA_PARSER";
import STRING_PARSER from "@LISS/src/properties/parser/STRING_PARSER";
import PARSERS from "@LISS/src/properties/parser";

export default class Value extends GraphComponent {

    static override PropertiesDescriptor: PropertiesDescriptor = {
            ...GraphComponent.PropertiesDescriptor,
            "content"    : RAWDATA_PARSER,
            "type"       : {
                default: "string",
                parser : STRING_PARSER
            },
    }

    constructor(args: Record<string, any>) {
        super(args);

        let curParser = this.value.type;

        this.manager.getSignal("type").listen( () => {

            if(this.chart === null)
                return;

            const newParser = this.value.type;

            if( newParser === curParser)
                return;

            this.manager.setParser("content", PARSERS[newParser as keyof typeof PARSERS]);
            curParser = newParser;
        });

        if( curParser !== null) {
            this.manager.setParser("content", PARSERS[curParser as keyof typeof PARSERS]);
        }

        let curName = this.value.name;
        const content = this.manager.getSignal("content");

        this.manager.getSignal("name").listen( () => {

            if(this.chart === null)
                return;

            const newValue = this.value.name;

            if( newValue === curName)
                return;

            if( curName !== null)
                delete this.chart.signals[curName];
            if( newValue !== null)
                this.chart.signals[newValue] = content;

            curName = newValue;
        });
    }

    override onAttach() {
        this.chart!.signals[this.value.name] = this.manager.getSignal("content");
    }

    override onDetach() {
        delete this.chart!.signals[this.value.name];
    }
}
LISS.define('chart-value', Value);