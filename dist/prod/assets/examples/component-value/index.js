import * as CH from "@ChartsHTML";

const graph = new CH.Chart();

graph.append(new CH.Value({
    name   : "line",
    content: [[0,0], [1,1], [2,0]]
}));
graph.append(new CH.Line({
    content: [[0,0], [1,1], [2,0]]
}));

document.body.append(graph);