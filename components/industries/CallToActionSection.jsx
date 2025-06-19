'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CallToActionSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    if (!section) return;

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });

    // Animate content
    tl.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
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
      className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-24 bg-[#203663] text-white"
    >
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          Need Industry-Specific Solutions?
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-200">
          Our team of experts is ready to help you find the perfect materials for your industry requirements. Get in touch to discuss your specific needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/contact" 
            className="inline-block bg-white text-[#203663] py-3 px-8 rounded-lg font-medium transition-all hover:bg-gray-100 hover:shadow-lg"
          >
            Contact Us
          </Link>
          <Link 
            href="/resources" 
            className="inline-block bg-transparent border border-white text-white py-3 px-8 rounded-lg font-medium transition-all hover:bg-white/10"
          >
            View Resources
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection; 