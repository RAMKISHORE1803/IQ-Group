'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionNavigation from '@/components/companies/SectionNavigation';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero Section component for About page with parallax scrolling effect
 * 
 * @param {Object} props
 * @param {string} props.title - Main title for the hero section
 * @param {string} props.subtitle - Optional subtitle text
 * @param {string} props.backgroundImage - URL to the background image
 * @param {string} props.overlayColor - Optional color overlay (with opacity) for the background
 * @param {string} props.sideText - Optional vertical text on the side
 * @param {string} props.navTitle - Navigation title (for the vertical side text)
 * @param {Array} props.sectionLinks - Array of section links for "In This Section" navigation
 */
const HeroSection = ({ 
  title = "", 
  subtitle = "Powering industries with premium raw materials delivered with precision, integrity, and speed.",
  backgroundImage = "https://images.unsplash.com/photo-1661103391619-46e3175b3152?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  overlayColor = "rgba(0, 0, 0, 0.7)",
  sideText,
  navTitle = "",
  sectionLinks = []
}) => {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const sideBarRef = useRef(null);
  const sideTextRef = useRef(null);
  const mobileSideTextRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Use navTitle as sideText if not provided
  const displaySideText = sideText || navTitle;

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
      const subtitleElement = subtitleRef.current;

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
      
      if (subtitleElement) {
        gsap.fromTo(subtitleElement, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 1.2, delay: 0.6, ease: 'power2.out' }
        );
      }

      // Set up the scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          // Don't pin the hero section, let it scroll naturally
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
  }, [isMobile, subtitle, displaySideText]);

  return (
    <>
      <section 
        ref={heroRef} 
        className="relative w-full h-[100svh] md:h-screen lg:max-h-[75vh] bg-white overflow-hidden"
      >
        {/* Fixed Background Image */}
        <div 
          ref={backgroundRef}
          className="fixed inset-0 w-full  md:h-screen bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
            backgroundPosition: isMobile ? 'center center' : 'center center',
          }}
        >
          {/* Overlay for better text visibility */}
          <div 
            className="absolute inset-0 w-full h-full" 
            style={{ backgroundColor: overlayColor }}
          ></div>
        </div>

        {/* Mobile Top Bar with Text (Horizontal) */}
        <div 
          ref={mobileSideTextRef}
          className="absolute top-6 left-4 md:hidden z-10"
        >
          <div className="flex items-center">
            <div className="w-8 h-[2px] bg-white mr-3"></div>
            <span className="text-white text-sm tracking-widest font-medium">
              {displaySideText}
            </span>
          </div>
        </div>

        {/* Side Bar and Text (Vertical) - Desktop only */}
        <div className="absolute left-[150px] top-0 h-full flex items-center z-10">
          {/* Vertical white bar */}
          <div 
            ref={sideBarRef} 
            className="w-[1px] hidden md:block bg-white absolute bottom-0 left-8 md:left-12"
          ></div>
          {/* Vertical text */}
          <div 
            ref={sideTextRef}
            className="hidden md:block absolute bottom-[23%] min-w-[120px] left-8  md:left-[60px] transform -translate-x-1/2 origin-bottom-left rotate-[-90deg] text-white font-bold   lg:text-[20px] "
          >
            <span className="uppercase ">{displaySideText}</span>
          </div>
        </div>

        {/* Content positioned at bottom */}
        <div 
          ref={contentRef}
          className="hero-content relative z-10 h-[100svh] md:h-screen lg:left-[180px] flex flex-col justify-end pb-12 md:pb-4 px-4 sm:px-8 md:px-16 lg:pb-[150px] lg:px-24 xl:px-32"
        >
          <div className="max-w-5xl mb-8 md:mb-16 lg:mb-24">
            <h1 
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-lato text-white mb-4 md:mb-8 leading-tight uppercase"
            >
              {title}
            </h1>
            {subtitle && (
              <div 
                ref={subtitleRef}
                className="mt-4 md:mt-6 lg:mt-12"
              >
                <h2 className="text-[16px] leading-[26px] md:leading-tight lg:leading-normal md:text-2xl lg:text-[45px]  lg:max-w-4xl font-bold font-lato text-white">
                  {subtitle}
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* Empty spacer to allow content to scroll over the fixed background */}
        <div className="h-[100svh] md:h-screen w-full"></div>
      </section>
      
      {/* Section Navigation */}
      
    </>
  );
};

export default HeroSection; 