'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DesktopGlobalMapAnimation = ({ 
  children, 
  industriesRef, 
  className = "" 
}) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const triggersRef = useRef([]);

  const initAnimation = useCallback(() => {
    if (!wrapperRef.current || !contentRef.current || !industriesRef?.current) {
      return;
    }

    // Clean up existing triggers
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const industries = industriesRef.current;

    // Reset elements
    gsap.set(wrapper, {
      clearProps: "all"
    });

    gsap.set(content, {
      clearProps: "all",
      willChange: 'transform'
    });

    // Phase 1: Curtain Reveal
    const revealTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top bottom",
      end: "bottom center",
      scrub: 1,
      markers: false,
      invalidateOnRefresh: true,
      
      onUpdate: (self) => {
        const progress = self.progress;
        const yOffset = (1 - progress) * -50;
        
        gsap.set(content, {
          y: yOffset,
          opacity: progress
        });
      },

      onComplete: () => {
        gsap.set(content, { y: 0, opacity: 1 });
      }
    });

    // Phase 2: Pin during industries scroll
    const pinTrigger = ScrollTrigger.create({
      trigger: content,
      start: "bottom bottom",
      endTrigger: industries,
      end: "top top",
      pin: true,
      pinSpacing: false,
      scrub: 0.5,
      markers: false,
      
      animation: gsap.fromTo(industries, {
        yPercent: 100
      }, {
        yPercent: 0,
        ease: "none"
      })
    });

    triggersRef.current = [revealTrigger, pinTrigger];
  }, [industriesRef]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const initTimeout = setTimeout(() => {
      initAnimation();
    }, 100);

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
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, [initAnimation]);

  return (
    <div 
      ref={wrapperRef} 
      className={`relative hidden md:block ${className}`}
    >
      {/* Spacer before content */}
      {/* <div className="h-[15vh] bg-black"></div> */}
      
      {/* Animated content */}
      <div 
        ref={contentRef} 
        className="will-change-transform"
      >
        {children}
        
        {/* Spacer after content */}
        <div className="h-[10vh] bg-black"></div>
      </div>
    </div>
  );
};

export default DesktopGlobalMapAnimation;