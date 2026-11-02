import React from 'react';
import {
  Hero,
  Problem,
  Gap,
  HowItWorks,
  Craft,
  Network,
  Company,
  Close,
  Waitlist,
} from '../components/Sections';

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Gap />
      <HowItWorks />
      <Waitlist />
      <Craft />
      <Network />
      <Company />
      <Close />
    </>
  );
}
