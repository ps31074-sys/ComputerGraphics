import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

console.log("test for blank page");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfe8ff);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(30, 50, 30);
scene.add(sunLight);

// Ground
const parkMaterial = new THREE.MeshLambertMaterial({ color: 0x3fa34d });
const park = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), parkMaterial);
park.rotation.x = -Math.PI / 2;
scene.add(park);

// Single road (east to west)
const asphaltMaterial = new THREE.MeshStandardMaterial({
  color: 0x1c1c1c,
  roughness: 0.7,
});

const eastWestRoad = new THREE.Mesh(
  new THREE.BoxGeometry(40, 0.1, 6),
  asphaltMaterial
);
eastWestRoad.position.y = 0.05;
scene.add(eastWestRoad);

// Materials for buildings
const brightGrayMaterial = new THREE.MeshStandardMaterial({ color: 0xd3d3d3 });
const cobaltBlueMaterial = new THREE.MeshStandardMaterial({ color: 0x0047ab });

// Buildings
const grayHouse = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 8), brightGrayMaterial);
grayHouse.position.set(-10, 3, -7);
scene.add(grayHouse);

const blueHouse = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 8), cobaltBlueMaterial);
blueHouse.position.set(10, 3, -7);
scene.add(blueHouse);


// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
