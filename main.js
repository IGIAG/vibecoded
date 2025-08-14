let scene, camera, renderer, fish;

init();
animate();

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // light sky blue

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 2, 5);
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(5, 10, 7);
  scene.add(directional);

  // Fish material
  const material = new THREE.MeshStandardMaterial({
    color: 0xffa500,
    metalness: 0.2,
    roughness: 0.7,
  });

  // Body (elongated sphere)
  const bodyGeom = new THREE.SphereGeometry(1, 32, 32);
  const body = new THREE.Mesh(bodyGeom, material);
  body.scale.set(1.5, 1, 1); // make it fish‑shaped

  // Tail (cone)
  const tailGeom = new THREE.ConeGeometry(0.5, 1, 32);
  const tail = new THREE.Mesh(tailGeom, material);
  tail.position.set(-1.5, 0, 0);
  tail.rotation.z = Math.PI; // point backwards

  // Fins (small cones)
  const finGeom = new THREE.ConeGeometry(0.2, 0.6, 32);
  const leftFin = new THREE.Mesh(finGeom, material);
  leftFin.position.set(0, 0, 0.8);
  leftFin.rotation.x = Math.PI / 2;
  leftFin.rotation.z = Math.PI / 4;

  const rightFin = leftFin.clone();
  rightFin.position.set(0, 0, -0.8);
  rightFin.rotation.z = -Math.PI / 4;

  // Assemble fish
  fish = new THREE.Group();
  fish.add(body);
  fish.add(tail);
  fish.add(leftFin);
  fish.add(rightFin);
  scene.add(fish);

  // Handle window resize
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  // Spin the fish slowly around its Y‑axis
  fish.rotation.y += 0.01;
  renderer.render(scene, camera);
}
