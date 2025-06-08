'use client';

import { useEffect, useRef } from 'react';
import HeroSection from './hero-section';
import AboutSection from './about-section';
import CompanySection from './company-section';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobalConstructionPlatform from './globalMap';
import MobileView from '@/components/companies/MobileView';
import IndustriesSection from './industries-section';
import {allCompanies} from '@/components/companies/CompanyData';
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
  const globalMapWrapperRef = useRef(null);
  const globalMapContentRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    const setupCurtainReveal = () => {
      if (!globalMapWrapperRef.current || !globalMapContentRef.current) return;

      // Clear existing triggers
      ScrollTrigger.getAll().forEach(st => st.kill());

      // Reset any previous animations
      gsap.set([globalMapWrapperRef.current, globalMapContentRef.current], {
        clearProps: "all"
      });

      // Set up wrapper - acts as a viewport window during animation only
      gsap.set(globalMapWrapperRef.current, {
        overflow: 'hidden',
        position: 'relative',
        height: '100vh' // Fixed height only during reveal
      });

      // Set initial position - content starts just above the viewport
      gsap.set(globalMapContentRef.current, {
        y: '-50vh', // Start 50vh above the container
        willChange: 'transform'
      });

      // Create the reveal animation
      gsap.to(globalMapContentRef.current, {
        y: 0, // Slide to natural position
        ease: "none",
        scrollTrigger: {
          trigger: globalMapWrapperRef.current,
          start: "top 80%",    
          end: "top 20%",      
          scrub: 1,
          markers: false,
          invalidateOnRefresh: true,
          
          onLeave: () => {
            console.log("Animation complete - releasing container constraints");
            
            // ✅ CRITICAL: Release all height/overflow constraints
            gsap.set(globalMapWrapperRef.current, {
              height: 'auto',
              overflow: 'visible',
              position: 'static' // Return to normal document flow
            });
            
            // ✅ Reset content transform to prevent any positioning issues
            gsap.set(globalMapContentRef.current, {
              y: 0,
              transform: 'none',
              willChange: 'auto'
            });
            
            // ✅ Force ScrollTrigger to recalculate everything
            ScrollTrigger.refresh(true);
          },
          
          onEnterBack: () => {
            console.log("Re-entering animation area - restoring constraints");
            
            // Reset to animation state
            gsap.set(globalMapWrapperRef.current, {
              height: '100vh',
              overflow: 'hidden',
              position: 'relative'
            });
            
            gsap.set(globalMapContentRef.current, {
              willChange: 'transform'
            });
            
            ScrollTrigger.refresh(true);
          }
        }
      });
    };

    const initTimeout = setTimeout(setupCurtainReveal, 100);
    const handleResize = debounce(() => {
      // Recalculate on resize
      setupCurtainReveal();
    }, 250);
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-white">
      <main className="relative">
        {/* Normal scrolling sections - these scroll naturally */}
        <HeroSection />
        <AboutSection />
        <CompanySection />
        
        {/* GlobalMap wrapper - with proper containment */}
        <div ref={globalMapWrapperRef} className="relative">
          {/* GlobalMap content - this slides down into view */}
          <div className=' md:block hidden h-[10vh] bg-[#fbfbfb]'></div>
          <div ref={globalMapContentRef} className="will-change-transform">
            <GlobalConstructionPlatform />
          </div>
        </div>
        
        {/* ✅ PROOF: Sections after GlobalMap work perfectly! */}
        <div className="min-h-[70vh] bg-orange-500  text-white text-4xl">
          <IndustriesSection/>
        </div>
        {/* <div className="h-screen bg-pink-500 flex items-center justify-center text-white text-4xl">
          After GlobalMap Section 2
        </div>
        <div className="h-screen bg-indigo-500 flex items-center justify-center text-white text-4xl">
          Final Section
        </div> */}
      </main>
    </div>
  );
}