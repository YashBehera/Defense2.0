import React from 'react';
import { Reveal, Words } from '../components/Reveal';

import krish from '../assets/krish.JPG';
import harmeet from '../assets/harmeet.JPG';
import daljeet from '../assets/daljeet.JPG';

const CREW = [
  {
    photo: krish,
    name: 'Krish Chandhok',
    role: 'Founder & CEO',
    bio: 'Aerospace systems research & simulation-driven architecture. Will lead technical division upon legal eligibility.',
    focus: 'top',
  },
  {
    photo: harmeet,
    name: 'Harmeet Kaur',
    role: 'Director',
    bio: "Expert in Digital Campaign Strategy, PR, and Strategic Marketing. Guides brand positioning, communication architecture, and leads FlyHive's market narrative and ecosystem engagement.",
    focus: 'top',
  },
  {
    photo: daljeet,
    name: 'Daljeet Chandhok',
    role: 'Director',
    bio: "25+ years of systems architecture and enterprise transformation leadership. Leads FlyHive's overall strategy, capital structuring, regulatory roadmap, and platform execution alongside global strategic advisors.",
    focus: 'top',
  },
];

export default function Team() {
  return (
    <section className="band page-head team-band">
      <div className="wrap">
        <Reveal onMount><span className="eyebrow red">The team</span></Reveal>
        <h1 className="display">
          <Words text="Leadership and" onMount delay={0.05} />
          <Words text="strategic advisory." onMount delay={0.16} className="dim" />
        </h1>

        <div className="crew">
          {CREW.map((p, i) => (
            <Reveal className="member" key={p.name} delay={0.3 + i * 0.08} y={22} onMount>
              <img
                className={`ph ph-${p.focus}`}
                src={p.photo}
                alt={p.name}
                loading={i < 2 ? 'eager' : 'lazy'}
              />
              <h2>{p.name}</h2>
              <div className="rl">{p.role}</div>
              <p>{p.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
