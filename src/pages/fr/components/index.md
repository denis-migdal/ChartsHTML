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

# Les composants

ChartsHTML offre différents composants que vous pouvez ajouter à votre graphe afin de le configurer et d'en modifier le comportement. La liste des composants est décrite ci-dessous, avec la liste des attributs qu'ils acceptent.


<h2 id="scale" short="Scale"><script type="c-js">Scale</script>/<script type="c-html"><chart-scale></script> : les axes du graphe</h2>

<chart-playground name="component-scale" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=component-scale"><i>Tester l'exemple dans le bac à sable</i></a></div>

<center><strong>Attributs acceptés :</strong></center>

<table>
    <thead>
        <tr><th>Nom (HTML)</th><th>Nom (JS)</th><th>Type</th><th>Valeur par défaut</th><th>Hérité de</th></tr>
    </thead>
    <tbody>
        <tr>
            <td></td><td><script type="c-text">content</script></td><td><script type="c-js">string[]</script></td><td><script type="c-js">null</script></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">name</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">GraphComponent</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">min</script></td><td><script type="c-js">integer</script></td><td></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">max</script></td><td><script type="c-js">integer</script></td><td></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">position</script></td><td><script type="c-js">"right"|"left"</script><br/><script type="c-js">"top"|"bottom"</script></td><td></td><td></td>
        </tr>
    </tbody>
</table>

💡 Par défaut les axes sont linéaires. Si une liste est fournie en contenu, il sera considéré comme un axe de catégorie.

💡 Par défaut, les axes dont le nom commence par <script type="c-text">x</script>, ou <script type="c-text">y</script>, sont positionnés en bas, ou à gauche.

💡 Si les attributs <script type="c-text">min</script> et/ou <script type="c-text">max</script> ne sont pas renseignés, leurs valeurs sont automatiquement calculées.

<h2 id="zoom" short="Zoom"><script type="c-js">Zoom</script>/<script type="c-html"><chart-zoom></script> : zoom/pan</h2>

<chart-playground name="component-zoom" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=component-zoom"><i>Tester l'exemple dans le bac à sable</i></a></div>

<center><strong>Attributs acceptés :</strong></center>

<table>
    <thead>
        <tr><th>Nom (HTML)</th><th>Nom (JS)</th><th>Type</th><th>Valeur par défaut</th><th>Hérité de</th></tr>
    </thead>
    <tbody>
        <tr>
            <td></td><td><script type="c-text">content</script></td><td><script type="c-js">string[]</script></td><td><script type="c-js">null</script></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">name</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">GraphComponent</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">direction</script></td><td><script type="c-js">"x"|"y"|"xy"|"none"</script></td><td><script type="c-js">"xy"</script></td><td></td>
        </tr>
    </tbody>
</table>

💡 La limite des zoom/pan est déterminée par les limites <script type="c-text">min</script> et <script type="c-text">max</script> des axes.

<h2 id="tooltip" short="Tooltip"><script type="c-js">Tooltip</script>/<script type="c-html"><chart-tooltip></script> : bulles informatives au survol</h2>

<chart-playground name="component-tooltip" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=component-tooltip"><i>Tester l'exemple dans le bac à sable</i></a></div>

<center><strong>Attributs acceptés :</strong></center>

<table>
    <thead>
        <tr><th>Nom (HTML)</th><th>Nom (JS)</th><th>Type</th><th>Valeur par défaut</th><th>Hérité de</th></tr>
    </thead>
    <tbody>
        <tr>
            <td></td><td><script type="c-text">content</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">name</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">GraphComponent</script></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">direction</script></td><td><script type="c-js">"x"|"y"|"xy"</script></td><td><script type="c-js">"xy"</script></td><td></td>
        </tr>
    </tbody>
</table>

Les bulles informatives sont composées d'un :
- *titre*, défini par le contenu de <script type="c-js">Tooltip</script> ;
- ligne pour chaque *points survolés*, définie par la propriété <script type="c-js">tooltip</script> des courbes auxquels ils appartiennent.

💡 Vous noterez qu'en HTML les indications <script type="c-text">@{...}</script>  sont remplacées par des valeurs dépendantes du point :

- <script type="c-js">@{name}</script> : le nom du dataset ;
- <script type="c-js">@{x}</script> : la valeur d'abscisse du point ;
- <script type="c-js">@{y}</script> : la valeur d'ordonnée du point.

<h2 id="datalabels" short="Datalabels"><script type="c-js">Datalabels</script>/<script type="c-html"><chart-datalabels></script> : les étiquettes de données</h2>

<chart-playground name="component-datalabels" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=component-datalabels"><i>Tester l'exemple dans le bac à sable</i></a></div>

<center><strong>Attributs acceptés :</strong></center>

<table>
    <thead>
        <tr><th>Nom (HTML)</th><th>Nom (JS)</th><th>Type</th><th>Valeur par défaut</th><th>Hérité de</th></tr>
    </thead>
    <tbody>
        <tr>
            <td></td><td><script type="c-text">content</script></td><td><script type="c-js">string[]</script></td><td><script type="c-js">null</script></td><td></td>
        </tr><tr>
            <td colspan="2"><script type="c-text">name</script></td><td><script type="c-js">string</script></td><td><script type="c-js">null</script></td><td><script type="c-js">GraphComponent</script></td>
        </tr>
    </tbody>
</table>

💡 Au clic sur un point de la courbe, l'étiquette affichée change.

<h2 id="value" short="Value"><script type="c-js">Value</script>/<script type="c-html"><chart-value></script> : valeur partagée ou externe</h2>

<chart-playground name="component-value" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=component-value"><i>Tester l'exemple dans le bac à sable</i></a></div>

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
            <td colspan="2"><script type="c-text">type</script></td><td><script type="c-js">string</script></td><td><script type="c-js">"string"</script></td><td></td>
        </tr>
    </tbody>
</table>

</main>
    </body>
</html>