import React, { useState } from 'react';
import Header from './components/Header';
import CompanySection from './components/CompanySection';
import MasterplanSection from './components/MasterPlanSection.js';
import Footer from './components/Footer';
import Home from './pages/Home.js';

function App() {
  const [activeSection, setActiveSection] = useState('Home');

  const sections = [
    { id: 'Home', name: 'Home' },
    { id: 'company', name: 'Company' },
    { id: 'masterplan', name: 'Masterplan' }
  ];

  return (
    <div className="App">
      <Header sections={sections} activeSection={activeSection} onNavClick={setActiveSection} />
      <main>
        {activeSection === 'Home' ? <Home /> : null}
        {activeSection === 'company' ? <CompanySection /> : null}
        {activeSection === 'masterplan' ? <MasterplanSection /> : null}
      </main>
      <Footer />
    </div>
  );
}

export default App;