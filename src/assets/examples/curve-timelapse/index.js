import {Chart, Timelapse} from "@ChartsHTML";

const graph = new Chart();

graph.append( new Timelapse({
    content: [["A",0,1],
              ["B",1,2],
              ["C",2,3]]
}));

document.body.append(graph);