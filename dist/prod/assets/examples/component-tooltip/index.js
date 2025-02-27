import * as CH from "@ChartsHTML";

const graph = new CH.Chart();

graph.append(new CH.Tooltip({
    direction : "x",
    content: () => "Data"
}));

graph.append(new CH.Line({
    name   : "line",
    tooltip: (ctx) => `${ctx.name}: (${ctx.x}, ${ctx.y})`,
    content: [[0,0], [1,1], [2,0]]
}));

document.body.append(graph);