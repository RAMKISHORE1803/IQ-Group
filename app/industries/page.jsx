'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import HeroSection from '@/components/industries/HeroSection';
import IndustriesOverviewSection from '@/components/industries/IndustriesOverviewSection';
import IndustryCardsSection from '@/components/industries/IndustryCardsSection';
import CallToActionSection from '@/components/industries/CallToActionSection';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Section links for "In This Section" navigation
const sectionLinks = [
  {
    title: "Overview",
    link: "#industries-overview"
  },
  {
    title: "Industry Expertise",
    link: "#industry-cards"
  }
];

export default function IndustriesPage() {
  const smoother = useRef(null);
  const wrapper = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // Initialize scroll animations if needed
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      // Clean up any ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="industries-page bg-white">
      {/* Hero Section */}
      <HeroSection 
        title="Industries"
        subtitle="Powering diverse sectors with premium raw materials delivered with precision, integrity, and reliability. Tailored solutions for every industry need."
        backgroundImage="https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        sideText="INDUSTRIES"
        navTitle="INDUSTRIES"
        sectionLinks={sectionLinks}
      />

      {/* Main Content */}
      <div className="relative z-20 bg-white">
        {/* Industries Overview Section */}
        <IndustriesOverviewSection />
        
        {/* Industry Cards Section */}
        <IndustryCardsSection />
        
        {/* Call to Action Section */}
        <CallToActionSection />
      </div>
    </div>
  );
} 