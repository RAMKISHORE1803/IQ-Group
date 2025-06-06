'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample company data - replace with your actual data
const companies = [
  { id: 1, name: 'IQ Ferro Alloys', logo: '/icons/company-1.svg', color: '#5790E1' },
  { id: 2, name: 'IQ Green Energy', logo: '/icons/company-2.svg', color: '#1E3157' },
  { id: 3, name: 'IQ Mineral & Metals', logo: '/icons/company-3.svg', color: '#000000' },
  { id: 4, name: 'IQ Trading', logo: '/icons/company-4.svg', color: '#5790E1' },
  { id: 5, name: 'IQ Shipping', logo: '/icons/company-5.svg', color: '#1E3157' },
  { id: 6, name: 'IQ Logistics', logo: '/icons/company-6.svg', color: '#000000' },
  { id: 7, name: 'IQ Resources', logo: '/icons/company-7.svg', color: '#5790E1' },
];

export default function CompanyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Update window width on client side
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine cards to show based on screen size
  const getCardsToShow = () => {
    if (windowWidth < 640) return 1; // Mobile: show 1
    if (windowWidth < 1024) return 3; // Tablet: show 3
    return 5; // Desktop: show 5
  };

  const cardsToShow = getCardsToShow();

  // Handle next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % companies.length);
  };

  // Handle previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + companies.length) % companies.length);
  };

  // Set up auto-scrolling
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused]);

  // Get visible companies based on current index
  const getVisibleCompanies = () => {
    const halfShow = Math.floor(cardsToShow / 2);
    const startIdx = activeIndex - halfShow + companies.length;
    const visibleCompanies = [];

    for (let i = 0; i < cardsToShow; i++) {
      const idx = (startIdx + i) % companies.length;
      visibleCompanies.push({
        ...companies[idx],
        position: i - halfShow // e.g., -2, -1, 0, 1, 2 for 5 cards
      });
    }

    return visibleCompanies;
  };

  // Calculate horizontal spacing based on screen size
  const getHorizontalSpacing = () => {
    if (windowWidth < 640) return 0; // Mobile
    if (windowWidth < 1024) return 180; // Tablet
    return 220; // Desktop
  };

  const horizontalSpacing = getHorizontalSpacing();

  return (
    <section className="bg-[#fbfbfb] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4 font-onest">Our Companies</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-light font-onest">
            Explore our specialized divisions working together to deliver excellence in global logistics and material supply.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative w-full max-w-6xl mx-auto my-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={carouselRef}
        >
          {/* Cards Container */}
          <div className="flex justify-center items-center h-[320px] sm:h-[350px] relative">
            <AnimatePresence mode="wait">
              {getVisibleCompanies().map((company) => {
                // Calculate scale based on position
                const isCenter = company.position === 0;
                const scale = isCenter ? 1.1 : 0.9 - Math.abs(company.position) * 0.05;
                const zIndex = isCenter ? 10 : 5 - Math.abs(company.position);
                
                // Adjust opacity and scaling for mobile
                const mobileAdjustedScale = windowWidth < 640 ? (isCenter ? 1 : 0) : scale;
                const mobileAdjustedOpacity = windowWidth < 640 ? (isCenter ? 1 : 0) : (isCenter ? 1 : 0.8);
                
                return (
                  <motion.div
                    key={`${company.id}-${company.position}`}
                    className="absolute w-[280px] h-[280px] sm:h-[300px] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden cursor-pointer"
                    style={{ zIndex }}
                    initial={{ scale: mobileAdjustedScale, opacity: mobileAdjustedOpacity }}
                    animate={{ 
                      scale: mobileAdjustedScale,
                      opacity: mobileAdjustedOpacity,
                      x: `${company.position * horizontalSpacing}px`, // Responsive horizontal positioning
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      duration: 0.5 
                    }}
                    onClick={() => {
                      // Set the clicked card as active
                      setActiveIndex((activeIndex + company.position + companies.length) % companies.length);
                    }}
                  >
                    <div 
                      className="h-3 w-full" 
                      style={{ backgroundColor: company.color }}
                    />
                    <div className="flex-1 flex flex-col items-center justify-center p-6">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 flex items-center justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#f0f4f8] rounded-full flex items-center justify-center">
                          {/* Company logo/icon placeholder */}
                          <div className="text-2xl sm:text-3xl font-bold" style={{ color: company.color }}>
                            {company.name.charAt(0)}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#1E3157] mb-2 text-center font-onest">{company.name}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm text-center font-light font-onest">
                        Leading provider in specialized industrial solutions
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-center">
                      <button 
                        className="text-[#5790E1] font-medium text-sm hover:underline font-onest"
                      >
                        Learn More →
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 sm:ml-0 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-[#1E3157] hover:bg-[#5790E1] hover:text-white transition-colors z-20"
            aria-label="Previous company"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 sm:mr-0 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-[#1E3157] hover:bg-[#5790E1] hover:text-white transition-colors z-20"
            aria-label="Next company"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {companies.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-[#5790E1] w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 