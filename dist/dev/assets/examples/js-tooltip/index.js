const graph = new ChartHTML();
graph.addComponent(ChartHTML.Tooltip, {
    direction : "x",
    content: "Data"
});
graph.addComponent(ChartHTML.Line, {
    name   : "my line",
    tooltip: ({ctx}) => `${ctx.name}: (${ctx.x}, ${ctx.y})`,
    content: [[0,0], [1,1], [2,0]]
});
document.body.append(graph.host);