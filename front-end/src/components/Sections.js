import React from 'react';
import { Reveal, Counter } from './Reveal';
import krish from '../assets/krish.JPG';
import daljeet from '../assets/daljeet.JPG';
import harmeet from '../assets/harmeet.JPG';
import nikhil from '../assets/nikhil.JPG';

export const Hero = () => (
  <section className="hero wrap" id="top">
    <Reveal y={34} onMount>
      <h1>
        15 km across a city<br />takes an hour.
        <span className="dim">In the air it takes seven minutes.</span>
      </h1>
    </Reveal>
    <Reveal y={22} delay={0.14} onMount>
      <p className="sub">
        FlyHive is a city airline. <b>We build our own electric aircraft, we build our
        own stations, and we fly them ourselves.</b> The first seats will not go on sale
        publicly. They go to the list.
      </p>
    </Reveal>
    <div className="wrap foot" style={{ padding: 0 }}>
      <span className="tag"><span className="dot" />Coming soon</span>
      <span className="scrollcue">Scroll</span>
    </div>
  </section>
);

export const Problem = () => (
  <section className="band band--line">
    <div className="wrap">
      <Reveal><span className="eyebrow">The problem</span></Reveal>
      <Reveal delay={0.05}><h2 className="statement">You cannot widen a city.</h2></Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          Roads stopped getting better twenty years ago and they are not going to start
          again, because there is no room left to add. Every new lane fills the day it
          opens.
        </p>
        <p className="lede">
          Meanwhile the airspace directly above all of it is <strong>completely empty</strong>.
        </p>
      </Reveal>
      <div className="figs">
        <Reveal className="fig" delay={0.04}>
          <span className="n"><Counter to={60} suffix=" min" /></span>
          <span className="l">by road</span>
        </Reveal>
        <Reveal className="fig" delay={0.12}>
          <span className="n hot"><Counter to={7} suffix=" min" /></span>
          <span className="l">in the air</span>
        </Reveal>
        <Reveal className="fig" delay={0.2}>
          <span className="n"><Counter to={0} suffix="%" /></span>
          <span className="l">of the sky in use</span>
        </Reveal>
      </div>
    </div>
  </section>
);

export const Gap = () => (
  <section className="band band--line">
    <div className="wrap">
      <Reveal><span className="eyebrow">Why it is still empty</span></Reveal>
      <Reveal delay={0.05}>
        <h2 className="statement">
          Two things are missing, and <span className="accent">neither is physics.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          Flying a person fifteen kilometres has been solved for decades. What does not
          exist is an aircraft cheap enough to run a trip that short, and anywhere inside
          a city to land one.
        </p>
        <p className="lede"><strong>So we are building both.</strong></p>
      </Reveal>
    </div>
  </section>
);

const STEPS = [
  ['01', 'Book it on your phone', 'Pick where you are going and book a seat on the next flight out. Takes seconds.'],
  ['02', 'Go to the nearest station', 'Stations sit where people already are, the same way metro stations do. Walk in. No airport, no check in, no security theatre.'],
  ['03', 'Hop on', 'Four seats, electric, straight up and straight down. Seven minutes for the trip that takes an hour on the road.'],
  ['04', 'Walk out the other side', 'Into the city, not into a terminal thirty kilometres from where you were going.'],
];

