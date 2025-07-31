'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Menu } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Multiplex Hero Section component with word-by-word animation
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
 * @param {string} props.bottomText - Text for the white bottom section
 */
const HeroSection = ({ 
  title = "We create structures that endure, combining sustainable design with world-class construction expertise", 
  subtitle = "",
  backgroundImage = "https://images.unsplash.com/photo-1661103391619-46e3175b3152?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  overlayColor = "rgba(0, 0, 0, 0.4)",
  sideText = "About us",
  navTitle = "MULTIPLEX",
  sideTextHeight,
  sectionLinks = [],
  showContactOptions = false,
  bottomText = "Established in Australia in 1962, we have delivered over"
}) => {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const sideTextRef = useRef(null);
  const verticalLineRef = useRef(null);
  const titleRef = useRef(null);
  const bottomSectionRef = useRef(null);
  const wordsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Split title into words for animation
  const words = subtitle.split(' ');

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
      const heroElement = heroRef.current;
      const sideTextElement = sideTextRef.current;
      const verticalLineElement = verticalLineRef.current;
      const bottomSectionElement = bottomSectionRef.current;

      if (!heroElement) return;

      // Clear any existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === heroElement) {
          trigger.kill();
        }
      });

      // Initial animations when page loads
      // Side text animation (rising from below on mobile)
      if (sideTextElement) {
        gsap.fromTo(sideTextElement, 
          { 
            opacity: 0, 
            y: isMobile ? 200 : '100%',
          
          }, 
          { 
            opacity: 1, 
            y: 0, 
            x: 0, 
            duration: 0.8, 
            delay: 0.4, 
            ease: 'power2.out' 
          }
        );
      }

      // Vertical line animation
      if (verticalLineElement) {
        gsap.fromTo(verticalLineElement, 
          { 
            opacity: 0,
            y: isMobile ? 200 : 0,
            scaleY: isMobile ? 0 : 1
          }, 
          { 
            opacity: 1, 
            y: 0,
            scaleY: 1,
            duration: 0.9, 
            delay: 0.5, 
            ease: 'power2.out' 
          }
        );
      }

      // Word-by-word animation for title
      gsap.fromTo(wordsRef.current, 
        {
          opacity: 0,
          y: isMobile ? 200 : 50,
          rotationX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.8,
          ease: "power2.out"
        }
      );

      // Bottom section animation
      if (bottomSectionElement) {
        gsap.fromTo(bottomSectionElement, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.8, delay: 1.2 }
        );
      }

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
      tl.to(contentRef.current, {
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
  }, [isMobile, title, words]);

  return (
    <>
      <section 
        ref={heroRef} 
        className="relative  bg-gray-900 overflow-hidden flex flex-col"
      >
        {/* Fixed Background Image */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
            backgroundPosition: 'center center',
          }}
        >
          {/* Overlay for better text visibility */}
          <div 
            className="absolute inset-0 bg-black/40"
            style={{ backgroundColor: overlayColor }}
          ></div>
        </div>

        {/* Navigation */}
        <div className="h-[50vh]"></div>
       

        {/* Main Content - Using Exact Structure with Flexbox Centering */}
        <div 
          ref={contentRef}
          className="relative z-10  flex-1 flex items-center min-h-[28vh] pb-[7vh]  justify-center lg:min-w-[1294px]  "
        >
          <div className="container w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12">
            <div className="row">
              <div className="col-lg-7   w-full">
                {/* Grid Layout for 3 columns: Side Text | Vertical Bar | Paragraph */}
                <div className="grid grid-cols-12 items-start h-full max-h-[40vh]">
                  
                  {/* Column 1: About Us Vertical Text */}
                  <div className=" flex justify-end ml-[10vw] lg:ml-[6vw]">
                    <div 
                      ref={sideTextRef}
                      className="writing-mode-vertical    text-white text-xs sm:text-sm md:text-base font-medium tracking-widest"
                    >
                      <h1 data-name={sideText}>
                        <span className='font-onest uppercase font-medium text-[20px]  lg:text-[20px]' style={{ writingMode: 'vertical-rl', textOrientation: 'sideways' }}>
                          {sideText}
                        </span>
                      </h1>
                    </div>
                  </div>

                  {/* Column 2: Vertical Line */}
                  <div className="col-span-1 flex justify-center">
                    <div 
                      ref={verticalLineRef}
                      className="w-px bg-white/60 h-full min-h-[60vh] origin-bottom"
                    ></div>
                  </div>
                  <div className="col-span-1"></div>

                  {/* Column 3: Main Headline Paragraph */}
                  <div className="col-span-9 lg:min-w-[800px]">
                    <div className="page-header__statement">
                      <h2 
                        ref={titleRef}
                        className="h2 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
                        data-split="0.5"
                        style={{ opacity: 1, visibility: 'inherit' }}
                      >
                        <div className="split-row flex flex-wrap">
                          {words.map((word, index) => (
                            <div key={index} className="word font-bold font-lato text-[24px] sm:3text-[38px] md:text-[40px] lg:text-[50px] mr-2 ">
                              <span 
                                ref={el => wordsRef.current[index] = el}
                                className="inline-block"
                                style={{ 
                                  translate: 'none', 
                                  rotate: 'none', 
                                  scale: 'none',
                                  transform: 'translate(0px)',
                                  opacity: 1,
                                  transformOrigin: 'center bottom'
                                }}
                              >
                                {word}
                              </span>
                            </div>
                          ))}
                        </div>
                      </h2>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty spacer to allow content to scroll over the fixed background */}
        {/* <div className="h-[50vh] w-full"></div> */}
      </section>

      {/* Bottom White Section */}
    

      <style jsx>{`
        .container {
          width: 100%;
        }
        .row {
          display: flex;
          flex-wrap: wrap;
        }
        .col-lg-7 {
          width: 100%;
        }
        .offset-lg-2 {
          margin-left: 0;
        }
        @media (min-width: 992px) {
          .col-lg-7 {
            width: 58.333333%;
          }
          .offset-lg-2 {
            margin-left: 16.666667%;
          }
        }
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: sideways
        }
      `}</style>
    </>
  );
};

export default HeroSection;