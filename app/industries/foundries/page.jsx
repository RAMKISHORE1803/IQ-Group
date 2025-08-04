'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Premium Materials",
    description: "Highest-grade foundry inputs meticulously selected for molecular consistency. Every batch lab-verified before shipping."
  },
  {
    title: "Technical Expertise",
    description: "Metallurgical specialists who understand casting chemistry at atomic level. Beyond suppliers—we're your foundry partners."
  },
  {
    title: "Global Sourcing",
    description: "Strategic multi-source network ensuring uninterrupted material flow. Your production continues regardless of global conditions."
  },
  {
    title: "Process Optimization",
    description: "Precision-engineered inputs calibrated to your exact casting requirements. Better materials mean fewer defects downstream."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Material Consistency",
    description: "Batch-to-batch uniformity that eliminates casting variables. Every gram delivers identical performance, every time."
  },
  {
    title: "Quality Control",
    description: "Microscopic impurity detection far exceeding industry standards. Zero tolerance for material-induced casting defects."
  },
  {
    title: "Environmental Compliance",
    description: "Eco-conscious materials that exceed regulatory requirements today and tomorrow. Sustainability without performance compromise."
  },
  {
    title: "Process Efficiency",
    description: "Materials engineered for optimum flowability and minimal gas generation. Maximum yield with reduced energy consumption."
  }
];

// Product data for foundries industry materials
const foundriesMaterials = [
  {
    title: "Green Sand",
    description: "Premium foundry sand with precise grain size distribution and clay content for optimal moldability, permeability and casting finish quality.",
    image: "/greensand.webp"
  },
  {
    title: "Bentonite Clay",
    description: "High-quality binding clay with superior plasticity and green strength, essential for sand casting molds with excellent surface finish.",
    image: "/bentoniteclay.webp"
  },
  {
    title: "Ferro Silicon",
    description: "High-purity ferro silicon with 45-75% silicon content, used as an inoculant and deoxidizer in iron and steel casting to improve mechanical properties.",
    image: "/ferrosilicon.jpg"
  },
  {
    title: "Chromite Sand",
    description: "Heat-resistant foundry sand with excellent thermal stability and chilling power, ideal for steel casting applications requiring superior surface finish.",
    image: "/chromitesand.jpg"
  },
  {
    title: "Graphite",
    description: "High-carbon material used for crucibles, molds, and as a carbon additive in iron casting to promote graphitization and improve machinability.",
    image: "/graphite.jpeg"
  },
  {
    title: "Ferro Manganese",
    description: "Essential alloy for controlling sulfur in cast iron and steel, improving strength, toughness, and wear resistance in the final casting.",
    image: "/ferromanganese.webp"
  },
  {
    title: "Ferro Phosphorus",
    description: "Specialized alloy for improving fluidity in cast iron, enhancing castability for thin-walled and intricate castings while improving wear resistance.",
    image: "/ferrophosphorous.webp"
  },
  {
    title: "Inoculants",
    description: "Precisely formulated silicon-iron materials that promote controlled graphite formation in cast iron, improving mechanical properties and reducing defects.",
    image: "/incoulant.webp"
  }
];

export default function FoundriesIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Foundries"
      subtitle="Supplying premium quality raw materials for metal casting operations with exceptional consistency and technical support."
      backgroundImage="https://images.pexels.com/photos/3730670/pexels-photo-3730670.jpeg"
      sideText="FOUNDRIES"
      overviewData={{
        subtitle: "Empowering casting excellence with precisely engineered materials and metallurgical expertise",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Addressing the critical challenges facing modern foundry operations",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Foundry Production",
        subtitle: "Premium quality raw materials essential for superior metal casting",
        products: foundriesMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading foundries worldwide"
      }}
      showSuccessStories={false}
    />
  );
} 