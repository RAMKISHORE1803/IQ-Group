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
      gsap.set(imageContainer, { x: window.innerWidth < 768 ? 450 : 0 });
      gsap.set(content, { x: window.innerWidth < 768 ? -450 : 0 });
      
      // Create separate animations for each element for better control
      const imageAnim = gsap.to(imageContainer, {
        x: window.innerWidth < 768 ? 0 : -40,
        ease: "power2.out",
        duration: window.innerWidth <768 ? 2 : 10,
        paused: true
      });
      
      const contentAnim = gsap.to(content, {
        x: window.innerWidth < 768 ? 0 : 40,
        ease: "power2.out",
        duration: window.innerWidth <768 ? 1 : 10,
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
      
        ScrollTrigger.create({
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
        st.kill();
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
      <div className="container mx-auto px-4 md:pl-4 lg:pl-0 lg:pr-12 xl:pl-[40px]">
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:ml-[0px] lg:pl-[0px] xl:ml-[50px] gap-8 md:gap-12 items-center">
          <div 
            ref={imageContainerRef} 
            className="relative h-[350px] md:pl-[10px] sm:h-[400px] lg:ml-[0px] lg:min-w-[550px] xl:min-w-[580px] xl:pl-[100px] md:h-[450px] lg:h-[500px] w-full rounded-xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1661103391619-46e3175b3152?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Fiber optic network"
              fill
              className="object-cover rounded-xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#010A4E]/70 to-transparent rounded-xl"></div>
          </div>
          
          <div ref={contentRef} className="text-white space-y-6 md:pr-0 md:min-w-[370px] lg:min-w-[550px] lg:pr-[10px] lg:pr-[5px] ">
            <h2 className="text-[32px] text-[#324390] text-lato text-[#000] font-bold sm:text-[34px] md:text-[38px] lg:text-[42px] font-bold">
              IQ GROUP
            </h2>
            <p className=" text-onest text-[#5790E1] sm:text-[20px] md:text-[16px] lg:text-[22px] font-light text-[#333] mb-6 md:pr-30  lg:pr-[100px]">
              POWERING INNOVATION. DELIVERING EXCELLENCE.
            </p>
            <p className="  text-gray-700 text-onest font-light sm:text-[24px] md:text-[18px] md:pr-0 lg:text-[20px] md:pr-[5px] xl:text-[25px] lg:pr-[0px] ">
            IQ Group powers industries with premium raw materials from alloys to minerals delivered with precision, integrity, and speed. Global reach, Mumbai roots. 
            </p>
            <p className="sm:text-[24px] md:text-[17px] lg:text-[21px] xl:text-[25px]  text-[#1E3157] font-onest font-light leading-relaxed">Trusted by steel, aerospace, ceramics, batteries, and more.</p>
            <button className="mt-6 border bg-[#324390] text-[#fbfbfb] hover:bg-[#fbfbfb] border-2 border-[#2D4BD2] hover:border-[#2D4BD2] hover:text-[#2D4BD2]  px-6 py-3 transition-all duration-300">
              Learn More
            </button>
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