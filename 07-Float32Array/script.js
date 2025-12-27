import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//Axes Helper
const axesHelper = new THREE.AxesHelper(2);

//canvas
const canvas = document.querySelector('canvas.webgl');

//bounds sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,200);
camera.position.z = 3;

//object Float Array positions
const positions = new Float32Array([
    //front face
    1,1,1,
    1,2,1,
    2,1,1,
    
    2,1,1,
    2,2,1,
    1,2,1,

    //left face
    1,1,1,
    1,2,1,
    1,1,0,

    1,1,0,
    1,2,0,
    1,2,1,

    //right face
    2,1,1,
    2,2,1,
    2,1,0,

    2,2,1,
    2,2,0,
    2,1,0,

    //back Face
    1,1,0,
    1,2,0,
    2,1,0,

    2,1,0,
    2,2,0,
    1,2,0,

    //top facce
    1,2,1,
    1,2,0,
    2,2,1,

    2,2,1,
    2,2,0,
    1,2,0,

    //bottom face
    1,1,1,
    1,1,0,
    2,1,1,

    2,1,1,
    2,1,0,
    1,1,0
]);

//object Buffer Attribute
const positionsAttribute = new THREE.BufferAttribute(positions,3);

//object geometry and method
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position',positionsAttribute);

//object Material
const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

//object
const object = new THREE.Mesh(geometry,material);


//add items in the scene
scene.add(axesHelper);
scene.add(camera);
scene.add(object);

//render
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width,sizes.height);


//Orbit Controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true


//timer 
let time = Date.now()

//render function
const click = () =>{
    //timer
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime

    //orbit Controls Update
    controls.update()

    //renderer
    renderer.render(scene,camera);

    //loop
    requestAnimationFrame(click);
};

click();