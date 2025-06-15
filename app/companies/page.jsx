'use client';
import { useState } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/companies/HeroSection';
import ContentSection from '@/components/companies/ContentSection';

// Company data
const companies = [
  {
    id: 'international',
    name: 'IQ International',
    description: 'Leading the global chemical supply sector by combining bold entrepreneurship with modern strategy and a network built on trust.',
    image: '/hero/international-thumb.jpg',
    link: '/companies/international'
  },
  {
    id: 'minerals-metals',
    name: 'IQ Minerals & Metals',
    description: 'Powering industries across 20+ nations with high-quality minerals and metals backed by two decades of global supply expertise.',
    image: '/hero/minerals-metals-thumb.jpg',
    link: '/companies/minerals-metals'
  },
  {
    id: 'noble-alloys',
    name: 'IQ Noble Alloys',
    description: 'Delivering high-grade noble alloys through an exclusive global distribution network for industries that shape the future.',
    image: '/hero/noble-alloys-thumb.jpg',
    link: '/companies/noble-alloys'
  },
  {
    id: 'ferro-alloys',
    name: 'IQ Ferro Alloys',
    description: 'Premium ferro alloys for steel and foundry industries with consistent quality and reliable supply.',
    image: '/hero/ferro-alloys-thumb.jpg',
    link: '/companies/ferro-alloys'
  },
  {
    id: 'coke-coal',
    name: 'IQ Coke & Coal',
    description: 'Carbon materials delivered with precision, power, and consistency for global industrial applications.',
    image: '/hero/coke-coal-thumb.jpg',
    link: '/companies/coke-coal'
  },
  {
    id: 'mining',
    name: 'IQ Mining',
    description: 'Sustainable mining operations with advanced technology and environmental stewardship.',
    image: '/hero/mining-thumb.jpg',
    link: '/companies/mining'
  },
  {
    id: 'renewable-energy',
    name: 'IQ Renewable Energy',
    description: 'Clean energy solutions for a sustainable future, including solar, wind, and hydroelectric power.',
    image: '/hero/renewable-thumb.jpg',
    link: '/companies/renewable-energy'
  },
  {
    id: 'logistics',
    name: 'IQ Logistics',
    description: 'Comprehensive logistics solutions with global reach and local expertise.',
    image: '/hero/logistics-thumb.jpg',
    link: '/companies/logistics'
  },
  {
    id: 'technology',
    name: 'IQ Technology',
    description: 'Advanced technological solutions for industrial optimization and digital transformation.',
    image: '/hero/technology-thumb.jpg',
    link: '/companies/technology'
  }
];

export default function CompaniesPage() {
  const [hoveredCompany, setHoveredCompany] = useState(null);

  return (
    <div className="companies-page">
      {/* Hero Section */}
      <div className="relative">
        <HeroSection
          title="IQ Group Companies"
          subtitle="A diverse portfolio of businesses delivering excellence across multiple industries"
          backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          navTitle="COMPANIES"
        />
        
        {/* Content that overlaps with hero section */}
        <div className="relative z-20 bg-white mt-[-100vh] pt-[100vh]">
          {/* Companies Grid */}
          <ContentSection>
            <h2 className="text-3xl md:text-4xl font-bold text-[#203663] mb-12 text-center">Our Companies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companies.map((company) => (
                <Link 
                  href={company.link} 
                  key={company.id}
                  className="group"
                  onMouseEnter={() => setHoveredCompany(company.id)}
                  onMouseLeave={() => setHoveredCompany(null)}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                    <div className="relative h-60 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                        style={{ 
                          backgroundImage: `url(${company.image})`,
                          backgroundPosition: 'center',
                        }}
                      >
                        <div className="absolute inset-0 bg-[#203663] opacity-30 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className={`bg-white px-6 py-3 rounded-lg transform transition-all duration-300 ${
                            hoveredCompany === company.id ? 'scale-110 opacity-100' : 'scale-100 opacity-90'
                          }`}
                        >
                          <h3 className="text-[#203663] text-xl font-bold">{company.name}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <p className="text-gray-700 mb-4 flex-grow">{company.description}</p>
                      <div className="mt-auto">
                        <span className="inline-flex items-center text-[#203663] font-semibold group-hover:underline">
                          Learn More
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ContentSection>
          
          {/* Global Presence */}
          <ContentSection background="gray">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-[#203663] mb-6">Global Presence</h2>
                <p className="text-gray-700 mb-4">
                  The IQ Group operates across six continents, with a strong presence in key markets worldwide. Our global network allows us to leverage international expertise while delivering localized solutions tailored to regional needs.
                </p>
                <p className="text-gray-700 mb-6">
                  With headquarters in multiple strategic locations and operations in over 30 countries, we combine global reach with local understanding to create value for our clients, partners, and communities.
                </p>
                <Link href="/contact" className="inline-block bg-[#203663] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#152442] transition-colors">
                  Contact Us
                </Link>
              </div>
              <div className="md:w-1/2 h-80 bg-gray-200 rounded-lg overflow-hidden">
                {/* Placeholder for a world map or global presence visualization */}
                <div className="w-full h-full flex items-center justify-center bg-[#203663] bg-opacity-10">
                  <span className="text-[#203663] font-medium">World Map / Global Presence Visualization</span>
                </div>
              </div>
            </div>
          </ContentSection>
        </div>
      </div>
    </div>
  );
} 