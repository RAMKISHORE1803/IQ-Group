'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Material Quality",
    description: "Premium textile chemicals and additives with batch-to-batch consistency. Every shipment verified for purity and performance characteristics."
  },
  {
    title: "Process Optimization",
    description: "Specialized formulations engineered for modern textile processing equipment. Maximum efficiency with minimal waste and environmental impact."
  },
  {
    title: "Technical Partnership",
    description: "Textile specialists who understand fabric chemistry at molecular level. We solve performance issues, not just supply chemicals."
  },
  {
    title: "Supply Reliability",
    description: "Multi-source network ensuring uninterrupted material availability. Your production schedule remains intact regardless of market fluctuations."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Sustainable Processing",
    description: "Eco-friendly textile chemicals that reduce water and energy consumption. Meeting environmental standards while enhancing fabric performance."
  },
  {
    title: "Performance Enhancement",
    description: "Advanced additives that improve fabric properties and functionality. Better durability, comfort, and appearance without compromising processability."
  },
  {
    title: "Cost Optimization",
    description: "High-efficiency materials that improve manufacturing economics. Lower processing temperatures, faster cycles, reduced waste—better margins."
  },
  {
    title: "Regulatory Compliance",
    description: "REACH, OEKO-TEX, and ZDHC compliant formulations. Staying ahead of global textile chemical regulations while maintaining performance."
  }
];

// Product data for textile industry materials
const textileMaterials = [
  {
    title: "Specialty Dyes",
    description: "High-performance colorants with exceptional fastness properties, designed for specific fiber types and application methods.",
    image: "/specialtydye.webp"
  },
  {
    title: "Processing Auxiliaries",
    description: "Advanced wetting agents, detergents, and dispersants that optimize textile preparation processes while reducing water and energy consumption.",
    image: "/processingauxiliaries.webp"
  },
  {
    title: "Functional Finishes",
    description: "Specialized chemical treatments providing water repellency, flame retardancy, antimicrobial properties, and other performance enhancements.",
    image: "/functionalfinishes.webp"
  },
  {
    title: "Textile Softeners",
    description: "Premium fabric conditioners with controlled molecular structure for optimal softness, drape, and comfort without compromising other properties.",
    image: "/textilesofteners.webp"
  },
  {
    title: "Coating Polymers",
    description: "Advanced polymer systems for textile coating applications, providing water resistance, breathability, and enhanced durability.",
    image: "/coatingpolymers.webp"
  },
  {
    title: "Printing Binders",
    description: "Specialized binding agents for textile printing that provide excellent color yield, wash fastness, and soft hand feel.",
    image: "/printingbinders.webp"
  },
  {
    title: "Fiber Lubricants",
    description: "High-performance processing aids that improve fiber cohesion, reduce friction, and enhance processing efficiency in spinning and weaving.",
    image: "/fiberlubricants.webp"
  },
  {
    title: "Eco-Friendly Enzymes",
    description: "Specialized biological catalysts for textile processing that reduce energy consumption, improve fabric quality, and minimize environmental impact.",
    image: "/ecofriendlyenzymes.webp"
  }
];

export default function TextileIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Textile Industry"
      subtitle="Supplying premium chemicals and additives for textile processing with exceptional quality and technical support."
      backgroundImage="https://assets.lummi.ai/assets/QmNpyxgXoXt78SXLsfBTdqADVQzN7DBv9WFqu5bfkaRDGF?auto=format&w=1500"
      sideText="TEXTILE INDUSTRY"
      overviewData={{
        subtitle: "Empowering textile innovation with precision-engineered materials and processing expertise",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the critical challenges in modern textile manufacturing",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Textile Processing",
        subtitle: "Premium quality chemicals and additives essential for superior fabric performance",
        products: textileMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading textile manufacturers worldwide"
      }}
      showSuccessStories={true}
    />
  );
} 