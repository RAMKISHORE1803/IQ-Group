'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IndustriesOverviewSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    if (!section) return;

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });

    // Animate heading and text
    tl.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    ).fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="industries-overview" 
      className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-24 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          {/* Heading */}
          <div className="md:col-span-5 lg:col-span-4">
            <h2 
              ref={headingRef}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#203663] mb-4"
            >
              Serving Global Industries with Premium Materials
            </h2>
          </div>
          
          {/* Text Content */}
          <div 
            ref={textRef}
            className="md:col-span-7 lg:col-span-8"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                IQ Group delivers high-quality raw materials to diverse industries worldwide, ensuring consistent supply and exceptional service. Our expertise spans multiple sectors, providing tailored solutions for each industry's unique requirements.
              </p>
              <p className="text-gray-700 mb-6">
                With decades of experience and a global network of suppliers, we've established ourselves as a trusted partner for businesses seeking reliable material sourcing. Our commitment to quality, sustainability, and innovation drives our approach to serving each industry.
              </p>
              <p className="text-gray-700">
                Explore our industry solutions to discover how IQ Group can support your specific needs with premium materials, technical expertise, and dependable supply chain management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesOverviewSection; 