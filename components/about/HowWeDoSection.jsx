'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Process steps data with minimalist Apple/Nike-style copy
const processSteps = [
  {
    id: "direct-sourcing",
    title: "Direct Sourcing",
    description: "Mine to market. Zero intermediaries. Quality guaranteed.",
    image: "https://images.unsplash.com/photo-1518085250887-2f903c200fee?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "quality-verification",
    title: "Quality Verification At Loading Port",
    description: "Molecular precision. Rigorous standards. Certified excellence.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "logistics",
    title: "Logistics",
    description: "Global networks. Real-time tracking. Flawless execution.",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "warehousing",
    title: "Warehousing",
    description: "Strategic locations. Climate-controlled. Just-in-time readiness.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "end-users",
    title: "End Users",
    description: "Final mile perfection. Production-ready materials. When you need them.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop",
  }
];

// Process Step Component
function ProcessStep({ title, description, image, index, inView }) {
  return (
    <div 
      className={`mb-16 md:mb-48 transition-opacity duration-300 ${inView ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
        {/* Image - Full height on left side */}
        <div className="relative h-[250px] md:h-[500px] w-full overflow-hidden rounded-lg shadow-md">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        
        {/* Content - Right side */}
        <div className="py-4 md:py-6">
          <span className="text-[#324390] font-lato font-medium text-base md:text-lg">Step {index + 1}</span>
          <h3 className="text-2xl md:text-4xl font-bold font-lato text-[#324390] mt-2 mb-4 md:mb-6">{title}</h3>
          <p className="text-lg md:text-[24px] leading-tight font-onest font-light text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HowWeDoSection() {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const stepsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSteps, setActiveSteps] = useState({});
  const [marginClass, setMarginClass] = useState("");

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 1486) {
      setMarginClass("ml-[-7vw]");
    } else {
      setMarginClass("ml-0");
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set up scroll animations
    const timer = setTimeout(() => {
      if (isMobile) {
        // Mobile animations - just trigger step visibility
        stepsRef.current.forEach((step, index) => {
          if (!step) return;
          
          ScrollTrigger.create({
            trigger: step,
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => {
              setActiveSteps(prev => ({ ...prev, [index]: true }));
            },
            onLeaveBack: () => {
              setActiveSteps(prev => ({ ...prev, [index]: false }));
            },
          });
        });
        
        return;
      }
      
      const section = sectionRef.current;
      const leftColumn = leftColumnRef.current;
      
      if (!section || !leftColumn) return;
      
      // Clear any existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
      
      // Pin the left column while scrolling
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftColumn,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
      
      // Create scroll triggers for each step
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        
        ScrollTrigger.create({
          trigger: step,
          start: 'top center+=100',
          end: 'bottom center',
          onEnter: () => {
            setActiveSteps(prev => ({ ...prev, [index]: true }));
          },
          onLeaveBack: () => {
            setActiveSteps(prev => ({ ...prev, [index]: false }));
          },
        });
      });
    }, 200);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
      
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);

  // Reset refs array when steps change
  stepsRef.current = [];

  return (
    <section 
      id="how-we-do" 
      ref={sectionRef}
      className="relative bg-white py-16 md:py-0 "
    >
      <div className="container mx-auto px-4 md:px-0">
        {/* Mobile Header - Only visible on mobile */}
        <div className="md:hidden mb-8">
          <h2 className="text-3xl font-bold font-lato text-[#203663] mb-4">
            How We Do
          </h2>
          <p className="text-xl leading-tight font-onest font-light text-gray-700 mb-6">
            Material excellence. <br/>
            Source to destination. <br/>
            Without compromise.
          </p>
          
          {/* Mobile CTA Button */}
          <div className="mt-6">
            <button className="bg-[#203663] text-white hover:bg-[#324390] transition-colors py-3 px-5 text-base font-onest">
              Contact Our Experts
            </button>
          </div>
        </div>
        
        <div className={`md:grid md:grid-cols-12 md:gap-8 ${marginClass}}`}>
          {/* Left Column - Fixed CTA - Hidden on mobile */}
          <div
            ref={leftColumnRef}
            className={`hidden md:block col-span-4 lg:col-span-3 bg-[#203663] px-4 md:px-0 md:pl-8 mb-4 md:mb-0 `}
          >
            <div className="md:h-screen md:flex md:flex-col md:justify-center md:sticky md:top-0">
              <div className="max-w-xs">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-lato text-[#fbfbfb] mb-6">
                  How We Do
                </h2>
                <p className="text-[24px] leading-tight font-onest font-light text-gray-200 mb-8">
                  Material excellence. <br/>
                  Source to destination. <br/>
                  Without compromise.
                </p>
                
                {/* CTA Button - More minimalist */}
                <div className="mt-8">
                  <button className="bg-[#fbfbfb] cursor-pointer text-[#324390] hover:bg-[#324390] hover:text-[#fbfbfb] transition-colors py-4 px-6 text-lg font-onest">
                    Contact Our Experts
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Process Steps */}
          <div className="md:col-span-8 lg:col-span-9 md:pr-8">
            <div className="py-4 md:py-16 space-y-12 md:space-y-24">
              {processSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  ref={el => stepsRef.current[index] = el}
                >
                  <ProcessStep 
                    title={step.title}
                    description={step.description}
                    image={step.image}
                    index={index}
                    inView={isMobile ? true : activeSteps[index]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 