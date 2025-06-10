'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function QualitySection() {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    if (typeof window === 'undefined') return;
    
    // Set initial window width
    setWindowWidth(window.innerWidth);
    
    // Handle resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !windowWidth) return;
    
    const imageContainer = imageContainerRef.current;
    const content = contentRef.current;
    
    if (!imageContainer || !content || !sectionRef.current) return;
    
    // Create the animation
    const getAnimationSettings = () => {
      if (windowWidth < 768) {
        return {
          duration: 1,
          startPosition: 20
        };
      }
      else if (windowWidth < 1024) {
        return {
          duration: 3,
          startPosition: 50
        };
      }
      else if (windowWidth < 1280) {
        return {
          duration: 5,
          startPosition: 50
        };
      }
      else {
        return {
          duration: 10,
          startPosition: 0
        };
      }
    };
    
    const settings = getAnimationSettings();
    
    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
    
    // Add animations
    tl.to(imageContainer, {
      x: settings.startPosition,
      opacity: 1,
      duration: windowWidth < 768 ? 1 : 10,
      ease: 'none'
    })
    .to(content, {
      x: windowWidth < 1280 ? windowWidth <1024 ? windowWidth < 768 ? 0 : -100 : -100 : 0,
      opacity: 1,
      duration: windowWidth < 768 ? 2 : 10,
      ease: 'none'
    }, '<');
    
    // Mobile setup
    if (windowWidth < 768) {
      // Mobile specific animation adjustments
      gsap.set(content, { opacity: 0 });
      gsap.set(imageContainer, { opacity: 0 });
    }
    
    // Clean up
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [windowWidth]); // Depend on windowWidth instead of checking it directly

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
            <button className="mt-6 border bg-[#324390] text-[#fbfbfb] hover:bg-[#fbfbfb] hover:border-[#203663] hover:text-[#324390]  px-6 py-3 transition-all duration-300">
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