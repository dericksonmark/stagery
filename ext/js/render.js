const renderWindow = document.getElementById('render');
const debugWindow = document.getElementById('debug');

// Effect inputs
const nightVision = document.getElementById('fullbright');

// Color inputs
const floorColor = document.getElementById('floor');
const ceilColor = document.getElementById('ceil');
const sideColor = document.getElementById('side');
const backColor = document.getElementById('back');
const curtainColor = document.getElementById('curtains');

// Stage dimensions
const stgwidth = document.getElementById('stgwidth');
const stgheight = document.getElementById('stgheight');
const stgdepth = document.getElementById('stgdepth');
const aprextw = document.getElementById('aprextw');
const aprextd = document.getElementById('aprextd');


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

function build(data) {

    const xWorldAxisVector = new THREE.Vector3(1, 0, 0);
    const yWorldAxisVector = new THREE.Vector3(0, 1, 0);
    const zWorldAxisVector = new THREE.Vector3(0, 0, 1)

    const lightinputs = data.lights;
    const objectinputs = data.objects;

    if (compatibilityCheck()) {
        if (renderWindow.firstChild) renderWindow.removeChild(renderWindow.firstChild);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / renderWindow.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.physicallyCorrectLights = true;
        renderer.setSize(window.innerWidth, renderWindow.clientHeight);
        renderWindow.appendChild(renderer.domElement);

        scene.background = new THREE.Color(0x808080);
        
        const lights = [];
        const helpers = [];
        for (const light of lightinputs) {
            const spotlight = lightbuilder(light[0], light[2], light[1], 10000, [10, 5.2, 10], [-2, 5, 2]);
            scene.add(spotlight).add(spotlight.target);
            lights.push(spotlight)
            const slh = new THREE.SpotLightHelper(spotlight);
            helpers.push(slh);
            scene.add(slh);
        }

        const geometry = [];
        for (const fig of stagebuilder(parseFloat(stgwidth.value) || 11.6, parseFloat(stgdepth.value) || 7.8, parseFloat(stgheight.value) || 9.1, inputdefault(aprextd.value, 3), inputdefault(aprextw.value, 2))) {
            const face = new THREE.PlaneGeometry(fig[0], fig[1]);
            let material;
            if (nightVision.checked) material = new THREE.MeshBasicMaterial({color: fig[4], side: THREE.DoubleSide});
            else material = new THREE.MeshPhongMaterial({color: fig[4], side: THREE.DoubleSide});
            const plane = new THREE.Mesh(face, material);
            geometry.push(plane);
            scene.add(plane);
            plane.position.set(fig[2][0], fig[2][1], fig[2][2]);
            plane.rotation.set(fig[3][0], fig[3][1], fig[3][2]);
        }

        for (const object of objectinputs) {
            scene.add(object);
        }

        // TODO: Implementation for curtains
        //scene.add(curtainbuilder(0, 8, 3.9, 11.6, 2.2, nightVision.checked, curtainColor.value));

        camera.position.set(0, 2, 25);

        document.onkeydown = function (e) {
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
            requestAnimationFrame(animate);   

            qrot = new THREE.Quaternion(camera.quaternion.x, camera.quaternion.y * Math.sign(camera.quaternion.w), camera.quaternion.z, camera.quaternion.w);
            // I don't know why this worked, but it did ??\_(???)_/??

            if (!speedup) {
                if (up) camera.position.set(camera.position.x + 0.05 * Math.sin(qrot.y * Math.PI), camera.position.y, camera.position.z + 0.05 * Math.cos(qrot.y * Math.PI));
                if (down) camera.position.set(camera.position.x - 0.05 * Math.sin(qrot.y * Math.PI), camera.position.y, camera.position.z - 0.05 * Math.cos(qrot.y * Math.PI));
                if (right) camera.position.set(camera.position.x - 0.05 * Math.cos(qrot.y * Math.PI), camera.position.y, camera.position.z + 0.05 * Math.sin(qrot.y * Math.PI));
                if (left) camera.position.set(camera.position.x + 0.05 * Math.cos(qrot.y * Math.PI), camera.position.y, camera.position.z - 0.05 * Math.sin(qrot.y * Math.PI));
            } else {
                if (up) camera.position.set(camera.position.x + 0.15 * Math.sin(qrot.y * Math.PI), camera.position.y, camera.position.z + 0.15 * Math.cos(qrot.y * Math.PI));
                if (down) camera.position.set(camera.position.x - 0.15 * Math.sin(qrot.y * Math.PI), camera.position.y, camera.position.z - 0.15 * Math.cos(qrot.y * Math.PI));
                if (right) camera.position.set(camera.position.x - 0.15 * Math.cos(qrot.y * Math.PI), camera.position.y, camera.position.z + 0.15 * Math.sin(qrot.y * Math.PI));
                if (left) camera.position.set(camera.position.x + 0.15 * Math.cos(qrot.y * Math.PI), camera.position.y, camera.position.z - 0.15 * Math.sin(qrot.y * Math.PI));
            }
            if (jump) camera.position.y -= 0.05;
            if (fall) camera.position.y += 0.05;
            if (fovup) camera.fov++;
            if (fovdown) camera.fov--;
            if (lookleft) camera.rotateOnAxis(yWorldAxisVector, 0.015);
            if (lookright) camera.rotateOnAxis(yWorldAxisVector, -0.015)
            if (lookup) camera.rotateOnAxis(xWorldAxisVector, 0.015);
            if (lookdown) camera.rotateOnAxis(xWorldAxisVector, -0.015);
            if (turnright) camera.rotateOnAxis(zWorldAxisVector, 0.015);
            if (turnleft) camera.rotateOnAxis(zWorldAxisVector, -0.015);
    
            if (reset) {
                camera.position.set(0, 2, 25);
                camera.rotation.x = 0;
                camera.rotation.y = 0;
                camera.rotation.z = 0;
                camera.fov = 60;
            }

            for (const helper of helpers) {
                helper.update();
            }

            camera.updateProjectionMatrix();
            debugWindow.style.height = '3em';
            debugWindow.innerText = `Position: X: ${camera.position.x.toFixed(2)} Y: ${camera.position.y.toFixed(2)} Z: ${camera.position.z.toFixed(2)}`;
            debugWindow.innerText += `\nEuler: X: ${(camera.rotation.x/* * 180/Math.PI % 360*/).toFixed(2)} Y: ${(camera.rotation.y/* * 180/Math.PI % 360*/).toFixed(2)} Z: ${(camera.rotation.z/* * 180/Math.PI % 360*/).toFixed(2)}`;
            debugWindow.innerText += `\nEulerDeg: X: ${(camera.rotation.x * 180/Math.PI % 360).toFixed(2)} Y: ${(camera.rotation.y * 180/Math.PI % 360).toFixed(2)} Z: ${(camera.rotation.z * 180/Math.PI % 360).toFixed(2)}`;
            debugWindow.innerText += `\nQuaternion: X: ${(camera.quaternion.x/* * 180/Math.PI % 360*/).toFixed(2)} Y: ${(camera.quaternion.y/* * 180/Math.PI % 360*/).toFixed(2)} Z: ${(camera.quaternion.z/* * 180/Math.PI % 360*/).toFixed(2)} W: ${(camera.quaternion.w).toFixed(2)}`;
            debugWindow.innerText += `\nQuaternionDeg: X: ${(camera.quaternion.x * 180/Math.PI % 360).toFixed(2)} Y: ${(camera.quaternion.y * 180/Math.PI % 360).toFixed(2)} Z: ${(camera.quaternion.z * 180/Math.PI % 360).toFixed(2)} W: ${(camera.quaternion.w * 180/Math.PI % 360).toFixed(2)}`;
            debugWindow.innerText += `\nFOV: ${camera.fov.toFixed(1)}`;

            renderer.render(scene, camera);
        }

        animate();
    }
}