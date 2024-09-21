export function h2(...elements) {
    let element = document.createElement('h2');
    element.append(...elements);
    return element;
}

export function div(id) {
    let element = document.createElement('div');
    element.setAttribute('id', id);
    return element;
}

export function h3(text) {
    let element = document.createElement('h3');
    element.innerHTML = text;
    return element;
}

export function br() {
    return document.createElement('br');
}

export function hr() {
    return document.createElement('hr');
}

export function span(id, text = '') {
    let element = document.createElement('span');
    element.setAttribute('id', id);
    element.innerHTML = text;
    return element;
}

export function button(name, onclick) {
    let element = document.createElement('button');
    // element.setAttribute('onclick', onclick);
    element.onclick = onclick;
    element.innerHTML = name;
    return element;
}

export function body() {
    return document.getElementsByTagName('body')[0];
}