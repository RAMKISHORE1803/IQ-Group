"use client"
import React from 'react';
import { useState, useRef } from 'react';
import Map from './mapSVG';

const countryData = {
  IN: {
    name: "INDIA",
    established: "2005 Established in India",
    people: "500+ People",
    work: "US$5bn Work to date",
    projects: "120 Projects to date"
  },
  // Add more countries as needed
}

const GlobalConstructionPlatform = () => {
  const [activeCountry, setActiveCountry] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  const handleCountryClick = (countryCode, e) => {
    // Only proceed if we have data for this country
    if (!countryData[countryCode]) return;

    // Calculate position for popup
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top - 150; // Position above the click point
    
    setPopupPosition({ x, y });
    setActiveCountry(countryCode);
  };

  const closePopup = () => {
    setActiveCountry(null);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col relative overflow-hidden">
      {/* Thin horizontal line at the top */}
      <div className="w-full border-t border-gray-800 mb-8"></div>
      
      <div className="container mx-auto px-6 lg:px-12 flex-grow flex flex-col md:flex-row">
        <div className="flex flex-col md:flex-row h-full w-full">
          {/* Left Content Area */}
          <div className="w-full md:w-[40%] flex flex-col justify-between pr-0 md:pr-4 mb-8 md:mb-0 order-2 md:order-1">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
                Global construction platform
              </h1>
              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md">
              With over 20 years of industry leadership, we have established a robust international network that bridges the gap between premium raw material sources and diverse industrial applications worldwide.              </p>
              <p className="text-gray-400 text-base hidden md:block">
                Click the map to discover more about our locations across the world.
              </p>
            </div>
            
            {/* Stats Box - Positioned at the bottom of the left column */}
            <div className="bg-[#00a0e1] text-black p-6 md:p-8 space-y-4 md:space-y-6 mt-auto">
              <div>
                <div className="text-2xl md:text-3xl font-light">12 Industries</div>
              </div>
              <hr className="border-black opacity-20" />
              
              <div>
                <div className="text-2xl md:text-3xl font-light">20+ Countries</div>
              </div>
              <hr className="border-black opacity-20" />
              
              <div>
                <div className="text-2xl md:text-3xl font-light">2 Decades</div>
              </div>
              <hr className="border-black opacity-20" />
              
              <div>
                <div className="text-2xl md:text-3xl font-light">One team</div>
              </div>
            </div>
          </div>
          
          {/* Right Map Area */}
          <div className="w-full md:w-[60%] relative h-[300px] md:h-auto order-1 md:order-2 mb-6 md:mb-0" ref={mapRef}>
            {/* View all locations button */}
            {/* <div className="absolute top-0 right-0 flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors">
              <span className="text-sm">View all locations</span>
              <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div> */}
            
            {/* Map Component */}
            <div className="w-full h-full flex items-center justify-center">
              <Map />
            </div>
            
            {/* Mobile instruction text */}
            <p className="text-gray-400 text-sm text-center mt-2 md:hidden">
              Tap the map to explore our global locations
            </p>
            
            {/* Country Popup - Only show if activeCountry exists */}
            {activeCountry && (
              <div 
                className="absolute bg-white text-black p-4 rounded shadow-lg z-10"
                style={{ left: `${popupPosition.x}px`, top: `${popupPosition.y}px` }}
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