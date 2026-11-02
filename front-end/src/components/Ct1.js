import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* CT1 with a fairing on it.
   The hard points are the generator's: motors at 900 by 1100 mm, 1372 mm
   coaxial discs, a 2.5 m body. Everything else here is the skin over that,
   lofted rather than welded, because a bare space frame reads as a drone. */

const MX = 0.9;
const MY = 1.1;
const PROP_R = 0.686;
const COAX = 0.15;
const Y_BOOM = -0.12;

// x, half width, bottom y, top y
const PROFILE = [
  [1.38, 0.07, -0.26, -0.13],
  [1.22, 0.22, -0.42, -0.01],
  [1.0, 0.37, -0.56, 0.08],
  [0.68, 0.48, -0.64, 0.15],
  [0.3, 0.54, -0.68, 0.19],
  [-0.1, 0.55, -0.68, 0.2],
  [-0.5, 0.53, -0.66, 0.17],
  [-0.86, 0.45, -0.6, 0.1],
  [-1.14, 0.3, -0.5, -0.01],
  [-1.32, 0.12, -0.38, -0.14],
];

// x, half width, top y  (the glass sits on the body's top line)
const GLASS = [
  [0.82, 0.1, 0.16],
  [0.6, 0.27, 0.36],
  [0.3, 0.37, 0.54],
  [-0.05, 0.39, 0.6],
  [-0.38, 0.34, 0.52],
  [-0.62, 0.22, 0.34],
  [-0.78, 0.08, 0.18],
];

const SECTION = 22; // points around each cross section
const N_EXP = 2.7; // superellipse exponent: 2 is an ellipse, higher is boxier

/* loft a closed tube through the profile's cross sections */
function hull(profile, closeEnds = true) {
  const pos = [];
  const idx = [];
  const rings = [];

  profile.forEach(([x, hw, by, ty]) => {
    const cy = (ty + by) / 2;
    const ry = (ty - by) / 2;
    const ring = [];
    for (let k = 0; k < SECTION; k++) {
      const t = (k / SECTION) * Math.PI * 2;
      const st = Math.sin(t);
      const ct = Math.cos(t);
      const y = cy + ry * Math.sign(st) * Math.abs(st) ** (2 / N_EXP);
      const z = hw * Math.sign(ct) * Math.abs(ct) ** (2 / N_EXP);
      pos.push(x, y, z);
      ring.push(pos.length / 3 - 1);
    }
    rings.push(ring);
  });

  for (let i = 0; i < rings.length - 1; i++) {
    for (let k = 0; k < SECTION; k++) {
      const k2 = (k + 1) % SECTION;
      const a = rings[i][k];
      const b = rings[i + 1][k];
      const c = rings[i + 1][k2];
      const d = rings[i][k2];
      idx.push(a, b, c, a, c, d);
    }
  }

  if (closeEnds) {
    [0, rings.length - 1].forEach((r, end) => {
      const [x, , by, ty] = profile[r];
      pos.push(x, (ty + by) / 2, 0);
      const hubIdx = pos.length / 3 - 1;
      for (let k = 0; k < SECTION; k++) {
        const k2 = (k + 1) % SECTION;
        if (end === 0) idx.push(hubIdx, rings[r][k2], rings[r][k]);
        else idx.push(hubIdx, rings[r][k], rings[r][k2]);
      }
    });
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

/* the canopy is a half shell, not a tube: ribs from the sill up over the top */
function canopyGeometry() {
  const pos = [];
  const idx = [];
  const rings = GLASS.map(([x, hw, ty]) => {
    const ring = [];
    const STEPS = 13;
    for (let k = 0; k <= STEPS; k++) {
      const t = (k / STEPS) * Math.PI; // 0 = starboard sill, PI = port sill
      const z = hw * Math.cos(t);
      const y = 0.12 + (ty - 0.12) * Math.sin(t) ** 0.78;
      pos.push(x, y, z);
      ring.push(pos.length / 3 - 1);
    }
    return ring;
  });
  for (let i = 0; i < rings.length - 1; i++) {
    for (let k = 0; k < rings[i].length - 1; k++) {
      idx.push(rings[i][k], rings[i + 1][k], rings[i + 1][k + 1]);
      idx.push(rings[i][k], rings[i + 1][k + 1], rings[i][k + 1]);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

/* a helicopter style skid: forward, down, back, and up at the tail */
function skidGeometry(side) {
  const z = 0.62 * side;
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.0, -0.5, z * 0.62),
    new THREE.Vector3(1.05, -0.82, z),
    new THREE.Vector3(0.55, -0.95, z),
    new THREE.Vector3(-0.5, -0.95, z),
    new THREE.Vector3(-1.0, -0.86, z),
    new THREE.Vector3(-1.18, -0.6, z * 0.72),
  ]);
  return new THREE.TubeGeometry(curve, 44, 0.032, 10, false);
}

function strutGeometry(sx, sz) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(sx * 0.42, -0.6, sz * 0.3),
    new THREE.Vector3(sx * 0.58, -0.78, sz * 0.48),
    new THREE.Vector3(sx * 0.62, -0.92, sz * 0.62),
  ]);
  return new THREE.TubeGeometry(curve, 18, 0.026, 8, false);
}

