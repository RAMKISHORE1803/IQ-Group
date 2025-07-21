import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const InsightsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

    const insights = [
      {
        "id": 1,
        "category": "INTERNATIONAL BUSINESS",
        "date": "MAY 14, 2025",
        "headline": "India Can't Build Steel on Bureaucracy.",
        "subheadline": "Siddharth Bothra, CEO of IQ Minerals & Metals, sounds the alarm.",
        "body": "India's specialty steel lifeline is on the clock. No BIS certifications. No imports. No options. If red tape wins, our steel supply loses. And when steel stops, infrastructure, industry, and ambition fall silent.",
        "cta": "→ Read the Statement",
        "bgImage": "https://images.unsplash.com/photo-1530968033775-2c92736b131e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
      },
      {
        "id": 2,
        "category": "GLOBAL TRADE",
        "date": "MAY 14, 2025",
        "headline": "Global Trade Is Breaking. Again.",
        "subheadline": "Siddharth Bothra, CEO of IQ Minerals & Metals, issues a wake-up call.",
        "body": "Freight rates have exploded. Containers are gone. Profits chase the West. Supply chains buckle under greed. The world isn't paying attention — but industries and consumers are already paying the price.",
        "cta": "→ Read the Full Perspective",
        "bgImage": "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
      },
      {
        "id": 3,
        "category": "REGULATORY INDUSTRY",
        "date": "MAY 8, 2025",
        "headline": "Red Tape Is the New Monopoly.",
        "subheadline": "Siddharth Bothra, CEO of IQ Minerals & Metals, challenges the new License Raj.",
        "body": "BIS mandates were meant for quality. Now they gatekeep competition. MSMEs can't breathe. Big players tighten their grip. Inputs vanish. Prices soar. If this is ease of business, it's choking our future.",
        "cta": "→ Read the Full Insight",
        "bgImage": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
      },
      {
        "id": 4,
        "category": "TRADE ENFORCEMENT",
        "date": "MAY 8, 2025",
        "headline": "China's New Clampdown Means More Pressure on India.",
        "subheadline": "Siddharth Bothra, CEO of IQ Minerals & Metals, warns of rising risks.",
        "body": "China's crackdown pushes exports to India. Dumping danger is real. Defend before it's too late.",
        "cta": "→ Read the Full Analysis",
        "bgImage": "https://plus.unsplash.com/premium_photo-1675826460422-e39481fae224?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpbmF8ZW58MHx8MHx8fDA%3D"
      }
    ];
    

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % insights.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isMobile, insights.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % insights.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);
  };

  const CardComponent = ({ insight, index }) => (
    <motion.div
      className="relative h-96 bg-cover bg-center bg-no-repeat overflow-hidden group cursor-pointer flex-shrink-0"
      style={{ 
        backgroundImage: `url(${insight.bgImage})`,
        width: isMobile ? '100%' : '300px'
      }}
      whileHover={{ scale: isMobile ? 1 : 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-20" />
      
      {/* Category Label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black bg-opacity-60 text-white  text-xs font-medium px-3 py-1.5 rounded-full">
          {insight.category}
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
            ARTICLE {insight.date}
          </p>
          <h3 className="font-lato font-light text-[30px] line-clamp-2 group-hover:line-clamp-none text-ellipsis overflow-hidden text-black leading-tight transition-all duration-300">
            {insight.headline}
          </h3>
        </div>
        
        {/* Expanded content - only visible on hover for desktop */}
        {1 && (
          <motion.div
            className="px-4 pb-4 opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* <p className="text-sm font-medium text-gray-700 mb-2">
              {insight.subheadline}
            </p> */}
            <p className=" text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4">
              {insight.body}
            </p>
            <button className="inline-flex items-center text-[16px] font-medium text-green-600 hover:text-green-700 transition-colors">
              {insight.cta}
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="w-full max-w-7xl md:max-w-[1300px]  mx-auto px-4 py-16">
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-onest font-light text-gray-800 mb-12">
        Our Latest Insights
      </h2>
      
      {/* Desktop Carousel */}
      {!isMobile ? (
        <div className="flex gap-6 overflow-x-auto mad:min-h-[410px] pb-4 mb-8 scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {insights.map((insight, index) => (
            <CardComponent key={insight.id} insight={insight} index={index} />
          ))}
        </div>
      ) : (
        /* Mobile Carousel */
        <div className="relative mb-8">
          <div className="overflow-hidden">
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
              {/* Create infinite loop by duplicating slides */}
              {[...insights, ...insights].map((insight, index) => (
                <div key={`${insight.id}-${Math.floor(index / insights.length)}`} className="w-full flex-shrink-0 px-2">
                  <CardComponent insight={insight} index={index} />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {insights.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-green-500' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Bottom CTA Button */}
      <div className="flex">
        <motion.button
          className="bg-[#1E3157] cursor-pointer text-white hover:bg-[#fbfbfb] hover:text-[#1E3157] border-2 border-[#1E3157] hover:border-[#1E3157] font-onest text-[20px] font-light text-black font-medium px-6 py-3  transition-colors duration-200 flex items-center gap-2"
         
        >
          <Link href="/resources">
          VIEW ALL
          <span className="text-lg">→</span>
          </Link>
        </motion.button>
      </div>
    </div>
  );
};

export default InsightsSection;