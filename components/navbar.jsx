'use client'
import React, { useState } from 'react';
import { Menu, X, ChevronLeft, ArrowLeft } from 'lucide-react';

const IQGroupNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuItems = [
    { title: 'Home', link: '/' },
    {
      title: 'About',
      submenu: [
        { title: 'Company Overview', link: '/about/overview' },
        { title: 'Leadership Team', link: '/about/leadership' },
        { title: 'Our History', link: '/about/history' },
        { title: 'Global Presence', link: '/about/presence' }
      ]
    },
    {
      title: 'Companies',
      submenu: [
        { title: 'IQ Ferro Alloys', link: '/companies/ferro-alloys' },
        { title: 'IQ Minerals & Metals', link: '/companies/minerals-metals' },
        { title: 'IQ Coke & Coal', link: '/companies/coke-coal' },
        { title: 'IQ Green Energy', link: '/companies/green-energy' },
        { title: 'IQ International Chemical Supply', link: '/companies/chemical-supply' },
        { title: 'IQ Noble Alloys', link: '/companies/noble-alloys' },
        { title: 'IQ Angel Investments', link: '/companies/angel-investments' },
        { title: 'DAB Worldwide', link: '/companies/dab-worldwide' }
      ]
    },
    {
      title: 'Industries',
      submenu: [
        { title: 'Steel Industries', link: '/industries/steel' },
        { title: 'Foundries', link: '/industries/foundries' },
        { title: 'Refractory', link: '/industries/refractory' },
        { title: 'Chemical', link: '/industries/chemical' },
        { title: 'Ceramic', link: '/industries/ceramic' },
        { title: 'Paints', link: '/industries/paints' },
        { title: 'Tyres', link: '/industries/tyres' },
        { title: 'Aerospace', link: '/industries/aerospace' },
        { title: 'Glass', link: '/industries/glass' },
        { title: 'Automobile', link: '/industries/automobile' },
        { title: 'Textile', link: '/industries/textile' },
        { title: 'Battery Industries', link: '/industries/battery' }
      ]
    },
    {
      title: 'Quality & Certs',
      submenu: [
        { title: 'Quality Policy', link: '/quality/policy' },
        { title: 'Certifications', link: '/quality/certifications' },
        { title: 'Testing Procedures', link: '/quality/testing' },
        { title: 'Quality Assurance', link: '/quality/assurance' }
      ]
    },
    { title: 'Resources', link: '/resources' },
    {
      title: 'Careers',
      submenu: [
        { title: 'Open Positions', link: '/careers/positions' },
        { title: 'Why Join Us', link: '/careers/why-join' },
        { title: 'Life at IQ Group', link: '/careers/life' },
        { title: 'Application Portal', link: '/careers/apply' }
      ]
    },
    {
      title: 'CSR',
      submenu: [
        { title: 'Overview', link: '/csr/overview' },
        { title: 'Initiatives', link: '/csr/initiatives' },
        { title: 'Foundation Link', link: '/csr/foundation' }
      ]
    }
  ];

  const handleMenuItemClick = (item) => {
    if (item.submenu) {
      setActiveSubmenu({ title: item.title, items: item.submenu });
    } else {
      // Navigate to the link
      console.log('Navigate to:', item.link);
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    }
  };

  const handleBackClick = () => {
    setActiveSubmenu(null);
  };

  const handleSubmenuItemClick = (item) => {
    console.log('Navigate to:', item.link);
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setActiveSubmenu(null);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#203663] text-white px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-sm rounded">
            IQ
          </div>
          <span className="text-xl font-bold tracking-wide">IQ GROUP</span>
        </div>

        {/* Right Side - Contact Us and Menu */}
        <div className="flex items-center space-x-6">
          <button 
            className="text-white hover:text-gray-300 transition-colors text-sm font-medium tracking-wide hidden sm:block"
            onClick={() => console.log('Navigate to contact')}
          >
            CONTACT US
          </button>
          <button
            onClick={toggleMenu}
            className="w-6 h-6 flex flex-col justify-center items-center hover:opacity-75 transition-opacity"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Sidebar Menu Container */}
      <div className={`fixed top-0 right-0 z-40 h-full transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Main Menu - Always positioned and pinned */}
        <div className="bg-[#203663] text-white w-80 h-full">
          {/* Header with Main Menu button */}
          <div className="flex items-center justify-between p-6 border-b border-blue-400">
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleMenu}
                className="text-white hover:text-gray-300 transition-colors text-sm font-medium tracking-wider"
              >
                MAIN MENU
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-5 h-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="21 21l-4.35-4.35"/>
                </svg>
              </div>
              <button onClick={toggleMenu}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-8">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => handleMenuItemClick(item)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-blue-600 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    {item.submenu && (
                      <ChevronLeft 
                        size={20} 
                        className="opacity-60 group-hover:opacity-100 transition-opacity" 
                      />
                    )}
                    <span className="text-2xl font-light">{item.title}</span>
                  </div>
                </button>
                {index < menuItems.length - 1 && (
                  <hr className="border-blue-400 mx-6" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submenu - Slides over the main menu from right to left */}
        {activeSubmenu && (
          <div className={`absolute top-0 left-0 bg-[#203663] text-white w-80 h-full transition-transform duration-300 ease-in-out ${
            activeSubmenu ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {/* Back Header */}
            <div className="flex items-center justify-between p-6 border-b border-blue-400">
              <button 
                onClick={handleBackClick}
                className="flex items-center space-x-3 hover:opacity-75 transition-opacity"
              >
                <ArrowLeft size={20} />
                <span className="text-lg font-light">{activeSubmenu.title}</span>
              </button>
              {/* Go Back Button */}
              <button 
                onClick={handleBackClick}
                className="text-white hover:text-gray-300 transition-colors text-sm font-medium tracking-wider"
              >
                GO BACK
              </button>
            </div>

            {/* Submenu Items - Scrollable */}
            <div className="py-8 overflow-y-auto bg-[#203663] h-[calc(100vh-140px)]">
              {activeSubmenu.items.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleSubmenuItemClick(item)}
                    className="w-full px-6 py-4  text-left hover:bg-blue-600 transition-colors"
                  >
                    <span className="text-xl font-light">{item.title}</span>
                  </button>
                  {index < activeSubmenu.items.length - 1 && (
                    <hr className="border-blue-400 mx-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Demo Content */}
      
    </>
  );
};

export default IQGroupNavbar;