'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/industries/HeroSection';
import Link from 'next/link';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Section links for "In This Section" navigation
const sectionLinks = [
  {
    title: "Overview",
    link: "#overview"
  },
  {
    title: "Materials",
    link: "#materials"
  },
  {
    title: "Benefits",
    link: "#benefits"
  },
  {
    title: "Case Studies",
    link: "#case-studies"
  }
];

export default function SteelIndustryPage() {
  const overviewRef = useRef(null);
  const materialsRef = useRef(null);
  const benefitsRef = useRef(null);
  const caseStudiesRef = useRef(null);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // Initialize scroll animations if needed
      ScrollTrigger.refresh();

      // Create animation for each section
      const sections = [
        { ref: overviewRef, delay: 0 },
        { ref: materialsRef, delay: 0.1 },
        { ref: benefitsRef, delay: 0.2 },
        { ref: caseStudiesRef, delay: 0.3 }
      ];

      sections.forEach(({ ref, delay }) => {
        if (!ref.current) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }).fromTo(
          ref.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay, ease: 'power2.out' }
        );
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      // Clean up any ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="steel-industry-page bg-white">
      {/* Hero Section */}
      <HeroSection 
        title="Steel Industry"
        subtitle="Providing premium raw materials for steel manufacturing with consistent quality and reliable supply chain solutions."
        backgroundImage="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
        sideText="STEEL INDUSTRY"
        navTitle="INDUSTRIES"
        sectionLinks={sectionLinks}
      />

      {/* Main Content */}
      <div className="relative z-20 bg-white">
        {/* Overview Section */}
        <section 
          ref={overviewRef}
          id="overview" 
          className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-24 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12">
              {/* Heading */}
              <div className="md:col-span-5 lg:col-span-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#203663] mb-4">
                  Steel Industry Overview
                </h2>
              </div>
              
              {/* Text Content */}
              <div className="md:col-span-7 lg:col-span-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    The steel industry is a cornerstone of modern infrastructure and manufacturing, producing the essential metal used in construction, automotive, energy, and countless other sectors. IQ Group provides high-quality raw materials that meet the exacting standards of steel producers worldwide.
                  </p>
                  <p className="text-gray-700 mb-6">
                    With decades of experience in sourcing and supplying materials for steel production, we understand the critical nature of consistent quality, timely delivery, and competitive pricing in this industry.
                  </p>
                  <p className="text-gray-700">
                    Our global network of suppliers and logistics expertise ensures reliable access to premium materials even during market fluctuations and supply chain challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Materials Section */}
        <section 
          ref={materialsRef}
          id="materials" 
          className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-24 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#203663] mb-12 text-center">
              Materials for Steel Production
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Material Card 1 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-[#203663]/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#203663" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#203663] mb-3">Iron Ore</h3>
                <p className="text-gray-600">
                  High-grade iron ore with various Fe content levels, meeting different steel production requirements. Available in lump, fines, and pellets.
                </p>
              </div>
              
              {/* Material Card 2 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-[#203663]/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#203663" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#203663] mb-3">Coking Coal</h3>
                <p className="text-gray-600">
                  Premium metallurgical coal with low ash and sulfur content, essential for coke production in blast furnace operations.
                </p>
              </div>
              
              {/* Material Card 3 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-[#203663]/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#203663" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#203663] mb-3">Ferro Alloys</h3>
                <p className="text-gray-600">
                  Comprehensive range of ferro alloys including ferromanganese, ferrochrome, ferrosilicon, and specialty alloys for steel production.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section 
          ref={benefitsRef}
          id="benefits" 
          className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-24 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#203663] mb-12 text-center">
              Benefits of Working with IQ Group
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Benefit 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#203663] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#203663] mb-3">Quality Assurance</h3>
                  <p className="text-gray-600">
                    Rigorous quality control processes ensure all materials meet or exceed industry standards and your specific requirements.
                  </p>
                </div>
              </div>
              
              {/* Benefit 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#203663] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#203663] mb-3">Supply Chain Reliability</h3>
                  <p className="text-gray-600">
                    Our global network and logistics expertise ensure consistent supply even during market disruptions.
                  </p>
                </div>
              </div>
              
              {/* Benefit 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#203663] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#203663] mb-3">Technical Expertise</h3>
                  <p className="text-gray-600">
                    Our team includes industry specialists who understand steel production requirements and can provide technical guidance.
                  </p>
                </div>
              </div>
              
              {/* Benefit 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#203663] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#203663] mb-3">Competitive Pricing</h3>
                  <p className="text-gray-600">
                    Direct relationships with producers and efficient operations allow us to offer competitive pricing without compromising quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Case Studies Section */}
        <section 
          ref={caseStudiesRef}
          id="case-studies" 
          className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-24 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#203663] mb-12 text-center">
              Case Studies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Case Study 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')" }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#203663] mb-3">
                    Major Steel Producer in Europe
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supplied consistent high-grade iron ore during global supply chain disruptions, enabling uninterrupted production.
                  </p>
                  <Link href="/case-studies/european-steel" className="text-[#203663] font-medium hover:underline inline-flex items-center">
                    Read full case study
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Case Study 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')" }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#203663] mb-3">
                    Asian Steel Manufacturing Group
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Provided technical consultation and specialty alloys for high-performance steel production, improving quality and reducing costs.
                  </p>
                  <Link href="/case-studies/asian-steel" className="text-[#203663] font-medium hover:underline inline-flex items-center">
                    Read full case study
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                href="/contact" 
                className="inline-block bg-[#203663] text-white py-3 px-8 rounded-lg font-medium transition-all hover:bg-[#152648] hover:shadow-lg"
              >
                Contact Us for Steel Industry Solutions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 