import React from 'react';

/* The hero backdrop for phones.
   In portrait the WebGL city is almost entirely off frame, so it was paying
   for a full screen canvas every frame to show two grey smudges. This is the
   same picture as flat SVG: no canvas, no render loop, no battery. */

const FAR = [
  [-10, 44, 96], [40, 30, 138], [74, 38, 110], [116, 26, 162], [146, 42, 124],
  [192, 28, 150], [224, 40, 104], [268, 30, 170], [302, 36, 118], [342, 32, 146],
  [378, 40, 108],
];

const NEAR = [
  [-14, 38, 150], [28, 26, 212], [58, 34, 176], [96, 30, 262], [130, 44, 198],
  [178, 26, 238], [208, 38, 162], [250, 32, 288], [286, 46, 210], [336, 28, 178],
  [368, 40, 240],
];

const H = 440;
const ARC = 'M -30 318 Q 200 52 430 262';

export default function Skyline() {
  return (
    <svg
      className="skyline"
      viewBox={`0 0 400 ${H}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sk-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e2ec" />
          <stop offset="100%" stopColor="#f1f1f6" />
        </linearGradient>
        <linearGradient id="sk-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfcfdd" />
          <stop offset="100%" stopColor="#e6e6ee" />
        </linearGradient>
      </defs>

      <g fill="url(#sk-far)">
        {FAR.map(([x, w, h], i) => (
          <rect key={i} x={x} y={H - h} width={w} height={h} />
        ))}
      </g>
      <g fill="url(#sk-near)">
        {NEAR.map(([x, w, h], i) => (
          <rect key={i} x={x} y={H - h} width={w} height={h} />
        ))}
      </g>

      <path id="sk-arc" d={ARC} fill="none" stroke="#e8243c" strokeWidth="1.8" opacity="0.55" />
      <circle r="4" fill="#e8243c">
        <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
          <mpath href="#sk-arc" />
        </animateMotion>
      </circle>
    </svg>
  );
}
