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
    title: "Strategic Sourcing",
    description: "We work with trusted producers around the world to deliver reliable, high-quality supply to non-ferrous, steel, and stainless-steel sectors."
  },
  {
    title: "Uninterrupted Flow",
    description: "Our growing global network allows us to support your product development — without delays or disruptions."
  },
  {
    title: "Relationship-Driven",
    description: "We build close, long-term partnerships with our clients to make distribution seamless and responsive."
  },
  {
    title: "Cost-Effective Delivery",
    description: "With our lean systems, we offer a cost-efficient model that sets us apart in the import-export space."
  }
];

// Capability cards data for "Our Capabilities" section
const capabilityCards = [
  {
    title: "Evolving Product Range",
    description: "We provide a complete and expanding portfolio of ferroalloys tailored to your industrial needs."
  },
  {
    title: "Process Optimization",
    description: "Our system eliminates friction points — enabling smoother, smarter logistics."
  },
  {
    title: "Speed Without Compromise",
    description: "We don't trade speed for quality. You get both."
  },
  {
    title: "Scalable, Global Supply",
    description: "We adapt to growing demand with a process built for the global market."
  }
];

// Product data with images
const products = [
  {
    title: "Ferro Silicon",
    description: "High-purity ferro silicon with silicon content ranging from 45% to 75%, used as a deoxidizer and alloying element in steel production.",
    image: "/ferrosilicon.jpg"
  },
  {
    title: "Ferro Silico Manganese",
    description: "Combined silicon and manganese alloy used for deoxidation and as an alloying element in steel production.",
    image: "/ferrosilicomanganese.webp"
  },
  {
    title: "Ferro Chrome",
    description: "Primary alloy (50–70 % Cr) for stainless and alloy steel—enhances corrosion resistance, hardness, and wear resistance, with carbon grades tailored to steel grade needs .",
    image: "/ferrochrome.jpg"
  },
  {
    title: "Ferro Sulphur",
    description: "Supplies sulfur in controlled amounts to improve machinability, hardenability, and high-temperature strength via manganese sulfide formation.",
    image: "/ferrosulphur.webp"
  },
  {
    title: "Ferro Phosphorus",
    description: "Adds phosphorus to raise tensile strength, wear resistance, and stability at elevated temperatures, ideal for tool steels and HSLA grades.",
    image:"https://www.amperealloys.com/wp/wp-content/uploads/2017/06/Ferro-Phosphor.jpg"
  },
  {
    title: "Inoculants",
    image: "/incoulant.webp",
    description: "Silicon–iron inoculants added before casting promote finer graphite structure, improving grit formation, mechanical properties, and reducing defect"
  },
  {
    title: "Nodulants",
    image: "/nodulant.webp",
    description: "Magnesium-based spheroidizers (e.g. FeSiMg) create rounded graphite nodules in ductile iron, boosting toughness, ductility, and impact resistance."
  },
  {
    title: "Low Carbon Ferro Chrome",
    image: "/lowcarbonferrochrome.webp",
    description: "Low‑carbon (< 0.1–0.5 % C) ferrochrome (60–70 % Cr) used in high-grade stainless and specialty steels to enhance corrosion resistance without carbon contamination ."
  }
];

// Section links for "In This Section" navigation
const sectionLinks = [
  {
    title: "How we deliver value",
    link: "#how-we-deliver-value"
  },
  {
    title: "Product range",
    link: "#product-range"
  },
  {
    title: "Our capabilities",
    link: "#our-capabilities"
  },
  
  {
    title: "Quality standards",
    link: "#quality-standards"
  }
];

export default function FerroAlloysPage() {
  return (
    <div className="relative bg-white">
      <HeroSection
        title=""
        subtitle="Powering global steel with premium Ferro Alloys fast, trusted, relentless, world-class delivery.
"
        backgroundImage="/ferroalloysbg.jpg"
        sideText="IQ Ferro Alloys"
        navTitle="COMPANIES"
      />
      {/* In This Section navigation */}
      <div className="relative bg-white">
        <SectionNavigation links={sectionLinks} />
        
        {/* How We Deliver Value Section */}
        <SectionWithCards
          id="how-we-deliver-value"
          title="How We Deliver Value"
          subtitle="We move ferroalloys — fast, efficiently, and globally."
          cards={valueCards}
          hasDivider={false}
          sectionNumber="01"
        />

         {/* Product Range Section */}
         <ProductRangeSection
          id="product-range"
          title="Our Product Range"
          subtitle="Premium ferro alloys for diverse industrial applications"
          products={products}
          sectionNumber="02"
        />
        
        {/* Our Capabilities Section */}
        <SectionWithCards
          id="our-capabilities"
          title="Our Capabilities"
          subtitle="Beyond products — we optimize supply."
          cards={capabilityCards}
          background="gray"
          sectionNumber="03"
        />
        
       
        
        {/* Quality Standards Section */}
        <QualityStandardsSection
          id="quality-standards"
          title="Quality Standards"
          description="Every alloy we deliver represents our commitment to perfection. We don't just meet industry standards—we define them. Our rigorous quality control process ensures that what reaches your facility isn't just material, but the foundation of your next breakthrough. This is why the world's most demanding manufacturers choose IQ Ferro Alloys when excellence is non-negotiable."
          logoSrc="/Images/QualityCertificate/usa-accreditation.svg"
          logoAlt="United States Accreditation"
          buttonText="Learn More"
          buttonLink="#"
          background="gray"
          sectionNumber="04"
          sectionTitle="IN THIS SECTION"
        />
        
        {/* Contact Section */}
        <ContactSection />
      </div>
    </div>
  );
} 