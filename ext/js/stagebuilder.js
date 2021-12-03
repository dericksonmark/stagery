function stagebuilder(width, depth, height, extension, extlr) {
    const floor = [width, depth, [0, 0, 0], [Math.PI / 2, 0, 0], document.getElementById('floor').value];
    const ceil = [width, depth, [0, height, 0], [Math.PI / 2, 0, 0], document.getElementById('ceil').value];
    const left = [depth, height, [width / -2, height / 2, 0], [0, Math.PI / 2, 0], document.getElementById('side').value];
    const right = [depth, height, [width / 2, height / 2, 0], [0, Math.PI / 2, 0], document.getElementById('side').value];
    const back = [width, height, [0, height / 2, -depth / 2], [0, 0, 0], document.getElementById('back').value];
    const apron = [width + extlr * 2, extension, [0, 0, extension / 2 + depth / 2], [Math.PI / 2, 0, 0], document.getElementById('apron').value];
    return [floor, ceil, left, right, back, apron];
}