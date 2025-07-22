import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactSection() {
  return (
    <div className="w-full flex flex-col md:flex-row md:flex-between">
      {/* Left Content Section */}
      <div className="flex-1 bg-[#fbfbfb] md:bg-[#fbfbfb] flex items-center px-[20px] py-8 sm:px-[30px] md:px-[40px] lg:px-[60px] xl:px-[110px] md:py-10 lg:py-12 xl:py-16 order-2 md:order-1">
        <div className="w-full max-w-xl mx-auto md:mx-0">
          {/* Header Label */}
          <div className="text-sm text-[#1E3157] md:text-base md:text-[#1E3157] font-onest font-medium tracking-wider mb-4 md:mb-5 lg:mb-6">
            GET IN TOUCH
          </div>
          
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-onest font-regular text-[#121212] md:text-[#1E3157] leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-8">
            LET'S DISCUSS YOUR REQUIREMENTS
          </h2>
          
          {/* Description */}
          <p className="text-[22px] sm:text-[24px] lg:text-[20px] font-onest font-light text-[#121212] md:text-[#1E3157] leading-relaxed mb-6 sm:mb-7 md:mb-8 lg:mb-10">
            Our team of experts is ready to help you find the perfect materials and solutions for your specific industry needs. Contact us today.
          </p>
          
          {/* CTA Button */}
          <Link href="/contact">
            <button className="inline-flex cursor-pointer items-center gap-3 bg-[#324390] md:bg-[#1E3157] md:border  md:border-[#1E3157] md:hover:bg-[#fbfbfb] md:hover:text-[#1E3157] text-white md:text-[#fbfbfb] px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 text-base sm:text-lg font-onest font-medium transition-all duration-300 transform rounded-none">
              CONTACT US
              <ArrowUpRight size={20} />
            </button>
          </Link>
        </div>
      </div>
      
      {/* Right Image Section */}
      <div className="w-full md:w-5/12 lg:w-[45%] xl:w-[40%] h-[300px] sm:h-[350px] md:h-auto md:min-h-[50vh] order-1 md:order-2">
        <img 
          className='w-full h-full object-cover' 
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Contact IQ Group" 
        />
      </div>
      
      {/* CSS for Google Fonts */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Onest:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        .font-lato {
          font-family: 'Lato', sans-serif;
        }
        
        .font-onest {
          font-family: 'Onest', sans-serif;
        }
      `}</style>
    </div>
  );
} 