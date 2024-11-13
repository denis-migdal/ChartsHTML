const graph = new ChartHTML({
    data: [[0,0], [1,1], [2,0]]
});
graph.addComponent(ChartHTML.Line, {
    color  : "green",
    content: ({values: {data}}) => data
});
graph.addComponent(ChartHTML.Line, {
    color  : "red",
    content: ({values: {data}}) => data?.map(e => [e[0], 1-e[1]])
});
document.body.append(graph.host);