'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const MobileView = ({ allCompanies }) => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const swiperRef = useRef(null);
  
  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  
  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  // Heading animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="bg-[#fbfbfb] from-[#010A4E] to-[#041174] text-white min-h-screen relative"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Top section with heading and description */}
      <div className="px-6 py-12">
        <motion.div className="border-b border-white/30 pb-6 mb-8" variants={itemVariants}>
          <motion.h2 className="text-3xl font-light mb-6" variants={itemVariants}>
            IDUSTRIES WE CATER
          </motion.h2>
          <motion.p className="text-gray-300 text-[18px] leading-relaxed" variants={itemVariants}>
          Discover the industries we empower — delivering precision, consistency, and global-scale material excellence.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Cards carousel - Swiper implementation */}
      <motion.div className="relative pb-24" variants={itemVariants}>
        <Swiper
          ref={swiperRef}
          slidesPerView={1.15}
          spaceBetween={16}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={false}
          className="company-swiper"
          grabCursor={true}
          touchEventsTarget="container"
          resistanceRatio={0.85}
          threshold={5}
        >
          {allCompanies.map((company) => (
            <SwiperSlide key={company.id}>
              <div className="bg-gray-900 overflow-hidden">
                <div className="relative h-[50vh]">
                  <Image
                    src={company.image}
                    alt={company.name}
                    fill
                    sizes="(max-width: 768px) 85vw, 50vw"
                    quality={90}
                    priority
                    className="object-cover"
                    style={{ objectPosition: "center" }}
                  />
                  <div className="absolute bottom-3 left-3 bg-black/70 py-1 px-3">
                    <span className="text-xs font-medium text-gray-300">
                      {company.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-[#010A4E]">
                  <h3 className="text-xl font-medium text-white mb-2">
                    {company.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Navigation controls */}
        <div className="flex items-center justify-between mt-12 mb-4 px-6">
          {/* Left arrow */}
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center transition-colors hover:border-white"
            aria-label="Previous card"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Progress bar */}
          <div className="flex-1 mx-6 relative h-[2px] bg-gray-800">
            <div 
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${((activeIndex + 1) / allCompanies.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Right arrow */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slideNext();
              }
            }}
            className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center transition-colors hover:border-white"
            aria-label="Next card"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>

      <style jsx global>{`
        .company-swiper {
          padding-left: 24px;
          padding-right: 8px;
          width: 100%;
        }
        .company-swiper .swiper-slide {
          width: 85%;
          height: auto;
          border-radius: 0px;
          overflow: hidden;
        }
      `}</style>
    </motion.section>
  );
};

export default MobileView; 