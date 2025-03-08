import * as CH from "@ChartsHTML";

const graph = new CH.Chart({
    line: [[0,0], [1,1], [2,0]]
});

graph.append(new CH.Line({
    color  : "green",
    content: CH.CALLBACK( ({line}) =>
        line.value
    ) }));

graph.append(new CH.Line({
    color  : "red",
    content: CH.CALLBACK( ({line}) =>
        line.value?.map(([x,y]) => [x,1-y])
    ) }));

document.body.append(graph);