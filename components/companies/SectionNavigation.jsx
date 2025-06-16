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
  className = 'bg-[#fbfbfb]'
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
    <div ref={containerRef} className={`py-8 px-4 md:px-8 lg:px-24 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <p ref={titleRef} className="text-sm uppercase tracking-wider font-lato text-gray-500">{title}</p>
        </div>
        <div className="flex flex-wrap gap-8">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.link}
              className="flex items-center text-[#203663] hover:underline"
              ref={el => linksRef.current[index] = el}
            >
              <div className="w-6 h-6 rounded-full border border-[#203663] flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
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