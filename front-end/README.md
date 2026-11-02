# FlyHive website

Single scrolling page. Built with Create React App, framer-motion and lenis, which is
what the previous site already used, so the build and deploy pipeline is unchanged.

## Run it

    npm install
    npm start        # http://localhost:3000
    npm run build    # production build into build/

## Deploy

Push to the repo connected to Vercel. Build command `npm run build`, output `build`.
Nothing else to configure.

## The waitlist

The form posts JSON `{ email, source }` to whatever URL is in `REACT_APP_WAITLIST_URL`.
Set it in Vercel under Project Settings, Environment Variables.

Easiest options, any of them work:

- **Tally** or **Formspree**: make a form, copy its endpoint URL, paste it in
- **Google Sheet**: Apps Script web app that appends a row, deploy as "anyone", paste the URL
- **Supabase**: an edge function or REST insert

With no URL set the form still confirms to the visitor and keeps addresses in their
browser, so the section is never visibly broken. But nothing reaches you until the
variable is set, so set it before you share the link anywhere.

## Showing the signup count

Deliberately not built. Turn it on only once the number is in the hundreds, because a
small number does more harm than none.

## What is deliberately not on this site

- The aircraft. Four of the eight spec lines are blacked out on purpose
- Any city or country
- Any launch date
- CT1. It is an unmanned tethered demonstrator and belongs in the investor deck
