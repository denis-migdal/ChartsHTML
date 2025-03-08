<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf8"/>
        <title>ChartsHTML</title>
        <meta name="color-scheme" content="dark light">
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link   href="/skeleton/index.css"  rel="stylesheet">
        <script  src="/skeleton/index.js"  type="module"     blocking="render" async></script>
    </head>
    <body code-langs="html,js">
        <main>

# Les types de courbes

ChartsHTML offre différents types de courbes, dont vous trouverez une liste ci-dessous.\
Pour chaque type de courbes, la liste des attributs qu'elle accepte est donnée.

<h2 id="points" short="Points"><script type="c-js">Points</script>/<script type="c-html"><curve-points></script> : un ensemble de points</h2>

<chart-playground name="curve-points" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=curve-points"><i>Tester l'exemple dans le bac à sable</i></a></div>

<center><strong>Attributs acceptés :</strong></center>

<table>
    <thead>
        <tr><th>Nom (HTML)</th><th>Nom (JS)</th><th>Type</th><th>Valeur par défaut</th><th>Hérité de</th></tr>
    </thead>
    <tbody>
        <tr>
            <td></td><td><script type="c-text">content</script></td><td><script type="c-js">[number, number][]</script></td><td><script type="c-js">[]</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">name</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">GraphComponent</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">type</script></td><td><script type="c-js">"scatter"</script></td><td></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">color</script></td><td><script type="c-js">string</script></td><td><script type="c-js">"black"</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">tooltip</script></td><td><script type="c-js">f-string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">datalabels</script></td><td><script type="c-js">f-string[]</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr>
    </tbody>
</table>

<h2 id="line" short="Line"><script type="c-js">Line</script>/<script type="c-html"><curve-line></script> : une ligne</h2>

<chart-playground name="curve-line" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=curve-line"><i>Tester l'exemple dans le bac à sable</i></a></div>

<center><strong>Attributs acceptés :</strong></center>

<table>
    <thead>
        <tr><th>Nom (HTML)</th><th>Nom (JS)</th><th>Type</th><th>Valeur par défaut</th><th>Hérité de</th></tr>
    </thead>
    <tbody>
        <tr>
            <td></td><td><script type="c-text">content</script></td><td><script type="c-js">[number, number][]</script></td><td><script type="c-js">[]</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">name</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">GraphComponent</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">type</script></td><td><script type="c-js">"scatter"</script></td><td></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">color</script></td><td><script type="c-js">string</script></td><td><script type="c-js">"black"</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td><script type="c-text">show-points</script></td><td><script type="c-text">showPoints</script></td><td><script type="c-js">boolean</script></td><td><script type="c-js">false</script></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">tooltip</script></td><td><script type="c-js">f-string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">datalabels</script></td><td><script type="c-js">f-string[]</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr>
    </tbody>
</table>

<h3 id="vline" short="VLine"><script type="c-js">VLine</script>/<script type="c-html"><curve-vline></script> : ligne verticale</h3>

<chart-playground name="curve-vline" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=curve-vline"><i>Tester l'exemple dans le bac à sable</i></a></div>

<center><strong>Attributs acceptés :</strong></center>

<table>
    <thead>
        <tr><th>Nom (HTML)</th><th>Nom (JS)</th><th>Type</th><th>Valeur par défaut</th><th>Hérité de</th></tr>
    </thead>
    <tbody>
        <tr>
            <td></td><td><script type="c-text">content</script></td><td><script type="c-js">number</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">name</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">GraphComponent</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">type</script></td><td><script type="c-js">"scatter"</script></td><td></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">color</script></td><td><script type="c-js">string</script></td><td><script type="c-js">"black"</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td><script type="c-text">show-points</script></td><td><script type="c-text">showPoints</script></td><td><script type="c-js">false</script></td><td></td><td><script type="c-js">Line</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">tooltip</script></td><td><script type="c-js">f-string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">datalabels</script></td><td><script type="c-js">f-string[]</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr>
    </tbody>
</table>

<h3 id="hline" short="HLine"><script type="c-js">HLine</script>/<script type="c-html"><curve-hline></script> : ligne horizontale</h3>

<chart-playground name="curve-hline" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=curve-hline"><i>Tester l'exemple dans le bac à sable</i></a></div>

<center><strong>Attributs acceptés :</strong></center>

