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

export default function QualityPolicyPage() {
  const introRef = useRef(null);
  
  // Quality policy principles cards
  const policyPrinciplesCards = [
    {
      title: "Customer Focus",
      description: "We understand our customers' current and future needs, meet their requirements, and strive to exceed their expectations."
    },
    {
      title: "Leadership",
      description: "Our leaders establish unity of purpose and direction, creating an environment where people are fully engaged in achieving quality objectives."
    },
    {
      title: "People Involvement",
      description: "We recognize that people at all levels are the essence of our organization, and their full involvement enables their abilities to be used for the organization's benefit."
    },
    {
      title: "Process Approach",
      description: "We manage activities and related resources as processes, which enables us to achieve desired results more efficiently."
    }
  ];
  
  // Additional policy principles cards
  const additionalPrinciplesCards = [
    {
      title: "Systematic Management",
      description: "We identify, understand, and manage interrelated processes as a system, contributing to the organization's effectiveness and efficiency in achieving its objectives."
    },
    {
      title: "Continuous Improvement",
      description: "We maintain a permanent focus on continuous improvement of our overall performance as a key objective for every employee and process."
    },
    {
      title: "Factual Decision Making",
      description: "We base our decisions on the analysis of data and information, ensuring effective and objective decision-making processes."
    },
    {
      title: "Supplier Relationships",
      description: "We foster mutually beneficial relationships with our suppliers to enhance the ability of both organizations to create value."
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

  return (
    <main>
      <HeroSection 
        subtitle="Our commitment to quality is the foundation of our business operations and customer relationships."
        backgroundImage="https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=2070&auto=format&fit=crop"
        sideText="QUALITY POLICY"
        navTitle="QUALITY & INSIGHTS"
      />
      <div className="relative z-20 bg-white"> 
        <div 
          ref={introRef}
          className="w-full max-w-7xl md:max-w-[1300px] flex flex-wrap justify-between mx-auto px-4 py-12 bg-[#ffffff]"
        >
          <div className="w-full md:w-1/2 lg:text-[38px] font-lato leading-[1.1] text-[#1a365d] font-bold animate-item">
            ISO 9001:2008 Certified Excellence
          </div>
          <div className="w-full md:w-1/2 flex items-center text-[17px] font-onest text-[#1a365d] animate-item">
            We are proud to be ISO 9001:2008 certified for global sourcing & supply of Ferro Alloys, Noble Alloys, Minerals, Metals, Ores, Chemical, & Carbon Materials. This certification demonstrates our commitment to maintaining the highest standards of quality management.
          </div>
        </div>
        
        {/* Quality Management System Section */}
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#1a365d] mb-6">
                  Our Quality Management System
                </h2>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    Our quality management system ensures an absolute level of quality control at all stages including the sourcing of the desired raw materials to their supply within the metallurgical industry.
                  </p>
                  <p>
                    We believe quality management is the core of a well-balanced and controlled system. This is why our experts have anticipated a dynamic quality policy that allows us to achieve our goal. With such a policy, we excel at the set standards and benchmarks as desired by our clients.
                  </p>
                  <p>
                    The ISO 9001:2008 certification validates our commitment to:
                  </p>
                  <ul>
                    <li>Consistently provide products that meet customer and applicable statutory and regulatory requirements</li>
                    <li>Enhance customer satisfaction through the effective application of the system</li>
                    <li>Ensure continual improvement of our processes</li>
                    <li>Guarantee conformity to customer and applicable statutory and regulatory requirements</li>
                  </ul>
                </div>
              </div>
              <div className="relative h-[500px] rounded-lg shadow-xl overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2290&auto=format&fit=crop" 
                  alt="ISO 9001:2008 Certificate"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </FadeInSection>
        
        {/* Quality Policy Principles Section */}
        <FadeInSection>
          <SectionWithCards
            id="policy-principles"
            title="Quality Policy Principles"
            subtitle="Core principles that guide our quality management system"
            cards={policyPrinciplesCards}
            background="gray"
            sectionNumber="01"
          />
        </FadeInSection>
        
        {/* Additional Policy Principles Section */}
        <FadeInSection>
          <SectionWithCards
            id="additional-principles"
            title="Additional Policy Principles"
            subtitle="Supporting principles that enhance our quality management approach"
            cards={additionalPrinciplesCards}
            hasDivider={false}
            sectionNumber="02"
          />
        </FadeInSection>
        
        {/* Certificate Showcase Section */}
        <FadeInSection className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1a365d] mb-4">Our ISO 9001:2008 Certification</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Our certification is regularly audited to ensure ongoing compliance with the ISO 9001:2008 standard, demonstrating our unwavering commitment to quality.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200 max-w-md">
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
            <div className="mt-12 text-center">
              <Link 
                href="/quality-insights/certifications"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#1a365d] hover:bg-[#2a466d] transition-colors"
              >
                View All Certifications
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </main>
  );
} 