import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* CT1, built from the generator's own constants.
   The Python writes millimetres with z up. three.js wants metres with y up,
   so x stays x, the generator's z becomes y, and its y becomes z. */

// x, half width at base / floor / chassis
const STN = [
  [1.25, 0.35, 0.26, 0.17],
  [0.9, 0.55, 0.42, 0.28],
  [0.3, 0.55, 0.45, 0.3],
  [-0.3, 0.55, 0.45, 0.3],
  [-0.9, 0.55, 0.42, 0.28],
  [-1.25, 0.35, 0.26, 0.17],
];
const LEVEL = [-0.9, -0.45, 0];

const MX = 0.9;
const MY = 1.1;
const PROP_R = 0.686;
const COAX = 0.15;
const ZBOOM = 0.048;

// x, height, half width
const CANOPY = [
  [0.65, 0, 0.19],
  [0.35, 0.6, 0.31],
  [-0.3, 0.6, 0.31],
  [-0.6, 0, 0.2],
];
const HOOP = [
  [0.2, 0.62, 0.4],
  [-0.3, 0.68, 0.4],
];

const SKID_Y = -1.24;
const SKID_Z = 0.74;
const SKID_X = 1.29;

const MOTORS = [
  [MX, MY],
  [MX, -MY],
  [-MX, MY],
  [-MX, -MY],
];

/* ---------- the welded tube frame, as one instanced mesh ---------- */

function edges() {
  const seg = [];
  const add = (a, b, r) => seg.push([a, b, r]);
  const R_BODY = 0.016;
  const R_ROD = 0.042;
  const R_SKID = 0.021;
  const R_TUBE = 0.014;

  // longerons, both sides, all three levels
  for (let i = 0; i < STN.length - 1; i++) {
    for (let j = 0; j < 3; j++) {
      for (const s of [1, -1]) {
        add(
          [STN[i][0], LEVEL[j], s * STN[i][j + 1]],
          [STN[i + 1][0], LEVEL[j], s * STN[i + 1][j + 1]],
          j === 1 ? R_BODY * 1.15 : R_BODY
        );
      }
    }
  }
  // station frames: uprights and the cross members top and bottom
  STN.forEach(([x, b, f, c]) => {
    const hw = [b, f, c];
    for (const s of [1, -1]) {
      add([x, LEVEL[0], s * hw[0]], [x, LEVEL[1], s * hw[1]], R_BODY);
      add([x, LEVEL[1], s * hw[1]], [x, LEVEL[2], s * hw[2]], R_BODY);
    }
    add([x, LEVEL[0], hw[0]], [x, LEVEL[0], -hw[0]], R_BODY);
    add([x, LEVEL[2], hw[2]], [x, LEVEL[2], -hw[2]], R_BODY);
  });
  // the two carbon rods, one piece, through stations 1 and 4
  for (const s of [1, -1]) {
    add([1.31, LEVEL[2] - 0.02, s * 0.29], [-1.31, LEVEL[2] - 0.02, s * 0.29], R_ROD);
  }
  // booms out to the motors, off the rod line
  MOTORS.forEach(([mx, my]) => {
    add([mx * 0.33, ZBOOM, Math.sign(my) * 0.29], [mx, ZBOOM, my], R_BODY * 1.5);
    // a diagonal brace under each boom
    add([mx, ZBOOM, my], [mx * 0.42, LEVEL[0] + 0.1, Math.sign(my) * 0.4], R_TUBE);
  });
  // roll cage
  HOOP.forEach(([x, top, hw]) => {
    add([x, LEVEL[2], hw], [x, top, hw * 0.78], R_TUBE);
    add([x, LEVEL[2], -hw], [x, top, -hw * 0.78], R_TUBE);
    add([x, top, hw * 0.78], [x, top, -hw * 0.78], R_TUBE);
  });
  // canopy: the trapezoid, both sides, plus the roof rails
  for (let i = 0; i < CANOPY.length - 1; i++) {
    for (const s of [1, -1]) {
      add(
        [CANOPY[i][0], CANOPY[i][1], s * CANOPY[i][2]],
        [CANOPY[i + 1][0], CANOPY[i + 1][1], s * CANOPY[i + 1][2]],
        R_TUBE
      );
    }
  }
  CANOPY.forEach(([x, y, hw]) => add([x, y, hw], [x, y, -hw], R_TUBE));
  // landing legs and skids
  for (const sz of [1, -1]) {
    for (const sx of [1, -1]) {
      add([sx * 0.55, LEVEL[0], sz * 0.3], [sx * 0.75, SKID_Y, sz * SKID_Z], R_SKID);
    }
    add([SKID_X, SKID_Y, sz * SKID_Z], [-SKID_X, SKID_Y, sz * SKID_Z], R_SKID);
  }
  return seg;
}

