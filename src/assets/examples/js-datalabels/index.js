const graph = new ChartHTML();
graph.addComponent(ChartHTML.Tooltip, {
    content: ""
});
graph.addComponent(ChartHTML.Datalabels, {
    content: ""
});
graph.addComponent(ChartHTML.Line, {
    name   : "my line",
    content: [[0,0], [1,1], [2,0]]
});
document.body.append(graph.host);