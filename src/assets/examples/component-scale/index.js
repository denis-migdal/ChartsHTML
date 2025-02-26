const graph = new ChartHTML();

graph.add(ChartsHTML.Scale, {
    name: "x",
    content: ["A", "B", "C"]
});
graph.add(ChartsHTML.Scale, {
    name: "y",
    min: 0,
    max: 10
});
graph.add(ChartsHTML.Scale, {
    name: "r",
    position: "right"
});

document.body.append(graph.host);