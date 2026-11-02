import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Ct1 from './Ct1';

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
/* 2. CT1 itself, revolving, deliberately never brought into focus     */
/* ------------------------------------------------------------------ */

export function CraftScene() {
  return (
    <Canvas
      dpr={[1, lowPower() ? 1.2 : 1.7]}
      camera={{ fov: 30, position: [3.4, 2.4, 7.2] }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <hemisphereLight args={['#ffffff', '#b9b9c6', 1.4]} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} />
      <directionalLight position={[-6, 2, -4]} intensity={0.8} color="#ff9aa6" />
      <Ct1 />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */
/* 3. The network: stations land, routes draw between them             */
/* ------------------------------------------------------------------ */

const STATION_N = 20;

function Plate() {
  const rings = [3.2, 5.4, 7.6, 9.6];
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.004, 0]}>
        <circleGeometry args={[11.6, 80]} />
        <meshBasicMaterial color="#f4f4f7" />
      </mesh>
      {rings.map((r) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <ringGeometry args={[r - 0.012, r + 0.012, 96]} />
          <meshBasicMaterial color="#dcdce4" transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  );
}

function Districts() {
  const ref = useRef();
  const blocks = useMemo(() => {
    let s = 77771;
    const rnd = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    const out = [];
    for (let i = 0; i < 190; i++) {
      const a = rnd() * Math.PI * 2;
      const r = 1.4 + Math.sqrt(rnd()) * 9.6;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r * 0.64;
      out.push({ x, z, h: 0.12 + Math.pow(rnd(), 2.4) * 1.5, w: 0.2 + rnd() * 0.4 });
    }
    return out;
  }, []);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const p = new THREE.Vector3();
    const sc = new THREE.Vector3();
    blocks.forEach((b, i) => {
      p.set(b.x, b.h / 2, b.z);
      sc.set(b.w, b.h, b.w);
      ref.current.setMatrixAt(i, m.compose(p, q, sc));
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [blocks]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, blocks.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#e3e3ea" roughness={0.95} />
    </instancedMesh>
  );
}

function Network({ progress }) {
  const group = useRef();
  const posts = useRef([]);
  const halos = useRef([]);
  const links = useRef([]);

  const stations = useMemo(() => {
    const out = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < STATION_N; i++) {
      const r = 2.3 + Math.sqrt(i / STATION_N) * 7.1;
      const a = i * golden * 2.3;
      out.push([Math.cos(a) * r, 0, Math.sin(a) * r * 0.64]);
    }
    return out;
  }, []);

  const arcs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < STATION_N; i++) {
      for (let j = i + 1; j < STATION_N; j++) pairs.push([i, j]);
    }
    const span = (e) =>
      Math.hypot(
        stations[e[0]][0] - stations[e[1]][0],
        stations[e[0]][2] - stations[e[1]][2]
      );
    pairs.sort((a, b) => span(a) - span(b));
    return pairs.map(([i, j]) => {
      const a = new THREE.Vector3(...stations[i]);
      const b = new THREE.Vector3(...stations[j]);
      const d = a.distanceTo(b);
      const mid = a.clone().add(b).multiplyScalar(0.5);
      mid.y = 0.5 + d * 0.3;
      return {
        geo: new THREE.TubeGeometry(
          new THREE.QuadraticBezierCurve3(a, mid, b),
          20,
          0.015,
          5,
          false
        ),
        near: Math.max(0.16, 0.62 - d / 24),
      };
    });
  }, [stations]);

  useFrame(({ clock }) => {
    const p = read(progress);
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = -0.45 + t * 0.035 + p * 0.5;
      group.current.rotation.x = 0.055 - p * 0.03;
    }

    const live = p < 0.3 ? 2 : p < 0.63 ? 10 : STATION_N;

    posts.current.forEach((post, i) => {
      if (!post) return;
      const want = i < live ? 1 : 0;
      post.scale.y += (want - post.scale.y) * 0.11;
      post.position.y = post.scale.y * 0.3;
      post.visible = post.scale.y > 0.02;
    });
    halos.current.forEach((h, i) => {
      if (!h) return;
      const want = i < live ? 1 : 0;
      const cur = h.scale.x;
      const next = cur + (want - cur) * 0.1;
      const pulse = 1 + Math.sin(t * 1.6 + i) * 0.07;
      h.scale.setScalar(Math.max(0.001, next * pulse));
      h.visible = next > 0.02;
      h.userData.base = next;
    });

    const liveLinks = (live * (live - 1)) / 2;
    links.current.forEach((l, i) => {
      if (!l) return;
      const want = i < liveLinks ? arcs[i].near : 0;
      l.material.opacity += (want - l.material.opacity) * 0.07;
      l.visible = l.material.opacity > 0.008;
    });
  });

  return (
    <group ref={group} position={[0, -0.9, 0]}>
      <Plate />
      <Districts />

      {stations.map((s, i) => (
        <group key={i} position={[s[0], 0, s[2]]}>
          <mesh
            ref={(el) => (halos.current[i] = el)}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.012, 0]}
          >
            <ringGeometry args={[0.2, 0.26, 36]} />
            <meshBasicMaterial color={RED} transparent opacity={0.65} />
          </mesh>
          <mesh ref={(el) => (posts.current[i] = el)} position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.038, 0.038, 0.6, 10]} />
            <meshStandardMaterial color={INK} roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.63, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.035, 16]} />
            <meshStandardMaterial color={i < 2 ? RED : INK} roughness={0.35} />
          </mesh>
        </group>
      ))}

      {arcs.map((a, i) => (
        <mesh key={i} geometry={a.geo} ref={(el) => (links.current[i] = el)}>
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
      camera={{ fov: 34, position: [0, 5.6, 13.4] }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <hemisphereLight args={['#ffffff', '#d6d6e0', 2.1]} />
      <directionalLight position={[7, 13, 9]} intensity={1.25} />
      <Network progress={progress} />
    </Canvas>
  );
}
