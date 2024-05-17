# ChartsHTML

This is a PoC for a Chart.js HTML binding.<br/>
This is based on the [LISS WebComponent library](https://github.com/denis-migdal/LISS).

```html
<chart-html>
    <chart-value name="val">1.5</chart-value>
    <chart-tooltip>Title ${val}</chart-tooltip>
    <chart-datalabels></chart-datalabels>

    <chart-scale name="x" min="0" max="2"></chart-scale>
    <chart-scale name="y" min="0" max="2"></chart-scale>

    <curve-line name="curve" tooltip="${name}: (${x}, ${y})" color="red">
        [[1,1],[1,2],[2,2]]
    </curve-line>
    <curve-hline color="#00FF00">${val}</curve-hline>
</chart-html>
```

<center>
    <img src='./doc/img/example.png' />
</center>

ChartsHTML uses **composition** in order to **factorize** code, improving readability and facilitating graph creation.

It uses WebComponents enabling to easily see and modify on the fly the graph configuration through the browser developer tools. It also favors extensibility and reusability. A JS API (<mark>TBI</mark>) will also be provided.

ChartsHTML also integrate several ChartsJS plugins :
- Zoom (<mark>TBI</mark>)
- datalabel
- C2S (<mark>TBI</mark>)

As well as offering new features :
- data sources synchronisation.
- data exports (csv, json) (<mark>TBI</mark>).
- graph exports (png, svg, HTML) (<mark>TBI</mark>).

## Graph

### Children

- Dataset
- Scale
- Tooltip
- Datalabel
- Value

### Public API

### Protected API


## Dataset

### Public API

### Protected API

## Scale

### Public API

### Protected API

## Value

### Known values

...

### Public API

### Protected API

## Tooltip

### Public API

### Protected API

## Datalabel

### Public API

### Protected API