'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GetStartedSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Take the first step towards transforming your business with our innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition shadow-md"
            >
              Contact Us
          </Link>
          <Link
              href="/company/divisions" 
              className="bg-white border border-gray-300 hover:border-gray-400 px-8 py-3 rounded-xl transition shadow-md"
            >
              Explore Solutions
          </Link>
            </div>
        </div>
      </div>
    </section>
  );
}