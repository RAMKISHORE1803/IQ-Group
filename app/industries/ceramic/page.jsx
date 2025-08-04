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
    image: "/kaolinclay.webp"
  },
  {
    title: "Ball Clay",
    description: "Highly plastic sedimentary clay with fine particle size, used to improve workability and strength in ceramic bodies and glazes.",
    image: "/ballclay.webp"
  },
  {
    title: "Feldspar",
    description: "Natural flux material that lowers melting temperatures and promotes vitrification in ceramic bodies, essential for porcelain and glazes.",
    image: "/feldspar.jpeg"
  },
  {
    title: "Silica",
    description: "High-purity quartz material that provides structural stability, reduces shrinkage, and controls thermal expansion in ceramic formulations.",
    image: "/silica.webp"
  },
  {
    title: "Alumina",
    description: "Advanced ceramic material with exceptional hardness, thermal conductivity, and electrical insulation properties for technical ceramic applications.",
    image: "/alumina.webp"
  },
  {
    title: "Zirconia",
    description: "Premium ceramic material offering superior strength, fracture toughness and thermal stability for advanced technical and medical applications.",
    image: "/zircon.webp"
  },
  {
    title: "Bentonite",
    description: "Highly plastic clay with excellent suspension and binding properties, used as an additive to improve workability in ceramic bodies.",
        image: "/bentonite.webp"
      },
  {
    title: "Talc",
    description: "Soft mineral that reduces thermal expansion, improves thermal shock resistance, and enhances machinability in ceramic formulations.",
    image: "/talc.webp"
  }
];

export default function CeramicIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Ceramic Industry"
      subtitle="Supplying premium raw materials for ceramic manufacturing with exceptional purity and consistent quality."
      backgroundImage="https://images.unsplash.com/photo-1481401908818-600b7a676c0d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
      showSuccessStories={false}
    />
  );
} 