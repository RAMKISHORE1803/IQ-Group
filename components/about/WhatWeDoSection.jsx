'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Company divisions data
const companyDivisions = [
  {
    id: "minerals-metals",
    title: "Minerals & Metals",
    description: "Premium minerals and metals for industrial applications worldwide."
  },
  {
    id: "ferro-alloys",
    title: "Ferro Alloys",
    description: "High-quality ferro alloys for steel manufacturing and foundry industries."
  },
  {
    id: "noble-alloys",
    title: "Noble Alloys",
    description: "Specialized noble and rare metal alloys for high-performance applications."
  },
  {
    id: "green-energy",
    title: "Green Energy",
    description: "Sustainable energy solutions supporting the transition to cleaner technologies."
  }
];

// Division Card Component
function DivisionCard({ title, description, index }) {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    gsap.fromTo(
      card,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        delay: 0.2 + (index * 0.15), 
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, [index]);
  
  return (
    <div 
      ref={cardRef}
      className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100 h-full flex flex-col"
    >
      <h3 className="text-xl md:text-2xl font-bold font-lato text-[#324390] mb-3">{title}</h3>
      <p className="text-lg md:text-xl font-onest font-light text-gray-700 flex-grow">{description}</p>
    </div>
  );
}

export default function WhatWeDoSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const section = sectionRef.current;
    if (!section) return;
    
    // Clear any existing ScrollTriggers for this section
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === section) {
        trigger.kill();
      }
    });
    
    // Animate heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay: 0.2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Animate text
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay: 0.4, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Animate image
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.2, 
          delay: 0.3, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    return () => {
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      id="what-we-do" 
      ref={sectionRef}
      className="relative bg-white py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="md:col-span-6 lg:col-span-5">
            <h2 
              ref={headingRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-lato text-[#324390] mb-6"
            >
              What We Do
            </h2>
            <div 
              ref={textRef}
              className="space-y-6"
            >
              <p className="text-[22px] md:text-[24px] leading-tight font-onest font-light text-gray-700">
                IQ Group powers global industries with premium raw materials delivered with precision, integrity, and speed.
              </p>
              <p className="text-[22px] md:text-[24px] leading-tight font-onest font-light text-gray-700">
                From minerals to alloys, we connect businesses to quality materials that drive innovation and manufacturing excellence.
              </p>
              <p className="text-[22px] md:text-[24px] leading-tight font-onest font-light text-gray-700">
                With global reach and Mumbai roots, we're trusted by steel, aerospace, ceramics, batteries, and more.
              </p>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="md:col-span-6 lg:col-span-7">
            <div 
              ref={imageRef}
              className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070&auto=format&fit=crop"
                alt="Global operations"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#203663]/50 to-transparent"></div>
            </div>
          </div>
        </div>
        
        {/* Company Divisions */}
        <div className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {companyDivisions.map((division, index) => (
              <DivisionCard 
                key={division.id}
                title={division.title}
                description={division.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 