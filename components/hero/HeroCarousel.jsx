'use client';

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { ChevronRight , ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { motion } from 'framer-motion';

// SlideRevealText component for text reveal animation
const SlideRevealText = ({ text, className, startAnimation = false, delay = 0, duration = 800 }) => {
  return (
    <div className="overflow-visible relative">
      <div
        className={`${className} transition-transform whitespace-pre-wrap`}
        style={{
          clipPath: startAnimation ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
          transition: `clip-path ${duration}ms ease-out ${delay}ms`,
          willChange: 'clip-path'
        }}
      >
        {text}
      </div>
    </div>
  );
};


// Button reveal animation component
const ButtonReveal = ({ startAnimation = false, delay = 0, duration = 800, ctaLink, ctaText }) => {
  return (
    <Link
      href={ctaLink}
      className="inline-block"
    >
      <button
        style={{
          clipPath: startAnimation ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
          transition: `clip-path ${duration}ms ease-out ${delay}ms`,
          willChange: 'clip-path'
        }}
        className="bg-[#fbfbfb] hover:bg-transparent border border-solid border-[#fbfbfb] hover:text-[#fbfbfb] text-[#121212] px-6 py-3 group transition-colors duration-300 font-medium text-[16px] font-onest font-light cursor-pointer"
      >
        <div className="flex items-center gap-2 lg:text-[18px]">
          {ctaText}
          <ArrowUpRight 
            
            className="w-4 h-4 lg:w-5 lg:h-5  transition-all duration-300 text-black group-hover:text-white hover:block" 
          />
        </div>
      </button>
    </Link>
  );
};

// Slide data
const slides = [
  {
    ariaLabel: 'Core Mission & Global Scale',
    background: '/herobg1.webp',
    isVideo: false,
    headline: 'Bridging Global Raw Materials to Users',
    subtext: 'We enable raw material movement from source to industry—efficiently, reliably, worldwide.',
    ctaText: 'Get a Quote',
    ctaLink: '/contact',
    tagline: 'EXPERTISE'
  },
  {
    ariaLabel: 'Quality & Certification Highlight',
    background: '/herobg2.webp',
    isVideo: false,
    headline: 'Discover Quality Excellence.\nUnmatched Quality Control.',
    subtext: 'From sourcing to delivery, our dynamic quality policy ensures you receive only top-grade materials.',
    ctaText: 'Read Quality Policy',
    ctaLink: '/quality-insights',
    tagline: 'QUALITY'
  },
  {
    ariaLabel: 'Company Divisions Snapshot',
    background: '/herobg33.webp',
    isVideo: false,
    headline: 'Eight Specialized Divisions.\nOne Unified Vision.',
    subtext: 'Explore how each IQ Group company delivers excellence in its niche.',
    ctaText: 'Discover Our Companies',
    ctaLink: '/companies',
    tagline: 'DIVISIONS'
  },
  {
    ariaLabel:'Operating in 20+ Countries. Serving 15+ Industries.',
    background: '/herobg4.webp',
    isVideo: false,
    headline: 'Operating in 20+ Countries.\nServing 15+ Industries.',
    subtext: 'Our global network and local expertise keep your supply chain agile.',
    ctaText: 'View Our Global Presence',
    ctaLink: '/about',
    animatedStats: [
      { value: 20, suffix: '+', label: 'Countries' },
      { value: 15, suffix: '+', label: 'Industries' },
      { value: 100000, suffix: 'K+', label: 'Tons Delivered' }
    ],
    tagline: 'GLOBAL'
  },
  // {
  //   ariaLabel: 'Global Footprint & Animated Stats',
  //   isCustomComponent: true,
  //   component: GlobalPresenceSlide
  // }
];

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [slideAnimationStates, setSlideAnimationStates] = useState(Array(slides.length).fill(false));
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Handle animation start for counters
  useEffect(() => {
    if (activeSlide === 3) {
      setIsAnimationStarted(true);
    } else {
      setIsAnimationStarted(false);
    }
    
    // Trigger text reveal animation for the active slide
    const newAnimationStates = Array(slides.length).fill(false);
    newAnimationStates[activeSlide] = true;
    setSlideAnimationStates(newAnimationStates);

    // Start with full progress (100%) and countdown to 0
    setProgress(0);
    
    // Clear existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Start countdown progress animation
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev <= 100) {
          return prev + (100 / 60);
        } else {
          return 0;
        }
      });
    }, 100);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [activeSlide]);

  return (
    <div className="relative text-times-new-roman w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        autoplay={{ 
          delay: 6000, 
          disableOnInteraction: true,
          pauseOnMouseEnter: true
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        navigation={true}
        loop={true}
        className="h-full hero-swiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.realIndex);
        }}
        role="region"
        aria-roledescription="carousel"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide 
            key={idx} 
            aria-label={`Slide ${idx + 1}: ${slide.ariaLabel}`} 
            role="region"
            aria-roledescription="slide"
            className="relative w-full h-full"
          >
            {slide.isCustomComponent ? (
              <slide.component />
            ) : (
              /* Full width layout container with overlapping title */
              <div className="flex flex-col md:flex-row w-full h-full relative">
                {/* Media half (top on mobile, right on desktop) */}
                <div className="w-full md:w-[60%] h-1/2 md:h-full relative order-1 md:order-2">
                  {/* Background Content - Video or Image */}
                  {slide.isVideo ? (
                    <video
                      src={slide.background}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      preload="metadata"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 w-full h-full bg-cover object-contain bg-center"
                      style={{ backgroundImage: `url(${slide.background})` }}
                    />
                  )}
                  
                  {/* Dark overlay gradient */}
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" /> */}
                </div>

                {/* Black content area (bottom on mobile, left on desktop) */}
                <div className="w-full md:w-[40%] h-1/2 md:h-full bg-black flex flex-col justify-start md:justify-center items-start px-4 text-left order-2 md:order-1 relative">
                  
                </div>

                {/* Overlapping title that extends beyond the black area */}
                <div className="absolute left-4 md:left-[8%]  md:grid md:grid-rows-2 md:gap-0 top-[69%] md:top-[55%] transform -translate-y-[50%] z-20">
                  
                  <div className="max-w-none pt-[15px] md:pt-0 lg:max-w-[50vw] pointer-events-none">
                    <SlideRevealText
                        text={slide.tagline}
                        className="text-gray-500 pl-[2px] text-sm font-onest  font-bold tracking-[3px] md:text-[20px] md:tracking-[3px] opacity-80 mb-[10px]"
                        startAnimation={slideAnimationStates[idx]}
                        delay={200}
                        duration={800}
                      />
                      <SlideRevealText
                        text={slide.headline}
                        className="text-[#fbfbfb] font-lato font-semibold text-[32px] leading-[34px] lg:tracking-wide md:text-[48px] lg:text-[55px] lg:leading-[60px] xl:text-[55px] leading-[1.1] tracking-tight whitespace-pre-line"
                        startAnimation={slideAnimationStates[idx]}
                        delay={800}
                      />
                  </div>
                  
                  <div className="max-w-xl ml-0 mt-10 md:mt-0 flex flex-col items-start gap-4 md:block md:mt-[0vh] md:mr-0 md:pr-8 lg:pr-0 relative z-10 pointer-events-auto"> 
                    {/* Supplemental Logos (for Slide 3) */}
                    {slide.supplementalLogos && (
                      <div className="mt-8 flex flex-wrap justify-start gap-8">
                        {slide.supplementalLogos.map((logo, i) => (
                          <div 
                            key={i} 
                            className="w-16 h-16 md:w-20 md:h-20 opacity-75 hover:opacity-100 transition-opacity"
                            style={{ 
                              animationDelay: `${i * 0.3}s`,
                              animation: activeSlide === 2 ? 'fadeIn 0.5s ease-in-out forwards' : 'none'
                            }}
                          >
                            <Image 
                              src={logo.src} 
                              alt={logo.alt}
                              width={80} 
                              height={80}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* CTA Button - Rectangular style */}
                    <div className="mt-auto mb-8 md:mt-[30px]">
                      <ButtonReveal
                        startAnimation={slideAnimationStates[idx]}
                        delay={1200}
                        duration={800}
                          ctaLink={slide.ctaLink}
                        ctaText={slide.ctaText}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation controls positioned like in the reference */}
      <div className="absolute bottom-8 left-[10%] md:left-[8%] z-30 flex items-center gap-8">
        <button 
          onClick={() => swiperRef.current?.slidePrev()} 
          className="text-[#fbfbfb] cursor-pointer  font-lato font-bold text-[18px] lg:text-[20px] hover:text-[#fbfbfb]/80 transition-colors"
        >
          Prev
        </button>
        <div className="w-32 h-px bg-[#fbfbfb]/30 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#fbfbfb] transition-none"
            style={{
              width: `${progress}%`
            }}
          />
        </div>
        <button 
          onClick={() => swiperRef.current?.slideNext()} 
          className="text-[#fbfbfb] cursor-pointer font-lato font-bold text-[18px] lg:text-[20px] hover:text-[#fbfbfb]/80 transition-colors"
        >
          Next
        </button>
      </div>
      
      {/* Custom styling for the swiper component */}
      <style jsx global>{`
        .hero-swiper {
          --swiper-theme-color: rgb(17, 17, 18);
          --swiper-navigation-size: 24px;
        }
        
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          display: none; /* Hide default navigation */
        }
        
        .hero-swiper .swiper-pagination {
          display: none; /* Hide default pagination */
        }
        
        /* Fix for slide overlap */
        .swiper-slide {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s ease;
        }
        
        .swiper-slide-active {
          opacity: 1;
          visibility: visible;
          z-index: 10;
        }
        
        /* Ensure Swiper's fade effect works correctly */
        .swiper-container-fade .swiper-slide {
          pointer-events: none;
        }
        
        .swiper-container-fade .swiper-slide-active {
          pointer-events: auto;
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Stat card styling */
        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
}