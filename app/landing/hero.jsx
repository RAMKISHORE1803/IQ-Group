'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from 'next/image';
import { cn } from "@/lib/utils";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#010A4E] via-[#041174] to-white z-0"></div>
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Image 
          src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Global shipping and logistics"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 flex items-center w-full h-full">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            {/* Primary heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white">
              DELIVERING COMMODITY
              <span className="block">WORLDWIDE</span>
            </h1>
            
            {/* Secondary text */}
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl font-light leading-relaxed">
              An Organisation that bridges the gap between Global Raw material manufacturers and End Users
            </p>
            
            {/* Custom animated button */}
            <div 
              className="relative inline-block"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Button 
                className={cn(
                  "group relative w-[250px] bg-sky-500 hover:bg-sky-600 text-white px-10 py-6 rounded-md shadow-lg",
                  "shadow-sky-500/30 hover:shadow-sky-600/40 transition-all duration-300"
                )}
              >
                <div className="relative flex items-center justify-center w-full">
                  <span 
                    className={cn(
                      "inline-block transition-transform duration-300 ease-in-out",
                      isHovered ? "-translate-x-6" : "translate-x-0"
                    )}
                  >
                    Request Quotation
                  </span>
                  <ArrowRight 
                    className={cn(
                      "absolute right-0 transition-all duration-300 ease-in-out",
                      isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    )}
                    size={18} 
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}