import "@LISS/pages/skeleton/base/";

const examples = [
    "curve-line",

    "component-scale",
    "component-zoom",
    "component-tooltip",
    "component-datalabels",
    "component-value",
/*
    "html-empty",
    "js-empty",

    "jsapi-value",
    "jsapi-value-cstr"
    */
];


import "../../chart-playground/ChartPlayground";

// liss-playground
const playground = document.querySelector<HTMLElement>('chart-playground')!;
function setExample(name: string) {
    selector.value = name;
    //playground.removeAttribute('show');
    playground.setAttribute('name', name);
}

// init select

const selector = document.querySelector<HTMLSelectElement>('select')!;
//const webcomp_name = document.querySelector<HTMLInputElement>('input')!;

for(let example of examples)
    selector.append( new Option(example, example));

selector.addEventListener('change', () => {
    const url = new URL(location as any);
    url.searchParams.set("example", selector.value);
    history.pushState({}, "", url);

    setExample(selector.value);
});

// init current example

const searchParams = new URLSearchParams(location.search);
const example = searchParams.get('example');
setExample(example ?? selector.value);