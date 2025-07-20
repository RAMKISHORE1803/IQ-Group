'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Chemical Purity",
    description: "Ultra-refined materials with impurity levels measured in parts per million. Every batch verified through advanced analytical chemistry."
  },
  {
    title: "Supply Reliability",
    description: "Strategic global sourcing network ensuring consistent material availability. Your production schedule remains secure regardless of market shifts."
  },
  {
    title: "Technical Partnership",
    description: "Chemical engineers dedicated to your specific processing requirements. Beyond suppliers—we're your formulation and process optimization allies."
  },
  {
    title: "Regulatory Expertise",
    description: "Complete documentation and compliance support for complex chemical regulations worldwide. Navigating compliance so you don't have to."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Material Consistency",
    description: "Batch-to-batch uniformity with molecular-level precision. Eliminating variables from your chemical processing and production equations."
  },
  {
    title: "Environmental Compliance",
    description: "Eco-conscious materials meeting global regulatory requirements. Sustainable solutions that keep you ahead of compliance curves."
  },
  {
    title: "Process Efficiency",
    description: "Premium reagents and catalysts that accelerate reactions and improve yields. Maximum output with minimized energy and material consumption."
  },
  {
    title: "Safety Assurance",
    description: "Rigorously tested materials with comprehensive safety data. Protecting your personnel, processes, and the environment at every step."
  }
];

// Product data for chemical industry materials
const chemicalMaterials = [
  {
    title: "Industrial Catalysts",
    description: "High-performance catalytic materials designed to accelerate specific chemical reactions, improve selectivity, and increase production efficiency.",
    image: "https://images.unsplash.com/photo-1616661317361-b8a30bef3321?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Process Minerals",
    description: "Specialized minerals with precise physical and chemical properties for filtration, adsorption, and process enhancement applications.",
    image: "https://images.unsplash.com/photo-1563046383-7e25bc03e58f?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Industrial Acids",
    description: "High-purity acids with tightly controlled concentrations for precise chemical processing, cleaning, and manufacturing applications.",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Specialty Alkalis",
    description: "Premium alkaline compounds with controlled reactivity for neutralization, precipitation, and specialized chemical manufacturing processes.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Industrial Solvents",
    description: "High-purity solvents with precise specifications for extraction, cleaning, and reaction medium applications across diverse industries.",
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Specialty Silicates",
    description: "Advanced silicon-based materials used in catalyst supports, detergents, and specialty chemical formulations requiring precise performance characteristics.",
    image: "https://images.unsplash.com/photo-1598104358204-117bc812c6c1?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Industrial Salts",
    description: "High-purity inorganic compounds with controlled particle size and chemical composition for diverse chemical processing applications.",
    image: "https://images.unsplash.com/photo-1519500528352-2d1460418d41?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Chemical Additives",
    description: "Specialized performance enhancers designed to modify specific properties in chemical formulations, from pH control to viscosity modification.",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function ChemicalIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Chemical Industry"
      subtitle="Delivering premium raw materials and reagents for chemical processing with uncompromising purity and consistency."
      backgroundImage="https://images.unsplash.com/photo-1616661317361-b8a30bef3321?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      sideText="CHEMICAL INDUSTRY"
      overviewData={{
        subtitle: "Empowering chemical innovation with precisely controlled materials and technical expertise",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Addressing the critical challenges facing modern chemical processing operations",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Chemical Processing",
        subtitle: "Premium quality raw materials essential for advanced chemical manufacturing",
        products: chemicalMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading chemical manufacturers worldwide"
      }}
      showSuccessStories={true}
    />
  );
}
