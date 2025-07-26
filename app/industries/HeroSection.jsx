'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionNavigation from '@/components/companies/SectionNavigation';
import ContactOptionsSection from '@/components/about/ContactOptionsSection';

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
 * @param {boolean} props.showContactOptions - Whether to show the contact options section
 */
const HeroSection = ({ 
  title = "", 
  subtitle = "Powering industries with premium raw materials delivered with precision, integrity, and speed.",
  backgroundImage = "https://images.unsplash.com/photo-1661103391619-46e3175b3152?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  overlayColor = "rgba(0, 0, 0, 0.7)",
  sideText,
  navTitle = "",
  sectionLinks = [],
  showContactOptions = false
}) => {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const sideBarRef = useRef(null);
  const sideTextRef = useRef(null);
  const mobileSideBarRef = useRef(null);
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
      const mobileSideBarElement = mobileSideBarRef.current;
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
          { y: 300, height: 400 }, 
          { y: 0, duration: 1.2, delay: 0.4, ease: 'power2.out' }
        );
      }
      
      if (mobileSideBarElement) {
        gsap.fromTo(mobileSideBarElement, 
          { height: 0 }, 
          { height: '50%', duration: 1.2, delay: 0.4, ease: 'power2.out' }
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
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power2.out' }
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
        className={`relative w-full md:h-screen lg:min-h-[95vh]  bg-white overflow-hidden`}
      >
        {/* Fixed Background Image */}
        <div 
          ref={backgroundRef}
          className="fixed inset-0 w-full max-h-[90vh] md:h-screen bg-cover bg-center z-0"
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
        
        {/* Mobile Side Bar and Text (Vertical) */}
        <div className="absolute left-[25vw] top-0 h-full md:hidden flex items-center z-10">
          {/* Vertical white bar for mobile */}
          <div 
            ref={mobileSideBarRef} 
            className="w-[1px] bg-white absolute bottom-0 left-0 origin-bottom"
            style={{ height: '0%' }}
          ></div>
          {/* Vertical text for mobile */}
          <div 
            ref={mobileSideTextRef}
            className="absolute bottom-[30%] left-[8vw] transform -translate-x-1/2 origin-bottom-left rotate-[-90deg] text-white font-bold text-[16px]"
          >
            <span className="uppercase whitespace-nowrap">{displaySideText}</span>
          </div>
        </div>

        {/* Side Bar and Text (Vertical) - Desktop only */}
        <div className="absolute left-[150px] top-0 md:h-full hidden md:flex items-center z-10">
          {/* Vertical white bar */}
          <div 
            ref={sideBarRef} 
            className="w-[1px] bg-white absolute bottom-0 left-[-20vw] md:left-12"
          ></div>
          {/* Vertical text */}
          <div 
            ref={sideTextRef}
            className="absolute bottom-[286px] min-w-[120px] left-[-25vw] md:left-[7vw] transform -translate-x-1/2 origin-bottom-left rotate-[-90deg] text-white font-semibold lg:text-[20px]"
          >
            <span className="uppercase">{displaySideText}</span>
          </div>
        </div>

        {/* Content positioned at bottom */}
        <div 
          ref={contentRef}
          className={`hero-content relative  z-10 h-[100svh] md:h-screen bottom-[15vh] max-w-[60vw] left-[27vw] lg:max-w-7xl lg:left-[180px] flex flex-col justify-end ${showContactOptions ? 'pb-8 md:pb-4' : 'pb-12 md:pb-4'} px-4 sm:px-8 md:px-16  lg:pb-[0px] lg:px-24 xl:px-32`}
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
                <h2 className="text-[22px] leading-[28px] md:leading-tight lg:leading-normal md:text-2xl lg:text-[45px] lg:max-w-4xl font-bold font-lato text-white">
                  {subtitle}
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* Empty spacer to allow content to scroll over the fixed background */}
        <div className="h-[100svh] md:h-screen w-full"></div>
      </section>
      
      {/* Contact Options Section */}
      
    </>
  );
};

export default HeroSection; 