import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, Words } from '../components/Reveal';

import krish from '../assets/krish.JPG';
import daljeet from '../assets/daljeet.JPG';
import harmeet from '../assets/harmeet.JPG';
import nikhil from '../assets/nikhil.JPG';

const PEOPLE = [
  {
    photo: krish,
    name: 'Krish Chandhok',
    role: 'Founder & Chief Executive Officer',
    bio: [
      'Krish has been building machines that fly since he was nine. Around a hundred drones and robots over seven years, before any of this was a company.',
      'He does not draw CT1. He wrote a program in Python that generates the whole airframe in Fusion 360 against its API, with checks inside it that measure the model and name the part that is wrong. A design change is a re-run rather than a redraw.',
    ],
  },
  { photo: daljeet, name: 'Daljeet Chandhok', role: 'Director', bio: [] },
  { photo: harmeet, name: 'Harmeet Kaur', role: 'Director', bio: [] },
  {
    photo: nikhil,
    name: 'Nikhil Gupta',
    role: 'International Strategic Advisor',
    bio: [],
  },
];

export default function Team() {
  return (
    <>
      <section className="band page-head">
        <div className="wrap">
          <Reveal onMount><span className="eyebrow red">The team</span></Reveal>
          <h1 className="display">
            <Words text="Four people and" onMount delay={0.05} />
            <Words text="one aircraft." onMount delay={0.16} className="dim" />
          </h1>
          <Reveal onMount delay={0.5}>
            <p className="lede">
              FlyHive Technologies is a private limited company recognised by the Ministry of
              Commerce and Industry under aeronautics, aerospace and defence, certificate
              DIPP262989.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="band paper tight">
        <div className="wrap">
          <div className="bios">
            {PEOPLE.map((p, i) => (
              <Reveal className="bio" key={p.name} delay={i * 0.06} y={22}>
                <img className="ph" src={p.photo} alt={p.name} loading="lazy" />
                <div className="bio-txt">
                  <h2>{p.name}</h2>
                  <div className="rl">{p.role}</div>
                  {p.bio.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Reveal><span className="eyebrow">Working here</span></Reveal>
          <h2 className="statement wide">
            <Words text="We are looking for two engineers and a co founder." />
          </h2>
          <Reveal delay={0.1}>
            <p className="lede">
              One on structures, one on power and control, and somebody who wants to own half
              of the hard parts rather than be hired into them. If you have built something
              that flies, send it. A link to the thing you made counts for more here than a
              CV does.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="hero-foot">
              <Link className="btn" to="/contact">Get in touch</Link>
              <a className="btn ghost" href="mailto:info@flyhivetechnologies.com">
                info@flyhivetechnologies.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
