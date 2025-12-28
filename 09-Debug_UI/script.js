/*
 * Debug User Interface by Emiliano Ayala Canul 🚀
 */

import * as THREE from 'three'                                      //<- Threejs
import GUI from 'lil-gui'                                           //<- Debug UI
import { OrbitControls } from 'three/examples/jsm/Addons.js'        //<- Controls
import { update } from 'three/examples/jsm/libs/tween.module.js'

//axes Helper (M)
const axesHelper = new THREE.AxesHelper(2.8)

//Bound Sizes (A)
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Debug User Interface (B)
const gui = new GUI({
    title: 'Debug User Interface ⚙️',
    //width: 350,
    //closeFolders: true
})

//debug User Interface Hiden (B)
//gui.hide()

//debug buffer storage (B)
const debug_object = {}

//debug key to show (B)
window.addEventListener('keydown',(event) =>{
    if(event.key == 'Delete'){
        gui.show(gui._hidden)
    }
})

//Canvas 
const canvas = document.querySelector('canvas.webgl')

//scene (C)
const scene = new THREE.Scene()

//camera (D)
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height,0.1,200)
camera.position.z = 7.8

//Rezise Viewport (A)
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

//Texture Loader (K)
const textureLoader = new THREE.TextureLoader()

//Earth Texture (L)
const earth_texture = textureLoader.load('/textures/earthmap.jpg')
earth_texture.colorSpace = THREE.SRGBColorSpace

//Wood Texture (O)
const wood_texture = textureLoader.load('/textures/woodmap.jpg')
wood_texture.colorSpace = THREE.SRGBColorSpace

//Rubik Texture (P)
const rubik_texture = textureLoader.load('/textures/Rubikmap.jpg')
rubik_texture.colorSpace = THREE.SRGBColorSpace

//Objects (J) 
//Earth Object (J),(L)
const earth_geometry = new THREE.SphereGeometry(2,32,32)
const earth_material = new THREE.MeshBasicMaterial({map: earth_texture})
const earth_object = new THREE.Mesh(earth_geometry,earth_material)
earth_object.visible = false

//Wood Object (J),(O)
const wood_geometry = new THREE.BoxGeometry(2,2,2)
const wood_material = new THREE.MeshBasicMaterial({map: wood_texture})
const wood_object = new THREE.Mesh(wood_geometry,wood_material)
wood_object.visible = false

//Rubik Object (J),(P)
const rubik_geometry = new THREE.BoxGeometry(2,2,2)
const rubik_material = new THREE.MeshBasicMaterial({map: rubik_texture})
const rubik_object = new THREE.Mesh(rubik_geometry,rubik_material)
rubik_object.visible = false

//Trigger Animation Earth Rotation (B),(L)
debug_object.earth_rotation = false

//Trigger Animation Earth Traslation (B),(L)
debug_object.earth_traslation = false

//Folders Debug User Interface (B)
//Earth Debug User Interface (B),(L)
const earth_debugUI = gui.addFolder('Earth 🌎')
earth_debugUI
    .add(earth_object,'visible')
    .name('Visibility 👁️')
earth_debugUI
    .add(debug_object,'earth_rotation')
    .name('Earth Rotation 🔄')
earth_debugUI
    .add(debug_object,'earth_traslation')
    .name('Earth Transition 🔃')

//Wood Debug User Interface (B),(O)
const wood_debugUI = gui.addFolder('wood 🌳')
wood_debugUI.close()
wood_debugUI
    .add(wood_object,'visible')
wood_debugUI
    .add(wood_object.rotation,'x')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Rotate on X-axis')
wood_debugUI
    .add(wood_object.rotation,'y')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Rotate on Y-axis')
wood_debugUI
    .add(wood_object.rotation,'z')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Rotate on Z-axis')
wood_debugUI
    .add(wood_object.position,'x')
    .min(-5)
    .max(5)
    .step(0.01)
    .name('Move on X-axis')
wood_debugUI
    .add(wood_object.position,'y')
    .min(-5)
    .max(5)
    .step(0.01)
    .name('Move on Y-axis')
wood_debugUI
    .add(wood_object.position,'z')
    .min(-5)
    .max(5)
    .step(0.01)
    .name('Move on Z-axis')
//Wood Normalize method (O)
debug_object.normalize = () =>{
    wood_object.rotation.set(0,0,0)
    wood_object.position.set(0,0,0)
}
wood_debugUI
    .add(debug_object,'normalize')
    .name('RESET PARAMETERS')

//Rubik Debug User Interface (B),(P)
const rubik_DebugUI = gui.addFolder('Rubik 🧊')
rubik_DebugUI.close()
rubik_DebugUI
    .add(rubik_object,'visible')
rubik_DebugUI
    .add(rubik_object.rotation,'x')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Rotate on X-axis')
rubik_DebugUI
    .add(rubik_object.rotation,'y')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Rotate on Y-axis')
rubik_DebugUI
    .add(rubik_object.rotation,'z')
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name('Rotate on Z-axis')
rubik_DebugUI
    .add(rubik_object.position,'x')
    .min(-5)
    .max(5)
    .step(0.01)
    .name('Move on X-axis')
rubik_DebugUI
    .add(rubik_object.position,'y')
    .min(-5)
    .max(5)
    .step(0.01)
    .name('Move on Y-axis')
rubik_DebugUI
    .add(rubik_object.position,'z')
    .min(-5)
    .max(5)
    .step(0.01)
    .name('Move on Z-axis')
//Rubik Normalize method (O)
debug_object.normalizeRubik = () =>{
    rubik_object.rotation.set(0,0,0)
    rubik_object.position.set(0,0,0)
}
rubik_DebugUI
    .add(debug_object,'normalizeRubik')
    .name('RESET PARAMETERS')


//add scene (C)
scene
    .add(axesHelper) //(M)
    .add(camera) //(D)
    .add(earth_object) //(L)
    .add(wood_object) //(O)
    .add(rubik_object) //(P)

//renderer (F)
const renderer = new THREE.WebGLRenderer({canvas:canvas})
renderer.setSize(sizes.width,sizes.height)

//Controller FPS (G)
let time = Date.now()

//Orbit Controls (I)
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

//orbital Rotation Count (N)
let elapsedtime = 0;

//loop method (H)
const loop = () =>{
    //Delta Time and Current Time (G)
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    //Orbit Controls Update (I)
    controls.update()

    //Orbital Count (N)
    elapsedtime += 0.01;

    //Earth Rotation Animation (L)
    if (debug_object.earth_rotation) {
        earth_object.rotation.y += deltaTime * 0.0006
    }

    //Earth Traslation Animation (L)
    if (debug_object.earth_traslation) {
        earth_object.position.x = Math.cos(elapsedtime) * 5;
        earth_object.position.z = Math.sin(elapsedtime) * 5;
    } else {
        earth_object.position.x = 0
        earth_object.position.z = 0
    }

    /**
     * in development
     * //function to only display one object
     *  if(earth_object.visible){
     *      wood_object.visible = false
     *      rubik_object.visible = false
     *  }else if(wood_object.visible){
     *      earth_object.visible = false
     *      rubik_object.visible = false
     *  }else if(rubik_object.visible){
     *      earth_object.visible = false
     *      wood_object.visible = false
     *  }else {}
     *
    */

    //Renderer render (F)
    renderer.render(scene,camera)

    //Request frame
    requestAnimationFrame(loop)
}

//call loop (H)
loop()