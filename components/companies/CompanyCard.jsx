'use client';
import React, { useState, useEffect } from 'react';

export default function CompanyCard({ company, isCenter, position, scale, xOffset, yOffset, onClick }) {
  // State for mobile detection and hover
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Detect mobile screen on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Extended company data with products
  const getCompanyProducts = (companyName) => {
    const productMap = {
      'IQ Ferro Alloys': ['Ferro Silicon', 'Ferro Manganese', 'Ferro Chrome', 'Specialty Alloys'],
      'IQ Green Energy': ['Solar Panels', 'Wind Turbines', 'Battery Storage', 'Smart Grid Solutions'],
      'IQ Mineral & Metals': ['Copper', 'Aluminum', 'Steel', 'Rare Earth Metals'],
      'IQ Trading': ['Commodity Trading', 'Market Analysis', 'Risk Management', 'Global Sourcing'],
      'IQ Shipping': ['Container Shipping', 'Bulk Carriers', 'Port Operations', 'Fleet Management'],
      'IQ Logistics': ['Warehousing', 'Distribution', 'Supply Chain', 'Last Mile Delivery'],
      'IQ Resources': ['Raw Materials', 'Mining Services', 'Resource Planning', 'Quality Control']
    };
    return productMap[companyName] || ['Products & Services'];
  };

  const products = getCompanyProducts(company.name);
  
  return (
    <div
      className="absolute cursor-pointer transition-all duration-500 ease-out"
      style={{
        transform: `translateX(${xOffset}px) translateY(${yOffset}px) scale(${isHovered && isCenter ? scale * 1.02 : scale})`,
        width: isMobile 
          ? (isCenter ? '320px' : '280px')
          : (isCenter ? '380px' : '340px'),
        height: isMobile 
          ? (isCenter ? '506px' : '480px')
          : (isCenter ? '506px' : '480px'),
        zIndex: isCenter ? 10 : 5 - Math.abs(position),
        opacity: Math.abs(position) <= 2 ? 1 : 0.7,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card Container */}
      <div className="relative w-full h-full overflow-hidden shadow-2xl">
        
        {/* Dynamic Background */}
        <div className={`absolute inset-0 transition-all duration-700 ${
          isHovered && isCenter 
            ? 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200' 
            : 'bg-gradient-to-br from-blue-400 via-purple-500 to-teal-400'
        }`}>
          
          {/* Animated Light Streaks - Only in non-hover state */}
          {(!isHovered || !isCenter) && (
            <div className="absolute inset-0 overflow-hidden">
              {/* Main diagonal streaks */}
              <div className="absolute -top-10 -left-10 w-full h-full">
                <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-white/40 to-transparent transform rotate-12 translate-x-20"></div>
                <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-yellow-300/30 to-transparent transform rotate-12 translate-x-32"></div>
                <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-pink-300/30 to-transparent transform rotate-12 translate-x-44"></div>
                <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-blue-300/40 to-transparent transform rotate-12 translate-x-56"></div>
                <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-green-300/30 to-transparent transform rotate-12 translate-x-68"></div>
                <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-purple-300/30 to-transparent transform rotate-12 translate-x-80"></div>
                <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-teal-300/40 to-transparent transform rotate-12 translate-x-92"></div>
                <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-orange-300/30 to-transparent transform rotate-12 translate-x-104"></div>
              </div>
              
              {/* Additional angled streaks */}
              <div className="absolute -top-10 -right-10 w-full h-full">
                <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent transform -rotate-12 -translate-x-20"></div>
                <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent transform -rotate-12 -translate-x-32"></div>
                <div className="absolute w-1 h-full bg-gradient-to-b from-transparent via-rose-300/30 to-transparent transform -rotate-12 -translate-x-44"></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Top Label - Company Name */}
        <div className="absolute top-6 left-6 z-10">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <span className="text-white text-xs font-medium tracking-wider">
              {company.name.toUpperCase()}
            </span>
          </div>
        </div>
        
        {/* Bottom Glassy Content Area */}
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
          isHovered && isCenter ? 'h-3/4' : 'h-2/5'
        }`}>
          <div className="h-full bg-white/90 backdrop-blur-md border-t border-white/20 p-6 flex flex-col">
            
            {/* Article/Company Label */}
            <div className="mb-3">
              <span className="text-gray-500 text-xs font-medium tracking-wider">
                {isHovered && isCenter ? 'COMPANY' : 'PRODUCTS'} • MAY 16, 2025
              </span>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              {!isHovered || !isCenter ? (
                // Default State - Products
                <>
                  <h3 className="text-gray-900 text-lg font-semibold mb-3 leading-tight">
                    {company.name} Supply Solutions
                  </h3>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    <p className="mb-2">
                      Specialized in {products.slice(0, 2).join(', ').toLowerCase()} and comprehensive supply chain management.
                    </p>
                    <div className="space-y-1">
                      {products.slice(0, 3).map((product, index) => (
                        <div key={index} className="text-gray-500 text-xs">
                          • {product}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // Hover State - Company Description
                <>
                  <h2 className="text-gray-900 text-xl font-bold mb-4 leading-tight">
                    {company.description}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Ahead of their annual summit, industry leaders are turning to {company.name} for innovative solutions and strategic partnerships that drive sustainable growth in today's evolving marketplace.
                  </p>
                  
                  {/* Learn More Button */}
                  <button 
                    className="inline-flex items-center px-6 py-3 bg-[#5790E1] text-white text-sm font-semibold rounded-lg hover:bg-[#4a7bc8] transition-all duration-200 shadow-lg hover:shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle learn more click
                    }}
                  >
                    LEARN MORE
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}