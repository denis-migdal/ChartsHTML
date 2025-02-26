const graph = new ChartHTML();

graph.add(ChartsHTML.Datalabels);
graph.add(ChartsHTML.Line, {
    name   : "my line",
    content: [[0,0], [1,0.5], [2,2]]
});

document.body.append(graph.host);