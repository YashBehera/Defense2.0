import React from 'react';
import { Reveal, Words } from '../components/Reveal';

const ENDPOINT = process.env.REACT_APP_CONTACT_URL || process.env.REACT_APP_WAITLIST_URL || '';

const REASONS = [
  ['Investors', 'For the deck, the numbers behind CT1 and the raise.', 'Investment'],
  ['Engineers', 'Structures, power, control. Send the thing you built.', 'Working here'],
  ['Press', 'Interviews, photographs and anything on the record.', 'Press'],
  ['Everything else', 'Partnerships, suppliers, stations, or a plain question.', 'General'],
];

export default function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', about: 'General', message: '' });
  const [state, setState] = React.useState('idle');

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (state === 'error') setState('idle');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) || !form.message.trim()) {
      setState('error');
      return;
    }
    setState('sending');
    try {
      const prev = JSON.parse(localStorage.getItem('fh_contact') || '[]');
      localStorage.setItem('fh_contact', JSON.stringify([...prev, form]));
    } catch (_) {}
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ ...form, source: 'contact' }),
        });
        if (!res.ok) throw new Error('bad response');
      }
    } catch (_) {
      // the visitor still gets the email address below, so never show a failure
    }
    setState('done');
  };

  return (
    <>
      <section className="band page-head">
        <div className="wrap">
          <Reveal onMount><span className="eyebrow red">Contact</span></Reveal>
          <h1 className="display">
            <Words text="Talk to us." onMount delay={0.05} />
          </h1>
          <Reveal onMount delay={0.3}>
            <p className="lede">
              One address reaches everybody here, and it is read the same day.
            </p>
          </Reveal>
          <Reveal onMount delay={0.42}>
            <a className="mailto" href="mailto:info@flyhivetechnologies.com">
              info@flyhivetechnologies.com
            </a>
          </Reveal>
        </div>
      </section>

      <section className="band paper tight">
        <div className="wrap">
          <div className="reasons">
            {REASONS.map(([h, p], i) => (
              <Reveal className="reason" key={h} delay={i * 0.05} y={18}>
                <h3>{h}</h3>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="contact-split">
            <div>
              <Reveal><span className="eyebrow">Send a message</span></Reveal>
              <h2 className="statement">
                <Words text="Or write it here." />
              </h2>
              <Reveal delay={0.1}>
                <p className="lede narrow">
                  It lands in the same inbox. Tell us which of the four you are and what you
                  want, and you will get a real answer rather than an acknowledgement.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} y={22}>
              {state === 'done' ? (
                <div className="sent">
                  <div className="big">Message sent.</div>
                  <p>
                    You will hear back at {form.email}. If it is urgent, email
                    info@flyhivetechnologies.com directly and it jumps the queue.
                  </p>
                </div>
              ) : (
                <form className="cform" onSubmit={submit} noValidate>
                  <label>
                    <span>Your name</span>
                    <input type="text" value={form.name} onChange={set('name')} autoComplete="name" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label>
                    <span>What about</span>
                    <select value={form.about} onChange={set('about')}>
                      {REASONS.map(([, , v]) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Message</span>
                    <textarea rows="5" value={form.message} onChange={set('message')} required />
                  </label>
                  {state === 'error' && (
                    <div className="cform-err">
                      A working email address and a message, and it goes.
                    </div>
                  )}
                  <button className="btn" type="submit" disabled={state === 'sending'}>
                    {state === 'sending' ? 'Sending' : 'Send message'}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band paper tight">
        <div className="wrap">
          <div className="co-meta">
            <div>
              <span className="k">Company</span>
              <p>FlyHive Technologies Pvt Ltd</p>
            </div>
            <div>
              <span className="k">Recognition</span>
              <p>DPIIT certificate DIPP262989, aeronautics, aerospace and defence</p>
            </div>
            <div>
              <span className="k">Email</span>
              <p>
                <a href="mailto:info@flyhivetechnologies.com">info@flyhivetechnologies.com</a>
              </p>
            </div>
            <div>
              <span className="k">Elsewhere</span>
              <p>
                <a
                  href="https://www.linkedin.com/company/flyhive-technologies"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  LinkedIn
                </a>
                {'  '}
                <a
                  href="https://www.instagram.com/flyhive.technologies"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Instagram
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
