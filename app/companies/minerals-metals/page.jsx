'use client';
import SectionWithCards from '@/components/companies/SectionWithCards';
import SectionNavigation from '@/components/companies/SectionNavigation';
import HeroSection from './hero';
import ProductRangeSection from '@/components/companies/ProductRangeSection';
import QualityStandardsSection from '@/components/companies/QualityStandardsSection';
import ContactSection from '@/components/companies/ContactSection';

// Value cards data for "How We Deliver Value" section
const valueCards = [
  {
    title: "Global Distribution, Local Precision",
    description: "From glass to pharma, we serve 20+ countries with raw materials tailored to each sector's specific needs."
  },
  {
    title: "Client-Centric Collaboration",
    description: "We don't just supply — we co-create. Our team works closely with clients to fine-tune product fit and delivery flow."
  },
  {
    title: "Consistent Quality Everywhere",
    description: "Every client, every order — consistent service, consistent product, consistent experience."
  },
  {
    title: "Relationship-Driven Growth",
    description: "We grow through trust — building deep partnerships with producers, suppliers, and customers alike."
  }
];

// Capability cards data for "Our Capabilities" section
const capabilityCards = [
  {
    title: "Global Supply Network",
    description: "Global supply of industrial-grade minerals and metal raw materials for diverse applications."
  },
  {
    title: "International Presence",
    description: "Active presence in 20+ countries and across 10+ key industrial verticals."
  },
  {
    title: "Research-Led Sourcing",
    description: "Research-led sourcing and product development for precision-grade delivery."
  },
  {
    title: "Diverse Portfolio",
    description: "Vast product portfolio for Cement, Steel, Foundries, Electronics, Pharma, and more."
  }
];

// Product/Service data
const products = {
  minerals: [
    {
      title: "Magnesite",
      description: "High-grade magnesium carbonate mineral used in refractory materials, agriculture, and construction."
    },
    {
      title: "Chromite",
      description: "Primary ore of chromium, essential for stainless steel production and various metallurgical applications."
    },
    {
      title: "Fluorspar",
      description: "Mineral composed of calcium fluoride, used in aluminum production, steel making, and chemical manufacturing."
    },
    {
      title: "Quick Lime",
      description: "Calcium oxide produced by heating limestone, used in steel making, water treatment, and construction."
    },
    {
      title: "Silica Sand",
      description: "High-purity quartz sand used in glass manufacturing, foundry molds, and construction materials."
    },
    {
      title: "Olivine",
      description: "Magnesium iron silicate mineral used in refractory applications, foundry sand, and as a slag conditioner."
    },
    {
      title: "Bentonite",
      description: "Clay mineral with excellent colloidal properties, used in drilling fluids, foundry sand, and environmental applications."
    },
    {
      title: "Kaolin",
      description: "Fine white clay used in paper production, ceramics, paint, and various industrial applications."
    },
    {
      title: "Calcined Lime",
      description: "Processed lime product used in steel making, flue gas treatment, and water purification."
    },
    {
      title: "Feldspar",
      description: "Aluminosilicate mineral used in ceramics, glass production, and as a filler in paints and plastics."
    },
    {
      title: "Bauxite",
      description: "Primary ore of aluminum, essential for aluminum production and various industrial applications."
    },
    {
      title: "China Clay",
      description: "High-quality kaolin clay used in ceramics, paper coating, and as a filler in various industries."
    },
    {
      title: "Lime Stone",
      description: "Sedimentary rock primarily composed of calcium carbonate, used in construction, agriculture, and industrial processes."
    },
    {
      title: "Dolomite",
      description: "Calcium magnesium carbonate mineral used in construction, agriculture, and as a flux in metal processing."
    },
    {
      title: "Fluxes",
      description: "Materials used to promote fusion in metallurgical processes, particularly in steel and iron production."
    },
    {
      title: "Calcium Carbonate",
      description: "Versatile mineral used in paper, plastics, paints, and pharmaceutical industries."
    },
    {
      title: "Hydrated Lime",
      description: "Calcium hydroxide used in water treatment, construction, and environmental applications."
    },
    {
      title: "Resin And Foundry Sand",
      description: "Specially treated sand used in metal casting processes to create precise molds."
    },
    {
      title: "Olivine Sand",
      description: "High-temperature resistant sand used in foundry applications and refractory materials."
    },
    {
      title: "Chromite Sand",
      description: "Heat-resistant sand used in foundry applications, particularly for steel casting."
    },
    {
      title: "Ballclay",
      description: "Fine-grained plastic clay used in ceramic production and various industrial applications."
    }
  ],
  metals: [
    {
      title: "Silicon Metal",
      description: "High-purity silicon used in aluminum alloys, silicones, and semiconductor production."
    },
    {
      title: "Magnesium Metal Ingot",
      description: "Lightweight structural metal used in aerospace, automotive, and electronics industries."
    },
    {
      title: "Manganese Metal",
      description: "Essential alloying element used in steel production to improve hardness and wear resistance."
    },
    {
      title: "Calcium Metal",
      description: "Reactive metal used as a reducing agent and alloying element in various metallurgical processes."
    },
    {
      title: "Iron Powder",
      description: "Fine iron particles used in powder metallurgy, magnetic applications, and chemical processes."
    },
    {
      title: "Calcium Silicide",
      description: "Alloy used as a deoxidizer and desulfurizer in steel and cast iron production."
    },
    {
      title: "Nickel",
      description: "Versatile metal used in stainless steel production, batteries, and various alloys."
    },
    {
      title: "Chromium",
      description: "Hard, corrosion-resistant metal essential for stainless steel and various alloy applications."
    }
  ]
};

