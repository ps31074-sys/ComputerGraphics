import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cubeMesh = new THREE.Mesh(geometry, material);
//scene.add(cubeMesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper); //y-green x-red, z-is hidden

//cubeMesh.scale.x = 2;
//cubeMesh.scale.y = 1;
//cubeMesh.scale.z = 0.5;

//Rotation
//cubeMesh.rotation.x = Math.PI * 0.25;
//cubeMesh.rotation.y = Math.PI * 0.25;

//Combining transformations 
cubeMesh.scale.x = 4;
cubeMesh.scale.y = 2;
cubeMesh.rotation.x = Math.PI * 1.5;

function animate() {
  requestAnimationFrame(animate);

  // cubeMesh.rotation.x += 0.01;
  // cubeMesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Cube 2
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // red
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.x = 5; // move it to the right;
//scene.add(cube2);

const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

// Cube
cube1.position.x = 2;
cube1.rotateOnAxis(new THREE.Vector3(0, 1.7, 0), Math.PI * 0.25);
cube1.scale.set(0.8, 1, 1.3);
group.add(cube1);

// Circle
const circle = new THREE.Mesh(
  new THREE.CircleGeometry(0.7, 32),
  new THREE.MeshBasicMaterial({color:0x00ff00})
);
circle.position.x = -2;
circle.scale.set(0.9, 0.7, 0.7);
group.add(circle);

// Triangle
const triangleShape = new THREE.Shape();
triangleShape.moveTo(0, 1);
triangleShape.lineTo(-1, -1);
triangleShape.lineTo(1, -1);
triangleShape.lineTo(0, 1);

const triangleGeometry = new THREE.ShapeGeometry(triangleShape);
const triangle = new THREE.Mesh(
  triangleGeometry,
  new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide
  })
);
triangle.position.x = 0;
triangle.position.z = 0.1;
triangle.scale.set(0.9, 0.5, 0.5);
group.add(triangle);




/*import * as THREE from 'three';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);*/