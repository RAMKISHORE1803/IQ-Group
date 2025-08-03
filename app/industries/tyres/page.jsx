'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Performance Materials",
    description: "Advanced compounds engineered for specific tire performance characteristics. Beyond basic—materials that define premium tire behavior."
  },
  {
    title: "Consistent Quality",
    description: "Ultra-consistent raw materials with batch-to-batch uniformity. Eliminating variables from your tire manufacturing for predictable results."
  },
  {
    title: "Technical Partnership",
    description: "Rubber specialists who understand compound dynamics at molecular level. We solve performance issues, not just supply ingredients."
  },
  {
    title: "Supply Reliability",
    description: "Multi-source network ensuring uninterrupted material availability. Your production schedule remains intact regardless of market disruptions."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Performance Balance",
    description: "Advanced materials that optimize competing tire properties. Better grip without sacrificing wear, lower rolling resistance without compromising safety."
  },
  {
    title: "Sustainable Production",
    description: "Eco-conscious materials aligned with carbon reduction targets. Meeting tomorrow's environmental standards while enhancing today's performance."
  },
  {
    title: "Cost Optimization",
    description: "Premium materials that improve manufacturing efficiency. Better mixing, faster curing, fewer defects—economics that drive profitability."
  },
  {
    title: "Material Innovation",
    description: "Next-generation compounds for evolving tire requirements. Staying ahead of electric vehicle demands and autonomous driving specifications."
  }
];

// Product data for tyres industry materials
const tyresMaterials = [
  {
    title: "Natural Rubber",
    description: "Premium-grade natural polymers with controlled impurity levels and consistent molecular weight, the foundation of high-performance tire treads.",
    image: "/naturalrubber.jpg"
  },
  {
    title: "Synthetic Rubber",
    description: "Advanced polymer formulations including SBR, BR, and EPDM with precise specifications for optimal tire performance characteristics.",
    image: "/syntheticrrubber.jpg"
  },
  {
    title: "Carbon Black",
    description: "High-performance reinforcing fillers with controlled particle size, structure, and surface chemistry for optimal tire strength and wear resistance.",
    image: "/carbonblack.jpg"
  },
  {
    title: "Silica",
    description: "Engineered precipitated silica designed specifically for low rolling resistance tire compounds while maintaining excellent wet grip performance.",
    image: "/silica.webp"
  },
  {
    title: "Processing Oils",
    description: "Specialized plasticizers and extender oils that improve processing characteristics while meeting strict environmental and performance requirements.",
    image: "/processingoil.webp"
  },
  {
    title: "Specialty Chemicals",
    description: "Advanced vulcanization agents, accelerators, and antidegradants that optimize curing profiles and provide long-term tire durability.",
    image: "/specialtychemicals.webp"
  },
  {
    title: "Steel Cord",
    description: "High-tensile steel reinforcement with precise diameter control and advanced brass coating for optimal rubber adhesion in tire belts.",
    image: "/steelchord.webp"
  },
  {
    title: "Textile Reinforcement",
    description: "Engineered polyester, nylon, and aramid fabrics with controlled tensile properties and optimized adhesion characteristics for tire carcass construction.",
    image: "/textilereinforcements.webp"
  }
];

export default function TyresIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Tyres Industry"
      subtitle="Supplying premium raw materials for tire manufacturing with exceptional consistency and technical expertise."
      backgroundImage="/tyreindustrybg.png"
      sideText="TYRES INDUSTRY"
      overviewData={{
        subtitle: "Empowering tire innovation with precision-engineered materials and compound expertise",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the critical challenges in modern tire manufacturing",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Tire Manufacturing",
        subtitle: "Premium quality raw materials essential for superior tire performance",
        products: tyresMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading tire manufacturers worldwide"
      }}
      showSuccessStories={true}
    />
  );
} 