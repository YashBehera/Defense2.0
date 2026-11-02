import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* Three WebGL scenes, all on white.
   Each takes a framer-motion MotionValue for scroll progress and reads it
   inside useFrame, so scrolling never re-renders React. */

const INK = '#0b0b0d';
const RED = '#e8243c';

const lowPower = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.innerWidth < 760);

const read = (mv) => {
  const v = mv && typeof mv.get === 'function' ? mv.get() : 0;
  return Number.isFinite(v) ? v : 0;
};

/* ------------------------------------------------------------------ */
/* 1. The city, seen from just above the rooftops, with the sky empty  */
/* ------------------------------------------------------------------ */

function Blocks({ count }) {
  const ref = useRef();

  const blocks = useMemo(() => {
    const out = [];
    const rand = (() => {
      let s = 20260102;
      return () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    })();
    const SPAN = 54;
    for (let i = 0; i < count; i++) {
      const x = (rand() - 0.5) * SPAN * 2;
      const z = (rand() - 0.5) * SPAN * 2;
      const d = Math.hypot(x, z);
      if (d < 8) continue; // leave the middle open so the arc reads
      const core = Math.max(0, 1 - d / 34);
      const h = 1.1 + Math.pow(rand(), 2.3) * (3 + core * 17);
      out.push({ x, z, h, w: 1.05 + rand() * 1.75, dp: 1.05 + rand() * 1.75 });
    }
    return out;
  }, [count]);

  React.useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    const p = new THREE.Vector3();
    blocks.forEach((b, i) => {
      p.set(b.x, b.h / 2, b.z);
      s.set(b.w, b.h, b.dp);
      ref.current.setMatrixAt(i, m.compose(p, q, s));
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [blocks]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, blocks.length]} receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#e7e7ed" roughness={0.95} metalness={0} />
    </instancedMesh>
  );
}

