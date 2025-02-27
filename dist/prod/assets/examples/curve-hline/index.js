import {Chart, HLine} from "@ChartsHTML";

const graph = new Chart();

graph.append( new HLine({
    content: 0.5
}));

document.body.append(graph);