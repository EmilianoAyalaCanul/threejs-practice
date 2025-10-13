import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
const canvas = document.querySelector('canvas.webgl');
const axesHelper = new THREE.AxesHelper(2);
const sizes ={
    width: 800,
    height: 600
};
//console log
const cl = (input) => {
    console.log(input);
};
//position
const cursor= {
    x: 0,
    y: 0
}

//move the camera
window.addEventListener('mousemove',(event) =>{
    cursor.x = (event.clientX / sizes.width -0.5);
    cursor.y = - (event.clientY / sizes.height -0.5) ;

    cl(cursor.x)
    //cl(cursor.y)
});

//scene
const scene = new THREE.Scene();

//object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0x00fff0,
        wireframe: true
    })
);

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100);

//renderer
const render = new THREE.WebGLRenderer({
    canvas: canvas
});
render.setSize(sizes.width,sizes.height);

//add items to scene
scene.add(camera);
scene.add(axesHelper);
scene.add(mesh);

//position
camera.position.z = 3;

//time
let time = Date.now();

//loop
const tick = () =>{
    //current Time
    const currentTime = Date.now();
    let deltaTime = currentTime - time;
    time = currentTime;
    //animation
    //mesh.rotation.y +=  0.001 * deltaTime;
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    camera.position.y = cursor.y * 3;
    camera.lookAt(mesh.position);
    render.render(scene,camera);
    requestAnimationFrame(tick);
}
tick();
