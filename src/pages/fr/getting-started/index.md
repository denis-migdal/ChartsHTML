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

# Prise en main

Créez votre premier graphe ChartsHTML en 5 petites étapes.

## Ajout de ChartsHTML

La première étape est d'ajouter la bibliothèque ChartsHTML à votre page Web :

<script type="c-html">
    <!DOCTYPE html>
    <html>
        <head>
            ... 
            <script type="module" src="<h>/libs/ChartsHTML/</h>"><xscript>
        </head>
        <body>
            ...
        <xbody>
    </html>
</script>

## Créez votre premier graphe

En HTML ou en JS/TS, ajoutez un graphe vide à votre page Web :

<chart-playground name="graph-empty" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=graph-empty"><i>Tester l'exemple dans le bac à sable</i></a></div>

💡 Le graphe étant actuellement vide, rien ne s'affiche.

## Ajouter une courbe à votre graphe

Vous pouvez maintenant afficher des données sur votre graphe en lui ajoutant une courbe :

<chart-playground name="curve-line" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=curve-line"><i>Tester l'exemple dans le bac à sable</i></a></div>

💡 ChartsHTML offre différents types de courbes :

<div class="flex-2">
    <div>

- [<script type="c-text">Points</script>](../curves/#points) : un ensemble de points.
- [<script type="c-text">Line</script>](../curves/#line) : une ligne.
    - [<script type="c-text">HLine</script>](../curves/#hline) : une ligne horizontale.
    - [<script type="c-text">VLine</script>](../curves/#vline) : une ligne verticale.

</div><div>

- [<script type="c-text">Bars</script>](../curves/#bars) : données en barres.
    - [<script type="c-text">Histogram</script>](../curves/#histogram) : histogramme.
- [<script type="c-text">Timelapse</script>](../curves/#timelapse) : données temporelles.
- [<script type="c-text">Dataset</script>](../curves/#dataset) : utiliser un autre type de courbes.


</div>
</div>

## Configurez votre courbe

Vous pouvez ensuite configurer votre courbe en lui ajoutant des attributs, e.g. pour modifier sa couleur :

<chart-playground name="curve-line-color" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=curve-line-color"><i>Tester l'exemple dans le bac à sable</i></a></div>

💡 La liste des attributs qu'accepte chaque type de courbes est décrit dans leur documentation.

## Configurez votre graphe

Vous pouvez ensuite configurer votre graphe en lui ajoutant différents composants.<br/>
Par exemple pour afficher une bulle informative au survol des points :

<chart-playground name="component-tooltip" show="index.code,output"></chart-playground>
<div style="text-align:right"><a href="/playground/?example=component-tooltip"><i>Tester l'exemple dans le bac à sable</i></a></div>

💡 Vous noterez qu'en HTML les indications <script type="c-text">@{...}</script>  sont remplacées par des valeurs dépendantes du point. Ce système est expliqué plus en détails dans la documentation de [<script type="c-js">Tooltip</script>](../components/#tooltip).

💡 ChartsHTML offre différents composants :

<div class="flex-2">
    <div>

- [<script type="c-js">Scale</script>](../components/#scale) : les axes du graphe.
- [<script type="c-js">Zoom</script>](../components/#zoom) : zoom/pan.

</div><div>

- [<script type="c-js">Tooltip</script>](../components/#tooltip) : bulles informatives.
- [<script type="c-js">Datalabels</script>](../components/#datalabels) : les étiquettes de données.
- [<script type="c-js">Value</script>](../components/#value) : valeur partagée ou externe.

</div>
</div>

- [TODO] `Datasets` : regroupe un ensemble de datasets en un seul composant (généralement utilisé avec Value).

## Interagir avec votre graphe et ses composants

💡 En interne, ChartsHTML utilise des composants Web [LISS](liss.migdal.ovh) permettant de modifier à la volée la configuration des graphes, via les outils de développement du navigateur.

[TODO] cf LISS doc.

## Créer vos propres composants de graphe

[TODO] doc developer ?


</main>
    </body>
</html>