export const HowItWorks = () => (
  <section className="band band--line" id="how">
    <div className="wrap">
      <Reveal><span className="eyebrow">How it works</span></Reveal>
      <Reveal delay={0.05}>
        <h2 className="statement">You walk in. You get on. You get off.</h2>
      </Reveal>
      <div className="steps">
        {STEPS.map(([n, h, p], i) => (
          <Reveal className="step" key={n} delay={i * 0.06}>
            <span className="num">{n}</span>
            <div>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const SPECS = [
  ['Seats', '4', false],
  ['Power', 'Fully electric', false],
  ['Take off', 'Straight up', false],
  ['15 km', '7 minutes', false],
  ['Airframe', '', true],
  ['Range', '', true],
  ['First flight', '', true],
  ['Where it flies first', '', true],
];

export const Aircraft = () => (
  <section className="band band--line" id="aircraft">
    <div className="wrap">
      <Reveal><span className="eyebrow">The aircraft</span></Reveal>
      <Reveal delay={0.05}>
        <h2 className="statement">
          We are not showing it to you <span className="accent">yet.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          It is designed. Every tube, every joint, every number. It is being built now.
        </p>
        <p className="lede">
          What it looks like, how far it goes and what a seat costs are things we would
          rather show you once than describe a hundred times.{' '}
          <strong>The people on the waitlist see it first.</strong>
        </p>
      </Reveal>

      <div className="specs">
        {SPECS.map(([k, v, hidden], i) => (
          <Reveal className="spec" key={k} delay={i * 0.05}>
            <span className="k">{k}</span>
            {hidden ? (
              <span className="v redacted" aria-label="Not disclosed yet" />
            ) : (
              <span className="v">{v}</span>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="lede" style={{ marginTop: 'clamp(28px,3.6vw,44px)' }}>
          Four of those eight lines are blacked out on purpose. They get filled in one at
          a time, and the list hears before the internet does.
        </p>
      </Reveal>
    </div>
  </section>
);

const ROWS = [['2 stations', 1], ['10 stations', 45], ['20 stations', 190]];

export const Network = () => (
  <section className="band band--line">
    <div className="wrap">
      <Reveal><span className="eyebrow">The network</span></Reveal>
      <Reveal delay={0.05}>
        <h2 className="statement">Every station makes every other station worth more.</h2>
      </Reveal>
      <div className="netrows">
        {ROWS.map(([label, routes], i) => (
          <Reveal className="netrow" key={label} delay={i * 0.08}>
            <span className="s">{label}</span>
            <span className="r"><Counter to={routes} suffix={routes === 1 ? ' route' : ' routes'} /></span>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="lede" style={{ marginTop: 'clamp(30px,4vw,48px)' }}>
          The aircraft will become a commodity, the way every aircraft eventually does.
          The usable sites in a dense city will not. <strong>That is the business.</strong>
        </p>
      </Reveal>
    </div>
  </section>
);

const TEAM = [
  [krish, 'Krish Chandhok', 'Founder & CEO'],
  [daljeet, 'Daljeet Chandhok', 'Director'],
  [harmeet, 'Harmeet Kaur', 'Director'],
  [nikhil, 'Nikhil Gupta', 'International Strategic Advisor'],
];

export const Company = () => (
  <section className="band band--line" id="company">
    <div className="wrap">
      <Reveal><span className="eyebrow">The company</span></Reveal>
      <Reveal delay={0.05}><h2 className="statement">FlyHive Technologies</h2></Reveal>
      <Reveal delay={0.1}>
        <p className="lede">
          Recognised by the Ministry of Commerce and Industry under aeronautics, aerospace
          and defence. DPIIT certificate DIPP262989.
        </p>
        <p className="lede">
          Founded by Krish Chandhok, who has been building things that fly since he was nine.
        </p>
      </Reveal>
      <div className="team">
        {TEAM.map(([src, name, role], i) => (
          <Reveal className="member" key={name} delay={i * 0.06}>
            <img src={src} alt={name} loading="lazy" />
            <div className="nm">{name}</div>
            <div className="rl">{role}</div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Close = () => (
  <section className="band close band--line" id="contact">
    <div className="wrap">
      <Reveal>
        <h2>
          The sky above your city is empty.
          <br />
          <span style={{ color: 'var(--accent)' }}>We are going to use it.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <a className="mail" href="mailto:info@flyhivetechnologies.com">
          info@flyhivetechnologies.com
        </a>
      </Reveal>
    </div>
  </section>
);
