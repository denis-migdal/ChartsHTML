import * as CH from "@ChartsHTML";

const graph = new CH.Chart();
graph.append(new CH.Datalabels());

graph.append(new CH.Line({
    name   : "line A",
    content: [[0,0], [1,0.5], [2,2]],
    datalabels: (id, ctx) =>
        `${ctx.name}`,
}));

graph.append(new CH.Line({
    name   : "line B",
    color  : "red",
    content: [[0,1.5], [1,2], [2,0]],
    datalabels: (id, ctx) => [
        `${ctx.name}`,
        `${ctx.x}:${ctx.y}`
    ][id%2],
}));

document.body.append(graph);