'use client';
import CompanyTemplate from '@/components/companies/CompanyTemplate';
import ContentSection from '@/components/companies/ContentSection';
import ContactCTA from '@/components/companies/ContactCTA';
import ProductCard from '@/components/companies/ProductCard';
import SectionWithCards from '@/components/companies/SectionWithCards';
import SectionNavigation from '@/components/companies/SectionNavigation';
import HeroSection from '@/components/about/HeroSection';
import ProductRangeSection from '@/components/companies/ProductRangeSection';
import TimelineDemo from '@/components/ui/timeline-demo';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Value cards data for "Why Choose DAB Worldwide" section
const valueCards = [
  {
    title: "Global Market Access",
    description: "We help innovative startups break into new regions with expert branding, positioning, and market entry strategies."
  },
  {
    title: "In-depth Research & Analysis",
    description: "We base decisions on unbiased, open-source market insights to build impactful consumer propositions."
  },
  {
    title: "Proven Go-to-Market Execution",
    description: "From launch planning to campaign rollout, we manage your market entry and monitor success through new business pipelines."
  },
  {
    title: "Strategic Growth Partnership",
    description: "We don't just consult—we partner with you for the long term, aligning our success with your international growth milestones."
  }
];

// Capability cards data for "Our Capabilities" section
const capabilityCards = [
  {
    title: "Brand Strategy & Development",
    description: "We create compelling brand identities that resonate across cultures and markets, positioning your innovation for global recognition."
  },
  {
    title: "Market Entry Planning",
    description: "Our strategic roadmaps guide your expansion into new territories with precise timing, messaging, and distribution channels."
  },
  {
    title: "Digital Marketing Campaigns",
    description: "We design and execute data-driven campaigns that generate awareness, leads, and conversions in your target markets."
  },
  {
    title: "Growth Analytics & Optimization",
    description: "Continuous performance tracking and optimization ensure your marketing investments deliver maximum ROI and scalable growth."
  }
];

// Services data for accordion
const services = [
  {
    id: "market-research",
    title: "Strategic Market Research",
    features: [
      "We base every insight on unbiased open-source research.",
      "Identify real-world demand gaps across global markets.",
      "Decode consumer behaviour and emerging category trends.",
      "Evaluate competitive landscape to position products effectively."
    ]
  },
  {
    id: "branding",
    title: "Branding & Positioning",
    features: [
      "Craft differentiated brand stories that resonate globally.",
      "Position offerings with emotional and functional clarity.",
      "Shape identity around a clear value proposition.",
      "Build frameworks for long-term brand growth and recall."
    ]
  },
  {
    id: "launch",
    title: "Launch Planning & Execution",
    features: [
      "Design launch strategies tailored to regional markets.",
      "Activate 360° go-to-market plans: from digital to in-store.",
      "Work closely with founders for first-impression precision.",
      "Enable measurable demand creation at launch."
    ]
  },
  {
    id: "analytics",
    title: "Performance Analytics",
    features: [
      "Set up performance-tracking systems from Day 1.",
      "Monitor launch and campaign KPIs in real time.",
      "Deliver actionable insights to optimize campaigns.",
      "Ensure a repeatable growth framework post-launch."
    ]
  },
  {
    id: "growth",
    title: "Full-spectrum Growth Enablement",
    features: [
      "Guide startups from ideation to international scale.",
      "Tap into our two-decade expertise in global marketing.",
      "Build long-term roadmaps for market expansion.",
      "Serve as hands-on partners, not just advisors."
    ]
  }
];

