'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Material Quality",
    description: "Premium paper chemicals and additives with batch-to-batch consistency. Every shipment verified for purity and performance characteristics."
  },
  {
    title: "Process Optimization",
    description: "Specialized formulations engineered for modern papermaking equipment. Maximum efficiency with minimal waste and environmental impact."
  },
  {
    title: "Technical Partnership",
    description: "Paper specialists who understand fiber chemistry at molecular level. We solve performance issues, not just supply chemicals."
  },
  {
    title: "Supply Reliability",
    description: "Multi-source network ensuring uninterrupted material availability. Your production schedule remains intact regardless of market fluctuations."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Sustainable Production",
    description: "Eco-friendly paper chemicals that reduce water and energy consumption. Meeting environmental standards while enhancing paper quality."
  },
  {
    title: "Performance Enhancement",
    description: "Advanced additives that improve paper properties and functionality. Better strength, printability, and appearance without compromising runnability."
  },
  {
    title: "Cost Optimization",
    description: "High-efficiency materials that improve manufacturing economics. Better retention, faster drainage, reduced breaks—better margins."
  },
  {
    title: "Fiber Utilization",
    description: "Innovative solutions that maximize fiber performance. Getting more from less fiber while maintaining or improving paper quality."
  }
];

// Product data for paper industry materials
const paperMaterials = [
  {
    title: "Retention Aids",
    description: "Advanced polymer systems that improve filler and fiber retention, enhancing formation quality while reducing raw material loss.",
    image: "https://images.unsplash.com/photo-1589398908284-12e22929df63?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Sizing Agents",
    description: "Specialized materials that control water penetration and ink absorption, essential for printability and converting performance.",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Strength Additives",
    description: "Premium dry and wet strength resins that enhance paper durability, enabling weight reduction while maintaining performance.",
    image: "https://images.unsplash.com/photo-1589398908284-12e22929df63?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Specialty Fillers",
    description: "Engineered mineral products with controlled particle size and surface chemistry for optimal opacity, brightness, and printability.",
    image: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Coating Chemicals",
    description: "Advanced formulations for paper coating applications, providing superior surface properties for premium printing and packaging.",
    image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Process Chemicals",
    description: "Specialized additives for deposit control, foam management, and machine cleanliness that optimize papermaking efficiency.",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Functional Additives",
    description: "Innovative materials that impart specific properties like water resistance, oil and grease resistance, and antimicrobial functionality.",
    image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Sustainable Solutions",
    description: "Eco-friendly alternatives to traditional paper chemicals, designed for biodegradability and reduced environmental impact.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function PaperIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Paper Industry"
      subtitle="Supplying premium chemicals and additives for papermaking with exceptional quality and technical support."
      backgroundImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      sideText="PAPER INDUSTRY"
      overviewData={{
        subtitle: "Empowering paper innovation with precision-engineered materials and processing expertise",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the critical challenges in modern paper manufacturing",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Paper Manufacturing",
        subtitle: "Premium quality chemicals and additives essential for superior paper performance",
        products: paperMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading paper manufacturers worldwide"
      }}
      showSuccessStories={true}
    />
  );
} 