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
  - tooltip (as r`` ?).

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

- default datalabel

### Features

- show example in doc (iframe to x?example="x" ?)

- share components (clone)
- move  components (remove and add)

- if color starts with -- => use css prop computed value ? (requires to manually update)

### Refactors

- refactor internals
- use signal/computedSignal (lazy eval)/effect
  -> override computation in children classes ???

### TS type errors

- LISS(extends)
- ChartHTML.XXX