// 기본 설정
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); 
camera.position.z = 3;
camera.lookAt(0, 0.5, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xff0000, 0.8);
directionalLight.position.set(1, 1, 2);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x0000ff, 0.2);
scene.add(ambientLight);

// material
const white = new THREE.MeshStandardMaterial({ color:0xffffff});
const eyeMat = new THREE.MeshStandardMaterial({ color: 0x000000 });

// mesh
const head = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), white);
head.position.y = 1;

const earLeft = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), white);
earLeft.position.set(-0.35, 1.5, 0);

const earRight = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), white);
earRight.position.set(0.35, 1.5, 0);

const eyeLeft = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), eyeMat);
eyeLeft.position.set(-0.15, 1.1, 0.45);

const eyeRight = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), eyeMat);
eyeRight.position.set(0.15, 1.1, 0.45);

const bear = new THREE.Mesh();
bear.add(head, earLeft, earRight, eyeLeft, eyeRight);
bear.position.y = -0.5;
scene.add(bear);

// animate
let angle = 0;
function animate() {
  requestAnimationFrame(animate);
  angle += 0.04;
  head.rotation.y = Math.sin(angle) * 0.3;
  scene.rotation.y = Math.sin(angle) * 0.1;

  // 렌더
  renderer.render(scene, camera);
}
animate();

