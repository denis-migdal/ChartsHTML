# ChartsHTML

## Qu'est-ce que ChartsHTML ?

ChartsHTML est une surcouche de Chart.js. ChartsHTML permet de construire des graphes via des **compositions**. Il permet ainsi de :
- **factoriser** les éléments de configuration des graphes Chart.js ;
- favoriser l'extensibilité et réutilisabilité des composants ;
- améliorer la lisibilité du code ;
- faciliter la création de graphes.

Les graphes ChartsHTML peuvent être créés en HTML, ou en JS/TS.<br/>
En interne, ChartsHTML utilise des composants Web (basés sur LISS) permettant ainsi, via les outils de développement du navigateur, de facilement consulter et modifier à la volée la configuration des graphes.

ChartsHTML intègre aussi plusieurs plugins Chart.js :
- Zoom (<mark>TBI ?</mark>)
- Datalabel
- C2S (<mark>TBI</mark>)

Et fournit de nouvelles fonctionnalités :
- synchronisation de sources de données (<mark>TBI ?</mark>).
- export de données (csv, json, ?) (<mark>TBI</mark>).
- export de graphes (png, svg, HTML, ?) (<mark>TBI</mark>).

💡 Vous pouvez consulter les différents exemples dans le [https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/](playground).

## Votre premier graphe ChartsHTML

Tout d'abord, construisons un nouveau graphe vide :
<table>
    <thead>
        <tr><th>HTML</th><th>JS</th></tr>
    </thead>
    <tbody>
        <tr><td>
            <pre><code lang="html">&lt;chart-html&gt;&lt;/chart-html&gt;</code></pre>
        </td><td>
<pre><code lang="js">const graph = new ChartHTML();
document.body.append(graph.host);
</code></pre>
        </td></tr>
    </tbody>
    <tfoot>
        <tr><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=html-empty">playground</a>
        </td><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=js-empty">playground</a>
        </td></tr>
    </tfoot>
</table>

Nous pouvons ensuite ajouter notre premier composant au graphe, e.g. une ligne :
<table>
    <thead>
        <tr><th>HTML</th><th>JS</th></tr>
    </thead>
    <tbody>
        <tr><td>
            <pre><code lang="html">&lt;chart-html&gt;
    &lt;curve-line&gt;
        [[0,0], [1,1], [2,0]]
    &lt;/curve-line&gt;
&lt;/chart-html&gt;</code></pre>
        </td><td>
<pre><code lang="js">const graph = new ChartHTML();
graph.addComponent(ChartHTML.Line, {
    content: [[0,0], [1,1], [2,0]]
});
document.body.append(graph.host);
</code></pre>
        </td></tr>
    </tbody>
    <tfoot>
        <tr><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=html-line">playground</a>
        </td><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=js-line">playground</a>
        </td></tr>
    </tfoot>
</table>

Nous pouvons alors configurer cet élément, e.g. sa couleur et son tooltip :
<table>
    <thead>
        <tr><th>HTML</th><th>JS</th></tr>
    </thead>
    <tbody>
        <tr><td>
            <pre><code lang="html">&lt;chart-html&gt;
    &lt;chart-tooltip&gt;str:Data&lt;/chart-tooltip&gt;
    &lt;curve-line name="my line" color="red"
             tooltip="js:({ctx}) => `${ctx.name}: (${ctx.x}, ${ctx.y})`"&gt;
        [[0,0], [1,1], [2,0]]
    &lt;/curve-line&gt;
&lt;/chart-html&gt;</code></pre>
        </td><td>
<pre><code lang="js">const graph = new ChartHTML();
graph.addComponent(ChartHTML.Tooltip, {
    content: "Data"
});
graph.addComponent(ChartHTML.Line, {
    name   : "my line",
    color  : "red",
    tooltip: ({ctx}) => `${ctx.name}: (${ctx.x}, ${ctx.y})`,
    content: [[0,0], [1,1], [2,0]]
});
document.body.append(graph.host);
</code></pre>
        </td></tr>
    </tbody>
    <tfoot>
        <tr><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=html-line-color-tooltip">playground</a>
        </td><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=js-line-color-tooltip">playground</a>
        </td></tr>
    </tfoot>
</table>


-> types de datasets + leurs attributs
    -> tooltip => ChartHTML.
-> les autres composants

-> plus de JS API.