import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Shop } from './pages/Shop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NaturalSupplements } from './pages/NaturalSupplements';
import { LifestyleEssentials } from './pages/LifestyleEssentials';
import { Services } from './pages/Services';
import { Location } from './pages/Location';
import { Consultation } from './pages/Consultation';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/shop" element={<Layout><Shop /></Layout>} />
        <Route path="/shop/natural-supplements" element={<Layout><NaturalSupplements /></Layout>} />
        <Route path="/shop/lifestyle-essentials" element={<Layout><LifestyleEssentials /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/location" element={<Layout><Location /></Layout>} />
        <Route path="/consultation" element={<Layout><Consultation /></Layout>} />
      </Routes>
    </>
  );
}

export default App;