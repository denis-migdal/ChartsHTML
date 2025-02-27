import * as CH from "@ChartsHTML";

const graph = new CH.Chart();

graph.append(new CH.Scale({
    name: "x", min : 0, max : 10
}));

graph.append(new CH.Zoom({
    direction: "x"
}));

document.body.append(graph);