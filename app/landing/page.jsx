'use client';

import { useEffect, useRef } from 'react';
import HeroSection from './hero-section';
import GetStartedSection from './get-started-section';
import AboutSection from './about-section';
import CompaniesSection from './companies-section';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LandingPage() {
  const smoother = useRef(null);
  const wrapper = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    // Need to ensure we're in the browser
    if (typeof window === 'undefined') return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    // Wait a bit for DOM to be ready
    const initTimeout = setTimeout(() => {
      // Initialize ScrollSmoother
      smoother.current = ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true, // Helps with cross-browser consistency
        ignoreMobileResize: true,
      });

      // Force scroll trigger refresh after smoother is created
      ScrollTrigger.refresh();
      console.log("ScrollSmoother initialized");
    }, 100);

    // Clean up on component unmount
    return () => {
      clearTimeout(initTimeout);
      if (smoother.current) {
        smoother.current.kill();
      }
      // Kill all scroll triggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-black text-white">
      {/* <div ref={wrapper} className="smooth-wrapper"> */}
        {/* <div ref={content} className="smooth-content min-h-screen"> */}
          <HeroSection />
          <GetStartedSection />
          <AboutSection />
          <CompaniesSection />
          
        {/* </div> */}
      {/* </div> */}
    </main>
  );
} 