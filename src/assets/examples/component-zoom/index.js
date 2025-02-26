const graph = new ChartHTML();
graph.add(ChartsHTML.Scale, {
    name: "x",
    min : 0,
    max : 10
});
graph.add(ChartsHTML.Zoom, {
    direction: "x"
});
document.body.append(graph.host);