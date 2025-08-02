

import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate';

// Overview cards data
const overviewCards = [
  {
    title: "Material Precision",
    description: "Premium alloying elements with exact chemistry control. Every batch verified through advanced analytical methods for consistent performance."
  },
  {
    title: "Supply Reliability",
    description: "Multi-source network ensuring uninterrupted material availability. Your production schedule remains intact regardless of market fluctuations."
  },
  {
    title: "Technical Partnership",
    description: "Metallurgical specialists who understand stainless steel at molecular level. We solve performance issues, not just supply raw materials."
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing protocols exceeding industry standards. Complete traceability and documentation supporting your quality management system."
  }
];

// Industry challenges data
const challengeCards = [
  {
    title: "Material Consistency",
    description: "Precise chemistry control that eliminates batch variation. Predictable processing behavior and final properties across production runs."
  },
  {
    title: "Performance Enhancement",
    description: "Advanced alloying elements that improve corrosion resistance and mechanical properties. Superior stainless steel performance for demanding applications."
  },
  {
    title: "Sustainable Production",
    description: "Eco-conscious materials and processes aligned with carbon reduction goals. Meeting environmental standards while maintaining premium quality."
  },
  {
    title: "Cost Optimization",
    description: "Strategic material solutions that improve production efficiency. Better yields, reduced processing time, lower energy consumption—better economics."
  }
];

// Product data for stainless steel industry materials
const stainlessSteelMaterials = [
  {
    title: "Chromium",
    description: "High-purity chromium metal and ferroalloys with precise chemistry control, the essential element providing corrosion resistance to stainless steel.",
    image: "/chromium.webp"
  },
  {
    title: "Nickel",
    description: "Premium grade nickel in various forms, critical for austenitic stainless steels, providing enhanced corrosion resistance and formability.",
        image: "/nickel.jpg"
  },
  {
    title: "Molybdenum",
    description: "High-purity molybdenum and ferromolybdenum, enhancing pitting corrosion resistance and high-temperature strength in stainless steel alloys.",
    image: "/molybdenum.webp"
  },
  {
    title: "Manganese",
    description: "Specialized manganese alloys that improve hot workability and replace nickel in certain stainless steel grades for cost optimization.",
    image: "/manganesemetal.jpg"
  },
  {
    title: "Titanium & Niobium",
    description: "Ultra-pure stabilizing elements that prevent intergranular corrosion in stainless steels by controlling carbon and nitrogen behavior.",
    image: "/titaniumandniobium.webp"
  },
  {
    title: "Silicon",
    description: "High-grade ferrosilicon that improves oxidation resistance and is essential for the production of specialty stainless steel grades.",
    image: "/siliconmetal.jpg"
  },
  {
    title: "Nitrogen Additives",
    description: "Specialized nitrogen-bearing materials that enhance strength and corrosion resistance in modern lean duplex and high-performance stainless steels.",
    image: "/nitrogenadditive.webp"
  },
  {
    title: "Scrap Substitutes",
    description: "Premium processed materials that provide a clean, consistent alternative to scrap in electric arc furnace stainless steel production.",
    image: "/scrapsubstitutes.webp"
  }
];

export default function StainlessSteelIndustryPage() {
  return (
    <IndustryPageTemplate
      title="Stainless Steel Industry"
      subtitle="Supplying premium alloying elements for stainless steel production with exceptional quality and technical expertise."
      backgroundImage="https://www.shyammetalics.com/wp-content/uploads/2024/07/blog_img_1_07.jpg"
      sideText="STAINLESS STEEL"
      overviewData={{
        subtitle: "Empowering stainless innovation with precision-engineered alloying elements and metallurgical expertise",
        cards: overviewCards
      }}
      challengesData={{
        subtitle: "Solving the critical challenges in modern stainless steel production",
        cards: challengeCards
      }}
      materialsData={{
        title: "Key Materials for Stainless Steel Production",
        subtitle: "Premium quality alloying elements essential for superior stainless steel performance",
        products: stainlessSteelMaterials
      }}
      successStoriesData={{
        subtitle: "Real results from our partnerships with leading stainless steel producers worldwide"
      }}
      showSuccessStories={true}
    />
  );
} 