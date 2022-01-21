function prebuild(nv, buildwindow, objects, lights) {
    buildwindow.style.height = '720px';
    objects = relightobjs(nv, objects);
    return {
        objects: objects,
        lights: lights,
    };
}