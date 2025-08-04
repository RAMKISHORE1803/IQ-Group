'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Material Purity",
    description: "Premium aluminum raw materials with controlled impurity levels. Every shipment verified through advanced analytical methods for consistent performance."
  },
  {
    title: "Supply Reliability",
    description: "Multi-source network ensuring uninterrupted material availability. Your production schedule remains intact regardless of market fluctuations."
  },
  {
    title: "Technical Partnership",
    description: "Aluminum specialists who understand light metal production at molecular level. We solve performance issues, not just supply raw materials."
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing protocols exceeding industry standards. Complete traceability and documentation supporting your quality management system."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Energy Efficiency",
    description: "Advanced materials that optimize melting and processing efficiency. Lower energy consumption without compromising aluminum quality or throughput."
  },
  {
    title: "Alloy Performance",
    description: "Precision alloying elements that enhance specific material properties. Tailored solutions for strength, conductivity, formability, and corrosion resistance."
  },
  {
    title: "Sustainable Production",
    description: "Eco-conscious materials and processes aligned with carbon reduction goals. Meeting environmental standards while maintaining premium quality."
  },
  {
    title: "Process Optimization",
    description: "Strategic material solutions that improve production efficiency. Better yields, reduced processing time, fewer defects—better economics."
  }
];

// Product data for aluminum industry materials
const aluminumMaterials = [
  {
    title: "Alumina",
    description: "High-purity aluminum oxide with controlled chemistry and particle size distribution, the essential raw material for primary aluminum production.",
    image: "/alumina.webp"
  },
  {
    title: "Alloying Elements",
    description: "Precision-grade copper, magnesium, silicon, zinc, and manganese for creating specific aluminum alloy compositions with tailored properties.",
    image: "/alloyingelements.webp"
  },
  {
    title: "Master Alloys",
    description: "Specialized pre-alloyed materials for precise chemistry control, grain refinement, and microstructure modification in aluminum casting.",
    image: "/masteralloy.webp"
  },
  {
    title: "Fluxes & Salts",
    description: "Advanced formulations for dross management, inclusion removal, and metal quality improvement in aluminum melting and casting operations.",
    image: "/fluxes.webp"
  },
  {
    title: "Grain Refiners",
    description: "High-performance titanium-boron materials that control solidification structure, improving mechanical properties and surface quality.",
    image: "/titaniumboron.webp"
  },
  {
    title: "Modifiers & Hardeners",
    description: "Specialized additives that enhance specific aluminum properties, from strontium for silicon modification to hardeners for strength improvement.",
    image: "/modifiers.webp"
  },
  {
    title: "Degassing Materials",
    description: "Premium purification materials that remove hydrogen and inclusions from molten aluminum, improving casting quality and mechanical properties.",
    image: "/degrassing.webp"
  },
  {
    title: "Carbon Products",
    description: "High-performance anodes, cathodes, and other carbon materials essential for the electrolytic reduction process in primary aluminum production.",
    image: "/graphite.jpeg"
  }
];

export default function AluminumIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Aluminum Industry"
      subtitle="Supplying premium materials for aluminum production with exceptional quality and technical expertise."
      backgroundImage="/industries/aluminium.jpg"
      sideText="ALUMINUM INDUSTRY"
      overviewData={{
        subtitle: "Empowering aluminum innovation with precision-engineered materials and metallurgical expertise",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the critical challenges in modern aluminum production",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Aluminum Production",
        subtitle: "Premium quality raw materials essential for superior aluminum performance",
        products: aluminumMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading aluminum producers worldwide"
      }}
      showSuccessStories={false}
    />
  );
}