import {Chart, Line} from "@ChartsHTML";

const graph = new Chart();

graph.append( new Line({
    content: [[0,0], [1,12], [2,0]]
}));

document.body.append(graph);