/* each boom: a slim tapered arm out to the motor nacelle */
function Boom({ mx, my, ink }) {
  const sx = Math.sign(mx);
  const sz = Math.sign(my);
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sx * 0.5, Y_BOOM + 0.04, sz * 0.46),
      new THREE.Vector3(mx * 0.78, Y_BOOM, my * 0.74),
      new THREE.Vector3(mx, Y_BOOM, my),
    ]);
    return new THREE.TubeGeometry(curve, 30, 0.045, 10, false);
  }, [mx, my, sx, sz]);

  return (
    <group>
      <mesh geometry={geo}>
        <meshStandardMaterial color={ink} metalness={0.55} roughness={0.34} />
      </mesh>
      <mesh position={[mx, Y_BOOM, my]}>
        <capsuleGeometry args={[0.082, 0.17, 5, 18]} />
        <meshStandardMaterial color={ink} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* two bladed coaxial rotors, so they read as blades rather than a plate */
function Rotor({ mx, my, dir, ink }) {
  const hi = useRef();
  const lo = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (hi.current) hi.current.rotation.y = t * 17 * dir;
    if (lo.current) lo.current.rotation.y = -t * 17 * dir;
  });

  return (
    <group position={[mx, Y_BOOM, my]}>
      <group ref={hi} position={[0, COAX, 0]}>
        {[0, 1].map((b) => (
          <mesh key={b} rotation={[0, b * Math.PI, 0]} position={[PROP_R / 2, 0, 0]}>
            <boxGeometry args={[PROP_R, 0.013, 0.08]} />
            <meshStandardMaterial color={ink} metalness={0.4} roughness={0.42} />
          </mesh>
        ))}
      </group>
      <group ref={lo} position={[0, -COAX, 0]}>
        {[0, 1].map((b) => (
          <mesh key={b} rotation={[0, b * Math.PI, 0]} position={[PROP_R / 2, 0, 0]}>
            <boxGeometry args={[PROP_R, 0.013, 0.08]} />
            <meshStandardMaterial color={ink} metalness={0.4} roughness={0.42} />
          </mesh>
        ))}
      </group>
      {[COAX, -COAX].map((dy) => (
        <mesh key={dy} position={[0, dy, 0]}>
          <torusGeometry args={[PROP_R, 0.006, 6, 60]} />
          <meshStandardMaterial color={ink} metalness={0.4} roughness={0.4} transparent opacity={0.22} />
        </mesh>
      ))}
    </group>
  );
}

const MOTORS = [
  [MX, MY, 1],
  [MX, -MY, -1],
  [-MX, MY, -1],
  [-MX, -MY, 1],
];

export default function Ct1({ ink = '#15161a', spin = 0.26, tilt = true }) {
  const g = useRef();
  const body = useMemo(() => hull(PROFILE), []);
  const glass = useMemo(canopyGeometry, []);
  const skids = useMemo(() => [skidGeometry(1), skidGeometry(-1)], []);
  const struts = useMemo(
    () => [
      strutGeometry(1, 1),
      strutGeometry(1, -1),
      strutGeometry(-1, 1),
      strutGeometry(-1, -1),
    ],
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!g.current) return;
    g.current.rotation.y = t * spin;
    if (tilt) {
      g.current.rotation.z = Math.sin(t * 0.24) * 0.05;
      g.current.position.y = 0.16 + Math.sin(t * 0.5) * 0.045;
    }
  });

  return (
    <group ref={g} scale={0.95} position={[0, 0.16, 0]} rotation={[0.12, 0, 0]}>
      <mesh geometry={body}>
        <meshStandardMaterial color="#d7d9de" metalness={0.72} roughness={0.28} />
      </mesh>
      <mesh geometry={glass}>
        <meshStandardMaterial
          color="#1a1c22"
          metalness={0.5}
          roughness={0.1}
          side={THREE.DoubleSide}
          transparent
          opacity={0.84}
        />
      </mesh>

      {MOTORS.map(([mx, my]) => (
        <Boom key={`b${mx}${my}`} mx={mx} my={my} ink={ink} />
      ))}
      {MOTORS.map(([mx, my, dir]) => (
        <Rotor key={`r${mx}${my}`} mx={mx} my={my} dir={dir} ink={ink} />
      ))}

      {skids.map((s, i) => (
        <mesh key={`s${i}`} geometry={s}>
          <meshStandardMaterial color={ink} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      {struts.map((s, i) => (
        <mesh key={`t${i}`} geometry={s}>
          <meshStandardMaterial color={ink} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}
