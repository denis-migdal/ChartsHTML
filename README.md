# ChartsHTML

This is a PoC for a Chart.js HTML binding.<br/>
This is based on the [LISS WebComponent library](https://github.com/denis-migdal/LISS).

```html
<chart-html>
    <chart-scale name="x">toto,titi</chart-scale>
    <chart-scale name="y" min="0" max="2"></chart-scale>
    <chart-dataset name="toto" type="bar">
        [1,2]
    </chart-dataset>
    <curve-hline color="#00FF00">1.5</curve-hline>
</chart-html>
```

<center>
    <img src='./doc/img/example.png' />
</center>

ChartsHTML uses **composition** in order to **factorize** code, improving readability and facilitating graph creation.

It uses WebComponents enabling to easily see and modify on the fly the graph configuration through the browser developer tools. It also favors extensibility and reusability. A JS interface (to be implemented) will also be provided.

ChartsHTML also integrate several ChartsJS plugins :
- Zoom (to be implemented)
- datalabel (to be implemented)
- C2S

As well as offering new features :
- data sources synchronisation (to be implemented).
- data exports (csv, json).
- graph exports (png, svg, HTML).