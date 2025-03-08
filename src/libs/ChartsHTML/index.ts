
//TOOLS
(Number.prototype as any).toPercentStr = function() {
	return `${(this.valueOf() * 100).toFixed(2).padStart(6, ' ')}%`;
}

export {default as Value}      from "@ChartsHTML/components/value";
export {default as Tooltip}    from "@ChartsHTML/components/tooltip";
export {default as Datalabels} from "@ChartsHTML/components/datalabels";
export {default as Zoom}       from "@ChartsHTML/components/zoom";
export {default as Scale}      from "@ChartsHTML/components/scale";
export {default as Datasets}   from "@ChartsHTML/components/datasets";
export {default as Dataset}    from "@ChartsHTML/components/dataset";

export {default as Line}      from '@ChartsHTML/components/curves/Line';
export {default as Points}    from '@ChartsHTML/components/curves/Points';
export {default as HLine}     from '@ChartsHTML/components/curves/HLine';
export {default as VLine}     from '@ChartsHTML/components/curves/VLine';
export {default as Timelapse} from '@ChartsHTML/components/curves/Timelapse';
export {default as Bars}      from '@ChartsHTML/components/curves/Bars';
export {default as Histogram} from '@ChartsHTML/components/curves/Histogram';

// need to define last.
export {default as Chart}  from "@ChartsHTML/Chart";

export {default as CALLBACK} from '@LISS/src/properties/callback';