const graph = new ChartHTML();
graph.addComponent(ChartsHTML.Scale, {
    name: "x",
    min : 0,
    max : 10
});
graph.addComponent(ChartsHTML.Zoom, {
    direction: "x"
});
document.body.append(graph.host);