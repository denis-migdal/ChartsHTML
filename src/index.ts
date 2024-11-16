
//TOOLS
(Number.prototype as any).toPercentStr = function() {
	return `${(this.valueOf() * 100).toFixed(2).padStart(6, ' ')}%`;
}

export {default as Value}      from "./components/value.ts";
export {default as Tooltip}    from "./components/tooltip.ts";
export {default as Datalabels} from "./components/datalabels.ts";
export {default as Zoom}       from "./components/zoom.ts";
export {default as Scale}      from "./components/scale.ts";
export {default as Datasets}   from "./components/datasets.ts";
export {default as Dataset}    from "./components/dataset.ts";

export {default as Line}      from './components/curves/Line';
export {default as Points}    from './components/curves/Points';
export {default as HLine}     from './components/curves/HLine';
export {default as VLine}     from './components/curves/VLine';
export {default as Timelapse} from './components/curves/Timelapse';
export {default as Bars}      from './components/curves/Bars';
export {default as Histogram} from './components/curves/Histogram';

// need to define last.
export {default as ChartHTML}  from "./ChartHTML.ts";