'use client';

import React, { useState, useEffect } from 'react';

export default function CompanyCard({ company, isCenter, position, scale, xOffset, yOffset, onClick }) {
  // State for mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
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
  
  return (
    <div
      className="absolute  shadow-lg bg-white overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        transform: `translateX(${xOffset}px) translateY(${yOffset}px) scale(${scale})`,
        width: isMobile 
          ? (isCenter ? '260px' : '230px') // Smaller on mobile
          : (isCenter ? '330px' : '280px'),
        height: isMobile 
          ? (isCenter ? '260px' : '230px') // Smaller on mobile
          : (isCenter ? '330px' : '280px'),
        zIndex: isCenter ? 10 : 5 - Math.abs(position),
        opacity: Math.abs(position) <= 2 ? 1 : 0.7, // Keep cards within view fully opaque
      }}
      onClick={onClick}
    >
      {/* Card top color bar */}
      <div 
        className="h-3 w-full" 
        style={{ backgroundColor: company.color }}
      />
      
      {/* Card content */}
      <div className="flex flex-col items-center justify-center p-6 h-full">
        <div className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} mb-6 flex items-center justify-center`}>
          <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-gray-100 rounded-full flex items-center justify-center`}>
            <span className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`} style={{ color: company.color }}>
              {company.name.charAt(0)}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-black mb-2 text-center">{company.name}</h3>
        <p className="text-gray-600 text-sm text-center">
          {company.description}
        </p>
        
        {isCenter && (
          <button className={`mt-6 px-4 py-2 bg-blue-600 text-white rounded-md ${isMobile ? 'text-sm' : ''}`}>
            Learn More
          </button>
        )}
      </div>
    </div>
  );
} 