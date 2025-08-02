'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductRangeSection from '@/components/companies/ProductRangeSection';
import SectionNavigation from '@/components/companies/SectionNavigation';
import SectionWithCards from '@/components/companies/SectionWithCards';
import HeroSection from '@/components/about/HeroSection';
import InfiniteMovingCardsDemo from '@/components/ui/infinite-moving-cards-demo';
import { useEffect, useState, useRef } from 'react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Overview cards data
const overviewCards = [
  {
    title: "Global Reach",
    description: "Seamlessly connecting premium materials to steel producers across six continents. Every shipment precision-timed for maximum impact."
  },
  {
    title: "Quality Assurance",
    description: "Molecular-level testing ensures every material exceeds industry standards. Zero compromise between consistency and excellence."
  },
  {
    title: "Supply Resilience",
    description: "Strategic sourcing network built to withstand market volatility. Your production never stops, regardless of global conditions."
  },
  {
    title: "Technical Expertise",
    description: "Metallurgical specialists who understand your exact requirements. Beyond suppliers—we're your material science partners."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Supply Volatility",
    description: "Unwavering material flow when others falter. Our global network delivers consistency through any market disruption."
  },
  {
    title: "Quality Precision",
    description: "Micron-perfect materials prevent million-dollar defects. We deliver exact specifications because precision isn't optional."
  },
  {
    title: "Sustainable Evolution",
    description: "Lower-carbon materials that exceed tomorrow's regulations today. Environmental leadership that creates competitive advantage."
  },
  {
    title: "Cost Optimization",
    description: "Beyond price-per-ton thinking. Our integrated approach eliminates waste across your entire material stream."
  }
];

// Ferro Alloys data
const ferroAlloys = [
  {
    title: "Ferro Phosphorus",
    description: "High-purity ferro phosphorus with 18-26% phosphorus content, used as a deoxidizer and to improve machinability in steel production.",
   image: "/ferrophosphorous.webp"
  },
  {
    title: "Ferro Silicon",
    description: "High-purity ferro silicon with silicon content ranging from 45% to 75%, used as a deoxidizer and alloying element in steel production.",
    image: "/ferrosilicon.webp"
  },
  {
    title: "Ferro Chrome",
    description: "Primary alloy (50–70% Cr) for stainless and alloy steel—enhances corrosion resistance, hardness, and wear resistance.",
    image: "/ferrochrome.jpg"
  },
  {
    title: "Ferro Titanium",
    description: "High-quality alloy used as a deoxidizer and grain refiner in steel production, improving mechanical properties and corrosion resistance.",
    image: "/ferrotitanium.webp"
  },
  {
    title: "Ferro Manganese",
    description: "Essential alloy adding manganese to steel to improve strength, toughness, hardenability, and wear resistance.",
    image: "/ferromanganese.webp"
  }
];

// Noble Alloys data
const nobleAlloys = [
  {
    title: "Ferro Vanadium",
    description: "Premium alloy with 40-80% vanadium content, used to increase strength, toughness, and wear resistance in high-strength steels.",
    image: "/ferrovanadium.webp"
  },
  {
    title: "Ferro Niobium",
    description: "Specialized alloy containing 60-70% niobium, used to improve strength, toughness, and weldability in HSLA steels.",
    image: "/ferroniobium.webp"
  },
  {
    title: "Ferro Boron",
    description: "High-purity alloy with 17-20% boron content, used as a microalloying element to enhance hardenability and grain refinement.",
    image: "/ferroboron.webp"
  },
  {
    title: "Ferro Molybdenum",
    description: "Specialized alloy containing 60-70% molybdenum, used to enhance strength, hardenability, and corrosion resistance in steel.",
    image: "/ferromolybdenum.webp"
  }
];

