import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl');

let sizes = {
    width: 800,
    height: 600
};

//scene
const scene = new THREE.Scene();

//object
const obj1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
    })
);

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
camera.position.z = 3;

//add objects to scene
scene.add(obj1);
scene.add(camera);

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene,camera);