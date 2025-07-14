'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function QualitySection() {
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

      // Set initial state - modified for desktop to start from opposite positions
      if (window.innerWidth < 768) {
        // Mobile view - keep original positioning
        gsap.set(imageContainer, { x: 450 });
        gsap.set(content, { x: -450 });
      }
      else if (window.innerWidth < 1024) {
        // Desktop view - reverse initial positions
        gsap.set(imageContainer, { x: 100 }); // Start from right
        gsap.set(content, { x: -200 }); // Start from left
      }
      else if (window.innerWidth < 1280) {
        // Desktop view - reverse initial positions
        gsap.set(imageContainer, { x: 100 }); // Start from right
        gsap.set(content, { x: -150 }); // Start from left
      }
       else {
        // Desktop view - reverse initial positions
        gsap.set(imageContainer, { x: 100 }); // Start from right
        gsap.set(content, { x: -100 }); // Start from left
      }
      
      // Create separate animations for each element for better control
      const imageAnim = gsap.to(imageContainer, {
        x:  window.innerWidth < 1280 ? window.innerWidth < 1024 ? 20 : 50 : 0, // Move to center position
        ease: "power2.out",
        duration: window.innerWidth < 768 ? 1 : 10,
        paused: true
      });
      
      const contentAnim = gsap.to(content, {
        x: window.innerWidth < 1280 ? window.innerWidth <1024 ? window.innerWidth <  768 ? 0 : -100 : -100 : 0, // Move to center position
        ease: "power2.out",
        duration: window.innerWidth < 768 ? 2 : 10,
        paused: true
      });
      
      // Create scroll trigger
      if (window.innerWidth < 768) {
        // Mobile view - NO reverse
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom-=50",
          end: "bottom center+=100",
          markers: false,
          onEnter: () => {
            imageAnim.play();
            contentAnim.play();
          },
          onLeaveBack: () => {
            // Do nothing: animation won't reverse
          }
        });
      } else {
        // Desktop view - ALLOW reverse via scrub
        imageAnim.progress(0).pause();
        contentAnim.progress(0).pause();
      
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top bottom-=50",
          end: "bottom center+=100",
          markers: false,
          scrub: 0.5, // Smooth scrub for reverse effect
          onUpdate: (self) => {
            imageAnim.progress(self.progress);
            contentAnim.progress(self.progress);
          }
        });
      }
      
      return () => {
        console.log("Cleaning up ScrollTrigger");
        imageAnim.kill();
        contentAnim.kill();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
    <section 
      
      className="py-[20px] md:py-32 min-h-screen overflow-hidden bg-[#fbfbfb] from-[#010A4E] to-[#041174]"
      id="about"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div ref={sectionRef} className="grid grid-cols-1  md:grid-cols-2 gap-8 md:gap-12 items-center">
          
        <div 
            ref={imageContainerRef} 
            className="relative block md:hidden h-[350px] sm:h-[400px] md:ml-[50px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden"
          >
            <Image
              src="https://www.iqgroup.in/image/certificate/2.jpg"
              alt="Fiber optic network"
              fill
              className="object-cover rounded-xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#010A4E]/70 to-transparent rounded-xl"></div>
          </div>

          <div ref={contentRef} className="text-white space-y-6 md:min-w-[450px] lg:min-w-[550px] md:pl-[50px]">
            <h2 className="text-[32px] text-lato text-[#3B54C4]  font-bold md:text-[38px] font-bold">
              QUALITY POLICY
            </h2>
            {/* <p className=" text-onest md:text-[32] font-light text-[#333] mb-6">
              POWERING INNOVATION. DELIVERING EXCELLENCE.
            </p> */}
            <p className="  text-gray-700 text-onest font-light md:text-[20px] lg:text-[24px] xl:text-[28px] ">
            ISO 9001:2008 certified, we uphold uncompromising quality—ensuring every stage, from sourcing to delivery, meets the highest standards of precision, consistency, and continual improvement.            </p>
            {/* <p className=" md:text-[28px] text-[#1E3157] font-onest font-light leading-relaxed">Trusted by steel, aerospace, ceramics, batteries, and more.</p> */}
            <button className="mt-6 border cursor-pointer bg-[#324390] text-[#fbfbfb] hover:bg-[#fbfbfb] hover:border-[#203663] hover:text-[#324390]  px-6 py-3 transition-all duration-300">
              Learn More
            </button>
          </div>

          <div 
            ref={imageContainerRef} 
            className="relative h-[350px] hidden md:block sm:h-[400px] md:mr-[40px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden"
          >
            <Image
              src="https://www.iqgroup.in/image/certificate/2.jpg"
              alt="Fiber optic network"
              fill
              className="object-contain rounded-xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#010A4E]/70 to-transparent rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>
    {/* <div 
        
        className="h-[200vh]" 
        style={{ 
          position: 'relative',
          zIndex: 0
        }}
      /> */}
    </>
  );
} 