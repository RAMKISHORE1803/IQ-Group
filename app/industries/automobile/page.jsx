'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Engineered Performance",
    description: "Advanced materials precisely calibrated for automotive specifications. Beyond standard—components that define vehicle quality and safety."
  },
  {
    title: "Supply Reliability",
    description: "Multi-tier sourcing network ensuring just-in-time material availability. Your production line continues regardless of global supply challenges."
  },
  {
    title: "Technical Partnership",
    description: "Automotive specialists who understand material requirements at system level. We solve engineering challenges, not just supply components."
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing protocols exceeding automotive industry standards. Every batch verified for chemistry, physical properties, and performance."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Weight Reduction",
    description: "Advanced lightweight materials that maintain structural integrity. Improved fuel efficiency and range without compromising safety or performance."
  },
  {
    title: "Sustainable Manufacturing",
    description: "Eco-conscious materials aligned with carbon-neutral roadmaps. Meeting tomorrow's environmental standards while enhancing today's vehicles."
  },
  {
    title: "Cost Optimization",
    description: "Premium materials that improve manufacturing efficiency. Better processing, fewer rejects, longer tool life—economics that drive profitability."
  },
  {
    title: "Electric Evolution",
    description: "Next-generation materials for EV-specific requirements. Specialized solutions for battery systems, thermal management, and reduced NVH."
  }
];

// Product data for automobile industry materials
const automobileMaterials = [
  {
    title: "High-Strength Steel",
    description: "Advanced high-strength steel alloys with precise chemistry for optimal forming, welding, and crash performance in automotive structures.",
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Aluminum Alloys",
    description: "Lightweight, high-strength aluminum formulations with excellent formability and corrosion resistance for structural and body applications.",
    image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Engineering Polymers",
    description: "High-performance thermoplastics and composites designed for specific automotive applications requiring precise mechanical and thermal properties.",
    image: "https://images.unsplash.com/photo-1589398908284-12e22929df63?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Battery Materials",
    description: "Specialized materials for EV battery production including cathode and anode materials, electrolytes, and separator components.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Specialty Lubricants",
    description: "Advanced formulations for automotive applications requiring precise viscosity control, temperature stability, and long-term performance.",
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Elastomers & Seals",
    description: "High-performance rubber compounds engineered for specific automotive sealing applications with excellent temperature and chemical resistance.",
    image: "https://images.unsplash.com/photo-1589982334414-c79c022d66e1?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Coating Materials",
    description: "Premium automotive coatings and pretreatment chemicals providing superior corrosion protection, appearance, and environmental durability.",
    image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Adhesives & Sealants",
    description: "Specialized bonding solutions engineered for automotive assembly, providing structural strength, vibration damping, and environmental sealing.",
    image: "https://images.unsplash.com/photo-1589398908284-12e22929df63?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function AutomobileIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Automobile Industry"
      subtitle="Supplying premium materials for automotive manufacturing with exceptional quality and technical expertise."
      backgroundImage="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"
      sideText="AUTOMOBILE INDUSTRY"
      overviewData={{
        subtitle: "Empowering automotive innovation with precision-engineered materials and technical support",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the critical challenges in modern automotive manufacturing",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Automotive Manufacturing",
        subtitle: "Premium quality raw materials essential for superior vehicle performance",
        products: automobileMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading automotive manufacturers worldwide"
      }}
      showSuccessStories={false}
    />
  );
} 