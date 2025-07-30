'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import HeroSection from './herosection';
import ContentSection from '@/components/companies/ContentSection';
import SectionWithCards from '@/components/companies/SectionWithCards';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Company data
const companies = [
  {
    id: 'minerals-metals',
    name: 'IQ Minerals & Metals',
    description: 'Powering industries across 20+ nations with high-quality minerals and metals backed by two decades of global supply expertise.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/SiliconCroda.jpg',
    link: '/companies/minerals-metals'
  },
  {
    id: 'ferro-alloys',
    name: 'IQ Ferro Alloys',
    description: 'Premium ferro alloys for steel and foundry industries with consistent quality and reliable supply.',
    image: 'https://images.unsplash.com/photo-1547555706-54bcf05bbad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmVycm8lMjBhbGxveXxlbnwwfHwwfHx8MA%3D%3D',
    link: '/companies/ferro-alloys'
  },
  {
    id: 'noble-alloys',
    name: 'IQ Noble Alloys',
    description: 'Delivering high-grade noble alloys through an exclusive global distribution network for industries that shape the future.',
    image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?q=80&w=2000&auto=format&fit=crop',
    link: '/companies/noble-alloys'
  },
  {
    id: 'coke-coal',
    name: 'IQ Coke & Coal',
    description: 'Carbon materials delivered with precision, power, and consistency for global industrial applications.',
    image: 'https://images.unsplash.com/photo-1589007716619-42656585dd85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29hbHxlbnwwfHwwfHx8MA%3D%3D',
    link: '/companies/coke-coal'
  },
  {
    id: 'international',
    name: 'IQ International',
    description: 'Leading the global chemical supply sector by combining bold entrepreneurship with modern strategy and a network built on trust.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    link: '/companies/international'
  },
  {
    id: 'angel-investments',
    name: 'IQ Angel Investments',
    description: 'Fueling the next generation of innovators with capital, mentoring, and market access since 2016.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    link: '/companies/angel-investments'
  },
  {
    id: 'green-energy',
    name: 'IQ Green Energy',
    description: 'Hybrid wind and solar solutions for a cleaner, more sustainable future with innovative technology.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    link: '/companies/green-energy'
  },
];

// What Sets Us Apart data
const valueProps = [
  {
    title: "Global Network & Local Expertise",
    description: "Bridging continents with seamless logistics and trusted partnerships in over 20 countries."
  },
  {
    title: "End-to-End Supply Chain Control",
    description: "From sourcing to delivery, we ensure quality and reliability at every step of the process."
  },
  {
    title: "Commitment to Quality",
    description: "ISO-certified processes and rigorous standards in every division of our operations."
  },
  {
    title: "Innovation in Every Sector",
    description: "Pioneering solutions in energy, materials, and technology for sustainable growth."
  }
];

export default function CompaniesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const companiesSectionRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  const handleOptionClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers = [];
    
    companies.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="companies-page">
      {/* Hero Section */}
      <HeroSection
        title=""
        subtitle="Discover IQ Group’s dynamic portfolio—where raw materials, energy, tech, and capital meet innovation.
"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        sideText="IQ Group Companies"
        navTitle="COMPANIES"
      />
      
      {/* What Sets Us Apart Section */}
      <div className="relative z-20 bg-white">
        
        <SectionWithCards
          id="what-sets-us-apart"
          title="What Sets Us Apart"
          subtitle="Why global leaders choose IQ Group"
          cards={valueProps}
          hasDivider={false}
          sectionNumber="01"
        />
        
        {/* Interactive Companies Section */}
        <section ref={companiesSectionRef} className="py-16 md:py-24 px-4 md:px-8 lg:px-24 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="text-sm uppercase tracking-wider font-lato text-gray-500 mb-2">IN THIS SECTION</p>
              <span className="text-4xl font-bold text-[#203663]">02</span>
              <h2 className="text-3xl uppercase md:text-4xl font-bold text-[#203663] mt-6 mb-4">Our Companies</h2>
              <p className="text-xl text-gray-700">From raw materials to renewable energy, from global trading to startup investments—each IQ Group company is a leader in its field.</p>
            </div>
            
            {/* Mobile View */}
            {isMobile && (
              <div className="grid grid-cols-1 gap-6">
                {companies.map((company, index) => (
                  <Link href={company.link} key={company.id}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                      <div className="relative h-48">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${company.image})` }}
                        >
                          <div className="absolute inset-0 bg-[#203663] opacity-30"></div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#203663] mb-2">{company.name}</h3>
                        <p className="text-gray-700 mb-4">{company.description}</p>
                        <div className="flex justify-end">
                          <span className="inline-flex items-center text-[#203663] font-semibold">
                            View More
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            {/* Desktop View - Interactive Selector */}
            {!isMobile && (
              <div className="options flex w-full max-w-full h-[500px] mx-0 items-stretch overflow-hidden relative rounded-xl">
                <div className="bg-black/50 absolute inset-0"></div>
                {companies.map((company, index) => (
                  <div
                    key={company.id}
                    className="option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer"
                    style={{
                      backgroundImage: `url(${company.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backfaceVisibility: 'hidden',
                      opacity: animatedOptions.includes(index) ? 1 : 0,
                      transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                      minWidth: '60px',
                      minHeight: '100%',
                      margin: 0,
                      borderRadius: 0,
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: activeIndex === index ? '#fff' : '#292929',
                      backgroundColor: '#18181b',
                      boxShadow: activeIndex === index 
                        ? '0 20px 60px rgba(0,0,0,0.50)' 
                        : '0 10px 30px rgba(0,0,0,0.30)',
                      flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
                      zIndex: activeIndex === index ? 10 : 1
                    }}
                    onMouseEnter={() => handleOptionClick(index)}
                  >
                    {/* Shadow gradient overlay */}
                    <div 
                      className="shadow absolute left-0 right-0 bottom-0 pointer-events-none  transition-all duration-700 ease-in-out"
                      style={{
                        height: '180px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
                      }}
                    ></div>
                    
                    {/* Content */}
                    <div className="absolute left-0 right-0 bottom-0 p-6 z-10 pointer-events-none">
                      <h3 
                        className="text-2xl font-bold text-white mb-2 transition-all duration-700 ease-in-out"
                        style={{
                          opacity: activeIndex === index ? 1 : 0,
                          transform: activeIndex === index ? 'translateY(0)' : 'translateY(20px)'
                        }}
                      >
                        {company.name}
                      </h3>
                      <p 
                        className="text-gray-200 mb-4 transition-all duration-700 ease-in-out"
                        style={{
                          opacity: activeIndex === index ? 1 : 0,
                          transform: activeIndex === index ? 'translateY(0)' : 'translateY(20px)',
                          maxWidth: '80%'
                        }}
                      >
                        {company.description}
                      </p>
                      <Link 
                        href={company.link}
                        className="inline-flex items-center px-4 py-2 bg-white text-[#203663] font-medium rounded transition-all duration-700 ease-in-out pointer-events-auto"
                        style={{
                          opacity: activeIndex === index ? 1 : 0,
                          transform: activeIndex === index ? 'translateY(0)' : 'translateY(20px)'
                        }}
                      >
                        View More
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 