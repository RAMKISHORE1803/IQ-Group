'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Multiplex Hero Section component with parallax scrolling effect
 * 
 * @param {Object} props
 * @param {string} props.backgroundImage - URL to the background image
 * @param {string} props.overlayColor - Optional color overlay (with opacity) for the background
 */
const MultiplexHero = ({ 
  backgroundImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
  overlayColor = "rgba(0, 0, 0, 0.4)",
}) => {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const sideBarRef = useRef(null);
  const sideTextRef = useRef(null);
  const mobileSideTextRef = useRef(null);
  const titleRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    // Set initial mobile state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // Create the animation
      const heroElement = heroRef.current;
      const contentElement = contentRef.current;
      const sideBarElement = sideBarRef.current;
      const sideTextElement = sideTextRef.current;
      const mobileSideTextElement = mobileSideTextRef.current;
      const titleElement = titleRef.current;

      if (!heroElement || !contentElement) return;

      // Clear any existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === heroElement) {
          trigger.kill();
        }
      });

      // Initial animations when page loads
      if (sideBarElement) {
        gsap.fromTo(sideBarElement, 
          { y: 300, height: 300 }, 
          { y: 0, duration: 1.2, delay: 0.4, ease: 'power2.out' }
        );
      }
      
      if (sideTextElement) {
        gsap.fromTo(sideTextElement, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power2.out' }
        );
      }
      
      if (mobileSideTextElement) {
        gsap.fromTo(mobileSideTextElement, 
          { opacity: 0, x: -20 }, 
          { opacity: 1, x: 0, duration: 1, delay: 0.8, ease: 'power2.out' }
        );
      }
      
      gsap.fromTo(titleElement, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: 'power2.out' }
      );

      // Set up the scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      // Content animation - fade out as it scrolls up
      tl.to(contentElement, {
        opacity: 0,
        y: isMobile ? '-15%' : '-20%',
        ease: 'power1.in',
      });

      return () => {
        // Cleanup
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === heroElement) {
            trigger.kill();
          }
        });
        window.removeEventListener('resize', checkMobile);
        clearTimeout(timer);
      };
    }, 200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <section 
      ref={heroRef} 
      className="relative w-full h-[100svh] md:h-screen overflow-hidden"
    >
      {/* Fixed Background Image */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center center',
        }}
      >
        {/* Overlay for better text visibility */}
        <div 
          className="absolute inset-0 w-full h-full" 
          style={{ backgroundColor: overlayColor }}
        ></div>
      </div>

      {/* Header/Navigation */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-white text-3xl md:text-4xl font-bold tracking-wider">
          MULTIPLEX
        </Link>

        {/* Navigation */}
        <div className="flex items-center space-x-6 md:space-x-10">
          <Link href="/global" className="flex items-center text-white hover:text-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden md:inline uppercase text-sm tracking-wider font-medium">GLOBAL</span>
          </Link>
          
          <Link href="/search" className="flex items-center text-white hover:text-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden md:inline uppercase text-sm tracking-wider font-medium">SEARCH</span>
          </Link>
          
          <button className="flex items-center text-white hover:text-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="hidden md:inline uppercase text-sm tracking-wider font-medium">MENU</span>
          </button>
        </div>
      </header>

      {/* Mobile Top Bar with Text (Horizontal) */}
      <div 
        ref={mobileSideTextRef}
        className="absolute top-24 left-4 md:hidden z-10"
      >
        <div className="flex items-center">
          <div className="w-8 h-[2px] bg-white mr-3"></div>
          <span className="text-white text-sm tracking-widest font-medium">
            ABOUT US
          </span>
        </div>
      </div>

      {/* Side Bar and Text (Vertical) - Desktop only */}
      <div className="absolute left-0 top-0 h-full flex items-center z-10">
        {/* Vertical white bar */}
        <div 
          ref={sideBarRef} 
          className="w-[2px] hidden md:block bg-white absolute bottom-0 left-8 md:left-12 h-[70vh]"
        ></div>
        {/* Vertical text */}
        <div 
          ref={sideTextRef}
          className="hidden md:block absolute bottom-[15%] left-8 md:left-12 transform -translate-x-1/2 origin-bottom-left rotate-[-90deg] text-white text-sm tracking-[0.2em] font-medium"
        >
          ABOUT US
        </div>
      </div>

      {/* Content positioned at center */}
      <div 
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32"
      >
        <div ref={titleRef} className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.15] tracking-tight">
            We create structures that endure, combining sustainable design with world-class construction expertise
          </h1>
        </div>
      </div>
    </section>
  );
};

export default MultiplexHero; 