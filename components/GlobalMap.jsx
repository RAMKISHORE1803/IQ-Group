"use client"
import React, { useState, useRef } from 'react';

// Country data for popups
const countryData = {
  CA: {
    name: "CANADA",
    established: "2011 Established in Canada",
    people: "140+ People",
    work: "US$3bn Work to date",
    projects: "52 Projects to date"
  },
  IN: {
    name: "INDIA",
    established: "2005 Established in India",
    people: "500+ People",
    work: "US$5bn Work to date",
    projects: "120 Projects to date"
  },
  US: {
    name: "UNITED STATES",
    established: "2008 Established in US",
    people: "350+ People",
    work: "US$8bn Work to date",
    projects: "85 Projects to date"
  },
  AU: {
    name: "AUSTRALIA",
    established: "2013 Established in Australia",
    people: "90+ People", 
    work: "US$2bn Work to date",
    projects: "42 Projects to date"
  },
  UK: {
    name: "UNITED KINGDOM",
    established: "2009 Established in UK",
    people: "180+ People",
    work: "US$4bn Work to date",
    projects: "65 Projects to date"
  },
  UAE: {
    name: "UAE",
    established: "2015 Established in UAE",
    people: "75+ People",
    work: "US$1.5bn Work to date",
    projects: "30 Projects to date"
  }
};

