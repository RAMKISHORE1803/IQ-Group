'use client';

import { useEffect, useRef } from 'react';
import HeroSection from './hero-section';
import AboutSection from './about-section';
import CompanySection from './company-section';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobalConstructionPlatform from './globalMap';

// Utility function for debouncing
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const isMobile = () => {
  return window.innerWidth < 768;
}

export default function LandingPage() {
  const companyRef = useRef(null);
  const globalMapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Need to ensure we're in the browser
    if (typeof window === 'undefined') return;

    // Register ScrollTrigger plugin only
    gsap.registerPlugin(ScrollTrigger);

    // Set up the curtain reveal effect
    const setupCurtainReveal = () => {
      if (!companyRef.current || !globalMapRef.current || !containerRef.current) return;

      // Reset any existing ScrollTriggers for this container
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === containerRef.current) {
          st.kill();
        }
      });
      
      // Reset any transforms before setting up new animation
      gsap.set([companyRef.current, globalMapRef.current], {
        clearProps: "all"
      });
      
      // Initial setup
      gsap.set(containerRef.current, {
        position: 'relative',
        overflow: 'visible',
        height:"140vh",
        backgroundColor: '#fbfbfb'
      });
      
      gsap.set(globalMapRef.current, {
        position: 'absolute',
        top: isMobile() ? "33%" : "30%",
        left: 0,
        width: '100%',
        height: "100vh",
        zIndex: 2,
        backgroundColor: 'white',
        overflow: 'hidden'
      });
      
      gsap.set(companyRef.current, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflowY:'hidden',
        zIndex: 3,
        backgroundColor: 'white'
      });

      // Create the curtain animation
        gsap.to(companyRef.current, {
          yPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center 30%",
            end: "bottom  10%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            duration:4,
            markers: true,
            invalidateOnRefresh: true,
            pinSpacing: true,
            onLeave: () => {
              // Make global map scrollable after animation
              gsap.set(globalMapRef.current, {
                position: 'relative',
                top: isMobile() ? "33%" : "33%",
                height: 'auto',
                minHeight: '100vh',
                overflow: 'visible',
                overflowY: 'auto',
                pointerEvents: 'auto' // Enable interactions
              });

              // Ensure the container allows scrolling
              gsap.set(containerRef.current, {
                height: 'auto',
                minHeight: '130vh',
                overflow: 'visible'
              });
            },
            onEnterBack: () => {
              // Reset global map to initial state when scrolling back
              gsap.set(globalMapRef.current, {
                position: 'absolute',
                top: isMobile() ? "33%" : "30%",
                height: "100vh",
                overflow: 'hidden'
              });

              // Reset container
              gsap.set(containerRef.current, {
                height: "140vh",
                overflow: 'visible'
              });
            }
          }
        });
      };

    // Initial setup with a small delay to ensure DOM is ready
    const initTimeout = setTimeout(setupCurtainReveal, 100);

    // Handle window resize with custom debounce
    const handleResize = debounce(setupCurtainReveal, 250);

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="bg-white">
      <main className="relative">
        <HeroSection />
        <AboutSection />
        
        {/* ✅ CLEAN STRUCTURE - No Tailwind positioning conflicts */}
        <div ref={containerRef}>
          {/* Global Map - Background content */}
          <div ref={globalMapRef}>
            <GlobalConstructionPlatform />
            <CompanySection/>
            <div className='min-h-[20vh] bg-[#000000]'></div>
          </div>
          
          {/* Company Section - Curtain that slides up */}
          <div ref={companyRef} className='overflow-hidden'>
            <CompanySection />
            <div className='h-20 bg-gray-100'></div>
          </div>
        </div>
      </main>
    </div>
  );
} 