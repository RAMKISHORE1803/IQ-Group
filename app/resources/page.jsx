'use client';
import HeroSection from "./hero";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import SectionNavigation from "@/components/companies/SectionNavigation";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom styles for mirror grid layout
const customStyles = `
  @media (min-width: 768px) {
    .mirror-grid {
      display: grid;
      grid-template-columns: 2fr 4fr;
      gap: 1rem;
    }
  }
`;

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
    type: "LinkedIn Post",
    date: "July 21, 2023",
    title: "TEPA Treaty Revolutionizes India's Steel Future",
    description: "India-EFTA partnership unlocks $100B investment, transforming steel giants into global powerhouses. The revolution starts now.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQEbT_MwdNSe-w/feedshare-shrink_1280/B4DZf87gwsGsAk-/0/1752295160074?e=1756339200&v=beta&t=2SjWOA53DYS6oTjmFQstGOas9YqXNe87bTxIchfW3dE",
    link: "#"
  },
  {
    type: "Event",
    date: "July 18, 2023",
    title: "Siddharth Bothra Leads Chrome Market Insights Amsterdam",
    description: "CEO speaks at prestigious CRU Summit, sharing India's ferrochrome expertise with global leaders. Industry transformation through knowledge leadership.",
    image: "https://media.licdn.com/dms/image/v2/D4E22AQHEQnXaBHARRg/feedshare-shrink_800/B4EZdjikkRHYAk-/0/1749721703107?e=1756339200&v=beta&t=71NYpSDrBey3ld-NzIh8lpTCrRSB-mkxurMe1ENqslE",
    link: "#"
  },
  {
    type: "LinkedIn Post",
    date: "July 14, 2023",
    title: "Freight Rates Double Overnight Threatening Global Economy",
    description: "Shipping lines abandon India for US profits, doubling container costs. Supply chains collapse while regulators sleep. Action needed now.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQEk22pW3d_Vrw/feedshare-shrink_800/B4DZcBPNZLGYAo-/0/1748072460719?e=1756339200&v=beta&t=oCheL5nuJUJp7QBWNp7KZVT-PSKSpw9geq7lExRunh4",
    link: "#"
  },
  {
    type: "Event",
    date: "July 10, 2023",
    title: "Siddharth Bothra Speaks at Dubai Metal Conference",
    description: "IQ Group CEO joins global steel leaders in Dubai, sharing insights on ferro alloys innovation and sustainable supply chains.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQFQBNYRgp4E0g/feedshare-shrink_800/B4DZbx14AuHEAg-/0/1747814155111?e=1756339200&v=beta&t=mmuQ6eLZIGzbzGf1VW0ZNg52MjpV2m9W8znBWuhUT6o",
    link: "#"
  },
  {
    type: "LinkedIn Post",
    date: "July 7, 2023",
    title: "Freight Wars Disrupt Global Trade Economy Overnight",
    description: "Tariff policies trigger freight chaos, container shortages devastate supply chains. Trade needs agility, not just resilience against volatility.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQE_t3_8uNkWYg/feedshare-shrink_800/B4DZZCqKFmHwAk-/0/1744875073885?e=1756339200&v=beta&t=R3QOhQQ-VUhlB-WAUVkgNvJT7Zo_O-aTlo9fZIysVR0",
    link: "#"
  },
  {
    type: "LinkedIn Post",
    date: "June 28, 2023",
    title: "Quality Control Orders Silently Destroying India MSMEs",
    description: "BIS certification creates new License Raj, enabling monopolies while strangling small businesses. Regulatory reform needed urgently.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQFDWrRDFw6xgg/feedshare-shrink_800/B4DZZiiSbUGsAg-/0/1745409882063?e=1756339200&v=beta&t=g8lkuC3mtZf4XS8zprQ9WvGWy7I6FXvKkS31yjFvpzU",
    link: "#"
  },
  {
    type: "LinkedIn Post",
    date: "June 25, 2023",
    title: "China VAT Crackdown Threatens India With Dumping",
    description: "China's unified tax enforcement stops fraud, redirecting excess production to India. Anti-dumping surveillance urgently needed now.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQEfxsjkk13S9g/feedshare-shrink_800/B4DZYvfh1CGkAo-/0/1744553517263?e=1756339200&v=beta&t=fcfZuZaJcq6roH0wttyowhdqkgxa-uepn_L7PV8bFaQ",
    link: "#"
  },
  {
    type: "Event",
    date: "June 20, 2023",
    title: "Siddharth Bothra Headlines CRU Ferroalloys Europe Summit",
    description: "IQ Group CEO joins global industry leaders discussing ferroalloys evolution, market trends, and metal industry transformation opportunities.",
    image: "https://media.licdn.com/dms/image/v2/D4E0BAQH19bKOefRxwg/company-logo_100_100/company-logo_100_100/0/1721050364682/cru_conferences_logo?e=1756339200&v=beta&t=0NvRAITR3hEIFh8A_Vp72ZsuMNUWEPFOdLmp1KChYdw",
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
    image: "/conference/3.jpg",
    link: "#"
  },
  {
    type: "Report",
    date: "July 15, 2023",
    title: "Material Intelligence: The Competitive Edge in Manufacturing",
    description: "Deep analysis of how material selection drives product differentiation and market leadership. Revolutionary framework for evaluating material impact on performance outcomes.",
    image: "/conference/4.jpg",
    link: "#"
  },
  {
    type: "Whitepaper",
    date: "July 9, 2023",
    title: "Decarbonizing Industrial Materials: Pathways to Net Zero",
    description: "Comprehensive roadmap for achieving carbon neutrality without compromising material integrity. Visionary strategies that transform sustainability challenges into innovation catalysts.",
    image: "/conference/1.jpg",
    link: "#"
  },
  // {
  //   type: "Analysis",
  //   date: "July 5, 2023",
  //   title: "The Economics of Quality: Premium Materials as Strategic Investment",
  //   description: "Revealing the hidden ROI metrics of selecting exceptional materials over standard options. Mathematical proof that material excellence delivers exponential value creation.",
  //   image: "/conference/2.jpg",
  //   link: "#"
  // },
  // {
  //   type: "Article",
  //   date: "June 30, 2023",
  //   title: "Beyond Specifications: The Art of Material Selection",
  //   description: "Exploring the subtle factors that elevate material choices from adequate to exceptional. Strategic framework for identifying materials that unlock unprecedented product capabilities.",
  //   image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
  //   link: "#"
  // },
  // {
  //   type: "Report",
  //   date: "June 26, 2023",
  //   title: "Material Innovation Index: Industry Benchmarking Study",
  //   description: "Definitive analysis of innovation metrics across industrial materials sectors worldwide. Data-driven insights revealing tomorrow's material science breakthroughs today.",
  //   image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop",
  //   link: "#"
  // },
  // {
  //   type: "Analysis",
  //   date: "June 22, 2023",
  //   title: "Geopolitical Shifts and Their Impact on Material Supply Chains",
  //   description: "Strategic assessment of global dynamics reshaping material availability and pricing. Forward-looking scenarios that prepare industry leaders for tomorrow's supply challenges.",
  //   image: "https://images.unsplash.com/photo-1533645782036-997947a9d529?q=80&w=1470&auto=format&fit=crop",
  //   link: "#"
  // },
  // {
  //   type: "Whitepaper",
  //   date: "June 18, 2023",
  //   title: "The Quantum Advantage: Next-Generation Materials for Industrial Excellence",
  //   description: "Exploring the frontier where quantum science meets industrial material development. Visionary perspective on materials engineered at atomic precision for unmatched performance.",
  //   image: "https://images.unsplash.com/photo-1581093805715-a127be2f3e5f?q=80&w=1470&auto=format&fit=crop",
  //   link: "#"
  // }
];

