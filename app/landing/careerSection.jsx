'use client'
import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import {motion} from 'framer-motion';

export default function BCGCareersSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [font, setFont] = useState('lato');
  const [weight, setWeight] = useState('bold');

  useEffect(() => {
   if(typeof window !== 'undefined'){
    setIsMobile(window.innerWidth < 768);
    if(!isMobile){
      setFont('onest');
      setWeight('light');
    }
    


   }
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row-reverse md:flex-between">
      {/* Left Content Section */}
      
      <div className="flex-1 bg-[#fbfbfb] md:bg-[#1E3157] flex items-center px-[20px] py-8 sm:px-[30px] md:px-[40px] lg:px-[60px] xl:px-[110px] md:py-10 lg:py-12 xl:py-16 order-1 lg:order-1">
        <div className="w-full max-w-xl mx-auto md:mx-0">
          {/* Header Label */}
          <div className="text-sm text-[#1E3157] md:text-base md:text-[#fbfbfb] font-onest font-medium  tracking-wider mb-4 md:mb-5 lg:mb-6">
            IQ-GROUP CAREERS
          </div>
          
          {/* Main Heading */}
          <motion.h1 
          initial = {{opacity:0 , y:30}}
          whileInView = {{opacity:1 , y:0}}
          viewport = {{once: false , amount: 0.4}}
          transition = {{duration: 0.4 , delay: 0.1}}
          className={`text-[28px] lg:text-[40px] xl:text-[32px] font-${font} font-${weight} text-[#203663]  text-[#121212] md:text-white leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-8`}>
            GO BEYOND THE EXPECTED
          </motion.h1> 
          
          {/* Description */}
          <p className="text-[22px] sm:text-[24px] lg:text-[20px] font-onest font-light text-[#121212] md:text-[#fbfbfb]  leading-relaxed mb-6 sm:mb-7 md:mb-8 lg:mb-10">
            We're dedicated to helping our clients do amazing things and unlocking the potential of those who advance the world. Join us, and you can too.
          </p>
          
          {/* CTA Button */}
          <Link href="/careers">
          <button className="inline-flex cursor-pointer items-center gap-3 bg-[#324390] md:bg-[#FBFBFB] md:border md:border-black md:hover:border-white md:hover:bg-[#1E3157] md:hover:text-[#FBFBFB] text-white md:text-black px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 text-base sm:text-lg font-onest font-medium transition-all duration-300 transform rounded-none">
            APPLY TODAY
            <ArrowUpRight size={20} />
          </button>
          </Link>
        </div>
      </div>
      
      {/* Right Image Section */}
      <div className="w-full md:w-5/12 lg:w-[45%] xl:w-[40%] h-[300px] sm:h-[350px] md:h-auto md:min-h-[50vh]">
        <img 
          className='w-full h-full object-cover' 
          src="https://web-assets.bcg.com/dims4/default/5a83663/2147483647/strip/true/crop/3449x1940+211+0/resize/1024x576!/format/webp/quality/90/?url=http%3A%2F%2Fboston-consulting-group-brightspot.s3.amazonaws.com%2F43%2F0a%2Fef700dc0435aacba6d0edb8f60ab%2F2025-refresh-careers-module-1.png" 
          alt="Career opportunities at IQ Group" 
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