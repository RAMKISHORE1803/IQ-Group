'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine if this card should show hover effects
  // On desktop, all cards can have hover effects; on mobile, only center card
  const canShowHoverEffects = !isMobile || isCenter;
  const showHoverContent = isHovered && canShowHoverEffects;
  
  return (
    <div
      className="absolute cursor-pointer transition-all duration-500 ease-out"
      style={{
        transform: `translateX(${xOffset}px) translateY(${yOffset}px) scale(${isHovered && canShowHoverEffects ? scale * 1.02 : scale})`,
        width: isMobile 
          ? (isCenter ? '320px' : '280px')
          : (isCenter ? '380px' : '340px'),
        height: isMobile 
          ? (isCenter ? '506px' : '480px')
          : (isCenter ? '506px' : '440px'),
        zIndex: isHovered ? 20 : isCenter ? 10 : 5 - Math.abs(position),
        opacity: Math.abs(position) <= 2 ? 1 : 0.7,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card Container */}
      <div className="relative w-full h-full overflow-hidden shadow-2xl">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 transition-all duration-700">
          {/* Show gradient background when hovered and hover effects are allowed */}
          {showHoverContent ? (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"></div>
          ) : (
            <div className="absolute inset-0">
              <img 
                src={company.image} 
                alt={`${company.name} Background`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* Animated Light Streaks */}
              {/* <div className="absolute inset-0 overflow-hidden">
                
                <div className="absolute -top-10 -left-10 w-full h-full">
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-white/40 to-transparent transform rotate-12 translate-x-20"></div>
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-yellow-300/30 to-transparent transform rotate-12 translate-x-32"></div>
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-pink-300/30 to-transparent transform rotate-12 translate-x-44"></div>
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-blue-300/40 to-transparent transform rotate-12 translate-x-56"></div>
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-green-300/30 to-transparent transform rotate-12 translate-x-68"></div>
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-purple-300/30 to-transparent transform rotate-12 translate-x-80"></div>
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-teal-300/40 to-transparent transform rotate-12 translate-x-92"></div>
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-orange-300/30 to-transparent transform rotate-12 translate-x-104"></div>
                </div>
                
                
                <div className="absolute -top-10 -right-10 w-full h-full">
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent transform -rotate-12 -translate-x-20"></div>
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent transform -rotate-12 -translate-x-32"></div>
                  <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-rose-300/30 to-transparent transform -rotate-12 -translate-x-44"></div>
                </div>
              </div> */}
            </div>
          )}
        </div>
        
        {/* Top Label - Company Name */}
        <div className="absolute top-6 left-6 z-10">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <span className="text-white text-xs font-medium tracking-wider">
              {company.name.toUpperCase()}
            </span>
          </div>
        </div>
        
        {/* Bottom Glassy Content Area */}
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
          showHoverContent ? 'h-5/6' : 'h-2/5'
        }`}>
          <div className="h-full bg-white/90 backdrop-blur-md border-t border-white/20 p-6 flex flex-col">
            
            {/* Article/Company Label */}
            {/* <div className="mb-4">
              <span className="text-gray-500 text-xs font-medium tracking-wider">
                {showHoverContent ? 'COMPANY' : company.category.toUpperCase()} • MAY 16, 2025
              </span>
            </div> */}
            
            {/* Main Content */}
            <div className="flex-1">
              {!showHoverContent ? (
                // Default State - Products
                <>
                  <h3 className="text-gray-900 text-xl font-semibold mb-4 leading-tight">
                    {company.name}
                  </h3>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    <p className="mb-4">
                      {company.description.substring(0, 80)}...
                    </p>
                    <div className="space-y-2">
                      {company.commodities.slice(0, 4).map((product, index) => (
                        <div key={index} className="text-gray-500 text-sm flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                          {product}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // Hover State - Company Description
                <>
                  <h2 className="text-gray-900 text-2xl font-bold mb-6 leading-tight">
                    {company.name}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed mb-8">
                    {company.description}
                  </p>
                  
                  {/* Learn More Button */}
                  <button 
                    className="inline-flex items-center px-8 py-4 bg-[#5790E1] text-white text-sm font-semibold  hover:bg-[#4a7bc8] transition-all duration-200 shadow-lg hover:shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle learn more click
                    }}
                  >
                    LEARN MORE
                    <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
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
        return position * 336; // Try increasing this to 420 or 450 for more spacing
      } else if (position === -2 || position === 2) {
        // Spacing for outer cards
        // You can adjust this value (320) to change the distance between adjacent and outer cards
        return position * 315;
      } else {
        // Center card (position === 0)
        return 0;
      }
    }
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="bg-[#fbfbfb] min-h-[100vh] pt-16 md:pt-24 md:pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[28px] md:text-[18px] font-bold text-[#000000] mb-4 text-lato font-lato font-bold">EXPLORE OUR COMPANIES</h2>
          <p className="text-[20px] text-gray-700 max-w-[1000px] mx-auto md:text-[32px] font-light font-onest">
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
          <div className="flex justify-center items-center h-[600px] relative touch-none">
            {visibleCards.map((company) => {
              // Calculate scale based on position
              const isCenter = company.position === 0;
              const scale = isCenter ? 1 : company.position === -1 || company.position === 1 ? 0.75 : 0.85;
              
              // Vertical position to create arc effect - adjusted for larger cards
              const yOffset = isCenter ? 0 : company.position === -1 || company.position === 1 ? 40 : 20;
              
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
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-20"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
            </button>
            
            {/* Previous Button */}
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Next Button */}
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-20"
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