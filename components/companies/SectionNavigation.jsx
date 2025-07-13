import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Reusable section navigation component for "In This Section" links
 * 
 * @param {Object} props
 * @param {Array} props.links - Array of link objects with title and link properties
 * @param {string} props.title - Navigation title (default: "IN THIS SECTION")
 * @param {string} props.className - Additional CSS classes
 */
const SectionNavigation = ({
  links = [],
  title = "IN THIS SECTION",
 
}) => {
  if (links.length === 0) return null;
  
  // Refs for animation
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const linksRef = useRef([]);
  
  // Reset linksRef array when links change
  linksRef.current = [];
  
  // Animation setup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const container = containerRef.current;
    if (!container) return;
    
    // Create animation timeline
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Animate title
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
    
    // Animate links with staggered effect
    if (linksRef.current.length > 0) {
      tl.fromTo(
        linksRef.current,
        { y: 15, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power2.out" 
        },
        "-=0.3"
      );
    }
    
    return () => {
      tl.kill();
    };
  }, [links]);
  
  return (
    <div ref={containerRef} className={`py-8 px-4 md:px-8 z-10 lg:px-24 bg-white`}>
      <div className="max-w-7xl lg:w-full  mx-auto lg:mx-0">
        <div className="mb-4 lg:mb-8">
          <p ref={titleRef} className=" uppercase tracking-wider font-lato lg:text-[24px] text-[#203663]">{title}</p>
        </div>
        <div className="flex flex-wrap gap-8">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.link}
              className="flex items-center text-[#203663] lg:text-[20px] lg:hover:text-[21px] transition-all duration-300"
              ref={el => linksRef.current[index] = el}
            >
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-[#203663] flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 lg:w-4 lg:h-4 group hover:rotate-360 transition-all duration-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionNavigation; 