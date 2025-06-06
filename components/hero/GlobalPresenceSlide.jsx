"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the GlobeDemo component to avoid SSR issues
const GlobeDemo = dynamic(() => import("../ui/globe-demo"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-black"></div>,
});

// Stat data for the global presence slide
const stats = [
  { value: "30+", label: "Countries" },
  { value: "50+", label: "Global Offices" },
  { value: "10K+", label: "Employees Worldwide" },
  { value: "24/7", label: "Global Support" },
];

export default function GlobalPresenceSlide() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col lg:flex-row h-full w-full">
        <div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col justify-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Global Footprint
          </h2>
          <p className="text-lg mb-8">
            With operations spanning across 30+ countries and 50+ global offices,
            our worldwide presence ensures we can deliver exceptional service to
            clients anywhere on the planet.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-card bg-white bg-opacity-10 p-4 rounded-lg"
              >
                <div className="text-2xl lg:text-3xl font-bold text-blue-500">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 h-[400px] lg:h-full flex items-center justify-center">
          {mounted && <GlobeDemo />}
        </div>
      </div>
    </div>
  );
} 