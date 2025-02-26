const graph = new ChartHTML();

graph.add(ChartsHTML.Tooltip, {
    direction : "x",
    content: () => "Data"
});

graph.add(ChartsHTML.Line, {
    name   : "line",
    tooltip: (ctx) => `${ctx.name}: (${ctx.x}, ${ctx.y})`,
    content: [[0,0], [1,1], [2,0]]
});

document.body.append(graph.host);