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
  },
  {
    name: "Shakuntala Bothra",
    role: "Chairperson - IQ Foundation",
    bio: "She is a commerce graduate with business experience of more than 3 decades and is leading CSR activities of IQ Foundation. Under her leadership IQ Foundation has supported a number of initiatives that help the underprivileged members of society.",
  },
  {
    name: "Siddharth Bothra",
    role: "Chief Executive Officer (CEO)",
    bio: "He is a commerce graduate with a background in foreign trade and has extensive experience of more than 2 decades in various business segments including metallurgical industry. He is the support that enabled us to take the business forward across the international boundaries.",
  },
  {
    name: "Jagruti Bothra",
    role: "Chief Financial Officer (CFO)",
    bio: "She is a commerce graduate leading Finance & Accounts, Financial Planning & Analysis functions as the Group Chief Financial Officer. She has over 15 years of experience with expertise in finance and operations.",
  },
  {
    name: "Zhou Hao",
    role: "Chief Operating Officer (COO)",
    bio: "He has done his masters in International Business & carries with him vast experience of 22 years in global business operations in Asia Pacific & EU region. He is solely responsible for international business through Hong Kong & China subsidiaries.",
  }
];

// Placeholder images for team members - replace with actual images when available
const teamImages = [
  "/Images/Management/Shikhar.jpg",
  "/Images/Management/Shakuntala.jpg",
  "/Images/Management/Siddharth.jpg",
  "/Images/Management/Jagruti.jpg",
  "https://www.iqgroup.in/images/team/5.jpg",
];

// Add images to team data
const teamWithImages = leadershipTeam.map((member, index) => ({
  ...member,
  image: teamImages[index % teamImages.length]
}));

// Team Member Card Component
function TeamMemberCard({ name, role, image }) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative h-[450px] w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="bg-white py-6 px-4">
        <h3 className="text-2xl font-lato font-bold text-[#324390] mb-1">{name}</h3>
        <p className="text-gray-600 font-onest text-sm">{role}</p>
      </div>
    </div>
  );
}

export default function LeadershipSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
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
  
  // Navigation functions with animation lock to prevent rapid clicking
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % teamWithImages.length);
    
    // Reset animation lock after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the CSS transition duration
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + teamWithImages.length) % teamWithImages.length);
    
    // Reset animation lock after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the CSS transition duration
  };
  
  // Calculate visible cards for the carousel
  const getVisibleIndices = () => {
    const total = teamWithImages.length;
    
    // On mobile, show just the current card
    if (isMobile) {
      return [currentIndex];
    }
    
    // For desktop, we need 5 cards - 3 full visible and 2 partial on edges
    return [
      (currentIndex - 2 + total) % total, // Far left (partial)
      (currentIndex - 1 + total) % total, // Left
      currentIndex,                       // Center
      (currentIndex + 1) % total,         // Right
      (currentIndex + 2) % total          // Far right (partial)
    ];
  };
  
  const visibleIndices = getVisibleIndices();
  
  return (
    <section 
      id="leadership" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white relative z-10"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Section Label */}
        <div className="mb-8">
          <div className="inline-block bg-[#e9edf5] px-4 py-2 rounded">
            <span className="text-[#324390] font-lato font-medium text-sm uppercase tracking-wider">
              LEADERSHIP TEAM
            </span>
          </div>
        </div>
        
        {/* Heading */}
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-lato text-[#324390] mb-12"
        >
          Our Management Team
        </h2>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="hidden md:block">
            <button 
              onClick={prevSlide}
              className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50"
              aria-label="Previous team member"
              disabled={isAnimating}
            >
              <ChevronLeft size={24} className="text-[#324390]" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors disabled:opacity-50"
              aria-label="Next team member"
              disabled={isAnimating}
            >
              <ChevronRight size={24} className="text-[#324390]" />
            </button>
          </div>
          
          {/* Desktop Carousel */}
          <div 
            ref={carouselRef}
            className="hidden md:block overflow-hidden"
          >
            <div className="flex justify-center items-stretch" style={{ margin: '0 -12px' }}>
              {/* Render all 5 cards (2 partial + 3 full) */}
              {visibleIndices.map((index, position) => {
                const member = teamWithImages[index];
                // Position 0: far left (partial), 1: left, 2: center, 3: right, 4: far right (partial)
                const isPartial = position === 0 || position === 4;
                const isVisible = position >= 0 && position <= 4;
                
                if (!isVisible) return null;
                
                return (
                  <div 
                    key={index}
                    className="px-4"
                    style={{
                      width: isPartial ? '12%' : '30%', // 12% for partials, 30% for full cards
                      transition: 'all 0.5s ease',
                    }}
                  >
                    <div 
                      className="transition-all duration-500 ease-in-out h-full"
                    >
                      <TeamMemberCard
                        name={member.name}
                        role={member.role}
                        image={member.image}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden">
            <div className="w-full">
              <TeamMemberCard
                name={teamWithImages[currentIndex].name}
                role={teamWithImages[currentIndex].role}
                image={teamWithImages[currentIndex].image}
              />
            </div>
          </div>
          
          {/* Mobile Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-6 md:hidden">
            {teamWithImages.map((_, index) => (
              <button
                key={index}
                onClick={() => !isAnimating && setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-[#324390]' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 