// Process steps data for How We Work section
const processSteps = [
  {
    id: "understand-vision",
    title: "Understand your vision",
    description: "Deep discovery. Aligned goals. Foundation for success.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "market-research",
    title: "Conduct unbiased market research",
    description: "Data-driven insights. Opportunity mapping. Competitive advantage.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "value-proposition",
    title: "Build a unique value proposition",
    description: "Compelling positioning. Emotional resonance. Market differentiation.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "launch-execution",
    title: "Design & execute your launch",
    description: "Precision planning. Flawless execution. Immediate traction.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "performance-monitoring",
    title: "Monitor & optimize performance",
    description: "Real-time analytics. Continuous improvement. Sustainable growth.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  }
];

// Section links for "In This Section" navigation
const sectionLinks = [
//   {
//     title: "What is DAB Worldwide",
//     link: "#what-is-dab"
//   },
  {
    title: "Why choose DAB",
    link: "#why-choose-dab"
  },
  {
    title: "Our capabilities",
    link: "#our-capabilities"
  },
  {
    title: "Our services",
    link: "#our-services"
  },
  {
    title: "How we work",
    link: "#how-we-work"
  }
];

// Accordion Item Component for Services
function ServiceAccordionItem({ id, title, features, isActive, onClick, index }) {
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

// Custom Services Section with Accordion
function ServicesAccordion({ id, title, subtitle, services, sectionNumber }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const numberRef = useRef(null);
  const sectionTitleRef = useRef(null);
  const [activeItem, setActiveItem] = useState(services[0].id); // Default open item
  
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
                <h3 className="font-lato font-bold text-[#203663] mb-4">Why Partner With DAB</h3>
                <p className="text-gray-700 font-onest font-light">
                  DAB Worldwide has over two decades of experience helping innovative startups achieve marketing supremacy. 
                  We collaborate with businesses that have exceptional products and ideas, helping them harness our proven 
                  marketing strategies to create a strong market presence internationally.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right column - Accordion */}
          <div className="space-y-0">
            {services.map((service, index) => (
              <ServiceAccordionItem
                key={service.id}
                id={service.id}
                title={service.title}
                features={service.features}
                isActive={activeItem === service.id}
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

// Process Step Component
function ProcessStep({ title, description, image, index, inView }) {
  return (
    <div 
      className={`mb-16 md:mb-48 transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Image - Full height on left side */}
        <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden ">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        
        {/* Content - Right side */}
        <div className="py-4 md:py-6">
          <span className="text-[#203663] font-lato font-medium text-lg">Step {index + 1}</span>
          <h3 className="text-2xl md:text-4xl font-bold font-lato text-[#203663] mt-2 mb-4 md:mb-6">{title}</h3>
          <p className="text-xl md:text-[24px] leading-tight font-onest font-light text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function DABWorldwidePage() {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const stepsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSteps, setActiveSteps] = useState({});

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
        // For mobile, make all steps visible immediately
        const initialActiveSteps = {};
        processSteps.forEach((_, index) => {
          initialActiveSteps[index] = true;
        });
        setActiveSteps(initialActiveSteps);
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
      
      // Pin the left column while scrolling, but stop before footer
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom-=100px', // Stop before reaching the footer
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
    <div className="relative">
      <HeroSection
        title="Launch. Scale. Thrive Internationally."
        subtitle="Your go-to marketing partner for innovative startups & global growth."
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        sideText="DAB Worldwide"
        navTitle="COMPANIES"
      >
        <div className="mt-8">
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-[#203663] text-white font-medium rounded-md hover:bg-[#162849] transition-colors duration-300"
          >
            Partner with Us →
          </Link>
        </div>
      </HeroSection>
      
      {/* In This Section navigation */}
      <div className="relative bg-white">
        <SectionNavigation links={sectionLinks} />
        
        {/* What Is DAB Worldwide Section */}
        {/* <ContentSection id="what-is-dab" title="What Is DAB Worldwide?" hasDivider={false}>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-wider font-lato text-gray-500 mb-2">ABOUT US</p>
              <span className="text-4xl font-bold text-[#203663]">01</span>
            </div>
            <p className="text-xl leading-relaxed text-gray-700 font-onest font-light">
              DAB Worldwide is IQ Group's specialized growth partner for early-stage innovators. We transform breakthrough ideas into international product successes through strategic branding, positioning, and market entry. With two decades of global marketing expertise, we help startups build a strong trajectory from launch to scale.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#203663]/10 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-[#203663]">20+</span>
                </div>
                <h3 className="font-semibold text-[#203663]">Years Experience</h3>
                <p className="text-sm text-gray-600 mt-2">Global marketing expertise</p>
              </div>
              <div className="text-center">
                <div className="bg-[#203663]/10 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-[#203663]">50+</span>
                </div>
                <h3 className="font-semibold text-[#203663]">Markets</h3>
                <p className="text-sm text-gray-600 mt-2">International reach</p>
              </div>
              <div className="text-center">
                <div className="bg-[#203663]/10 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-[#203663]">100+</span>
                </div>
                <h3 className="font-semibold text-[#203663]">Success Stories</h3>
                <p className="text-sm text-gray-600 mt-2">Startups scaled globally</p>
              </div>
            </div>
          </div>
        </ContentSection> */}
        
        {/* Why Choose DAB Section */}
        <SectionWithCards
          id="why-choose-dab"
          title="Why Choose DAB Worldwide"
          subtitle="Strategic partnership for global growth and market expansion."
          cards={valueCards}
          hasDivider={false}
          sectionNumber="01"
        />
        
        {/* Our Capabilities Section */}
        <SectionWithCards
          id="our-capabilities"
          title="Our Capabilities"
          subtitle="Comprehensive marketing solutions for international success."
          cards={capabilityCards}
          background="gray"
          sectionNumber="02"
        />
        
        {/* Our Services Section with Accordion */}
        <ServicesAccordion
          id="our-services"
          title="Our Services"
          subtitle="End-to-end marketing solutions for innovative startups"
          services={services}
          sectionNumber="03"
        />
        
        {/* How We Work Section with Process Steps */}
        <section 
          id="how-we-work" 
          ref={sectionRef}
          className="relative bg-white py-16 md:py-0  overflow-hidden bg-[#203663]"
        >
          <div className="container mx-auto px-0 ">
            <div className="md:grid md:grid-cols-12 md:gap-0">
              {/* Left Column - Fixed CTA */}
              <div 
                ref={leftColumnRef}
                className="col-span-4 lg:col-span-3 bg-[#203663] px-4 md:px-0 md:pl-4 lg:ml-[0px] md:ml-0  mb-4 md:mb-0"
              >
                <div className="md:h-screen md:flex md:flex-col md:justify-center md:sticky md:top-0">
                  <div className="max-w-xs py-8 md:py-0">
                    <span className="text-sm uppercase tracking-wider font-lato text-gray-300 mb-2">IN THIS SECTION</span>
                    <p className="text-4xl font-bold text-white mb-4">04</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-lato text-[#fbfbfb] mb-6">
                      How We Work
                    </h2>
                    <p className="text-[24px] leading-tight font-onest font-light text-gray-200 mb-8">
                      Visionary strategy. <br/>
                      Precise execution. <br/>
                      Measurable results.
                    </p>
                    
                    {/* CTA Button */}
                    <div className="mt-8">
                      <Link href="/contact">
                        <button className="bg-[#fbfbfb] text-[#203663] cursor-pointer hover:bg-[#f0f0f0] transition-colors py-4 px-6 text-lg font-onest">
                          Partner with Our Experts
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Process Steps */}
              <div className="col-span-8 lg:col-span-9 px-4 bg-white md:px-8 lg:px-12">
                <div className="py-8 md:py-16 space-y-24">
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
                        inView={activeSteps[index] || isMobile}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
