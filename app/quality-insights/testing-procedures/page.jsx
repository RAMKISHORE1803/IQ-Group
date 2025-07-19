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

export default function TestingProceduresPage() {
  const introRef = useRef(null);
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const stepsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSteps, setActiveSteps] = useState({});
  
  // Testing methodologies cards
  const testingMethodologiesCards = [
    {
      title: "Chemical Analysis",
      description: "We employ advanced analytical techniques to determine the chemical composition of materials, ensuring they meet specified requirements."
    },
    {
      title: "Physical Testing",
      description: "Our physical testing procedures evaluate material properties such as hardness, density, and tensile strength to ensure they meet industry standards."
    },
    {
      title: "Dimensional Inspection",
      description: "We conduct precise measurements to verify that materials conform to specified dimensions and tolerances."
    },
    {
      title: "Visual Inspection",
      description: "Our trained inspectors perform thorough visual examinations to identify surface defects and ensure overall product quality."
    }
  ];
  
  // Additional methodologies cards
  const additionalMethodologiesCards = [
    {
      title: "Packaging Testing",
      description: "We verify that packaging meets requirements for protection, labeling, and transportation to ensure products reach customers in optimal condition."
    },
    {
      title: "Documentation Review",
      description: "We conduct comprehensive reviews of material certificates and test reports to ensure compliance with specifications and standards."
    },
    {
      title: "Conformity Assessment",
      description: "We assess materials against international standards and customer specifications to ensure full compliance."
    },
    {
      title: "Statistical Analysis",
      description: "We apply statistical methods to analyze test results and ensure consistent quality across batches."
    }
  ];

  // Testing process steps
  const testingProcessSteps = [
    {
      id: "pre-shipment",
      title: "Pre-Shipment Inspection",
      description: "Before materials leave the supplier's facility, we conduct thorough inspections to verify quality, quantity, and packaging according to specifications.",
      image: "https://images.unsplash.com/photo-1581093458791-9b9b0ff7e69b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "sample-testing",
      title: "Sample Testing",
      description: "We collect representative samples from each batch for laboratory testing to verify chemical composition, physical properties, and other quality parameters.",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080&auto=format&fit=crop"
    },
    {
      id: "documentation",
      title: "Documentation Verification",
      description: "We meticulously review all material certificates, test reports, and other documentation to ensure compliance with specifications and regulatory requirements.",
      image: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "receipt-inspection",
      title: "Receipt Inspection",
      description: "Upon arrival at our facilities, materials undergo additional inspection to verify condition, quantity, and conformity to specifications before being released for delivery.",
      image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop"
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
        testingProcessSteps.forEach((_, index) => {
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
        subtitle="Our rigorous testing procedures ensure that all materials meet the highest quality standards before reaching our customers."
        backgroundImage="https://images.unsplash.com/photo-1581093196277-9f6c3d111183?q=80&w=2070&auto=format&fit=crop"
        sideText="TESTING PROCEDURES"
        navTitle="QUALITY & INSIGHTS"
      />
      <div className="relative z-20 bg-white"> 
        <div 
          ref={introRef}
          className="w-full max-w-7xl md:max-w-[1300px] flex flex-wrap justify-between mx-auto px-4 py-12 bg-[#ffffff]"
        >
          <div className="w-full md:w-1/2 lg:text-[38px] font-lato leading-[1.1] text-[#1a365d] font-bold animate-item">
            Comprehensive Quality Testing for Superior Results
          </div>
          <div className="w-full md:w-1/2 flex items-center text-[17px] font-onest text-[#1a365d] animate-item">
            At IQ Group, we implement comprehensive testing procedures at every stage of our supply chain to ensure that all materials meet or exceed industry standards and customer specifications.
          </div>
        </div>
        
        {/* Testing Overview Section */}
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#1a365d] mb-6">
                  Our Testing Approach
                </h2>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    Our testing procedures are designed to:
                  </p>
                  <ul>
                    <li>Verify material composition and properties</li>
                    <li>Identify and prevent defects</li>
                    <li>Ensure consistency and reliability</li>
                    <li>Validate compliance with international standards</li>
                    <li>Provide complete documentation and traceability</li>
                  </ul>
                  <p>
                    Through these rigorous testing procedures, we deliver products that consistently meet the highest quality standards, providing our customers with confidence in their material sourcing.
                  </p>
                </div>
              </div>
              <div>
                <div className="relative h-96 rounded-lg shadow-xl overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop" 
                    alt="Quality testing process"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        {/* Testing Methodologies Section */}
        <FadeInSection>
          <SectionWithCards
            id="testing-methodologies"
            title="Our Testing Methodologies"
            subtitle="Advanced techniques to ensure material quality and consistency"
            cards={testingMethodologiesCards}
            background="gray"
            sectionNumber="01"
          />
        </FadeInSection>
        
        {/* Additional Methodologies Section */}
        <FadeInSection>
          <SectionWithCards
            id="additional-methodologies"
            title="Additional Testing Methods"
            subtitle="Comprehensive approach to quality verification"
            cards={additionalMethodologiesCards}
            hasDivider={false}
            sectionNumber="02"
          />
        </FadeInSection>
        
        {/* Testing Process Section with Process Steps */}
        <section 
          id="testing-process" 
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
                      Testing Process
                    </h2>
                    <p className="text-[24px] leading-tight font-onest font-light text-gray-200 mb-8">
                      Thorough inspection. <br/>
                      Precise testing. <br/>
                      Verified quality.
                    </p>
                    
                    {/* CTA Button */}
                    <div className="mt-8">
                      <Link href="/contact">
                        <button className="bg-[#fbfbfb] text-[#203663] cursor-pointer hover:bg-[#f0f0f0] transition-colors py-4 px-6 text-lg font-onest">
                          Learn More About Our Testing
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Process Steps */}
              <div className="col-span-8 lg:col-span-9 px-4 bg-white md:px-8 lg:px-12">
                <div className="py-8 md:py-16 space-y-24">
                  {testingProcessSteps.map((step, index) => (
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
        
        {/* Quality Standards Section */}
        <FadeInSection className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#1a365d] mb-6">
                  Adherence to Quality Standards
                </h2>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    Our testing procedures are aligned with international quality standards, including:
                  </p>
                  <ul>
                    <li>ISO 9001:2008 Quality Management System</li>
                    <li>ASTM International Standards</li>
                    <li>European Standards (EN)</li>
                    <li>American National Standards Institute (ANSI)</li>
                    <li>Industry-specific standards for various materials</li>
                  </ul>
                  <p>
                    By adhering to these recognized standards, we ensure that our testing procedures are robust, reliable, and consistent with global best practices.
                  </p>
                </div>
                <div className="mt-8">
                  <Link 
                    href="/quality-insights/certifications"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#1a365d] hover:bg-[#2a466d] transition-colors"
                  >
                    View Our Certifications
                  </Link>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-w-1 aspect-h-1">
                    <Image 
                      src="https://images.unsplash.com/photo-1581094488379-6a10d04c0f04?q=80&w=2070&auto=format&fit=crop" 
                      alt="Quality Standard"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="aspect-w-1 aspect-h-1">
                    <Image 
                      src="https://images.unsplash.com/photo-1581093458791-9b9b0ff7e69b?q=80&w=2070&auto=format&fit=crop" 
                      alt="Quality Standard"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="aspect-w-1 aspect-h-1">
                    <Image 
                      src="https://images.unsplash.com/photo-1581093196277-9f6c3d111183?q=80&w=2070&auto=format&fit=crop" 
                      alt="Quality Standard"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="aspect-w-1 aspect-h-1">
                    <Image 
                      src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2070&auto=format&fit=crop" 
                      alt="Quality Standard"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg shadow-md"
                    />
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