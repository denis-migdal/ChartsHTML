const graph = new ChartHTML();
graph.addComponent(ChartHTML.Scale, {
    name: "x",
    content: ["A", "B", "C"]
});
graph.addComponent(ChartHTML.Scale, {
    name: "y",
    min: 0,
    max: 10
});
graph.addComponent(ChartHTML.Scale, {
    name: "r",
    position: "right"
});
document.body.append(graph.host);