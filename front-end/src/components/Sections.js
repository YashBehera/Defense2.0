import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Reveal, Words, Counter } from './Reveal';
import { CityScene, CraftScene, NetworkScene } from './Scenes';
import Waitlist from './Waitlist';

import krish from '../assets/krish.JPG';
import daljeet from '../assets/daljeet.JPG';
import harmeet from '../assets/harmeet.JPG';
import nikhil from '../assets/nikhil.JPG';

/* ================================================================= */

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const typeY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const typeFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <header className="hero" id="top" ref={ref}>
      <div className="hero-canvas">
        <CityScene progress={scrollYProgress} />
      </div>

      <motion.div className="wrap" style={{ y: typeY, opacity: typeFade }}>
        <span className="eyebrow red">FlyHive Technologies</span>
        <h1 className="display hero-type">
          <Words text="15 km across a city" onMount delay={0.05} />
          <Words text="takes an hour." onMount delay={0.18} />
          <Words
            text="In the air it takes seven minutes."
            onMount
            delay={0.34}
            className="dim"
          />
        </h1>
        <Reveal onMount delay={0.75}>
          <p className="hero-sub">
            FlyHive is a city airline. We build our own electric aircraft, we build our own
            stations, and we fly them ourselves. The first seats will not go on sale publicly.
            They go to the list.
          </p>
        </Reveal>
        <Reveal onMount delay={0.88}>
          <div className="hero-foot">
            <a className="btn" href="#waitlist">Join the waitlist</a>
            <span className="scrollcue"><i />Scroll</span>
          </div>
        </Reveal>
      </motion.div>
    </header>
  );
}

/* ================================================================= */
/* The two ways to cross fifteen kilometres, drawn as you scroll.     */

const ROAD =
  'M40 250 C 120 250, 110 170, 190 170 S 250 250, 320 250 S 360 150, 430 150 ' +
  'S 470 240, 540 240 S 590 160, 660 160 S 700 235, 770 235 S 830 185, 862 185';
const AIR = 'M40 250 C 260 10, 640 10, 862 185';

function CrossingDiagram({ progress }) {
  const roadRef = useRef(null);
  const airRef = useRef(null);
  const roadDot = useRef(null);
  const airDot = useRef(null);

  const roadLen = useTransform(progress, [0.08, 0.95], [0, 1]);
  const airLen = useTransform(progress, [0.08, 0.26], [0, 1]);

  const place = (pathEl, dotEl, t) => {
    if (!pathEl || !dotEl) return;
    const total = pathEl.getTotalLength();
    const p = pathEl.getPointAtLength(total * Math.max(0, Math.min(1, t)));
    dotEl.setAttribute('cx', p.x);
    dotEl.setAttribute('cy', p.y);
    dotEl.setAttribute('opacity', t > 0.002 && t < 0.999 ? 1 : 0);
  };

  useMotionValueEvent(roadLen, 'change', (v) => place(roadRef.current, roadDot.current, v));
  useMotionValueEvent(airLen, 'change', (v) => place(airRef.current, airDot.current, v));

  useEffect(() => {
    place(roadRef.current, roadDot.current, 0);
    place(airRef.current, airDot.current, 0);
  }, []);

  return (
    <svg viewBox="0 0 900 300" className="crossing" aria-hidden="true">
      <line x1="40" y1="274" x2="862" y2="274" stroke="var(--line)" strokeWidth="1" />
      <text x="40" y="294" className="cx-lab">Where you are</text>
      <text x="862" y="294" className="cx-lab" textAnchor="end">15 km away</text>

      <path d={ROAD} fill="none" stroke="var(--line-2)" strokeWidth="2" strokeDasharray="3 6" />
      <path d={AIR} fill="none" stroke="var(--line-2)" strokeWidth="2" strokeDasharray="3 6" />

      <motion.path
        ref={roadRef}
        d={ROAD}
        fill="none"
        stroke="var(--ink-3)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ pathLength: roadLen }}
      />
      <motion.path
        ref={airRef}
        d={AIR}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3.5"
        strokeLinecap="round"
        style={{ pathLength: airLen }}
      />

      <circle ref={roadDot} r="6" fill="var(--ink)" opacity="0" />
      <circle ref={airDot} r="7" fill="var(--accent)" opacity="0" />

      <g className="cx-key">
        <text x="200" y="128" fill="var(--ink-3)">60 minutes by road</text>
        <text x="300" y="62" fill="var(--accent)">7 minutes in the air</text>
      </g>
    </svg>
  );
}

