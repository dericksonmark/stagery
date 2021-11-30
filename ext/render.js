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

var reset = false;

if (window.innerWidth <= 500) {
    renderWindow.innerText = 'The stage cannot be rendered in a window this small. :(\nIf you resized the page, refresh!';
} else {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / renderWindow.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, renderWindow.clientHeight);
    renderWindow.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0xffffff,wireframe:true});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

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
    }

    function animate() {
        requestAnimationFrame( animate );   

        if (up) camera.position.z += 0.05;
        if (down) camera.position.z -= 0.05;
        if (right) camera.position.x -= 0.05;
        if (left) camera.position.x += 0.05;
        if (jump) camera.position.y -= 0.05;
        if (fall) camera.position.y += 0.05;
        if (fovup) camera.fov++;
        if (fovdown) camera.fov--;
        if (lookleft) camera.rotation.y += 0.01;
        if (lookright) camera.rotation.y -= 0.01;
        if (lookup) camera.rotation.x += 0.01;
        if (lookdown) camera.rotation.x -= 0.01;
        if (turnleft) camera.rotation.z -= 0.01;
        if (turnright) camera.rotation.z += 0.01;

        if (camera.rotation.x >= 2 * Math.PI || camera.rotation.x <= -2 * Math.PI) camera.rotation.x = 0;
        if (camera.rotation.y >= 2 * Math.PI || camera.rotation.y <= -2 * Math.PI) camera.rotation.y = 0;
        if (camera.rotation.z >= 2 * Math.PI || camera.rotation.z <= -2 * Math.PI) camera.rotation.z = 0;
 
        if (reset) {
            camera.position.set(0, 0, 5);
            camera.rotation.x = 0;
            camera.rotation.y = 0;
            camera.rotation.z = 0;
            camera.fov = 60;
        }

        camera.updateProjectionMatrix();
        debugWindow.innerText = `Position: X: ${camera.position.x.toFixed(2)} Y: ${camera.position.y.toFixed(2)} Z: ${camera.position.z.toFixed(2)}`;
        debugWindow.innerText += `\nRotation: X: ${(camera.rotation.x * 180/Math.PI % 360).toFixed(2)} Y: ${(camera.rotation.y * 180/Math.PI % 360).toFixed(2)} Z: ${(camera.rotation.z * 180/Math.PI % 360).toFixed(2)}`
        debugWindow.innerText += `\nFOV: ${camera.fov.toFixed(1)}`;

        renderer.render( scene, camera );
    }

    animate();
}