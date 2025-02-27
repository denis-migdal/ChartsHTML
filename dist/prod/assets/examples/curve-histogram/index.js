import {Chart, Histogram} from "@ChartsHTML";

const graph = new Chart();

graph.append( new Histogram({
    content: [0,0,0,1,1,2,2,2,2]
}));

document.body.append(graph);