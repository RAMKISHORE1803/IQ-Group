'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useAnimationFrame } from 'framer-motion';
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Sample content data - replace with your actual content
const carouselItems = [
  {
    id: 1,
    type: 'image',
    src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Business meeting',
    category: 'LEADERSHIP'
  },
  {
    id: 2,
    type: 'image',
    src: 'https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Woman looking at glass reflection',
    category: 'PEOPLE'
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.pexels.com/photos/3800117/pexels-photo-3800117.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Lanterns floating in the night sky',
    category: 'INTERNATIONAL DEVELOPMENT',
    date: 'MAY 19, 2025',
    title: 'The Future of International Cooperation in ...'
  },
  {
    id: 4,
    type: 'image',
    src: 'https://images.pexels.com/photos/3651579/pexels-photo-3651579.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Abstract colored lines',
    category: 'INNOVATION'
  },
  {
    id: 5,
    type: 'image',
    src: 'https://images.pexels.com/photos/2881224/pexels-photo-2881224.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Cybersecurity visual',
    category: 'TECHNOLOGY'
  }
];

// Create an extended array with duplicated items for infinite effect
const createExtendedItems = (items, duplicates = 3) => {
  let result = [];
  for (let i = 0; i < duplicates; i++) {
    result = [...result, ...items.map(item => ({...item, key: `${item.id}-${i}`}))];
  }
  return result;
};

export default function ContentCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [carouselX, setCarouselX] = useState(0);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(0.5); // pixels per frame
  
  // Extended items for infinite scrolling
  const extendedItems = createExtendedItems(carouselItems);
  
  // Update window width on client side
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get card width based on screen size
  const getCardWidth = () => {
    return windowWidth < 640 ? 220 : 280;
  };

  const cardWidth = getCardWidth();
  const cardMargin = 20;
  const cardTotalWidth = cardWidth + cardMargin * 2;
  const originalContentWidth = carouselItems.length * cardTotalWidth;
  
  // Autoplay animation using animationFrame for smooth continuous motion
  useAnimationFrame((time, delta) => {
    if (isPaused) return;
    
    // Calculate new position with continuous motion
    let newX = carouselX - autoPlaySpeed;
    
    // If moved past one item width, reset to create infinite loop effect
    if (Math.abs(newX) >= originalContentWidth) {
      newX = 0;
    }
    
    setCarouselX(newX);
  });
  
  // Toggle pause/play
  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  
  // Manual navigation
  const handlePrev = () => {
    setCarouselX(prev => prev + cardTotalWidth);
  };
  
  const handleNext = () => {
    setCarouselX(prev => prev - cardTotalWidth);
  };
  
  // Calculate scale based on position in the visible window
  const getScale = (index, offset) => {
    // Calculate relative position in the viewport
    const itemsPerView = windowWidth < 640 ? 3 : 5;
    const centerIndex = Math.floor(itemsPerView / 2);
    
    // Calculate virtual position based on the current offset
    const normalizedOffset = offset / cardTotalWidth;
    const virtualPosition = (index - normalizedOffset) % extendedItems.length;
    
    // Calculate the distance from the center position
    const distanceFromCenter = (virtualPosition % itemsPerView) - centerIndex;
    const absDistance = Math.abs(distanceFromCenter);
    
    // Apply scale based on position
    if (absDistance < 0.5) {
      // Center card
      return 1;
    } else if (absDistance >= 0.5 && absDistance < 1.5) {
      // Cards adjacent to center (2nd and 4th positions)
      return 0.7;
    } else {
      // Edge cards (1st and 5th positions)
      return 0.85;
    }
  };
  
  // Calculate card positions and scales
  const getCardStyle = (index) => {
    const normalizedX = carouselX / cardTotalWidth;
    const itemsPerView = windowWidth < 640 ? 3 : 5;
    const centerIndex = Math.floor(itemsPerView / 2);
    
    // Calculate base position
    const baseX = index * cardTotalWidth + carouselX;
    
    // Calculate visual position relative to center
    const visualPosition = ((index - normalizedX) % itemsPerView + itemsPerView) % itemsPerView;
    const distanceFromCenter = visualPosition - centerIndex;
    
    // Calculate scale based on visual position
    let scale;
    if (Math.abs(distanceFromCenter) < 0.5) {
      // Center card
      scale = 1;
    } else if (Math.abs(distanceFromCenter) < 1.5) {
      // Cards adjacent to center (2nd and 4th positions)
      scale = 0.7;
    } else {
      // Edge cards (1st and 5th positions)
      scale = 0.85;
    }
    
    // Calculate vertical position to create arc effect
    const baseY = Math.abs(distanceFromCenter) < 0.5 ? 0 : 
                  Math.abs(distanceFromCenter) < 1.5 ? 30 : 15;
    
    // Calculate z-index for proper layering
    const zIndex = 10 - Math.abs(distanceFromCenter) * 2;
    
    return {
      x: baseX,
      y: baseY,
      scale,
      zIndex
    };
  };

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Carousel Container */}
        <div 
          className="relative w-full max-w-7xl mx-auto my-8"
          ref={containerRef}
        >
          {/* Cards Container */}
          <div className="flex justify-center items-center h-[400px] sm:h-[450px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {extendedItems.map((item, index) => {
                const style = getCardStyle(index);
                const isCenter = Math.abs(style.x / cardTotalWidth % 5 - 2) < 0.5;
                
                // Card dimensions
                const width = isCenter ? 350 : 220;
                const height = isCenter ? 350 : style.scale > 0.8 ? 280 : 240;
                
                return (
                  <motion.div
                    key={item.key}
                    className="absolute rounded-md bg-white shadow-lg overflow-hidden"
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                      x: style.x,
                      y: style.y,
                      zIndex: style.zIndex,
                      scale: style.scale,
                    }}
                    transition={{
                      type: "tween",
                      ease: "linear",
                      duration: 0.1
                    }}
                  >
                    {/* Simple Card with Image and Text Overlay */}
                    <div className="relative w-full h-full">
                      {/* Image Background */}
                      <img 
                        src={item.src} 
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Top Category Banner */}
                      <div className="absolute top-0 left-0 right-0 bg-white p-3 border-b border-gray-200 z-10">
                        <p className="text-sm font-bold text-black">{item.category}</p>
                      </div>
                      
                      {/* Bottom Info (Only for center article) */}
                      {isCenter && item.date && (
                        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 z-10">
                          <p className="text-xs font-medium text-gray-800 mb-1">
                            <span className="mr-2">ARTICLE</span>
                            <span>{item.date}</span>
                          </p>
                          <h3 className="text-lg font-bold text-black leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Controls Container */}
          <div className="flex justify-center gap-2 mt-8">
            {/* Pause Button */}
            <button
              onClick={togglePause}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition-colors"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />}
            </button>
            
            {/* Previous Button */}
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            
            {/* Next Button */}
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition-colors"
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