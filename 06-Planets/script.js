import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui' //debug menu
const canvas = document.querySelector('canvas.webgl'); //canvas
const axesHelper = new THREE.AxesHelper(2); //axes Helper
//printer
const cl = (input) =>{
    console.log(input);
};

//sizes viewport
let sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//scene
const scene = new THREE.Scene();

//debug GUI
const gui = new GUI({
    title: 'Controls',
    width: 340
})
const debug_object = {
    //earth group
    //earth value
    earth_value: 0,
    earth_increment: 0.01,
    earth_distance: 3,
}

//textures
const textureLoader = new THREE.TextureLoader()

//earth group textures
const earth_planet_texture = textureLoader.load('/textures/earthmap.jpg')
earth_planet_texture.colorSpace = THREE.SRGBColorSpace

//moon group textures
const moon_planet_texture = textureLoader.load('/textures/MoonMap.jpg')
moon_planet_texture.colorSpace = THREE.SRGBColorSpace

/*Groups Geometries*/
//moon group
const moon_planet_geometry = new THREE.SphereGeometry(0.2,32,16)
const moon_planet_material = new THREE.MeshBasicMaterial({map: moon_planet_texture})
const moon_planet = new THREE.Mesh(moon_planet_geometry,moon_planet_material)

//earth group
const earth_group = new THREE.Group()
const earth_planet_geometry = new THREE.SphereGeometry(1,32,16)
const earth_planet_material = new THREE.MeshBasicMaterial({map: earth_planet_texture})
const earth_planet = new THREE.Mesh(earth_planet_geometry,earth_planet_material)
earth_group.add(earth_planet)
earth_group.add(moon_planet)

//translate parameters
debug_object.traslateValue = true;

//debug gui folders
const gui_planets = gui.addFolder('Planets')

//debug gui planets earth group
const gui_planets_earth_group = gui_planets.addFolder('Earth Group')
//debug gui planets earth planet
const gui_planets_earth_group_earth = gui_planets_earth_group.addFolder('Earth')
gui_planets_earth_group_earth
    .add(debug_object,'earth_increment')
    .name('Orbital Speed')
    .min(-0.3)
    .max(0.3)
    .step(0.01)
gui_planets_earth_group_earth
    .add(debug_object,'earth_distance')
    .name('Orbital Radious')
    .min(0)
    .max(10)
    .step(1)

//trigger option
gui_planets
    .add(debug_object,'traslateValue')
    .name('Translation Toggle')

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.01,200);
camera.position.z = 5; //camera inital position

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

//add scene
scene.add(axesHelper);
scene.add(camera);
scene.add(earth_group)

//orbit controls
const orbitControls = new OrbitControls(camera,canvas);
orbitControls.enableDamping = true;
//renderer
const renderer = new THREE.WebGLRenderer({canvas : canvas});
renderer.setSize(sizes.width,sizes.height);

//timer
let time = Date.now()

/*
out tick method
    -orbital Rotation Count simple
    let elapsedtime = 0;

inside tick method
    -Orbital Count
    elapsedtime += 0.01;

    -orbital behavior
    planet.position.x = Math.cos(elapsedtime) * 3;
    planet.position.z = Math.sin(elapsedtime) * 3;


Traslation method 
    if(debug_object.traslateValue && (debug_object.earth_value <= 2 * Math.PI)){
        debug_object.earth_value += debug_object.earth_increment
        console.log(debug_object.earth_value)
    }
    else{
        debug_object.earth_value = 0;
    }
    -rotation with the new method
    planet.position.x = Math.cos(debug_object.traslatePosition) * 3
    planet.position.z = Math.sin(debug_object.traslatePosition) * 3
    ...
*/

//translation method
const orbita = (trigger, debug, valueKey, incrementKey) => {
    if (trigger && debug[valueKey] <= 2 * Math.PI) {
        debug[valueKey] += debug[incrementKey]
    } else {
        debug[valueKey] = 0
    }
}
moon_planet.position.x = 5

//loop
const tick = () =>{
    //control time
    const currentTime = Date.now();
    let deltaTime = currentTime - time;
    time = currentTime;

    //translation method
    orbita(debug_object.traslateValue,debug_object,'earth_value','earth_increment')
    orbita(debug_object.traslateValue,debug_object,'moon_value','moon_increment')

    //earth_parameters_translation
    earth_group.position.x = Math.cos(debug_object.earth_value) * debug_object.earth_distance
    earth_group.position.z = Math.sin(debug_object.earth_value) * debug_object.earth_distance

    orbitControls.update(); //update orbit controls
    renderer.render(scene,camera); //render
    requestAnimationFrame(tick); //call loop
}

tick();