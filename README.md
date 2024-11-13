<div align="center">
  <h1>[PROJECT TITLE]</h1>

  <p>[Project description</p>
</div>

## Build

- `npm run build`
- `npm run watch`

## TODO

- doc properties
  - color
  - tooltip => fct
      => "js:"
      => "str:"
      => `` => () => 

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
- show example in doc (iframe to x?example="x" ?)

- share components (clone)
- move  components (remove and add)

- charts.js raw options override ?

- default color/tooltip/datalabel at graph level

- if color starts with -- => use css prop computed value ? (requires to manually update ?) => use signal ?
- dark mode => invert (do it yourself?)

### Refactors

- LISS : replace attrs by signals ? (and raw_attrs for validation ?).
- refactor internals
- use signal/computedSignal (lazy eval)/effect
  -> const computedSignal => computation use method that can be redefined.

### TS type errors

- LISS(extends)
- ChartHTML.XXX