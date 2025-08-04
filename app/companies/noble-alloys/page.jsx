'use client';
import CompanyTemplate from '@/components/companies/CompanyTemplate';
import ContentSection from '@/components/companies/ContentSection';
import ContactCTA from '@/components/companies/ContactCTA';
import ProductCard from '@/components/companies/ProductCard';
import SectionWithCards from '@/components/companies/SectionWithCards';
import SectionNavigation from '@/components/companies/SectionNavigation';
import HeroSection from '@/components/about/HeroSection';
import ProductRangeSection from '@/components/companies/ProductRangeSection';
import QualityStandardsSection from '@/components/companies/QualityStandardsSection';
import ContactSection from '@/components/companies/ContactSection';

// Value cards data for "How We Deliver Value" section
const valueCards = [
  {
    title: "Niche Market Expertise",
    description: "Noble alloys aren't just a product — they're a specialty. We understand the exacting standards of the industries we serve."
  },
  {
    title: "Strategic Distribution",
    description: "Our network is built to deliver efficiently, ensuring timely and reliable supply across geographies."
  },
  {
    title: "Dedicated Industry Focus",
    description: "Serving the steel, welding, and foundry sectors with alloys engineered for performance and consistency."
  },
  {
    title: "Scalable Partnerships",
    description: "From local manufacturers to international clients — our structure adapts to support growth at any scale."
  }
];

// Capability cards data for "Our Capabilities" section
const capabilityCards = [
  {
    title: "Exclusive Supply",
    description: "Exclusive supply of high-purity noble alloys for demanding applications."
  },
  {
    title: "Tailored Logistics",
    description: "Tailored logistics for time-sensitive industrial applications requiring precision delivery."
  },
  {
    title: "End-to-End Distribution",
    description: "End-to-end distribution for steel, welding, and casting ecosystems."
  },
  {
    title: "Global Sourcing",
    description: "Global sourcing aligned to strict quality benchmarks for consistent performance."
  }
];

// Product/Service data
const products = [
  {
    title: "Ferro Titanium",
    image: "/ferrotitanium.webp",
    description: "High-quality ferro titanium alloy used as a deoxidizer and grain refiner in steel production, improving mechanical properties and corrosion resistance."
  },
  {
    title: "Ferro Niobium",
    image: "/ferroniobium.webp",
    description: "Premium ferro niobium alloy that enhances strength and toughness in structural steels, particularly in pipeline steels and automotive components."
  },
  {
    title: "Ferro Boron",
    image: "/ferroboron.webp",
    description: "Specialized ferro boron alloy used to improve hardenability in steel and as a microalloying element in high-strength steels."
  },
  {
    title: "Ferro Vanadium",
    image: "/ferrovanadium.webp",
    description: "High-purity ferro vanadium alloy that adds strength, wear resistance, and high-temperature stability to steel, commonly used in tool steels and HSLA steels."
  },
  {
    title: "Ferro Tungsten",
    image: "/ferrotungsten.webp",
    description: "Premium ferro tungsten alloy that provides exceptional hardness, wear resistance, and high-temperature strength in tool steels and high-speed steels."
  },
  {
    title: "Moly Oxide",
    image: "/molyoxide.webp",
    description: "High-grade molybdenum oxide used in the production of molybdenum metal, ferro molybdenum, and various chemical applications."
  },
  {
    title: "Molybdenum",
    image: "/molybdenum.webp",
    description: "Pure molybdenum metal with excellent high-temperature strength and corrosion resistance, used in aerospace, electronics, and specialty steel applications."
  },
  {
    title: "Ferro Molybdenum",
    image: "/ferromolybdenum.webp",
    description: "Premium ferro molybdenum alloy that enhances strength, hardenability, and corrosion resistance in steel, particularly for high-temperature applications."
  }
];

// Section links for "In This Section" navigation
const sectionLinks = [
  {
    title: "How we deliver value",
    link: "#how-we-deliver-value"
  },
  {
    title: "Products",
    link: "#products"
  },
  {
    title: "Our capabilities",
    link: "#our-capabilities"
  },
  
  {
    title: "Applications",
    link: "#applications"
  },
  {
    title: "Quality standards",
    link: "#quality-standards"
  }
];

export default function NobleAlloysPage() {
  return (
    <div className="relative">
      <HeroSection
        title=""
      subtitle="Precision meets progress — noble alloys delivered globally for the industries shaping tomorrow. Trusted. Elite.
"
      backgroundImage="/noblealloysbgq1.webp"
        sideText="IQ Noble Alloys"
      navTitle="COMPANIES"
      />
      {/* In This Section navigation */}
      <div className="relative bg-white">
      <SectionNavigation links={sectionLinks} />
      
      {/* How We Deliver Value Section */}
      <SectionWithCards
        id="how-we-deliver-value"
        title="How We Deliver Value"
        subtitle="Specialized noble alloy solutions for demanding applications."
        cards={valueCards}
        hasDivider={false}
        sectionNumber="01"
      />

  <ProductRangeSection
          id="products"
          title="Our Products"
          subtitle="Premium noble alloys for specialized industrial applications"
          products={products}
          sectionNumber="02"
        />
      
      {/* Our Capabilities Section */}
      <SectionWithCards
        id="our-capabilities"
        title="Our Capabilities"
        subtitle="Precision noble alloy distribution with global reach."
        cards={capabilityCards}
        background="gray"
        sectionNumber="03"
      />
      
      {/* Products Section */}
        
      
      {/* Applications Section */}
      
        
        {/* Quality Standards Section */}
        <QualityStandardsSection
          id="quality-standards"
          title="Quality Standards"
          description="In the world of noble alloys, microscopic precision determines macroscopic success. Our quality assurance program operates at the elemental level—verifying composition, structure, and performance against the industry's most demanding benchmarks. This scientific rigor ensures that when critical applications demand perfection, our alloys deliver without compromise."
          logoSrc="/Images/QualityCertificate/usa-accreditation.svg"
          logoAlt="United States Accreditation"
          buttonText="Learn More"
          buttonLink="#"
          background="white"
          sectionNumber="04"
          sectionTitle="IN THIS SECTION"
        />
      
      {/* Contact Section */}
      <ContactSection />
      </div>
    </div>
  );
} 