const insightsCards2 = [
  {
    type: "Article",
    date: "July 19, 2023",
    title: "The Evolution of Supply Chain Resilience in Material Sourcing",
    description: "Decoding the transformation from fragile networks to unbreakable material pathways. Strategic insights that redefine how industry leaders secure critical resources.",
    image: "/conference/6.jpg", 
    link: "#"
  },
  {
    type: "Report",
    date: "July 15, 2023",
    title: "Material Intelligence: The Competitive Edge in Manufacturing",    
    description: "Deep analysis of how material selection drives product differentiation and market leadership. Revolutionary framework for evaluating material impact on performance outcomes.",
    image: "/conference/2.jpg",
    link: "#"
  },
  {
    type: "Whitepaper",   
    date: "July 9, 2023",
    title: "Decarbonizing Industrial Materials: Pathways to Net Zero",
    description: "Comprehensive roadmap for achieving carbon neutrality without compromising material integrity. Visionary strategies that transform sustainability challenges into innovation catalysts.",
    image: "/conference/5.jpg",
    link: "#"
  }
];

const sectionLinks = [
  {
    title: "INSIGHTS",
    link: "/resources#insights"
  },
  {
    title: "LATEST NEWS",
    link: "/resources#news"
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
      <style jsx>{`
        @media (min-width: 768px) {
          .mirror-grid {
            display: grid;
            grid-template-columns: 2fr 4fr !important;
            gap: 1rem;
          }
          .mirror-grid > div:first-child {
            height: 100%;
          }
        }
      `}</style>
      <HeroSection 
        subtitle="Explore a curated feed of IQ Group’s latest moments, market insights, and innovation in action."
        backgroundImage="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1740&auto=format&fit=crop"
        sideText="RESOURCES"
        navTitle="RESOURCES"
        sideTextHeight="290px"
      />
      <div className="relative z-20 bg-white"> 
        <SectionNavigation 
          links={sectionLinks}
        />

<FadeInSection className="py-16 md:py-24 px-2 md:px-4 bg-[#ffffff]" id="insights">
          <div className="max-w-7xl mx-auto">
            <SectionTitle number="01" title="INSIGHTS" />
            
            {/* First BentoGrid */}
            <BentoGrid className="mx-auto mb-12">
              {insightsCards.slice(0, 5).map((card, index) => (
                <BentoGridItem
                  key={index}
                  header={
                    <Link href={card.link || "#"} className="block relative w-full h-full min-h-[12rem] overflow-hidden">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105"
                      />
                    </Link>
                  }
                  title={
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-white/90 mb-1">
                        {card.type} • {card.date}
                      </span>
                      <span className="text-lg md:text-xl">{card.title}</span>
                    </div>
                  }
                  className={index === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2"}
                />
              ))}
            </BentoGrid>

            <BentoGrid className="mx-auto transform scale-x-[-1]">
              {insightsCards2.slice(0, 5).map((card, index) => (
                <BentoGridItem
                  key={index}
                  header={
                    <Link href={card.link || "#"} className="block relative w-full h-full min-h-[12rem] overflow-hidden">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/bento:scale-105"
                      />
                    </Link>
                  }
                  title={
                    <div className="flex flex-col transform scale-x-[-1]">
                      <span className="text-xs font-medium text-white/90 mb-1">
                        {card.type} • {card.date}
                      </span>
                      <span className="text-lg md:text-xl">{card.title}</span>
                    </div>
                  }
                  className={index === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2"}
                />
              ))}
            </BentoGrid>
            
            
           
          </div>
        </FadeInSection>

        
        {/* News Section */}
        <FadeInSection className="py-16 md:py-24 px-2 md:px-4 bg-white" id="news">
          <div className="max-w-7xl lg:max-w-[1300px] mx-auto">
            <SectionTitle number="02" title="LATEST NEWS" />
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
       
      </div>
    </main>
  );
}