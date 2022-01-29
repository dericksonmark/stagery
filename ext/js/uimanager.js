const renderspace = document.getElementById('render');
const lightstable = document.getElementById('lightstable');

// Buttons
const resetbtn = document.getElementById('reset');
const loadlightbtn = document.getElementById('loadlightbtn');
const removelightbtn = document.getElementById('removelightbtn');
const loadobjectbtn = document.getElementById('loadobjectbtn');
const objupbtn = document.getElementById('objupbtn');
const objdownbtn = document.getElementById('objdownbtn');
const objleftbtn = document.getElementById('objleftbtn');
const objrightbtn = document.getElementById('objrightbtn');
const objbackbtn = document.getElementById('objbackbtn');
const objforwardbtn = document.getElementById('objforwardbtn');

// Viewer inputs
const nightvision = document.getElementById('fullbright');

// Light inputs
const lightcolor = document.getElementById('lightcolor');
const lightblur = document.getElementById('lightfocus');
const lightangle = document.getElementById('lightangle');
const lightstatus = document.getElementById('lightstatus');

// Object inputs
const objinput = document.getElementById('objuploader');
const mtlinput = document.getElementById('mtluploader');
const objscale = document.getElementById('objscale');

// Data
const lights = [];
const lightselectors = [];
let objects = [];

let lightid = 0;


/**
 * Main loader
 */
resetbtn.onclick = function() {
    const data = prebuild(nightvision.checked, renderspace, objects, lights);
    build(data);
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

loadobjectbtn.onclick = function() {
    fileloader(document.getElementById('objuploader'), function (obj) {
        fileloader(document.getElementById('mtluploader'), function(mtl) {
            objects.push(objloader(nightvision.checked, obj, mtl, 0, 0, 0, inputdefault(objscale.value, 0.1)));
        });
    });
    const data = prebuild(nightvision.checked, renderspace, objects, lights);
    build(data);
}

// Object position controllers

objrightbtn.onclick = function() {
    const object = objects.pop();
    object.position.set(object.position.x + 1, object.position.y, object.position.z);
    objects.push(object);
}

objleftbtn.onclick = function() {
    const object = objects.pop();
    object.position.set(object.position.x - 1, object.position.y, object.position.z);
    objects.push(object);
}

objupbtn.onclick = function() {
    const object = objects.pop();
    object.position.set(object.position.x, object.position.y + 1, object.position.z);
    objects.push(object);
}

objdownbtn.onclick = function() {
    const object = objects.pop();
    object.position.set(object.position.x, object.position.y - 1, object.position.z);
    objects.push(object);
}

objforwardbtn.onclick = function() {
    const object = objects.pop();
    object.position.set(object.position.x, object.position.y, object.position.z + 1);
    objects.push(object);
}

objbackbtn.onclick = function() {
    const object = objects.pop();
    object.position.set(object.position.x, object.position.y, object.position.z - 1);
    objects.push(object);
}