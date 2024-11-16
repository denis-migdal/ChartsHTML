const graph = new ChartHTML();

graph.addComponent(ChartsHTML.Tooltip, {
    content: ""
});
graph.addComponent(ChartsHTML.Datalabels, {
    content: ""
});
graph.addComponent(ChartsHTML.Line, {
    name   : "my line",
    content: [[0,0], [1,1], [2,0]]
});

console.warn('before append');
document.body.append(graph.host);