function compatibilityCheck() {
    if (window.innerWidth <= 500) {
        renderWindow.innerText = 'The stage cannot be rendered in a window this small. :(\nIf you resized the page, refresh!';
    } else if (!webglIsAvailable) {
        renderWindow.innerText = 'Unfortunately, your browser does not support WebGL, so your stage is unable to be rendered. :(';
    } else {
        return true;
    }
    return false;
}