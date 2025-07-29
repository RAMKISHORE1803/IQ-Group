'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { cn } from "@/lib/utils";

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
      gsap.set(imageContainer, { x: window.innerWidth < 768 ? 450 : window.innerWidth < 1490 ? 0 : 50 });
      gsap.set(content, { x: window.innerWidth < 768 ? -450 : 0 });
      
      // Create separate animations for each element for better control
      const imageAnim = gsap.to(imageContainer, {
        x: window.innerWidth < 768 ? 0 : window.innerWidth < 1290 ? -50 : window.innerWidth < 1490 ? -80 : 0,
        ease: "power2.out",
        duration: window.innerWidth <768 ? 2 : 10,
        paused: true
      });
      
      const contentAnim = gsap.to(content, {
        x: window.innerWidth < 768 ? 0 : window.innerWidth < 1290 ? 50 : window.innerWidth < 1490 ? 50 : 40,
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
      
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=50",
        end: "bottom center+=100",
        markers: false
      });
      
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
      className="relative min-h-[80vh] md:min-h-[95vh] pt-[20px] pb-[0px] md:py-32 min-h-screen overflow-hidden bg-[#fbfbfb]"
      id="about"
    >
      {/* Grid background */}
      {/* <div
        className={cn(
          "absolute inset-0",
          "[background-size:90px_90px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
        )}
      /> */}
      
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex md:items-center justify-between md:justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:pl-4 lg:pl-0 lg:pr-8 xl:pl-[10px]">
        <div ref={sectionRef} className="grid h-full grid-cols-1 md:grid-cols-2 lg:ml-[0px] lg:pl-[0px] gap-8 md:gap-6 lg:gap-4 items-center">
          <div 
            ref={imageContainerRef} 
            className="relative h-auto min-h-[40vh] max-w-[90vw] md:max-w-[550px] md:pl-[5px] sm:h-[400px] lg:ml-[0px] lg:min-w-[700px] xl:min-w-[700px] xl:pl-[20px] md:h-[500px] lg:h-[550px] w-full  min-w-[1490px]:ml-[50px] overflow-hidden"
          >
            <Image
              src="/about-us.png"
              alt="Fiber optic network"
              fill
              className="object-contain md:object-cover"
              priority
            />
          </div>
          
          <div ref={contentRef} className="text-white space-y-6 md:pr-4 lg:pr-8 md:min-w-[370px] lg:min-w-[500px]">
            <h2 className="text-[24px] text-[#324390] leading-[1.2] md:leading-normal text-lato text-[#000] font-bold sm:text-[34px] md:text-[38px] lg:text-[42px] font-bold">
            POWERING INNOVATION. DELIVERING EXCELLENCE.
            </h2>
            <p className="text-gray-700 text-onest font-light text-[20px] sm:text-[24px] md:text-[18px] lg:text-[20px] xl:text-[25px]">
            IQ Group fuels industries worldwide with premium raw materials—from alloys to minerals—delivered with precision, integrity, and speed.            </p>
            <p className="sm:text-[24px] text-[20px] md:text-[17px] lg:text-[21px] xl:text-[25px] text-[#1E3157] font-onest font-light leading-relaxed">Trusted by leading sectors including steel, aerospace, ceramics, and battery manufacturing.</p>
            <Link href="/about">
            <button className="md:mt-6 cursor-pointer border bg-[#324390] text-[#fbfbfb] hover:bg-[#fbfbfb] border-2 border-[#2D4BD2] hover:border-[#2D4BD2] hover:text-[#2D4BD2] px-6 py-3 transition-all duration-300">
              Learn More
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
} 