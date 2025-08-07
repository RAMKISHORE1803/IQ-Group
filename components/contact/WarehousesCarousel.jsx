'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Warehouse locations data
const warehouses = [
    {
        id: 1,
        city: "Kolkata",
        country: "India",
        address: "Plot No. 17, Kolkata Port Trust, Kolkata, West Bengal - 700001",
        phone: "+91-9987998038",
        email: "warehouse.kolkata@iqgroup.in",
        isPrimary: false,
        capacity: "30,000 sq. ft.",
        specialization: "Minerals & Metals, Ferro Alloys",
        image: "https://images.pexels.com/photos/5058832/pexels-photo-5058832.png"
      },
  
  {
    id: 2,
    city: "Bhubaneshwar",
    country: "India",
    address: "PLOT-385/2522/3931 TBS TOWER, PATIA ROAD, Patia, Bhubaneshwar - 751024",
    phone: "",
    email: "info@iqgroup.in",
    isPrimary: false,
    capacity: "50,000 sq. ft.",
    specialization: "General Storage",
    image: "https://plus.unsplash.com/premium_photo-1691030922124-c6a81c377234?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    city: "Visakhapatnam",
    country: "India",
    address: "Plot No. 42, VSEZ, Duvvada, Visakhapatnam, Andhra Pradesh - 530046",
    phone: "+91-2235112520",
    email: "warehouse.vizag@iqgroup.in",
    isPrimary: false,
    capacity: "35,000 sq. ft.",
    specialization: "Ferro Alloys, Minerals",
    image: "https://images.unsplash.com/photo-1609854534028-b512f5246abc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dml6YWd8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 4,
    city: "Chennai",
    country: "India",
    address: "Plot No. 23, Chennai Port Trust, Chennai, Tamil Nadu - 600001",
    phone: "+91-9987998037",
    email: "warehouse.chennai@iqgroup.in",
    isPrimary: false,
    capacity: "25,000 sq. ft.",
    specialization: "Coke & Coal, Noble Alloys",
    image: "https://images.unsplash.com/photo-1661366698983-3cb843219300?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlbm5haXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 5,
    city: "Bhiwandi",
    country: "India",
    address: "SURVEY NO. 177, DHANLAXMI COMPOUND, INSIDE DALMILL COMPOUND,OPP. J.K PETRO PUMP, PURANA VILLAGE, THANE BHIWANDI ROAD, DIST. THANE - 421302",
    phone: "",
    email: "info@iqgroup.in",
    isPrimary: false,
    capacity: "50,000 sq. ft.",
    specialization: "General Storage",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1yQ2VWUSY-Lm91mdpAm0t2n5cLCDZF-45dw&s"
  }
  
];

const WarehousesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if mobile on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const maxIndex = isMobile ? warehouses.length - 1 : warehouses.length - 3;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isMobile]);

  const nextSlide = () => {
    const maxIndex = isMobile ? warehouses.length - 1 : warehouses.length - 3;
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    const maxIndex = isMobile ? warehouses.length - 1 : warehouses.length - 3;
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

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

  // Card component for each warehouse
  const CardComponent = ({ warehouse }) => (
    <div
      className="relative h-96 bg-cover bg-center bg-no-repeat overflow-hidden group cursor-pointer flex-shrink-0 w-full md:w-80"
      style={{ 
        backgroundImage: `url(${warehouse.image})`
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-20" />
      
      {/* Category Label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black bg-opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          {warehouse.city}, {warehouse.country}
        </span>
        <span className="ml-2 bg-orange-600 text-white text-xs font-medium px-2 py-1 rounded-full">
          WAREHOUSE
        </span>
      </div>
      
      {/* Floating Glassy overlay - small at bottom, full card on hover */}
      <motion.div
        onClick={() => {
          setIsExpanded(!isExpanded);
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
        whileHover={isMobile ? {} : { 
          top: "0px",
          bottom: "0px",
          left: "0px",
          right: "0px",
          height: "100%",
          borderRadius: "0px",
          zIndex: 50,
          opacity: 1
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
            WAREHOUSE
          </p>
          <h3 className="font-lato font-light text-[30px] line-clamp-2 group-hover:line-clamp-none text-ellipsis overflow-hidden text-black leading-tight transition-all duration-300">
            {warehouse.city}, {warehouse.country}
          </h3>
        </div>
        
        {/* Expanded content - only visible on hover for desktop */}
        <div className="px-4 pb-4 opacity-0 w-full h-full group-hover:opacity-100">
          <p className="text-gray-800 text-[16px] w-full h-full font-onest font-light leading-relaxed mb-4">
            {warehouse.address}<br/>
            {/* {warehouse.phone && <span className="block mt-2">Phone: {warehouse.phone}</span>} */}
            <span className="block">Email: {warehouse.email}</span>
            {/* <span className="block mt-2 font-medium">Capacity: {warehouse.capacity}</span>
            <span className="block">Specialization: {warehouse.specialization}</span> */}
          </p>
          <a 
            href={`https://www.google.com/maps/search/${encodeURIComponent(warehouse.address)}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[16px] font-medium text-[#] hover:text-orange-700 transition-colors"
          >
            → View on Maps
          </a>
        </div>
      </motion.div>
    </div>
  );

  // Calculate transform values
  const getTransform = () => {
    if (isMobile) {
      return `translateX(-${currentIndex * 100}%)`;
    } else {
      return `translateX(-${currentIndex * 336}px)`; // 320px card width + 16px gap
    }
  };

  return (
    <div className="w-full max-w-7xl md:max-w-[1300px] mx-auto px-4 py-16 bg-[#fbfbfb]">
      {/* Section Title */}
      <motion.h2 
        className="text-4xl md:text-5xl font-lato uppercase font-bold text-gray-800 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Our Warehouse Network
      </motion.h2>
      
      {/* Desktop Carousel */}
      <div className="hidden md:block relative">
        <div className="overflow-hidden w-full max-w-[1344px]"> {/* 3 cards * 336px */}
          <div 
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{ 
              transform: getTransform(),
              width: `${warehouses.length * 336}px`
            }}
          >
            {warehouses.map((warehouse) => (
              <CardComponent key={warehouse.id} warehouse={warehouse} />
            ))}
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-end mt-8 space-x-4">
          <motion.button
            className="bg-white text-[#172747] border cursor-pointer border-gray-200 w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            aria-label="Previous warehouse"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            className="bg-white text-[#172747] w-10 h-10 cursor-pointer rounded-full flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            aria-label="Next warehouse"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative">
        <div 
          className="overflow-hidden w-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: getTransform(),
              width: `${warehouses.length * 100}%`
            }}
          >
            {warehouses.map((warehouse) => (
              <div key={warehouse.id} className="w-full flex-shrink-0 px-1">
                <CardComponent warehouse={warehouse} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {warehouses.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
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
    </div>
  );
};

export default WarehousesCarousel;