// Section links for "In This Section" navigation
const sectionLinks = [
  {
    title: "How we deliver value",
    link: "#how-we-deliver-value"
  },
  {
    title: "Minerals",
    link: "#minerals"
  },
  {
    title: "Metals",
    link: "#metals"
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

export default function MineralsMetalsPage() {
  return (
    <div className="relative">
      <HeroSection
        title=""
        subtitle="20+ years. 20 nations. IQ delivers raw materials with trust, precision, and innovation.
"
        backgroundImage="https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?q=80&w=2070&auto=format&fit=crop"
        sideText="IQ Minerals & Metals"
        navTitle="COMPANIES"
        sideTextHeight="280px"
      />
      {/* In This Section navigation */}
      <div className="relative bg-white">
        <SectionNavigation links={sectionLinks} />
        
        {/* How We Deliver Value Section */}
        <SectionWithCards
          id="how-we-deliver-value"
          title="How We Deliver Value"
          subtitle="Empowering global industries with premium minerals and metals."
          cards={valueCards}
          hasDivider={false}
          sectionNumber="01"
        />

        {/* Products Section - Minerals */}
        <ProductRangeSection
          id="minerals"
          title="Minerals"
          subtitle="Premium industrial minerals for diverse applications"
          products={products.minerals}
          sectionNumber="02"
        />
        
        {/* Products Section - Metals */}
        <ProductRangeSection
          id="metals"
          title="Metals"
          subtitle="High-quality metal raw materials for precision manufacturing"
          products={products.metals}
          sectionNumber="03"
          background="gray"
        />
        
        {/* Our Capabilities Section */}
        <SectionWithCards
          id="our-capabilities"
          title="Our Capabilities"
          subtitle="Comprehensive mineral and metal solutions with global reach."
          cards={capabilityCards}
          background="gray"
          sectionNumber="04"
        />
        
        
        
        {/* Industries Served Section */}
        {/* <ContentSection id="industries-served" title="Industries We Serve" background="white" sectionNumber="05">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-6">
              At IQ Minerals & Metals, we serve a diverse range of industries with tailored mineral and metal solutions. Our expertise spans multiple sectors, ensuring that each client receives materials that meet their specific requirements and quality standards.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-[#203663] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">01</span>
                </div>
                <h3 className="font-semibold text-[#203663]">Steel & Foundry</h3>
              </div>
              <div className="text-center">
                <div className="bg-[#203663] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">02</span>
                </div>
                <h3 className="font-semibold text-[#203663]">Cement & Construction</h3>
              </div>
              <div className="text-center">
                <div className="bg-[#203663] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">03</span>
                </div>
                <h3 className="font-semibold text-[#203663]">Glass & Ceramics</h3>
              </div>
              <div className="text-center">
                <div className="bg-[#203663] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">04</span>
                </div>
                <h3 className="font-semibold text-[#203663]">Electronics</h3>
              </div>
              <div className="text-center">
                <div className="bg-[#203663] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">05</span>
                </div>
                <h3 className="font-semibold text-[#203663]">Pharmaceuticals</h3>
              </div>
              <div className="text-center">
                <div className="bg-[#203663] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">06</span>
                </div>
                <h3 className="font-semibold text-[#203663]">Agriculture</h3>
              </div>
              <div className="text-center">
                <div className="bg-[#203663] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">07</span>
                </div>
                <h3 className="font-semibold text-[#203663]">Automotive</h3>
              </div>
              <div className="text-center">
                <div className="bg-[#203663] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">08</span>
                </div>
                <h3 className="font-semibold text-[#203663]">Energy</h3>
              </div>
            </div>
          </div>
        </ContentSection> */}
        
        {/* Quality Standards Section */}
        <QualityStandardsSection
          id="quality-standards"
          title="Quality Standards"
          description="We don't just source minerals and metals—we curate excellence. Our materials undergo comprehensive analysis and certification at every stage, from origin to delivery. This uncompromising approach ensures that when you specify a material grade, what you receive isn't just compliant—it's precisely calibrated to perform in your most demanding applications, time after time."
          logoSrc="/Images/QualityCertificate/usa-accreditation.svg"
          logoAlt="United States Accreditation"
          buttonText="Learn More"
          buttonLink="#"
          background="gray"
          sectionNumber="05"
          sectionTitle="IN THIS SECTION"
        />
        
        {/* Contact Section */}
        <ContactSection />
      </div>
    </div>
  );
} 