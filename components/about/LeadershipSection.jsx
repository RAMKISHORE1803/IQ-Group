'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Leadership team data from actual IQ Group website
const leadershipTeam = [
  {
    name: "Shikhar Chand Bothra",
    role: "Chairman & MD",
    bio: "A commerce graduate with four decades of manufacturing mastery, he builds empires where others see possibilities. From establishing industries to pioneering governance excellence, his vision doesn't just diversify it dominates. The backbone of demographic expansion, he transforms engaged investing into unstoppable growth. Industry legends aren't born; they're forged through relentless commitment and uncompromising vision. When experience meets passion, businesses don't just expand they conquer. ",
    image: "/Images/Management/Shikar.jpg"
  },
  {
    name: "Shakuntala Bothra",
    role: "Chairperson - IQ Foundation",
    bio: "A commerce leader with three decades of vision, she transforms lives through IQ Foundation's unrelenting mission. From remote villages to forgotten communities, her leadership drives breakthrough initiatives in education, healthcare, and cultural preservation. Thousands empowered. Communities reborn. One foundation proving that when purpose meets relentless action, the impossible becomes inevitable. Because every life deserves its moment to rise.",
    image: "/Images/Management/Shakuntala.jpg"
  },
  {
    name: "Siddharth Bothra",
    role: "Chief Executive Officer (CEO)",
    bio: "A commerce graduate turned global strategist, he's the force that propelled IQ Group beyond boundaries. Two decades across metallurgy and international trade forged his vision—transforming risk into opportunity, relationships into results. His strategic roadmap doesn't just deliver returns; it redefines what's possible. The public face with unmatched client connections, he proves that when precision meets passion, businesses don't just grow they dominate.",
    image: "/Images/Management/Siddarth.jpg"
  },
  {
    name: "Jagruti Bothra",
    role: "Chief Financial Officer (CFO)",
    bio: "A commerce graduate who transforms numbers into strategy. As Group CFO, she commands finance with surgical precision—turning 15 years of expertise into operational excellence. From treasury to crisis management, human resources to strategic planning, she doesn't just manage risk—she weaponizes it for growth. When others see challenges, she sees opportunities waiting to be unlocked. Because true leadership isn't about balance sheets. it's about building futures.",
    image: "/Images/Management/Jagruti.jpg"
  },
  {
    name: "Zhou Hao",
    role: "Chief Operating Officer (COO)",
    bio: "A master of International Business who turns global complexity into competitive advantage. Twenty-two years across Asia Pacific and EU forged his expertise—commanding Hong Kong and China operations with precision that reshapes markets. Deep commodity intelligence meets flawless logistics execution. He doesn't just expand footprints; he conquers territories. When others see borders, he sees bridges to boundless opportunity. Because global dominance demands more than vision—it demands execution.",
    image: "https://www.iqgroup.in/image/team/5.jpg"
  }
];

// Modal component for detailed view
const ExecutiveModal = ({ executive, isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Smooth slide in animation
      gsap.fromTo(modalRef.current, 
        { 
          x: '100%',
          opacity: 0
        }, 
        { 
          x: '0%',
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }
      );
    }

    // Cleanup function to restore scroll when modal closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current) {
      // Restore body scroll before closing
      document.body.style.overflow = 'unset';
      
      // Smooth slide out animation
      gsap.to(modalRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: onClose
      });
    }
  };

  if (!isOpen || !executive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="absolute right-0 top-0 h-full w-full max-w-4xl lg:max-w-[1300px] bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 cursor-pointer z-10 p-2 text-gray-600 hover:text-gray-900 hover: transition-colors bg-white/80 backdrop-blur-sm "
          aria-label="Close modal"
        >
          <X size={24} className='hover:rotate-90 transition-all duration-300' />
        </button>

        {/* Modal content - Scrollable */}
        <div className="flex flex-col lg:flex-row  gap-8  w-full md:justify-center md:pt-[15vh] md:ml-[-40px] md:items-center">
        <div className="h-full overflow-y-auto">
          <div className="p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-[10vw] max-w-5xl">
              {/* Executive image - Left side, smaller */}
              <div className="flex-shrink-0">
                <div className="w-80 h-96 lg:w-72 lg:h-80 relative bg-gray-100  overflow-hidden">
                  <Image 
                    src={executive.image} 
                    alt={executive.name}
                    fill
                    className="object-cover object-[0%_25%]"
                    priority
                  />
                </div>
              </div>

              {/* Executive details - Right side */}
              <div className="flex-1 flex flex-col justify-start pt-4 md:pl-[50px]">
                <div className="max-w-2xl">
                  <h2 className="text-4xl lg:text-5xl font-bold font-lato text-[#203663] mb-3 leading-tight">
                    {executive.name}
                  </h2>
                  
                  <p className=" lg:text-[24px] text-[#000] mb-8 font-medium font-lato">
                    {executive.role}
                  </p>
                  
                  <div className="space-y-4 lg:max-w-[510px]">
                    <p className=" lg:text-[20px] text-gray-800 leading-relaxed">
                      {executive.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function LeadershipSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedExecutive, setSelectedExecutive] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    if (!isAutoPlaying || isModalOpen) {
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
  }, [isAutoPlaying, currentIndex, maxIndex, isModalOpen]);
  
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

  // Handle card click to open modal
  const handleCardClick = (member) => {
    setSelectedExecutive(member);
    setIsModalOpen(true);
    setIsAutoPlaying(false);
  };

  // Handle modal close
  const handleModalClose = () => {
    // Restore body scroll
    document.body.style.overflow = 'unset';
    
    setIsModalOpen(false);
    setSelectedExecutive(null);
    setTimeout(() => setIsAutoPlaying(true), 1000);
  };

  // Create extended array for smooth infinite scrolling
  const extendedTeam = [...leadershipTeam, ...leadershipTeam];
  
  return (
    <>
      <section 
        id="leadership" 
        ref={sectionRef}
        className="py-16 md:py-24 bg-white relative z-10"
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          {/* Heading */}
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-lato text-[#203663] mb-12"
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
                    className="flex-shrink-0 cursor-pointer px-3 transition-transform hover:scale-105"
                    style={{ width: `${100/visibleSlidesCount}%` }}
                    onClick={() => handleCardClick(member)}
                  >
                    <div className="h-[450px] overflow-hidden mb-4 relative  shadow-lg">
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        fill
                        className="object-cover object-[0%_25%] transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="bg-white py-4 px-4">
                      <h3 className="text-xl font-lato font-bold text-[#203663] mb-1 whitespace-nowrap overflow-hidden text-ellipsis">{member.name}</h3>
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
                    onClick={() => handleCardClick(member)}
                  >
                    <div className="h-[380px] relative overflow-hidden mb-4  shadow-lg">
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

      {/* Executive Detail Modal */}
      <AnimatePresence>
        <ExecutiveModal 
          executive={selectedExecutive}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </AnimatePresence>
    </>
  );
}