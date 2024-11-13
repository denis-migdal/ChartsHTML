const graph = new ChartHTML();
graph.addComponent(ChartHTML.Scale, {
    name: "x",
    min : 0,
    max : 10
});
graph.addComponent(ChartHTML.Zoom, {
    direction: "x"
});
document.body.append(graph.host);