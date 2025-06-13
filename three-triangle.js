const scene = new THREE.Scene(); // scene 생성 : 장면을 구성하는 객체들을 담는 컨테이너
const camera = new THREE.PerspectiveCamera(); // camera 생성 : 장면을 볼 수 있는 시점을 정의
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(400, 400);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry(); // BufferGeometry 생성 : 정점 데이터를 효율적으로 저장하고 관리하는 객체
const vertices = new Float32Array([ // 삼각형의 정점 좌표
    0.0,  0.4, 0.0,
   -0.4, -0.4, 0.0,
    0.4, -0.4, 0.0,
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)); // position 속성에 정점 데이터를 설정

const material = new THREE.MeshBasicMaterial({ // MeshBasicMaterial 생성 : 기본적인 재질로, 조명 효과 없이 색상만 적용
    color: 0xff0000,
    side: THREE.DoubleSide
});

const triangle = new THREE.Mesh(geometry, material); // Mesh 생성 : geometry와 material을 결합하여 3D 객체를 만듦
scene.add(triangle); // 장면에 삼각형 추가

renderer.render(scene, camera);