function Route({ progress }) {
  const dot = useRef();
  const trail = useRef();

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-46, 1.6, 20),
        new THREE.Vector3(-22, 15, 8),
        new THREE.Vector3(2, 20, -2),
        new THREE.Vector3(26, 15, -12),
        new THREE.Vector3(48, 1.6, -24),
      ]),
    []
  );

  const tube = useMemo(() => new THREE.TubeGeometry(curve, 110, 0.085, 7, false), [curve]);

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.11) % 1;
    const p = curve.getPointAt(t);
    if (dot.current) dot.current.position.copy(p);
    if (trail.current) {
      trail.current.position.copy(curve.getPointAt(Math.max(0, t - 0.035)));
      trail.current.scale.setScalar(0.6 + Math.sin(clock.getElapsedTime() * 3) * 0.08);
    }
    if (tube && tube.attributes) {
      // the line itself draws in as the hero is scrolled past
      const drawn = 1 - read(progress) * 0.55;
      tube.setDrawRange(0, Math.floor(tube.index.count * Math.max(0.25, drawn)));
    }
  });

  return (
    <group>
      <mesh geometry={tube}>
        <meshBasicMaterial color={RED} transparent opacity={0.5} />
      </mesh>
      <mesh ref={dot}>
        <sphereGeometry args={[0.52, 20, 20]} />
        <meshBasicMaterial color={RED} />
      </mesh>
      <mesh ref={trail}>
        <sphereGeometry args={[0.52, 14, 14]} />
        <meshBasicMaterial color={RED} transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function CityRig({ progress }) {
  const { camera } = useThree();
  const group = useRef();

  useFrame(({ clock }, delta) => {
    const p = read(progress);
    const t = clock.getElapsedTime();
    // rises and tilts up as you scroll, so the empty sky opens
    const y = 7.5 + p * 22;
    const r = 60 - p * 6;
    const a = t * 0.028 + p * 0.5;
    camera.position.set(Math.sin(a) * r, y, Math.cos(a) * r);
    camera.lookAt(0, 4 + p * 9, 0);
    if (group.current) group.current.position.y = -p * 2.5;
    void delta;
  });

  return <group ref={group}><Blocks count={lowPower() ? 230 : 520} /></group>;
}

export function CityScene({ progress }) {
  return (
    <Canvas
      dpr={[1, lowPower() ? 1.25 : 1.8]}
      camera={{ fov: 42, position: [0, 8, 60], near: 0.1, far: 220 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <fog attach="fog" args={['#ffffff', 42, 118]} />
      <hemisphereLight args={['#ffffff', '#d8d8e0', 2.1]} />
      <directionalLight position={[26, 40, 18]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-30, 16, -24]} intensity={0.45} color="#ececf4" />
      <CityRig progress={progress} />
      <Route progress={progress} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[320, 320]} />
        <meshBasicMaterial color="#f2f2f6" />
      </mesh>
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */
/* 2. The aircraft, revolving, deliberately never resolved             */
/* ------------------------------------------------------------------ */

function CraftForm() {
  const spin = useRef();
  const discs = useRef([]);
  const ARMS = 4;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (spin.current) {
      spin.current.rotation.y = t * 0.3;
      spin.current.rotation.x = Math.sin(t * 0.22) * 0.14 - 0.1;
      spin.current.position.y = Math.sin(t * 0.55) * 0.08;
    }
    discs.current.forEach((d, i) => {
      if (d) d.rotation.y = t * (i % 2 ? -14 : 14);
    });
  });

  const arms = useMemo(
    () =>
      Array.from({ length: ARMS }, (_, i) => {
        const a = (i / ARMS) * Math.PI * 2 + Math.PI / 4;
        return { a, x: Math.cos(a) * 1.5, z: Math.sin(a) * 1.5 };
      }),
    []
  );

  return (
    <group ref={spin} scale={0.92}>
      {/* body */}
      <mesh>
        <capsuleGeometry args={[0.52, 1.25, 6, 22]} />
        <meshStandardMaterial color={INK} roughness={0.42} metalness={0.22} />
      </mesh>
      <mesh position={[0, -0.62, 0]}>
        <boxGeometry args={[0.9, 0.22, 2.0]} />
        <meshStandardMaterial color={INK} roughness={0.5} metalness={0.15} />
      </mesh>

      {arms.map(({ a, x, z }, i) => (
        <group key={i}>
          <mesh position={[x / 2, -0.08, z / 2]} rotation={[0, -a, Math.PI / 2]}>
            <cylinderGeometry args={[0.075, 0.075, 1.55, 12]} />
            <meshStandardMaterial color={INK} roughness={0.45} metalness={0.3} />
          </mesh>
          <mesh position={[x, 0.02, z]}>
            <cylinderGeometry args={[0.12, 0.12, 0.3, 14]} />
            <meshStandardMaterial color={INK} roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh
            ref={(el) => (discs.current[i] = el)}
            position={[x, 0.2, z]}
          >
            <cylinderGeometry args={[0.82, 0.82, 0.018, 36]} />
            <meshStandardMaterial
              color={INK}
              roughness={0.3}
              metalness={0.4}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function CraftScene() {
  return (
    <Canvas
      dpr={[1, lowPower() ? 1.2 : 1.7]}
      camera={{ fov: 34, position: [0, 1.5, 7.2] }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <hemisphereLight args={['#ffffff', '#c9c9d4', 1.5]} />
      <directionalLight position={[4, 7, 5]} intensity={2.1} />
      <directionalLight position={[-5, 2, -4]} intensity={0.7} color="#ff9aa6" />
      <CraftForm />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */
/* 3. The network: stations land, routes draw between them             */
/* ------------------------------------------------------------------ */

function Network({ progress }) {
  const group = useRef();
  const pins = useRef([]);
  const links = useRef([]);
  const N = 20;

  const stations = useMemo(() => {
    const out = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const r = 2.1 + Math.sqrt(i / N) * 6.6;
      const a = i * golden * 2.3;
      out.push([Math.cos(a) * r, 0, Math.sin(a) * r * 0.62]);
    }
    return out;
  }, []);

  const edges = useMemo(() => {
    const out = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) out.push([i, j]);
    }
    // nearest first, so the picture densifies rather than scribbling
    return out.sort((p, q) => {
      const d = (a) =>
        Math.hypot(stations[a[0]][0] - stations[a[1]][0], stations[a[0]][2] - stations[a[1]][2]);
      return d(p) - d(q);
    });
  }, [stations]);

  const arcs = useMemo(
    () =>
      edges.map(([i, j]) => {
        const a = new THREE.Vector3(...stations[i]);
        const b = new THREE.Vector3(...stations[j]);
        const mid = a.clone().add(b).multiplyScalar(0.5);
        mid.y = 0.55 + a.distanceTo(b) * 0.2;
        return new THREE.TubeGeometry(
          new THREE.QuadraticBezierCurve3(a, mid, b),
          16,
          0.018,
          5,
          false
        );
      }),
    [edges, stations]
  );

  useFrame(({ clock }) => {
    const p = read(progress);
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = -0.5 + t * 0.045 + p * 0.55;
      group.current.rotation.x = 0.62 - p * 0.12;
    }
    // stations: 2 -> 10 -> 20 across the scroll
    const liveStations = p < 0.34 ? 2 : p < 0.67 ? 10 : N;
    pins.current.forEach((pin, i) => {
      if (!pin) return;
      const want = i < liveStations ? 1 : 0;
      pin.scale.y += (want - pin.scale.y) * 0.1;
      pin.visible = pin.scale.y > 0.02;
      pin.position.y = (pin.scale.y * 0.5) / 2;
    });
    const liveEdges = (liveStations * (liveStations - 1)) / 2;
    links.current.forEach((l, i) => {
      if (!l) return;
      const want = i < liveEdges ? 0.42 : 0;
      l.material.opacity += (want - l.material.opacity) * 0.08;
      l.visible = l.material.opacity > 0.01;
    });
    void t;
  });

  return (
    <group ref={group} position={[0, -1.1, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[11.5, 72]} />
        <meshBasicMaterial color="#f1f1f5" />
      </mesh>
      <gridHelper args={[23, 26, '#dededa', '#e8e8ee']} position={[0, 0.002, 0]} />

      {stations.map((s, i) => (
        <mesh key={i} ref={(el) => (pins.current[i] = el)} position={[s[0], 0.25, s[2]]}>
          <cylinderGeometry args={[0.075, 0.075, 0.5, 10]} />
          <meshStandardMaterial color={i < 2 ? RED : INK} roughness={0.4} />
        </mesh>
      ))}

      {arcs.map((g, i) => (
        <mesh key={i} geometry={g} ref={(el) => (links.current[i] = el)}>
          <meshBasicMaterial color={RED} transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

export function NetworkScene({ progress }) {
  return (
    <Canvas
      dpr={[1, lowPower() ? 1.2 : 1.7]}
      camera={{ fov: 38, position: [0, 4.2, 14] }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <hemisphereLight args={['#ffffff', '#d4d4de', 2.2]} />
      <directionalLight position={[6, 12, 8]} intensity={1.2} />
      <Network progress={progress} />
    </Canvas>
  );
}
