'use client';
import HeroSection from "@/components/about/HeroSection";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import SectionNavigation from "@/components/companies/SectionNavigation";
// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fade-in animation for sections
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const section = sectionRef.current;
    if (!section) return;
    
    // Set initial state (invisible)
    gsap.set(section, { 
      opacity: 0,
      y: 30
    });
    
    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 40%",
        toggleActions: "play none none none"
      }
    });
    
    // Animate to visible
    tl.to(section, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: delay
    });
    
    return () => {
      // Clean up
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [delay]);
  
  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

// Accordion Item Component
const AccordionItem = ({ id, title, content, isActive, onClick, index }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => onClick(id)}
        className="w-full py-6 flex cursor-pointer items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center">
          <span className="font-lato lg:text-[32px] font-bold text-[#1a365d]">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown className="w-6 h-6 text-[#1a365d]" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
          marginBottom: isActive ? 24 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-4 text-[17px]  font-onest text-gray-700 leading-relaxed">
          {content}
        </div>
      </motion.div>
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ type, date, title, description, image, link }) => {
  return (
    <motion.div
      className="relative h-96 bg-cover bg-center bg-no-repeat overflow-hidden group cursor-pointer"
      style={{ 
        backgroundImage: `url(${image})`,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-20" />
      
      {/* Category Label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black bg-opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          {type}
        </span>
        <span className="ml-2 text-white text-xs font-medium px-2 py-1 rounded-full bg-opacity-60 bg-gray-700">
          {date}
        </span>
      </div>
      
      {/* Floating Glassy overlay - small at bottom, full card on hover */}
      <motion.div
        className="absolute bg-white/70 bg-opacity-40 backdrop-blur-md rounded-lg overflow-hidden"
        initial={{ 
          bottom: "16px",
          left: "16px",
          right: "16px",
          top: "auto",
          height: "120px"
        }}
        whileHover={{ 
          top: "0px",
          bottom: "0px",
          left: "0px",
          right: "0px",
          height: "100%",
          borderRadius: "0px",
          zIndex: 50,
          opacity: 1
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0, 0.2, 1],
          type: "tween"
        }}
      >
        {/* Default content - always visible */}
        <div className="relative z-10 p-4">
          <p className="text-xs text-gray-600 font-medium mb-1">
            {type}
          </p>
          <h3 className="font-lato font-light text-[30px] line-clamp-2 group-hover:line-clamp-none text-ellipsis overflow-hidden text-black leading-tight transition-all duration-300">
            {title}
          </h3>
        </div>
        
        {/* Expanded content - only visible on hover */}
        <div className="px-4 pb-4 opacity-0 group-hover:opacity-100">
          <p className="text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4">
            {description}
          </p>
          <Link 
            href={link || "#"}
            className="inline-flex items-center text-[16px] font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            → Read More
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Section Title Component
const SectionTitle = ({ number, title }) => {
  return (
    <div className="mb-12">
      <p className="text-sm uppercase tracking-wider font-lato text-gray-500 mb-2">IN THIS SECTION</p>
      <span className="text-4xl font-bold text-[#1a365d] block mb-4">{number}</span>
      <h2 className="text-3xl uppercase md:text-4xl font-bold text-[#1a365d]">{title}</h2>
    </div>
  );
};

// News section data
const newsCards = [
  {
    type: "Press Release",
    date: "July 21, 2023",
    title: "IQ Group Expands Global Reach with New Strategic Partnership",
    description: "Revolutionary alliance formed to redefine industry standards. A bold move that strengthens our commitment to excellence in material sourcing worldwide.",
    image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1740&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "News",
    date: "July 18, 2023",
    title: "Breakthrough in Material Technology Propels Manufacturing Innovation",
    description: "Unveiling next-generation composites that transform production capabilities. Engineered at molecular precision to deliver unprecedented performance across industrial applications.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22732d58dc?q=80&w=1740&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "Event",
    date: "July 14, 2023",
    title: "IQ Group to Lead Keynote at Global Materials Summit 2023",
    description: "Join our experts as they reveal transformative insights on material science evolution. Exclusive preview of research destined to reshape industrial materials landscape.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1740&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "Press Release",
    date: "July 10, 2023",
    title: "Record Quarter Results Reflect Strong Market Position",
    description: "Exceptional performance demonstrates our relentless pursuit of excellence. Strategic investments yield unprecedented growth across all business divisions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1715&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "News",
    date: "July 7, 2023",
    title: "Environmental Milestone: Carbon-Neutral Operations Achieved",
    description: "Pioneering sustainability initiative reaches completion ahead of schedule. Revolutionary approach sets new benchmark for environmental stewardship in materials industry.",
    image: "https://images.unsplash.com/photo-1473646590311-c48e1bc77b44?q=80&w=1738&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "Event",
    date: "June 28, 2023",
    title: "Registration Open for Annual Materials Innovation Conference",
    description: "Exclusive gathering of industry pioneers exploring the frontiers of material science. Limited seats available for this transformative knowledge exchange experience.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1712&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "News",
    date: "June 25, 2023",
    title: "IQ Group Recognized with Global Excellence Award",
    description: "Distinguished honor celebrates our unwavering commitment to quality and innovation. Rigorous evaluation identifies our practices as defining the industry's future.",
    image: "https://images.unsplash.com/photo-1565530973854-e4e4e8a9ea13?q=80&w=1740&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "Press Release",
    date: "June 20, 2023",
    title: "Next-Generation Research Laboratory Unveiled",
    description: "State-of-the-art facility designed to push boundaries of material innovation. Unprecedented capabilities accelerate discovery of transformative industrial solutions.",
    image: "https://images.unsplash.com/photo-1581093458791-9d52200c79a8?q=80&w=1740&auto=format&fit=crop",
    link: "#"
  }
];

// Insights section data
const insightsCards = [
  {
    type: "Article",
    date: "July 19, 2023",
    title: "The Evolution of Supply Chain Resilience in Material Sourcing",
    description: "Decoding the transformation from fragile networks to unbreakable material pathways. Strategic insights that redefine how industry leaders secure critical resources.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "Report",
    date: "July 15, 2023",
    title: "Material Intelligence: The Competitive Edge in Manufacturing",
    description: "Deep analysis of how material selection drives product differentiation and market leadership. Revolutionary framework for evaluating material impact on performance outcomes.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1476&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "Whitepaper",
    date: "July 9, 2023",
    title: "Decarbonizing Industrial Materials: Pathways to Net Zero",
    description: "Comprehensive roadmap for achieving carbon neutrality without compromising material integrity. Visionary strategies that transform sustainability challenges into innovation catalysts.",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1480&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "Analysis",
    date: "July 5, 2023",
    title: "The Economics of Quality: Premium Materials as Strategic Investment",
    description: "Revealing the hidden ROI metrics of selecting exceptional materials over standard options. Mathematical proof that material excellence delivers exponential value creation.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "Article",
    date: "June 30, 2023",
    title: "Beyond Specifications: The Art of Material Selection",
    description: "Exploring the subtle factors that elevate material choices from adequate to exceptional. Strategic framework for identifying materials that unlock unprecedented product capabilities.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "Report",
    date: "June 26, 2023",
    title: "Material Innovation Index: Industry Benchmarking Study",
    description: "Definitive analysis of innovation metrics across industrial materials sectors worldwide. Data-driven insights revealing tomorrow's material science breakthroughs today.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "Analysis",
    date: "June 22, 2023",
    title: "Geopolitical Shifts and Their Impact on Material Supply Chains",
    description: "Strategic assessment of global dynamics reshaping material availability and pricing. Forward-looking scenarios that prepare industry leaders for tomorrow's supply challenges.",
    image: "https://images.unsplash.com/photo-1533645782036-997947a9d529?q=80&w=1470&auto=format&fit=crop",
    link: "#"
  },
  {
    type: "Whitepaper",
    date: "June 18, 2023",
    title: "The Quantum Advantage: Next-Generation Materials for Industrial Excellence",
    description: "Exploring the frontier where quantum science meets industrial material development. Visionary perspective on materials engineered at atomic precision for unmatched performance.",
    image: "https://images.unsplash.com/photo-1581093805715-a127be2f3e5f?q=80&w=1470&auto=format&fit=crop",
    link: "#"
  }
];

const sectionLinks = [
  {
    title: "LATEST NEWS",
    link: "/resources#news"
  },
  {
    title: "INDUSTRY INSIGHTS",
    link: "/resources#insights"
  }
];

export default function ResourcesPage() {
  const introRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const intro = introRef.current;
    if (!intro) return;
    
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: intro,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Animate intro section
    tl.fromTo(
      intro.querySelectorAll('.animate-item'),
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power2.out" 
      }
    );
    
    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);
  
  return (
    <main>
      <HeroSection 
        subtitle="Resources"
        backgroundImage="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1740&auto=format&fit=crop"
        sideText="RESOURCES"
        navTitle="RESOURCES"
      />
      <div className="relative z-20 bg-white"> 
        <SectionNavigation 
          links={sectionLinks}
        />
        
        {/* News Section */}
        <FadeInSection className="py-16 md:py-24 px-2 md:px-4 bg-white" id="news">
          <div className="max-w-7xl lg:max-w-[1300px] mx-auto">
            <SectionTitle number="01" title="LATEST NEWS" />
            <div className="flex flex-wrap -mx-1">
              {newsCards.map((card, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-1 mb-2">
                  <ResourceCard {...card} />
                </div>
              ))}
          </div>
          </div>
        </FadeInSection>
        
        {/* Insights Section */}
        <FadeInSection className="py-16 md:py-24 px-2 md:px-4 bg-gray-50" id="insights">
          <div className="max-w-7xl mx-auto">
            <SectionTitle number="02" title="INDUSTRY INSIGHTS" />
            <div className="flex flex-wrap -mx-1">
              {insightsCards.map((card, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-1 mb-2">
                  <ResourceCard {...card} />
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}