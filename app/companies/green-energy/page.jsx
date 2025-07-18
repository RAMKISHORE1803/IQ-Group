'use client';
import CompanyTemplate from '@/components/companies/CompanyTemplate';
import ContentSection from '@/components/companies/ContentSection';
import ContactCTA from '@/components/companies/ContactCTA';
import ProductCard from '@/components/companies/ProductCard';
import SectionWithCards from '@/components/companies/SectionWithCards';
import SectionNavigation from '@/components/companies/SectionNavigation';
import HeroSection from '@/components/about/HeroSection';
import ProductRangeSection from '@/components/companies/ProductRangeSection';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const capabilityCards = [
    {
      title: "Diverse Power Range",
      description: "Offers small wind turbines from 650 W to 5.1 kW, hybrid solar-wind systems up to 200 kW, and micro wind farms up to 0.4 MW, suitable for both residential and institutional use."
    },
    {
      title: "Superior Low-Wind Performance",
      description: "All models use rare earth neodymium magnets, enabling high energy output even at low wind speeds, maximizing efficiency throughout the year."
    },
    {
      title: "Advanced Angle Control Mechanism",
      description: "Features a unique angle-governed control system that optimizes blade positioning and energy generation under varying wind conditions—unlike traditional mechanical braking systems."
    },
    {
      title: "Durable & Noise-Free Operation",
      description: "Built with stainless steel casings and rugged construction, the turbines are engineered for quiet, vibration-free operation, making them ideal for urban rooftops, schools, and remote locations."
    }
  ];

  const sectionLinks = [
    {
      title: "Our Capabilities",
      link: "#our-capabilities"
    },
    {
      title: "Product Range",
      link: "#product-range"
    }
  ];

  // Product data from IQ Green Energy website
  const products = [
    {
      id: "ue42plus",
      title: "UE 42 plus / 5.1 KW",
      features: [
        "Lowest cost per watt",
        "Neo magnets for long life",
        "High outputs for low winds",
        "Unique angle governing",
        "Sustained angle governing",
        "Ruggedized body frame",
        "Stainless steel components",
        "Whisper quiet"
      ]
    },
    {
      id: "ue42",
      title: "UE 42 / 4.2 KW",
      features: [
        "Lowest cost per watt",
        "Neo magnets for long life",
        "High outputs for low winds",
        "Unique angle governing",
        "Sustained output in high winds",
        "Ruggedized body frame",
        "Stainless steel components",
        "Whisper quiet"
      ]
    },
    {
      id: "ue33",
      title: "UE 33 / 3.3 KW",
      features: [
        "Lowest cost per watt",
        "Neo magnets for long life",
        "High outputs for low winds",
        "Unique angle governing",
        "Sustained output in high winds",
        "Ruggedized body frame",
        "Stainless steel components",
        "Whisper quiet"
      ]
    },
    {
      id: "ue15plus",
      title: "UE 15 Plus / 1.8 KW",
      features: [
        "Lowest cost per watt",
        "Neo magnets for long life",
        "High outputs for low winds",
        "Unique angle governing",
        "Sustained output in high winds",
        "Ruggedized body frame",
        "Stainless steel components",
        "Whisper quiet"
      ]
    },
    {
      id: "ue15",
      title: "UE 15 / 1.5 KW",
      features: [
        "Lowest cost per watt",
        "Neo magnets for long life",
        "High outputs for low winds",
        "Unique angle governing",
        "Sustained output in high winds",
        "Ruggedized body frame",
        "Stainless steel components",
        "Whisper quiet"
      ]
    },
    {
      id: "ue6",
      title: "UE 6 / 650 W",
      features: [
        "Lowest cost per watt",
        "Neo magnets for long life",
        "High outputs for low winds",
        "Unique angle governing",
        "Sustained output in high winds",
        "Ruggedized body frame",
        "Stainless steel components",
        "Whisper quiet"
      ]
    }
  ];

  // Accordion Item Component for Product Range
  function ProductAccordionItem({ id, title, features, isActive, onClick, index }) {
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
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Custom Product Range Section with Accordion
  function ProductRangeAccordion({ id, title, subtitle, products, sectionNumber }) {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const numberRef = useRef(null);
    const sectionTitleRef = useRef(null);
    const [activeItem, setActiveItem] = useState(products[0].id); // Default open item
    
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
                  <h3 className="font-lato font-bold text-[#203663] mb-4">Why Choose Our Wind Turbines</h3>
                  <p className="text-gray-700 font-onest font-light">
                    Our company aims at offering hybrid Renewable energy solutions to promote ecological power supply. 
                    We focus on combining the technologies of Mini Windmill and solar energy to provide sustainable power 
                    solutions for residential, commercial, and institutional applications.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right column - Accordion */}
            <div className="space-y-0">
              {products.map((product, index) => (
                <ProductAccordionItem
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  features={product.features}
                  isActive={activeItem === product.id}
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

  export default function GreenEnergyPage() {
    return (
      <div className="relative">
        <HeroSection
          title=""
          subtitle="IQ Green Energy fuses wind and sun into one seamless system—clean, quiet, and built for the future. From rooftops to remote microgrids, we make renewable energy effortless."
          backgroundImage="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          sideText="IQ Green Energy"
          navTitle="COMPANIES"
        />
        {/* In This Section navigation */}
        <div className="relative bg-white">
          <SectionNavigation links={sectionLinks} />
          
          {/* Our Capabilities Section */}
          <SectionWithCards
            id="our-capabilities"
            title="Our Capabilities"
            subtitle="End-to-end renewable energy solutions for a sustainable future."
            cards={capabilityCards}
            background="gray"
            sectionNumber="01"
          />
          
          {/* Product Range Section with Accordion */}
          <ProductRangeAccordion
            id="product-range"
            title="Our Product Range"
            subtitle="Premium wind turbines for diverse energy needs"
            products={products}
            sectionNumber="02"
          />
          
          {/* Contact CTA */}
          <ContentSection>
            <ContactCTA 
              title="Ready to discuss your renewable energy requirements?" 
              description="Our industry experts are available to help you find the right solution for your needs."
            />
          </ContentSection>
        </div>
      </div>
    );
  } 