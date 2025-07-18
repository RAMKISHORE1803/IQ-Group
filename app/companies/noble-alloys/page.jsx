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
    description: "High-quality ferro titanium alloy used as a deoxidizer and grain refiner in steel production, improving mechanical properties and corrosion resistance."
  },
  {
    title: "Ferro Niobium",
    description: "Premium ferro niobium alloy that enhances strength and toughness in structural steels, particularly in pipeline steels and automotive components."
  },
  {
    title: "Ferro Boron",
    description: "Specialized ferro boron alloy used to improve hardenability in steel and as a microalloying element in high-strength steels."
  },
  {
    title: "Ferro Vanadium",
    description: "High-purity ferro vanadium alloy that adds strength, wear resistance, and high-temperature stability to steel, commonly used in tool steels and HSLA steels."
  },
  {
    title: "Ferro Tungsten",
    description: "Premium ferro tungsten alloy that provides exceptional hardness, wear resistance, and high-temperature strength in tool steels and high-speed steels."
  },
  {
    title: "Moly Oxide",
    description: "High-grade molybdenum oxide used in the production of molybdenum metal, ferro molybdenum, and various chemical applications."
  },
  {
    title: "Molybdenum",
    description: "Pure molybdenum metal with excellent high-temperature strength and corrosion resistance, used in aerospace, electronics, and specialty steel applications."
  },
  {
    title: "Ferro Molybdenum",
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
    title: "Our capabilities",
    link: "#our-capabilities"
  },
  {
    title: "Products",
    link: "#products"
  },
  {
    title: "Applications",
    link: "#applications"
  }
];

export default function NobleAlloysPage() {
  return (
    <div className="relative">
      <HeroSection
        title=""
        subtitle="We bring precision to progress — delivering high-grade noble alloys through an exclusive global distribution network. Focused. Trusted. Built for the industries that shape the future."
        backgroundImage="https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=2070&auto=format&fit=crop"
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
        
        {/* Our Capabilities Section */}
        <SectionWithCards
          id="our-capabilities"
          title="Our Capabilities"
          subtitle="Precision noble alloy distribution with global reach."
          cards={capabilityCards}
          background="gray"
          sectionNumber="02"
        />
        
        {/* Products Section */}
        <ProductRangeSection
          id="products"
          title="Our Products"
          subtitle="Premium noble alloys for specialized industrial applications"
          products={products}
          sectionNumber="03"
        />
        
        {/* Applications Section */}
        <ContentSection id="applications" title="Key Applications" background="gray">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-6">
              Our noble alloys are essential components in critical industrial applications where performance, consistency, and quality are paramount. Each alloy is carefully sourced and distributed to meet the exacting standards of specialized manufacturing processes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#203663] mb-3">Steel Production</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>High-strength structural steel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>Stainless steel manufacturing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>Tool steel production</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>Heat-resistant alloys</span>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#203663] mb-3">Welding Industry</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>Electrode manufacturing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>Welding wire production</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>Flux-cored arc welding</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>High-performance joints</span>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#203663] mb-3">Foundry Applications</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>Cast iron modification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>High-performance castings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>Wear-resistant components</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#203663] mr-2">•</span>
                    <span>Specialized molds</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ContentSection>
        
        {/* Contact CTA */}
        <ContentSection>
          <ContactCTA 
            title="Need specialized noble alloys for your application?" 
            description="Our team of experts is ready to help you source the perfect alloy for your specific requirements."
          />
        </ContentSection>
      </div>
    </div>
  );
} 