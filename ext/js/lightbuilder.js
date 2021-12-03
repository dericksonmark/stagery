function lightbuilder(angle, penumbra, lumens, position, rotation) {
    const spotlight = new THREE.SpotLight(0xffffff, 1, 0, angle * Math.PI / 180, penumbra ?? 0.2, 2);
    spotlight.power = lumens;
    spotlight.position.set(position[0], position[1], position[2]);
    spotlight.rotation.set(rotation[0], rotation[1], rotation[2]);
    return spotlight;
}