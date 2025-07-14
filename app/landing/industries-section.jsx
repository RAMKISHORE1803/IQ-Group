"use-client"
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IndustriesSection = () => {
    const sectors = [
        {"id": 1, "name": "Aerospace", "image": "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800"},
        {"id": 2, "name": "Steel", "image": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800"},
        {"id": 3, "name": "Automobile", "image": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"},
        {"id": 4, "name": "Battery", "image": "https://news.mst.edu/files/2025/05/batteries-1260x473.jpeg"},
        {"id": 5, "name": "Ceramic", "image": "https://assets.lummi.ai/assets/QmXVv9yqRL9wsVqUgBDYZF6voys4NLczx2De7xE3FSsKUm?auto=format&w=1500"},
        {"id": 6, "name": "Chemical", "image": "https://assets.lummi.ai/assets/QmRWrf7RRguRREw1py5ASex7cAGxv3rVYQL6Tw9LFAGRCq?auto=format&w=1500"},
        {"id": 7, "name": "Foundries", "image": "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800"},
        {"id": 8, "name": "Glass", "image": "https://assets.lummi.ai/assets/QmdjvE5DEVkpGMDUNBQtTgMXXXNBnrxgeBk5Q6RTka9GHM?auto=format&w=1500"},
        {"id": 9, "name": "Paint", "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800"},
        {"id": 10, "name": "Refractory", "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800"},
        {"id": 11, "name": "Stainless Steel", "image": "https://www.shyammetalics.com/wp-content/uploads/2024/07/blog_img_1_07.jpg"},
        {"id": 12, "name": "Aluminum", "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"},
        {"id": 13, "name": "Textile", "image": "https://assets.lummi.ai/assets/QmNpyxgXoXt78SXLsfBTdqADVQzN7DBv9WFqu5bfkaRDGF?auto=format&w=1500"},
        {"id": 14, "name": "Tyre", "image": "https://assets.lummi.ai/assets/QmeNHGPHEyi8Sjx25eaEwUE9JU3Ko2fZ3EWCpDfz6qd54E?auto=format&w=1500"},
        {"id": 15, "name": "Paper", "image": "https://assets.lummi.ai/assets/QmUevsnAtUyS9mRE61tsC55xddmrsaqVSc7tdF81i6mFJH?auto=format&w=1500"}
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  
  const totalSectors = sectors.length;
  const visibleSlidesCount = 4; // Number of visible slides in desktop
  const maxIndex = totalSectors - visibleSlidesCount;

  // Function to handle automatic sliding
  const autoPlay = () => {
    if (currentIndex >= maxIndex) {
      // When we reach the end, quickly reset to beginning without animation
      setIsTransitioning(false);
      setCurrentIndex(0);
      // Re-enable transition after a brief delay
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    } else {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Set up auto-play
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      return;
    }

    setIsTransitioning(true);
    autoPlayRef.current = setInterval(autoPlay, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  const nextSlide = () => {
    if (currentIndex >= maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    setIsTransitioning(true);
  };

  const prevSlide = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(prev => prev - 1);
    }
    setIsTransitioning(true);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Touch/Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setIsAutoPlaying(true);
  };

  // Create a duplicate array of sectors for infinite scrolling
  const extendedSectors = [...sectors, ...sectors];

  return (
    <div className=" text-black bg-[#fbfbfb] min-h-[85vh] py-12 px-4 md:mb-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-[64px]  lg:mb-[80px]">
          <div className="md:flex md:justify-between md:items-start">
            <h2 className="text-[20px] md:text-5xl lg:text-[42px] text-center font-light mb-4 md:mb-0 font-lato font-bold text-[#1E3157]">INDUSTRIES WE SERVE</h2>
            <div className="md:max-w-lg md:ml-8">
              <p className="text-gray-700 text-[18px] md:text-[20px] xl:text-[22px] lg:min-w-[550px] text-center md:text-left font-onest lg:leading-[28px] font-light ">
              Discover the industries we empower delivering precision, consistency, and global-scale material excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block relative lg:mb-[40px]">
          <div 
            className="flex gap-6 overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className={`flex transition-all ${isTransitioning ? 'duration-500' : 'duration-0'} ease-out`}
              style={{ 
                transform: `translateX(-${currentIndex * 25}%)`,
                gap: '24px'
              }}
            >
              {extendedSectors.map((sector, index) => (
                <div 
                  key={`${sector.id}-${Math.floor(index / sectors.length)}`} 
                  className="flex-shrink-0 group cursor-pointer" 
                  style={{ width: 'calc(15% - 20px)' }}
                  onClick={() => window.location.href = `/industries/${sector.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img 
                      src={sector.image} 
                      alt={sector.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative overflow-hidden">
                    <h3 className="text-xl font-onest font-light transform transition-transform duration-300 group-hover:-translate-y-full">{sector.name}</h3>
                    <span className="text-xl font-onest font-light text-[#010A4E] absolute top-0 left-0 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#010A4E] after:transition-all after:duration-300 group-hover:after:w-full">Learn More</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="absolute right-0 bottom-0 md:bottom-[-80px] flex gap-3 mb-4 mr-4">
            <button 
              onClick={prevSlide}
              className="p-3 text-[#1E3157] rounded-full cursor-pointer bg-white shadow-md hover:text-black transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft  size={32} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 text-[#1E3157] cursor-pointer  rounded-full bg-white shadow-md hover:text-black transition-colors"
              aria-label="Next"
            >
              <ChevronRight  size={32} />
            </button>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden relative">
          <div 
            className="overflow-hidden px-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-500' : 'transition-none'} ease-out`}
              style={{ 
                transform: `translateX(-${currentIndex * 280}px)`,
                gap: '16px'
              }}
            >
              {/* Use extended sectors array for true infinite scroll */}
              {extendedSectors.map((sector, index) => (
                <div 
                  key={`${sector.id}-${Math.floor(index / sectors.length)}`}
                  className="flex-shrink-0"
                  style={{ width: '280px' }}
                  onClick={() => window.location.href = `/industries/${sector.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="aspect-[4/3] overflow-hidden mb-6">
                    <img 
                      src={sector.image} 
                      alt={sector.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden">
                    <h3 className="text-xl font-onest font-light transform transition-transform duration-300 group-hover:-translate-y-full">{sector.name}</h3>
                    <span className="text-xl font-onest font-light text-[#010A4E] absolute top-0 left-0 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#010A4E] after:transition-all after:duration-300 group-hover:after:w-full">View More</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide}
              className="p-2 text-gray-400 cursor-pointer hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 text-gray-400 cursor-pointer hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Mobile Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {sectors.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsTransitioning(true);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === (currentIndex % sectors.length) ? 'bg-[#010A4E]' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustriesSection;