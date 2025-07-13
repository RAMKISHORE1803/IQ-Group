'use client'
import React from 'react';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const DTREStyleFooter = () => {
  return (
    <footer className="bg-[#203663] text-[#fbfbfb]">
      <div className="bg-[#203663] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content - Form and Office Locations Side by Side */}
          <div className="flex flex-col lg:flex-row lg:space-x-16 mb-20">
            {/* Left Side - Form Section */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="max-w-lg">
                <h2 className="text-4xl sm:text-5xl font-lato font-bold mb-10">
                  <span className="text-[#fbfbfb]">Unlock your actionable</span><br />
                  <span className="text-[#4a90e2]">insight today</span>
                </h2>
                
                {/* Form Fields */}
                <div className="space-y-8">
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
                        className="w-full appearance-none border-b border-[#fbfbfb] bg-transparent text-[#fbfbfb] py-2 focus:outline-none focus:border-[#4a90e2] font-onest"
                      >
                        <option value="" disabled selected>Areas of interest (Please select)</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#fbfbfb]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Privacy Policy Checkbox */}
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
                  
                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      className="bg-[#4a90e2] hover:bg-[#3a7bc2] text-[#fbfbfb] p-3"
                      aria-label="Submit form"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Office Locations */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Mumbai Office */}
                <div>
                  <h3 className="text-lg uppercase text-[#fbfbfb]/70 mb-4 font-onest">Mumbai</h3>
                  <p className="text-[#fbfbfb] font-onest">
                    714 – Samartha Aishwarya<br />
                    Off. New Link Road<br />
                    Opp. Highland Park<br />
                    Andheri-W, Mumbai – 400053
                  </p>
                  <p className="text-[#fbfbfb] font-onest mt-4">
                    T: +91-9987998036
                  </p>
                </div>
                
                {/* Hong Kong Office */}
                <div>
                  <h3 className="text-lg uppercase text-[#fbfbfb]/70 mb-4 font-onest">Hong Kong</h3>
                  <p className="text-[#fbfbfb] font-onest">
                    1611B, 16/F<br />
                    HO KING COMMERCIAL CENTRE<br />
                    2-16 FA YUEN, STREET<br />
                    MONGKOK, KOWLOON
                  </p>
                  <p className="text-[#fbfbfb] font-onest mt-4">
                    T: +91-9987998037
                  </p>
                </div>
                
                {/* Taiyuan Office */}
                <div>
                  <h3 className="text-lg uppercase text-[#fbfbfb]/70 mb-4 font-onest">Taiyuan</h3>
                  <p className="text-[#fbfbfb] font-onest">
                    296, Beida Street<br />
                    Xinghualing District<br />
                    030009, Taiyuan<br />
                    China
                  </p>
                  <p className="text-[#fbfbfb] font-onest mt-4">
                    T: +91-2235112519
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Logos Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-16 pt-8 border-t border-[#fbfbfb]/10">
            {/* Left Side Logos - Custom logos */}
            <div className="flex flex-wrap items-center gap-8 mb-8 lg:mb-0">
              {/* Logo 1 */}
              <div className="h-12 w-auto">
                <Image 
                  src="https://usacamerica.us/website-file/all-img/logo.png" 
                  alt="Logo 1" 
                  width={100} 
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </div>
              
              {/* Logo 2 */}
              <div className="h-12 w-auto">
                <Image 
                  src="https://www.buafoodsplc.com/wp-content/uploads/2025/03/AQSR-LOGO.png" 
                  alt="Logo 2" 
                  width={100} 
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </div>
              
              {/* Logo 3 */}
              <div className="h-12 w-auto">
                <Image 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy1InRQG-B1jykQOW-rL94ujs9LD2q07ryXQ&s" 
                  alt="Logo 3" 
                  width={100} 
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            
            {/* Right Side - Company Logo */}
            <div className="w-48 h-auto lg:w-64">
              <Image 
                src="/Images/iqLogo.png" 
                alt="IQ Group" 
                width={300} 
                height={100}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
          
          {/* Bottom Footer - Divider, LinkedIn, Terms, Copyright */}
          <div className="border-t border-[#fbfbfb]/10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* LinkedIn Button */}
              <div className="mb-4 md:mb-0">
                <a 
                  href="https://www.linkedin.com/company/iq-minerals-&-metals?trk=company_name" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block border border-[#fbfbfb]/30 p-3 hover:bg-[#fbfbfb]/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} className="text-[#fbfbfb]" />
                </a>
              </div>
              
              {/* Terms & Privacy Links */}
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <Link href="/terms" className="text-[#fbfbfb]/70 hover:text-[#fbfbfb] transition-colors font-onest">
                  Terms & Conditions
                </Link>
                <Link href="/privacy" className="text-[#fbfbfb]/70 hover:text-[#fbfbfb] transition-colors font-onest">
                  Privacy Policy
                </Link>
              </div>
              
              {/* Copyright */}
              <div className="text-[#fbfbfb]/70 font-onest">
                Copyright {new Date().getFullYear()} — IQ Group | Site by Show + Tell
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DTREStyleFooter; 