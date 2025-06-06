import React from 'react';
import { trustLogos } from './trustData';

const TrustStrip = () => {
  return (
    <section id="trust-strip" className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-gray-600 uppercase tracking-wide text-sm mb-8">
          Trusted by Industry Leaders
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
          {trustLogos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className={`${logo.height} grayscale hover:grayscale-0 transition duration-300 ease-in-out`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip; 