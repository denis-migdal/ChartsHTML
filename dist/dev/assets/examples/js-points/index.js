const graph = new ChartHTML();
graph.addComponent(ChartHTML.Points, {
    content: [[0,0], [1,1], [2,0]]
});
document.body.append(graph.host);