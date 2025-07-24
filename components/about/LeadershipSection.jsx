'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Leadership team data from actual IQ Group website
const leadershipTeam = [
  {
    name: "Shikhar Chand Bothra",
    role: "Chairman & MD",
    bio: "He is a commerce graduate & carries with him vast business experience of more than four decades, he has successfully established and led many manufacturing industries. His current focus and passion is on Governance, & Engaged Investing.",
    image: "/Images/Management/Shikar.jpg"
  },
  {
    name: "Shakuntala Bothra",
    role: "Chairperson - IQ Foundation",
    bio: "She is a commerce graduate with business experience of more than 3 decades and is leading CSR activities of IQ Foundation. Under her leadership IQ Foundation has supported a number of initiatives that help the underprivileged members of society.",
    image: "/Images/Management/Shakuntala.jpg"
  },
  {
    name: "Siddharth Bothra",
    role: "Chief Executive Officer (CEO)",
    bio: "He is a commerce graduate with a background in foreign trade and has extensive experience of more than 2 decades in various business segments including metallurgical industry. He is the support that enabled us to take the business forward across the international boundaries.",
    image: "/Images/Management/Siddarth.jpg"
  },
  {
    name: "Jagruti Bothra",
    role: "Chief Financial Officer (CFO)",
    bio: "She is a commerce graduate leading Finance & Accounts, Financial Planning & Analysis functions as the Group Chief Financial Officer. She has over 15 years of experience with expertise in finance and operations.",
    image: "/Images/Management/Jagruti.jpg"
  },
  {
    name: "Zhou Hao",
    role: "Chief Operating Officer (COO)",
    bio: "He has done his masters in International Business & carries with him vast experience of 22 years in global business operations in Asia Pacific & EU region. He is solely responsible for international business through Hong Kong & China subsidiaries.",
    image: "https://www.iqgroup.in/image/team/5.jpg"
  }
];

export default function LeadershipSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef(null);
  
  // Fixed number of visible slides
  const visibleSlidesCount = isMobile ? 1 : 3;
  const totalMembers = leadershipTeam.length;
  const maxIndex = Math.max(0, totalMembers - visibleSlidesCount);

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

  // Function to handle automatic sliding
  const autoPlay = () => {
    if (currentIndex >= maxIndex) {
      // When we reach the end, reset to beginning
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
  }, [isAutoPlaying, currentIndex, maxIndex]);
  
  // Animation setup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const section = sectionRef.current;
    const heading = headingRef.current;
    
    if (!section || !heading) return;
    
    // Animate heading on scroll
    gsap.fromTo(heading,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const nextSlide = () => {
    if (currentIndex >= maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    setIsTransitioning(true);
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
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
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
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
    
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Create extended array for smooth infinite scrolling
  const extendedTeam = [...leadershipTeam, ...leadershipTeam];
  
  return (
    <section 
      id="leadership" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white relative z-10"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Section Label */}
        {/* <div className="mb-8">
          <div className="inline-block bg-[#e9edf5] px-4 py-2 rounded">
            <span className="text-[#324390] font-lato font-medium text-sm uppercase tracking-wider">
              LEADERSHIP TEAM
            </span>
          </div>
        </div> */}
        
        {/* Heading */}
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-lato text-[#324390] mb-12"
        >
          OUR LEADERSHIP TEAM
        </h2>
        
        {/* Desktop View Carousel */}
        <div className="hidden md:block relative">
          <div className="overflow-hidden">
            <div 
              className={`flex transition-all ${isTransitioning ? 'duration-500' : 'duration-0'} ease-out`}
              style={{ 
                transform: `translateX(-${currentIndex * (100/visibleSlidesCount)}%)`,
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {extendedTeam.map((member, index) => (
                <div 
                  key={`${member.name}-${Math.floor(index / leadershipTeam.length)}`} 
                  className="flex-shrink-0 cursor-pointer px-3"
                  style={{ width: `${100/visibleSlidesCount}%` }}
                >
                  <div className="h-[450px] overflow-hidden mb-4 relative">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover object-[0%_25%]"
                      
                    />
                  </div>
                  <div className="bg-white py-4 px-4">
                    <h3 className="text-xl font-lato font-bold text-[#324390] mb-1 whitespace-nowrap overflow-hidden text-ellipsis">{member.name}</h3>
                    <p className="text-gray-600 font-onest text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="absolute right-0 bottom-[-60px] flex gap-3 mb-4 mr-4">
            <button 
              onClick={prevSlide}
              className="p-3 text-[#324390] rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 text-[#324390] rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Mobile View Carousel */}
        <div className="md:hidden relative">
          <div 
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-500' : 'transition-none'} ease-out`}
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {extendedTeam.map((member, index) => (
                <div 
                  key={`${member.name}-${Math.floor(index / leadershipTeam.length)}`}
                  className="flex-shrink-0 w-full cursor-pointer px-2"
                >
                  <div className="h-[380px] relative overflow-hidden mb-4">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover object-[0%_25%]"
                    />
                  </div>
                  <div className="bg-white py-4 px-4">
                    <h3 className="text-xl font-lato font-bold text-[#324390] mb-1 overflow-hidden text-ellipsis whitespace-nowrap">{member.name}</h3>
                    <p className="text-gray-600 font-onest text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {leadershipTeam.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsTransitioning(true);
                  setIsAutoPlaying(false);
                  // Resume auto-play after user interaction
                  setTimeout(() => setIsAutoPlaying(true), 5000);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === (currentIndex % leadershipTeam.length) ? 'bg-[#324390]' : 'bg-gray-300'
                } cursor-pointer`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-4">
            <button 
              onClick={prevSlide}
              className="p-2 text-[#324390] hover:text-[#1a2a6c] transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 text-[#324390] hover:text-[#1a2a6c] transition-colors cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 