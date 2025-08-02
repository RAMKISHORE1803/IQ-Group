'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Material Purity",
    description: "Ultra-refined raw materials with impurity levels measured in parts per billion. Perfect clarity begins with perfect ingredients."
  },
  {
    title: "Formulation Precision",
    description: "Custom material blends calibrated to your specific glass chemistry. Beyond commodities—ingredients engineered for your formula."
  },
  {
    title: "Technical Support",
    description: "Glass scientists dedicated to your specific manufacturing challenges. We troubleshoot compositions, not just supply materials."
  },
  {
    title: "Supply Reliability",
    description: "Multi-source network ensuring uninterrupted material flow. Your production continues regardless of regional availability challenges."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Quality Consistency",
    description: "Batch-to-batch uniformity with precision chemistry control. Eliminating variables from your glass manufacturing for predictable results."
  },
  {
    title: "Energy Efficiency",
    description: "Materials engineered for optimal melting profiles and reduced energy consumption. Lower temperatures, faster melting, better economics."
  },
  {
    title: "Sustainable Production",
    description: "Eco-conscious materials aligned with carbon reduction targets. Meeting tomorrow's environmental standards while enhancing today's glass."
  },
  {
    title: "Material Evolution",
    description: "Next-generation formulation components for specialty glass applications. Pushing performance boundaries for your most innovative products."
  }
];

// Product data for glass industry materials
const glassMaterials = [
  {
    title: "Silica Sand",
    description: "High-purity quartz sand with controlled particle size distribution and minimal impurities, the primary component in glass formulations.",
    image: "/silicasand.avif"
  },
  {
    title: "Soda Ash",
    description: "Premium sodium carbonate that acts as a flux to lower the melting temperature of silica, essential for economical glass production.",
    image: "/sodaash.webp"
  },
  {
    title: "Limestone",
    description: "High-quality calcium carbonate that acts as a stabilizer in glass formulations, improving durability and chemical resistance.",
    image: "/limestone.jpg"
  },
  {
    title: "Feldspar",
    description: "Natural aluminum silicate mineral that introduces alumina into glass compositions, improving durability, viscosity, and working properties.",
    image: "/feldspar.jpeg"
  },
  {
    title: "Dolomite",
    description: "Calcium magnesium carbonate that provides both CaO and MgO to glass formulations, enhancing chemical durability and resistance to weathering.",
    image: "/dolomitr.jpg"
  },
  {
    title: "Specialty Oxides",
    description: "Premium metal oxides including boron, barium, and zinc compounds that modify specific properties for specialty and technical glass applications.",
    image: "/specialtyoxides.webp"
  },
  {
    title: "Colorants",
    description: "Precisely formulated metal oxide compounds that impart specific colors to glass while maintaining clarity, stability, and desired working properties.",
    image: "/colorants.webp"
  },
  {
    title: "Cullet",
    description: "Processed recycled glass with controlled chemistry and particle size, used to reduce raw material costs and lower energy consumption in glass production.",
    image: "/cullet.webp"
  }
];

export default function GlassIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Glass Industry"
      subtitle="Supplying ultra-pure raw materials for glass manufacturing with exceptional quality and technical expertise."
      backgroundImage="https://assets.lummi.ai/assets/QmdjvE5DEVkpGMDUNBQtTgMXXXNBnrxgeBk5Q6RTka9GHM?auto=format&w=1500"
      sideText="GLASS INDUSTRY"
      overviewData={{
        subtitle: "Empowering glass innovation with precision-engineered materials and technical support",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the critical challenges in modern glass production",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Glass Manufacturing",
        subtitle: "Premium quality raw materials essential for superior glass production",
        products: glassMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading glass manufacturers worldwide"
      }}
      showSuccessStories={true}
    />
  );
} 