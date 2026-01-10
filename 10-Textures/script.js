import * as THREE from 'three'
import GUI from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/Addons.js'  

/**
 * import a image width import
 * import imageSource from './textures/door/color.jpg'
 * console.log(imageSource)
 */

//canvas
const canvas = document.querySelector('canvas.webgl')

//bound sizes
const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * --import image with native js
 * const image = new Image()
 * 
 * const texture_box = new THREE.Texture(image)
 * texture_box.colorSpace = THREE.SRGBColorSpace
 * 
 * image.onload = () =>{
 *     texture_box.needsUpdate = true
 *     console.log('image loaded')
 * }
 * image.src = '/textures/door/color.jpg'
 */

//import texture with Threejs and loading manager
const lodingManager = new THREE.LoadingManager()

lodingManager.onStart = () =>{
    console.log('onStart')
}

lodingManager.onLoad = () =>{
    console.log('onLoad')
}

lodingManager.onProgress = () =>{
    console.log('onProgress')
}

lodingManager.onError = () =>{
    console.log('onError')
}

//import texture with Threejs and loading manager
const textureLoader = new THREE.TextureLoader(lodingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
colorTexture.colorSpace = THREE.SRGBColorSpace

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
alphaTexture.colorSpace = THREE.SRGBColorSpace

const heightTexture = textureLoader.load('/textures/door/height.jpg')
heightTexture.colorSpace = THREE.SRGBColorSpace

//texture transform
//colorTexture.repeat.x = 2
//colorTexture.repeat.y = 3

//colorTexture.wrapS = THREE.MirroredRepeatWrapping
//colorTexture.wrapT = THREE.MirroredRepeatWrapping

//colorTexture.offset.x = 0.5
//colorTexture.offset.y = 0.5

colorTexture.rotation = Math.PI / 4
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5

//object axes helper
const axesHelper = new THREE.AxesHelper(2)

//object 01 box
const box_geometry = new THREE.BoxGeometry(1,1,1)
const box_material = new THREE.MeshBasicMaterial({map: colorTexture})
const Box_object = new THREE.Mesh(box_geometry,box_material)
//console.log(box_geometry.attributes.uv)

//Debug Grafic User Interface (GUI)
const gui = new GUI({
    title: 'Debug User Interface',
    width: 300,
})

//object gui
const object_gui = {}

//box gui
const box_gui = gui.addFolder('Box Item')
box_gui
    .add(Box_object,'visible')

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,200)
camera.position.z = 2

//camera rezises
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//orbitcontrols
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

//scene
const scene = new THREE.Scene()

scene
    .add(camera)
    .add(Box_object)
    .add(axesHelper)

//renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)

//timer control fps
let time = Date.now()

//loop
const loop = () =>{

    //timer control fps
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    //controls update
    controls.update()

    //renderer
    renderer.render(scene,camera)

    //recall loop
    requestAnimationFrame(loop)
}

loop()