'use client';

import React from 'react';
import Image from 'next/image';

const FlipCard = ({ company }) => {
  return (
    <div className="flip-card w-full h-[420px] perspective-1000">
      <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d shadow-xl">
        {/* Front */}
        <div className="flip-card-front absolute w-full h-full backface-hidden bg-gray-900 overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={company.image}
              alt={company.name}
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{company.name}</h3>
              <p className="text-sky-300 font-light text-sm md:text-base">{company.category}</p>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="flip-card-back absolute w-full h-full backface-hidden bg-gradient-to-br from-[#041174] to-[#010A4E] rotate-y-180 p-6 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-3">{company.name}</h3>
          <p className="text-sky-300 font-light text-sm md:text-base mb-4">{company.category}</p>
          <div>
            <h4 className="text-lg font-semibold mb-2">Commodities:</h4>
            <ul className="space-y-1 max-h-[180px] overflow-y-auto pr-2">
              {company.commodities.map((commodity, index) => (
                <li key={index} className="flex items-center text-gray-200 text-sm md:text-base">
                  <span className="mr-2 text-sky-300">•</span>
                  {commodity}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-gray-300 font-light text-sm md:text-base">{company.description}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

// Style guide:
// These styles are needed in the parent component:
/*
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
*/ 