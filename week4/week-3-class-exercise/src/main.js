import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(6, 4, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.8, 0);
controls.update();

// Floor
const floorGeo = new THREE.PlaneGeometry(20, 20);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.9 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Box
const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const boxMat = new THREE.MeshLambertMaterial({ color: 0x22c55e });
const box = new THREE.Mesh(boxGeo, boxMat);
box.position.set(-2, 0.6, 0);
box.castShadow = true;
scene.add(box);

// Sphere
const sphereGeo = new THREE.SphereGeometry(0.9, 32, 32);
const sphereMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.2, roughness: 0.4 });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.position.set(0.5, 0.9, 1.2);
sphere.castShadow = true;
scene.add(sphere);

// TorusKnot
const torusGeo = new THREE.TorusKnotGeometry(0.6, 0.18, 120, 16);
const torusMat = new THREE.MeshPhongMaterial({ color: 0x3b82f6, shininess: 100 });
const torus = new THREE.Mesh(torusGeo, torusMat);
torus.position.set(2, 0.9, -0.6);
torus.castShadow = true;
scene.add(torus);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(5, 10, 4);
dirLight.castShadow = true;
scene.add(dirLight);

const pointLight = new THREE.PointLight(0xffccaa, 0.6);
pointLight.position.set(-4, 4, -3);
pointLight.castShadow = true;
scene.add(pointLight);

// Grid
const grid = new THREE.GridHelper(20, 20, 0x444444, 0x888888);
scene.add(grid);

// Animation
function animate() {
  requestAnimationFrame(animate);
  box.rotation.y += 0.01;
  sphere.rotation.y += 0.008;
  torus.rotation.x += 0.01;
  renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
