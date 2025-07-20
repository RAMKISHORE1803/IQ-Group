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
    image: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Soda Ash",
    description: "Premium sodium carbonate that acts as a flux to lower the melting temperature of silica, essential for economical glass production.",
    image: "https://images.unsplash.com/photo-1550047506-25b6cd9f0aad?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Limestone",
    description: "High-quality calcium carbonate that acts as a stabilizer in glass formulations, improving durability and chemical resistance.",
    image: "https://images.unsplash.com/photo-1598104358204-117bc812c6c1?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Feldspar",
    description: "Natural aluminum silicate mineral that introduces alumina into glass compositions, improving durability, viscosity, and working properties.",
    image: "https://images.unsplash.com/photo-1557586043-40d37b9d3db0?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Dolomite",
    description: "Calcium magnesium carbonate that provides both CaO and MgO to glass formulations, enhancing chemical durability and resistance to weathering.",
    image: "https://images.unsplash.com/photo-1550047506-25b6cd9f0aad?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Specialty Oxides",
    description: "Premium metal oxides including boron, barium, and zinc compounds that modify specific properties for specialty and technical glass applications.",
    image: "https://images.unsplash.com/photo-1612521564730-95e6eaa9c2ec?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Colorants",
    description: "Precisely formulated metal oxide compounds that impart specific colors to glass while maintaining clarity, stability, and desired working properties.",
    image: "https://images.unsplash.com/photo-1534842408450-2811c9979d71?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Cullet",
    description: "Processed recycled glass with controlled chemistry and particle size, used to reduce raw material costs and lower energy consumption in glass production.",
    image: "https://images.unsplash.com/photo-1518893883800-45cd0954574b?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function GlassIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Glass Industry"
      subtitle="Supplying ultra-pure raw materials for glass manufacturing with exceptional quality and technical expertise."
      backgroundImage="https://images.unsplash.com/photo-1518893883800-45cd0954574b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
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