const GlobalMap = () => {
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
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="p-8 lg:p-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="max-w-lg">
            <h1 className="text-4xl lg:text-5xl font-light mb-6">
              Global construction platform
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              With almost 2,800 people globally, we have a mobile workforce that 
              collaborates to share knowledge and apply world's best practice across 
              our projects.
            </p>
            <p className="text-gray-400 text-base">
              Click the map to discover more about our locations across the world.
            </p>
          </div>
          
          {/* View all locations button */}
          <div className="flex items-center space-x-2 cursor-pointer hover:text-[#5790E1] transition-colors">
            <span className="text-sm">View all locations</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Stats Panel */}
          <div className="lg:col-span-1">
            <div className="bg-[#5790E1] text-white p-8 space-y-6">
              <div>
                <div className="text-3xl font-light">4 continents</div>
              </div>
              <hr className="border-white/20" />
              
              <div>
                <div className="text-3xl font-light">6 countries</div>
              </div>
              <hr className="border-white/20" />
              
              <div>
                <div className="text-3xl font-light">2,700+ people</div>
              </div>
              <hr className="border-white/20" />
              
              <div>
                <div className="text-3xl font-light">One team</div>
              </div>
            </div>
          </div>

          {/* World Map Area */}
          <div className="lg:col-span-4 relative">
            <div className="w-full h-96 lg:h-[500px] flex items-center justify-center">
              <div className="w-full h-full bg-[#121212] rounded flex items-center justify-center border border-[#333333] relative">
                {/* Country Popup */}
                {activeCountry && (
                  <div 
                    className="absolute z-10 bg-white text-gray-800 p-6 rounded-md shadow-lg w-[300px]"
                    style={{ 
                      left: `${popupPosition.x}px`, 
                      top: `${popupPosition.y}px`,
                      transform: 'translate(-50%, -100%)'
                    }}
                  >
                    {/* Close button */}
                    <button 
                      onClick={closePopup}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    {/* Popup content */}
                    <h3 className="text-xl font-medium text-gray-600 mb-4">{countryData[activeCountry].name}</h3>
                    <p className="text-lg text-gray-700 mb-2">{countryData[activeCountry].established}</p>
                    <p className="text-lg font-medium text-[#5790E1] mb-2">{countryData[activeCountry].people}</p>
                    <p className="text-lg text-gray-700 mb-2">{countryData[activeCountry].work}</p>
                    <p className="text-lg text-gray-700">{countryData[activeCountry].projects}</p>
                  </div>
                )}
                
                <svg
                  ref={mapRef}
                  width="800"
                  height="527.666"
                  className="object-contain w-full h-full p-8"
                  viewBox="0 0 800 527.666"
                >
                  {/* Map background */}
                  <rect 
                    width="100%" 
                    height="100%" 
                    fill="#121212"
                  />
                  
                  {/* Map grid lines */}
                  <g stroke="#333333" strokeWidth="0.5" opacity="0.3">
                    {/* Add grid lines here */}
                    {Array.from({length: 20}).map((_, i) => (
                      <line 
                        key={`h-${i}`}
                        x1="0" 
                        y1={i * (527.666/20)} 
                        x2="800" 
                        y2={i * (527.666/20)}
                      />
                    ))}
                    {Array.from({length: 30}).map((_, i) => (
                      <line 
                        key={`v-${i}`}
                        x1={i * (800/30)} 
                        y1="0" 
                        x2={i * (800/30)} 
                        y2="527.666"
                      />
                    ))}
                  </g>
                  
                  {/* Map continents - placeholder shapes */}
                  <g fill="#5790E1" opacity="0.1">
                    {/* Add simplified continent shapes here */}
                    {/* North America */}
                    <path d="M100,100 L300,100 L350,200 L200,300 L100,250 Z" />
                    {/* South America */}
                    <path d="M250,300 L300,400 L200,500 L150,400 Z" />
                    {/* Europe */}
                    <path d="M400,100 L500,100 L500,200 L400,200 Z" />
                    {/* Africa */}
                    <path d="M400,250 L500,250 L500,400 L400,400 Z" />
                    {/* Asia */}
                    <path d="M550,100 L700,100 L700,300 L550,300 Z" />
                  </g>
                  
                  {/* Clickable country regions */}
                  <g>
                    {/* Canada */}
                    <path 
                      id="CA" 
                      d="M150,120 L280,120 L280,180 L150,180 Z" 
                      fill="#5790E1" 
                      opacity="0.2" 
                      className="cursor-pointer hover:opacity-40 transition-opacity"
                      onClick={(e) => handleCountryClick('CA', e)}
                    />
                    
                    {/* India */}
                    <path 
                      id="IN" 
                      d="M600,230 L650,230 L650,270 L600,270 Z" 
                      fill="#5790E1" 
                      opacity="0.2" 
                      className="cursor-pointer hover:opacity-40 transition-opacity"
                      onClick={(e) => handleCountryClick('IN', e)}
                    />
                    
                    {/* United States */}
                    <path 
                      id="US" 
                      d="M180,190 L280,190 L280,230 L180,230 Z" 
                      fill="#5790E1" 
                      opacity="0.2" 
                      className="cursor-pointer hover:opacity-40 transition-opacity"
                      onClick={(e) => handleCountryClick('US', e)}
                    />
                    
                    {/* Australia */}
                    <path 
                      id="AU" 
                      d="M650,350 L700,350 L700,400 L650,400 Z" 
                      fill="#5790E1" 
                      opacity="0.2" 
                      className="cursor-pointer hover:opacity-40 transition-opacity"
                      onClick={(e) => handleCountryClick('AU', e)}
                    />
                    
                    {/* UK */}
                    <path 
                      id="UK" 
                      d="M420,150 L440,150 L440,170 L420,170 Z" 
                      fill="#5790E1" 
                      opacity="0.2" 
                      className="cursor-pointer hover:opacity-40 transition-opacity"
                      onClick={(e) => handleCountryClick('UK', e)}
                    />
                    
                    {/* UAE */}
                    <path 
                      id="UAE" 
                      d="M550,230 L570,230 L570,250 L550,250 Z" 
                      fill="#5790E1" 
                      opacity="0.2" 
                      className="cursor-pointer hover:opacity-40 transition-opacity"
                      onClick={(e) => handleCountryClick('UAE', e)}
                    />
                  </g>
                  
                  {/* Location markers */}
                  <g>
                    {[
                      {x: 150, y: 150, country: 'CA'},
                      {x: 450, y: 150, country: 'UK'},
                      {x: 600, y: 250, country: 'IN'},
                      {x: 250, y: 210, country: 'US'},
                      {x: 560, y: 240, country: 'UAE'},
                      {x: 675, y: 375, country: 'AU'}
                    ].map((pos, i) => (
                      <g 
                        key={i} 
                        transform={`translate(${pos.x},${pos.y})`}
                        className="cursor-pointer"
                        onClick={(e) => handleCountryClick(pos.country, e)}
                      >
                        <circle r="6" fill="#5790E1" />
                        <circle r="12" fill="#5790E1" opacity="0.2">
                          <animate 
                            attributeName="r" 
                            from="6" 
                            to="20" 
                            dur="2s" 
                            repeatCount="indefinite"
                          />
                          <animate 
                            attributeName="opacity" 
                            from="0.2" 
                            to="0" 
                            dur="2s" 
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    ))}
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMap; 