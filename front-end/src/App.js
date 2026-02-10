import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home.js';
import Company from './pages/Company';
import Team from './pages/Team';
import ContactPage from './components/ContactPage';
import ScrollToTop from './components/ScrollToTop.js';

// Component to extract current path and map to active section for Header
const MainLayout = () => {
  const location = useLocation();

  // Map pathname to section ID for active state in Header
  const pathnameToSectionId = {
    '/': 'Home',
    '/company': 'company',
    '/team': 'team',
    '/masterplan': 'masterplan',
    '/contact': 'Home' // optional: keep Home active on contact, or add 'contact' to sections
  };

  const activeSection = pathnameToSectionId[location.pathname] || 'Home';

  const sections = [
    { id: 'Home', name: 'Home', path: '/' },
    { id: 'company', name: 'Company', path: '/company' },
    { id: 'team', name: 'Team', path: '/team' }
  ];

  return (
    <div className="App">
      <Header
        sections={sections}
        activeSection={activeSection}
        ctaText="Contact Us"
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Optional: 404 fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout />
    </Router>
  );
}

export default App;