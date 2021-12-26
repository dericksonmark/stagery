const renderspace = document.getElementById('render');

const resetbtn = document.getElementById('reset');
const loadlightbtn = document.getElementById('loadlightbtn');
const removelightbtn = document.getElementById('removelightbtn');

const lightstable = document.getElementById('lightstable');

// Light inputs
const lightcolor = document.getElementById('lightcolor');
const lightblur = document.getElementById('lightfocus');
const lightangle = document.getElementById('lightangle');
const lightstatus = document.getElementById('lightstatus');

const lights = []; // lightangle, lightcolor, lightblur
const lightselectors = [];
let lightid = 0;

resetbtn.onclick = function() {
    renderspace.style.height = '720px';
    build(lights);
}

loadlightbtn.onclick = function() {
    lightid++;
    lights.push(newlight(lightcolor.value, inputdefault(lightblur.value, 0.2), inputdefault(lightangle.value, 9)));

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    lightselectors.push(checkbox);
    lightstable.appendChild(rowbuilder(checkbox, lightid, lightcolor.value, inputdefault(lightblur.value, 0.2), inputdefault(lightangle.value, 9)));
    colorpreview(lightstable);
    lightstatus.innerHTML = '✓';
    setTimeout(() => {
        lightstatus.innerHTML = '';
    }, 1000);
}

removelightbtn.onclick = function() {
    const toremove = [];
    lightselectors.forEach(function (selector, i) {
        if (selector.checked) {
            toremove.push(selector.parentElement.parentElement.children[1].innerHTML - 1);
            selector.parentElement.parentElement.remove();
        }
    });
    while (toremove.length > 0) {
        const index = toremove.pop();
        lights.splice(index, 1);
        lightselectors.splice(index, 1);
    }
    lightid = 0;
    for (const row of lightstable.children) {
        if (row.children.length == 1) continue;
        const cell = row.children[1];
        lightid++;
        cell.innerHTML = lightid;
    }
}