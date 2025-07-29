'use client';

import { useState, useEffect, useRef } from 'react';
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { allCompanies } from './CompanyData';
import { motion } from 'framer-motion';

// Company Card Component
function CompanyCard({ company, isCenter, position, scale, xOffset, yOffset, onClick, onHoverStart, onHoverEnd }) {
  // State for mobile detection and hover
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef(null);
  
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

  // Handle video playback when card is in center
  useEffect(() => {
    if (videoRef.current) {
      if (isCenter) {
        // Only load the video when the card is in center
        if (!videoRef.current.src || videoRef.current.src === '') {
          videoRef.current.src = getVideoSource(company.category);
        }
        videoRef.current.play().catch(err => console.log('Video play failed:', err));
      } else {
        videoRef.current.pause();
        // Optionally unload the video when not in center to save memory
        if (Math.abs(position) > 1) {
          videoRef.current.removeAttribute('src');
          videoRef.current.load();
        }
      }
    }
  }, [isCenter, position, company.category]);

  // Only allow hover effects on the center card
  const canShowHoverEffects = isCenter;
  
  // Get appropriate video based on company category
  const getVideoSource = (category) => {
    if (!category) return '/iqwebsitevideos/Ferro Alloy Video.mp4'; // Default if category is undefined
    
    const categoryMap = {
      'Ferro Alloys': '/iqwebsitevideos/Ferro Alloy Video.mp4',
      'Metals': '/iqwebsitevideos/Metals Video.mp4',
      'Minerals': '/iqwebsitevideos/Minerals Video.mp4',
      'Chemicals': '/iqwebsitevideos/Chemical & Metal.mp4',
      'Coal': '/iqwebsitevideos/Coal Video.mp4',
      'Acid': '/iqwebsitevideos/Acid Video.mp4',
      'Investments': '/iqwebsitevideos/Ferro Alloy Video.mp4' // Default for Investments
    };
    
    return categoryMap[category] || '/iqwebsitevideos/Ferro Alloy Video.mp4'; // Default video
  };
  
  // Handle video errors
  const handleVideoError = (e) => {
    console.error('Video failed to load:', e);
    // If video fails to load, set a fallback background color
    if (e.target) {
      e.target.style.backgroundColor = '#000';
    }
  };
  
  return (
    <div
      className="absolute cursor-pointer transition-all duration-700 ease-out"
      style={{
        transform: `translateX(${xOffset}px) translateY(${yOffset}px) scale(${scale})`,
        width: isMobile 
          ? (isCenter ? '221px' : '150px')
          : (isCenter ? '338px' : '310px'),
        height: isMobile 
          ? (isCenter ? '350px' : '240px')
          : (isCenter ? '450px' : '400px'),
        zIndex: isExpanded ? 20 : isCenter ? 10 : 5 - Math.abs(position),
        opacity: Math.abs(position) <= 2 ? 1 : 0.7,
        willChange: 'transform, opacity',
      }}
      onClick={() => {
        if (isCenter) {
          setIsExpanded(!isExpanded);
        } else {
          onClick();
        }
      }}
      onMouseEnter={() => !isMobile && onHoverStart()}
      onMouseLeave={() => !isMobile && onHoverEnd()}
    >
      {/* Main Card Container - Insight Style */}
      <div 
        className="relative w-full h-full bg-cover bg-center bg-no-repeat overflow-hidden group"
      >
        {/* Video Background */}
        <div className="absolute inset-0 bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay={isCenter}
            preload="metadata"
            onError={handleVideoError}
            poster={company.image} // Use the image as a fallback poster
            style={{
              opacity: isCenter ? 1 : 0.8,
              transition: 'opacity 0.5s ease'
            }}
          />
          {/* Fallback for browsers that don't support video */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-[-1]" 
            style={{ backgroundImage: `url(${company.image})` }}
          />
        </div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-20" />
        
        {/* Category Label */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-black bg-opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            {company.category ? company.category.toUpperCase() : 'COMPANY'}
          </span>
        </div>
        
        {/* Floating Glassy overlay with Framer Motion */}
        <motion.div
          onClick={(e) => {
            if (isCenter) {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }
          }}
          className="absolute bg-white/70 bg-opacity-40 backdrop-blur-md rounded-lg overflow-hidden"
          initial={{ 
            bottom: "16px",
            left: "16px",
            right: "16px",
            top: "auto",
            height: "120px"
          }}
          animate={isExpanded ? { 
            top: "0px",
            bottom: "0px",
            left: "0px",
            right: "0px",
            height: "100%",
            borderRadius: "0px",
            zIndex: 50,
            opacity: 1
          } : {}}
          whileHover={!isMobile && canShowHoverEffects ? { 
            top: "0px",
            bottom: "0px",
            left: "0px",
            right: "0px",
            height: "100%",
            borderRadius: "0px",
            zIndex: 50,
            opacity: 1
          } : {}}
          whileTap={isMobile && canShowHoverEffects ? { 
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
            <h3 className="font-lato font-light text-[30px] line-clamp-2 group-hover:line-clamp-none text-ellipsis overflow-hidden text-black leading-tight">
              {company.name}
            </h3>
          </div>
          
          {/* Expanded content */}
          <motion.div
            className="px-4 pb-4 w-full h-full"
            initial={{ opacity: 0, y: 20 }}
            whileHover={!isMobile && canShowHoverEffects ? { opacity: 1, y: 0 } : {}}
            animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className="text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4">
              {company.description}
            </p>
            
            <div className="space-y-2 mb-4">
              {company.commodities && company.commodities.slice(0, 4).map((product, index) => (
                <div key={index} className="text-gray-700 text-sm flex items-center">
                  <div className="w-2 h-2 bg-[#324390] rounded-full mr-3 flex-shrink-0"></div>
                  {product}
                </div>
              ))}
            </div>
            
            <button className="inline-flex cursor-pointer items-center text-[16px] font-medium text-[#324390] hover:translate-x-1 transition-all duration-300">
              → Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CompanyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
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

  // Handle card hover events
  const handleCardHoverStart = () => {
    setIsCardHovered(true);
  };

  const handleCardHoverEnd = () => {
    setIsCardHovered(false);
  };

  // Auto-scroll
  useEffect(() => {
    if (isPaused || isCardHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, isCardHovered]);

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
 

  return (
    <section className="bg-[#fbfbfb] min-h-[320px] overflow-hidden sm:overflow-hidden md:min-h-[100vh] pt-[15px]  md:overflow-hidden md:pt-24 lg:pt-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false , amount:0.4 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="company-title text-[28px] md:text-[18px] text-[#324390] font-bold mb-4 text-lato font-lato font-bold">EXPLORE OUR COMPANIES</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false , amount:0.4 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="company-description text-[20px] text-gray-900 max-w-[1000px] mx-auto md:text-[32px] font-light font-onest">
            Explore our specialized divisions working together to deliver excellence in global logistics and material supply.
          </motion.p>
          
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
          <div className="flex justify-center items-center h-[340px] md:h-[480px] relative touch-none transition-all duration-700">
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
                      // For leftmost cards, use prevSlide multiple times to ensure smooth transition
                      const steps = Math.abs(company.position);
                      for (let i = 0; i < steps; i++) {
                        setTimeout(() => {
                          prevSlide();
                        }, i * 100); // Small delay between each step
                      }
                    } else if (company.position > 0) {
                      // For rightmost cards, use nextSlide multiple times to ensure smooth transition
                      const steps = Math.abs(company.position);
                      for (let i = 0; i < steps; i++) {
                        setTimeout(() => {
                          nextSlide();
                        }, i * 100); // Small delay between each step
                      }
                    }
                  }}
                  onHoverStart={handleCardHoverStart}
                  onHoverEnd={handleCardHoverEnd}
                />
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-4 md:mt-0">
            {/* Pause/Play Button */}
            <button
              onClick={togglePause}
              className="w-12 h-12 cursor-pointer rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-20"
              aria-label={isPaused || isCardHovered ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused || isCardHovered ? <Play size={20} /> : <Pause size={20} />}
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