// Carbon Materials data
const carbonMaterials = [
  {
    title: "Graphite",
    description: "High-carbon material with 99%+ carbon content, used as a carbon additive and for refractory applications in steel production.",
    image: "https://media.licdn.com/dms/image/v2/C5612AQH3zjl4v37pWQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1617000859630?e=2147483647&v=beta&t=ktiktQuprF1agv8GySh02nt3oTAIR68mPID0kgsSOY4"
  },
  {
    title: "Petroleum Coke",
    description: "High-grade carbon material with low sulfur and ash content, used as a carbon raiser in steel and foundry applications.",
    image: "/petroleumcoke.jpg"
  },
  {
    title: "Carbon Raisers",
    description: "Specialized carbon additives with 97-99% carbon content, used to precisely adjust carbon levels in steel production.",
    image: "/carbonraiser.webp"
  },
  {
    title: "Calcined Anthracite",
    description: "High-carbon material with low volatile content, used as a carbon additive and for electrode production in steelmaking.",
    image: "/calcinedanthracitecoal.webp"
  }
];

// Metals & Minerals data
const metalsMinerals = [
  {
    title: "Manganese Metal Flakes",
    description: "High-purity manganese (99%+) used for precise alloying in specialty steels and for manufacturing manganese-based chemicals.",
    image: "/manganesemetalflakes.webp"
  },
  {
    title: "Silicon Metal",
    description: "High-purity silicon (98-99.5%) used as a deoxidizer and alloying element in steel and for manufacturing silicones.",
    image: "/siliconmetal.jpg"
  },
  {
    title: "Chromite",
    description: "Essential mineral ore containing chromium, used in the production of ferrochrome and ultimately in stainless steel manufacturing.",
    image: "/chromite.jpg"
  },
  {
    title: "Bauxite",
    description: "Primary ore for aluminum production, also used as a flux in steelmaking and for manufacturing refractories.",
    image: "/bauxite.jpg"
  },
  {
    title: "Dolomite",
    description: "Used in basic oxygen steelmaking to protect refractory linings and as a slag conditioner to improve steel quality.",
    image: "/dolomitr.jpg"
  },
  {
    title: "Limestone",
    description: "Critical flux material used to remove impurities in the steelmaking process, forming slag that can be separated from the molten metal.",
    image: "/limestone.jpg"
  }
];

// Section links for navigation
const sectionLinks = [
  {
    title: "Overview",
    link: "#overview"
  },
  {
    title: "Industry Challenges",
    link: "#challenges"
  },
  {
    title: "Ferro Alloys",
    link: "#ferro-alloys"
  },
  {
    title: "Noble Alloys",
    link: "#noble-alloys"
  },
  {
    title: "Carbon Materials",
    link: "#carbon-materials"
  },
  {
    title: "Metals & Minerals",
    link: "#metals-minerals"
  },
  {
    title: "Success Stories",
    link: "#success-stories"
  }
];

// Success stories data for the template
const successStories = [
  {
    quote: "IQ Group's consistent supply of high-grade iron ore allowed us to maintain production during a critical global shortage, saving us an estimated €2.3M in potential downtime.",
    name: "European Steel Manufacturing Co.",
    title: "Uninterrupted Production During Supply Crisis",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote: "Their technical expertise helped us optimize our alloy formulations, resulting in a 15% reduction in material costs while maintaining all quality specifications.",
    name: "Asian Specialty Steel Producer",
    title: "Cost Optimization Without Compromising Quality",
    image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote: "When we needed to meet new environmental regulations, IQ Group delivered lower-carbon materials six months ahead of our deadline, helping us maintain market leadership.",
    name: "North American Steel Corporation",
    title: "Sustainable Transition Support",
    image: "https://images.unsplash.com/photo-1530968033775-2c92736b131e?q=80&w=2070&auto=format&fit=crop"
  }
];

const successStoriesData = {
  subtitle: "Real results from our partnerships with leading steel manufacturers worldwide",
  stories: successStories
};

const overviewData = {
  subtitle: "Powering global steel production with premium materials and unmatched expertise",
  cards: overviewCards
};

const challengesData = {
  subtitle: "Solving the most pressing challenges facing modern steel production",
  cards: challengeCards
};

