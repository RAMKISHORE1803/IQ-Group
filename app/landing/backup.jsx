'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Company data - First set
const companies = [
  {
    id: 1,
    name: 'IQ International',
    category: 'Chemical',
    description: 'Supplying high-quality chemicals and raw materials to industries worldwide.',
    image: 'https://images.unsplash.com/photo-1616661317487-3d363255ea78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    commodities: ['Industrial Chemicals', 'Specialty Chemicals', 'Pharmaceutical Intermediates', 'Agricultural Chemicals']
  },
  {
    id: 2,
    name: 'IQ Minerals & Metals',
    category: 'Minerals and Metals',
    description: 'Global supplier of premium minerals and metals for various industrial applications.',
    image: 'https://images.unsplash.com/photo-1618730311271-eda8fddb0daf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    commodities: ['Precious Metals', 'Base Metals', 'Industrial Minerals', 'Rare Earth Elements']
  },
  {
    id: 3,
    name: 'IQ Coal & Coke',
    category: 'Carbon Materials',
    description: 'Specialized in high-quality carbon materials for energy and metallurgical industries.',
    image: 'https://images.unsplash.com/photo-1624387832956-1ac335465c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    commodities: ['Metallurgical Coal', 'Thermal Coal', 'Petroleum Coke', 'Carbon Additives']
  }
];

// Company data - Second set
const companiesSecondSet = [
  {
    id: 4,
    name: 'IQ Ferro Alloys',
    category: 'Ferro Alloys',
    description: 'Leading supplier of high-quality ferro alloys for steel manufacturing and various industrial applications.',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    commodities: ['Ferro Silicon', 'Ferro Manganese', 'Silico Manganese', 'Ferro Chrome']
  },
  {
    id: 5,
    name: 'IQ Noble Alloys',
    category: 'Noble Alloys',
    description: 'Specialized in manufacturing and supplying premium noble alloys for advanced technological applications.',
    image: 'https://images.unsplash.com/photo-1594737959857-b9ee1667af9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    commodities: ['Titanium Alloys', 'Nickel Alloys', 'Cobalt Alloys', 'Platinum Group Metals']
  },
  {
    id: 6,
    name: 'IQ Green Energy',
    category: 'Renewable Energy Solutions',
    description: 'Providing sustainable energy solutions with cutting-edge technology and innovative designs.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    commodities: [
      'UE 42 plus / 5.1 KW',
      'UE 42 / 4.2 KW',
      'UE 33 / 3.3 KW',
      'UE 15 Plus / 1.8 KW',
      'UE 15 / 1.5 KW',
      'UE 6 / 650 W'
    ]
  }
];

// Flip Card Component
const FlipCard = ({ company }) => {
  return (
    <div className="flip-card w-full h-[500px] perspective-1000">
      <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d shadow-xl rounded-xl">
        {/* Front */}
        <div className="flip-card-front absolute w-full h-full backface-hidden bg-gray-900 rounded-xl overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={company.image}
              alt={company.name}
              fill
              className="object-cover rounded-xl opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{company.name}</h3>
              <p className="text-sky-300 font-light text-sm md:text-base">{company.category}</p>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="flip-card-back absolute w-full h-full backface-hidden bg-gradient-to-br from-[#041174] to-[#010A4E] rounded-xl rotate-y-180 p-6 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-3">{company.name}</h3>
          <p className="text-sky-300 font-light text-sm md:text-base mb-4">{company.category}</p>
          <div>
            <h4 className="text-lg font-semibold mb-2">Commodities:</h4>
            <ul className="space-y-1 max-h-[180px] overflow-y-auto pr-2">
              {company.commodities.map((commodity, index) => (
                <li key={index} className="flex items-center text-gray-200 text-sm md:text-base">
                  <span className="mr-2 text-sky-300">•</span>
                  {commodity}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-gray-300 font-light text-sm md:text-base">{company.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function CompaniesSection() {
  const sectionRef = useRef(null);
  const firstCardsContainerRef = useRef(null);
  const secondCardsContainerRef = useRef(null);

  useEffect(() => {
    // Need to ensure we're in the browser
    if (typeof window === 'undefined') return;
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    const timer = setTimeout(() => {
      console.log("Setting up ScrollTrigger for Companies Section");
      
      const section = sectionRef.current;
      const firstCardsContainer = firstCardsContainerRef.current;
      const secondCardsContainer = secondCardsContainerRef.current;
      const firstCards = firstCardsContainer.querySelectorAll('.flip-card');
      const secondCards = secondCardsContainer.querySelectorAll('.flip-card');
      
      if (!section || !firstCardsContainer || !secondCardsContainer) {
        console.error("Missing elements for animation");
        return;
      }

      // Set initial states
      gsap.set(secondCardsContainer, { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        zIndex: 0
      });
      
      // Create animation timeline
      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 20%",
          end: "center center",
          scrub: 1,
          markers: false,
          toggleActions: "play none none reverse",
        }
      });
      
      // First, animate first cards - initial animation when they come into view
      cardsTl.fromTo(firstCards, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        0
      );
      
      // Second timeline for overlay animation
      const overlayTl = gsap.timeline({
        scrollTrigger: {
          trigger: firstCardsContainer,
          start: "bottom 70%",
          end: "bottom 30%",
          scrub: 1,
          markers: true,
        }
      });
      
      // Animate first cards to shrink back and reduce opacity
      overlayTl.to(firstCardsContainer, { 
        scale: 0.9, 
        opacity: 0.7, 
        zIndex: 0,
        filter: "blur(2px)",
        duration: 1.5
      }, 0);
      
      // Animate second cards to slide in from above
      overlayTl.to(secondCardsContainer, {
        y: -650,
        opacity: 1,
        scale: 1,
        duration: 1.5
      }, 0);
      
      console.log("ScrollTrigger animations created for cards");
      
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20  md:py-32 overflow-hidden bg-gradient-to-r from-[#010A4E] to-[#041174] relative"
      id="companies-section"
    >
      <div className="container  min-h-screen mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Our Companies
        </h2>
        
        {/* Cards container with relative positioning for stacking */}
        <div className=" h-[600px] md:h-[480px]">
          {/* First set of cards */}
          <div 
            ref={firstCardsContainerRef}
            className="grid grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto pb-[20px] "
          >
            {companies.map(company => (
              <FlipCard key={company.id} company={company} />
            ))}
          </div>

          {/* <div className="h-[60px]"></div>  */}
          
          {/* Second set of cards - positioned absolutely to overlay */}
          <div 
            ref={secondCardsContainerRef}
            className="grid grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto "
          >
            {companiesSecondSet.map(company => (
              <FlipCard key={company.id} company={company} />
            ))}
          </div>
          <div className="h-[1000px]"></div> 
        </div>
        
      </div>
      
      {/* Custom styles for 3D flip effect */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
      `}</style>
      <div  className="h-[500px]"></div>
    </section>
  );
}