export function Problem() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <section className="band paper" id="problem" ref={ref}>
      <div className="wrap">
        <Reveal><span className="eyebrow">The problem</span></Reveal>
        <h2 className="statement">
          <Words text="You cannot widen a city." />
        </h2>
        <Reveal delay={0.1}>
          <p className="lede">
            Roads stopped getting better twenty years ago and they are not going to start
            again, because there is no room left to add. Every new lane fills the day it
            opens. Meanwhile the airspace directly above all of it is <strong>completely
            empty</strong>.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="crossing-box">
            <CrossingDiagram progress={scrollYProgress} />
          </div>
        </Reveal>

        <div className="figures">
          <div className="figure">
            <b><Counter to={60} /></b>
            <span>Minutes by road</span>
          </div>
          <div className="figure red">
            <b><Counter to={7} /></b>
            <span>Minutes in the air</span>
          </div>
          <div className="figure">
            <b><Counter to={0} suffix="%" /></b>
            <span>Of the sky in use</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================= */

export function Gap() {
  return (
    <section className="band">
      <div className="wrap">
        <Reveal><span className="eyebrow">Why it is still empty</span></Reveal>
        <h2 className="statement wide">
          <Words text="Two things are missing, and neither of them is physics." />
        </h2>
        <Reveal delay={0.1}>
          <p className="lede">
            Flying a person fifteen kilometres was solved decades ago. What does not exist is
            an aircraft cheap enough to run a trip that short, and anywhere inside a city to
            land one. So we are building both.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================= */

const STEPS = [
  ['01', 'Book it on your phone', 'Pick where you are going and take a seat on the next flight out. It takes seconds.'],
  ['02', 'Go to the nearest station', 'Stations sit where people already are, the same way metro stations do. You walk in. No airport, no check in, no security theatre.'],
  ['03', 'Hop on', 'Four seats, electric, straight up and straight down. Seven minutes for the trip that takes an hour on the road.'],
  ['04', 'Walk out the other side', 'Into the city, not into a terminal thirty kilometres from where you were going.'],
];

export function HowItWorks() {
  return (
    <section className="band paper" id="how">
      <div className="wrap">
        <Reveal><span className="eyebrow">How it works</span></Reveal>
        <h2 className="statement wide">
          <Words text="You walk in. You get on. You get off." />
        </h2>
        <div className="steps">
          {STEPS.map(([n, h, p], i) => (
            <Reveal className="step" key={n} delay={i * 0.07} y={20}>
              <span className="n">{n}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================= */
/* The aircraft. Revolving, scanned, and never brought into focus.    */

const SPECS = [
  ['Seats', '4'],
  ['Power', 'Fully electric'],
  ['Take off', 'Straight up'],
  ['15 km', '7 minutes'],
  ['Airframe', null],
  ['Range', null],
  ['First flight', null],
  ['Where it flies first', null],
];

export function Craft() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // sharpens on approach, then softens again. it never resolves.
  const blur = useTransform(
    scrollYProgress,
    [0, 0.35, 0.6, 1],
    ['blur(26px)', 'blur(10px)', 'blur(13px)', 'blur(26px)']
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.08]);

  return (
    <section className="band" id="aircraft" ref={ref}>
      <div className="wrap">
        <Reveal><span className="eyebrow">The aircraft</span></Reveal>
        <div className="craft">
          <Reveal y={30}>
            <div className="craft-stage">
              <div className="craft-grid" />
              <motion.div
                style={{ position: 'absolute', inset: 0, filter: blur, scale }}
              >
                <CraftScene />
              </motion.div>
              <div className="craft-scan" />
              <div className="craft-tag"><em />Withheld until first flight</div>
            </div>
          </Reveal>

          <div>
            <h2 className="statement">
              <Words text="We are not showing it to you yet." />
            </h2>
            <Reveal delay={0.1}>
              <p className="lede narrow">
                It is designed. Every tube, every joint, every number. It is being built now.
                What it looks like, how far it goes and what a seat costs are things we would
                rather show you once than describe a hundred times.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <dl className="spec">
                {SPECS.map(([k, v]) => (
                  <div className="spec-row" key={k}>
                    <dt>{k}</dt>
                    {v ? <dd>{v}</dd> : <dd><span className="redacted" /></dd>}
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="lede narrow" style={{ marginTop: 26 }}>
                Four of those eight lines are blacked out on purpose. They get filled in one at
                a time, and <strong>the list hears before the internet does</strong>.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================= */
/* The network, pinned: stations land and routes multiply as you go.  */

export function Network() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="stage" id="network" ref={ref} style={{ height: '280svh' }}>
      <div className="pin">
        <div className="wrap">
          <div className="net-split">
            <div className="net-copy">
              <span className="eyebrow">The network</span>
              <h2 className="statement">
                <Words text="Every station makes every other station worth more." />
              </h2>
              <p className="lede narrow">
                The aircraft will become a commodity, the way every aircraft eventually does.
                The usable sites in a dense city will not. That is the business.
              </p>
              <div className="net">
                <div className="net-cell">
                  <span className="s">2 stations</span>
                  <span className="r">1</span>
                </div>
                <div className="net-cell">
                  <span className="s">10 stations</span>
                  <span className="r">45</span>
                </div>
                <div className="net-cell">
                  <span className="s">20 stations</span>
                  <span className="r">190</span>
                </div>
              </div>
            </div>
            <div className="net-stage">
              <NetworkScene progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================= */

const PEOPLE = [
  [krish, 'Krish Chandhok', 'Founder & CEO'],
  [daljeet, 'Daljeet Chandhok', 'Director'],
  [harmeet, 'Harmeet Kaur', 'Director'],
  [nikhil, 'Nikhil Gupta', 'International Strategic Advisor'],
];

export function Company() {
  return (
    <section className="band paper" id="company">
      <div className="wrap">
        <Reveal><span className="eyebrow">The company</span></Reveal>
        <h2 className="statement wide">
          <Words text="FlyHive Technologies" />
        </h2>
        <Reveal delay={0.1}>
          <p className="lede">
            Recognised by the Ministry of Commerce and Industry under aeronautics, aerospace
            and defence. DPIIT certificate DIPP262989. Founded by Krish Chandhok, who has been
            building things that fly since he was nine.
          </p>
        </Reveal>
        <div className="people">
          {PEOPLE.map(([src, name, role], i) => (
            <Reveal className="person" key={name} delay={i * 0.06} y={18}>
              <figure>
                <img className="ph" src={src} alt={name} loading="lazy" />
                <figcaption>
                  <div className="nm">{name}</div>
                  <div className="rl">{role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Close() {
  return (
    <section className="band close-band">
      <div className="wrap">
        <h2 className="display">
          <Words text="The sky above your city is empty." />
          <Words text="We are going to use it." className="red" delay={0.12} />
        </h2>
        <Reveal delay={0.4}>
          <div className="hero-foot">
            <a className="btn" href="#waitlist">Join the waitlist</a>
            <a className="btn ghost" href="mailto:info@flyhivetechnologies.com">
              info@flyhivetechnologies.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { Waitlist };
