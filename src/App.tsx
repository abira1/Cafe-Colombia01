import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { TopRatedSection } from './components/TopRatedSection';
import { OffersSection } from './components/OffersSection';
import { ReviewsSection } from './components/ReviewsSection';
import { EventsSection } from './components/EventsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLayout } from './components/admin/AdminLayout';
import { AuthProvider } from './context/AuthContext';
function MainContent() {
  return <div className="font-sans text-gray-800">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <TopRatedSection />
        <MenuSection />
        <OffersSection />
        <ReviewsSection />
        <EventsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>;
}
export function App() {
  return <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Router>
    </AuthProvider>;
}