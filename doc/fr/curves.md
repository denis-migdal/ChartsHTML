# Courbes

## Points

Est un ensemble de points à afficher sur le graphe.


<table>
    <thead>
        <tr><th>HTML</th><th>JS</th></tr>
    </thead>
    <tbody>
        <tr><td>
            <pre><code lang="html">&lt;chart-html&gt;
    &lt;curve-points&gt;
        [[0,0], [1,1], [2,0]]
    &lt;/curve-points&gt;
&lt;/chart-html&gt;</code></pre>
        </td><td>
<pre><code lang="js">const graph = new ChartHTML();
graph.addComponent(ChartHTML.Points, {
    content: [[0,0], [1,1], [2,0]]
});
document.body.append(graph.host);</code></pre>
        </td></tr>
    </tbody>
    <tfoot>
        <tr><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=html-points">playground</a>
        </td><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=js-points">playground</a>
        </td></tr>
    </tfoot>
</table>

Hérite de [Dataset](./components.md#dataset).

## Line

Hérite de [Dataset](./components.md#dataset).

show-points', 'decimate

### VLine/HLine

Hérite de [Line](./curves.md#line).

### Timelapse

Hérite de [Line](./curves.md#line).

## Bars

Hérite de [Dataset](./components.md#dataset).

+ reversed

## Histogram

Hérite de [Bars](./curves.md#bars).

+ précision
