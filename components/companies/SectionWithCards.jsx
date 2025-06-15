import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable section component with cards layout
 * 
 * @param {Object} props
 * @param {string} props.id - Optional id for anchor links
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {Array} props.cards - Array of card objects with title and description
 * @param {boolean} props.hasDivider - Whether to show a divider line at the top
 * @param {string} props.background - Background color (default: 'white')
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.sectionNumber - Optional section number (e.g., "01")
 * @param {string} props.sectionTitle - Optional section title for the section number (e.g., "IN THIS SECTION")
 */
const SectionWithCards = ({
  id,
  title,
  subtitle,
  cards = [],
  hasDivider = true,
  background = 'white',
  className = '',
  sectionNumber,
  sectionTitle = 'IN THIS SECTION'
}) => {
  // Determine background color class
  const bgClass = background === 'gray' ? 'bg-gray-100' : 'bg-white';
  
  // Refs for animation
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const numberRef = useRef(null);
  const sectionTitleRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Reset cardsRef array when cards change
  cardsRef.current = [];

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
    
    // Animate subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }
    
    // Animate cards with staggered effect
    if (cardsRef.current.length > 0) {
      tl.fromTo(
        cardsRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.15,
          ease: "power2.out" 
        },
        "-=0.2"
      );
    }
    
    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [cards, sectionNumber, title, subtitle]);
  
  return (
    <section id={id} ref={sectionRef} className={`py-16 md:py-24 px-4 md:px-8 lg:px-24 ${bgClass} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {hasDivider && (
          <div className="w-full h-px bg-gray-200 mb-16"></div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left column - Title and subtitle */}
          <div className='font-lato'>
            {sectionNumber && (
              <div className="mb-8">
                <p ref={sectionTitleRef} className="text-sm uppercase tracking-wider font-lato text-gray-500 mb-2">{sectionTitle}</p>
                <span ref={numberRef} className="text-4xl font-bold text-[#203663]">{sectionNumber}</span>
              </div>
            )}
            <h2 ref={titleRef} className="text-3xl uppercase md:text-4xl font-bold text-[#203663] mb-6">{title}</h2>
            <p ref={subtitleRef} className="text-xl text-gray-700">{subtitle}</p>
          </div>
          
          {/* Right column - Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className="flex flex-col"
                ref={el => cardsRef.current[index] = el}
              >
                <h3 className="text-xl uppercase font-bold font-lato text-[#203663] mb-3">{card.title}</h3>
                <p className="text-gray-700 font-onest font-light lg:text-[17px] lg:leading-[28px]">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWithCards; 