<table>
    <thead>
        <tr><th>Nom (HTML)</th><th>Nom (JS)</th><th>Type</th><th>Valeur par défaut</th><th>Hérité de</th></tr>
    </thead>
    <tbody>
        <tr>
            <td></td><td><script type="c-text">content</script></td><td><script type="c-js">number</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">name</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">GraphComponent</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">type</script></td><td><script type="c-js">"scatter"</script></td><td></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">color</script></td><td><script type="c-js">string</script></td><td><script type="c-js">"black"</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td><script type="c-text">show-points</script></td><td><script type="c-text">showPoints</script></td><td><script type="c-js">false</script></td><td></td><td><script type="c-js">Line</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">tooltip</script></td><td><script type="c-js">f-string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">datalabels</script></td><td><script type="c-js">f-string[]</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr>
    </tbody>
</table>

<h2 id="bars" short="Bars"><script type="c-js">Bars</script>/<script type="c-html"><curve-bars></script> : barres</h2>

<chart-playground name="curve-bars" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=curve-bars"><i>Tester l'exemple dans le bac à sable</i></a></div>

⚠ Afin que la courbe en barres s'affiche correctement, l'axe "x" doit être explicitement défini pour le graphe.

<center><strong>Attributs acceptés :</strong></center>

<table>
    <thead>
        <tr><th>Nom (HTML)</th><th>Nom (JS)</th><th>Type</th><th>Valeur par défaut</th><th>Hérité de</th></tr>
    </thead>
    <tbody>
        <tr>
            <td></td><td><script type="c-text">content</script></td><td><script type="c-js">number</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">name</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">GraphComponent</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">type</script></td><td><script type="c-js">"bar"</script></td><td></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">color</script></td><td><script type="c-js">string</script></td><td><script type="c-js">"black"</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">reversed</script></td><td><script type="c-js">boolean</script></td><td><script type="c-js">false</script></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">tooltip</script></td><td><script type="c-js">f-string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">datalabels</script></td><td><script type="c-js">f-string[]</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr>
    </tbody>
</table>

<h3 id="histogram" short="Histogram"><script type="c-js">Histogram</script>/<script type="c-html"><curve-bars></script> : Histogramme</h3>

<chart-playground name="curve-histogram" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=curve-histogram"><i>Tester l'exemple dans le bac à sable</i></a></div>

⚠ Afin que l'histogramme s'affiche correctement, l'axe "x" doit être explicitement défini pour le graphe.

<center><strong>Attributs acceptés :</strong></center>

<table>
    <thead>
        <tr><th>Nom (HTML)</th><th>Nom (JS)</th><th>Type</th><th>Valeur par défaut</th><th>Hérité de</th></tr>
    </thead>
    <tbody>
        <tr>
            <td></td><td><script type="c-text">content</script></td><td><script type="c-js">number</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">name</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">GraphComponent</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">type</script></td><td><script type="c-js">"bar"</script></td><td></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">color</script></td><td><script type="c-js">string</script></td><td><script type="c-js">"black"</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">reversed</script></td><td><script type="c-js">boolean</script></td><td><script type="c-js">false</script></td><td><script type="c-js">Bars</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">precision</script></td><td><script type="c-js">number</script></td><td><script type="c-js">10</script></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">tooltip</script></td><td><script type="c-js">f-string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">datalabels</script></td><td><script type="c-js">f-string[]</script></td><td><script type="c-js">null</script></td><td><script type="c-js">Dataset</script></td>
        </tr>
    </tbody>
</table>


## Timelapse [TODO]

<h2 id="dataset" short="Dataset"><script type="c-js">Dataset</script>/<script type="c-html"><chart-dataset></script> : Autres types de courbes</h2>

<chart-playground name="curve-dataset" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=curve-dataset"><i>Tester l'exemple dans le bac à sable</i></a></div>

💡 Cf [la documentation de Chart.js](https://www.chartjs.org/docs/latest/charts/mixed.html) pour les différents types de graphes possibles.

<center><strong>Attributs acceptés :</strong></center>

<table>
    <thead>
        <tr><th>Nom (HTML)</th><th>Nom (JS)</th><th>Type</th><th>Valeur par défaut</th><th>Hérité de</th></tr>
    </thead>
    <tbody>
        <tr>
            <td></td><td><script type="c-text">content</script></td><td><script type="c-js">any</script></td><td><script type="c-js">null</script></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">name</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">GraphComponent</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">type</script></td><td><script type="c-js">string</script></td><td></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">color</script></td><td><script type="c-js">string</script></td><td><script type="c-js">"black"</script></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">tooltip</script></td><td><script type="c-js">f-string</script></td><td><script type="c-js">null</script></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">datalabels</script></td><td><script type="c-js">f-string[]</script></td><td><script type="c-js">null</script></td><td></td>
        </tr>
    </tbody>
</table>


</main>
    </body>
</html>