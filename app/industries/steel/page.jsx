'use client';

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Global Reach",
    description: "Seamlessly connecting premium materials to steel producers across six continents. Every shipment precision-timed for maximum impact."
  },
  {
    title: "Quality Assurance",
    description: "Molecular-level testing ensures every material exceeds industry standards. Zero compromise between consistency and excellence."
  },
  {
    title: "Supply Resilience",
    description: "Strategic sourcing network built to withstand market volatility. Your production never stops, regardless of global conditions."
  },
  {
    title: "Technical Expertise",
    description: "Metallurgical specialists who understand your exact requirements. Beyond suppliers—we're your material science partners."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Supply Volatility",
    description: "Unwavering material flow when others falter. Our global network delivers consistency through any market disruption."
  },
  {
    title: "Quality Precision",
    description: "Micron-perfect materials prevent million-dollar defects. We deliver exact specifications because precision isn't optional."
  },
  {
    title: "Sustainable Evolution",
    description: "Lower-carbon materials that exceed tomorrow's regulations today. Environmental leadership that creates competitive advantage."
  },
  {
    title: "Cost Optimization",
    description: "Beyond price-per-ton thinking. Our integrated approach eliminates waste across your entire material stream."
  }
];

// Product data for steel industry materials
const steelMaterials = [
  {
    title: "Iron Ore",
    description: "High-grade iron ore with 58-65% Fe content levels, available in lump, fines, and pellets for different steel production requirements.",
    image: "https://images.unsplash.com/photo-1518783211485-10fd3bfb2ce2?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Coking Coal",
    description: "Premium metallurgical coal with low ash and sulfur content, essential for coke production in blast furnace operations.",
    image: "https://images.unsplash.com/photo-1578575752670-bbc2a5adb58e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Ferro Silicon",
    description: "High-purity ferro silicon with silicon content ranging from 45% to 75%, used as a deoxidizer and alloying element in steel production.",
    image: "https://images.unsplash.com/photo-1605557202138-077ef7c4fa7c?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Ferro Chrome",
    description: "Primary alloy (50–70% Cr) for stainless and alloy steel—enhances corrosion resistance, hardness, and wear resistance.",
    image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Ferro Manganese",
    description: "Essential alloy adding manganese to steel to improve strength, toughness, hardenability, and wear resistance.",
    image: "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Limestone",
    description: "Critical flux material used to remove impurities in the steelmaking process, forming slag that can be separated from the molten metal.",
    image: "https://images.unsplash.com/photo-1598104358204-117bc812c6c1?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Dolomite",
    description: "Used in basic oxygen steelmaking to protect refractory linings and as a slag conditioner to improve steel quality.",
    image: "https://images.unsplash.com/photo-1550047506-25b6cd9f0aad?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Ferro Titanium",
    description: "High-quality alloy used as a deoxidizer and grain refiner in steel production, improving mechanical properties and corrosion resistance.",
    image: "https://images.unsplash.com/photo-1648193820372-1677480a84b1?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function SteelIndustryPage() {
  return (
    <IndustryPageTemplate
        title="Steel Industry"
        subtitle="Providing premium raw materials for steel manufacturing with consistent quality and reliable supply chain solutions."
        backgroundImage="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
        sideText="STEEL INDUSTRY"
      overviewData={{
        subtitle: "Powering global steel production with premium materials and unmatched expertise",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the most pressing challenges facing modern steel production",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Steel Production",
        subtitle: "Premium quality raw materials essential for modern steel manufacturing",
        products: steelMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading steel manufacturers worldwide"
      }}
      showSuccessStories={true}
    />
  );
} 