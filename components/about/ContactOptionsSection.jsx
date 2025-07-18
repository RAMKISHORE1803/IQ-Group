import React from 'react';
import Link from 'next/link';

const ContactOptionsSection = () => {
  return (
    <div className="bg-[#fbfbfb] py-8 md:py-10 lg:min-h-[30vh] -mt-2 relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          {/* Careers Option */}
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="relative w-[86px] h-[86px] flex-shrink-0">
              <svg width="86" height="86" viewBox="0 0 86 86" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(1 1)" fill="none" fillRule="evenodd">
                  <circle stroke="#203663" strokeWidth="1.5" cx="42.5" cy="42.5" r="42.5"></circle>
                  <path d="M56.073 34.154h-5.762v-1.972a2.648 2.648 0 00-2.645-2.644H38.41a2.648 2.648 0 00-2.645 2.644v1.972h-5.762a2.919 2.919 0 00-2.916 2.916v17.635a2.919 2.919 0 002.916 2.916h26.07a2.919 2.919 0 002.916-2.916V37.07a2.919 2.919 0 00-2.916-2.916zm-18.85-1.972c0-.654.533-1.186 1.187-1.186h9.255c.654 0 1.187.531 1.187 1.186v1.972H37.223v-1.972zm-7.22 3.43h26.07a1.46 1.46 0 011.458 1.458v1.904c-.583.785-3.001 3.892-5.422 4.81-1.724.654-3.422.962-4.324 1.091a2.91 2.91 0 00-2.787-2.109h-3.919a2.91 2.91 0 00-2.788 2.11c-.9-.13-2.598-.438-4.323-1.091-2.415-.917-4.84-4.026-5.423-4.81V37.07a1.46 1.46 0 011.458-1.458zm16.453 10.071v.41a1.46 1.46 0 01-1.458 1.459h-3.919a1.46 1.46 0 01-1.458-1.458v-.41a1.46 1.46 0 011.458-1.459h3.919a1.46 1.46 0 011.458 1.458zm9.617 10.481h-26.07a1.46 1.46 0 01-1.458-1.458V41.292c1.175 1.347 2.992 3.13 4.905 3.855 1.935.735 3.792 1.058 4.737 1.187a2.91 2.91 0 002.891 2.675h3.919a2.91 2.91 0 002.892-2.675c.944-.129 2.801-.452 4.736-1.187 1.913-.725 3.73-2.508 4.906-3.855v13.413a1.46 1.46 0 01-1.458 1.459z" fill="#000" fillRule="nonzero"></path>
                </g>
              </svg>
            </div>
            <div>
              <p className="text-xl md:text-[22px] font-bold text-[#203663] font-lato">
                If you are interested in applying for a position, visit our <Link href="/careers" className="text-gray-800 underline hover:text-gray-600 font-light font-onest transition-colors">careers</Link> section
              </p>
            </div>
          </div>

          {/* Divider for desktop */}
          <div className="hidden md:block h-24 w-px bg-gray-300"></div>

          {/* Contact Form Option */}
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="relative w-[86px] h-[86px] flex-shrink-0">
              <svg width="86" height="86" viewBox="0 0 86 86" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(1 1)" fill="none" fillRule="evenodd">
                  <circle stroke="#203663" strokeWidth="1.5" cx="42.5" cy="42.5" r="42.5"></circle>
                  <g fill="#203663" fillRule="nonzero">
                    <path d="M52.9 58.163H31.59a3.284 3.284 0 01-3.28-3.28V33.57c0-1.809 1.47-3.28 3.28-3.28h13.104v1.312H31.59a1.97 1.97 0 00-1.969 1.968v21.312a1.97 1.97 0 001.969 1.968H52.9a1.97 1.97 0 001.968-1.968V39.035h1.313v15.848a3.285 3.285 0 01-3.281 3.28z"></path>
                    <path d="M36.083 50.218a.656.656 0 01-.621-.868l2.712-7.956a.657.657 0 01.157-.252l14.17-14.169a2.606 2.606 0 011.854-.768c.7 0 1.36.273 1.855.768l2.46 2.461a2.626 2.626 0 010 3.71L44.503 47.313a.654.654 0 01-.252.157l-7.956 2.713a.652.652 0 01-.211.035zm3.284-8.256l-2.232 6.547 6.548-2.232 14.06-14.061c.511-.511.511-1.343 0-1.854l-2.46-2.461c-.496-.495-1.36-.495-1.855 0l-14.06 14.06z"></path>
                    <path d="M39.259 41.141l5.243 5.244-.928.927-5.243-5.243z"></path>
                    <path d="M52.247 28.154l5.243 5.243-.928.928-5.243-5.243z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div>
              <p className="text-xl md:text-[22px] font-bold text-[#203663] font-lato">
                For a specific request, please fill in our <Link href="/contact/#form" className="text-gray-800 underline hover:text-gray-600 font-light font-onest transition-colors">contact form</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactOptionsSection; 