function Frame({ color, metalness = 0.35, roughness = 0.42 }) {
  const ref = useRef();
  const seg = useMemo(edges, []);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const mid = new THREE.Vector3();
    const scale = new THREE.Vector3();

    seg.forEach(([p, q2, r], i) => {
      a.set(...p);
      b.set(...q2);
      dir.subVectors(b, a);
      const len = dir.length() || 0.0001;
      mid.addVectors(a, b).multiplyScalar(0.5);
      q.setFromUnitVectors(up, dir.normalize());
      scale.set(r / 0.02, len, r / 0.02);
      ref.current.setMatrixAt(i, m.compose(mid, q, scale));
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [seg]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, seg.length]}>
      <cylinderGeometry args={[0.02, 0.02, 1, 9]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </instancedMesh>
  );
}

/* ---------- the skin that makes the cabin read as a cabin ---------- */

function cabinGeometry() {
  const pos = [];
  const index = [];
  const push = (x, y, z) => {
    pos.push(x, y, z);
    return pos.length / 3 - 1;
  };
  const grid = STN.map(([x, b, f, c]) => {
    const hw = [b, f, c];
    return LEVEL.map((y, j) => [push(x, y, hw[j]), push(x, y, -hw[j])]);
  });
  const quad = (p1, p2, p3, p4) => index.push(p1, p2, p3, p1, p3, p4);

  for (let i = 0; i < STN.length - 1; i++) {
    for (let j = 0; j < 2; j++) {
      quad(grid[i][j][0], grid[i + 1][j][0], grid[i + 1][j + 1][0], grid[i][j + 1][0]);
      quad(grid[i][j + 1][1], grid[i + 1][j + 1][1], grid[i + 1][j][1], grid[i][j][1]);
    }
    quad(grid[i][0][1], grid[i + 1][0][1], grid[i + 1][0][0], grid[i][0][0]);
  }
  // nose and tail
  const cap = (g) => {
    quad(g[0][0], g[1][0], g[1][1], g[0][1]);
    quad(g[1][0], g[2][0], g[2][1], g[1][1]);
  };
  cap(grid[0]);
  cap(grid[grid.length - 1]);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(index);
  geo.computeVertexNormals();
  return geo;
}

function glassGeometry() {
  const pos = [];
  const index = [];
  const push = (x, y, z) => {
    pos.push(x, y, z);
    return pos.length / 3 - 1;
  };
  const ring = CANOPY.map(([x, y, hw]) => [push(x, y, hw), push(x, y, -hw)]);
  for (let i = 0; i < ring.length - 1; i++) {
    index.push(ring[i][0], ring[i + 1][0], ring[i + 1][1]);
    index.push(ring[i][0], ring[i + 1][1], ring[i][1]);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(index);
  geo.computeVertexNormals();
  return geo;
}

/* ---------- coaxial rotors, eight discs over four booms ---------- */

function Rotors({ ink }) {
  const discs = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    discs.current.forEach((d, i) => {
      if (d) d.rotation.y = t * (i % 2 ? -19 : 19);
    });
  });

  const all = [];
  MOTORS.forEach(([mx, my], m) => {
    [COAX, -COAX].forEach((dy, k) => all.push([mx, ZBOOM + dy, my, m * 2 + k]));
  });

  return (
    <group>
      {MOTORS.map(([mx, my], i) => (
        <mesh key={`m${i}`} position={[mx, ZBOOM, my]}>
          <cylinderGeometry args={[0.085, 0.085, 0.3, 16]} />
          <meshStandardMaterial color={ink} metalness={0.5} roughness={0.35} />
        </mesh>
      ))}
      {all.map(([x, y, z, i]) => (
        <group key={`d${i}`} position={[x, y, z]}>
          <mesh ref={(el) => (discs.current[i] = el)}>
            <cylinderGeometry args={[PROP_R, PROP_R, 0.012, 44]} />
            <meshStandardMaterial
              color={ink}
              metalness={0.3}
              roughness={0.5}
              transparent
              opacity={0.17}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[PROP_R, 0.007, 6, 56]} />
            <meshStandardMaterial color={ink} metalness={0.4} roughness={0.4} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ---------- the aircraft ---------- */

export default function Ct1({ ink = '#0b0b0d', spin = 0.26, tilt = true }) {
  const g = useRef();
  const cabin = useMemo(cabinGeometry, []);
  const glass = useMemo(glassGeometry, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!g.current) return;
    g.current.rotation.y = t * spin;
    if (tilt) {
      g.current.rotation.z = Math.sin(t * 0.24) * 0.07;
      g.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group ref={g} scale={0.92} position={[0, 0.3, 0]} rotation={[0.14, 0, 0]}>
      <Frame color={ink} />
      <mesh geometry={cabin}>
        <meshStandardMaterial
          color={ink}
          metalness={0.2}
          roughness={0.62}
          side={THREE.DoubleSide}
          transparent
          opacity={0.38}
        />
      </mesh>
      <mesh geometry={glass}>
        <meshStandardMaterial
          color={ink}
          metalness={0.1}
          roughness={0.25}
          side={THREE.DoubleSide}
          transparent
          opacity={0.2}
        />
      </mesh>
      <Rotors ink={ink} />
    </group>
  );
}
