'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Material Purity",
    description: "Ultra-refined battery materials with impurity levels measured in parts per billion. Every trace element controlled for optimal electrochemical performance."
  },
  {
    title: "Performance Reliability",
    description: "Consistent materials engineered for specific battery chemistries. Eliminating variables from your cell manufacturing for predictable performance."
  },
  {
    title: "Technical Partnership",
    description: "Battery specialists who understand electrochemistry at molecular level. We solve performance challenges, not just supply materials."
  },
  {
    title: "Supply Security",
    description: "Strategic sourcing network with diversified supply chains. Your production remains protected from regional disruptions and material shortages."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Energy Density",
    description: "Advanced materials that maximize energy storage capacity. More power in less space without compromising safety or cycle life."
  },
  {
    title: "Cycle Performance",
    description: "Materials engineered for extended charge-discharge stability. Maintaining capacity through thousands of cycles for longer battery lifetime."
  },
  {
    title: "Sustainable Production",
    description: "Eco-conscious materials with reduced environmental footprint. Supporting your ESG goals while meeting performance and cost targets."
  },
  {
    title: "Material Innovation",
    description: "Next-generation battery components for emerging technologies. Staying ahead of solid-state, sodium-ion, and other advanced battery chemistries."
  }
];

// Product data for battery industries materials
const batteryMaterials = [
  {
    title: "Cathode Materials",
    description: "High-performance lithium metal oxides with precise stoichiometry and particle morphology for optimal energy density and cycle stability.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Anode Materials",
    description: "Engineered graphite, silicon composites, and next-generation anode materials with controlled particle size and surface characteristics.",
    image: "https://images.unsplash.com/photo-1631171426626-a90e3f7a8d98?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Electrolyte Components",
    description: "Ultra-pure lithium salts, solvents, and additives formulated for optimal ionic conductivity, stability, and safety across operating conditions.",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Separator Materials",
    description: "High-performance polymer and ceramic materials with precise porosity, thickness, and mechanical properties for battery safety and performance.",
    image: "https://images.unsplash.com/photo-1620208923217-62e0f24f0277?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Current Collectors",
    description: "Precision-engineered copper and aluminum foils with controlled surface treatment for optimal electrode adhesion and electrical conductivity.",
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Conductive Additives",
    description: "High-purity carbon blacks and graphene materials that enhance electrode conductivity while minimizing inactive material content.",
    image: "https://images.unsplash.com/photo-1598970434795-0c5fe7c91c89?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Binders & Adhesives",
    description: "Specialized polymer systems that provide mechanical integrity to electrodes while optimizing electrochemical performance and processability.",
    image: "https://images.unsplash.com/photo-1589398908284-12e22929df63?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Battery-Grade Metals",
    description: "Ultra-pure lithium, cobalt, nickel, and manganese compounds with strict control of impurities for consistent battery performance.",
    image: "https://images.unsplash.com/photo-1563046383-7e25bc03e58f?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function BatteryIndustriesPage() {
  return (
    <IndustryPageTemplate
      title="Battery Industries"
      subtitle="Supplying premium materials for advanced energy storage with exceptional purity and performance."
      backgroundImage="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      sideText="BATTERY INDUSTRIES"
      overviewData={{
        subtitle: "Empowering energy storage innovation with precision-engineered materials and technical expertise",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the critical challenges in modern battery manufacturing",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Battery Production",
        subtitle: "Premium quality raw materials essential for superior battery performance",
        products: batteryMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading battery manufacturers worldwide"
      }}
      showSuccessStories={true}
    />
  );
} 