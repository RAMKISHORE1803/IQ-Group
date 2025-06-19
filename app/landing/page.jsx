'use client';

import { useEffect, useRef } from 'react';
import AboutSection from './about-section';
import CompanySection from './company-section';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobalConstructionPlatform from './globalMap';
import IndustriesSection from './industries-section';
import QualitySection from './qualitySection';          
import DTREHeroCarousel from './dtreHero';
import BCGCareersSection from './careerSection';
import InsightsSection from './insight-section';
import BusinessStatistics from './BusinessStatistics';
import IQGroupFooter from './footer';

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

export default function LandingPage() {
  const globalMapWrapperRef = useRef(null);
  const globalMapContentRef = useRef(null);
  const industriesRef = useRef(null);
  const scrollTriggersRef = useRef([]); // Track our specific triggers
  const footerAnimationWrapperRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const setupCurtainReveal = () => {
      if (!globalMapWrapperRef.current || !globalMapContentRef.current) return;

      // Clear only OUR triggers, not all triggers
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];

      // Reset any previous animations
      gsap.set([globalMapWrapperRef.current, globalMapContentRef.current], {
        clearProps: "all"
      });

      // Set up wrapper - acts as a viewport window during animation only
      gsap.set(globalMapWrapperRef.current, {
        overflow: 'hidden',
        position: 'relative',
        height: '100vh'
      });

      // Set initial position - content starts just above the viewport
      gsap.set(globalMapContentRef.current, {
        y: '-50vh',
        willChange: 'transform'
      });

      // Create the reveal animation
      const trigger1 = ScrollTrigger.create({
        trigger: globalMapWrapperRef.current,
        start: "top 80%",    
        end: "top 20%",      
        scrub: 1,
        markers: false,
        invalidateOnRefresh: true,
        animation: gsap.to(globalMapContentRef.current, {
          y: 0,
          ease: "none",
        }),
        
        onLeave: () => {
          console.log("GlobalMap animation complete - releasing constraints");
          
          gsap.set(globalMapWrapperRef.current, {
            height: 'auto',
            overflow: 'visible',
            position: 'relative' // Keep relative, not 
          });
          
          gsap.set(globalMapContentRef.current, {
            y: 0,
            transform: 'none',
            willChange: 'auto'
          });
          
          // Only refresh our specific area, not everything
          ScrollTrigger.refresh();
        },
        
        onEnterBack: () => {
          console.log("Re-entering GlobalMap animation area");
          
          gsap.set(globalMapWrapperRef.current, {
            height: '100vh',
            overflow: 'hidden',
            position: 'relative'
          });
          
          gsap.set(globalMapContentRef.current, {
            willChange: 'transform'
          });
        }
      });

      scrollTriggersRef.current.push(trigger1);
    };

    const setupFooterReveal = () => {
      if (!footerAnimationWrapperRef.current || !footerRef.current) return;

      // Reset any previous animations
      gsap.set([footerAnimationWrapperRef.current, footerRef.current], {
        clearProps: "all"
      });

      // Set up wrapper - acts as a viewport window during animation only
      gsap.set(footerAnimationWrapperRef.current, {
        overflow: 'hidden',
        position: 'relative',
        height: '100vh' // Match the GlobalMap wrapper height
      });

      // Set initial position - content starts just above the viewport (negative y)
      gsap.set(footerRef.current, {
        y: '-50vh', // Match the GlobalMap content initial position
        willChange: 'transform'
      });

      // Create the reveal animation - exact same structure as GlobalMap
      const footerTrigger = ScrollTrigger.create({
        trigger: footerAnimationWrapperRef.current,
        start: "top 80%",    
        end: "top 20%",      
        scrub: 1,
        markers: false,
        invalidateOnRefresh: true,
        animation: gsap.to(footerRef.current, {
          y: 0,
          ease: "none",
        }),
        
        onLeave: () => {
          console.log("Footer animation complete - releasing constraints");
          
          gsap.set(footerAnimationWrapperRef.current, {
            height: 'auto',
            overflow: 'visible',
            position: 'relative'
          });
          
          gsap.set(footerRef.current, {
            y: 0,
            transform: 'none',
            willChange: 'auto'
          });
          
      ScrollTrigger.refresh();
        },
        
        onEnterBack: () => {
          console.log("Re-entering Footer animation area");
          
          gsap.set(footerAnimationWrapperRef.current, {
            height: '100vh',
            overflow: 'hidden',
            position: 'relative'
          });
          
          gsap.set(footerRef.current, {
            willChange: 'transform'
          });
        }
      });

      scrollTriggersRef.current.push(footerTrigger);
    };

    const setupIndustriesAnimation = () => {
      if (!industriesRef.current || !globalMapContentRef.current) return;
      
      const trigger2 = ScrollTrigger.create({
        trigger: globalMapContentRef.current,
        start: "bottom bottom",
        endTrigger: industriesRef.current,
        end: "top top",
        pin: globalMapContentRef.current,
        pinSpacing: false,
        scrub: 1,
        markers: false, // Disable markers for production
        animation: gsap.fromTo(industriesRef.current, {
          yPercent: 0,
          willChange: 'transform'
        }, {
          y: 0,
          ease: "none",
        })
      });

      scrollTriggersRef.current.push(trigger2);
    };

    // Remove any leftover initial positioning that might interfere
    gsap.set(footerRef.current, {
      clearProps: "all"
    });

    const initTimeout = setTimeout(() => {
      setupCurtainReveal();
      setupIndustriesAnimation();
      setupFooterReveal();
    }, 100);

    const handleResize = debounce(() => {
      setupCurtainReveal();
      setupIndustriesAnimation();
      setupFooterReveal();
    }, 250);
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
      
      // Clean up only OUR ScrollTriggers
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, []);

  return (
    <div className="bg-[#fbfbfb] z-[2]">
      <main className="relative ">
        {/* Normal scrolling sections */}
        <DTREHeroCarousel />
          <AboutSection />
        <QualitySection />
          <CompanySection />
        
        {/* GlobalMap wrapper */}
        <div ref={globalMapWrapperRef} className="relative">
          <div className='md:block hidden h-[10vh] bg-[#fbfbfb]'></div>
          <div ref={globalMapContentRef} className="will-change-transform">
          <GlobalConstructionPlatform />
          </div>
        </div>
        
        {/* Industries section */}
        <div ref={industriesRef} className="min-h-[70vh] xl:min-h-[100vh] bg-[#fbfbfb] text-white text-4xl">
          <IndustriesSection/>
          <BCGCareersSection />
          <InsightsSection/>
          <BusinessStatistics/>
        </div>
        
        {/* Footer with curtain reveal - separate from industries section */}
        <div ref={footerAnimationWrapperRef} className="relative">
          <div className='md:block hidden h-[10vh] bg-[#fbfbfb]'></div>
          <div ref={footerRef} className="will-change-transform">
            <IQGroupFooter/>    
          </div>
        </div>

        {/* Clear ending point */}
        
    </main>
    </div>
  );
} 