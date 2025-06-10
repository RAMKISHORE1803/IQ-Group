'use client'
import React from 'react';
import { Linkedin, Instagram, Youtube } from 'lucide-react';

const IQGroupFooter = () => {
  console.log("Footer component mounted");
  return (
    <footer className="bg-[#203663] text-[#203663]">
      {/* Top Section - Blue Background */}
      <div className="bg-[#fbfbfb] text-[#203663] py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12 lg:mb-16">
          <div className="text-center">
            <h2 className="text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] mb-8 sm:mb-10 lg:mb-12 uppercase">
              CONNECT WITH US
            </h2>
            
            <div className="flex justify-center items-center space-x-8 sm:space-x-12 lg:space-x-16">
              {/* LinkedIn */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="mb-2 sm:mb-3 lg:mb-4 transition-transform group-hover:scale-110">
                  <Linkedin size={32} strokeWidth={1} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                </div>
                <span className="text-sm sm:text-base font-medium">LinkedIn</span>
              </div>
              
              {/* Instagram */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="mb-2 sm:mb-3 lg:mb-4 transition-transform group-hover:scale-110">
                  <Instagram size={32} strokeWidth={1} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                </div>
                <span className="text-sm sm:text-base font-medium">Instagram</span>
              </div>
              
              {/* YouTube */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="mb-2 sm:mb-3 lg:mb-4 transition-transform group-hover:scale-110">
                  <Youtube size={32} strokeWidth={1} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                </div>
                <span className="text-sm sm:text-base font-medium">YouTube</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - White Background */}
      <div className="bg-[#203663] text-[#fbfbfb] py-8 sm:py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-8 lg:space-y-0">
            {/* Company Name */}
            <div className="text-center lg:text-left lg:flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">IQ GROUP</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-end space-y-6 sm:space-y-0 sm:space-x-8 lg:space-x-16 xl:space-x-32">
              {/* First Column */}
              <div className="flex flex-col items-center sm:items-start space-y-4 sm:space-y-6">
                <a href="#" className="text-base sm:text-lg font-medium hover:opacity-75 transition-opacity">
                  About us
                </a>
                <a href="#" className="text-base sm:text-lg font-medium hover:opacity-75 transition-opacity">
                  Companies
                </a>
                <a href="#" className="text-base sm:text-lg font-medium hover:opacity-75 transition-opacity">
                  Industries
                </a>
              </div>

              {/* Second Column */}
              <div className="flex flex-col items-center sm:items-start space-y-4 sm:space-y-6">
                <a href="#" className="text-base sm:text-lg font-medium hover:opacity-75 transition-opacity">
                  Quality & Certs
                </a>
                <a href="#" className="text-base sm:text-lg font-medium hover:opacity-75 transition-opacity">
                  Careers
                </a>
                <a href="#" className="text-base sm:text-lg font-medium hover:opacity-75 transition-opacity">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Separator Line */}
        <div className="container mx-auto px-4 sm:px-6">
          <hr className="border-[#203663] opacity-20 mb-6 sm:mb-8" />
        </div>

        {/* Bottom Footer */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-6 lg:space-y-0">
            {/* Copyright and Links */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-8 text-xs sm:text-sm">
              <span className="font-medium">© 2025 IQ Group</span>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Accessibility
                </a>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Legal and Policies
                </a>
                <a href="#" className="hover:opacity-75 transition-opacity hidden sm:inline">
                  Modern Slavery Statement
                </a>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Privacy policy
                </a>
                <a href="#" className="hover:opacity-75 transition-opacity">
                  Cookies policy
                </a>
              </div>
            </div>

            {/* Design Credit */}
            <div className="text-xs sm:text-sm opacity-75 text-center lg:text-right">
              Designed & built by IQ Group Team
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default IQGroupFooter;