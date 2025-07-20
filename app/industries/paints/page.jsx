'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Color Precision",
    description: "Ultra-consistent pigments and colorants with batch-to-batch uniformity. Exact color reproduction across global production facilities."
  },
  {
    title: "Performance Materials",
    description: "Advanced formulation components engineered for specific coating requirements. Beyond basic—materials that define premium performance."
  },
  {
    title: "Technical Partnership",
    description: "Coating specialists who understand your formulation challenges. We solve performance issues, not just supply ingredients."
  },
  {
    title: "Supply Reliability",
    description: "Multi-source network ensuring uninterrupted material availability. Your production schedule remains intact regardless of market fluctuations."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Material Consistency",
    description: "Batch-to-batch uniformity with molecular-level precision. Eliminating variables from your coating formulations for predictable results."
  },
  {
    title: "Environmental Compliance",
    description: "Low-VOC and eco-friendly materials meeting global regulatory standards. Sustainable solutions that anticipate tomorrow's requirements."
  },
  {
    title: "Performance Enhancement",
    description: "Advanced additives that improve durability, adhesion, and application properties. Maximum coating performance with minimal compromise."
  },
  {
    title: "Cost Optimization",
    description: "Premium materials that improve efficiency and reduce waste. Better coverage, faster drying, fewer coats—economics that make sense."
  }
];

// Product data for paints industry materials
const paintsMaterials = [
  {
    title: "Titanium Dioxide",
    description: "Ultra-pure white pigment with superior opacity, brightness and UV resistance, the foundation of high-performance white and light-colored paints.",
    image: "https://images.unsplash.com/photo-1562789193-eac9d1db5a7d?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Organic Pigments",
    description: "Vibrant, lightfast colorants with exceptional tinting strength and purity, designed for consistent color reproduction across production batches.",
    image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Specialty Resins",
    description: "Advanced binding polymers that provide superior adhesion, durability, and chemical resistance for premium architectural and industrial coatings.",
    image: "https://images.unsplash.com/photo-1589398908284-12e22929df63?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Rheology Modifiers",
    description: "Precision flow-control additives that optimize application properties, prevent sagging, and improve leveling for perfect finish quality.",
    image: "https://images.unsplash.com/photo-1535850579364-952ef600d22e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Performance Extenders",
    description: "Engineered mineral fillers that enhance coating properties while optimizing cost, including improved scrub resistance and reduced material consumption.",
    image: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Specialty Solvents",
    description: "High-purity, low-VOC carriers designed for optimal film formation, flow characteristics, and environmental compliance in modern coating systems.",
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Functional Additives",
    description: "Advanced performance enhancers including dispersants, defoamers, and wetting agents that optimize manufacturing efficiency and coating quality.",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Biocides & Preservatives",
    description: "Specialized protection agents that ensure long-term coating stability and prevent microbial degradation in both the can and applied film.",
    image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function PaintsIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Paints Industry"
      subtitle="Supplying premium raw materials for coating formulations with exceptional quality and technical expertise."
      backgroundImage="https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3"
      sideText="PAINTS INDUSTRY"
      overviewData={{
        subtitle: "Empowering coating innovation with precision-engineered materials and formulation support",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the critical challenges in modern paint and coating production",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Paint Formulation",
        subtitle: "Premium quality raw materials essential for superior coating performance",
        products: paintsMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading paint manufacturers worldwide"
      }}
      showSuccessStories={true}
    />
  );
} 