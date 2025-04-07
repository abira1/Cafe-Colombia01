import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { MenuSection } from './MenuSection';
import { EventsSection } from './EventsSection';
import { GallerySection } from './GallerySection';
import { OffersSection } from './OffersSection';
import { ReviewsSection } from './ReviewsSection';
import { TopRatedSection } from './TopRatedSection';
import { ContactSection } from './ContactSection';

export function Website() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <EventsSection />
        <GallerySection />
        <OffersSection />
        <ReviewsSection />
        <TopRatedSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
} 