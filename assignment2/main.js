import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// --------------------
// SCENE
// --------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfe8ff);

// --------------------
// CAMERA
// --------------------
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);

// --------------------
// RENDERER
// --------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// --------------------
// CONTROLS
// --------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --------------------
// LIGHTING
// --------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 2);
sunLight.position.set(30, 50, 30);
sunLight.castShadow = true;
sunLight.shadow.bias = -0.001;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
scene.add(sunLight);

// --------------------
// MATERIALS (SOLID COLORS)
// --------------------
const grassMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // green
const brickMaterial = new THREE.MeshStandardMaterial({ color: 0xB22222 }); // brick red
const concreteMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 }); // grey
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 }); // dark grey
const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x88ccee, transparent: true, opacity: 0.6 });

// --------------------
// GROUND
// --------------------
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  grassMaterial
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// --------------------
// ROAD
// --------------------
const road = new THREE.Mesh(
  new THREE.BoxGeometry(40, 0.1, 6),
  roadMaterial
);
road.position.y = 0.05;
road.receiveShadow = true;
scene.add(road);

// --------------------
// BUILDINGS
// --------------------
const brickBuilding = new THREE.Mesh(
  new THREE.BoxGeometry(10, 6, 8),
  brickMaterial
);
brickBuilding.position.set(-10, 3, -7);
brickBuilding.castShadow = true;
brickBuilding.receiveShadow = true;
scene.add(brickBuilding);

const concreteBuilding = new THREE.Mesh(
  new THREE.BoxGeometry(10, 6, 8),
  concreteMaterial
);
concreteBuilding.position.set(10, 3, -7);
concreteBuilding.castShadow = true;
concreteBuilding.receiveShadow = true;
scene.add(concreteBuilding);

const glassBuilding = new THREE.Mesh(
  new THREE.BoxGeometry(6, 8, 6),
  glassMaterial
);
glassBuilding.position.set(0, 4, 10);
glassBuilding.castShadow = false; // transparent building should not cast shadows
glassBuilding.receiveShadow = true;
scene.add(glassBuilding);

// --------------------
// GLTF TREE
// --------------------
const gltfLoader = new GLTFLoader();
gltfLoader.load("/models/tree.glb", (gltf) => {
  const tree = gltf.scene;
  tree.scale.set(2, 2, 2);
  tree.position.set(-15, 0, 10);
  tree.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(tree);
});

// --------------------
// INTERACTION
// --------------------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const object = intersects[0].object;
    if (object.material && object.material.color) {
      object.material.color.set(Math.random() * 0xffffff);
    }
  }
});

// --------------------
// KEYBOARD LIGHT TOGGLE
// --------------------
let lightOn = true;
window.addEventListener("keydown", (e) => {
  if (e.key === "l") {
    lightOn = !lightOn;
    sunLight.visible = lightOn;
  }
});

// --------------------
// ANIMATION
// --------------------
let angle = 0;
function animate() {
  requestAnimationFrame(animate);

  angle += 0.005;
  sunLight.position.x = Math.cos(angle) * 30;
  sunLight.position.z = Math.sin(angle) * 30;

  glassBuilding.rotation.y += 0.005;

  controls.update();
  renderer.render(scene, camera);
}

animate();

// --------------------
// HANDLE RESIZE
// --------------------
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
