import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import CompanySection from './components/CompanySection';
import MasterplanSection from './components/MasterPlanSection.js';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'company', name: 'Company' },
    { id: 'masterplan', name: 'Masterplan' }
  ];

  return (
    <div className="App">
      <Header sections={sections} activeSection={activeSection} onNavClick={setActiveSection} />
      <main>
        <Hero />
        {activeSection === 'hero' || activeSection === 'product' ? <ProductSection /> : null}
        {activeSection === 'company' ? <CompanySection /> : null}
        {activeSection === 'masterplan' ? <MasterplanSection /> : null}
      </main>
      <Footer />
    </div>
  );
}

export default App;