'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { motion ,useInView } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Company data - First set
const companies = [
  {
    id: 1,
    name: 'IQ International',
    category: 'Chemical',
    description: 'Supplying high-quality chemicals and raw materials to industries worldwide.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    commodities: ['Industrial Chemicals', 'Specialty Chemicals', 'Pharmaceutical Intermediates', 'Agricultural Chemicals']
  },
  {
    id: 2,
    name: 'IQ Minerals & Metals',
    category: 'Minerals and Metals',
    description: 'Global supplier of premium minerals and metals for various industrial applications.',
    image: 'https://images.unsplash.com/photo-1605559911160-e31bfb0875b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    commodities: ['Precious Metals', 'Base Metals', 'Industrial Minerals', 'Rare Earth Elements']
  },
  {
    id: 3,
    name: 'IQ Coal & Coke',
    category: 'Carbon Materials',
    description: 'Specialized in high-quality carbon materials for energy and metallurgical industries.',
    image: 'https://images.unsplash.com/photo-1617770187085-acfdcaa932f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    commodities: ['Metallurgical Coal', 'Thermal Coal', 'Petroleum Coke', 'Carbon Additives']
  }
];

// Company data - Second set
const companiesSecondSet = [
  {
    id: 4,
    name: 'IQ Ferro Alloys',
    category: 'Ferro Alloys',
    description: 'Leading supplier of high-quality ferro alloys for steel manufacturing and various industrial applications.',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    commodities: ['Ferro Silicon', 'Ferro Manganese', 'Silico Manganese', 'Ferro Chrome']
  },
  {
    id: 5,
    name: 'IQ Noble Alloys',
    category: 'Noble Alloys',
    description: 'Specialized in manufacturing and supplying premium noble alloys for advanced technological applications.',
    image: 'https://images.unsplash.com/photo-1594737959857-b9ee1667af9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    commodities: ['Titanium Alloys', 'Nickel Alloys', 'Cobalt Alloys', 'Platinum Group Metals']
  },
  {
    id: 6,
    name: 'IQ Green Energy',
    category: 'Renewable Energy Solutions',
    description: 'Providing sustainable energy solutions with cutting-edge technology and innovative designs.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    commodities: [
      'UE 42 plus / 5.1 KW',
      'UE 42 / 4.2 KW',
      'UE 33 / 3.3 KW',
      'UE 15 Plus / 1.8 KW',
      'UE 15 / 1.5 KW',
      'UE 6 / 650 W'
    ]
  }
];

// Third set of companies
const companiesThirdSet = [
  {
    id: 7,
    name: 'IQ Angel Investments',
    category: 'Venture Capital',
    description: 'We are a venture intended to promote investments in various types of businesses at their beginning or developmental stage. We look for ventures with dedication and desire to develop extraordinary value in the concerned industry.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
    commodities: ['Early Stage Startups', 'Growth Capital', 'Strategic Investments', 'Business Development']
  },
  {
    id: 8,
    name: 'Dab WorldWide',
    category: 'Marketing & Innovation',
    description: 'We are an exclusive innovative product marketing company that achieves marketing supremacy for various startups, who have amazing innovative ideas and products.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    commodities: ['Product Marketing', 'Brand Strategy', 'Market Research', 'Digital Campaigns', 'Growth Hacking']
  }
];

// Flip Card Component
const FlipCard = ({ company }) => {
  return (
    <div className="flip-card w-full h-[420px] perspective-1000">
      <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d shadow-xl rounded-xl">
        {/* Front */}
        <div className="flip-card-front absolute w-full h-full backface-hidden bg-gray-900 rounded-xl overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={company.image}
              alt={company.name}
              fill
              className="object-cover rounded-xl opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{company.name}</h3>
              <p className="text-sky-300 font-light text-sm md:text-base">{company.category}</p>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="flip-card-back absolute w-full h-full backface-hidden bg-gradient-to-br from-[#041174] to-[#010A4E] rounded-xl rotate-y-180 p-6 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-3">{company.name}</h3>
          <p className="text-sky-300 font-light text-sm md:text-base mb-4">{company.category}</p>
          <div>
            <h4 className="text-lg font-semibold mb-2">Commodities:</h4>
            <ul className="space-y-1 max-h-[180px] overflow-y-auto pr-2">
              {company.commodities.map((commodity, index) => (
                <li key={index} className="flex items-center text-gray-200 text-sm md:text-base">
                  <span className="mr-2 text-sky-300">•</span>
                  {commodity}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-gray-300 font-light text-sm md:text-base">{company.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function CompaniesSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const firstCardsContainerRef = useRef(null);
  const secondCardsContainerRef = useRef(null);
  const thirdCardsContainerRef = useRef(null);
  const headingRef = useRef(null);

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
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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
          duration: 1
        })
        .to(secondCardsContainer, {
          y: 0,
          opacity: 1,
          duration: 1
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
          duration: 1
        })
        .to(thirdCardsContainer, {
          y: 0,
          opacity: 1,
          duration: 1
        }, "<");
      
      console.log("All animations set up");
      
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-[5px] md:py-32 bg-gradient-to-r from-[#010A4E] to-[#041174] relative min-h-[400vh]"
      id="companies-section"
    >
      {/* This container will be pinned */}
      <div 
        ref={containerRef}
        className="h-screen flex flex-col justify-center items-center w-full"
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.h2 ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
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
      
      {/* Custom styles for 3D flip effect */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}