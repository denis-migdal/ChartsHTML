import LISS from "@LISS/src";
import PlaygroundArea, { Resource } from "@LISS/components/playground/playground-area/";

class VSHSPlayground extends PlaygroundArea {

    static override observedAttributes = [...PlaygroundArea.observedAttributes, "server"];

    override generateIFrameContent() {

        let c_js   = "";
        let c_html = "";

        if( this.codeLang === "js" )
            c_js = this.codes["index.js"].getCode();
        else
            c_html = this.codes["index.html"].getCode();

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
            :not(:defined) {
                visibility: hidden;
            }
        </style>
        <script type="importmap">
            {
                "imports": {
                    "@ChartsHTML": "/libs/ChartsHTML/index.js"
                }
            }
        </script>
        <script type="module" src="/libs/ChartsHTML/index.js"></script>
        <script type="module">
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

    protected static override ASSETS_DIR = "/assets/examples/";

    protected static override RESSOURCES = [
        { file : 'index.js'  , title: 'JS API'  },
        { file : 'index.html', title: 'HTML API'},
    ]
}

LISS.define('chart-playground', VSHSPlayground);