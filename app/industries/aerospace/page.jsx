'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Certified Excellence",
    description: "Aerospace-grade materials meeting AS9100 and NADCAP requirements. Every batch documented with complete material traceability and certification."
  },
  {
    title: "Performance Reliability",
    description: "Ultra-consistent materials engineered for extreme operating conditions. Maintaining properties from sea level to stratosphere, -65°C to +150°C."
  },
  {
    title: "Technical Partnership",
    description: "Aerospace specialists who understand material requirements at system level. We solve engineering challenges, not just supply components."
  },
  {
    title: "Supply Security",
    description: "Multi-source network with dedicated aerospace inventory reserves. Your production schedule remains protected from global supply disruptions."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Weight Reduction",
    description: "Advanced lightweight materials that exceed structural requirements. Every gram saved translates to fuel efficiency and increased payload capacity."
  },
  {
    title: "Extreme Performance",
    description: "Materials engineered for exceptional strength-to-weight ratios and temperature resistance. Maintaining integrity where standard materials fail."
  },
  {
    title: "Regulatory Compliance",
    description: "Fully documented materials meeting global aerospace standards. Comprehensive certification packages supporting your qualification requirements."
  },
  {
    title: "Sustainable Aviation",
    description: "Next-generation materials aligned with aerospace sustainability initiatives. Supporting your path to reduced emissions and environmental impact."
  }
];

// Product data for aerospace industry materials
const aerospaceMaterials = [
  {
    title: "Aerospace Alloys",
    description: "High-performance aluminum, titanium, and nickel-based superalloys with precise chemistry and microstructure for critical aerospace applications.",
    image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Advanced Composites",
    description: "Carbon fiber, aramid, and glass reinforcements with aerospace-grade resins for exceptional strength-to-weight ratio and durability.",
    image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Specialty Fasteners",
    description: "High-strength, lightweight fastening systems with superior fatigue resistance and corrosion protection for critical aerospace structures.",
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "High-Temperature Materials",
    description: "Advanced ceramics and metal matrix composites designed for extreme temperature environments in propulsion systems and thermal protection.",
    image: "https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Aerospace Adhesives",
    description: "Specialized bonding solutions with exceptional strength, temperature resistance, and durability for critical aerospace assembly applications.",
    image: "https://images.unsplash.com/photo-1589398908284-12e22929df63?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Specialty Coatings",
    description: "High-performance protective systems providing corrosion resistance, thermal protection, and specialized functionality for aerospace components.",
    image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Precision Machining Materials",
    description: "Ultra-pure materials with consistent machinability characteristics for aerospace components requiring exceptional dimensional precision.",
    image: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Specialty Lubricants",
    description: "Advanced formulations for aerospace applications requiring extreme temperature stability, long service life, and compatibility with aerospace materials.",
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function AerospaceIndustryPage() {
  return (
    <IndustryPageTemplate
      title=""
      subtitle="Supplying certified aerospace materials with uncompromising quality and complete traceability."
      backgroundImage="https://images.unsplash.com/photo-1559297434-fae8a1916a79?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      sideText="AEROSPACE INDUSTRY"
      overviewData={{
        subtitle: "Empowering aerospace innovation with precision-engineered materials and technical expertise",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the critical challenges in modern aerospace manufacturing",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Aerospace Applications",
        subtitle: "Certified aerospace-grade materials meeting the industry's most demanding requirements",
        products: aerospaceMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading aerospace manufacturers worldwide"
      }}
      showSuccessStories={true}
    />
  );
} 