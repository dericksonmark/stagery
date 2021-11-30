const renderWindow = document.getElementById('render');
const debugWindow = document.getElementById('debug');

// Keys
var up = false;
var down = false;
var left = false;
var right = false;
var jump = false;
var fall = false;
var fovup = false;
var fovdown = false;
var lookleft = false;
var lookright = false;
var lookup = false;
var lookdown = false;
var turnleft = false;
var turnright = false;

var speedup = false;

var reset = false;

if (window.innerWidth <= 500) {
    renderWindow.innerText = 'The stage cannot be rendered in a window this small. :(\nIf you resized the page, refresh!';
} else {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / renderWindow.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, renderWindow.clientHeight);
    renderWindow.appendChild(renderer.domElement);

    const geometry = [];
    for (const fig of stagebuilder(20, 10, 10)) {
        const face = new THREE.PlaneGeometry(fig[0], fig[1]);
        const material = new THREE.MeshBasicMaterial({color: fig[4], side: THREE.DoubleSide});
        const plane = new THREE.Mesh(face, material);
        scene.add(plane);
        plane.position.set(fig[2][0], fig[2][1], fig[2][2]);
        plane.rotation.set(fig[3][0], fig[3][1], fig[3][2]);
    }

    camera.position.z = 25;
    camera.position.y = 2;

    document.onkeydown = function (e) {
        console.log(e.code)
        switch (e.code) {
            case 'ArrowDown':
                e.preventDefault(); up = true; break;
            case 'ArrowUp':
                e.preventDefault(); down = true; break;
            case 'ArrowLeft':
                e.preventDefault(); right = true; break;
            case 'ArrowRight':
                e.preventDefault(); left = true; break;
            case 'ShiftLeft':
            case 'ShiftRight':
                e.preventDefault(); jump = true; break;
            case 'Space':
                e.preventDefault(); fall = true; break;
            case 'KeyL':
                e.preventDefault(); fovup = true; break;
            case 'KeyK':
                e.preventDefault(); fovdown = true; break;
            case 'KeyR':
                e.preventDefault(); reset = true; break;
            case 'KeyW':
                e.preventDefault(); lookup = true; break;
            case 'KeyS':
                e.preventDefault(); lookdown = true; break;
            case 'KeyA':
                e.preventDefault(); lookleft = true; break;
            case 'KeyD':
                e.preventDefault(); lookright = true; break;
            case 'KeyZ':
                e.preventDefault(); turnleft = true; break;
            case 'KeyX':
                e.preventDefault(); turnright = true; break;
            case 'ControlLeft':
                e.preventDefault(); speedup = true; break;
            default:
                break;
        }
    }

    document.onkeyup = function (e) {
        switch (e.code) {
            case 'ArrowDown':
                up = false; break;
            case 'ArrowUp':
                down = false; break;
            case 'ArrowLeft':
                right = false; break;
            case 'ArrowRight':
                left = false; break;
            case 'ShiftLeft':
            case 'ShiftRight':
                jump = false; break;
            case 'Space':
                fall = false; break;
            case 'KeyL':
                fovup = false; break;
            case 'KeyK':
                fovdown = false; break;
            case 'KeyR':
                reset = false; break;
            case 'KeyW':
                lookup = false; break;
            case 'KeyS':
                lookdown = false; break;
            case 'KeyA':
                lookleft = false; break;
            case 'KeyD':
                lookright = false; break;
            case 'KeyZ':
                turnleft = false; break;
            case 'KeyX':
                turnright = false; break;
            default:
                break;
        }
        if (!up && !down && !left && !right) speedup = false;
    }

    function animate() {
        requestAnimationFrame( animate );   

        if (!speedup) {
            if (up) camera.position.set(camera.position.x + 0.05 * Math.sin(camera.rotation.y), camera.position.y, camera.position.z + 0.05 * Math.cos(camera.rotation.y));
            if (down) camera.position.set(camera.position.x - 0.05 * Math.sin(camera.rotation.y), camera.position.y, camera.position.z - 0.05 * Math.cos(camera.rotation.y));
            if (right) camera.position.set(camera.position.x - 0.05 * Math.cos(camera.rotation.y), camera.position.y, camera.position.z + 0.05 * Math.sin(camera.rotation.y));
            if (left) camera.position.set(camera.position.x + 0.05 * Math.cos(camera.rotation.y), camera.position.y, camera.position.z - 0.05 * Math.sin(camera.rotation.y));
        } else {
            if (up) camera.position.set(camera.position.x + 0.15 * Math.sin(camera.rotation.y), camera.position.y, camera.position.z + 0.15 * Math.cos(camera.rotation.y));
            if (down) camera.position.set(camera.position.x - 0.15 * Math.sin(camera.rotation.y), camera.position.y, camera.position.z - 0.15 * Math.cos(camera.rotation.y));
            if (right) camera.position.set(camera.position.x - 0.15 * Math.cos(camera.rotation.y), camera.position.y, camera.position.z + 0.15 * Math.sin(camera.rotation.y));
            if (left) camera.position.set(camera.position.x + 0.15 * Math.cos(camera.rotation.y), camera.position.y, camera.position.z - 0.15 * Math.sin(camera.rotation.y));
        }
        if (jump) camera.position.y -= 0.05;
        if (fall) camera.position.y += 0.05;
        if (fovup) camera.fov++;
        if (fovdown) camera.fov--;
        if (lookleft) camera.rotation.y += 0.015;
        if (lookright) camera.rotation.y -= 0.015;
        if (lookup) camera.rotation.x += 0.015;
        if (lookdown) camera.rotation.x -= 0.015;
        if (turnleft) camera.rotation.z -= 0.015;
        if (turnright) camera.rotation.z += 0.015;

        if (camera.rotation.x >= 2 * Math.PI || camera.rotation.x <= -2 * Math.PI) camera.rotation.x = 0;
        if (camera.rotation.y >= 2 * Math.PI || camera.rotation.y <= -2 * Math.PI) camera.rotation.y = 0;
        if (camera.rotation.z >= 2 * Math.PI || camera.rotation.z <= -2 * Math.PI) camera.rotation.z = 0;
 
        if (reset) {
            camera.position.set(0, 2, 25);
            camera.rotation.x = 0;
            camera.rotation.y = 0;
            camera.rotation.z = 0;
            camera.fov = 60;
        }

        camera.updateProjectionMatrix();
        debugWindow.innerText = `Position: X: ${camera.position.x.toFixed(2)} Y: ${camera.position.y.toFixed(2)} Z: ${camera.position.z.toFixed(2)}`;
        debugWindow.innerText += `\nRotation: X: ${(camera.rotation.x * 180/Math.PI % 360).toFixed(2)} Y: ${(camera.rotation.y * 180/Math.PI % 360).toFixed(2)} Z: ${(camera.rotation.z * 180/Math.PI % 360).toFixed(2)}`
        debugWindow.innerText += `\nFOV: ${camera.fov.toFixed(1)}`;

        renderer.render(scene, camera);
    }

    animate();
}