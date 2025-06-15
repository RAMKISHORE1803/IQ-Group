'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable Hero Section component with parallax scrolling effect
 * 
 * @param {Object} props
 * @param {string} props.title - Main title for the hero section
 * @param {string} props.subtitle - Optional subtitle text
 * @param {string} props.backgroundImage - URL to the background image
 * @param {string} props.overlayColor - Optional color overlay (with opacity) for the background
 * @param {string} props.sideText - Optional vertical text on the side (defaults to navigation title)
 * @param {string} props.navTitle - Navigation title (for the vertical side text)
 */
const HeroSection = ({ 
  title = "A leading global contractor with expertise across all property sectors", 
  subtitle = "We have a proven ability to deliver construction solutions",
  backgroundImage = "https://images.unsplash.com/photo-1547555706-54bcf05bbad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmVycm8lMjBhbGxveXxlbnwwfHwwfHx8MA%3D%3D",
  overlayColor = "rgba(0, 0, 0, 0.7)", // Default overlay color with opacity
  sideText,
  navTitle = "COMPANIES" 
}) => {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const sideBarRef = useRef(null);
  const sideTextRef = useRef(null);
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
      gsap.fromTo(sideBarElement, 
        { y:300 , height:300}, 
        { y:0, duration: 1.2, delay: 0.4, ease: 'power2.out' }
      );
      
      gsap.fromTo(sideTextElement, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power2.out' }
      );
      
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
        y: '-20%',
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
  }, [isMobile, subtitle]);

  return (
    <section 
      ref={heroRef} 
      className="relative w-full h-screen"
    >
      {/* Fixed Background Image */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 w-full h-screen bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        }}
      >
        {/* Overlay for better text visibility */}
        <div 
          className="absolute inset-0 w-full h-full" 
          style={{ backgroundColor: overlayColor }}
        ></div>
      </div>

      {/* Side Bar and Text (Vertical) */}
      <div className="absolute left-0 top-0 h-full flex items-center z-10">
        {/* Vertical white bar */}
        <div 
          ref={sideBarRef} 
          className="w-[3px]  hidden md:block  bg-white absolute bottom-0 left-8 md:left-12 "
        ></div>
        {/* Vertical text */}
       
      </div>

      {/* Content positioned at bottom */}
      <div 
        ref={contentRef}
        className="hero-content relative z-10 h-screen flex flex-col justify-end md:pb-4 px-8 md:px-16 lg:px-24 xl:px-32"
      >
        <div className="max-w-5xl mb-16 md:mb-24">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-lato text-white mb-8 leading-tight"
          >
            {title}
          </h1>
          {subtitle && (
            <div 
              ref={subtitleRef}
              className="mt-6 md:mt-12"
            >
              <h2 className="text-[16px] leading-[26px] md:leading-tight md:text-3xl lg:text-[26px] lg:leading-[36px]  font-light font-onest text-white">
                {subtitle}
              </h2>
            </div>
          )}
        </div>
      </div>

      {/* Empty spacer to allow content to scroll over the fixed background */}
      <div className="h-screen w-full"></div>
    </section>
  );
};

export default HeroSection; 