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

- hide -> hidden

- show generated HTML => message to iframe => send outerHTML (+toggle contenteditable)
- show example in doc (iframe to x?example="x" ?) / load from example...
- toggle HTML/JS ?

- share components (clone)
- move  components (remove and add)

- charts.js raw options override ?

- default color/tooltip/datalabel at graph level
  - curves-defaults component ?
- add tooltip if one graph set tooltip.

- if color starts with -- => use css prop computed value ? (requires to manually update ?) => use signal ?
- dark mode => invert (do it yourself?)

- StringEval => implicit type (js/template/str/?)
  -> StringEval is a computedSignal()

- opti StringEval
  -> wait first eval to evaluate
  -> do not not parse content if already done and hasn't changed.

### Refactors

- LISS : replace attrs by signals ? (and raw_attrs for validation ?).
- move out StringEval
- refactor internals (_insert/_attach/etc)
- use signal/computedSignal (lazy eval)/effect
  -> const computedSignal => computation use method that can be redefined.

### TS type errors

- LISS(extends)
- ChartHTML.XXX