'use client';
import React, { useRef, useEffect, useState } from "react";
import Link from 'next/link';
import HeroSection from "@/components/contact/herosection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWithCards from '@/components/companies/SectionWithCards';
import Image from 'next/image';
import { motion } from "framer-motion";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fade-in animation for sections
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const section = sectionRef.current;
    if (!section) return;
    
    // Set initial state (invisible)
    gsap.set(section, { 
      opacity: 0,
      y: 30
    });
    
    // Create animation with earlier trigger point
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%", // Trigger even earlier in the viewport
        toggleActions: "play none none none"
      }
    });
    
    // Animate to visible
    tl.to(section, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: delay
    });
    
    return () => {
      // Clean up
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [delay]);
  
  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default function QualityInsightsPage() {
  const introRef = useRef(null);
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const stepsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSteps, setActiveSteps] = useState({});
  
  // Value cards data for "Quality Standards" section
  const qualityStandardsCards = [
    {
      title: "ISO 9001:2008 Certified",
      description: "Our certification demonstrates our commitment to quality management systems that meet international standards for global sourcing and supply."
    },
    {
      title: "Rigorous Testing",
      description: "Every product undergoes comprehensive testing to ensure it meets the highest quality standards before delivery to our customers."
    },
    {
      title: "Quality Assurance",
      description: "Our quality assurance processes are designed to prevent defects and ensure consistent quality in all our products."
    },
    {
      title: "Continuous Improvement",
      description: "We implement continuous improvement methodologies to enhance our quality management system and exceed customer expectations."
    }
  ];
  
  // Quality commitment cards
  const qualityCommitmentCards = [
    {
      title: "Customer Focus",
      description: "We understand our customers' current and future needs, meet their requirements, and strive to exceed their expectations."
    },
    {
      title: "Leadership",
      description: "Our leaders establish unity of purpose and direction, creating an environment where people are fully engaged in achieving quality objectives."
    },
    {
      title: "Process Approach",
      description: "We manage activities and related resources as processes, which enables us to achieve desired results more efficiently."
    },
    {
      title: "Systematic Management",
      description: "We identify, understand, and manage interrelated processes as a system, contributing to the organization's effectiveness."
    }
  ];

  // Process steps data for quality process section
  const processSteps = [
    {
      id: "quality-policy",
      title: "Quality Policy",
      description: "Our ISO 9001:2008 certified quality management system ensures excellence at every step.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
      link: "/quality-insights/quality-policy"
    },
    {
      id: "certifications",
      title: "Certifications",
      description: "International certifications that validate our commitment to quality and excellence.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
      link: "/quality-insights/certifications"
    },
    {
      id: "testing-procedures",
      title: "Testing Procedures",
      description: "Rigorous testing methodologies ensure all materials meet the highest quality standards.",
      image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop",
      link: "/quality-insights/testing-procedures"
    },
    {
      id: "quality-assurance",
      title: "Quality Assurance",
      description: "Comprehensive quality assurance processes designed to prevent defects and ensure consistency.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076&auto=format&fit=crop",
      link: "/quality-insights/quality-assurance"
    }
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const intro = introRef.current;
    if (!intro) return;
    
    // Create animation timeline with earlier trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: intro,
        start: "top 95%", // Trigger as soon as element starts entering viewport
        toggleActions: "play none none none"
      }
    });
    
    // Animate intro section
    tl.fromTo(
      intro.querySelectorAll('.animate-item'),
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power2.out" 
      }
    );
    
    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set up scroll animations
    const timer = setTimeout(() => {
      if (isMobile) {
        // For mobile, make all steps visible immediately
        const initialActiveSteps = {};
        processSteps.forEach((_, index) => {
          initialActiveSteps[index] = true;
        });
        setActiveSteps(initialActiveSteps);
        return;
      }
      
      const section = sectionRef.current;
      const leftColumn = leftColumnRef.current;
      
      if (!section || !leftColumn) return;
      
      // Clear any existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
      
      // Pin the left column while scrolling, but stop before footer
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom-=100px', // Stop before reaching the footer
        pin: leftColumn,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
      
      // Create scroll triggers for each step
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        
        ScrollTrigger.create({
          trigger: step,
          start: 'top center+=100',
          end: 'bottom center',
          onEnter: () => {
            setActiveSteps(prev => ({ ...prev, [index]: true }));
          },
          onLeaveBack: () => {
            setActiveSteps(prev => ({ ...prev, [index]: false }));
          },
        });
      });
    }, 200);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
      
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);

  // Reset refs array when steps change
  stepsRef.current = [];
  
  // Process Step Component
  function ProcessStep({ title, description, image, index, inView, link }) {
    return (
      <div 
        className={`mb-16 md:mb-48 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: `${index * 0.2}s` }}
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image - Full height on left side */}
          <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          
          {/* Content - Right side */}
          <div className="py-4 md:py-6">
            <span className="text-[#203663] font-lato font-medium text-lg">Quality Element {index + 1}</span>
            <h3 className="text-2xl md:text-4xl font-bold font-lato text-[#203663] mt-2 mb-4 md:mb-6">{title}</h3>
            <p className="text-xl md:text-[24px] leading-tight font-onest font-light text-gray-700 mb-6">{description}</p>
            <Link 
              href={link}
              className="inline-flex items-center px-6 py-3 border border-[#203663] text-base font-medium text-[#203663] hover:bg-[#203663] hover:text-white transition-colors duration-300"
            >
              Learn More
              <svg 
                className="ml-2 w-5 h-5" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <HeroSection 
        subtitle="Our commitment to quality is backed by rigorous standards, comprehensive certifications, and thorough testing procedures."
        backgroundImage="https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=2070&auto=format&fit=crop"
        sideText="QUALITY & INSIGHTS"
        navTitle="QUALITY & INSIGHTS"
      />
      <div className="relative z-20 bg-white"> 
        <div 
          ref={introRef}
          className="w-full max-w-7xl md:max-w-[1300px] flex flex-wrap justify-between mx-auto px-4 py-12 bg-[#ffffff]"
        >
          <div className="w-full md:w-1/2 lg:text-[38px] font-lato leading-[1.1] text-[#1a365d] font-bold animate-item">
            Excellence in Every Step of Our Quality Journey
          </div>
          <div className="w-full md:w-1/2 flex items-center text-[17px] font-onest text-[#1a365d] animate-item">
            At IQ Group, quality is not just a policy—it's our foundation. Being ISO 9001:2008 certified, we maintain our promise of delivering quality raw materials following international quality standards in all our supplies.
          </div>
        </div>
        
        {/* Quality Standards Section */}
        <FadeInSection>
          <SectionWithCards
            id="quality-standards"
            title="Quality Standards"
            subtitle="Our commitment to excellence in every aspect of our operations"
            cards={qualityStandardsCards}
            hasDivider={false}
            sectionNumber="01"
          />
        </FadeInSection>
        
        {/* Quality Commitment Section */}
        <FadeInSection>
          <SectionWithCards
            id="quality-commitment"
            title="Our Quality Commitment"
            subtitle="Core principles that guide our quality management system"
            cards={qualityCommitmentCards}
            background="gray"
            sectionNumber="02"
          />
        </FadeInSection>
        
        {/* Quality Process Section with Process Steps */}
        <section 
          id="quality-process" 
          ref={sectionRef}
          className="relative bg-white py-16 md:py-0 overflow-hidden bg-[#203663]"
        >
          <div className="container mx-auto px-0">
            <div className="md:grid md:grid-cols-12 md:gap-0">
              {/* Left Column - Fixed CTA */}
              <div 
                ref={leftColumnRef}
                className="col-span-4 lg:col-span-3 bg-[#203663] px-4 md:px-0 md:pl-4 lg:ml-[0px] md:ml-0 mb-4 md:mb-0"
              >
                <div className="md:h-screen md:flex md:flex-col md:justify-center md:sticky md:top-0">
                  <div className="max-w-xs py-8 md:py-0">
                    <span className="text-sm uppercase tracking-wider font-lato text-gray-300 mb-2">IN THIS SECTION</span>
                    <p className="text-4xl font-bold text-white mb-4">03</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-lato text-[#fbfbfb] mb-6">
                      Quality Process
                    </h2>
                    <p className="text-[24px] leading-tight font-onest font-light text-gray-200 mb-8">
                      Rigorous standards. <br/>
                      Comprehensive testing. <br/>
                      Consistent excellence.
                    </p>
                    
                    {/* CTA Button */}
                    <div className="mt-8">
                      <Link href="/contact">
                        <button className="bg-[#fbfbfb] text-[#203663] cursor-pointer hover:bg-[#f0f0f0] transition-colors py-4 px-6 text-lg font-onest">
                          Contact Our Quality Team
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Process Steps */}
              <div className="col-span-8 lg:col-span-9 px-4 bg-white md:px-8 lg:px-12">
                <div className="py-8 md:py-16 space-y-24">
                  {processSteps.map((step, index) => (
                    <div 
                      key={step.id} 
                      ref={el => stepsRef.current[index] = el}
                    >
                      <ProcessStep 
                        title={step.title}
                        description={step.description}
                        image={step.image}
                        link={step.link}
                        index={index}
                        inView={activeSteps[index] || isMobile}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 