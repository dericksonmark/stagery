function lightbuilder(color, angle, penumbra, lumens, position, target) {
    const spotlight = new THREE.SpotLight(color, 1, 0, angle * Math.PI / 180, penumbra ?? 0.2, 2);
    spotlight.power = lumens;
    spotlight.position.set(position[0], position[1], position[2]);
    spotlight.target.position.set(target[0], target[1], target[2]);
    return spotlight;
}

function newlight(lightcolor, lightblur, lightangle) {
    const light = [lightcolor, lightblur, lightangle];
    return light;
}