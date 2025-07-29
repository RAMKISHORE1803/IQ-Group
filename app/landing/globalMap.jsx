"use client"
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import GoogleMapConnections from '../landingComponent/googlemap';



const GlobalConstructionPlatform = () => {
  const [activeCountry, setActiveCountry] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const mapRef = useRef(null);

  // Check if the screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    if (typeof window !== 'undefined') {
      checkMobile();
      window.addEventListener('resize', checkMobile);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, []);

 

  const closePopup = () => {
    setActiveCountry(null);
  };

  return (
    <div className="bg-black text-white font-sans flex flex-col relative overflow-hidden">
      {/* Thin horizontal line at the top */}
      <div className="w-full border-t border-gray-800 mb-4 md:mb-8"></div>
      
      <div className="container mx-auto px-4 lg:px-12 flex-grow flex flex-col md:flex-row">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left Content Area - On mobile, this will be below the map */}
          <div className="w-full mt-[290px] md:mt-0 md:w-[40%] flex flex-col justify-between pr-0 md:pr-4 mb-8 md:mb-0 order-2 md:order-1">
            <div>
              <h1 className=" text-[24px] md:text-[32px] lg:text-[32px] lg:leading-[33px] font-light mb-4 md:mb-6">
              20+ Years of Bridging Raw Material Supply with Industrial Innovation
              </h1>
              <p className="text-gray-300  lg:text-[20px] font-light leading-relaxed mb-6 md:mb-8 max-w-md">
              With over 20 years of industry leadership, we have established a robust international network that bridges the gap between premium raw material sources and diverse industrial applications worldwide.
              </p>
            </div>
            
            {/* Stats Box - Positioned at the bottom of the left column */}
            <div className="bg-[#00a0e1] text-black p-4 md:p-8 space-y-3 md:space-y-6 mt-auto">
              <div>
                <div className="text-xl md:text-3xl font-light">15 Industries</div>
              </div>
              <hr className="border-black opacity-20" />
              
              <div>
                <div className="text-xl md:text-3xl font-light">20+ Countries</div>
              </div>
              <hr className="border-black opacity-20" />
              
              <div>
                <div className="text-xl md:text-3xl font-light">2 Decades</div>
              </div>
              <hr className="border-black opacity-20" />
              
              <div>
                <div className="text-xl md:text-3xl font-light">One team</div>
              </div>
            </div>
          </div>
          
          {/* Right Map Area - On mobile, this will be at the top */}
          <div className="w-full md:w-[60%] relative h-[0px] md:h-auto order-1 md:order-2 mb-6 md:mb-0" ref={mapRef}>
            {/* Map Component */}
            <div className="w-full mt-[50px] md:mt-0 h-full flex items-center justify-center">
              <GoogleMapConnections/>
            </div>
            
            {/* Country Popup - Only show if activeCountry exists */}
            {activeCountry && (
              <div 
                className="absolute bg-white text-black p-4 rounded shadow-lg z-10"
                style={{ 
                  left: isMobile ? '50%' : `${popupPosition.x}px`, 
                  top: isMobile ? '50%' : `${popupPosition.y}px`,
                  transform: isMobile ? 'translate(-50%, -50%)' : 'none',
                  maxWidth: isMobile ? '90%' : 'auto'
                }}
              >
                <button onClick={closePopup} className="absolute top-2 right-2 text-gray-500">&times;</button>
                <h3 className="font-bold">{countryData[activeCountry].name}</h3>
                <p>{countryData[activeCountry].established}</p>
                <p>{countryData[activeCountry].people}</p>
                <p>{countryData[activeCountry].work}</p>
                <p>{countryData[activeCountry].projects}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalConstructionPlatform;