'use client';
import SectionWithCards from '@/components/companies/SectionWithCards';
import SectionNavigation from '@/components/companies/SectionNavigation';
import HeroSection from './HeroSection';
import ProductRangeSection from '@/components/companies/ProductRangeSection';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Investment Philosophy data for accordion section
const investmentCriteria = [
  {
    id: "barriers",
    title: "High Barriers to Entry",
    features: [
      "We invest in ventures with high barriers to entry to build defensibility and focused access.",
      "Looking for startups with unique positioning in challenging markets.",
      "Seeking businesses with proprietary technology, exclusive partnerships, or regulatory advantages.",
      "Focusing on companies that can maintain competitive advantage over time."
    ]
  },
  {
    id: "teams",
    title: "Complementary Teams",
    features: [
      "Founders with complementary, driven teams are our core focus.",
      "We value diverse skill sets and backgrounds that strengthen leadership.",
      "Looking for passionate entrepreneurs with domain expertise and execution ability.",
      "Seeking teams with clear vision and adaptability to market changes."
    ]
  },
  {
    id: "scalability",
    title: "Scalability Potential",
    features: [
      "Backing goes to startups with true scalability potential—not just ideas.",
      "Seeking business models that can grow efficiently with limited capital.",
      "Looking for solutions addressing large or rapidly growing markets.",
      "Focusing on ventures with clear paths to sustainable growth."
    ]
  },
  {
    id: "value-proposition",
    title: "Distinctive Value Proposition",
    features: [
      "We seek distinctive value propositions—innovative business models, services or products.",
      "Investing in solutions that solve significant problems in new ways.",
      "Looking for offerings with clear differentiation from existing alternatives.",
      "Supporting ventures that create meaningful impact in their target markets."
    ]
  }
];

// Our Approach cards data
const approachCards = [
  {
    title: "Strategic Fundraising",
    description: "Fundraising & strategic advising for early-stage ventures, helping navigate capital markets and optimize for growth."
  },
  {
    title: "Ecosystem Access",
    description: "Access to an entrepreneurial ecosystem—network connections, industry insights, and partnerships that accelerate development."
  },
  {
    title: "Hands-on Mentoring",
    description: "Hands-on mentoring grounded in startup and operational experience, providing guidance through critical growth stages."
  },
  {
    title: "Swift Decision Making",
    description: "Swift funding decision-making, backed by market-informed analysis, ensuring timely support when opportunities arise."
  }
];

// Areas of Interest data for product range section
const areasOfInterest = [
  {
    title: "E-Commerce",
    description: "Digital retail platforms, marketplace solutions, and innovative shopping experiences.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Agriculture",
    description: "AgTech innovations, sustainable farming solutions, and food supply chain technologies.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Education",
    description: "EdTech platforms, learning management systems, and skill development solutions.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Financial Services",
    description: "FinTech innovations, payment solutions, and financial inclusion technologies.",
    image: "/angel/finance-services.jpg"
  },
  {
    title: "Gaming",
    description: "Game development studios, gaming platforms, and interactive entertainment technologies.",
    image: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Healthcare",
    description: "HealthTech innovations, medical devices, and healthcare delivery platforms.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Hospitality",
    description: "Travel tech, hospitality management solutions, and guest experience platforms.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Information Technology",
    description: "Enterprise software, cloud solutions, and digital transformation technologies.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

// Section links for "In This Section" navigation
const sectionLinks = [
  {
    title: "Investment Philosophy",
    link: "#investment-philosophy"
  },
  {
    title: "Areas of Interest",
    link: "#areas-of-interest"
  },
  {
    title: "Our Approach",
    link: "#our-approach"
  },
  
];

// Accordion Item Component for Investment Philosophy
function AccordionItem({ id, title, features, isActive, onClick, index }) {
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
        <div className="text-[18px] leading-[28px] font-onest font-light text-gray-700">
          <ul className="list-disc pl-5 space-y-2">
            {features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Investment Philosophy Section with Accordion
function InvestmentPhilosophySection({ id, title, subtitle, criteria, sectionNumber }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const numberRef = useRef(null);
  const sectionTitleRef = useRef(null);
  const [activeItem, setActiveItem] = useState(criteria[0].id); // Default open item
  
  const handleItemClick = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const section = sectionRef.current;
    const heading = titleRef.current;
    const subtitle = subtitleRef.current;
    const number = numberRef.current;
    const sectionTitle = sectionTitleRef.current;
    
    if (!section) return;
    
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Animate section number and title if they exist
    if (number) {
      tl.fromTo(
        number,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
    
    if (sectionTitle) {
      tl.fromTo(
        sectionTitle,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }
    
    // Animate main title
    if (heading) {
      tl.fromTo(
        heading,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }
    
    // Animate subtitle
    if (subtitle) {
      tl.fromTo(
        subtitle,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }
    
    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);
  
  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="py-16 md:py-24 px-4 md:px-8 lg:px-24 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left column - Title and subtitle */}
          <div className="font-lato">
            {sectionNumber && (
              <div className="mb-8">
                <p ref={sectionTitleRef} className="text-sm uppercase tracking-wider font-lato text-gray-500 mb-2">IN THIS SECTION</p>
                <span ref={numberRef} className="text-4xl font-bold text-[#203663]">{sectionNumber}</span>
              </div>
            )}
            <h2 ref={titleRef} className="text-3xl uppercase md:text-4xl font-bold text-[#203663] mb-6">{title}</h2>
            <p ref={subtitleRef} className="text-xl text-gray-700">{subtitle}</p>
            
            <div className="mt-8 hidden lg:block">
              <div className="bg-[#203663]/10 p-6 rounded-lg">
                <h3 className="font-lato font-bold text-[#203663] mb-4">Our Investment Approach</h3>
                <p className="text-gray-700 font-onest font-light">
                  Since 2016, IQ Angel Investments has been identifying and supporting innovative startups with not just capital, but strategic guidance, industry connections, and operational expertise. We look beyond short-term gains to build lasting value in the companies we support.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right column - Accordion */}
          <div className="space-y-0">
            {criteria.map((item, index) => (
              <AccordionItem
                key={item.id}
                id={item.id}
                title={item.title}
                features={item.features}
                isActive={activeItem === item.id}
                onClick={handleItemClick}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AngelInvestmentsPage() {
  return (
    <div className="relative">
      <HeroSection
        title=""
        subtitle="Fueling high-potential startups with capital, mentorship, and unmatched access to global markets.
"
        backgroundImage="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        sideText="IQ Angel Investments"
        navTitle="COMPANIES"
      >
        <div className="mt-8">
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-[#203663] text-white font-medium rounded-md hover:bg-[#162849] transition-colors duration-300"
          >
            Pitch Your Startup →
          </Link>
        </div>
      </HeroSection>
      
      {/* In This Section navigation */}
      <div className="relative bg-white">
        <SectionNavigation links={sectionLinks} />
        
        {/* Investment Philosophy Section with Accordion */}
        <InvestmentPhilosophySection
          id="investment-philosophy"
          title="Investment Philosophy"
          subtitle="We invest in founders with vision, grit, and the ability to execute."
          criteria={investmentCriteria}
          sectionNumber="01"
        />

<ProductRangeSection
          id="areas-of-interest"
          title="Areas of Interest"
          subtitle="Innovative ideas need the right backing. We support entrepreneurs across diverse sectors."
          products={areasOfInterest}
          sectionNumber="02"
        />
        
        {/* Our Approach Section */}
        <SectionWithCards
          id="our-approach"
          title="Our Approach: Value Beyond Capital"
          subtitle="What We Bring to the Table"
          cards={approachCards}
          background="gray"
          sectionNumber="03"
        />
        
        {/* Areas of Interest Section */}
        
      </div>
    </div>
  );
}
