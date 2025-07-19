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
    
    // Create animation with more aggressive trigger point
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%", // Trigger earlier in the viewport
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

export default function QualityAssurancePage() {
  const introRef = useRef(null);
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const stepsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSteps, setActiveSteps] = useState({});
  
  // Quality assurance pillars cards
  const qualityPillarsCards = [
    {
      title: "Prevention",
      description: "We focus on preventing quality issues through proactive measures rather than detecting and correcting problems after they occur."
    },
    {
      title: "Consistency",
      description: "We maintain consistent quality across all our products and services through standardized processes and regular monitoring."
    },
    {
      title: "Traceability",
      description: "We maintain complete traceability of all materials from source to delivery, ensuring accountability and facilitating problem resolution."
    },
    {
      title: "Continuous Improvement",
      description: "We are committed to continuously improving our quality assurance processes to enhance customer satisfaction and operational efficiency."
    }
  ];
  
  // Team responsibilities cards
  const teamResponsibilitiesCards = [
    {
      title: "Quality Procedures",
      description: "Developing and implementing quality assurance procedures that ensure consistent product quality across our operations."
    },
    {
      title: "Supplier Management",
      description: "Conducting supplier audits and evaluations to ensure they meet our stringent quality standards."
    },
    {
      title: "Material Testing",
      description: "Performing comprehensive material inspections and tests to verify compliance with specifications."
    },
    {
      title: "Continuous Monitoring",
      description: "Monitoring quality metrics and performance indicators to identify trends and opportunities for improvement."
    }
  ];

  // Quality assurance process steps
  const qaProcessSteps = [
    {
      id: "supplier-qualification",
      title: "Supplier Qualification",
      description: "We carefully evaluate and qualify suppliers based on their quality management systems, production capabilities, and track record of performance.",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "material-inspection",
      title: "Material Inspection",
      description: "We conduct comprehensive inspections of materials at various stages, from pre-shipment to receipt, to ensure they meet all specifications and requirements.",
      image: "https://images.unsplash.com/photo-1581093458791-9b9b0ff7e69b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "quality-monitoring",
      title: "Quality Monitoring",
      description: "We continuously monitor quality metrics and performance indicators to identify trends and opportunities for improvement in our processes.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "continuous-improvement",
      title: "Continuous Improvement",
      description: "We regularly review our quality assurance processes and implement improvements based on data analysis, customer feedback, and industry best practices.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
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
        start: "top 90%", // Trigger as soon as element enters viewport
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
        qaProcessSteps.forEach((_, index) => {
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
  function ProcessStep({ title, description, image, index, inView }) {
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
            <span className="text-[#203663] font-lato font-medium text-lg">Step {index + 1}</span>
            <h3 className="text-2xl md:text-4xl font-bold font-lato text-[#203663] mt-2 mb-4 md:mb-6">{title}</h3>
            <p className="text-xl md:text-[24px] leading-tight font-onest font-light text-gray-700">{description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <HeroSection 
        subtitle="Our comprehensive quality assurance program ensures that every product we deliver meets the highest standards of excellence."
        backgroundImage="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
        sideText="QUALITY ASSURANCE"
        navTitle="QUALITY & INSIGHTS"
      />
      <div className="relative z-20 bg-white"> 
        <div 
          ref={introRef}
          className="w-full max-w-7xl md:max-w-[1300px] flex flex-wrap justify-between mx-auto px-4 py-12 bg-[#ffffff]"
        >
          <div className="w-full md:w-1/2 lg:text-[38px] font-lato leading-[1.1] text-[#1a365d] font-bold animate-item">
            Our Commitment to Quality Excellence
          </div>
          <div className="w-full md:w-1/2 flex items-center text-[17px] font-onest text-[#1a365d] animate-item">
            At IQ Group, quality assurance is not just a department—it's a mindset that permeates every aspect of our operations. Our comprehensive quality assurance program is designed to ensure that every product we deliver meets or exceeds our customers' expectations.
          </div>
        </div>
        
        {/* Quality Overview Section */}
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#1a365d] mb-6">
                  Our Quality Assurance Framework
                </h2>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    Our ISO 9001:2008 certified quality management system provides the framework for our quality assurance activities, enabling us to:
                  </p>
                  <ul>
                    <li>Consistently meet customer requirements</li>
                    <li>Ensure regulatory compliance</li>
                    <li>Prevent quality issues through proactive measures</li>
                    <li>Continuously improve our processes and products</li>
                    <li>Maintain complete traceability throughout the supply chain</li>
                  </ul>
                  <p>
                    Through our unwavering commitment to quality, we have established ourselves as a trusted supplier of raw materials to industries worldwide.
                  </p>
                </div>
              </div>
              <div>
                <div className="relative h-96 rounded-lg shadow-xl overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=2070&auto=format&fit=crop" 
                    alt="Quality assurance process"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        {/* Quality Pillars Section */}
        <FadeInSection>
          <SectionWithCards
            id="quality-pillars"
            title="Pillars of Our Quality Assurance"
            subtitle="The core principles that guide our quality assurance program"
            cards={qualityPillarsCards}
            background="gray"
            sectionNumber="01"
          />
        </FadeInSection>
        
        {/* Team Responsibilities Section */}
        <FadeInSection>
          <SectionWithCards
            id="team-responsibilities"
            title="Our Quality Assurance Team"
            subtitle="Dedicated professionals ensuring excellence at every step"
            cards={teamResponsibilitiesCards}
            hasDivider={false}
            sectionNumber="02"
          />
        </FadeInSection>
        
        {/* Quality Assurance Process Section with Process Steps */}
        <section 
          id="qa-process" 
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
                      Quality Assurance Process
                    </h2>
                    <p className="text-[24px] leading-tight font-onest font-light text-gray-200 mb-8">
                      Rigorous evaluation. <br/>
                      Comprehensive inspection. <br/>
                      Continuous monitoring.
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
                  {qaProcessSteps.map((step, index) => (
                    <div 
                      key={step.id} 
                      ref={el => stepsRef.current[index] = el}
                    >
                      <ProcessStep 
                        title={step.title}
                        description={step.description}
                        image={step.image}
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
        
        {/* Customer Testimonial Section */}
        <FadeInSection className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#1a365d] rounded-lg shadow-xl overflow-hidden">
              <div className="px-6 py-12 sm:px-12 lg:px-16">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-white">
                    What Our Customers Say
                  </h2>
                  <div className="mt-8">
                    <blockquote>
                      <div className="max-w-3xl mx-auto text-xl leading-9 text-blue-100">
                        <p>
                          "IQ Group's commitment to quality assurance is evident in every shipment we receive. Their materials consistently meet our specifications, and their documentation is always complete and accurate. They are a trusted partner in our supply chain."
                        </p>
                      </div>
                      <footer className="mt-8">
                        <div className="md:flex md:items-center md:justify-center">
                          <div className="mt-3 text-center md:mt-0 md:flex md:items-center">
                            <div className="text-base font-medium text-white">John Smith</div>
                            <svg className="hidden md:block mx-1 h-5 w-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 0h3L9 20H6l5-20z" />
                            </svg>
                            <div className="text-base font-medium text-blue-200">Procurement Director, Global Steel Corporation</div>
                          </div>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </main>
  );
} 