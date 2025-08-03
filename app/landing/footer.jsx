'use client'
import React from 'react';
import { Linkedin, Instagram, Youtube, Facebook, MapPin, Mail, Phone, ArrowRight, Twitter, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const IQGroupFooter = () => {
  return (
    <footer className="bg-[#172747] min-h-[90vh] z-100 md:rounded-t-3xl text-[#203663]">
      {/* DTRE-Style Footer Section */}
      <div className="bg-[#172747]  md:rounded-t-3xl text-[#fbfbfb] py-10">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Main Content - Form and Office Locations Side by Side */}
          <div className="flex flex-col lg:flex-row lg:space-x-16 mb-10">
            {/* Left Side - Form Section */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="max-w-lg">
                <h2 className="text-3xl sm:text-4xl font-lato font-bold mb-6">
                  <span className="text-[#fbfbfb]">Unlock your actionable</span><br />
                  <span className="text-[#4a90e2]">insight today</span>
                </h2>
                
                {/* Form Fields */}
                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full border-b border-[#fbfbfb] bg-transparent text-[#fbfbfb] py-2 focus:outline-none focus:border-[#4a90e2] font-onest" 
                      placeholder="Email *"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full border-b border-[#fbfbfb] bg-transparent text-[#fbfbfb] py-2 focus:outline-none focus:border-[#4a90e2] font-onest" 
                      placeholder="Name *"
                    />
                  </div>
                  <div>
                    <label htmlFor="interests" className="sr-only">Areas of interest</label>
                    <div className="relative">
                    <select 
                        id="interests" 
                        className="w-full appearance-none border-b border-[#fbfbfb] bg-transparent text-[#fbfbfb] py-2 focus:outline-none focus:border-[#4a90e2] font-onest cursor-pointer"
                        defaultValue=""
                        style={{ border: 'none', borderBottom: '1px solid #fbfbfb' }}
                      >
                        <option value="" disabled>Select an option</option>
                        <option value="Supply Chain Insights">Supply Chain Insights</option>
                        <option value="Market Intelligence">Market Intelligence</option>
                        <option value="Cost Optimization">Cost Optimization</option>
                        <option value="Risk Analysis">Risk Analysis</option>
                        <option value="Industry Trends">Industry Trends</option>
                        <option value="Business Strategy">Business Strategy</option>
                        <option value="Custom Consultation">Custom Consultation</option>
                        <option value="Other">Other</option>
                      </select>

                      {/* Remove the SVG arrow since we're using background image */}
                    </div>
                  </div>
                  
                  {/* Privacy Policy Checkbox with Adjacent Button */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-3">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        className="mt-1 h-4 w-4 border-[#fbfbfb] bg-transparent text-[#4a90e2] focus:ring-[#4a90e2]" 
                      />
                      <label htmlFor="privacy" className="text-sm text-[#fbfbfb] font-onest">
                        I here by agree to and accept <Link href="/privacy-policy" className="text-[#4a90e2] hover:underline">Privacy Policy</Link> and give permission to access my personal data.
                      </label>
                    </div>
                    
                    {/* Submit Button - Adjacent to text */}
                    <button 
                      type="submit" 
                      className="bg-[#4a90e2] hover:bg-[#3a7bc2] text-[#fbfbfb] p-3 flex-shrink-0"
                      aria-label="Submit form"
                    >
                      <ArrowUpRight size={18} className="text-[#fbfbfb]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Office Locations */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mumbai Office */}
                <div>
                  <h3 className="text-base uppercase text-[#fbfbfb]/70 mb-2 font-onest">Mumbai</h3>
                  <p className="text-[#fbfbfb] text-sm font-onest">
                    714 – Samartha Aishwarya<br />
                    Off. New Link Road<br />
                    Andheri-W, Mumbai – 400053
                  </p>
                  <p className="text-[#fbfbfb] text-sm font-onest mt-2">
                    T: +91-9987998036
                  </p>
      </div>

                {/* Hong Kong Office */}
                <div>
                  <h3 className="text-base uppercase text-[#fbfbfb]/70 mb-2 font-onest">Hong Kong</h3>
                  <p className="text-[#fbfbfb] text-sm font-onest">
                    1611B, 16/F<br />
                    HO KING COMMERCIAL CENTRE<br />
                    MONGKOK, KOWLOON
                  </p>
                  <p className="text-[#fbfbfb] text-sm font-onest mt-2">
                    T: +91-9987998037
                  </p>
                </div>
                
                {/* Taiyuan Office */}
                <div>
                  <h3 className="text-base uppercase text-[#fbfbfb]/70 mb-2 font-onest">Taiyuan</h3>
                  <p className="text-[#fbfbfb] text-sm font-onest">
                    296, Beida Street<br />
                    Xinghualing District<br />
                    030009, Taiyuan, China
                    
                  </p>
                  <p className="text-[#fbfbfb] text-sm font-onest mt-2">
                    {typeof window !== 'undefined' && window.innerWidth < 1486 && <br/>}
                    T: +91-2235112519
                  </p>
                </div>
              </div>
              </div>
            </div>

          {/* Logos Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 pt-4 border-t border-[#fbfbfb]/10">
            {/* Left Side Logos - Custom logos */}
            <div className="flex flex-wrap items-center gap-6 mb-6 grayscale lg:mb-0">
              {/* Logo 1 */}
              <div className="h-24 w-auto">
                <Image 
                  src="/logo/7.webp" 
                  alt="Logo 1" 
                  width={160} 
                  height={80}
                  className="h-full w-auto object-contain"
                />
            </div>

              {/* Logo 2 */}
              <div className="h-24 w-auto">
                <Image 
                  src="/logo/8.png" 
                  alt="Logo 2" 
                  width={80} 
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </div>
              
              {/* Logo 3 */}
              <div className="h-24 w-auto">
                <Image 
                  src="/logo/9.png" 
                  alt="Logo 3" 
                  width={100} 
                  height={50}
                  className="h-full w-auto object-contain"
                />
              </div>

              {/* <div className="h-30 w-auto lg:ml-[-10px] lg:mt-[10px]">
                <Link href="https://www.jkbfoundation.com" target="_blank"> 
                <Image 
                  src="https://www.jkbfoundation.com/images/JKBLogo.png" 
                  alt="Logo 3" 
                  width={160} 
                  height={80}
                  className="h-full w-auto object-contain"
                />
                </Link>
              </div> */}
            </div>

            {/* Right Side - Company Logo */}
            <div className="w-40 h-auto lg:w-48 grayscale">
              <Image 
                src="/logo/2.png" 
                alt="IQ Group" 
                width={100} 
                height={100}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
          
          {/* Bottom Footer - Divider, LinkedIn, Terms, Copyright */}
          <div className="border-t border-[#fbfbfb]/10 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4">
              {/* LinkedIn Button */}
              <div className="mb-3 md:mb-0">
                <a 
                  href="https://www.linkedin.com/company/iq-minerals-&-metals?trk=company_name" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block border border-[#fbfbfb]/30 p-2 hover:bg-[#fbfbfb]/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} className="text-[#fbfbfb]" />
                  
                </a>
            </div>

            <div className="mb-3 md:mb-0">
                <a 
                  href="https://x.com/IQGroupMumbai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block border border-[#fbfbfb]/30 p-2 hover:bg-[#fbfbfb]/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Twitter size={20} className="text-[#fbfbfb]" />
                  
                </a>
            </div>

            <div className="mb-3 md:mb-0">
                <a 
                  href="https://www.facebook.com/iqgroupmumbai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block border border-[#fbfbfb]/30 p-2 hover:bg-[#fbfbfb]/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Facebook size={20} className="text-[#fbfbfb]" />
                  
                </a>
            </div>
            </div>

              {/* Terms & Privacy Links */}
              <div className="flex items-center space-x-4 mb-3 md:mb-0">
                <Link href="/terms" className="text-xs text-[#fbfbfb]/70 hover:text-[#fbfbfb] transition-colors font-onest">
                  Terms & Conditions
                </Link>
                <Link href="/privacy" className="text-xs text-[#fbfbfb]/70 hover:text-[#fbfbfb] transition-colors font-onest">
                  Privacy Policy
                </Link>
        </div>

            {/* Copyright */}
              <div className="text-xs text-[#fbfbfb]/70 font-onest">
                Copyright {new Date().getFullYear()} — IQ Group | Site by Show + Tell
            </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom styles for select dropdowns */}
      <style jsx global>{`
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          padding-right: 25px;
        }
        
        select option {
          background-color: #172747;
          color: #fbfbfb;
          padding: 10px;
          font-family: 'Onest', sans-serif;
        }
          select:focus {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
        
        /* For Firefox */
        select:-moz-focusring {
          color: transparent;
          text-shadow: 0 0 0 #fbfbfb;
        }
        
        /* For IE/Edge */
        select::-ms-expand {
          display: none;
        }
      `}</style>
    </footer>
  );
};

export default IQGroupFooter;