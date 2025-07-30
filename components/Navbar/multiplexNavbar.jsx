'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const MultiplexNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState('/'); // Simulate current page

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if navbar should have background
      setIsScrolled(currentScrollY > 50);
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock/unlock body scroll when mobile menu is open/closed
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Lock the body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when mobile menu is closed
      document.body.style.overflow = '';
    }
    
    // Cleanup function to ensure body scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle dropdown toggle
  const toggleDropdown = (itemName) => {
    // If clicking on the active dropdown, close it
    if (activeDropdown === itemName) {
      setActiveDropdown(null);
    } else {
      // Otherwise, set the new active dropdown (closing any previously open one)
      setActiveDropdown(itemName);
    }
  };

  // Handle hover for desktop view
  const handleMouseEnter = (itemName) => {
    // Only handle hover if it's desktop view (screen width check can be added if needed)
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    // Close dropdown when mouse leaves
    setActiveDropdown(null);
  };

  // Check if current page matches nav item
  const isActivePage = (itemPath) => {
    if (itemPath === '/') return currentPage === '/';
    return currentPage.startsWith(itemPath);
  };

  // Main navigation items
  const mainNavItems = [
    {
      name: 'About',
      path: '/about',
      megaMenu: 'about',
      dropdown: [
        {name: 'Overview', path: '/about'},
        { name: 'What We Do', path: '/about#what-we-do' },
        { name: 'How We Do', path: '/about#how-we-do' },
        { name: 'Our Values', path: '/about#our-values' },
        { name: 'Leadership Team', path: '/about#leadership' },
        { name: 'Global Presence', path: '/about#office-locations' }
      ]
    },
    {
      name: 'Companies',
      path: '/companies',
      megaMenu: 'companies',
      dropdown: [
        {name: 'Overview', path: '/companies'},
        { name: 'IQ Minerals & Metals', path: '/companies/minerals-metals' },
        { name: 'IQ Ferro Alloys', path: '/companies/ferro-alloys' },
        { name: 'IQ Noble Alloys', path: '/companies/noble-alloys' },
        { name: 'IQ Coke & Coal', path: '/companies/coke-coal' },
        { name: 'IQ International', path: '/companies/international' },
        { name: 'IQ Angel Investment', path: '/companies/angel-investments' },
        { name: 'IQ Green Energy', path: '/companies/green-energy' }
      ]
    },
    {
      name: 'Industries',
      path: '/industries',
      megaMenu: 'industries',
      dropdown: [
        {name: 'Overview', path: '/industries'},
        { name: 'Steel Industries', path: '/industries/steel' },
        { name: 'Foundries', path: '/industries/foundries' },
        { name: 'Refractory', path: '/industries/refractory' },
        { name: 'Chemical', path: '/industries/chemical' },
        { name: 'Ceramic', path: '/industries/ceramic' },
        { name: 'Paints', path: '/industries/paints' },
        { name: 'Tyres', path: '/industries/tyres' },
        { name: 'Aerospace', path: '/industries/aerospace' },
        { name: 'Glass', path: '/industries/glass' },
        { name: 'Automobile', path: '/industries/automobile' },
        { name: 'Textile', path: '/industries/textile' },
        { name: 'Battery Industries', path: '/industries/battery' },
        { name: 'Stainless Steel', path: '/industries/stainless-steel' },
        { name: 'Aluminum', path: '/industries/aluminum' },
        { name: 'Paper', path: '/industries/paper' }
      ]
    },
    {
      name: 'Quality & Insights',
      path: '/quality-insights',
      megaMenu: 'quality',
      dropdown: [
        {name: 'Overview', path: '/quality-insights'},
        { name: 'Quality Policy', path: '/quality-insights#quality-policy' },
        { name: 'Certifications', path: '/quality-insights#certifications' }
      ]
    }
  ];

  const rightNavItems = [
    {
      name: 'Careers',
      path: '/careers',
      megaMenu: 'careers',
      dropdown: [
        {name: 'Overview', path: '/careers'},
        { name: 'Life at IQ Group', path: '/careers/life' },
        { name: 'Why Join Us', path: '/careers/why-join' },
        { name: 'Open Positions', path: '/careers/positions' },
        { name: 'Application Portal', path: '/careers/apply' }
      ]
    },
    {
      name: 'CSR',
      path: 'https://www.jkbfoundation.com/',
    }
  ];

  // Resources for the top banner
  const resourcesItem = {
    name: 'Resources',
    path: '/resources',
    megaMenu: 'resources',
    dropdown: [
      {name: 'Overview', path: '/resources'},
      { name: 'Insights', path: '/resources#INSIGHTS' },
      { name: 'News', path: '/resources#news' },
    ]
  };

  // All navigation items for mobile sidebar
  const allNavItems = [
    ...mainNavItems,
    ...rightNavItems,
    resourcesItem
  ];

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -150,
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0)'
        }}
        transition={{ 
          duration: 0.3,
          ease: 'easeInOut'
        }}
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6 overflow-y-auto overflow-y-hidden"
        style={{
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        }}
      >
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className='lg:pl-[4vw]'
          >
            <Link href="/">
            <Image src="/logo/2.png" alt="logo" width={100} height={100} />
            </Link>
            
          </motion.div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-8">
            {/* Global Button */}
           
            {/* Contact Button */}
            <Link href="/contact" className='hidden md:flex'>
            <motion.button
              
              whileTap={{ scale: 0.95 }}
              className="text-white text-sm font-medium border-1 border-white  px-4 py-2 tracking-wider hover:text-gray-300 transition-colors duration-200 cursor-pointer"
            >
                <motion.span whileHover={{ scale: 1.05 }}>
              CONTACT
              </motion.span>
            </motion.button>
            </Link>
            {/* Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center space-x-3 text-white text-sm font-medium tracking-wider hover:text-gray-300 transition-colors duration-200 cursor-pointer"
            >
              <Menu size={24} />
              <span className="hidden sm:block">MENU</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white/40 z-[90]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'tween',
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="fixed top-0 right-0 h-full w-full max-w-md lg:max-w-[590px] bg-[#000000] z-[100] overflow-hidden"
            >
              <div className="px-8 py-6 min-h-full overflow-hidden flex flex-col">
                {/* Header with Close Button positioned at top right */}
                <div className="flex items-center justify-between mb-8">
                  <div></div> {/* Empty div for spacing */}
                  <motion.button
                   
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 p-2 rounded-full text-white hover:text-gray-300 transition-all duration-300 cursor-pointer"
                  >
                    <Link href="/contact">
            <motion.button
              
              whileTap={{ scale: 0.95 }}
              className="text-white text-sm font-medium border-1 border-white  px-4 py-2 tracking-wider hover:text-gray-300 transition-colors duration-200 cursor-pointer"
            >
                <motion.span whileHover={{ scale: 1.05 }}>
              CONTACT
              </motion.span>
            </motion.button>
            </Link>
                    <X size={24} className='hover:rotate-90 transition-all duration-300' />
                    
                  </motion.button>
                </div>

                {/* Navigation Items - Limited to 85vh for more accordion space */}
                <div className='min-w-[300px] lg:max-w-[584px] mx-auto overflow-hidden'>
                <nav className="space-y-0 flex-1 flex flex-col lg:min-w-[492px] overflow-hidden scrollbar-hide" style={{ maxHeight: '85vh', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {allNavItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.08,
                        duration: 0.4,
                        ease: 'easeOut'
                      }}
                      className="border-b border-gray-800"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <motion.div
                        whileHover={{ 
                          x: 8,
                          backgroundColor: 'rgba(255, 255, 255, 0.02)'
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex items-center justify-between pb-4 pt-2 px-2 cursor-pointer rounded-lg"
                        onClick={() => {
                          if (item.dropdown && item.dropdown.length > 0) {
                            toggleDropdown(item.name);
                          } else {
                            // Navigate to page for items without dropdown
                            if (item.path.startsWith('http')) {
                              window.open(item.path, '_blank');
                            } else {
                              setCurrentPage(item.path);
                              window.location.href = item.path;
                            }
                          }
                        }}
                      >
                        <span className={` font-light text-[30px] lg:text-[32px] font-bold font-lato transition-all duration-300 ${
                          isActivePage(item.path) 
                            ? 'text-blue-400' 
                            : 'text-white hover:text-gray-300'
                        }`}>
                          {item.name}
                        </span>
                        {item.dropdown && item.dropdown.length > 0 && (
                          <motion.div
                            animate={{ 
                              rotate: activeDropdown === item.name ? 180 : 0 
                            }}
                            transition={{ duration: 0.3 }}
                            className="cursor-pointer"
                          >
                            <ChevronDown size={20} className="text-gray-400 hover:text-white transition-colors duration-200" />
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Dropdown Items */}
                      <AnimatePresence>
                        {item.dropdown && item.dropdown.length > 0 && activeDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className=" overflow-hidden "
                          >
                            <div className="py-3 pl-8 pr-4  space-y-1">
                              {item.dropdown.map((subItem, subIndex) => (
                                <motion.a
                                  key={subItem.name}
                                  href={subItem.path}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ 
                                    delay: subIndex * 0.05,
                                    duration: 0.3,
                                    ease: 'easeOut'
                                  }}
                                  whileHover={{ 
                                    x: 6,
                                    scale: 1.02,
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                  }}
                                  className={`block text-base transition-all text-[22px] duration-300 cursor-pointer py-2 px-4 rounded-md ${
                                    isActivePage(subItem.path)
                                      ? 'text-blue-400'
                                      : 'text-gray-300 hover:text-white'
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(subItem.path);
                                    window.location.href = subItem.path;
                                  }}
                                >
                                  {subItem.name}
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </nav>
                </div>

                {/* Bottom Section - Fixed at bottom with smaller spacing */}
                <div className="mt-auto pt-4 pb-6">
                  <div className="text-center space-y-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      className="text-gray-400 text-xs font-onest font-bold pt-[10px] tracking-[1px] font-light"
                    >
                      CONNECT WITH US
                    </motion.div>
                    
                    {/* Social Links with Enhanced Animations */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      className="flex justify-center space-x-5"
                    >
                      <motion.a
                        href="https://www.linkedin.com/company/iq-minerals-&-metals?trk=company_name"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ 
                          scale: 1.15,
                          rotate: 5,
                          backgroundColor: 'rgba(0, 119, 181, 0.2)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="text-white hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                      >
                        <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-400/20">
                          <span className="text-xs font-medium">in</span>
                        </div>
                      </motion.a>
                      
                      <motion.a
                        href="https://x.com/IQGroupMumbai"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ 
                          scale: 1.15,
                          rotate: -5,
                          backgroundColor: 'rgba(29, 161, 242, 0.2)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="text-white hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                      >
                        <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-400/20">
                          <span className="text-xs font-medium">X</span>
                        </div>
                      </motion.a>

                      <motion.a
                        href="https://www.facebook.com/iqgroupmumbai"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ 
                          scale: 1.15,
                          rotate: 5,
                          backgroundColor: 'rgba(24, 119, 242, 0.2)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="text-white hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                      >
                        <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-400/20">
                          <span className="text-xs font-medium">f</span>
                        </div>
                      </motion.a>
                    </motion.div>

                    {/* Additional Contact Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.4 }}
                      className="text-gray-500 text-xs tracking-wider"
                    >
                      © 2024 IQ Group. All rights reserved.
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      
    </>
  );
};

export default MultiplexNavbar;

// Add a style tag at the end of the file
const styles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

if (typeof document !== 'undefined') {
  // Only run in browser environment
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}