import {Chart, Bars} from "@ChartsHTML";

const graph = new Chart();

graph.append( new Bars({
    content: [[0,0], [1,12], [2,0]]
}));

document.body.append(graph);