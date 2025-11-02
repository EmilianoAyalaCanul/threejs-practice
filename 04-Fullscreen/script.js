import * as TRHEE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js' 
const canvas = document.querySelector('canvas.webgl');
const axesHelper = new TRHEE.AxesHelper(2);
let sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

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

const cl = (input) =>{
    console.log(input);
};

const scene = new TRHEE.Scene();

const mesh = new TRHEE.Mesh(
    new TRHEE.BoxGeometry(1,1,1),
    new TRHEE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
    })
);

const camera = new TRHEE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100);

const renderer = new TRHEE.WebGLRenderer({
    canvas:canvas
});

renderer.setSize(sizes.width,sizes.height);

scene.add(axesHelper);
scene.add(mesh);
scene.add(camera);

camera.position.z = 3;
const controls = new OrbitControls(camera,canvas);
//controls.enabled = false;
controls.enableDamping = true;


const tick = () => {
    renderer.render(scene,camera);
    controls.update()
    requestAnimationFrame(tick);
}

tick();