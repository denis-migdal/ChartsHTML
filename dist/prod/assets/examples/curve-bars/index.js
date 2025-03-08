import * as CH from "@ChartsHTML";

const graph = new CH.Chart();

graph.append( new CH.Scale({
    name   : "x",
    content: ["A", "B", "C"]
}));

graph.append( new CH.Bars({
    content: [[0,1], [1,2], [2,0]]
}));

document.body.append(graph);