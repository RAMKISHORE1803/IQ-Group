'use client';

import { useEffect, useRef, useState } from 'react';

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

const FooterAnimationWrapper = ({ children, speed = 0.2, className = '' }) => {
  const footerWrapperRef = useRef(null);
  const footerContentRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let gsap, ScrollTrigger;

    const initAnimation = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        
        gsap = gsapModule.gsap;
        ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        const setupCurtainReveal = () => {
          if (!footerWrapperRef.current || !footerContentRef.current) return;

          // Clear existing triggers for this component
          ScrollTrigger.getAll().forEach(st => {
            if (st.vars.trigger === footerWrapperRef.current) {
              st.kill();
            }
          });

          // Reset any previous animations
          gsap.set([footerWrapperRef.current, footerContentRef.current], {
            clearProps: "all"
          });

          // ✅ IMPORTANT: Start with footer visible and in normal position
          gsap.set(footerWrapperRef.current, {
            position: 'relative',
            overflow: 'visible',
            height: 'auto'
          });

          // ✅ Start with footer content in normal position (visible)
          gsap.set(footerContentRef.current, {
            y: 0, // Start in normal position
            willChange: 'auto'
          });

          // Create the reveal animation - only animate when scrolling INTO view
          animationRef.current = gsap.fromTo(footerContentRef.current, {
            y: '50vh' // Start position when animation begins
          }, {
            y: 0, // End at natural position
            ease: "none",
            paused: true, // Start paused
            scrollTrigger: {
              trigger: footerWrapperRef.current,
              start: "top bottom",    
              end: "top center",      
              scrub: 1,
              markers: false,
              invalidateOnRefresh: true,
              
              onStart: () => {
                console.log("Footer animation starting");
                // Only apply constraints when animation starts
                gsap.set(footerWrapperRef.current, {
                  overflow: 'hidden',
                  height: '100vh',
                  position: 'relative'
                });
              },
              
              onComplete: () => {
                console.log("Footer animation complete - releasing container constraints");
                
                // ✅ CRITICAL: Release all height/overflow constraints
                gsap.set(footerWrapperRef.current, {
                  height: 'auto',
                  overflow: 'visible',
                  position: 'relative'
                });
                
                // ✅ Reset content transform to prevent any positioning issues
                gsap.set(footerContentRef.current, {
                  y: 0,
                  transform: 'none',
                  willChange: 'auto'
                });
                
                // ✅ Force ScrollTrigger to recalculate everything
                ScrollTrigger.refresh(true);
              },
              
              onReverseComplete: () => {
                console.log("Footer animation reversed - restoring normal state");
                
                // Back to normal state
                gsap.set(footerWrapperRef.current, {
                  height: 'auto',
                  overflow: 'visible',
                  position: 'relative'
                });
                
                gsap.set(footerContentRef.current, {
                  y: 0,
                  transform: 'none',
                  willChange: 'auto'
                });
                
                ScrollTrigger.refresh(true);
              }
            }
          });
        };

        // Initial setup with slight delay to ensure DOM is ready
        const initTimeout = setTimeout(() => {
          setupCurtainReveal();
          setIsLoaded(true);
        }, 500); // Increased delay to ensure proper rendering

        // Handle resize with debouncing
        const handleResize = debounce(() => {
          setupCurtainReveal();
        }, 250);
        
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
          clearTimeout(initTimeout);
          window.removeEventListener('resize', handleResize);
          if (animationRef.current) {
            animationRef.current.kill();
          }
          // Clean up only this component's ScrollTriggers
          ScrollTrigger.getAll().forEach(st => {
            if (st.vars.trigger === footerWrapperRef.current) {
              st.kill();
            }
          });
        };

      } catch (error) {
        console.warn('GSAP footer animation failed to load:', error);
        setIsLoaded(true); // Still show content even if animation fails
      }
    };

    initAnimation();

  }, [speed]);

  return (
    <div 
      ref={footerWrapperRef}
      className={`footer-animation-wrapper ${className}`}
      style={{
        position: 'relative',
        zIndex: 0,
        minHeight: '400px' // Ensure footer has space
      }}
    >
      <div 
        ref={footerContentRef}
        style={{
          opacity: isLoaded ? 1 : 0.3,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FooterAnimationWrapper;