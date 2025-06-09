"use-client"
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
   }

const GlobalConstructionPlatform = () => {
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
    <div className="min-h-[100vh] bg-[#000000] text-[#fbfbfb] font-sans">
      
        
        <div className="p-8 lg:p-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="max-w-lg">
            <h1 className="text-4xl lg:text-5xl font-regular font-lato mb-6">
              Global construction platform
            </h1>
            <p className="text-gray-200 text-lg font-onest font-light leading-relaxed mb-8">
              With almost 2,800 people globally, we have a mobile workforce that 
              collaborates to share knowledge and apply world's best practice across 
              our projects.
            </p>
            <p className="text-gray-400 text-base">
              Click the map to discover more about our locations across the world.
            </p>
          </div>
          
          {/* View all locations button */}
          {/* <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors">
            <span className="text-sm">View all locations</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div> */}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-12 flex-wrap-reverse items-center">
          {/* Stats Panel */}
          <div className="lg:col-span-1">
            <div className="bg-[#5790E1] text-black p-8 space-y-6">
              <div>
                <div className="text-3xl font-light">4 continents</div>
              </div>
              <hr className="border-black opacity-20" />
              
              <div>
                <div className="text-3xl font-light">6 countries</div>
              </div>
              <hr className="border-black opacity-20" />
              
              <div>
                <div className="text-3xl font-light">2,700+ people</div>
              </div>
              <hr className="border-black opacity-20" />
              
              <div>
                <div className="text-3xl font-light">One team</div>
              </div>
            </div>
          </div>

          {/* World Map Area */}
          
          <div className="lg:col-span-4">
          
            <div className="w-full h-96 lg:h-[550px] flex items-center justify-center">
              {/* Replace this div with your SVG world map */}
              <Map/>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default GlobalConstructionPlatform;