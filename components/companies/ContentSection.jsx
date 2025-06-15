import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable content section component for company pages
 * 
 * @param {Object} props
 * @param {string} props.id - Optional id for anchor links
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Optional subtitle
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.background - Background color (default: 'white')
 * @param {boolean} props.fullWidth - Whether the section should be full width (default: false)
 * @param {string} props.className - Additional CSS classes
 */
const ContentSection = ({
  id,
  title,
  subtitle,
  children,
  background = 'white',
  fullWidth = false,
  className = '',
}) => {
  // Determine background color class
  const bgClass = background === 'gray' ? 'bg-gray-50' : 'bg-white';
  
  // Refs for animation
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);

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
    
    // Animate title if it exists
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
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
    
    // Animate content
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      );
    }
    
    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [title, subtitle, children]);
  
  return (
    <section id={id} ref={sectionRef} className={`py-16 px-4 md:px-8 lg:px-16 ${bgClass} ${className}`}>
      <div className={fullWidth ? 'w-full' : 'max-w-7xl mx-auto'}>
        {title && (
          <div className="mb-12">
            <h2 ref={titleRef} className="text-3xl uppercase font-bold font-lato text-[#203663] mb-2">{title}</h2>
            {subtitle && <p ref={subtitleRef} className="text-lg text-gray-600">{subtitle}</p>}
          </div>
        )}
        <div ref={contentRef}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentSection; 