export default function SteelIndustryPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Create refs for each section
  const overviewRef = useRef(null);
  const challengesRef = useRef(null);
  const ferroAlloysRef = useRef(null);
  const nobleAlloysRef = useRef(null);
  const carbonMaterialsRef = useRef(null);
  const metalsMineralsRef = useRef(null);
  const successStoriesRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Initialize scroll animations
    if (typeof window === 'undefined') return;
    
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // Initialize scroll animations if needed
      ScrollTrigger.refresh();

      // Create animation for each section
      const sections = [
        { ref: overviewRef, delay: 0 },
        { ref: challengesRef, delay: 0.1 },
        { ref: ferroAlloysRef, delay: 0.2 },
        { ref: nobleAlloysRef, delay: 0.3 },
        { ref: carbonMaterialsRef, delay: 0.4 },
        { ref: metalsMineralsRef, delay: 0.5 },
        { ref: successStoriesRef, delay: 0.6 }
      ];

      sections.forEach(({ ref, delay }) => {
        if (!ref.current) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }).fromTo(
          ref.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay, ease: 'power2.out' }
        );
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      // Clean up any ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className='bg-white'>
      <HeroSection 
        title=""
        subtitle="Empowering steel with premium raw materials—driving performance in carbon, alloy, and stainless steel.
"
        backgroundImage="https://rmi.org/wp-content/uploads/2023/02/steel-forge-worker-melting-metal-iStock-1147790557-1700x1063.jpg"
        sideText="STEEL INDUSTRY"
        navTitle="INDUSTRIES"
      />

      <div className="relative z-20 bg-white">
        <SectionNavigation links={sectionLinks} />
        
        {/* Overview Section using SectionWithCards */}
        <div ref={overviewRef} id="overview">
          <SectionWithCards
            title="Steel Industry Overview"
            subtitle={overviewData.subtitle}
            cards={overviewData.cards}
            background="white"
            sectionNumber="01"
          />
        </div>
        
        {/* Industry Challenges Section using SectionWithCards */}
        <div ref={challengesRef} id="challenges">
          <SectionWithCards
            title="Industry Challenges"
            subtitle={challengesData.subtitle}
            cards={challengesData.cards}
            background="gray"
            sectionNumber="02"
          />
        </div>
        
        {/* Ferro Alloys Section */}
        <div ref={ferroAlloysRef} id="ferro-alloys">
          <ProductRangeSection
            id="ferro-alloys"
            title="Ferro Alloys"
            subtitle="Premium ferro alloys for enhanced steel properties and precise composition control"
            products={ferroAlloys}
            sectionNumber="03"
            sectionTitle="MATERIAL CATEGORY"
          />
        </div>
        
        {/* Noble Alloys Section */}
        <div ref={nobleAlloysRef} id="noble-alloys">
          <ProductRangeSection
            id="noble-alloys"
            title="Noble Alloys"
            subtitle="Specialized high-performance alloys for advanced steel applications"
            products={nobleAlloys}
            background="gray"
            sectionNumber="04"
            sectionTitle="MATERIAL CATEGORY"
          />
        </div>
        
        {/* Carbon Materials Section */}
        <div ref={carbonMaterialsRef} id="carbon-materials">
          <ProductRangeSection
            id="carbon-materials"
            title="Carbon Materials"
            subtitle="High-purity carbon additives for precise carbon control in steel production"
            products={carbonMaterials}
            sectionNumber="05"
            sectionTitle="MATERIAL CATEGORY"
          />
        </div>
        
        {/* Metals & Minerals Section */}
        <div ref={metalsMineralsRef} id="metals-minerals">
          <ProductRangeSection
            id="metals-minerals"
            title="Metals & Minerals"
            subtitle="Essential raw materials and minerals for steel manufacturing processes"
            products={metalsMinerals}
            background="gray"
            sectionNumber="06"
            sectionTitle="MATERIAL CATEGORY"
          />
        </div>

        {/* Success Stories Section */}
        {/* <section 
          ref={successStoriesRef}
          id="success-stories"
          className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-24 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-wider font-lato text-gray-500 mb-2">IN THIS SECTION</p>
                <span className="text-4xl font-bold font-lato text-[#203663]">07</span>
              </div>
              <h2 className="text-3xl uppercase md:text-4xl font-bold font-lato text-[#203663] mb-6">Success Stories</h2>
              <p className="text-xl text-gray-700 font-lato">{successStoriesData.subtitle}</p>
            </div>
            <InfiniteMovingCardsDemo stories={successStoriesData.stories} />
          </div>
        </section> */}
      </div>
    </div>
  );
} 