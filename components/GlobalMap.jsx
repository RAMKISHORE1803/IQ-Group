"use client"
import React from 'react';

const GlobalMap = () => {
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
          <div className="lg:col-span-4">
            <div className="w-full h-96 lg:h-[500px] flex items-center justify-center">
              <div className="w-full h-full bg-[#121212] rounded flex items-center justify-center border border-[#333333]">
                <svg
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
                  
                  {/* Location markers */}
                  <g>
                    {[
                      {x: 150, y: 150},
                      {x: 450, y: 150},
                      {x: 600, y: 200},
                      {x: 250, y: 350},
                      {x: 450, y: 300},
                      {x: 650, y: 150}
                    ].map((pos, i) => (
                      <g key={i} transform={`translate(${pos.x},${pos.y})`}>
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