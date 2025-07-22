'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { allCompanies } from './CompanyData';

// Company Card Component
function CompanyCard({ company, isCenter, position, scale, xOffset, yOffset, onClick }) {
  // State for mobile detection and hover
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Detect mobile screen on client side
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 640);
      }
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Only allow hover effects on the center card
  const canShowHoverEffects = isCenter;
  
  return (
    <div
      className="absolute cursor-pointer transition-all duration-500 ease-out"
      style={{
        transform: `translateX(${xOffset}px) translateY(${yOffset}px) scale(${isHovered && canShowHoverEffects ? scale * 1.02 : scale})`,
        width: isMobile 
          ? (isCenter ? '221px' : '150px')
          : (isCenter ? '338px' : '310px'),
        height: isMobile 
          ? (isCenter ? '350px' : '240px')
          : (isCenter ? '450px' : '400px'),
        zIndex: isHovered ? 20 : isCenter ? 10 : 5 - Math.abs(position),
        opacity: Math.abs(position) <= 2 ? 1 : 0.7,
      }}
      onClick={onClick}
      onMouseEnter={() => canShowHoverEffects && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card Container - Insight Style */}
      <motion.div 
        className="relative w-full h-full bg-cover bg-center bg-no-repeat overflow-hidden group"
        whileHover={canShowHoverEffects ? { scale: 1.02 } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${company.image})` }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-20" />
        
        {/* Category Label */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-black bg-opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            {company.category.toUpperCase()}
          </span>
        </div>
        
        {/* Floating Glassy overlay - small at bottom, full card on hover */}
        <motion.div
          className="absolute bg-white/70 bg-opacity-40 backdrop-blur-md rounded-lg overflow-hidden"
          initial={{ 
            bottom: "16px",
            left: "16px",
            right: "16px",
            top: "auto",
            height: "120px"
          }}
          whileHover={canShowHoverEffects ? { 
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
              COMPANY
            </p>
            <h3 className={`font-lato font-light text-[30px] ${canShowHoverEffects ? "group-hover:line-clamp-none" : ""} line-clamp-2 text-ellipsis overflow-hidden text-black leading-tight transition-all duration-300`}>
              {company.name}
            </h3>
          </div>
          
          {/* Expanded content - only visible on hover for center card */}
          {canShowHoverEffects && (
            <motion.div
              className="px-4 pb-4 opacity-0 group-hover:opacity-100"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <p className="text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4">
                {company.description}
              </p>
              
              <div className="space-y-2 mb-4">
                {company.commodities.slice(0, 4).map((product, index) => (
                  <div key={index} className="text-gray-700 text-sm flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                    {product}
                  </div>
                ))}
              </div>
              
              <button className="inline-flex cursor-pointer items-center text-[16px] font-medium text-green-600 hover:text-green-700 transition-colors">
                → Learn More
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function CompanyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const dragStartRef = useRef(0);

  // Update window width on client side
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Number of cards to show
  const getCardsToShow = () => {
    if (windowWidth < 640) return 3; // Mobile - show 3 cards (1 full + 2 partial)
    if (windowWidth < 1024) return 3; // Tablet
    return 5; // Desktop
  };

  const cardsToShow = getCardsToShow();
  const halfVisibleCards = Math.floor(cardsToShow / 2);

  // Navigation functions
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % allCompanies.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + allCompanies.length) % allCompanies.length);
  };
  
  // Toggle pause/play
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Auto-scroll
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused]);

  // Get visible cards
  const getVisibleCards = () => {
    let cards = [];
    for (let i = -halfVisibleCards; i <= halfVisibleCards; i++) {
      const index = (activeIndex + i + allCompanies.length) % allCompanies.length;
      cards.push({
        ...allCompanies[index],
        position: i
      });
    }
    return cards;
  };

  // Handle swipe on mobile
  const handleDragStart = (event) => {
    dragStartRef.current = event.clientX || event.touches?.[0]?.clientX || 0;
  };

  const handleDragEnd = (event) => {
    const dragEnd = event.clientX || event.changedTouches?.[0]?.clientX || 0;
    const diff = dragStartRef.current - dragEnd;
    
    // Threshold for swipe detection (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next
        nextSlide();
      } else {
        // Swipe right, go to previous
        prevSlide();
      }
    }
  };

  // Calculate horizontal spacing based on screen size
  const getHorizontalSpacing = (position) => {
    // Default fallback for server-side rendering
    if (typeof window === 'undefined' || windowWidth === 0) {
      // Return reasonable defaults based on position
      if (position === 0) return 0;
      if (position === -1 || position === 1) return position * 300;
      if (position === -2 || position === 2) return position * 280;
      return position * 250;
    }

    if (windowWidth < 640) {
      // Mobile spacing
      return position * 120;
    } else if (windowWidth < 1024) {
      // Tablet spacing
      return position * 280;
    } else {
      // Desktop spacing - increased gap between cards
      if (position === -1 || position === 1) {
        // Increase spacing for adjacent cards
        // You can adjust this value (380) to change the distance between center and adjacent cards
        return windowWidth < 1280 ? position * 266 : position * 310; // Try increasing this to 420 or 450 for more spacing
      } else if (position === -2 || position === 2) {
        // Spacing for outer cards
        // You can adjust this value (320) to change the distance between adjacent and outer cards
        return windowWidth < 1280 ? position * 250 : position * 298;
      } else {
        // Center card (position === 0)
        return 0;
      }
    }
  };

  const visibleCards = getVisibleCards();
  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2 // 0.2s delay between each child animation
      }
    }
  };

  return (
    <section className="bg-[#fbfbfb] min-h-[320px] overflow-hidden sm:overflow-hidden md:min-h-[100vh] pt-16 md:overflow-hidden md:pt-24 md:pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="company-title text-[28px] md:text-[18px] text-[#324390] font-bold mb-4 text-lato font-lato font-bold">EXPLORE OUR COMPANIES</h2>
          <p className="company-description text-[20px] text-gray-900 max-w-[1000px] mx-auto md:text-[32px] font-light font-onest">
            Explore our specialized divisions working together to deliver excellence in global logistics and material supply.
          </p>
          
        </div>

        <div 
          className="relative max-w-7xl mx-auto my-8 md:overflow-visible"
          ref={carouselRef}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
        >
          {/* Cards */}
          <div className="flex justify-center items-center h-[340px] md:h-[600px] relative touch-none">
            {visibleCards.map((company) => {
              // Calculate scale based on position
              const isCenter = company.position === 0;
              const scale = isCenter 
                ? (typeof window !== 'undefined' && window.innerWidth < 1280) ? 0.88 : 1 
                : company.position === -1 || company.position === 1 
                  ? (typeof window !== 'undefined' && window.innerWidth < 1280) ? 0.65 : 0.81 
                  : company.position === -2 || company.position === 2 
                    ? (typeof window !== 'undefined' && window.innerWidth < 1280) ? 0.75 : 0.9 
                    : 0.85;
              
              // Vertical position to create arc effect - adjusted for larger cards
              const yOffset = isCenter ? 0 : company.position === -1 || company.position === 1 ? 0 : 0;
              
              // Horizontal position - using the function for increased spacing
              const xOffset = getHorizontalSpacing(company.position);
              
              return (
                <CompanyCard
                  key={company.id}
                  company={company}
                  isCenter={isCenter}
                  position={company.position}
                  scale={scale}
                  xOffset={xOffset}
                  yOffset={yOffset}
                  onClick={() => {
                    if (company.position < 0) {
                      setActiveIndex((activeIndex - company.position) % allCompanies.length);
                    } else if (company.position > 0) {
                      setActiveIndex((activeIndex + company.position) % allCompanies.length);
                    }
                  }}
                />
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            {/* Pause/Play Button */}
            <button
              onClick={togglePause}
              className="w-12 h-12 cursor-pointer rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-20"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
            </button>
            
            {/* Previous Button */}
            <button 
              onClick={prevSlide}
              className="w-12 h-12 cursor-pointer rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Next Button */}
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full cursor-pointer bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-20"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}