'use client';
import React, { useRef, useEffect, useState } from "react";
import Link from 'next/link';
import HeroSection from "./HeroSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWithCards from '@/components/companies/SectionWithCards';
import Image from 'next/image';
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionNavigation from "@/components/companies/SectionNavigation";

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
  const certificateSectionRef = useRef(null);
  const certificateTitleRef = useRef(null);
  const certificateLeftColRef = useRef(null);
  const certificateRightColRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSteps, setActiveSteps] = useState({});
  const [activeCertificate, setActiveCertificate] = useState("registration"); // Default to first certificate
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [displayedCertificate, setDisplayedCertificate] = useState(null);
  
  // Certificates data
  const certificates = [
    {
      id: "registration",
      title: "Company Registration",
      description: "IQ Groups and Metals Company is officially registered with Legal Entity Identifier (LEI), allowing us to engage in international financial transactions with proper regulatory compliance and global identification standards. This registration is essential for our worldwide operations and ensures transparent cross-border business dealings.",
      imageUrl: "https://www.iqgroup.in/image/certificate/3.jpg",
      issuedBy: "LEI (Legal Entity Identifier)",
      validUntil: "Permanent Registration"
    },
    {
      id: "iso9001",
      title: "ISO 9001:2015 Certification",
      description: "Our ISO 9001:2015 certification from AQSR demonstrates our commitment to maintaining the highest quality management standards. This internationally recognized certification validates our systematic approach to enhancing customer satisfaction, ensuring consistent product quality, and implementing continuous improvement processes across our operations.",
      imageUrl: "https://www.iqgroup.in/image/certificate/2.jpg",
      issuedBy: "AQSR (American Quality Standards Registrars)",
      validUntil: "2025-12-31"
    },
    {
      id: "msmeAward",
      title: "India 5000 Best MSME Award",
      description: "IQ Group has been nominated for the prestigious 'India 5000 Best MSME Award', recognizing our excellence in business practices, innovation, and contribution to the Indian economy. This nomination acknowledges our commitment to quality, customer satisfaction, and sustainable business growth as a Micro, Small and Medium Enterprise.",
      imageUrl: "https://www.iqgroup.in/image/certificate/1.jpg",
      issuedBy: "India 5000",
      validUntil: "Annual Recognition"
    },
    {
      id: "assocham",
      title: "ASSOCHAM Membership",
      description: "IQ Group is a proud member of ASSOCHAM (The Associated Chambers of Commerce and Industry of India), one of India's apex trade associations. This membership connects us with a vast network of businesses, provides advocacy support, and keeps us informed about policy developments affecting our industry, enhancing our ability to contribute to India's economic growth.",
      imageUrl: "https://www.iqgroup.in/image/certificate/4.jpg",
      issuedBy: "ASSOCHAM India",
      validUntil: "Active Membership"
    },
    {
      id:"ISSDA",
      title: "ISSDA Mebership",
      description:"IQ Minerals & Metals is now an Associate Member of the Indian Stainless Steel Development Association (ISSDA) for the year 2024–25.This membership isn't just a badge—it's a testament. A testament to our commitment to stainless steel excellence, innovation, and collaboration with India's leading minds in the industry.At IQ, we don't follow standards. We help shape them.Through this association, we step into a larger ecosystem of trust, quality, and transformative potential in stainless steel.",
      imageUrl: "/ISSDAcert.png",
      issuedBy: "ISSDA",
      validUntil: "Active Membership"
    }
  ];

  const sectionLinks = [
    {
      title: "Our Certifications",
      link: "#certifications"
    },
    {
      title: "Quality Policy",
      link: "#quality-policy"
    },
    {
      title: "Our Quality Commitment",
      link: "#quality-commitment"
    }
  ];
  
  // Value cards data for "Quality Policy" section
  const qualityPolicyCards = [
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

  // Handle certificate accordion hover
  const handleCertificateHover = (id) => {
    setIsImageTransitioning(true);
    // Set the new active certificate
    setActiveCertificate(id);
  };
  
  // Handle certificate accordion mouse leave
  const handleCertificateLeave = () => {
    setIsImageTransitioning(true);
    // Close the accordion by setting active to null
    setActiveCertificate(null);
  };
  
  // Find the active certificate
  const activeCertificateData = certificates.find(cert => cert.id === activeCertificate) || certificates[0];
  
  // We're using hover-based accordions, so no default active state
  useEffect(() => {
    // Initially all accordions are closed
    setActiveCertificate(null);
  }, []);

  // Handle image preloading and transitions
  useEffect(() => {
    // Set the initial displayed certificate
    if (!displayedCertificate && activeCertificateData) {
      setDisplayedCertificate(activeCertificateData);
      return;
    }

    // If no active certificate (all closed), show the last active one but faded
    if (!activeCertificateData) {
      setIsImageTransitioning(true);
      return;
    }

    // If transitioning, wait for fade out then update the displayed certificate
    if (isImageTransitioning) {
      const timer = setTimeout(() => {
        setDisplayedCertificate(activeCertificateData);
        setIsImageTransitioning(false);
      }, 200); // Faster transition for hover responsiveness
      
      return () => clearTimeout(timer);
    }
  }, [activeCertificate, isImageTransitioning, displayedCertificate, activeCertificateData]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const intro = introRef.current;
    if (!intro) return;
    
    // Create animation timeline
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
    
    // Certificate section animations
    const section = certificateSectionRef.current;
    const title = certificateTitleRef.current;
    const leftCol = certificateLeftColRef.current;
    const rightCol = certificateRightColRef.current;
    
    if (section && title && leftCol && rightCol) {
      // Create animation timeline
      const certTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate title
      certTl.fromTo(
        title,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
      
      // Animate left column
      certTl.fromTo(
        leftCol,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // Animate right column
      certTl.fromTo(
        rightCol,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }
    
    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Certificate Accordion Item Component
  function CertificateAccordionItem({ id, title, description, issuedBy, isActive, onMouseEnter, onMouseLeave }) {
    return (
      <div
        className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
        onMouseEnter={() => onMouseEnter(id)}
        onMouseLeave={onMouseLeave}
        // onClick removed to rely only on hover
      >
        <div
          className="w-full py-6 flex cursor-pointer items-center justify-between text-left focus:outline-none"
        >
          <div className="flex items-center">
            <motion.span 
              animate={{ 
                color: isActive ? "#1a365d" : "#324390",
                x: isActive ? 4 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="font-lato lg:text-[28px] font-bold"
            >
              {title}
            </motion.span>
          </div>
          <motion.div
            animate={{ 
              rotate: isActive ? 180 : 0,
              scale: isActive ? 1.1 : 1
            }}
            transition={{ 
              duration: 0.25, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex-shrink-0 ml-2"
          >
            <ChevronDown className="w-6 h-6 text-[#324390]" />
          </motion.div>
        </div>
                  <motion.div
            initial={false}
            animate={{
              height: isActive ? "auto" : 0,
              opacity: isActive ? 1 : 0,
              marginBottom: isActive ? 24 : 0,
              backgroundColor: isActive ? "rgba(242, 245, 250, 0.5)" : "rgba(255, 255, 255, 0)",
            }}
            transition={{ 
              duration: 0.3, 
              ease: [0.04, 0.62, 0.23, 0.98],
              height: { duration: 0.3 },
              opacity: { duration: isActive ? 0.25 : 0.15 },
              backgroundColor: { duration: 0.3 }
            }}
            className="overflow-hidden rounded-md"
          >
          <div className="pb-4 px-3 text-[17px] font-onest text-gray-700 leading-relaxed">
            {/* Mobile Image - Only show on mobile when accordion is active */}
            <div className="lg:hidden mb-6">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg relative h-[300px] sm:h-[400px]">
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={certificates.find(cert => cert.id === id)?.imageUrl || ""}
                    alt={`${title} Certificate`}
                    fill
                    className="object-contain"
                    priority={isActive}
                  />
                </motion.div>
              </div>
            </div>
           
            <div className="space-y-3">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#324390] mt-1 mr-3 flex-shrink-0 h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-700 font-onest">{description}</p>
              </div>
             
              <div className="flex hidden md:flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#324390] mr-3 flex-shrink-0 h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-gray-700 font-onest">Issued By: <span className="hover:text-[#324390]">{issuedBy}</span></p>
              </div>
             
              {/* <div className="flex hidden md:flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-[#324390] mr-3 flex-shrink-0 h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-700 font-onest">Valid Until: <span className="hover:text-[#324390]">{validUntil}</span></p>
                </div> */}
            </div>
          </div>
        </motion.div>
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
      <div className="relative z-20 bg-white lg:pt-[2vh] "> 
        <div 
          ref={introRef}
          className="w-full max-w-7xl md:max-w-[1300px] flex flex-wrap justify-between lg:mb-[3vh] mx-auto px-4 py-12 bg-[#ffffff]"
        >
          <div className="w-full md:w-1/2 lg:text-[38px] font-lato leading-[1.1] text-[#1a365d] font-bold animate-item">
            Excellence in Every Step of Our Quality Journey
          </div>
          <div className="w-full md:w-1/2 flex items-center text-[17px] font-onest text-[#1a365d] animate-item">
            At IQ Group, quality is not just a policy—it's our foundation. Being ISO 9001:2008 certified, we maintain our promise of delivering quality raw materials following international quality standards in all our supplies.
          </div>
        </div>

        <SectionNavigation links={sectionLinks} title="IN THIS SECTION" />
        
        {/* Certifications Section */}
        <section 
          id="certifications" 
          ref={certificateSectionRef}
          className="py-8 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-left mb-8">
              <span className="text-4xl font-bold font-lato text-[#203663] block mb-4">01</span>
              <h2 
                ref={certificateTitleRef}
                className="text-3xl uppercase md:text-4xl font-bold font-lato text-[#203663] mb-4"
              >
                Our Certifications
              </h2>
            </div>
            
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative">
                {/* Left column - Certificate Image - Sticky - Hidden on mobile */}
                <div ref={certificateLeftColRef} className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
                  <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden rounded-lg relative h-[580px]">
                    {displayedCertificate && (
                      <motion.div 
                        key={displayedCertificate.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ 
                          opacity: isImageTransitioning ? 0 : 1,
                          scale: isImageTransitioning ? 0.98 : 1
                        }}
                        transition={{ 
                          duration: 0.4,
                          ease: "easeOut"
                        }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={displayedCertificate.imageUrl}
                          alt={`${displayedCertificate.title} Certificate`}
                          fill
                          className="object-contain"
                          priority
                          onLoad={() => setIsImageTransitioning(false)}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Right column - Accordion - Full width on mobile */}
                <div ref={certificateRightColRef} className="space-y-0 lg:max-h-[800px] lg:overflow-y-auto lg:pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {certificates.map((certificate) => (
                    <CertificateAccordionItem
                      key={certificate.id}
                      id={certificate.id}
                      title={certificate.title}
                      description={certificate.description}
                      issuedBy={certificate.issuedBy}
                      // validUntil={certificate.validUntil}
                      isActive={activeCertificate === certificate.id}
                      onMouseEnter={handleCertificateHover}
                      onMouseLeave={handleCertificateLeave}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Policy Section */}
        <FadeInSection>
          <SectionWithCards
            id="quality-policy"
            title="Quality Policy"
            subtitle="Our commitment to excellence in every aspect of our operations"
            cards={qualityPolicyCards}
            hasDivider={false}
            background="gray"
            sectionNumber="02"
          />
        </FadeInSection>

        {/* Quality Commitment Section */}
        <FadeInSection>
          <SectionWithCards
            id="quality-commitment"
            title="Our Quality Commitment"
            subtitle="Core principles that guide our quality management system"
            cards={qualityCommitmentCards}
            background="white"
            sectionNumber="03"
          />
          <div className="h-[13vh] bg-white"></div>
        </FadeInSection>
      </div>
    </main>
  );
}