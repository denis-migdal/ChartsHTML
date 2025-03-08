import * as CH from "@ChartsHTML";

const graph = new CH.Chart();

graph.append( new CH.Scale({
    name : "x", min : 0, max : 10,
}));

graph.append( new CH.Histogram({
    content: [0,0,2,3,3,6,7,8,8]
}));

document.body.append(graph);