function objloader(nv, obj, mtl, xpos, ypos, zpos, scl) {
    const mtll = new THREE.MTLLoader();
    const objl = new THREE.OBJLoader();
    const material = mtll.parse(mtl);
    objl.setMaterials(material);
    const object = objl.parse(obj);
    object.scale.set(scl, scl, scl);
    object.traverse(function (item) {
        if (item instanceof THREE.Mesh) {
            if (nv) {
                item.material = new THREE.MeshBasicMaterial({color: item.material.color});
            } else {
                item.material = new THREE.MeshPhongMaterial({color: item.material.color});
            }
        }
    });
    object.position.set(xpos, ypos, zpos);
    return object;
}

function relightobjs(nv, objs) {
    let objects = [];
    for (const obj of objs) {
        obj.traverse(function (item) {
            if (item instanceof THREE.Mesh) {
                if (nv) {
                    item.material = new THREE.MeshBasicMaterial({color: item.material.color});
                } else {
                    item.material = new THREE.MeshPhongMaterial({color: item.material.color});
                }
            }
        });
        objects.push(obj);
    }
    return objects;
}