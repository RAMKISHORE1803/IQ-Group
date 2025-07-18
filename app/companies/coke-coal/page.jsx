'use client';
import CompanyTemplate from '@/components/companies/CompanyTemplate';
import ContentSection from '@/components/companies/ContentSection';
import ContactCTA from '@/components/companies/ContactCTA';
import ProductCard from '@/components/companies/ProductCard';
import SectionWithCards from '@/components/companies/SectionWithCards';
import SectionNavigation from '@/components/companies/SectionNavigation';
import HeroSection from '@/components/about/HeroSection';
import ProductRangeSection from '@/components/companies/ProductRangeSection';

// Value cards data for "How We Deliver Value" section
const valueCards = [
  {
    title: "Decades of Field Expertise",
    description: "Over 20 years of experience in handling, transporting, and storing carbon materials — we've seen every scenario, and we're built to handle them all."
  },
  {
    title: "Global Trading Network",
    description: "Our strong relationships with major producers and consumers worldwide ensure reliability and long-term supply stability."
  },
  {
    title: "Strategic Infrastructure",
    description: "With vast storage hubs and bulk terminals, we manage high-volume distribution without delay or compromise."
  },
  {
    title: "Multi-Industry Reach",
    description: "We serve the demanding needs of cement, power, calcining, and pulp industries with ease — adapting to scale and specification."
  }
];

// Capability cards data for "Our Capabilities" section
const capabilityCards = [
  {
    title: "Premium Materials",
    description: "Supply of high-quality metallurgical coke, steam coal, anthracite, and specialty carbon materials."
  },
  {
    title: "End-to-End Logistics",
    description: "From source to client, with specialized handling at each step of the supply chain."
  },
  {
    title: "Global Distribution",
    description: "Regional and international distribution through strategically located bulk terminals."
  },
  {
    title: "Scalable Solutions",
    description: "Scalable fulfillment across both standard and tailored material formats to meet your exact needs."
  }
];

// Product data
const products = [
  {
    title: "Carbon Raiser",
    description: "High-carbon additive used to increase carbon content in molten metal during steel and iron production."
  },
  {
    title: "Graphite",
    description: "Crystalline form of carbon with excellent electrical conductivity, heat resistance, and lubricating properties."
  },
  {
    title: "Metallurgical Coke",
    description: "High-carbon fuel used primarily in iron and steel industry blast furnaces, with low ash content and high mechanical strength."
  },
  {
    title: "Foundry Coke",
    description: "Specialized coke with controlled size and properties for foundry applications in metal casting processes."
  },
  {
    title: "Calcined Petroleum Coke",
    description: "Petroleum coke processed at high temperatures to remove volatile matter, used in aluminum and steel industries."
  },
  {
    title: "Graphitized Petroleum Coke",
    description: "Petroleum coke that has undergone graphitization, used in steel and aluminum production for carbon addition."
  },
  {
    title: "Amorphous Graphite",
    description: "Natural graphite with microcrystalline structure, used in refractory applications, batteries, and lubricants."
  },
  {
    title: "Natural Flake Graphite",
    description: "High-purity graphite with flake structure, used in batteries, lubricants, and refractory applications."
  },
  {
    title: "Coke Breeze",
    description: "Fine coke particles used in sintering processes, fuel applications, and as a carbon source in various industries."
  },
  {
    title: "LAM Coke",
    description: "Low ash metallurgical coke used in specialized steel production processes requiring minimal impurities."
  },
  {
    title: "Steam Coal",
    description: "Thermal coal grades optimized for power generation, cement production, and industrial applications requiring consistent heat value."
  },
  {
    title: "Coking Coal",
    description: "High-quality coal used to produce coke for steel making, with specific chemical and physical properties."
  },
  {
    title: "Calcined Anthracite Coal",
    description: "Anthracite coal processed at high temperatures to increase carbon content and remove volatiles, used in steel and aluminum industries."
  },
  {
    title: "Nut Coke",
    description: "Sized coke product used in foundries, sugar processing, and other specialized industrial applications."
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

export default function CokeCoalPage() {
  return (
    <div className="relative">
      <HeroSection
        title=""
        subtitle="With 20+ years in carbon materials, we power global industries through seamless supply, deep expertise, and a network built for scale.
"
        backgroundImage="https://images.unsplash.com/photo-1589007716619-42656585dd85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29hbHxlbnwwfHwwfHx8MA%3D%3D"
        sideText="IQ Coke & Coal"
        navTitle="COMPANIES"
      />
      {/* In This Section navigation */}
      <div className="relative bg-white">
        <SectionNavigation links={sectionLinks} />
        
        {/* How We Deliver Value Section */}
        <SectionWithCards
          id="how-we-deliver-value"
          title="How We Deliver Value"
          subtitle="Powering industries with reliable carbon materials at scale."
          cards={valueCards}
          hasDivider={false}
          sectionNumber="01"
        />
        
        {/* Our Capabilities Section */}
        <SectionWithCards
          id="our-capabilities"
          title="Our Capabilities"
          subtitle="End-to-end carbon material solutions for global industry."
          cards={capabilityCards}
          background="gray"
          sectionNumber="02"
        />
        
        {/* Product Range Section */}
        <ProductRangeSection
          id="product-range"
          title="Our Product Range"
          subtitle="Premium carbon materials for diverse industrial applications"
          products={products}
          sectionNumber="03"
        />
        
        {/* Quality Standards Section */}
        <ContentSection id="quality-standards" title="Quality Standards" background="gray">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              At IQ Coke & Coal, we maintain rigorous quality control standards throughout our supply chain. Every shipment undergoes comprehensive testing to ensure consistent carbon content, size distribution, and mechanical properties that meet or exceed industry specifications.
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
            title="Ready to discuss your carbon material requirements?" 
            description="Our industry experts are available to help you find the right solution for your needs."
          />
        </ContentSection>
      </div>
    </div>
  );
} 