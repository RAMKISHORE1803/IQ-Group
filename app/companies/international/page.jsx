'use client';
import CompanyTemplate from '@/components/companies/CompanyTemplate';
import ContentSection from '@/components/companies/ContentSection';
import ContactCTA from '@/components/companies/ContactCTA';
import ProductCard from '@/components/companies/ProductCard';
import SectionWithCards from '@/components/companies/SectionWithCards';
import SectionNavigation from '@/components/companies/SectionNavigation';
import ProductRangeSection from '@/components/companies/ProductRangeSection';
import HeroSection from './HeroSection';
import QualityStandardsSection from '@/components/companies/QualityStandardsSection';

// Value cards data for "How We Deliver Value" section
const valueCards = [
  {
    title: "Vision-Led Expansion",
    description: "We believe in the synergy between traditional business instincts and systemized market innovation — driving smarter, faster supply chains."
  },
  {
    title: "Global Presence",
    description: "Through strategic offices and affiliates across continents, we bridge international demand with seamless distribution."
  },
  {
    title: "Built on Trust",
    description: "Our foundation rests on four pillars: Trust, Sales, Service, and Commitment — empowering long-term relationships and scalable growth."
  },
  {
    title: "Sector Intelligence",
    description: "We deeply understand the expectations and behaviors of both customers and suppliers, allowing us to create meaningful competitive advantages."
  }
];

// Capability cards data for "Our Capabilities" section
const capabilityCards = [
  {
    title: "Global Chemical Supply",
    description: "Global supply of industrial and specialty chemicals for diverse market applications."
  },
  {
    title: "Strategic Presence",
    description: "Operational subsidiaries and rep offices across major trade zones for seamless service."
  },
  {
    title: "Custom Solutions",
    description: "Custom solutions built on decades of international market experience and industry knowledge."
  },
  {
    title: "Diverse Product Access",
    description: "Diverse product access backed by exclusive processes and sourcing models tailored to client needs."
  }
];

// Chemical products data from screenshot
const products = [
  {
    title: "Hydrofluoric Acid 70% (HF)",
    description: "High-purity hydrofluoric acid used in glass etching, metal cleaning, and as a catalyst in petrochemical processes."
  },
  {
    title: "Glacial acetic acid",
    description: "Concentrated form of acetic acid used in chemical synthesis, textile processing, and food preservation."
  },
  {
    title: "Phthalic anhydride",
    description: "Organic compound used in the production of plasticizers, resins, and dyes."
  },
  {
    title: "Caustic Soda",
    description: "Sodium hydroxide used in various industrial applications including paper production, textile processing, and chemical manufacturing."
  },
  {
    title: "Maleic Anhydride",
    description: "Organic compound used in the production of unsaturated polyester resins, agricultural chemicals, and pharmaceuticals."
  },
  {
    title: "Aluminium Fluoride (HBD & LBD)",
    description: "Used primarily in aluminum production as a flux to lower the melting point of electrolytes."
  },
  {
    title: "Titanium Di Oxide",
    description: "White pigment used in paints, coatings, plastics, paper, inks, foods, and cosmetics."
  },
  {
    title: "Edta Di Oxide",
    description: "Chelating agent used in various industrial applications including cleaning solutions and water treatment."
  },
  {
    title: "Chromium Oxide",
    description: "Used in pigments, ceramics, and as a polishing compound."
  },
  {
    title: "Caustic Soda Flakes/Lye",
    description: "Solid form of sodium hydroxide used in soap making, food processing, and water treatment."
  },
  {
    title: "HYDROGEN PEROXIDE",
    description: "Strong oxidizing agent used for bleaching, disinfection, and as a propellant."
  },
  {
    title: "Electrolytic Manganese Dioxide (EMD)",
    description: "Used primarily in the production of batteries, especially alkaline and lithium-ion batteries."
  },
  {
    title: "Carbon Black",
    description: "Fine carbon powder used as a reinforcing filler in tires and other rubber products, and as a pigment."
  },
  {
    title: "Cryolite",
    description: "Used as a solvent for alumina in the Hall–Héroult process of aluminum production."
  },
  {
    title: "Isopropyl Alchol (IP)",
    description: "Commonly used solvent and cleaning fluid in industrial and consumer applications."
  },
  {
    title: "Potassium Sorbate",
    description: "Food preservative used to inhibit molds and yeasts in foods, wines, and personal care products."
  },
  {
    title: "Sorbic Acid",
    description: "Preservative used to prevent the growth of mold, yeast, and fungi in foods."
  },
  {
    title: "Hy-Flo Super Cel",
    description: "Filter aid used in the clarification of liquids in food, beverage, and pharmaceutical industries."
  },
  {
    title: "Concentrated Sulphuric Acid",
    description: "Strong mineral acid used in chemical synthesis, mineral processing, and petroleum refining."
  }
];

// Section links for "In This Section" navigation
const sectionLinks = [
  {
    title: "How we deliver value",
    link: "#how-we-deliver-value"
  },
  {
    title: "Chemicals",
    link: "#chemicals"
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

export default function InternationalPage() {
  return (
    <div className="relative">
      <HeroSection
        title=""
        subtitle="We drive progress with bold strategy, global reach, trusted networks, and transformative chemical solutions."
        backgroundImage="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        sideText="IQ International"
        navTitle="COMPANIES"
      />
      {/* In This Section navigation */}
      <div className="relative bg-white">
        <SectionNavigation links={sectionLinks} />
        
        {/* How We Deliver Value Section */}
        <SectionWithCards
          id="how-we-deliver-value"
          title="How We Deliver Value"
          subtitle="Empowering global chemical supply through trust and innovation."
          cards={valueCards}
          hasDivider={false}
          sectionNumber="01"
        />

         {/* Chemicals Section */}
         <ProductRangeSection
          id="chemicals"
          title="Chemicals"
          subtitle="Premium industrial and specialty chemicals for diverse applications"
          products={products}
          sectionNumber="02"
        />
        
        {/* Our Capabilities Section */}
        <SectionWithCards
          id="our-capabilities"
          title="Our Capabilities"
          subtitle="Comprehensive chemical solutions with global reach."
          cards={capabilityCards}
          background="gray"
          sectionNumber="03"
        />
        
       
        
        {/* Quality Standards Section */}
        <QualityStandardsSection
          id="quality-standards"
          title="Quality Standards"
          description="Our chemical products represent the pinnacle of quality assurance. Through our global network, we maintain unwavering standards that transcend borders. Each product undergoes rigorous verification against international benchmarks, ensuring that what you receive isn't just a chemical—it's a guarantee of performance, safety, and consistency that empowers your innovations."
          logoSrc="/Images/QualityCertificate/usa-accreditation.svg"
          logoAlt="United States Accreditation"
          buttonText="Learn More"
          buttonLink="#"
          background="gray"
          sectionNumber="04"
          sectionTitle="IN THIS SECTION"
        />
        
        {/* Contact CTA */}
        <ContentSection>
          <ContactCTA 
            title="Ready to discuss your chemical supply requirements?" 
            description="Our global team is available to help you find the right solution for your business."
          />
        </ContentSection>
      </div>
    </div>
  );
} 