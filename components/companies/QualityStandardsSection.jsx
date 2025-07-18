import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Quality Standards Section component
 * 
 * @param {Object} props
 * @param {string} props.id - Optional id for anchor links
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Optional subtitle text
 * @param {string} props.description - Main description text
 * @param {string} props.logoSrc - Path to the logo image
 * @param {string} props.logoAlt - Alt text for the logo
 * @param {string} props.buttonText - Text for the button
 * @param {string} props.buttonLink - Link for the button
 * @param {string} props.background - Background color (default: 'white')
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.sectionNumber - Optional section number (e.g., "04")
 * @param {string} props.sectionTitle - Optional section title for the section number (e.g., "IN THIS SECTION")
 */
const QualityStandardsSection = ({
  id,
  title = "Quality Standards",
  subtitle,
  description = "Every alloy we deliver represents our commitment to perfection. We don't just meet industry standards—we define them. Our rigorous quality control process ensures that what reaches your facility isn't just material, but the foundation of your next breakthrough. This is why the world's most demanding manufacturers choose IQ Ferro Alloys when excellence is non-negotiable.",
  logoSrc = "/Images/QualityCertificate/usa-accreditation.svg",
  logoAlt = "United States Accreditation",
  buttonText = "Learn More",
  buttonLink = "#",
  background = 'white',
  className = '',
  sectionNumber = "04",
  sectionTitle = "IN THIS SECTION"
}) => {
  // Determine background color class
  const bgClass = background === 'gray' ? 'bg-gray-100' : 'bg-white';
  
  // Refs for animation
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);
  const numberRef = useRef(null);
  const sectionTitleRef = useRef(null);
  
  // Animation setup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const section = sectionRef.current;
    if (!section) return;
    
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Animate section number and title if they exist
    if (numberRef.current) {
      tl.fromTo(
        numberRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
    
    if (sectionTitleRef.current) {
      tl.fromTo(
        sectionTitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }
    
    // Animate main title
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }
    
    // Animate subtitle if it exists
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }
    
    // Animate logo
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
    }
    
    // Animate description
    if (descriptionRef.current) {
      tl.fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );
    }
    
    // Animate button
    if (buttonRef.current) {
      tl.fromTo(
        buttonRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }
    
    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);
  
  return (
    <section id={id} ref={sectionRef} className={`py-16 md:py-24 px-4 md:px-8 lg:px-24 ${bgClass} ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          {sectionNumber && (
            <div className="mb-8">
              <p ref={sectionTitleRef} className="text-sm uppercase tracking-wider font-lato text-gray-500 mb-2">{sectionTitle}</p>
              <span ref={numberRef} className="text-4xl font-bold text-[#203663]">{sectionNumber}</span>
            </div>
          )}
          <h2 ref={titleRef} className="text-3xl uppercase md:text-4xl font-bold text-[#203663] mb-6">{title}</h2>
          {subtitle && (
            <p ref={subtitleRef} className="text-xl text-gray-700">{subtitle}</p>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3 flex justify-center">
            <div ref={logoRef} className="relative w-64 h-64">
              <img 
                src={logoSrc} 
                alt={logoAlt} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            {(subtitle) ? subtitle : <h3 className="text-[26px] font-semibold font-lato text-[#203663] uppercase mb-4">Uncompromising Excellence</h3>}
            <p ref={descriptionRef} className="text-gray-700 mb-6 font-onest lg:text-[20px] leading-relaxed">
              {description}
            </p>
            <button 
              ref={buttonRef}
              className="bg-[#203663] hover:bg-[#152544] text-white px-6 py-3 border border-[#203663] hover:bg-[#fbfbfb] cursor-pointer hover:text-[#203663] transition-all duration-300 flex items-center"
              onClick={() => buttonLink && (window.location.href = buttonLink)}
            >
              {buttonText}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityStandardsSection;