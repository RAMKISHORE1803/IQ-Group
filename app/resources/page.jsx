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
import { BentoGrid2, BentoGridItem2 } from "@/components/ui/2bento";
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
    link: "/resources/insights/tepa-treaty-revolutionizes-india-steel-future"
  },
  {
    type: "Event",
    date: "July 18, 2023",
    title: "Siddharth Bothra Leads Chrome Market Insights Amsterdam",
    description: "CEO speaks at prestigious CRU Summit, sharing India's ferrochrome expertise with global leaders. Industry transformation through knowledge leadership.",
    image: "https://media.licdn.com/dms/image/v2/D4E22AQHEQnXaBHARRg/feedshare-shrink_800/B4EZdjikkRHYAk-/0/1749721703107?e=1756339200&v=beta&t=71NYpSDrBey3ld-NzIh8lpTCrRSB-mkxurMe1ENqslE",
    link: "/resources/insights/siddharth-bothra-leads-chrome-market-insights-amsterdam"
  },
  {
    type: "LinkedIn Post",
    date: "July 14, 2023",
    title: "Freight Rates Double Overnight Threatening Global Economy",
    description: "Shipping lines abandon India for US profits, doubling container costs. Supply chains collapse while regulators sleep. Action needed now.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQEk22pW3d_Vrw/feedshare-shrink_800/B4DZcBPNZLGYAo-/0/1748072460719?e=1756339200&v=beta&t=oCheL5nuJUJp7QBWNp7KZVT-PSKSpw9geq7lExRunh4",
    link: "/resources/insights/freight-rates-double-overnight-threatening-global-economy"
  },
  {
    type: "Event",
    date: "July 10, 2023",
    title: "Siddharth Bothra Speaks at Dubai Metal Conference",
    description: "IQ Group CEO joins global steel leaders in Dubai, sharing insights on ferro alloys innovation and sustainable supply chains.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQFQBNYRgp4E0g/feedshare-shrink_800/B4DZbx14AuHEAg-/0/1747814155111?e=1756339200&v=beta&t=mmuQ6eLZIGzbzGf1VW0ZNg52MjpV2m9W8znBWuhUT6o",
    link: "/resources/insights/siddharth-bothra-speaks-dubai-metal-conference"
  },
  {
    type: "LinkedIn Post",
    date: "July 7, 2023",
    title: "Freight Wars Disrupt Global Trade Economy Overnight",
    description: "Tariff policies trigger freight chaos, container shortages devastate supply chains. Trade needs agility, not just resilience against volatility.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQE_t3_8uNkWYg/feedshare-shrink_800/B4DZZCqKFmHwAk-/0/1744875073885?e=1756339200&v=beta&t=R3QOhQQ-VUhlB-WAUVkgNvJT7Zo_O-aTlo9fZIysVR0",
    link: "/resources/insights/freight-wars-disrupt-global-trade-economy-overnight"
  },
  {
    type: "LinkedIn Post",
    date: "June 28, 2023",
    title: "Quality Control Orders Silently Destroying India MSMEs",
    description: "BIS certification creates new License Raj, enabling monopolies while strangling small businesses. Regulatory reform needed urgently.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQFDWrRDFw6xgg/feedshare-shrink_800/B4DZZiiSbUGsAg-/0/1745409882063?e=1756339200&v=beta&t=g8lkuC3mtZf4XS8zprQ9WvGWy7I6FXvKkS31yjFvpzU",
    link: "/resources/insights"
  },
  {
    type: "LinkedIn Post",
    date: "June 25, 2023",
    title: "China VAT Crackdown Threatens India With Dumping",
    description: "China's unified tax enforcement stops fraud, redirecting excess production to India. Anti-dumping surveillance urgently needed now.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQEfxsjkk13S9g/feedshare-shrink_800/B4DZYvfh1CGkAo-/0/1744553517263?e=1756339200&v=beta&t=fcfZuZaJcq6roH0wttyowhdqkgxa-uepn_L7PV8bFaQ",
    link: "/resources/insights"
  },
  {
    type: "Event",
    date: "June 20, 2023",
    title: "Siddharth Bothra Headlines CRU Ferroalloys Europe Summit",
    description: "IQ Group CEO joins global industry leaders discussing ferroalloys evolution, market trends, and metal industry transformation opportunities.",
    image: "https://media.licdn.com/dms/image/v2/D4E0BAQH19bKOefRxwg/company-logo_100_100/company-logo_100_100/0/1721050364682/cru_conferences_logo?e=1756339200&v=beta&t=0NvRAITR3hEIFh8A_Vp72ZsuMNUWEPFOdLmp1KChYdw",
    link: "/resources/insights"
  }
];

// Insights section data
const insightsCards = [
  {
    type: "Europe",
    date: "",
    title: "Speaking at Ferro Alloys Europe Connection Summit",
    description: "Decoding the transformation from fragile networks to unbreakable material pathways. Strategic insights that redefine how industry leaders secure critical resources.",
    image: "/conference/3.jpg",
    link: "/resources/insights"
  },
  {
    type: "Istanbul, Turkey",
    date: "2022",
    title: "Speaking at Metal Expert Ferro Alloys Conference",
    description: "Deep analysis of how material selection drives product differentiation and market leadership. Revolutionary framework for evaluating material impact on performance outcomes.",
    image: "/conference/4.jpg",
    link: "/resources/insights"
  },
  {
    type: "Dubai, UAE",
    date: "2022",
    title: "Fastmarkets Asian Ferro Alloys Conference",
    description: "Comprehensive roadmap for achieving carbon neutrality without compromising material integrity. Visionary strategies that transform sustainability challenges into innovation catalysts.",
    image: "/conference/1.jpg",
    link: "/resources/insights"
  },
  
];

const insightsCards2 = [
  {
    type: "Cairo, Egypt",
    date: "2023",
    title: "Participated as Panelist  at Arab Steel COnference",
    description: "Decoding the transformation from fragile networks to unbreakable material pathways. Strategic insights that redefine how industry leaders secure critical resources.",
    image: "/conference/6.jpg", 
    link: "/resources/insights"
  },
  {
    type: "Prague, Czech Republic",
    date: "2022",
    title: "Speaking at International Ferro Alloys Conference",    
    description: "Deep analysis of how material selection drives product differentiation and market leadership. Revolutionary framework for evaluating material impact on performance outcomes.",
    image: "/conference/2.jpg",
    link: "/resources/insights"
  },
  {
    type: "",   
    date: "July 9, 2023",
    title: "",
    description: "Comprehensive roadmap for achieving carbon neutrality without compromising material integrity. Visionary strategies that transform sustainability challenges into innovation catalysts.",
    image: "/conference/5.jpg",
    link: "/resources/insights"
  }
];

const newspaperCards = [
  {
    type: "News Report",
    date: "February 29, 2020",
    title: "Compulsory certification of Ferro Silicon might disrupt Indian steel makers",
    description: "Indian steel manufacturers might face a slight glitch in the supply of Ferro Silicon, as the Ministry of Steel has passed an order to include it under mandatory certification by April 2020.",
    image: "https://5.imimg.com/data5/SELLER/Default/2022/5/RC/HK/BF/1535304/ferro-silicon.jpg",
    link: "https://economictimes.indiatimes.com/industry/indl-goods/svs/steel/compulsory-certification-of-ferro-silicon-might-disrupt-indian-steel-makers/articleshow/74408540.cms?from=mdr"
  },
  {
    type: "News Report",
    date: "April 16, 2021",
    title: "TATA Steel arm to double FerroChrome manufacturing capacity.",
    description: "Tata Steel Mining Limited (TSML), a wholly owned subsidiary of Tata Steel, is planning to double its ferrochrome manufacturing capacity in India to 900,000 tonnes a year",
    image: "https://etimg.etb2bimg.com/photo/117880043.cms",
    link: "https://economictimes.indiatimes.com/industry/indl-goods/svs/steel/tata-steel-arm-to-double-ferrochrome-manufacturing-capacity/articleshow/82095580.cms?from=mdr"
  },
  {
    type: "News Report",
    date: "April 22, 2020",
    title: "Steel Ministry extends deadline to certify steel products as BIS closes laboratories",
    description: "Ministry of steel has extended the deadline for certification of steel products to three months from April 23rd as the Bureau of Indian Standards (BIS) has shut operations.",
    image: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-104708,resizemode-75,msid-118901403/industry/indl-goods/svs/steel/steel-companies-may-go-slow-on-capacity-expansion-as-imports-hit-margins-analysts.jpg",
    link: "https://economictimes.indiatimes.com/industry/indl-goods/svs/steel/steel-ministry-extends-deadline-to-certify-steel-products-as-bis-closes-laboratories/articleshow/75293358.cms?from=mdr"
  },
  {
    type: "News Report",
    date: "May 13, 2017",
    title: "Spare us from the steepest slab of 28% under GST",
    description: "Stamp collectors have written to finance minister Arun Jaitley asking him to spare their hobby from the steepest slab of 28% under the GST, which is expected to be rolled out on July 1.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ_1J41ou4mAX4U6Qh9oJfv1xH_UnSHq0jYA&s",
    link: "https://economictimes.indiatimes.com/news/economy/policy/spare-us-from-steepest-slab-of-28-under-gst-stamp-collectors-to-arun-jaitley/articleshow/58651213.cms"
  },
  {
    type: "Youtube",
    date: "April 8,2021",
    title: "Zero to Everything",
    description: "Build your empire with nothing but vision. No handouts. No shortcuts. Just you against the impossible.",
    image: "/conference/3.jpg",
    link: "https://www.youtube.com/watch?v=derQvIrtnAE&ab_channel=SarthakVarshney"
  },
  {
    type: "Youtube",
    date: "April 8,2021",
    title: "Balls Of Steel Show, Eps 45",
    description: "From stamps to steel empires. When conviction beats data and relationships trump research. Pure entrepreneurial fire.",
    image: "https://i.ytimg.com/vi/njGx8hoC4_g/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=njGx8hoC4_g"
  }
]

