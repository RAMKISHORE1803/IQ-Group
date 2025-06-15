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

// Product data
const products = [
  {
    title: "Ferro Silicon",
    description: "High-purity ferro silicon with silicon content ranging from 45% to 75%, used as a deoxidizer and alloying element in steel production."
  },
  {
    title: "Ferro Manganese",
    description: "Standard and medium-carbon ferro manganese for improving strength, hardness, and wear resistance in steel manufacturing."
  },
  {
    title: "Silico Manganese",
    description: "Combined silicon and manganese alloy used for deoxidation and as an alloying element in steel production."
  },
  {
    title: "Specialty Alloys",
    description: "Custom ferro alloy formulations to meet specific metallurgical requirements and performance standards."
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
    title: "Product range",
    link: "#product-range"
  },
  {
    title: "Quality standards",
    link: "#quality-standards"
  }
];

export default function FerroAlloysPage() {
  return (
    <CompanyTemplate
      title="IQ Ferro Alloys"
      subtitle="We power the world’s steel with high-value Ferro Alloys — fast, reliable, and globally sourced. Backed by deep producer networks and a streamlined supply chain, we eliminate delays and deliver consistent quality at scale. Trusted by industries. Built for speed.

"
      backgroundImage="https://images.unsplash.com/photo-1547555706-54bcf05bbad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmVycm8lMjBhbGxveXxlbnwwfHwwfHx8MA%3D%3D"
      sideText="FERRO ALLOYS"
      navTitle="COMPANIES"
    >
      {/* In This Section navigation */}
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
      
      {/* Our Capabilities Section */}
      <SectionWithCards
        id="our-capabilities"
        title="Our Capabilities"
        subtitle="Beyond products — we optimize supply."
        cards={capabilityCards}
        background="gray"
        sectionNumber="02"
      />
      
      {/* Product Range Section */}
      <ContentSection id="product-range" title="Our Product Range" subtitle="Premium ferro alloys for diverse industrial applications">
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
            At IQ Ferro Alloys, quality is our top priority. Our products undergo rigorous testing and quality control measures to ensure they meet or exceed industry standards and customer specifications.
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
          title="Ready to discuss your ferro alloy requirements?" 
          description="Our technical experts are available to help you find the right solution."
        />
      </ContentSection>
    </CompanyTemplate>
  );
} 