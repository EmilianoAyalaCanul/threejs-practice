import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
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

/*Groups Geometries*/
//planet
const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1,32,16),
    new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true})
);

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.01,200);
camera.position.z = 5; //camera inital position

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

//orbital Rotation Count
let elapsedtime = 0;

//loop
const tick = () =>{
    //control time
    const currentTime = Date.now();
    let deltaTime = currentTime - time;
    time = currentTime;

    //Orbital Count
    elapsedtime += 0.01;

    //rotation
    planet.rotation.y += 0.001 * deltaTime;

    /*orbital behavior
    //planet.position.x = Math.cos(elapsedtime) * 3;
    //planet.position.z = Math.sin(elapsedtime) * 3;
    */
    orbitControls.update(); //update orbit controls
    renderer.render(scene,camera); //render
    requestAnimationFrame(tick); //call loop
}

tick();