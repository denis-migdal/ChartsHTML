<div align="center">
  <h1>[PROJECT TITLE]</h1>

  <p>[Project description</p>
</div>

## Build

- `npm run build`
- `npm run watch`

## TODO

- doc StringEval types + auto-deduce.

- doc curves
- doc components

- doc public API
  - getDataset(name)
  - getDatasetNames()
  - update()
  - updateAll()
  - get/setValue (refactor ???)
  - zoom() => Zoom
  - ...
- doc component public API
  - change attr ? (color/tooltip/etc ?)
  - ...

### Bugs

### Features

- playground
  - show generated HTML => message to iframe => send outerHTML (+toggle contenteditable)

- default color/tooltip/datalabel at graph level
  - <curves-defaults> component ? [require internal refactor?]

- hide -> hidden
  -> hidden scales.

- charts.js raw options override ?
- share components (clone)
- move  components (remove and add)


- doc
  - show example in doc (iframe to x?example="x" ?) / load from example...
  - toggle HTML/JS ?

-> Initial components in ChartHTML cstr ? [...args] ?
  -> {scales: {name:}, datasets: {}} ?

-> tooltips => external: externalTooltipHandler
https://www.chartjs.org/docs/latest/samples/tooltip/html.html


### Refactors

- use signals (attrs+content are signals/processed ?)
  -> contentRaw + contentParsed (a constant computedSignal, override method).
  -> attrsRaw + attrsParsed (?) [not a signal : besoin de la structure entière]
  -> StringEval is a computedSignal() ?
    -> do not reparse content.
  -> rawValues -> signalValues (???)
  -> effect`` <= detect signals and update only when signals changed.

- revoir internals (_insert/_attach/etc)
- déplacer StringEval dans son propre fichier.

### TS type errors

- LISS(extends)
- ChartHTML.XXX