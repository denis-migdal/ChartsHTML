const graph = new ChartHTML();
graph.addComponent(ChartsHTML.Tooltip, {
    content: "Data"
});
graph.addComponent(ChartsHTML.Dataset, {
    name   : "my line",
    type   : "scatter",
    color  : "red",
    tooltip: ({ctx}) => `${ctx.name}: (${ctx.x}, ${ctx.y})`,
    content: [[0,0], [1,1], [2,0]]
});
document.body.append(graph.host);