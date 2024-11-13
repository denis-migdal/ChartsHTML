# Components

Les composants permettant d'ajouter des datasets et fonctionnalités à votre graphe.

Il existe plusieurs types de composants :

- `Dataset` : un dataset générique.
- `Scale` : configurer les axes du graphe.
- `Tooltip` : activer et configurer les bulles informatives.
- `Datalabels` : activer et configurer les étiquettes de données.
- `Zoom` : activer et configurer le zoom/pan.
- `Value` : configure une valeur partagée.
- `Datasets` : regroupe un ensemble de datasets en un seul composant (généralement utilisé avec Value).

## `Scale`

Le composant `Scale` permet d'ajouter et de configurer les axes de votre graphe.

La position des axes est déterminée par la propriété `position`, elle peut prendre pour valeur `top`, `bottom`, `left`, `right`.<br/>
💡 Par défaut, les axes dont le nom commence par `x` ou `y` sont positionnés en bas ou à gauche.

Par défaut les axes sont linéaires. Si une liste est fournie en contenu de `Scale`, il sera considéré comme un axe de catégorie.

Les axes linéaires peuvent indiquer une valeur minimale et maximale via les priopriétés `min` et ̀`max`.<br/>
💡 Si le `min` et/ou ̀`max` ne sont pas indiqués, leur valeur est calculée à partir des données affichées.

⚠ Les axes doivent être nommés via la propriété `name`.

<table>
    <thead>
        <tr><th>HTML</th><th>JS</th></tr>
    </thead>
    <tbody>
        <tr><td>
            <pre><code lang="html">&lt;chart-html&gt;
    &lt;chart-scale name="x"&gt;["A", "B", "C"]&lt;/chart-scale&gt;
    &lt;chart-scale name="y" min="0" max="10" &gt;&lt;/chart-scale&gt;
    &lt;chart-scale name="r" position="right"&gt;&lt;/chart-scale&gt;
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