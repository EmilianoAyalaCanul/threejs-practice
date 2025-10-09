import * as THREE from 'three'
const canvas = document.querySelector('canvas.webgl');
const axeshelper = new THREE.AxesHelper(2);
let sizes = {
    width: 800,
    height: 600
};

//console log
const cl = (input) =>{
    console.log(input);
};

//scene
const scene = new THREE.Scene();

//objects (b = box) + (n = number)
const b1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0xf0f000,
        wireframe: true
    })
);

const b2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
    })
);

const b3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        wireframe: true
    })
);

const b4 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true
    })
);

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);

//add at scene
scene.add(axeshelper);
scene.add(camera);
scene.add(b1);
scene.add(b2);
scene.add(b3);
scene.add(b4);

//position
b1.position.set(-4,0,0);
b2.position.set(-2,0,0);
b3.position.set(0,0,0);
b4.position.set(2,0,0);
camera.position.set(0,1,5);

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width,sizes.height);

//time
let time = Date.now();

//flag
let flag = 1;


const tick = () =>{
    //time current
    const timeCurrent = Date.now();
    //delta
    const deltaTime = timeCurrent - time;
    time = timeCurrent;
    //obj position
    const b1p = b1.position.x;
    const b2p = b2.position.z;
    const b3p = b3.position.y;
    const b4p = b4.position.x;
    
    //animation
    if(flag === 1){
        camera.lookAt(b4.position);
        b4.position.x += 0.001 * deltaTime;  
        b4.rotation.z -= 0.002 * deltaTime;
        cl(flag)
    };
    if(b4p > 6){
        flag = 2;
        b4.position.x = 2
        b4.rotation.z = 0
        cl(flag)
    }
    if(flag === 2){
        camera.lookAt(b3.position);
        b3.position.y += 0.001 * deltaTime;
        b3.rotation.x -= 0.002 * deltaTime;
        cl(flag)       
    }
    if(b3p > 4){
        flag = 3;
        b3.position.y = 0;
        b3.rotation.x = 0
        cl(flag);
    }
    if(flag === 3){
        camera.lookAt(b2.position);
        b2.position.z -= 0.001 * deltaTime;
        b2.rotation.x -= 0.002 * deltaTime;
        cl(flag);
    }
    if(b2p < -4){
        flag = 4
        b2.position.z = 0;
        b2.rotation.x = 0;
        cl(flag)
    }
    if(flag === 4){
        camera.lookAt(b1.position);
        b1.position.x -= 0.001 * deltaTime;
        b1.rotation.z += 0.002 * deltaTime;
        cl(flag)
    }
    if(b1p < -8){
        flag = 1;
        b1.rotation.z = 0;
        b1.position.x = -4;
    }
    renderer.render(scene,camera);
    //request
    requestAnimationFrame(tick);
};

tick();
