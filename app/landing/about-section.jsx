'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Need to ensure we're in the browser
    if (typeof window === 'undefined') return;
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Small timeout to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      console.log("Setting up ScrollTrigger for About Section");
      
      // Get the elements
      const section = sectionRef.current;
      const imageContainer = imageContainerRef.current;
      const content = contentRef.current;
      
      if (!section || !imageContainer || !content) {
        console.error("Missing elements for animation");
        return;
      }

      // Set initial state
      gsap.set(imageContainer, { x: 0 });
      gsap.set(content, { x: 0 });
      
      // Create separate animations for each element for better control
      const imageAnim = gsap.to(imageContainer, {
        x: window.innerWidth < 768 ? -5 : -40,
        ease: "power2.out",
        duration: 10,
        paused: true
      });
      
      const contentAnim = gsap.to(content, {
        x: window.innerWidth < 768 ? 5 : 40,
        ease: "power2.out",
        duration: 10,
        paused: true
      });
      
      // Create scroll trigger
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=50",
        end: "bottom center+=100",
        markers: false,
        scrub: 0.5,
        onUpdate: (self) => {
          // Use progress to control the animations
          imageAnim.progress(self.progress);
          contentAnim.progress(self.progress);
          console.log("ScrollTrigger progress:", self.progress);
        }
      });
      
      console.log("ScrollTrigger created:", st);
      
      return () => {
        console.log("Cleaning up ScrollTrigger");
        imageAnim.kill();
        contentAnim.kill();
        st.kill();
      };
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section 
      
      className="py-[20px] md:py-32 min-h-screen overflow-hidden bg-gradient-to-r from-[#010A4E] to-[#041174]"
      id="about-section"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div 
            ref={imageContainerRef} 
            className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
              alt="Fiber optic network"
              fill
              className="object-cover rounded-xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#010A4E]/70 to-transparent rounded-xl"></div>
          </div>
          
          <div ref={contentRef} className="text-white space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              IQ GROUP
            </h2>
            <p className="text-xl md:text-2xl font-light text-sky-300 mb-6">
              POWERING INNOVATION. DELIVERING EXCELLENCE.
            </p>
            <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed">
              At IQ Group, we don't just supply raw materials we fuel global innovation. With decades of expertise and a footprint that spans continents, we connect industry leaders to a trusted network of world-class suppliers. Our mission is simple: to turn bold ideas into tangible outcomes by delivering high quality raw materials that drive performance, precision, and progress.
            </p>
            <button className="mt-6 border border-sky-400 text-sky-300 hover:bg-sky-900/30 hover:border-sky-300 rounded-md px-6 py-3 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 