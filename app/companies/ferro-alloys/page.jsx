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
    image: "https://images.unsplash.com/photo-1605557202138-077ef7c4fa7c?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Ferro Silico Manganese",
    description: "Combined silicon and manganese alloy used for deoxidation and as an alloying element in steel production.",
    image: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Ferro Chrome",
    description: "Primary alloy (50–70 % Cr) for stainless and alloy steel—enhances corrosion resistance, hardness, and wear resistance, with carbon grades tailored to steel grade needs .",
    image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Ferro Sulphur",
    description: "Supplies sulfur in controlled amounts to improve machinability, hardenability, and high-temperature strength via manganese sulfide formation.",
    image: "https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Ferro Phosphorus",
    description: "Adds phosphorus to raise tensile strength, wear resistance, and stability at elevated temperatures, ideal for tool steels and HSLA grades."
  },
  {
    title: "Inoculants",
    description: "Silicon–iron inoculants added before casting promote finer graphite structure, improving grit formation, mechanical properties, and reducing defect"
  },
  {
    title: "Nodulants",
    description: "Magnesium-based spheroidizers (e.g. FeSiMg) create rounded graphite nodules in ductile iron, boosting toughness, ductility, and impact resistance."
  },
  {
    title: "Low Carbon Ferro Chrome",
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
    <div className="relative">
      <HeroSection
        title=""
        subtitle="We power the world's steel with high-value Ferro Alloys — fast, reliable, and globally sourced. Trusted by industries. Built for speed."
        backgroundImage="https://images.unsplash.com/photo-1547555706-54bcf05bbad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmVycm8lMjBhbGxveXxlbnwwfHwwfHx8MA%3D%3D"
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
        <ProductRangeSection
          id="product-range"
          title="Our Product Range"
          subtitle="Premium ferro alloys for diverse industrial applications"
          products={products}
          sectionNumber="03"
        />
        
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
        {/* <ContentSection>
          <ContactCTA 
            title="Ready to discuss your ferro alloy requirements?" 
            description="Our technical experts are available to help you find the right solution."
          />
        </ContentSection> */}
      </div>
    </div>
  );
} 