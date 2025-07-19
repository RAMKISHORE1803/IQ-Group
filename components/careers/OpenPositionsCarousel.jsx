'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Clock, Briefcase } from 'lucide-react';
import Link from 'next/link';

// Open positions data
const positions = [
  {
    id: 1,
    title: "Sales Manager",
    department: "Sales",
    location: "Mumbai, India",
    type: "Full-time",
    description: "Lead our sales team to develop new business opportunities and drive revenue growth across our product portfolio.",
    requirements: [
      "5+ years of sales experience in raw materials or commodities",
      "Strong negotiation and relationship-building skills",
      "Experience managing and developing sales teams",
      "International business exposure preferred"
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Supply Chain Analyst",
    department: "Operations",
    location: "Hong Kong, China",
    type: "Full-time",
    description: "Optimize our global supply chain operations and develop strategies to improve efficiency and reduce costs.",
    requirements: [
      "3+ years in supply chain management or logistics",
      "Strong analytical and problem-solving skills",
      "Experience with ERP systems and data analysis",
      "Knowledge of international shipping and trade regulations"
    ],
    image: "https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Chennai, India",
    type: "Full-time",
    description: "Create compelling marketing campaigns to promote our products and services to global industrial clients.",
    requirements: [
      "3+ years in B2B marketing, preferably in industrial sectors",
      "Experience with digital marketing strategies and content creation",
      "Strong communication and presentation skills",
      "Knowledge of market research and analytics"
    ],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Quality Control Engineer",
    department: "Operations",
    location: "Taiyuan, China",
    type: "Full-time",
    description: "Ensure our raw materials meet the highest quality standards through rigorous testing and inspection processes.",
    requirements: [
      "Degree in Engineering, Chemistry, or related field",
      "3+ years in quality control, preferably in minerals or metals",
      "Experience with quality management systems and certifications",
      "Strong attention to detail and analytical skills"
    ],
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Financial Analyst",
    department: "Finance",
    location: "Visakhapatnam, India",
    type: "Full-time",
    description: "Analyze financial data, prepare reports, and provide insights to support strategic business decisions.",
    requirements: [
      "Degree in Finance, Accounting, or related field",
      "3+ years in financial analysis or accounting",
      "Strong Excel and financial modeling skills",
      "Experience with ERP systems and financial reporting"
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Business Development Executive",
    department: "Sales",
    location: "Kolkata, India",
    type: "Full-time",
    description: "Identify and develop new business opportunities in emerging markets for our raw materials portfolio.",
    requirements: [
      "2+ years in business development or sales",
      "Strong networking and relationship-building skills",
      "Knowledge of industrial raw materials market a plus",
      "Excellent communication and negotiation skills"
    ],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop"
  },
//   {
//     id: 7,
//     title: "Business Development Executive",
//     department: "Sales",
//     location: "Kolkata, India",
//     type: "Full-time",
//     description: "Identify and develop new business opportunities in emerging markets for our raw materials portfolio.",
//     requirements: [
//       "2+ years in business development or sales",
//       "Strong networking and relationship-building skills",
//       "Knowledge of industrial raw materials market a plus",
//       "Excellent communication and negotiation skills"
//     ],
//     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop"
//   }
];

const OpenPositionsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef(null);
  
  // Card width in pixels
  const cardWidth = 315;
  const cardGap = 16; // 8px on each side
  const totalCardWidth = cardWidth + cardGap;
  
  // Fixed number of visible slides
  const visibleSlidesCount = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, positions.length - visibleSlidesCount);

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
        setCurrentIndex(0);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 5000);
    
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
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(prev => prev - 1);
    }
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

  // Position Card Component
  const PositionCard = ({ position }) => (
    <motion.div
      className="relative h-96 bg-cover bg-center bg-no-repeat overflow-hidden group cursor-pointer flex-shrink-0"
      style={{ 
        backgroundImage: `url(${position.image})`,
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
          {position.department}
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
            JOB OPENING
          </p>
          <h3 className="font-lato font-light text-[30px] line-clamp-2 group-hover:line-clamp-none text-ellipsis overflow-hidden text-black leading-tight transition-all duration-300">
            {position.title}
          </h3>
        </div>
        
        {/* Expanded content - only visible on hover for desktop */}
        <div
          className="px-4 pb-4 opacity-0 group-hover:opacity-100"
        >
          <div className="text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4 space-y-1">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-[#1a365d]" />
              <span>{position.location}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-[#1a365d]" />
              <span>{position.type}</span>
            </div>
            <p className="mt-2">{position.description}</p>
          </div>
          <Link 
            href="#apply-now"
            className="inline-flex items-center text-[16px] font-medium text-[#1E3157] hover:text-[#324390] transition-colors"
          >
            Apply Now →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
  
  return (
    <div className="w-full max-w-7xl md:max-w-[1300px] mx-auto px-4 py-12 bg-[#ffffff]">
      {/* Section Title */}
      <h2 className="text-4xl font-lato font-bold uppercase lg:text-[44px] text-[#1a365d] mb-12">
        Open Positions
      </h2>
      
      {/* Desktop Carousel */}
      <div className="hidden md:block relative">
        <div 
          className="overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="flex transition-all duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * totalCardWidth}px)`,
            }}
          >
            {positions.map((position) => (
              <div 
                key={position.id} 
                className="flex-shrink-0 px-2"
                style={{ width: `315px` }}
              >
                <PositionCard position={position} />
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
            {positions.map((position) => (
              <div key={position.id} className="w-full flex-shrink-0 px-2">
                <PositionCard position={position} />
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {positions.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#1a365d]' : 'bg-gray-300'
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
      <div className="flex justify-end gap-3 mt-8 mb-4">
        <button 
          onClick={prevSlide}
          className="p-3 text-[#1E3157] rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 text-[#1E3157] rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default OpenPositionsCarousel; 