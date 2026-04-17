import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ExperienceSection from '../sections/ExperienceSection';
import ServicesSection from '../sections/ServicesSection';
import StatsSection from '../sections/StatsSection';
import SkillsSection from '../sections/SkillsSection';
import EducationSection from '../sections/EducationSection';
import OrganizationSection from '../sections/OrganizationSection';
import FaqSection from '../sections/FaqSection';
import ContactSection from '../sections/ContactSection';

export default function PublicPortfolio() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ServicesSection />
        <StatsSection />
        <SkillsSection />
        <EducationSection />
        <OrganizationSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
