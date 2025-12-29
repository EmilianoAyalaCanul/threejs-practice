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
    title: 'Debug Gui'
})

//gui object
const object_gui={}

const sphere_gui = gui.addFolder('Moon GUI')


//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,200)
camera.position.z = 5

//scene
const scene = new THREE.Scene()
scene
    .add(camera)
    .add(axesHelper)
    .add(sphere_item)

//render
const renderer = new THREE.WebGLRenderer({canvas:canvas})
renderer.setSize(sizes.width,sizes.height)


const loop = () =>{

    //render
    renderer.render(scene,camera)
    //loop
    requestAnimationFrame(loop)
}

loop()