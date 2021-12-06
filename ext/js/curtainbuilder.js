function curtainbuilder(xpos, ypos, zpos, width, height, nv, color) {
    const face = new THREE.PlaneGeometry(width, height);
    let material;
    if (nv) material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
    else material = new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide});
    const plane = new THREE.Mesh(face, material);
    plane.position.set(xpos, ypos, zpos);
    return plane;
}