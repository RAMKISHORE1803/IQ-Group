'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MobileGlobalMapAnimation = ({ 
  children, 
  className = "" 
}) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const triggersRef = useRef([]);
  const rafIdRef = useRef(null);

  const initAnimation = useCallback(() => {
    if (!wrapperRef.current || !contentRef.current) {
      return;
    }

    // Clean up existing triggers
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    // Mobile-optimized settings
    gsap.set(content, {
      clearProps: "all",
      force3D: true,
      willChange: 'transform'
    });

    // Simple fade-in animation for mobile
    const fadeInTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top 80%",
      end: "top 20%",
      scrub: 0.3,
      markers: false,
      fastScrollEnd: true,
      
      animation: gsap.fromTo(content, {
        opacity: 0,
        y: 30,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
        force3D: true
      }),

      onComplete: () => {
        gsap.set(content, {
          clearProps: "transform",
          willChange: 'auto'
        });
      }
    });

    triggersRef.current = [fadeInTrigger];
  }, []);

  const setupMobileOptimizations = useCallback(() => {
    let ticking = false;
    
    const updateScrollTriggers = () => {
      ScrollTrigger.refresh();
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        rafIdRef.current = requestAnimationFrame(updateScrollTriggers);
        ticking = true;
      }
    };

    const handleOrientationChange = () => {
      setTimeout(() => {
        initAnimation();
      }, 300);
    };

    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [initAnimation]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const initTimeout = setTimeout(() => {
      initAnimation();
    }, 100);

    const mobileCleanup = setupMobileOptimizations();

    const handleResize = () => {
      clearTimeout(initTimeout);
      setTimeout(() => {
        initAnimation();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
      
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      
      if (mobileCleanup) {
        mobileCleanup();
      }
    };
  }, [initAnimation, setupMobileOptimizations]);

  return (
    <div 
      ref={wrapperRef} 
      className={`block md:hidden ${className}`}
    >
      {/* Mobile content wrapper */}
      <div 
        ref={contentRef} 
        className="will-change-transform"
      >
        {children}
        
        {/* Mobile spacer */}
        <div className="h-[10vh]"></div>
      </div>
    </div>
  );
};

export default MobileGlobalMapAnimation;