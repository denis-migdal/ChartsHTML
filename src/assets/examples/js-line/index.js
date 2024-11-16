const graph = new ChartHTML();
graph.addComponent(ChartsHTML.Line, {
    content: [[0,0], [1,1], [2,0]]
});
document.body.append(graph.host);