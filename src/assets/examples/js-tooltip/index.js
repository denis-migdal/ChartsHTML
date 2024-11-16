const graph = new ChartHTML();
graph.addComponent(ChartsHTML.Tooltip, {
    direction : "x",
    content: "Data"
});
graph.addComponent(ChartsHTML.Line, {
    name   : "my line",
    tooltip: ({ctx}) => `${ctx.name}: (${ctx.x}, ${ctx.y})`,
    content: [[0,0], [1,1], [2,0]]
});
document.body.append(graph.host);