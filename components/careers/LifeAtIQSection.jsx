'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Culture items data
const cultureItems = [
  {
    id: 1,
    title: "Collaborative Workspace",
    category: "Culture",
    description: "Our modern offices are designed to foster teamwork, creativity, and innovation across departments and regions.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Team Building",
    category: "Culture",
    description: "Regular activities strengthen our bonds and create a cohesive global team that works together seamlessly.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Knowledge Sharing",
    category: "Growth",
    description: "Learning from industry experts and each other is central to our development philosophy.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Global Perspective",
    category: "Global",
    description: "Working with teams across continents gives us unique insights and a truly international outlook.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Innovation Focus",
    category: "Innovation",
    description: "We're constantly developing solutions for tomorrow's challenges in the global raw materials industry.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Work-Life Balance",
    category: "Wellbeing",
    description: "We celebrate achievements and milestones together while respecting personal time and wellbeing.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
  }
];

const LifeAtIQSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  
  // Card width in pixels
  const cardWidth = 315;
  const cardGap = 16; // 8px on each side
  const totalCardWidth = cardWidth + cardGap;
  
  // Fixed number of visible slides
  const visibleSlidesCount = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, cultureItems.length - visibleSlidesCount);

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

  // Animation on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const section = sectionRef.current;
    const heading = headingRef.current;
    
    if (!section || !heading) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            heading.style.opacity = '1';
            heading.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
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

  // Culture Card Component
  const CultureCard = ({ item }) => (
    <motion.div
      className="relative h-96 bg-cover bg-center bg-no-repeat overflow-hidden group cursor-pointer flex-shrink-0"
      style={{ 
        backgroundImage: `url(${item.image})`,
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
          {item.category}
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
            LIFE AT IQ
          </p>
          <h3 className="font-lato font-light text-[30px] line-clamp-2 group-hover:line-clamp-none text-ellipsis overflow-hidden text-black leading-tight transition-all duration-300">
            {item.title}
          </h3>
        </div>
        
        {/* Expanded content - only visible on hover for desktop */}
        <div
          className="px-4 pb-4 opacity-0 group-hover:opacity-100"
        >
          <div className="text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4">
            <p className="mt-2">{item.description}</p>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center text-[16px] font-medium text-[#1E3157]">
              Our Culture →
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
  
  return (
    <section 
      ref={sectionRef}
      className="w-full max-w-7xl md:max-w-[1300px] mx-auto px-4 py-16 pb-8 md:py-24 md:pb-12 lg:py-0 bg-[#ffffff]"
    >
      {/* Section Title with fade-in animation */}
      <h2 
        ref={headingRef}
        className="text-4xl font-lato font-bold lg:text-[44px] text-[#1a365d] mb-12 opacity-0 transform translate-y-8 transition-all duration-700"
      >
        Life at IQ Group
      </h2>
      
      {/* Introduction text */}
      <div className="max-w-3xl mb-12">
        <p className="text-gray-700 font-onest font-light text-lg md:text-xl">
          Experience a culture that values innovation, collaboration, and personal growth. 
          At IQ Group, we're building more than a company—we're creating a community where talent thrives.
        </p>
      </div>
      
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
            {cultureItems.map((item) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 px-2"
                style={{ width: `315px` }}
              >
                <CultureCard item={item} />
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
            {cultureItems.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 px-2">
                <CultureCard item={item} />
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {cultureItems.map((_, index) => (
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
      
      {/* Navigation buttons - Reduced bottom margin */}
      <div className="flex justify-end gap-3 mt-6 mb-0">
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
      
      {/* Quote section - commented out */}
      {/* <div className="mt-20 text-center px-4 md:px-12 lg:px-24 py-12 bg-white rounded-lg shadow-sm">
        <svg className="w-10 h-10 text-[#1a365d]/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <blockquote className="text-xl md:text-2xl font-light italic text-gray-700 mb-6">
          "At IQ Group, we're not just colleagues—we're a global family united by our passion for excellence and innovation."
        </blockquote>
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop" 
              alt="CEO Portrait" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <p className="font-bold text-[#1a365d]">Raj Sharma</p>
            <p className="text-sm text-gray-600">CEO, IQ Group</p>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default LifeAtIQSection; 