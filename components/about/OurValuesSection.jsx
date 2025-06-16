'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Value data from WHY CHOOSE US section of IQ Group website
const values = [
  {
    id: "responsibility",
    title: "Responsibility",
    description: "We take complete responsibility for our actions and efforts in the process of sourcing and supplying absolute quality raw materials to our clients."
  },
  {
    id: "quality",
    title: "Quality",
    description: "Being an ISO 9001-2008 certified Global Raw Material Sourcing Company, we maintain our promise of delivering quality raw materials following international quality standards in all our supplies."
  },
  {
    id: "commitment",
    title: "Commitment",
    description: "Each member of our raw material import and export chain has committed to achieving proficiency so our clients could have the excellent experience of trading with us."
  },
  {
    id: "transparency",
    title: "Transparency",
    description: "We ensure absolute transparency in our processes which makes us exclusively reliable. You can certainly trust and stay assured of our integrity."
  },
  {
    id: "teamwork",
    title: "Team Work",
    description: "We integrate a cooperative spirit in our work that enables us to combine the best skills to serve our dedicated vision of enhancing industrial resourcefulness."
  },
  {
    id: "punctuality",
    title: "Punctuality",
    description: "We ensure all our orders meet the agreed deadlines and hence do not disrupt customer supply chain."
  }
];

// Accordion Item Component
function AccordionItem({ id, title, description, isActive, onClick, index }) {
  const itemRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const item = itemRef.current;
    if (!item) return;
    
    // Animate item on scroll
    gsap.fromTo(item,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        },
        delay: index * 0.1 // Stagger effect
      }
    );
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === item) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  return (
    <div 
      ref={itemRef}
      className="border-b border-gray-200"
    >
      <button
        onClick={() => onClick(id)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        aria-expanded={isActive}
        aria-controls={`content-${id}`}
      >
        <h3 className="text-2xl md:text-3xl font-lato text-[#203663]">{title}</h3>
        <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-transform duration-300 text-[#203663] ${isActive ? 'transform rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>
      <div 
        id={`content-${id}`}
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
        aria-hidden={!isActive}
      >
        <p className="text-[18px] leading-[28px] font-onest font-light text-gray-700">{description}</p>
      </div>
    </div>
  );
}

export default function OurValuesSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const [activeItem, setActiveItem] = useState("quality"); // Default open item
  
  const handleItemClick = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    
    if (!section || !heading || !subtitle) return;
    
    // Animate heading and subtitle on scroll
    gsap.fromTo([heading, subtitle],
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out",
        stagger: 0.2,
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
  
  return (
    <section 
      id="our-values" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#f5f5f5]"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="md:grid md:grid-cols-12 md:gap-12">
          {/* Left Column - Title */}
          <div className="md:col-span-5 mb-8 md:mb-0">
            <div className="sticky top-24">
              <div className="inline-block bg-[#203663]/10 px-4 py-2 rounded-md mb-4">
                <span className="text-sm font-medium text-[#203663]">OUR VALUES</span>
              </div>
              <h2 
                ref={headingRef}
                className="text-4xl md:text-5xl font-bold font-lato text-[#203663] mb-4 leading-tight"
              >
                Upholding standards that define everything we do
              </h2>
            </div>
          </div>
          
          {/* Right Column - Accordion */}
          <div className="md:col-span-7">
            <div className="space-y-0">
              {values.map((value, index) => (
                <AccordionItem
                  key={value.id}
                  id={value.id}
                  title={value.title}
                  description={value.description}
                  isActive={activeItem === value.id}
                  onClick={handleItemClick}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 