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
const products = [
  {
    title: "Industrial Minerals",
    description: "High-grade industrial minerals for manufacturing, construction, and specialty applications."
  },
  {
    title: "Metal Raw Materials",
    description: "Premium metal raw materials for steel, foundries, and precision manufacturing."
  },
  {
    title: "Specialty Minerals",
    description: "Specialized mineral products for electronics, pharmaceuticals, and high-tech applications."
  },
  {
    title: "Custom Blends & Formulations",
    description: "Tailored mineral and metal blends designed to meet specific industry requirements and performance needs."
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
    title: "Products",
    link: "#products"
  },
  {
    title: "Industries served",
    link: "#industries-served"
  }
];

export default function MineralsMetalsPage() {
  return (
    <CompanyTemplate
      title="IQ Minerals & Metals"
      subtitle="We power industries across 20+ nations with high-quality minerals and metals. Backed by two decades of global supply expertise, our network runs deep — delivering precision, scale, and trust across every sector we touch."
      backgroundImage="https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?q=80&w=2070&auto=format&fit=crop"
      sideText="MINERALS & METALS"
      navTitle="COMPANIES"
    >
      {/* In This Section navigation */}
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
      
      {/* Our Capabilities Section */}
      <SectionWithCards
        id="our-capabilities"
        title="Our Capabilities"
        subtitle="Comprehensive mineral and metal solutions with global reach."
        cards={capabilityCards}
        background="gray"
        sectionNumber="02"
      />
      
      {/* Products Section */}
      <ContentSection id="products" title="Our Products" subtitle="Premium minerals and metals for diverse industrial applications">
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
      
      {/* Industries Served Section */}
      <ContentSection id="industries-served" title="Industries We Serve" background="gray">
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
      </ContentSection>
      
      {/* Contact CTA */}
      <ContentSection>
        <ContactCTA 
          title="Need high-quality minerals or metals for your industry?" 
          description="Our global team is ready to help you source the perfect materials for your specific requirements."
        />
      </ContentSection>
    </CompanyTemplate>
  );
} 