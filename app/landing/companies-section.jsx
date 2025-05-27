'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useInView } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import modularized components and data
import FlipCard from '@/components/companies/FlipCard';
import MobileView from '@/components/companies/MobileView';
import { companies, companiesSecondSet, companiesThirdSet, allCompanies } from '@/components/companies/CompanyData';

// Import flip card styles
import '@/components/companies/flipcard.css';

export default function CompaniesSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const firstCardsContainerRef = useRef(null);
  const secondCardsContainerRef = useRef(null);
  const thirdCardsContainerRef = useRef(null);
  const headingRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Desktop animations setup - only run if not mobile
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const timer = setTimeout(() => {
      console.log("Setting up ScrollTrigger for Companies Section");
      
      const section = sectionRef.current;
      const container = containerRef.current;
      const firstCardsContainer = firstCardsContainerRef.current;
      const secondCardsContainer = secondCardsContainerRef.current;
      const thirdCardsContainer = thirdCardsContainerRef.current;
      
      if (!section || !container || !firstCardsContainer || !secondCardsContainer || !thirdCardsContainer) {
        console.error("Missing elements for animation");
        return;
      }

      // Pin the container while scrolling with more space
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: container,
        pinSpacing: true,
        anticipatePin: 1,
        markers: false,
        id: "mainPin"
      });
      
      // Set initial states
      gsap.set(secondCardsContainer, { 
        y: 600,
        opacity: 0,
        zIndex: 2
      });
      
      gsap.set(thirdCardsContainer, { 
        y: 600,
        opacity: 0,
        zIndex: 3
      });
      
      // First animation: First set to Second set transition
      const firstTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top+=10% top",
          end: "top+=35% top",  
          scrub: 1,
          markers: false,
          id: "firstToSecond"
        }
      });
      
      firstTimeline
        .to(firstCardsContainer, { 
          opacity: 0,
          y: -100,
          scale: 0.9,
          duration: 0.3,
        })
        .to(secondCardsContainer, {
          y: 0,
          opacity: 1,
          duration: 0.3
        }, "<");
      
      // Second animation: Second set to Third set transition
      const secondTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top+=50% top",
          end: "top+=75% top",  
          scrub: 1,
          markers: false,
          id: "secondToThird"
        }
      });
      
      secondTimeline
        .to(secondCardsContainer, { 
          opacity: 0,
          y: -100,
          scale: 0.9,
          duration: 0.3
        })
        .to(thirdCardsContainer, {
          y: 0,
          opacity: 1,
          duration: 0.3
        }, "<");
      
      console.log("All animations set up");
      
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [isMobile]);

  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px 0px" });
  const isFirstDivInView = useInView(firstCardsContainerRef, { once: false, margin: "-100px 0px" });
  
  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };
  
  const firstDivVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  // Mobile view
  if (isMobile) {
    return <MobileView allCompanies={allCompanies} />;
  }

  // Desktop View
  return (
    <section 
      ref={sectionRef}
      className="py-[5px] md:py-32 bg-[#fbfbfb] from-[#010A4E] to-[#041174] relative min-h-[400vh]"
      id="companies-section"
    >
      {/* This container will be pinned */}
      <div 
        ref={containerRef}
        className="h-screen flex flex-col justify-center items-center w-full"
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2 ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-[#041174] text-center mb-16"
            initial="hidden"
            animate={isHeadingInView ? "visible" : "hidden"}
            variants={headingVariants}>
            Discover Our Companies
          </motion.h2>
          
          <div className="relative h-[600px]">
            {/* First set of cards */}
            <div 
              ref={firstCardsContainerRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto absolute top-0 left-0 right-0 z-1"
              initial="hidden"
              animate={isFirstDivInView ? "visible" : "hidden"}
              variants={firstDivVariants}
            >
              {companies.map(company => (
                <FlipCard key={company.id} company={company} />
              ))}
            </div>
            
            {/* Second set of cards */}
            <div 
              ref={secondCardsContainerRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto absolute top-0 left-0 right-0 z-2"
            >
              {companiesSecondSet.map(company => (
                <FlipCard key={company.id} company={company} />
              ))}
            </div>
            
            {/* Third set of cards with only 2 cards */}
            <div 
              ref={thirdCardsContainerRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto absolute top-0 left-0 right-0 z-3"
            >
              <div className="md:col-span-1">
                <FlipCard company={companiesThirdSet[0]} />
              </div>
              <div className="md:col-span-1">
                <FlipCard company={companiesThirdSet[1]} />
              </div>
              <div className="md:col-span-1 hidden md:block">
                {/* Empty space */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}