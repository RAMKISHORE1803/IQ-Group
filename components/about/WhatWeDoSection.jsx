'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Company divisions data from analyzing the companies directory
const companyDivisions = [
  {
    quote: "We power the world's steel with high-value Ferro Alloys — fast, reliable, and globally sourced. Trusted by industries. Built for speed.",
    name: "IQ Ferro Alloys",
    title: "Premium ferro alloys for diverse industrial applications",
    category: "COMPANY",
    image: "https://images.unsplash.com/photo-1547555706-54bcf05bbad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    quote: "With 20+ years of global impact, IQ delivers premium raw materials across 20 nations—driven by precision, trust, innovation, and client-focused excellence.",
    name: "IQ Minerals & Metals",
    title: "Premium industrial minerals for diverse applications",
    category: "COMPANY",
    image: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote: "We bring precision to progress — delivering high-grade noble alloys through an exclusive global distribution network. Focused. Trusted. Built for the industries that shape the future.",
    name: "IQ Noble Alloys",
    title: "Premium noble alloys for specialized industrial applications",
    category: "COMPANY",
    image: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote: "IQ Green Energy fuses wind and sun into one seamless system—clean, quiet, and built for the future. From rooftops to remote microgrids, we make renewable energy effortless.",
    name: "IQ Green Energy",
    title: "End-to-end renewable energy solutions for a sustainable future",
    category: "COMPANY",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    quote: "With 20+ years in carbon materials, we power global industries through seamless supply, deep expertise, and a network built for scale.",
    name: "IQ Coke & Coal",
    title: "Premium carbon materials for diverse industrial applications",
    category: "COMPANY",
    image: "https://images.unsplash.com/photo-1589007716619-42656585dd85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    quote: "Connecting global markets with strategic investments and innovative business solutions. Building value through expertise and relationships.",
    name: "IQ International",
    title: "Global business solutions and strategic investments",
    category: "COMPANY",
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote: "Unlocking the earth's potential through sustainable mining operations and premium mineral extraction. From source to industry.",
    name: "IQ Mining",
    title: "Sustainable mining operations and mineral extraction",
    category: "COMPANY",
    image: "https://images.unsplash.com/photo-1578663933477-0f18389eb461?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote: "Fueling innovation through strategic investments in high-potential ventures. Building tomorrow's success stories today.",
    name: "IQ Angel Investments",
    title: "Strategic investments in high-potential ventures",
    category: "COMPANY",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote: "Delivering global logistics excellence with precision, reliability, and customer-focused solutions. Connecting businesses worldwide.",
    name: "DAB Worldwide",
    title: "Global logistics and supply chain solutions",
    category: "COMPANY",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function WhatWeDoSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const cardsContainerRef = useRef(null);
  
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
    
    // Animate cards container
    if (cardsContainerRef.current) {
      gsap.fromTo(
        cardsContainerRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
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
              Our Expertise
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
              className="relative h-[400px] md:h-[500px] w-full overflow-hidden "
            >
              <Image
                src="https://images.unsplash.com/photo-1598193957011-39b9f2916992?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Global operations"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#203663]/50 to-transparent"></div>
            </div>
          </div>
        </div>
        
        {/* Company Divisions - Infinite Moving Cards */}
        {/* <div ref={cardsContainerRef} className="mt-16 md:mt-24">
          
          <div className="lg:min-h-[50vh] rounded-md flex flex-col antialiased bg-gray-50 dark:bg-black dark:bg-grid-white/[0.05] bg-white items-center justify-start relative overflow-hidden">
            <InfiniteMovingCards
              items={companyDivisions}
              direction="right"
              speed="slow"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
} 