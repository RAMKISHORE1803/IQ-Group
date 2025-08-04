'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import SectionNavigation from '@/components/companies/SectionNavigation';
import IndustriesOverviewSection from '@/components/industries/IndustriesOverviewSection';
import IndustryCardsSection from '@/components/industries/IndustryCardsSection';
import SectionWithCards from '@/components/companies/SectionWithCards';

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
  },
  {
    title: "Global Industries",
    link: "#global-industries"
  },
  
];

// Global industries overview cards
const globalIndustriesCards = [
  {
    title: "Precision Engineering",
    description: "Materials crafted at the intersection of science and perfection. Every particle designed to elevate your manufacturing process."
  },
  {
    title: "Industry Intelligence",
    description: "Specialists who anticipate challenges before they emerge. We see beyond materials to the transformative potential they hold."
  },
  {
    title: "Unwavering Consistency",
    description: "When markets fluctuate, our quality doesn't. Rigorous standards applied across continents to deliver uncompromising performance every time."
  },
  {
    title: "Boundless Innovation",
    description: "Constantly pushing material boundaries to unlock new possibilities. Today's limitations become tomorrow's breakthroughs through our solutions."
  }
];

const industriesOverviewCards = [
  {
    title: "Uncompromising Quality",
    description: "Molecular-level precision in every material we deliver. Setting new standards that transform ordinary products into exceptional ones."
  },
  {
    title: "Visionary Partnership",
    description: "We don't just supply materials—we fuel your innovation. Your challenges become our mission, your success our benchmark."
  },
  {
    title: "Limitless Reliability",
    description: "When others can't deliver, we already have. Global networks meticulously built to ensure your production never stops."
  },
  {
    title: "Transformative Solutions",
    description: "Beyond materials—we deliver possibilities. Each product carefully selected to unlock new potential in your manufacturing process."
  }
];

export default function IndustriesPage() {
  const smoother = useRef(null);
  const wrapper = useRef(null);
  const content = useRef(null);
  const overviewRef = useRef(null);
  const globalIndustriesRef = useRef(null);
  const industryCardsRef = useRef(null);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // Initialize scroll animations if needed
      ScrollTrigger.refresh();

      // Create animation for each section
      const sections = [
        { ref: overviewRef, delay: 0 },
        { ref: globalIndustriesRef, delay: 0.1 },
        { ref: industryCardsRef, delay: 0.2 }
      ];

      sections.forEach(({ ref, delay }) => {
        if (!ref.current) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }).fromTo(
          ref.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay, ease: 'power2.out' }
        );
      });
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
        title=""
        subtitle="We power industries with premium raw materials—precise, reliable, and tailored for every need.
"
        backgroundImage="/industriesbg.webp"
        sideText="INDUSTRIES"
        navTitle="INDUSTRIES"
      />

      {/* Main Content */}
      <div className="relative z-20 bg-white">
        {/* Section Navigation */}
        <SectionNavigation links={sectionLinks} />
        
        {/* Industries Overview Section */}
        <div ref={overviewRef} id="industries-overview">
          {/* <IndustriesOverviewSection /> */}
          <SectionWithCards 
            title="Industries Overview"
            subtitle="Serving Global Industries with Premium Materials"
            cards={industriesOverviewCards}
            background="white"
            sectionNumber="01"
          />
        </div>

        <div ref={industryCardsRef} id="industry-cards">
          <section className="py-4 lg:py-4 px-4 md:px-8 lg:px-24 bg-gray">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-wider font-lato text-gray-500 mb-2">IN THIS SECTION</p>
                  <span className="text-4xl font-bold font-lato text-[#203663]">02</span>
                </div>
                <h2 className="text-3xl uppercase md:text-4xl font-bold font-lato text-[#203663] mb-6">Industry Expertise</h2>
                <p className="text-xl text-gray-700 font-lato">Specialized solutions for diverse industrial sectors with tailored materials and technical support</p>
              </div>
              <IndustryCardsSection />
            </div>
          </section>
        </div>
        
        {/* Global Industries Section */}
        <div ref={globalIndustriesRef} id="global-industries">
          <SectionWithCards
            title="Serving Global Industries"
            subtitle="Delivering premium materials and technical expertise to diverse industries worldwide"
            cards={globalIndustriesCards}
            background="white"
            sectionNumber="03"
          />
        </div>
        
        {/* Industry Cards Section */}
       
      </div>
    </div>
  );
} 