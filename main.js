import './style.css'

import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'

import { GLTFLoader } from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/GLTFLoader'






const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(60);

renderer.render(scene,camera);

const earthTexture = new THREE.TextureLoader().load('2560px-Large_World_Topo_Map_2.png')
var rocket;
const loader = new GLTFLoader();
loader.load(
	'scene.gltf',
	( gltf ) => {
		// called when the resource is loaded
    rocket = gltf.scene;
		scene.add( rocket );
    
    rocket.scale.set(100,100,100)
    // rocket.rotation.z = 0
    // rocket.rotation.x =0
     //rocket.rotation.y =0
    rocket.rotation.z = 0.4
    rocket.rotation.x =1.4
    rocket.rotation.y =1
    rocket.position.z = 0
    rocket.position.x = -10
	},
	( xhr ) => {
		// called while loading is progressing
		console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
	},
	( error ) => {
		// called when loading has errors
		console.error( 'An error happened', error );
	},
);







const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(10,40,40),
  new THREE.MeshToonMaterial( {
    map: earthTexture,
    //normalMap: densityTexture
  })
);

scene.add(sphere);
sphere.position.x = 0;
sphere.position.z = -20
sphere.rotation.y = 20


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,0,1000);


scene.add(pointLight);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshToonMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(2000).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('335-outer-space.jpg');
scene.background = spaceTexture;

const willTexture = new THREE.TextureLoader().load('1634155657220.jpg');

const will = new THREE.Mesh(
  new THREE.BoxGeometry(6,6,6),
  new THREE.MeshToonMaterial( {map: willTexture})
);
scene.add(will);

will.position.z = 580;
will.position.x = 28;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;



  camera.position.z = t * -0.1;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * 0.00006;
  
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);

  //sphere.rotation.x += 0.001;
  sphere.rotation.y += 0.001;
  //sphere.rotation.z += 0.001;
  will.rotation.y += 0.008;
  will.rotation.z += 0.008;
 
  rocket.rotateY(.006);
  rocket.position.z += 0.05;
  rocket.position.x += 0.0002;
  rocket.rotation.y += 0.00006;
  
  

  renderer.render(scene,camera);
}

animate();
