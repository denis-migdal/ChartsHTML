import * as CH from "@ChartsHTML";

const graph = new CH.Chart();
graph.append(new CH.Datalabels());

graph.append(new CH.Line({
    name   : "my line",
    content: [[0,0], [1,0.5], [2,2]]
}));

document.body.append(graph);