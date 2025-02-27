import {Chart, Points} from "@ChartsHTML";

const graph = new Chart();

graph.append( new Points({
    content: [[0,0], [1,12], [2,0]]
}));

document.body.append(graph);