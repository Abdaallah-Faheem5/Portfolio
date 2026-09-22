import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// Self-contained: canvas-drawn screen/keyboard textures only, no external model/texture requests.
// Requires three >= r152 (ships RoundedBoxGeometry under three/addons).
export function createHeroLaptop(host, { name, location }) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' });
  if (!context) return null;

  const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  camera.position.set(0, 3.6, 9.2);
  camera.lookAt(0, 0.9, 0);

  scene.add(new THREE.HemisphereLight(0xe8ecf5, 0x1a1712, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 4);
  key.position.set(-4, 6, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd4af37, 2.8);
  rim.position.set(5, 3, -4);
  scene.add(rim);

  const resources = new Set();
  const keep = (resource) => { resources.add(resource); return resource; };

  const metal = keep(new THREE.MeshStandardMaterial({ color: 0x55565a, metalness: 0.85, roughness: 0.32 }));
  const edgeMat = keep(new THREE.MeshStandardMaterial({ color: 0x76777c, metalness: 0.9, roughness: 0.24 }));
  const dark = keep(new THREE.MeshStandardMaterial({ color: 0x0c0d0f, metalness: 0.25, roughness: 0.5 }));
  const rubber = keep(new THREE.MeshStandardMaterial({ color: 0x060606, roughness: 0.9 }));
  const gold = keep(new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.7, roughness: 0.35 }));

  const laptop = new THREE.Group();
  laptop.scale.setScalar(0.8);
  laptop.rotation.y = -0.3;
  scene.add(laptop);

  const mesh = (parent, size, position, material, radius = 0.035) => {
    const item = new THREE.Mesh(keep(new RoundedBoxGeometry(...size, 3, radius)), material);
    item.position.set(...position);
    item.castShadow = true;
    item.receiveShadow = true;
    parent.add(item);
    return item;
  };

  // Base / deck
  mesh(laptop, [4.8, 0.16, 3.1], [0, 0, 0], metal, 0.07);
  mesh(laptop, [4.72, 0.025, 3.02], [0, 0.084, 0], edgeMat, 0.012);
  mesh(laptop, [3.86, 0.018, 1.64], [0, 0.106, -0.49], dark, 0.008);
  mesh(laptop, [1.7, 0.012, 0.75], [0, 0.108, 0.93], dark, 0.006);
  mesh(laptop, [1.675, 0.016, 0.725], [0, 0.116, 0.93], metal, 0.008);
  mesh(laptop, [0.45, 0.02, 0.022], [0, 0.066, 1.54], gold, 0.01);

  for (const side of [-1, 1]) {
    for (const z of [-1.16, 1.16]) mesh(laptop, [0.5, 0.025, 0.12], [side * 1.7, -0.091, z], rubber, 0.012);
  }

  // Keyboard — instanced key caps + a canvas legend texture laid flat over them
  const keys = [];
  const rows = ['1 2 3 4 5 6 7 8 9 0 - =', 'Q W E R T Y U I O P [ ]', "A S D F G H J K L ; '", 'Z X C V B N M , . /'];
  rows.forEach((row, r) => row.split(' ').forEach((label, c) => {
    keys.push({ x: (c - 5.5) * 0.306, z: -1.095 + r * 0.29, width: 0.266, label });
  }));
  keys.push(
    { x: -1.32, z: 0.065, width: 0.3, label: 'ctrl' },
    { x: -0.95, z: 0.065, width: 0.32, label: 'alt' },
    { x: 0, z: 0.065, width: 1.45, label: '' },
    { x: 0.99, z: 0.065, width: 0.34, label: 'alt' },
  );

  const capGeometry = keep(new RoundedBoxGeometry(1, 0.045, 0.245, 2, 0.018));
  const caps = new THREE.InstancedMesh(capGeometry, dark, keys.length);
  caps.castShadow = true;
  const dummy = new THREE.Object3D();
  keys.forEach((k, i) => {
    dummy.position.set(k.x, 0.139, k.z);
    dummy.scale.set(k.width, 1, 1);
    dummy.updateMatrix();
    caps.setMatrixAt(i, dummy.matrix);
  });
  laptop.add(caps);

  const legendCanvas = document.createElement('canvas');
  legendCanvas.width = 1024; legendCanvas.height = 440;
  const legendCtx = legendCanvas.getContext('2d');
  legendCtx.fillStyle = '#c9c2a6';
  legendCtx.textAlign = 'center';
  legendCtx.textBaseline = 'middle';
  legendCtx.font = '22px monospace';
  keys.forEach((k) => legendCtx.fillText(k.label, (k.x / 3.86 + 0.5) * 1024, ((k.z + 0.49) / 1.64 + 0.5) * 440));
  const legendTexture = keep(new THREE.CanvasTexture(legendCanvas));
  legendTexture.colorSpace = THREE.SRGBColorSpace;
  const labels = new THREE.Mesh(
    keep(new THREE.PlaneGeometry(3.86, 1.64)),
    keep(new THREE.MeshBasicMaterial({ map: legendTexture, transparent: true, depthWrite: false, toneMapped: false })),
  );
  labels.rotation.x = -Math.PI / 2;
  labels.position.set(0, 0.164, -0.49);
  laptop.add(labels);

  // Hinge + lid/screen
  const hinge = new THREE.Group();
  hinge.position.set(0, 0.27, -1.43);
  hinge.rotation.x = -Math.PI / 12;
  laptop.add(hinge);
  mesh(laptop, [3.75, 0.14, 0.16], [0, 0.09, -1.41], dark, 0.06);
  mesh(hinge, [4.8, 2.92, 0.11], [0, 1.46, 0], metal, 0.05);
  mesh(hinge, [4.64, 2.75, 0.02], [0, 1.46, 0.066], rubber, 0.009);

  const badge = new THREE.Mesh(
    keep(new THREE.PlaneGeometry(0.44, 0.1)),
    keep(new THREE.MeshStandardMaterial({ color: 0xb9a35a, metalness: 0.7, roughness: 0.3 })),
  );
  badge.position.set(0, 1.5, -0.06);
  badge.rotation.y = Math.PI;
  hinge.add(badge);

  const webcam = new THREE.Mesh(
    keep(new THREE.CircleGeometry(0.018, 12)),
    keep(new THREE.MeshStandardMaterial({ color: 0x1b1d21, metalness: 0.5, roughness: 0.2 })),
  );
  webcam.position.set(0, 2.83, 0.078);
  hinge.add(webcam);

  // Screen content — the "developer.config.js" code-editor look, driven by name/location
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 1440; screenCanvas.height = 900;
  const ctx = screenCanvas.getContext('2d');
  const screenTexture = keep(new THREE.CanvasTexture(screenCanvas));
  screenTexture.colorSpace = THREE.SRGBColorSpace;
  screenTexture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());

  function drawScreen() {
    ctx.fillStyle = '#0a0d10';
    ctx.fillRect(0, 0, 1440, 900);
    const glow = ctx.createRadialGradient(1180, 420, 10, 1180, 420, 780);
    glow.addColorStop(0, '#241d0f');
    glow.addColorStop(1, '#0a0d10');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1440, 900);

    ctx.fillStyle = '#151a20';
    ctx.fillRect(0, 0, 1440, 68);
    ctx.font = '24px monospace';
    ctx.fillStyle = '#c6cbd4';
    ctx.fillText('developer.config.js', 36, 43);
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(34, 66, 290, 2);

    const lines = [
      'const developer = {',
      `  name: "${name}",`,
      `  location: "${location}",`,
      '  stack: ["React", "Node.js", "MongoDB"],',
      '  focus: "Practical, full-stack systems",',
      '  status: "open_to_work"',
      '};',
      '',
      'export default developer;',
    ];
    ctx.font = '27px monospace';
    lines.forEach((line, i) => {
      const y = 135 + i * 52;
      ctx.fillStyle = '#5b6472';
      ctx.fillText(String(i + 1).padStart(2, '0'), 30, y);
      let x = 96;
      line.split(/("[^"]*"|\bconst\b|\bexport\b|\bdefault\b)/g).forEach((token) => {
        ctx.fillStyle = token.startsWith('"') ? '#a4d9bc' : /^(const|export|default)$/.test(token) ? '#d4af37' : '#d0d9e8';
        ctx.fillText(token, x, y);
        x += ctx.measureText(token).width;
      });
    });

    ctx.fillStyle = '#12161b';
    ctx.fillRect(0, 836, 1440, 64);
    ctx.fillStyle = '#a1adbf';
    ctx.font = '22px monospace';
    ctx.fillText('main  /  JavaScript', 34, 874);
    ctx.fillStyle = '#d4af37';
    ctx.fillText('Interface → API → Data', 1090, 874);

    screenTexture.needsUpdate = true;
  }
  drawScreen();

  const screen = new THREE.Mesh(
    keep(new THREE.PlaneGeometry(4.45, 2.5)),
    keep(new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false })),
  );
  screen.position.set(0, 1.49, 0.078);
  hinge.add(screen);

  // Soft contact shadow beneath the laptop (subtle, since the hero background is transparent)
  const shadowPlane = new THREE.Mesh(
    keep(new THREE.PlaneGeometry(12, 12)),
    keep(new THREE.ShadowMaterial({ opacity: 0.25 })),
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -0.09;
  shadowPlane.receiveShadow = true;
  laptop.add(shadowPlane);

  // Oscillates within a bounded arc instead of spinning all the way around, so the laptop
  // never turns edge-on to the camera (which is when it visually "disappears").
  const SWING_CENTER = -0.3;
  const SWING_RANGE = 0.5;
  let running = false, previous = 0, elapsed = 0;
  const render = () => renderer.render(scene, camera);
  function tick(time) {
    if (time - previous < 1000 / 30) return;
    const delta = previous ? Math.min((time - previous) / 1000, 0.1) : 0;
    previous = time;
    elapsed += delta;
    laptop.rotation.y = SWING_CENTER + Math.sin(elapsed * 0.4) * SWING_RANGE;
    render();
  }

  return {
    resize(width, height) {
      renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      render();
    },
    setRunning(value) {
      if (running === value) return;
      running = value;
      previous = 0;
      renderer.setAnimationLoop(value ? tick : null);
    },
    reset() {
      elapsed = 0;
      laptop.rotation.y = SWING_CENTER;
      render();
    },
    dispose() {
      renderer.setAnimationLoop(null);
      resources.forEach((resource) => resource.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}