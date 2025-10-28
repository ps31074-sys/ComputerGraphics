import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const gui = new GUI()

// Scene
const scene = new THREE.Scene()

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.0)
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3)
directionalLight.castShadow = true
directionalLight.position.set(2, 2, -1)
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001)
scene.add(directionalLight)

// Spot Light
const spotLight = new THREE.SpotLight(0xffffff, 2, 10, Math.PI * 0.3)
spotLight.castShadow = true
spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.castShadow = true
pointLight.position.set(-1, 1, 0)
scene.add(pointLight)

// Material
const material = new THREE.MeshStandardMaterial({ roughness: 0.7 })
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

// Sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true
scene.add(sphere)

// Plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.receiveShadow = true
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.5
scene.add(plane)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 2)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true }) // typo fixed
renderer.shadowMap.enabled = true
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// Controls
const controls = new OrbitControls(camera, renderer.domElement) // fixed import usage
controls.enableDamping = true

// Resize handler
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Clock
const clock = new THREE.Clock()

// Animation loop
function tick() {
    const elapsedTime = clock.getElapsedTime()

    // Animate sphere
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3)) // fixed typo: Math.abss -> Math.abs
    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.z = Math.sin(elapsedTime) * 1.5

    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
}

tick()
