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
const debug_object = {}

/*Groups Geometries*/
//planet
const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1,32,16),
    new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true})
);

//translate parameters
debug_object.traslateValue = true;
debug_object.traslatePosition = 0;
//transalate parameters
const traslation = (value) => {
    if(value && (debug_object.traslatePosition <= 2 * Math.PI)){
        debug_object.traslatePosition += 0.01
    }
    else{
        debug_object.traslatePosition = 0;
    }
}

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
scene.add(planet);
scene.add(camera);

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

    -rotation with the new method
    planet.position.x = Math.cos(debug_object.traslatePosition) * 3
    planet.position.z = Math.sin(debug_object.traslatePosition) * 3

*/

//loop
const tick = () =>{
    //control time
    const currentTime = Date.now();
    let deltaTime = currentTime - time;
    time = currentTime;

    //The traslation method to initialize it is only called once.
    traslation(debug_object.traslateValue)
     

    //rotation
    planet.rotation.y += 0.001 * deltaTime;

    orbitControls.update(); //update orbit controls
    renderer.render(scene,camera); //render
    requestAnimationFrame(tick); //call loop
}

tick();