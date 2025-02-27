import {Chart, Scale} from "@ChartsHTML";

const graph = new Chart();

graph.append(new Scale({ name: "x",
    content: ["A", "B", "C"]}));

graph.append(new Scale({ name: "y",
    min: 0, max: 10 }));
    
graph.append(new Scale({ name: "r",
    position: "right" }));

document.body.append(graph);