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

export default function CertificationsPage() {
  const introRef = useRef(null);
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const stepsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSteps, setActiveSteps] = useState({});
  
  // Certificates data
  const certificates = [
    {
      id: 'iso9001',
      title: 'ISO 9001:2008',
      description: 'Quality Management System certification that demonstrates our commitment to quality standards and customer satisfaction.',
      image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=2070&auto=format&fit=crop',
      date: 'Issued: January 2020',
      validUntil: 'Valid until: January 2023'
    },
    {
      id: 'quality-assurance',
      title: 'Quality Assurance Certificate',
      description: 'Certification for our comprehensive quality assurance processes that ensure consistent product quality.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
      date: 'Issued: March 2021',
      validUntil: 'Valid until: March 2024'
    },
    {
      id: 'industry-standard',
      title: 'Industry Standard Compliance',
      description: 'Certification that validates our compliance with industry-specific standards for raw material quality.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
      date: 'Issued: June 2021',
      validUntil: 'Valid until: June 2024'
    }
  ];
  
  // Benefits for customers cards
  const customerBenefitsCards = [
    {
      title: "Assured Quality",
      description: "Confidence in receiving products that consistently meet high-quality standards."
    },
    {
      title: "Reliability",
      description: "Dependable processes that ensure consistent product specifications."
    },
    {
      title: "Traceability",
      description: "Complete documentation and tracking throughout the supply chain."
    },
    {
      title: "Risk Reduction",
      description: "Minimized quality-related risks in your supply chain."
    }
  ];
  
  // Benefits for business cards
  const businessBenefitsCards = [
    {
      title: "Operational Excellence",
      description: "Streamlined processes that improve efficiency and reduce waste."
    },
    {
      title: "Continuous Improvement",
      description: "Structured approach to identifying and implementing improvements."
    },
    {
      title: "Market Access",
      description: "Ability to meet requirements for international markets and tenders."
    },
    {
      title: "Competitive Advantage",
      description: "Differentiation in the marketplace through recognized quality standards."
    }
  ];

  // Certification process steps
  const certificationProcessSteps = [
    {
      id: "quality-system",
      title: "Quality System Development",
      description: "We develop comprehensive quality management systems that align with international standards and our business objectives.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076&auto=format&fit=crop"
    },
    {
      id: "internal-audits",
      title: "Internal Audits",
      description: "We conduct rigorous internal audits to ensure all processes meet the required standards before external certification.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "external-certification",
      title: "External Certification",
      description: "Independent certification bodies assess our systems and processes against international standards to grant certification.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "continuous-maintenance",
      title: "Continuous Maintenance",
      description: "We maintain and continuously improve our quality systems through regular reviews, audits, and updates to meet evolving standards.",
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
        certificationProcessSteps.forEach((_, index) => {
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
        subtitle="Internationally recognized certifications that validate our commitment to quality, safety, and excellence."
        backgroundImage="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=2074&auto=format&fit=crop"
        sideText="CERTIFICATIONS"
        navTitle="QUALITY & INSIGHTS"
      />
      <div className="relative z-20 bg-white"> 
        <div 
          ref={introRef}
          className="w-full max-w-7xl md:max-w-[1300px] flex flex-wrap justify-between mx-auto px-4 py-12 bg-[#ffffff]"
        >
          <div className="w-full md:w-1/2 lg:text-[38px] font-lato leading-[1.1] text-[#1a365d] font-bold animate-item">
            Quality Certifications That Validate Our Commitment
          </div>
          <div className="w-full md:w-1/2 flex items-center text-[17px] font-onest text-[#1a365d] animate-item">
            At IQ Group, we maintain the highest standards of quality through rigorous certification processes. Our certifications demonstrate our commitment to excellence in all aspects of our operations.
          </div>
        </div>
        
        {/* Certificates Section */}
        <FadeInSection className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#1a365d] mb-12 text-center">
              Our Quality Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((certificate) => (
                <div 
                  key={certificate.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                >
                  <div className="aspect-w-3 aspect-h-4 relative">
                    <Image 
                      src={certificate.image} 
                      alt={certificate.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1a365d] mb-2">
                      {certificate.title}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {certificate.description}
                    </p>
                    <div className="text-sm text-gray-500">
                      <p>{certificate.date}</p>
                      <p>{certificate.validUntil}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
        
        {/* ISO 9001 Detail Section */}
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#1a365d] mb-6">
                  ISO 9001:2008 Certification
                </h2>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    ISO 9001:2008 is an internationally recognized standard for quality management systems. This certification validates that our organization:
                  </p>
                  <ul>
                    <li>Has a robust quality management system in place</li>
                    <li>Follows well-defined processes for consistency</li>
                    <li>Is committed to continuous improvement</li>
                    <li>Focuses on meeting customer requirements</li>
                    <li>Adheres to applicable statutory and regulatory requirements</li>
                  </ul>
                  <p>
                    Our ISO 9001:2008 certification covers our global sourcing and supply operations for Ferro Alloys, Noble Alloys, Minerals, Metals, Ores, Chemical, and Carbon Materials.
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                  <div className="aspect-w-3 aspect-h-4">
                    <Image 
                      src="https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=2070&auto=format&fit=crop" 
                      alt="ISO 9001:2008 Certificate"
                      width={600}
                      height={800}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      ISO 9001:2008 Quality Management System Certificate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        {/* Benefits for Customers Section */}
        <FadeInSection>
          <SectionWithCards
            id="customer-benefits"
            title="Benefits for Our Customers"
            subtitle="How our certifications create value for our clients"
            cards={customerBenefitsCards}
            background="gray"
            sectionNumber="01"
          />
        </FadeInSection>
        
        {/* Benefits for Business Section */}
        <FadeInSection>
          <SectionWithCards
            id="business-benefits"
            title="Benefits for Our Business"
            subtitle="How certifications strengthen our operations"
            cards={businessBenefitsCards}
            hasDivider={false}
            sectionNumber="02"
          />
        </FadeInSection>
        
        {/* Certification Process Section with Process Steps */}
        <section 
          id="certification-process" 
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
                      Certification Process
                    </h2>
                    <p className="text-[24px] leading-tight font-onest font-light text-gray-200 mb-8">
                      Comprehensive approach. <br/>
                      Rigorous standards. <br/>
                      Continuous validation.
                    </p>
                    
                    {/* CTA Button */}
                    <div className="mt-8">
                      <Link href="/contact">
                        <button className="bg-[#fbfbfb] text-[#203663] cursor-pointer hover:bg-[#f0f0f0] transition-colors py-4 px-6 text-lg font-onest">
                          Learn More About Our Process
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Process Steps */}
              <div className="col-span-8 lg:col-span-9 px-4 bg-white md:px-8 lg:px-12">
                <div className="py-8 md:py-16 space-y-24">
                  {certificationProcessSteps.map((step, index) => (
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
      </div>
    </main>
  );
} 