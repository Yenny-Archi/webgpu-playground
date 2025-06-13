const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

// 버텍스 셰이더
const vsSource = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
  }
`;

// 프래그먼트 셰이더
const fsSource = `
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);  // 빨간색
  }
`;

// 셰이더를 만드는 유틸 함수
function createShader(gl, type, source) {
  const shader = gl.createShader(type); // 1. 셰이더 객체 생성
  gl.shaderSource(shader, source); // 2. GLSL 코드 문자열 전달
  gl.compileShader(shader);  // 3. 컴파일(GPU가 실행 가능한 형태로)
  return shader;
}

const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

const program = gl.createProgram(); // 프로그램 객체 생성
gl.attachShader(program, vs); // 만든 셰이더를 프로그램에 연결
gl.attachShader(program, fs);
gl.linkProgram(program); // 두 셰이더를 묶어서 하나의 프로그램으로 연결
gl.useProgram(program); // 이후의 그리기 연산은 이 프로그램을 사용함

// 버퍼 생성
const vertices = new Float32Array([
  0.0,  0.5,
 -0.5, -0.5,
  0.5, -0.5
]);

const buffer = gl.createBuffer(); // GPU에 버퍼 생성 
gl.bindBuffer(gl.ARRAY_BUFFER, buffer); // ARRAY_BUFFER에 이 버퍼를 바인딩 (현재 작업 대상 설정)
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); // 데이터(정점들)를 GPU에 업로드

// a_Position 연결
const position = gl.getAttribLocation(program, 'a_Position'); // GLSL 셰이더 안의 a_Position 변수의 위치(ID)를 얻음
gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0); // 정점 데이터가 어떻게 구성됐는지 설명 (2D float, 정렬 등)
gl.enableVertexAttribArray(position); // 해당 속성을 GPU가 사용하도록 활성화

gl.clearColor(0, 0, 0, 1); // 배경색 설정 (검정색)
gl.clear(gl.COLOR_BUFFER_BIT); // 색 버퍼 클리어
gl.drawArrays(gl.TRIANGLES, 0, 3); // 삼각형 하나 그림
