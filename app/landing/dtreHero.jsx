import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const PLACEHOLDER_URLS = {
  port: '/images/HeroSection/2.jpg',
  isoCert: 'https://assets.lummi.ai/assets/QmcJJ4gnTTpemnMCgVmHxLDpJNDBYVQt6gHn6zYx9FFFMS?auto=format&w=1500',
  divisions: '/images/HeroSection/3.jpg',
  worldMap: 'https://assets.lummi.ai/assets/QmV4d5AEniBPRQUDLkRm6ftBmVEx9jBrULQCtTeNaUp2Ra?auto=format&w=1500',
  logoFerro: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=60&h=40&fit=crop',
  logoGreen: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=60&h=40&fit=crop',
  logoMineral: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=60&h=40&fit=crop'
};

const slides = [
  {
    ariaLabel: 'Core Mission & Global Scale',
    background: PLACEHOLDER_URLS.port,
    isVideo: false,
    headline: 'Trusted by Global Manufacturers. Powered by Proven Logistics.',
    subtext: 'We enable raw material movement from source to industry—efficiently, reliably, worldwide.',
    ctaText: 'Get a Quote',
    ctaLink: '/contact'
  },
  {
    ariaLabel: 'Quality & Certification Highlight',
    background: PLACEHOLDER_URLS.isoCert,
    isVideo: false,
    headline: 'ISO 9001:2008 Certified. Unmatched Quality Control.',
    subtext: 'From sourcing to delivery, our dynamic quality policy ensures you receive only top-grade materials.',
    ctaText: 'Read Quality Policy',
    ctaLink: '/quality-policy'
  },
  {
    ariaLabel: 'Company Divisions Snapshot',
    background: PLACEHOLDER_URLS.divisions,
    isVideo: false,
    headline: 'Eight Specialized Divisions. One Unified Vision.',
    subtext: 'Explore how each IQ Group company delivers excellence in its niche.',
    ctaText: 'Discover Our Companies',
    ctaLink: '/our-companies',
  },
  {
    ariaLabel: 'Operating in 20+ Countries. Serving 15+ Industries.',
    background: PLACEHOLDER_URLS.worldMap,
    isVideo: false,
    headline: 'Operating in 20+ Countries. Serving 15+ Industries.',
    subtext: 'Our global network and local expertise keep your supply chain agile.',
    
    ctaLink: '/global-presence',
    animatedStats: [
      { value: 20, suffix: '+', label: 'Countries' },
      { value: 15, suffix: '+', label: 'Industries' },
      { value: 100000, suffix: 'K+', label: 'Tons Delivered' }
    ]
  }
];

const AnimatedCounter = ({ value, suffix, label, isActive }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isActive) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / end));
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isActive, value]);

  return (
    <div className="text-center text-white">
      <div className="text-[20px] md:text-[32px] font-lato font-bold">
        {displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-xs md:text-sm font-onest font-light opacity-90 mt-1">{label}</div>
    </div>
  );
};

export default function DTREHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0); // Key to force progress bar restart

  const SLIDE_DURATION = 4000; // 4 seconds - make sure this matches progress animation

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % slides.length;
        setProgressKey(prevKey => prevKey + 1); // Force progress bar restart
        return nextSlide;
      });
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgressKey(prevKey => prevKey + 1); // Force progress bar restart
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgressKey(prevKey => prevKey + 1); // Force progress bar restart
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgressKey(prevKey => prevKey + 1); // Force progress bar restart
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className="relative w-full h-screen flex items-center md:items-center justify-start overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Image/Video with Overlay */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={currentSlideData.background}
            alt={currentSlideData.ariaLabel}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-all duration-1000"
          />
        </div>
        <div className='absolute inset-0 bg-black/46'></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-white/10"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10  mx-auto md:mt-[-100px] px-6 lg:px-8 w-full">
        <div className="max-w-3xl pt-20 lg:max-w-[800px] md:pl-[20px] md:pt-0">
          {/* Headline */}
          <h1 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[50px] lg:leading-[1.05] xl:text-[55px] font-lato font-bold text-white leading-tight mb-4 md:mb-6">
            {currentSlideData.headline}
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-[20px] md:text-[24px] lg:text-[32px] font-onest font-light text-white/90 mb-6 md:mb-8 leading-relaxed">
            {currentSlideData.subtext}
          </p>

          {/* CTA Button */}
          {currentSlideData.ctaText && <button 
            className="inline-flex items-center gap-2 md:gap-3 bg-[#203663] border-1 border-[#203663] hover:bg-[#fbfbfb] hover:text-[#203663] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-onest font-light transition-all duration-300 transform "
            onClick={() => console.log(`Navigate to: ${currentSlideData.ctaLink}`)}
          >
            <ExternalLink size={16} className="md:w-5 md:h-5" />
            {currentSlideData.ctaText}
          </button>}

          {/* Supplemental Logos */}
          {currentSlideData.supplementalLogos && (
            <div className="flex items-center gap-4 md:gap-6 mt-8 md:mt-12">
              {currentSlideData.supplementalLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 md:h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          )}

          {/* Animated Stats */}
          {currentSlideData.animatedStats && (
            <div className="flex items-center gap-6 md:gap-12 mt-8 md:mt-12 flex-wrap">
              {currentSlideData.animatedStats.map((stat, index) => (
                <AnimatedCounter
                  key={index}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  isActive={currentSlide === 3}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:right-6 md:top-1/2 md:transform md:-translate-y-1/2 md:left-auto md:bottom-auto flex md:flex-col gap-4 z-20">
        <button
          onClick={prevSlide}
          className="w-[60px] h-[60px] md:w-12 md:h-12 bg-white/0 hover:bg-white/0 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft size={30} className="md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-[60px] h-[60px] md:w-12 md:h-12 bg-white/0 hover:bg-white/0 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight size={30} className="md:w-6 md:h-6" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-0 left-0 right-0 z-20 mb-20 md:mb-0">
        <div className="max-w-7xl md:max-w-full md:px-[0px] mx-auto px-6 lg:px-8 pb-6 md:pb-8">
          {/* Desktop: Full progress indicators */}
          <div className="hidden md:grid grid-cols-4 gap-8">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              const slideNumber = (index + 1).toString().padStart(2, '0');
              
              return (
                <div key={index} className="cursor-pointer group" onClick={() => goToSlide(index)}>
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-white/30 mb-4 overflow-hidden">
                    <div 
                      key={`${index}-${progressKey}`} // Key to force restart
                      className={`h-full transition-all duration-300 ${
                        isActive ? 'bg-blue-400 w-full' : 'bg-white/50 w-0 group-hover:w-1/4'
                      }`}
                      style={{
                        animation: isActive && isPlaying ? `progress-${index} ${SLIDE_DURATION}ms linear forwards` : 'none'
                      }}
                    ></div>
                  </div>
                  
                  {/* Slide Info */}
                  <div className={`transition-all duration-300 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                    <div className="text-lg font-lato font-bold mb-2">{slideNumber}</div>
                    <div className="text-sm font-onest font-light leading-relaxed">{slide.ariaLabel}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS for progress bar animation and Google Fonts */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Onest:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        @keyframes progress-0 {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes progress-1 {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes progress-2 {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes progress-3 {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .font-lato {
          font-family: 'Lato', sans-serif;
        }
        
        .font-onest {
          font-family: 'Onest', sans-serif;
        }
      `}</style>
    </div>
  );
}