const sectionLinks = [
  {
    title: "Media",
    link: "/resources#insights"
  },
  {
    title: "Insights",
    link: "/resources#news"
  },
  {
    title: "News",
    link: "/resources/insights"
  }
  
];

const galleryCards = [  
  
  {
    type: "Amsterdam, Netherlands",
    date: "2025",
    title: "Paricipated as Panelist in CRU Europe Connection Summit 2025",
    description: "Speaking at CRU Europe Ferro Alloys COnnection Summit 2025 at Amsterdam",
    image: "/conference/8.jpg",
    link: "/resources/insights"
  },
  {
    type: "Amsterdam, Netherlands",
    date: "2025",
    title: "Speaking at CRU Europe Ferro Alloys Connection Summit 2025 at Amsterdam",
    description: "",
    image: "/conference/7.jpg", 
    link: "/resources/insights"
  },
  {
    type: "Cairo, Egypt",
    date: "2023",
    title: "Speaking at 16th Arab Steel Summit 2023",
    description: "Speaking at 16th Arab Steel Summit 2023",
    image: "/conference/9.jpg", 
    link: "/resources/insights"
  },
  {
    type: "",
    date: "",
    title: "",
    description: "Speaking at 16th Arab Steel Summit 2023",
    image: "/conference/10.jpg", 
    link: "/resources/insights"
  },
  
 
]

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
        backgroundImage="https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        sideText="RESOURCES"
        navTitle="RESOURCES"
        sideTextHeight="290px"
      />
      <div className="relative z-20 bg-white"> 
        <SectionNavigation 
          links={sectionLinks}
        />

<FadeInSection className="py-16 md:py-24 px-2 md:px-4 bg-[#ffffff]" id="media">
          <div className="max-w-7xl mx-auto">
            <SectionTitle number="01" title="MEDIA" />
            
            {/* First BentoGrid */}
            <BentoGrid className="mx-auto mb-12">
              {insightsCards.slice(0, 5).map((card, index) => (
                <BentoGridItem
                  key={index}
                  header={
                    
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full  cursor-pointer object-cover transition-transform duration-500 group-hover/bento:scale-105"
                      />
                    
                  }
                  title={
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-white/90 mb-1">
                        {card.type} 
                      </span>
                      <span className="text-lg md:text-xl">{card.title}</span>
                    </div>
                  }
                  className={index === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2"}
                />
              ))}
            </BentoGrid>

            <BentoGrid className="mx-auto transform scale-x-[-1] mb-10">
              {insightsCards2.slice(0, 5).map((card, index) => (
                <BentoGridItem
                  key={index}
                  header={
                    
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full cursor-pointer transform scale-x-[-1] object-cover transition-transform duration-500"
                      />
                    
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

            <BentoGrid2 className="mx-auto ">
              {galleryCards.slice(0, 4).map((card, index) => (
                <BentoGridItem2
                  key={index}
                  variant="default"
                 
                  header={
                    
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full  cursor-pointer object-cover transition-transform duration-500 group-hover/bento:scale-105"
                      />
                    
                  }
                  title={
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-white/90 mb-1">
                        {card.type} 
                      </span>
                      <span className="text-lg md:text-xl">{card.title}</span>
                    </div>
                  }
                  className={ "md:col-span-2"}
                />
              ))}
            </BentoGrid2>
            
            
           
          </div>
        </FadeInSection>

        
        {/* News Section */}
        <FadeInSection className="py-16 md:py-24 px-2 md:px-4 bg-white" id="insights">
          <div className="max-w-7xl lg:max-w-[1300px] mx-auto">
            <SectionTitle number="02" title="INSIGHTS" />
            <div className="flex flex-wrap -mx-1">
              {newsCards.map((card, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-1 mb-2">
                  <ResourceCard {...card} />
                </div>
              ))}
          </div>
         </div>
        </FadeInSection>
        
        {/* latest Section */}
        

        {/* News Section */}
        <FadeInSection className="py-16  px-2 md:px-4 bg-white" id="insights">
          <div className="max-w-7xl lg:max-w-[1300px] mx-auto">
            <SectionTitle number="03" title="NEWS" />
            <div className="flex flex-wrap -mx-1">
              {newspaperCards.map((card, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-1 mb-2">
                  <ResourceCard {...card} />
                </div>
              ))}
          </div>
         </div>
        </FadeInSection>
        
        {/* latest Section */}
       
      </div>
    </main>
  );
}