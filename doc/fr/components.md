# Components

Les composants permettant d'ajouter des datasets et fonctionnalités à votre graphe.

Il existe plusieurs types de composants :

- `Dataset` : un dataset générique.
- [`Scale` : configurer les axes du graphe.](./components.md#scale)
- [`Tooltip` : activer et configurer les bulles informatives.](./components.md#tooltip)
- `Datalabels` : activer et configurer les étiquettes de données.
- [`Zoom` : activer et configurer le zoom/pan.](./components.md#zoom)
- `Value` : configure une valeur partagée.
- `Datasets` : regroupe un ensemble de datasets en un seul composant (généralement utilisé avec Value).

## `Scale`

Le composant `Scale` permet d'ajouter et de configurer les axes de votre graphe.<br/>
💡 Par défaut les axes sont linéaires. Si une liste est fournie en contenu de `Scale`, il sera considéré comme un axe de catégorie.

La position des axes est déterminée par la propriété `position`, elle peut prendre pour valeur `top`, `bottom`, `left`, ou `right`.<br/>
💡 Par défaut, les axes dont le nom commence par `x` ou `y` sont positionnés en bas ou à gauche.

Les axes linéaires peuvent indiquer une valeur minimale et maximale via les priopriétés `min` et ̀`max`.<br/>
💡 Si le `min` et/ou ̀`max` ne sont pas renseignés, leur valeur est calculée à partir des données affichées.

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
graph.addComponent(ChartHTML.Scale, {
    name: "x",
    content: ["A", "B", "C"]
});
graph.addComponent(ChartHTML.Scale, {
    name: "y",
    min: 0,
    max: 10
});
graph.addComponent(ChartHTML.Scale, {
    name: "r",
    position: "right"
});
document.body.append(graph.host);</code></pre>
        </td></tr>
    </tbody>
    <tfoot>
        <tr><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=html-scales">playground</a>
        </td><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=js-scales">playground</a>
        </td></tr>
    </tfoot>
</table>

## `Tooltip`

Le composant `Tooltip` permet d'ajouter et de configurer les bulles informatives au survol des points des courbes.

La propriété `direction` permet d'indiquer la manière dont les points sont sélectionnés :
- `point` (défaut) : les points sous le curseur.
- `x` : les points de même abscisse que le curseur.
- `y` : les points de même ordonnée que le curseur. 

Les bulles informatives sont composées :
- d'un titre défini par le contenu de `Tooltip`
- d'une ligne par points sélectionnés, dont le contenu est défini par la propriété `tooltip` du dataset à laquelle le point appartient.

<table>
    <thead>
        <tr><th>HTML</th><th>JS</th></tr>
    </thead>
    <tbody>
        <tr><td>
            <pre><code lang="html">&lt;chart-html&gt;
    &lt;chart-tooltip direction="x"&gt;Data&lt;/chart-tooltip&gt;
    &lt;curve-line name="my line"
             tooltip="${ctx.name}: (${ctx.x}, ${ctx.y})"&gt;
        [[0,0], [1,1], [2,0]]
    &lt;/curve-line&gt;
&lt;/chart-html&gt;</code></pre>
        </td><td>
<pre><code lang="js">const graph = new ChartHTML();
graph.addComponent(ChartHTML.Tooltip, {
    direction : "x",
    content: "Data"
});
graph.addComponent(ChartHTML.Line, {
    name   : "my line",
    tooltip: ({ctx}) => `${ctx.name}: (${ctx.x}, ${ctx.y})`,
    content: [[0,0], [1,1], [2,0]]
});
document.body.append(graph.host);</code></pre>
        </td></tr>
    </tbody>
    <tfoot>
        <tr><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=html-tooltip">playground</a>
        </td><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=js-tooltip">playground</a>
        </td></tr>
    </tfoot>
</table>

## `Zoom`

Le composant `Zoom` permet d'ajouter et de configurer le zoom et le pan de votre graphe.

Sa propriété `direction` permet d'indiquer la ou les directions dans lesquels on peut zoomer/pan :
- `xy` : zoom/pan autorisé dans les deux directions (par défaut).
- `x` : zoom/pan autorisé seulement sur l'axe des abscisses.
- `y` : zoom/pan autorisé seulement sur l'axe des ordonnées.
- `none` : zoom/pan interdit ;

💡 La limite des zoom/pan est déterminée par les propriétés `min` et `max` des axes.

<table>
    <thead>
        <tr><th>HTML</th><th>JS</th></tr>
    </thead>
    <tbody>
        <tr><td>
            <pre><code lang="html">&lt;chart-html&gt;
    &lt;chart-scale name="x" min="1" max="10"&gt;&lt;/chart-scale&gt;
    &lt;chart-zoom direction="x"&gt;&lt;/chart-zoom&gt;
&lt;/chart-html&gt;</code></pre>
        </td><td>
<pre><code lang="js">const graph = new ChartHTML();
graph.addComponent(ChartHTML.Scale, {
    name: "x",
    min : 0,
    max : 10
});
graph.addComponent(ChartHTML.Zoom, {
    direction: "x"
});
document.body.append(graph.host);</code></pre>
        </td></tr>
    </tbody>
    <tfoot>
        <tr><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=html-zoom">playground</a>
        </td><td>
            <a href="https://denis-migdal.github.io/ChartsHTML/dist/dev/pages/playground/?example=js-zoom">playground</a>
        </td></tr>
    </tfoot>
</table>

🐛 Actuellement, le pan ne fonctionne pas avec l'API JS.
