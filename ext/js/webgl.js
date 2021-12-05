function webglIsAvailable() {
    // Partial implementation of Three.js WebGL.js
    try {
        const c = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch {
        return false;
    }
}