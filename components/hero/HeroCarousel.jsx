'use client';

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import CountUp from 'react-countup';
import { PLACEHOLDER_URLS } from './placeholders';
import GlobalPresenceSlide from './GlobalPresenceSlide';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// SlideRevealText component for text reveal animation
const SlideRevealText = ({ text, className, startAnimation = false, delay = 0, duration = 800 }) => {
  return (
    <div className="overflow-hidden relative">
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

// Slide data
const slides = [
  {
    ariaLabel: 'Core Mission & Global Scale',
    background: PLACEHOLDER_URLS.port, // Video
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
    supplementalLogos: [
      { src: PLACEHOLDER_URLS.logoFerro, alt: 'IQ Ferro Alloys' },
      { src: PLACEHOLDER_URLS.logoGreen, alt: 'IQ Green Energy' },
      { src: PLACEHOLDER_URLS.logoMineral, alt: 'IQ Mineral & Metals' }
    ]
  },
  {
    ariaLabel:'Operating in 20+ Countries. Serving 15+ Industries.',
    background: PLACEHOLDER_URLS.worldMap,
    isVideo: false,
    headline: 'Operating in 20+ Countries. Serving 15+ Industries.',
    subtext: 'Our global network and local expertise keep your supply chain agile.',
    ctaText: 'View Our Global Presence',
    ctaLink: '/global-presence',
    animatedStats: [
      { value: 20, suffix: '+', label: 'Countries' },
      { value: 15, suffix: '+', label: 'Industries' },
      { value: 100000, suffix: 'K+', label: 'Tons Delivered' }
    ]
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
  const swiperRef = useRef(null);

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
  }, [activeSlide]);

  return (
    <div className="relative bg-[#fbfbfb] text-times-new-roman from-[#0719A1] to-[#0520F1] w-full h-screen overflow-hidden">
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
              /* Responsive two-half layout container */
              <div className="flex flex-col md:flex-row w-full h-full relative">
                {/* Content half (bottom on mobile, left on desktop) */}
                <div className="w-full md:w-1/2 h-2/3 md:h-full flex flex-col justify-center items-start px-4 text-left order-2 md:order-1">
                  <div className="max-w-xl ml-0 md:ml-auto md:mr-0 md:pr-8 lg:pr-16">
                    <SlideRevealText
                      text={slide.headline}
                      className="text-[#5790E1] text-lato font-semibold text-4xl md:text-[80px] leading-tight"
                      startAnimation={slideAnimationStates[idx]}
                      delay={0}
                    />
                    
                    <div className="mt-4">
                      <SlideRevealText
                        text={slide.subtext}
                        className="text-[#121212] text-onest font-light text-lg md:text-[40px] max-w-2xl"
                        startAnimation={slideAnimationStates[idx]}
                        delay={200}
                      />
                    </div>
                    
                    {/* Animated Stats (for Slide 4) */}
                    {slide.animatedStats && (
                      <div className="mt-8 flex flex-wrap justify-start gap-8">
                        {slide.animatedStats.map((stat, i) => (
                          <div key={i} className="text-[#000000] text-left">
                            <div className="text-3xl md:text-5xl font-bold">
                              {activeSlide === 3 && isAnimationStarted ? (
                                <CountUp 
                                  start={0} 
                                  end={stat.value} 
                                  duration={2.5} 
                                  separator="," 
                                  suffix={stat.suffix || ''}
                                />
                              ) : (
                                <span>{stat.value}{stat.suffix || ''}</span>
                              )}
                            </div>
                            <div className="text-sm text-onest font-light md:text-[20px] text-black mt-2">
                              <SlideRevealText
                                text={stat.label}
                                className="block"
                                startAnimation={slideAnimationStates[idx] && activeSlide === 3}
                                delay={400 + i * 100}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
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
                    
                    {/* CTA Button */}
                    <div className="mt-6 md:mt-[48px]">
                      <Link
                        href={slide.ctaLink}
                        className="bg-[#5790E1] hover:bg-gray-200 text-[#fbfbfb] hover:text-[#121212] px-6 py-3  transition-colors duration-300 inline-block font-medium"
                      >
                        <SlideRevealText
                          text={slide.ctaText}
                          className="block md:text-[20px] font-onest font-light"
                          startAnimation={slideAnimationStates[idx]}
                          delay={300}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Media half (top on mobile, right on desktop) */}
                <div className="w-full md:w-1/2 h-1/3 md:h-full relative order-1 md:order-2">
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
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom styling for the swiper component */}
      <style jsx global>{`
        .hero-swiper {
          --swiper-theme-color: #010A4E;
          --swiper-navigation-size: 24px;
        }
        
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          background-color: rgba(1, 10, 78, 0.3);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
        }
        
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background-color: rgba(1, 10, 78, 0.5);
        }
        
        .hero-swiper .swiper-pagination {
          z-index: 30;
        }
        
        .hero-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(1, 10, 78, 0.7);
          opacity: 0.7;
        }
        
        .hero-swiper .swiper-pagination-bullet-active {
          background: #010A4E;
          opacity: 1;
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