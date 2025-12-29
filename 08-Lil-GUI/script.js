import * as THREE from 'three'
import GUI from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

//canvas
const canvas = document.querySelector('canvas.webgl')

//Bound Sizes
const sizes= {
    width: window.innerWidth,
    height: window.innerHeight
}

//axes helper
const axesHelper = new THREE.AxesHelper(2)

//textures
const texture_loader = new THREE.TextureLoader()

const sphere_texture = texture_loader.load('/img/MoonMap.jpg')
sphere_texture.colorSpace = THREE.SRGBColorSpace

//objects
const sphere_geometry = new THREE.SphereGeometry(1,32,16)
const sphere_material = new THREE.MeshBasicMaterial({map:sphere_texture})
const sphere_item = new THREE.Mesh(sphere_geometry,sphere_material)

//Gui
const gui = new GUI({
    title: 'Debug Gui',
    width: 340
})

//gui object
const object_gui={}

const sphere_gui = gui.addFolder('Moon GUI')
//nested folder positions
const sphere_gui_positions = sphere_gui.addFolder('Movements On The Axes')
sphere_gui_positions.close()
sphere_gui_positions
    .add(sphere_item.position,'x')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Movement Along The X-Axis')
sphere_gui_positions
    .add(sphere_item.position,'y')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Movement Along The Y-Axis')
sphere_gui_positions
    .add(sphere_item.position,'z')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Movement Along The Z-Axis')

//nested folder rotations
const sphere_gui_rotations = sphere_gui.addFolder('Rotation On the Axes')
sphere_gui_rotations.close()
sphere_gui_rotations
    .add(sphere_item.rotation,'x')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Rotation On X-Axis')
sphere_gui_rotations
    .add(sphere_item.rotation,'y')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Rotation on Y-Axis')
sphere_gui_rotations
    .add(sphere_item.rotation,'z')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Rotation on Z-Axis')

object_gui.resetParameters = () =>{
    sphere_item.position.set(0,0,0)
    sphere_item.rotation.set(0,0,0)
}

sphere_gui.add(object_gui,'resetParameters')
    .name('Reset Parameters')



//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,200)
camera.position.z = 5

//responsive viewport
window.addEventListener('resize', ()=>{
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera aspect
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update render
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

//scene
const scene = new THREE.Scene()
scene
    .add(camera)
    .add(axesHelper)
    .add(sphere_item)

//render
const renderer = new THREE.WebGLRenderer({canvas:canvas})
renderer.setSize(sizes.width,sizes.height)

//timer
let time = Date.now()

const loop = () =>{
    //timer
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    //render
    renderer.render(scene,camera)
    //loop
    requestAnimationFrame(loop)
}

loop()