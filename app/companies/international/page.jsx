'use client';
import CompanyTemplate from '@/components/companies/CompanyTemplate';
import ContentSection from '@/components/companies/ContentSection';
import ContactCTA from '@/components/companies/ContactCTA';
import ProductCard from '@/components/companies/ProductCard';
import SectionWithCards from '@/components/companies/SectionWithCards';
import SectionNavigation from '@/components/companies/SectionNavigation';

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

// Product/Service data
const products = [
  {
    title: "Industrial Chemicals",
    description: "High-quality industrial chemicals for manufacturing, processing, and production applications across multiple sectors."
  },
  {
    title: "Specialty Chemicals",
    description: "Specialized chemical formulations designed for specific industry applications requiring precise performance characteristics."
  },
  {
    title: "Supply Chain Solutions",
    description: "End-to-end chemical supply chain management services from sourcing to delivery, optimized for efficiency and reliability."
  },
  {
    title: "Market Intelligence",
    description: "Industry insights and market analysis to help clients make informed decisions about chemical procurement and usage."
  }
];

// Section links for "In This Section" navigation
const sectionLinks = [
  {
    title: "How we deliver value",
    link: "#how-we-deliver-value"
  },
  {
    title: "Our capabilities",
    link: "#our-capabilities"
  },
  {
    title: "Services",
    link: "#services"
  },
  {
    title: "Quality standards",
    link: "#quality-standards"
  }
];

export default function InternationalPage() {
  return (
    <CompanyTemplate
      title="IQ International"
      subtitle="We lead the global chemical supply sector by combining bold entrepreneurship with modern strategy. With a presence spanning continents and a network built on trust, we deliver more than just products — we deliver global momentum."
      backgroundImage="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
      sideText="INTERNATIONAL"
      navTitle="COMPANIES"
    >
      {/* In This Section navigation */}
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
      
      {/* Our Capabilities Section */}
      <SectionWithCards
        id="our-capabilities"
        title="Our Capabilities"
        subtitle="Comprehensive chemical solutions with global reach."
        cards={capabilityCards}
        background="gray"
        sectionNumber="02"
      />
      
      {/* Services Section */}
      <ContentSection id="services" title="Our Services" subtitle="Comprehensive chemical supply and distribution solutions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
            />
          ))}
        </div>
      </ContentSection>
      
      {/* Quality Standards Section */}
      <ContentSection id="quality-standards" title="Quality Standards" background="gray">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-gray-700 mb-4">
            At IQ International, we maintain stringent quality control throughout our global supply network. Our chemical products undergo comprehensive testing to ensure they meet international standards and client specifications, while our distribution processes are optimized for reliability and efficiency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-[#203663] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">ISO</span>
              </div>
              <h3 className="font-semibold text-[#203663]">ISO 9001:2015</h3>
              <p className="text-sm text-gray-600 mt-2">Quality Management System</p>
            </div>
            <div className="text-center">
              <div className="bg-[#203663] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">ISO</span>
              </div>
              <h3 className="font-semibold text-[#203663]">ISO 14001:2015</h3>
              <p className="text-sm text-gray-600 mt-2">Environmental Management</p>
            </div>
            <div className="text-center">
              <div className="bg-[#203663] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">ISO</span>
              </div>
              <h3 className="font-semibold text-[#203663]">ISO 45001:2018</h3>
              <p className="text-sm text-gray-600 mt-2">Occupational Health & Safety</p>
            </div>
          </div>
        </div>
      </ContentSection>
      
      {/* Contact CTA */}
      <ContentSection>
        <ContactCTA 
          title="Ready to discuss your chemical supply requirements?" 
          description="Our global team is available to help you find the right solution for your business."
        />
      </ContentSection>
    </CompanyTemplate>
  );
} 