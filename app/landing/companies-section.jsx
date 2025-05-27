'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { motion, useInView } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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

// Combine all companies into one array for mobile carousel
const allCompanies = [
  ...companies,
  ...companiesSecondSet,
  ...companiesThirdSet
];

// Flip Card Component (for desktop)
const FlipCard = ({ company }) => {
  return (
    <div className="flip-card w-full h-[420px] perspective-1000">
      <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d shadow-xl">
        {/* Front */}
        <div className="flip-card-front absolute w-full h-full backface-hidden bg-gray-900 overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={company.image}
              alt={company.name}
              fill
              className="object-cover  opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent "></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{company.name}</h3>
              <p className="text-sky-300 font-light text-sm md:text-base">{company.category}</p>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="flip-card-back absolute w-full h-full backface-hidden bg-gradient-to-br from-[#041174] to-[#010A4E]  rotate-y-180 p-6 text-white">
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

// Mobile Card Component
const MobileCard = ({ company }) => {
  return (
    <div className="relative w-full h-[90vh]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={company.image} 
          alt={company.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-8 pb-20">
        <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">
          {company.name}
        </h3>
        <p className="text-lg text-sky-300 mb-6">
          {company.category}
        </p>
        
        {/* Discover More Button */}
        <button className="group flex items-center">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-3 rounded-full inline-flex items-center transition-all duration-300 hover:bg-white/20">
            <span className="text-white text-sm font-medium mr-2">Discover More</span>
            <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

// Mobile view component
const MobileView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  
  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? allCompanies.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === allCompanies.length - 1 ? 0 : prev + 1));
  };

  // Heading animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="bg-gradient-to-r from-[#010A4E] to-[#041174] text-white min-h-screen relative"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Top section with heading and description */}
      <div className="px-6 py-12">
        <motion.div className="border-b border-white/30 pb-6 mb-8" variants={itemVariants}>
          <motion.h2 className="text-3xl font-light mb-6" variants={itemVariants}>
            Our Companies
          </motion.h2>
          <motion.p className="text-gray-300 text-sm leading-relaxed" variants={itemVariants}>
            With a rich history of global trading we are able to deliver in a diverse range 
            of sectors that match our expertise. We invest in and leverage the knowledge of our 
            world-class teams who have experience spanning the entire commodity cycle.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Cards carousel */}
      <motion.div className="relative px-6 pb-24" variants={itemVariants}>
        <div className="overflow-hidden relative">
          <div 
            className="flex transition-all duration-500 ease-out"
            style={{ 
              transform: `translateX(-${activeIndex * 85}%)`,
              width: `${allCompanies.length * 100}%`
            }}
          >
            {allCompanies.map((company, index) => (
              <div 
                key={company.id} 
                className="w-[85%] flex-shrink-0 pr-4"
                style={{ opacity: index === activeIndex ? 1 : index === (activeIndex + 1) % allCompanies.length ? 1 : 0.3 }}
              >
                <div className="bg-gray-900">
                  <div className="relative h-[50vh]">
                    <Image
                      src={company.image}
                      alt={company.name}
                      fill
                      className="object-cover"
                      priority={index === activeIndex || index === (activeIndex + 1) % allCompanies.length}
                    />
                    <div className="absolute bottom-3 left-3 bg-black/70 py-1 px-3 rounded-sm">
                      <span className="text-xs font-medium text-gray-300">
                        {company.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#010A4E]">
                    <h3 className="text-xl font-medium text-white mb-2">
                      {company.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex items-center justify-between mt-12 mb-4">
          {/* Left arrow */}
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center transition-colors hover:border-white"
            aria-label="Previous card"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Progress bar */}
          <div className="flex-1 mx-6 relative h-[2px] bg-gray-800">
            <div 
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${((activeIndex + 1) / allCompanies.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Right arrow */}
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center transition-colors hover:border-white"
            aria-label="Next card"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
};

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
    return <MobileView />;
  }

  // Desktop View - Keep your existing implementation
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