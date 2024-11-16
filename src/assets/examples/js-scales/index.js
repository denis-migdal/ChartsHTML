const graph = new ChartHTML();
graph.addComponent(ChartsHTML.Scale, {
    name: "x",
    content: ["A", "B", "C"]
});
graph.addComponent(ChartsHTML.Scale, {
    name: "y",
    min: 0,
    max: 10
});
graph.addComponent(ChartsHTML.Scale, {
    name: "r",
    position: "right"
});
document.body.append(graph.host);