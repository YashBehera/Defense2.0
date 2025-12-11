import React from 'react';

const MasterPlanSection = () => {
  const phases = [
    'Phase 1: Airport Transfers (Archer-inspired)',
    'Phase 2: Medical Services (EHang autonomy)',
    'Phase 3: Mass Urban Transport by 2035 (Sarla + Aridge)'
  ];

  return (
    <section style={{ padding: '40px 20px' }}>
      <h2>Masterplan for eVTOL</h2>
      <ul>{phases.map((phase, index) => <li key={index}>{phase}</li>)}</ul>
      <div className="quote">"From vision to skies." – Adrian Schmidt</div>
    </section>
  );
};

export default MasterPlanSection;