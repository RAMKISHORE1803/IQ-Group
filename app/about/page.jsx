'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/about/HeroSection';
import WhatWeDoSection from '@/components/about/WhatWeDoSection';
import HowWeDoSection from '@/components/about/HowWeDoSection';
import OurValuesSection from '@/components/about/OurValuesSection';
import LeadershipSection from '@/components/about/LeadershipSection';
import OfficeLocationsSection from '@/components/about/OfficeLocationsSection';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Section links for "In This Section" navigation
const sectionLinks = [
  {
    title: "What We Do",
    link: "#what-we-do"
  },
  {
    title: "How We Do",
    link: "#how-we-do"
  },
  {
    title: "Our Values",
    link: "#our-values"
  },
  {
    title: "Leadership",
    link: "#leadership"
  },
  {
    title: "Office Locations",
    link: "#office-locations"
  }
];

export default function AboutPage() {
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
    <div className="about-page bg-white">
      {/* Hero Section */}
      <HeroSection 
        title="About IQ Group"
        subtitle="Powering industries with premium raw materials delivered with precision, integrity, and speed. Global reach, Mumbai roots."
        backgroundImage="https://images.unsplash.com/photo-1661103391619-46e3175b3152?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        sideText="ABOUT US"
        navTitle="ABOUT"
        sectionLinks={sectionLinks}
      />

      {/* Main Content */}
      <div className="relative z-20 bg-white">
        {/* What We Do Section */}
        <WhatWeDoSection />
        
        {/* How We Do Section */}
        <HowWeDoSection />
        
        {/* Our Values Section */}
       
      </div>
      <div className="relative z-20 bg-white">
      <OurValuesSection />
        
        
        <LeadershipSection />
        
        
        <OfficeLocationsSection />
      </div>
    </div>
  );
} 