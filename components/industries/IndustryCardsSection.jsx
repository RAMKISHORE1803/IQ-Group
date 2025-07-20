'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Industry data
const industries = [
  // Row 1
  {
    id: 'aerospace',
    category: 'AVIATION',
    name: 'Aerospace',
    description: 'Supplying high-performance alloys and materials meeting strict aerospace industry standards.',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/aerospace'
  },
  {
    id: 'steel',
    category: 'MANUFACTURING',
    name: 'Steel',
    description: 'Supplying high-grade raw materials for steel production, including iron ore, coal, and alloys.',
    image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/steel'
  },
  {
    id: 'automobile',
    category: 'TRANSPORTATION',
    name: 'Automobile',
    description: 'Providing essential materials for automotive manufacturing, from aluminum alloys to specialty metals.',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/automobile'
  },
  {
    id: 'battery',
    category: 'ENERGY',
    name: 'Battery',
    description: 'Supplying materials for battery production, including lithium, cobalt, and other essential components.',
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc7dfc39?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/battery'
  },
  // Row 2
  {
    id: 'ceramic',
    category: 'MATERIALS',
    name: 'Ceramic',
    description: 'Providing high-quality raw materials for ceramic production across various applications.',
    image: 'https://images.unsplash.com/photo-1565193298357-c5f6b0ac8ab4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/ceramic'
  },
  {
    id: 'chemical',
    category: 'PROCESSING',
    name: 'Chemical',
    description: 'Delivering raw materials for chemical processing and manufacturing industries.',
    image: 'https://images.unsplash.com/photo-1616661317361-b8a30bef3321?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/chemical'
  },
  {
    id: 'foundries',
    category: 'METALLURGY',
    name: 'Foundries',
    description: 'Supplying essential materials for metal casting and foundry operations.',
    image: 'https://images.unsplash.com/photo-1605197384465-b93a3f3a16cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/foundries'
  },
  {
    id: 'glass',
    category: 'MANUFACTURING',
    name: 'Glass',
    description: 'Providing raw materials for glass production, including silica, soda ash, and limestone.',
    image: 'https://images.unsplash.com/photo-1518893883800-45cd0954574b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/glass'
  },
  // Row 3
  {
    id: 'paint',
    category: 'COATINGS',
    name: 'Paint',
    description: 'Supplying pigments, binders, and additives for paint and coating manufacturing.',
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/paint'
  },
  {
    id: 'refractory',
    category: 'HEAT RESISTANCE',
    name: 'Refractory',
    description: 'Providing high-temperature resistant materials for industrial furnaces and kilns.',
    image: 'https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/refractory'
  },
  {
    id: 'stainless-steel',
    category: 'METALLURGY',
    name: 'Stainless Steel',
    description: 'Supplying premium alloys and materials for stainless steel production.',
    image: 'https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/stainless-steel'
  },
  {
    id: 'aluminum',
    category: 'METALS',
    name: 'Aluminum',
    description: 'Delivering high-quality aluminum and related materials for various industries.',
    image: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/aluminum'
  },
  // Row 4
  {
    id: 'textile',
    category: 'FABRICS',
    name: 'Textile',
    description: 'Providing materials and chemicals for textile manufacturing and processing.',
    image: 'https://images.unsplash.com/photo-1620208923217-62e0f24f0277?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/textile'
  },
  {
    id: 'tyre',
    category: 'AUTOMOTIVE',
    name: 'Tyre',
    description: 'Supplying rubber compounds and reinforcing materials for tire manufacturing.',
    image: 'https://images.unsplash.com/photo-1589982334414-c79c022d66e1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/tyre'
  },
  {
    id: 'paper',
    category: 'MANUFACTURING',
    name: 'Paper',
    description: 'Providing chemicals and materials for paper production and processing.',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3',
    link: '/industries/paper'
  }
];

// Group industries for mobile carousels (3 groups of 5)
const carouselGroups = [
  industries.slice(0, 5),
  industries.slice(5, 10),
  industries.slice(10, 15)
];

const IndustryCardsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null);
  const [currentIndices, setCurrentIndices] = useState([0, 0, 0]); // One index for each carousel group
  
  // Reset cardsRef array when industries change
  cardsRef.current = [];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll for mobile carousels
  useEffect(() => {
    if (!isMobile) return;
    
    const intervals = carouselGroups.map((_, groupIndex) => {
      return setInterval(() => {
        setCurrentIndices(prev => {
          const newIndices = [...prev];
          newIndices[groupIndex] = (newIndices[groupIndex] + 1) % carouselGroups[groupIndex].length;
          return newIndices;
        });
      }, 4000 + (groupIndex * 1000)); // Stagger the timing for each carousel
    });
    
    return () => intervals.forEach(interval => clearInterval(interval));
  }, [isMobile]);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    if (!section) return;

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      }
    });

    // Animate heading
    tl.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Animate cards with staggered effect
    if (cardsRef.current.length > 0) {
      tl.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15,
          ease: 'power2.out' 
        },
        '-=0.4'
      );
    }

    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  const nextSlide = (groupIndex) => {
    setCurrentIndices(prev => {
      const newIndices = [...prev];
      newIndices[groupIndex] = (newIndices[groupIndex] + 1) % carouselGroups[groupIndex].length;
      return newIndices;
    });
  };

  const prevSlide = (groupIndex) => {
    setCurrentIndices(prev => {
      const newIndices = [...prev];
      newIndices[groupIndex] = (newIndices[groupIndex] - 1 + carouselGroups[groupIndex].length) % carouselGroups[groupIndex].length;
      return newIndices;
    });
  };

  const handleCardClick = (id) => {
    if (activeCardId === id) {
      setActiveCardId(null);
    } else {
      setActiveCardId(id);
    }
  };

  const CardComponent = ({ industry, index, isActive }) => (
    <motion.div
      className={`relative h-96 bg-cover bg-center bg-no-repeat overflow-hidden cursor-pointer ${isActive ? 'z-10' : 'z-0'}`}
      style={{ 
        backgroundImage: `url(${industry.image})`,
        width: isMobile ? '100%' : '100%'
      }}
      whileHover={{ scale: isMobile ? 1 : 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => isMobile && handleCardClick(industry.id)}
      ref={el => cardsRef.current[index] = el}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-20" />
      
      {/* Category Label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black bg-opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          {industry.category}
        </span>
      </div>
      
      {/* Floating Glassy overlay - small at bottom, full card when active */}
      <motion.div
        className="absolute bg-white/70 backdrop-blur-md rounded-lg overflow-hidden"
        initial={{ 
          bottom: "16px",
          left: "16px",
          right: "16px",
          top: "auto",
          height: "120px"
        }}
        animate={isMobile && isActive ? { 
          top: "0px",
          bottom: "0px",
          left: "0px",
          right: "0px",
          height: "100%",
          borderRadius: "0px",
          zIndex: 50,
          opacity: 1
        } : {}}
        whileHover={!isMobile ? { 
          top: "0px",
          bottom: "0px",
          left: "0px",
          right: "0px",
          height: "100%",
          borderRadius: "0px",
          zIndex: 50,
          opacity: 1
        } : {}}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0, 0.2, 1],
          type: "tween"
        }}
      >
        {/* Default content - always visible */}
        <div className="relative z-10 p-4">
          <p className="text-xs text-gray-600 font-medium mb-1">
            INDUSTRY
          </p>
          <h3 className="font-lato font-light text-[30px] line-clamp-2 text-ellipsis overflow-hidden text-black leading-tight transition-all duration-300">
            {industry.name}
          </h3>
        </div>
        
        {/* Expanded content - visible when active on mobile or hovered on desktop */}
        <motion.div
          className="px-4 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: (isMobile && isActive) ? 1 : 0, 
            y: (isMobile && isActive) ? 0 : 20 
          }}
          whileHover={!isMobile ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4">
            {industry.description}
          </p>
          <Link href={industry.link} className="inline-flex items-center text-[16px] font-medium text-[#203663] hover:text-[#152648] transition-colors">
            → Learn more
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <section 
      ref={sectionRef}
      id="industry-cards" 
      className="py-16 md:py-24 lg:py-32 px-2 md:px-4 lg:px-8"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section heading */}
        {/* <div className="mb-12 md:mb-16 lg:mb-20">
          <h2 
            ref={headingRef}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#203663] text-center"
          >
            Our Industry Expertise
          </h2>
          <p className="text-gray-600 text-center mt-4 max-w-3xl mx-auto">
            IQ Group delivers premium materials across diverse industries, with specialized knowledge and solutions for each sector's unique requirements.
          </p>
        </div> */}
        
        {/* Desktop View - Grid Layout */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {industries.slice(0, 12).map((industry, index) => (
              <CardComponent 
                key={industry.id} 
                industry={industry} 
                index={index}
                isActive={activeCardId === industry.id}
              />
            ))}
            {/* Last row with 3 centered cards */}
            <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-[1050px] mx-auto w-full">
              {industries.slice(12, 15).map((industry, index) => (
                <CardComponent 
                  key={industry.id} 
                  industry={industry} 
                  index={index + 12}
                  isActive={activeCardId === industry.id}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Mobile View - Carousel Layout */}
        {isMobile && (
          <>
            {/* First carousel group - Manufacturing & Infrastructure */}
            <div className="mb-16 relative">
              <h3 className="text-xl font-bold text-[#203663] mb-6">
                Manufacturing Industries
              </h3>
              
              <div className="overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentIndices[0] * 100}%` }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.5
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                    if (swipe) {
                      if (offset.x > 0) {
                        prevSlide(0);
                      } else {
                        nextSlide(0);
                      }
                    }
                  }}
                >
                  {industries.slice(0, 5).map((industry, index) => (
                    <div key={industry.id} className="w-full flex-shrink-0 px-2">
                      <CardComponent 
                        industry={industry} 
                        index={index}
                        isActive={activeCardId === industry.id}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {industries.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndices[0] ? 'bg-[#203663]' : 'bg-gray-300'
                    }`}
                    onClick={() => {
                      setCurrentIndices(prev => {
                        const newIndices = [...prev];
                        newIndices[0] = index;
                        return newIndices;
                      });
                    }}
                  />
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button 
                className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1 bg-white/80 rounded-full p-2 shadow-md z-10"
                onClick={() => prevSlide(0)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#203663]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button 
                className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1 bg-white/80 rounded-full p-2 shadow-md z-10"
                onClick={() => nextSlide(0)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#203663]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Second carousel group - Materials & Processing */}
            <div className="mb-16 relative">
              <h3 className="text-xl font-bold text-[#203663] mb-6">
                Materials & Processing
              </h3>
              
              <div className="overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentIndices[1] * 100}%` }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.5
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                    if (swipe) {
                      if (offset.x > 0) {
                        prevSlide(1);
                      } else {
                        nextSlide(1);
                      }
                    }
                  }}
                >
                  {industries.slice(5, 10).map((industry, index) => (
                    <div key={industry.id} className="w-full flex-shrink-0 px-2">
                      <CardComponent 
                        industry={industry} 
                        index={index + 5}
                        isActive={activeCardId === industry.id}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {industries.slice(5, 10).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndices[1] ? 'bg-[#203663]' : 'bg-gray-300'
                    }`}
                    onClick={() => {
                      setCurrentIndices(prev => {
                        const newIndices = [...prev];
                        newIndices[1] = index;
                        return newIndices;
                      });
                    }}
                  />
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button 
                className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1 bg-white/80 rounded-full p-2 shadow-md z-10"
                onClick={() => prevSlide(1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#203663]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button 
                className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1 bg-white/80 rounded-full p-2 shadow-md z-10"
                onClick={() => nextSlide(1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#203663]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Third carousel group - Specialized Industries */}
            <div className="mb-12 relative">
              <h3 className="text-xl font-bold text-[#203663] mb-6">
                Specialized Industries
              </h3>
              
              <div className="overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentIndices[2] * 100}%` }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.5
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                    if (swipe) {
                      if (offset.x > 0) {
                        prevSlide(2);
                      } else {
                        nextSlide(2);
                      }
                    }
                  }}
                >
                  {industries.slice(10, 15).map((industry, index) => (
                    <div key={industry.id} className="w-full flex-shrink-0 px-2">
                      <CardComponent 
                        industry={industry} 
                        index={index + 10}
                        isActive={activeCardId === industry.id}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {industries.slice(10, 15).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndices[2] ? 'bg-[#203663]' : 'bg-gray-300'
                    }`}
                    onClick={() => {
                      setCurrentIndices(prev => {
                        const newIndices = [...prev];
                        newIndices[2] = index;
                        return newIndices;
                      });
                    }}
                  />
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button 
                className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1 bg-white/80 rounded-full p-2 shadow-md z-10"
                onClick={() => prevSlide(2)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#203663]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button 
                className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1 bg-white/80 rounded-full p-2 shadow-md z-10"
                onClick={() => nextSlide(2)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#203663]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default IndustryCardsSection; 