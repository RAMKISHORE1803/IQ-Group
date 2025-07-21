'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
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
        x: window.innerWidth < 768 ? 0 : window.innerWidth < 1290 ? -50 : -20,
        ease: "power2.out",
        duration: window.innerWidth <768 ? 2 : 10,
        paused: true
      });
      
      const contentAnim = gsap.to(content, {
        x: window.innerWidth < 768 ? 0 : window.innerWidth < 1290 ? 50 : 20,
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
            className="relative h-auto max-w-[500px] md:pl-[10px] sm:h-[400px] lg:ml-[0px] lg:min-w-[580px] xl:min-w-[600px] xl:pl-[100px] md:h-[450px] lg:h-[500px] w-full  overflow-hidden"
          >
            <img
              src="/images/about-us.png"
              alt="Fiber optic network"
            
              className="object-cover "
              priority
            />
            {/* <div className="absolute inset-0 bg-gradient-to-tr from-[#010A4E]/70 to-transparent rounded-xl"></div> */}
          </div>
          
          <div ref={contentRef} className="text-white space-y-6 md:pr-0 md:min-w-[370px] lg:min-w-[550px] lg:pr-[10px] lg:pr-[5px] ">
            <h2 className="text-[32px] text-[#324390] text-lato text-[#000] font-bold sm:text-[34px] md:text-[38px] lg:text-[42px] font-bold">
            POWERING INNOVATION. DELIVERING EXCELLENCE.
            </h2>
            {/* <p className=" text-onest text-[#5790E1] sm:text-[20px] md:text-[16px] lg:text-[22px] font-light text-[#333] mb-6 md:pr-30  lg:pr-[100px]">
              
            </p> */}
            <p className="  text-gray-700 text-onest font-light sm:text-[24px] md:text-[18px] md:pr-0 lg:text-[20px] md:pr-[5px] xl:text-[25px] lg:pr-[0px] ">
            IQ Group powers industries with premium raw materials from alloys to minerals delivered with precision, integrity, and speed. Global reach, Mumbai roots. 
            </p>
            <p className="sm:text-[24px] md:text-[17px] lg:text-[21px] xl:text-[25px]  text-[#1E3157] font-onest font-light leading-relaxed">Trusted by steel, aerospace, ceramics, batteries, and more.</p>
            <Link href="/about">
            <button className="mt-6 cursor-pointer border bg-[#324390] text-[#fbfbfb] hover:bg-[#fbfbfb] border-2 border-[#2D4BD2] hover:border-[#2D4BD2] hover:text-[#2D4BD2]  px-6 py-3 transition-all duration-300">
              Learn More
            </button>
            </Link>
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