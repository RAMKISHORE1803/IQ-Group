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

export default function ContactLayout({ children }) {
  const mainContentRef = useRef(null);
  const footerWrapperRef = useRef(null);
  const mobileFooterAnimationWrapperRef = useRef(null);
  const mobileFooterRef = useRef(null);
  const scrollTriggersRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const setupFooterReveal = () => {
      // Clear any existing ScrollTriggers
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];

      if (window.innerWidth >= 768) {
        // Desktop animation
        if (!mainContentRef.current || !footerWrapperRef.current) return;

        // Reset any previous animations
        gsap.set([mainContentRef.current, footerWrapperRef.current], {
          clearProps: "all"
        });

        // Set initial styles
        gsap.set(footerWrapperRef.current, {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
          willChange: 'transform',
          visibility: 'visible'
        });

        // Create the reveal animation - main content moves up to reveal footer
        const footerTrigger = ScrollTrigger.create({
          trigger: footerWrapperRef.current,
          start: "bottom bottom", // When the bottom of the viewport reaches the bottom of the document
          end: "+=100%", // Animation ends after scrolling 100% of the footer height
          scrub: 1,
          markers: false,
          invalidateOnRefresh: true,
          animation: gsap.to(mainContentRef.current, {
            y: '-100vh', // Move the main content up by 100% of the viewport height
            ease: "none",
          }),
          onEnter: () => {
            // When entering the trigger area, make sure footer is visible
            gsap.set(footerWrapperRef.current, {
              zIndex: -1,
              visibility: 'visible'
            });
          },
          onLeaveBack: () => {
            // When scrolling back up and leaving the trigger area
            gsap.set(mainContentRef.current, {
              y: 0
            });
          }
        });

        scrollTriggersRef.current.push(footerTrigger);

        // Set body height to include the footer height for proper scrolling
        const setBodyHeight = () => {
          if (window.innerWidth >= 768) {
            const footerHeight = footerWrapperRef.current.offsetHeight;
            document.body.style.height = `calc(100% + ${footerHeight}px)`;
          }
        };
        
        setBodyHeight();
        window.addEventListener('resize', setBodyHeight);
        
        return () => {
          window.removeEventListener('resize', setBodyHeight);
        };
      } else {
        // Mobile animation
        if (!mobileFooterAnimationWrapperRef.current || !mobileFooterRef.current) return;

        // Reset any previous animations
        gsap.set([mobileFooterAnimationWrapperRef.current, mobileFooterRef.current], {
          clearProps: "all"
        });

        // Set up wrapper - acts as a viewport window during animation only
        gsap.set(mobileFooterAnimationWrapperRef.current, {
          overflow: 'hidden',
          position: 'relative',
          height: '100vh'
        });

        // Set initial position - content starts just above the viewport
        gsap.set(mobileFooterRef.current, {
          y: '-50vh',
          willChange: 'transform'
        });

        // Create the reveal animation
        const footerTrigger = ScrollTrigger.create({
          trigger: mobileFooterAnimationWrapperRef.current,
          start: "top 80%",    
          end: "top 20%",      
          scrub: 1,
          markers: false,
          invalidateOnRefresh: true,
          animation: gsap.to(mobileFooterRef.current, {
            y: 0,
            ease: "none",
          }),
          
          onLeave: () => {
            gsap.set(mobileFooterAnimationWrapperRef.current, {
              height: 'auto',
              overflow: 'visible',
              position: 'relative'
            });
            
            gsap.set(mobileFooterRef.current, {
              y: 0,
              transform: 'none',
              willChange: 'auto'
            });
            
            ScrollTrigger.refresh();
          },
          
          onEnterBack: () => {
            gsap.set(mobileFooterAnimationWrapperRef.current, {
              height: '100vh',
              overflow: 'hidden',
              position: 'relative'
            });
            
            gsap.set(mobileFooterRef.current, {
              willChange: 'transform'
            });
          }
        });

        scrollTriggersRef.current.push(footerTrigger);
      }
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
      window.removeEventListener('resize', checkMobile);
      
      // Clean up ScrollTriggers
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
      
      // Reset body height
      document.body.style.height = '';
    };
  }, []);

  return (
    <>
      {/* Desktop layout */}
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <div ref={mainContentRef} className="relative z-10 mt-[-10vh] bg-white will-change-transform">
          {children}
        </div>
        
        {/* Footer fixed at bottom */}
        <div ref={footerWrapperRef} className="w-full">
          <IQGroupFooter />    
        </div>
      </div>

      {/* Mobile layout */}
      <div className={`${isMobile ? 'block' : 'hidden'}`}>
        {children}
        
        {/* Footer with curtain reveal */}
        <div ref={mobileFooterAnimationWrapperRef} className="relative">
          <div className='h-[0.1vh] bg-[#fbfbfb] sticky bottom-0'></div>
          <div ref={mobileFooterRef} className="will-change-transform">
            <IQGroupFooter />    
          </div>
        </div>
      </div>
    </>
  );
}
