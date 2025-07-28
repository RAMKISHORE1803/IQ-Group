'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Thermal Excellence",
    description: "Ultra-high temperature materials engineered for thermal stability at extreme conditions. Performance measured in hours, not minutes."
  },
  {
    title: "Custom Formulations",
    description: "Proprietary material blends tailored for specific thermal profiles and chemical environments. Beyond standard—precisely optimized."
  },
  {
    title: "Quality Assurance",
    description: "Rigorous multi-stage testing exceeding industry standards. Every shipment verified for chemistry, particle size, and thermal performance."
  },
  {
    title: "Technical Partnership",
    description: "Material scientists dedicated to your specific refractory challenges. We collaborate on solutions, not just supply materials."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Temperature Extremes",
    description: "Materials engineered for stability beyond conventional thermal limits. Maintaining structural integrity where others simply fail."
  },
  {
    title: "Chemical Resistance",
    description: "Specialized formulations that withstand aggressive chemical environments. Corrosion resistance measured in years, not months."
  },
  {
    title: "Energy Efficiency",
    description: "Advanced thermal management materials that minimize heat loss. Lower energy consumption while maintaining optimal process temperatures."
  },
  {
    title: "Operational Longevity",
    description: "Refractory solutions designed for extended service life. Reducing maintenance intervals and total cost of ownership."
  }
];

// Product data for refractory industry materials
const refractoryMaterials = [
  {
    title: "Alumina",
    description: "High-purity aluminum oxide material with excellent thermal resistance up to 1750°C, ideal for applications requiring chemical inertness and wear resistance.",
    image: "https://images.unsplash.com/photo-1612521564730-95e6eaa9c2ec?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Magnesia",
    description: "Premium magnesium oxide material with superior high-temperature stability and excellent resistance to basic slags and alkaline environments.",
    image: "https://images.unsplash.com/photo-1562789193-eac9d1db5a7d?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Silicon Carbide",
    description: "Advanced technical ceramic with exceptional hardness, thermal conductivity and oxidation resistance, perfect for high-wear and thermal shock applications.",
    image: "https://images.unsplash.com/photo-1629115916087-31b1a8ea7cd4?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Zircon",
    description: "Natural zirconium silicate with low thermal expansion and excellent chemical stability, ideal for glass-contact applications and precision casting.",
    image: "https://images.unsplash.com/photo-1558346547-8961a464dfb1?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Fused Silica",
    description: "Ultra-pure silicon dioxide material with near-zero thermal expansion, providing exceptional thermal shock resistance for critical applications.",
    image: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Chrome Alumina",
    description: "Specialized material combining chromium oxide and alumina for superior corrosion resistance in aggressive environments, particularly in cement kilns.",
    image: "https://images.unsplash.com/photo-1634467524884-897e69632ffb?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Bauxite",
    description: "High-alumina raw material essential for manufacturing abrasion-resistant refractories with excellent structural strength at elevated temperatures.",
    image: "https://images.unsplash.com/photo-1643222379794-2564d4041ec5?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Graphite",
    description: "High-carbon material with outstanding thermal conductivity and chemical stability, used in crucibles and specialized high-temperature applications.",
    image: "https://images.unsplash.com/photo-1631171426626-a90e3f7a8d98?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function RefractoryIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Refractory"
      subtitle="Providing advanced high-temperature materials for the most demanding thermal applications across global industries."
      backgroundImage="https://www.refractoriesinstitute.org/tri-includes/images/common/what-is-a-refractory-main.jpg"
      sideText="REFRACTORY"
      overviewData={{
        subtitle: "Empowering extreme-temperature operations with precisely engineered thermal solutions",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the critical challenges in high-temperature industrial applications",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Refractory Applications",
        subtitle: "Premium quality raw materials designed for the most extreme thermal environments",
        products: refractoryMaterials
      }}
      successStoriesData={{
        subtitle: "Proven performance in the world's most demanding high-temperature applications"
      }}
      showSuccessStories={true}
    />
  );
} 