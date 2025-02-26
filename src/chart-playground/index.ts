import LISS from "@LISS";
import PlaygroundArea, { ASSETS } from "@LISS/components/playground/playground-area/";

const resources = [{
        file : 'index.js',
        lang : 'js',
        title: 'JS API'
    },{
        file : 'index.html',
        lang : 'html',
        title: 'HTML API'
    },
]

class VSHSPlayground extends LISS({extends: PlaygroundArea}) {

    constructor() {
        super(resources);
    }

    static override observedAttributes = [...PlaygroundArea.observedAttributes, "server"];

    override setGrid() {

        this.host.style.setProperty('grid', 'auto / 1fr 1fr');
    }

    override async generateIFrameContent() {

        const codes = this.getAllCodes();

        let c_js   = "";
        let c_html = "";

        if( this.code_lang === "js" )
            c_js = codes["index.js"];
        else
            c_html = codes["index.html"];

    const html =
`<!DOCTYPE html>
    <head>
        <style>
            body {
                width : 100dvw;
                height: 100dvh;
                margin: 0;
                background-color: white;
            }
        </style>
        <script type="module" defer>
            import * as ChartsHTML from '../../index.js';
            const ChartHTML = ChartsHTML.ChartHTML;

            ${c_js}
        </script>
    </head>
    <body>
${c_html}
    </body>
</html>
`;
        return html;

    }
}

LISS.define('chart-playground', VSHSPlayground);