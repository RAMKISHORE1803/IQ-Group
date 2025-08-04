'use client';

import { BentoGrid4, BentoGridItem4 } from './4bento';

const galleryImages = [
  {
    title: "Strategic Insights",
    type: "Featured",
    image: "/Images/HeroSection/hero1.webp",
    description: "Comprehensive market analysis and strategic recommendations for global industries",
    href: "/resources/insights/strategic-insights"
  },
  {
    title: "Market Trends",
    type: "Report",
    image: "/Images/HeroSection/hero2.webp",
    description: "Latest developments in the global market",
    href: "/resources/insights/market-trends"
  },
  {
    title: "Industry Outlook",
    type: "Analysis",
    image: "/Images/HeroSection/hero3.webp",
    description: "Future projections for key industry sectors",
    href: "/resources/insights/industry-outlook"
  },
  {
    title: "Supply Chain Innovation",
    type: "Case Study",
    image: "/Images/HeroSection/hero4.webp",
    description: "Optimizing logistics and distribution networks",
    href: "/resources/insights/supply-chain"
  }
];

export default function BentoExample() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Featured Resources</h2>
      
      <BentoGrid4>
        {/* Featured large card (2x2) */}
        <BentoGridItem4
          variant="large"
          title={
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white/90 mb-1">
                {galleryImages[0].type}
              </span>
              <span className="text-lg md:text-xl">{galleryImages[0].title}</span>
            </div>
          }
          description={galleryImages[0].description}
          header={
            <img
              src={galleryImages[0].image}
              alt={galleryImages[0].title}
              className="w-full h-full cursor-pointer object-cover transition-transform duration-500 group-hover/bento:scale-105"
            />
          }
          href={galleryImages[0].href}
        />
        
        {/* Tall card (1x2) */}
        <BentoGridItem4
          variant="tall"
          title={
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white/90 mb-1">
                {galleryImages[1].type}
              </span>
              <span className="text-lg md:text-xl">{galleryImages[1].title}</span>
            </div>
          }
          description={galleryImages[1].description}
          header={
            <img
              src={galleryImages[1].image}
              alt={galleryImages[1].title}
              className="w-full h-full cursor-pointer object-cover transition-transform duration-500 group-hover/bento:scale-105"
            />
          }
          href={galleryImages[1].href}
        />
        
        {/* Wide card (2x1) */}
        <BentoGridItem4
          variant="wide"
          title={
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white/90 mb-1">
                {galleryImages[2].type}
              </span>
              <span className="text-lg md:text-xl">{galleryImages[2].title}</span>
            </div>
          }
          description={galleryImages[2].description}
          header={
            <img
              src={galleryImages[2].image}
              alt={galleryImages[2].title}
              className="w-full h-full cursor-pointer object-cover transition-transform duration-500 group-hover/bento:scale-105"
            />
          }
          href={galleryImages[2].href}
        />
        
        {/* Standard card (1x1) */}
        <BentoGridItem4
          variant="default"
          title={
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white/90 mb-1">
                {galleryImages[3].type}
              </span>
              <span className="text-lg md:text-xl">{galleryImages[3].title}</span>
            </div>
          }
          description={galleryImages[3].description}
          header={
            <img
              src={galleryImages[3].image}
              alt={galleryImages[3].title}
              className="w-full h-full cursor-pointer object-cover transition-transform duration-500 group-hover/bento:scale-105"
            />
          }
          href={galleryImages[3].href}
        />
      </BentoGrid4>
      
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Alternative Layout</h3>
        <BentoGrid4 className="md:grid-cols-3">
          {/* Full width card */}
          <BentoGridItem4
            variant="fullWidth"
            title={
              <div className="flex flex-col">
                <span className="text-xs font-medium text-white/90 mb-1">
                  Featured
                </span>
                <span className="text-lg md:text-xl">Global Market Insights</span>
              </div>
            }
            description="Comprehensive analysis of global market trends and opportunities"
            header={
              <img
                src="/Images/HeroSection/hero1.webp"
                alt="Global Market Insights"
                className="w-full h-full cursor-pointer object-cover transition-transform duration-500 group-hover/bento:scale-105"
              />
            }
          />
          
          {/* Three equal cards */}
          {galleryImages.slice(0, 3).map((image, index) => (
            <BentoGridItem4
              key={index}
              variant="default"
              title={
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white/90 mb-1">
                    {image.type}
                  </span>
                  <span className="text-lg md:text-xl">{image.title}</span>
                </div>
              }
              header={
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full cursor-pointer object-cover transition-transform duration-500 group-hover/bento:scale-105"
                />
              }
              href={image.href}
            />
          ))}
        </BentoGrid4>
      </div>
    </div>
  );
} 