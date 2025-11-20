import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
const canvas = document.querySelector('canvas.webgl');
const axesHelper = new THREE.AxesHelper(2);
let sizes ={
    width: window.innerWidth,
    height: window.innerHeight
};
const cl = (input) =>{
    console.log(input);
};
//scene
const scene = new THREE.Scene();
cl(scene)

//resizes
window.addEventListener('resize',() =>{
    //update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(sizes.width,sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
});

//fullscreen
window.addEventListener('dblclick',() =>{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if(!fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen();
        }
        else if(canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen();
        }
    }
    else{
        if(document.exitFullscreen){
            document.exitFullscreen();
        }
        else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }   
    }
});
//   //Float32array 1 version
//   const positionsArray = new Float32Array(9);
//   //first vertex
//   positionsArray[0] = 0;     
//   positionsArray[1] = 0;     
//   positionsArray[2] = 0;     
//   //second vertex
//   positionsArray[3] = 0;     
//   positionsArray[4] = 1;     
//   positionsArray[5] = 0;     
//   //third vertex
//   positionsArray[6] = 1;     
//   positionsArray[7] = 0;     
//   positionsArray[8] = 0;     
//
//   //Float32array 2 version
//   const positionsArray2 = new Float32Array([
//       0,0,0,   //first vertex      
//       0,1,0,   //second vertex
//       1,0,0    //third vertex
//   ])
//   
//   //buferAtribute
//   const positionAttribute = new THREE.BufferAttribute(positionsArray,3);
//   //geometry
//   const geometry = new THREE.BufferGeometry();
//   geometry.setAttribute('position', positionAttribute);

const geometry = new THREE.BufferGeometry();
const count = 50 //numero de triangulos 
const positionArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++){
    positionArray[i] = (Math.random() - 0.5) * 2;
};

const positionAttribute = new THREE.BufferAttribute(positionArray,3);
geometry.setAttribute('position',positionAttribute);
//object
const mesh = new THREE.Mesh(
    //new THREE.BoxGeometry(1,1,1,2,2,2),
    geometry,
    new THREE.MeshBasicMaterial({
        color: 0x00FF00,
        wireframe: true
    })
);
cl(mesh);
//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height,0.01, 200);
camera.position.z = 3;

//orbit controls
const orbitControls = new OrbitControls(camera,canvas);
orbitControls.enableDamping = true;

scene.add(axesHelper);
scene.add(camera);
scene.add(mesh);

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
});
renderer.setSize(sizes.width,sizes.height);

//timer
let time = Date.now()

const tick = () =>{
    const currentTime = Date.now();
    let deltaTime = currentTime - time;
    time = currentTime;

    //orbitcontrols up
    
    orbitControls.update()
    //mesh.rotation.y = 0.003 * currentTime;
    renderer.render(scene,camera);
    requestAnimationFrame(tick);
}

tick();
