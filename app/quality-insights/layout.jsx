'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IQGroupFooter from '../landing/footer';

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

export default function QualityInsightsLayout({ children }) {
  const mainContentRef = useRef(null);
  const footerAnimationWrapperRef = useRef(null);
  const footerRef = useRef(null);
  const scrollTriggersRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const setupFooterReveal = () => {
      if (!footerAnimationWrapperRef.current || !footerRef.current) return;

      // Clear any existing ScrollTriggers
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];

      // Reset any previous animations
      gsap.set([footerAnimationWrapperRef.current, footerRef.current], {
        clearProps: "all"
      });

      // Set up wrapper - acts as a viewport window during animation only
      gsap.set(footerAnimationWrapperRef.current, {
        overflow: 'hidden',
        position: 'relative',
        height: '100vh'
      });

      // Set initial position - content starts just above the viewport
      gsap.set(footerRef.current, {
        y: '-50vh',
        willChange: 'transform'
      });

      // Create the reveal animation
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

    const initTimeout = setTimeout(() => {
      setupFooterReveal();
    }, 100);

    const handleResize = debounce(() => {
      setupFooterReveal();
    }, 250);
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
      
      // Clean up ScrollTriggers
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, []);

  return (
    <div className='lg:mt-[-10vh] bg-white'>
      {children}
      
      {/* Footer with curtain reveal */}
      <div ref={footerAnimationWrapperRef} className="relative">
        <div className='md:block hidden h-[0.1vh] bg-[#fbfbfb]'></div>
        <div ref={footerRef} className="will-change-transform">
          <IQGroupFooter />    
        </div>
      </div>
    </div>
  );
}
