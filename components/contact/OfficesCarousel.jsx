'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Office locations data with images
const offices = [
  {
    id: 1,
    city: "Mumbai",
    country: "India",
    address: "714 – Samartha Aishwarya, Off. New Link Road, Opp. Highland Park, Andheri-W, Mumbai – 400053",
    phone: "+91-9987998036",
    email: "info@iqgroup.in",
    isHeadquarters: true,
    image: "https://images.unsplash.com/photo-1552133457-ce1d2d33cdfb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    city: "Hong Kong",
    country: "China",
    address: "1611B, 16/F, HO KING COMMERCIAL CENTRE, 2-16 FA YUEN, STREET, MONGKOK, KOWLOON, HONGKONG",
    phone: "+91-9987998037",
    email: "hongkong@iqgroup.in",
    isHeadquarters: false,
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: 3,
    city: "Taiyuan",
    country: "China",
    address: "296, Beida Street, Xinghualing District 030009, Taiyuan, China",
    phone: "+91-2235112519",
    email: "china@iqgroup.in",
    isHeadquarters: false,
    image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    city: "Visakhapatnam",
    country: "India",
    address: "5th Floor, Door No. 9-14-1, Suite No. 504, Kotu Empire, VIP Road, Siripuram, Visakhapatnam, Andhra Pradesh - 530006",
    phone: "+91-2235112520",
    email: "vizag@iqgroup.in",
    isHeadquarters: false,
    image: "https://images.unsplash.com/photo-1677225165703-0db75739500a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHZpc2FraGFwYXRuYW18ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 5,
    city: "Chennai",
    country: "India",
    address: "NO.1/1A, UR NAGAR, ANNA NAGAR WEST EXTN, Chennai, Tamil Nadu, 600050",
    phone: "+91-9987998036",
    email: "chennai@iqgroup.in",
    isHeadquarters: false,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    city: "Kolkata",
    country: "India",
    address: "2nd floor, 89- Bonfield Lane, Kolkata - 700001",
    phone: "+91-9987998037",
    email: "kolkata@iqgroup.in",
    isHeadquarters: false,
    image: "https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG93cmFoJTIwYnJpZGdlfGVufDB8fDB8fHww"
  }
];

const OfficesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef(null);
  
  // Card width in pixels
  const cardWidth = 320;
  const cardGap = 8; // 4px on each side
  const totalCardWidth = cardWidth + cardGap;
  
  // Fixed number of visible slides
  const visibleSlidesCount = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, offices.length - visibleSlidesCount);

  // Check if mobile on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      if (currentIndex >= maxIndex) {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setTimeout(() => setIsTransitioning(true), 50);
      } else {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
      }
    }, 4000);
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, maxIndex]);

  const nextSlide = () => {
    if (currentIndex >= maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    setIsTransitioning(true);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(prev => prev - 1);
    }
    setIsTransitioning(true);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Touch/Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0);
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
    
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Card component for each office
  const CardComponent = ({ office }) => (
    <motion.div
      className="relative h-96 bg-cover bg-center bg-no-repeat overflow-hidden group cursor-pointer flex-shrink-0"
      style={{ 
        backgroundImage: `url(${office.image})`,
        width: isMobile ? '100%' : '300px'
      }}
      whileHover={{ scale: isMobile ? 1 : 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-20" />
      
      {/* Category Label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black bg-opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          {office.city}, {office.country}
        </span>
        {office.isHeadquarters && (
          <span className="ml-2 bg-[#324390] text-white text-xs font-medium px-2 py-1 rounded-full">
            HEADQUARTERS
          </span>
        )}
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
        whileHover={isMobile ? {} : { 
          top: "0px",
          bottom: "0px",
          left: "0px",
          right: "0px",
          height: "100%",
          borderRadius: "0px",
          zIndex: 50,
          opacity:1
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0, 0.2, 1],
          type: "tween"
        }}
      >
        {/* Default content - always visible */}
        <div className="relative z-10 p-4">
          <p className="text-xs text-gray-600 font-medium mb-1">
            {office.isHeadquarters ? 'HEADQUARTERS' : 'OFFICE'}
          </p>
          <h3 className="font-lato font-light text-[30px] line-clamp-2 group-hover:line-clamp-none text-ellipsis overflow-hidden text-black leading-tight transition-all duration-300">
            {office.city}, {office.country}
          </h3>
        </div>
        
        {/* Expanded content - only visible on hover for desktop */}
        <div
          className="px-4 pb-4 opacity-0 group-hover:opacity-100"
        >
          <p className="text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4">
            {office.address}<br/>
            <span className="block mt-2">Phone: {office.phone}</span>
            <span className="block">Email: {office.email}</span>
          </p>
          <a 
            href={`https://www.google.com/maps/search/${encodeURIComponent(office.address)}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[16px] font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            → View on Maps
          </a>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-7xl md:max-w-[1300px] mx-auto px-4 py-16 bg-[#ffffff]">
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-lato uppercase font-bold text-gray-800 mb-12">
        Our Global Offices
      </h2>
      
      {/* Desktop Carousel */}
      <div className="hidden md:block relative">
        <div className="overflow-hidden">
          <div 
            className={`flex transition-all ${isTransitioning ? 'duration-500' : 'duration-0'} ease-out`}
            style={{ 
              transform: `translateX(-${currentIndex * totalCardWidth}px)`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {offices.map((office) => (
              <div 
                key={office.id} 
                className="flex-shrink-0 px-1"
                style={{ width: `${cardWidth}px` }}
              >
                <CardComponent office={office} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative">
        <div 
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
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
                  prevSlide();
                } else {
                  nextSlide();
                }
              }
            }}
          >
            {offices.map((office) => (
              <div key={office.id} className="w-full flex-shrink-0 px-1">
                <CardComponent office={office} />
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {offices.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-green-500' : 'bg-gray-300'
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-end mt-8 space-x-4">
        <motion.button
          className="bg-white text-[#1E3157] border cursor-pointer border-gray-200 w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
        >
          <ChevronLeft size={20} />
        </motion.button>
        <motion.button
          className="bg-[#1E3157] text-white w-10 h-10 cursor-pointer rounded-full flex items-center justify-center shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default OfficesCarousel; 