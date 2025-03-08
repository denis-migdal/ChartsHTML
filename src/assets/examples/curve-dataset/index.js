import {Chart, Dataset} from "@ChartsHTML";

const graph = new Chart();

graph.append( new Dataset({
    type   : "bubble",
    content: [[0,0, 10], [1,1,20], [2,0]]
}));

document.body.append(graph);