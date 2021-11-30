function stagebuilder(width, depth, height) {
    const floor = [width, depth, [0, 0, 0], [Math.PI / 2, 0, 0], `#${Math.floor(Math.random()*16777215).toString(16)}`];
    const ceil = [width, depth, [0, height, 0], [Math.PI / 2, 0, 0], `#${Math.floor(Math.random()*16777215).toString(16)}`];
    const left = [depth, height, [width / -2, height / 2, 0], [0, Math.PI / 2, 0], `#${Math.floor(Math.random()*16777215).toString(16)}`];
    const right = [depth, height, [width / 2, height / 2, 0], [0, Math.PI / 2, 0], `#${Math.floor(Math.random()*16777215).toString(16)}`];
    const back = [width, height, [0, height / 2, -depth / 2], [0, 0, 0], `#${Math.floor(Math.random()*16777215).toString(16)}`];
    return [floor, ceil, left, right, back];
}