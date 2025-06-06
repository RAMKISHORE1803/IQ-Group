'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import CompanyCard from './CompanyCard';

// Company data
const companies = [
  {
    id: 1,
    name: 'IQ Ferro Alloys',
    color: '#5790E1',
    description: 'Leading provider in specialized industrial solutions'
  },
  {
    id: 2,
    name: 'IQ Green Energy',
    color: '#1E3157',
    description: 'Renewable energy and sustainable solutions'
  },
  {
    id: 3,
    name: 'IQ Mineral & Metals',
    color: '#000000',
    description: 'Premium quality minerals and metal products'
  },
  {
    id: 4,
    name: 'IQ Trading',
    color: '#5790E1',
    description: 'Global trading and supply chain solutions'
  },
  {
    id: 5,
    name: 'IQ Shipping',
    color: '#1E3157',
    description: 'International shipping and logistics services'
  },
  {
    id: 6,
    name: 'IQ Logistics',
    color: '#000000',
    description: 'End-to-end logistics and distribution'
  },
  {
    id: 7,
    name: 'IQ Resources',
    color: '#5790E1',
    description: 'Resource management and raw materials'
  },
];

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
    setActiveIndex((prevIndex) => (prevIndex + 1) % companies.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + companies.length) % companies.length);
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
      const index = (activeIndex + i + companies.length) % companies.length;
      cards.push({
        ...companies[index],
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

  const visibleCards = getVisibleCards();

  return (
    <section className="bg-[#fbfbfb] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4 font-onest">Our Companies</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-light font-onest">
            Explore our specialized divisions working together to deliver excellence in global logistics and material supply.
          </p>
        </div>

        <div 
          className="relative max-w-6xl mx-auto my-8  md:overflow-visible"
          ref={carouselRef}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
        >
          {/* Cards */}
          <div className="flex justify-center items-center h-[350px] relative touch-none">
            {visibleCards.map((company) => {
              // Calculate scale based on position
              const isCenter = company.position === 0;
              const scale = isCenter ? 1 : company.position === -1 || company.position === 1 ? 0.7 : 0.85;
              
              // Vertical position to create arc effect
              const yOffset = isCenter ? 0 : company.position === -1 || company.position === 1 ? 30 : 15;
              
              // Horizontal position
              const xOffset = company.position * (
                windowWidth < 640 
                  ? 100 // Show partial cards on mobile by reducing offset distance
                  : windowWidth < 1024 ? 250 : 300
              );
              
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
                      setActiveIndex((activeIndex - company.position) % companies.length);
                    } else if (company.position > 0) {
                      setActiveIndex((activeIndex + company.position) % companies.length);
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
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-20"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />}
            </button>
            
            {/* Previous Button */}
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            
            {/* Next Button */}
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-20"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 