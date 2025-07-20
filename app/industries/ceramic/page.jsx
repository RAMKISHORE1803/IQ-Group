'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Precision Formulation",
    description: "Custom-engineered ceramic materials with exact particle size distribution. Consistency measured in microns, not millimeters."
  },
  {
    title: "Global Sourcing",
    description: "Rare earth minerals and specialty clays sourced from premier deposits worldwide. Quality verified at every extraction point."
  },
  {
    title: "Technical Support",
    description: "Material scientists dedicated to your specific application. Beyond suppliers—we're your ceramic engineering partners."
  },
  {
    title: "Supply Reliability",
    description: "Multi-source network ensures uninterrupted material flow. Your production schedule remains intact, regardless of market conditions."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Material Purity",
    description: "Ultra-refined materials with contaminant levels measured in parts per million. Zero compromise for your most demanding applications."
  },
  {
    title: "Process Consistency",
    description: "Batch-to-batch uniformity that eliminates production variables. Your quality control starts with our material consistency."
  },
  {
    title: "Sustainable Practices",
    description: "Environmentally responsible extraction and processing. Meeting tomorrow's regulations while delivering today's performance requirements."
  },
  {
    title: "Technical Evolution",
    description: "Advanced materials for next-generation ceramic applications. Partnering with you to develop the ceramics of tomorrow."
  }
];

// Product data for ceramic industry materials
const ceramicMaterials = [
  {
    title: "Kaolin Clay",
    description: "High-purity white clay essential for fine porcelain, whiteware, and advanced ceramic applications requiring excellent plasticity and firing properties.",
    image: "https://images.unsplash.com/photo-1635452335210-3e7aaae8634b?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Ball Clay",
    description: "Highly plastic sedimentary clay with fine particle size, used to improve workability and strength in ceramic bodies and glazes.",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Feldspar",
    description: "Natural flux material that lowers melting temperatures and promotes vitrification in ceramic bodies, essential for porcelain and glazes.",
    image: "https://images.unsplash.com/photo-1557586043-40d37b9d3db0?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Silica",
    description: "High-purity quartz material that provides structural stability, reduces shrinkage, and controls thermal expansion in ceramic formulations.",
    image: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Alumina",
    description: "Advanced ceramic material with exceptional hardness, thermal conductivity, and electrical insulation properties for technical ceramic applications.",
    image: "https://images.unsplash.com/photo-1612521564730-95e6eaa9c2ec?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Zirconia",
    description: "Premium ceramic material offering superior strength, fracture toughness and thermal stability for advanced technical and medical applications.",
    image: "https://images.unsplash.com/photo-1581093196277-9f608bb3b511?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Bentonite",
    description: "Highly plastic clay with excellent suspension and binding properties, used as an additive to improve workability in ceramic bodies.",
    image: "https://images.unsplash.com/photo-1635452335210-3e7aaae8634b?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Talc",
    description: "Soft mineral that reduces thermal expansion, improves thermal shock resistance, and enhances machinability in ceramic formulations.",
    image: "https://images.unsplash.com/photo-1558346547-8961a464dfb1?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function CeramicIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Ceramic Industry"
      subtitle="Supplying premium raw materials for ceramic manufacturing with exceptional purity and consistent quality."
      backgroundImage="https://images.unsplash.com/photo-1565193298357-c5f6b0ac8ab4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      sideText="CERAMIC INDUSTRY"
      overviewData={{
        subtitle: "Powering ceramic innovation with precisely engineered materials and technical expertise",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Addressing the critical challenges facing modern ceramic production",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Ceramic Production",
        subtitle: "Premium quality raw materials essential for advanced ceramic manufacturing",
        products: ceramicMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading ceramic manufacturers worldwide"
      }}
      showSuccessStories={true}
    />
  );
} 