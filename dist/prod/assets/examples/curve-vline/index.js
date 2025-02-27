import {Chart, VLine} from "@ChartsHTML";

const graph = new Chart();

graph.append( new VLine({
    content: 0.5
}));

document.body.append(graph);