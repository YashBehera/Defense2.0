import React from 'react';
import { Reveal, Words } from './Reveal';

// Posts to whatever endpoint is in REACT_APP_WAITLIST_URL, falling back to the
// Google Apps Script web app below. Works with Formspree, Tally or any URL that
// accepts a JSON body. The body goes out as text/plain on purpose: that skips the
// CORS preflight, which Apps Script web apps do not answer.
// With no endpoint configured the address is kept locally so it is never lost.
const ENDPOINT = process.env.REACT_APP_WAITLIST_URL || '';

const Waitlist = () => {
  const [email, setEmail] = React.useState('');
  const [state, setState] = React.useState('idle'); // idle | sending | done | error

  const submit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setState('error');
      return;
    }
    setState('sending');

    // Kept whether or not the post lands, so an address is never silently dropped.
    try {
      const prev = JSON.parse(localStorage.getItem('fh_waitlist') || '[]');
      if (!prev.includes(value)) {
        localStorage.setItem('fh_waitlist', JSON.stringify([...prev, value]));
      }
    } catch (_) {}

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ email: value, source: 'website' }),
        });
        if (!res.ok) throw new Error('bad response');
      }
    } catch (_) {
      // never show the visitor a failure, the address is already kept above
    }
    setState('done');
  };

  return (
    <section className="band wl" id="waitlist">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Be first</span>
          <h2 className="statement wide">
            <Words text="The first flights will not be a public launch." />
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="lede">
            A small number of seats, offered to a small number of people, before anybody
            else hears about it. The list also sees the aircraft first, and finds out
            where we fly first, before either becomes public.
          </p>
        </Reveal>

        {state === 'done' ? (
          <Reveal delay={0.1}>
            <div className="wl-done">
              <div className="big">You're on the list.</div>
              <p>You'll see the aircraft before it goes public, and you'll know where we
                fly first before anyone else does.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <form className="wl-form" onSubmit={submit} noValidate>
              <label htmlFor="wl-email" style={{ position: 'absolute', left: '-9999px' }}>
                Email address
              </label>
              <input
                id="wl-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === 'error') setState('idle');
                }}
              />
              <button type="submit" disabled={state === 'sending'}>
                {state === 'sending' ? 'Joining' : 'Join the waitlist'}
              </button>
            </form>
            {state === 'error' && <div className="wl-err">That doesn't look like an email address.</div>}
            <div className="wl-note">One email when seats open. Nothing else, ever.</div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Waitlist;
