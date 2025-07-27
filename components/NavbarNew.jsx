'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import NavDropdown from './ui/NavDropdown';

const NavbarNew = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle scroll effect for navbar background and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Update background based on scroll position
          if (currentScrollY > 10) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          
          // Hide/show based on scroll direction
          if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
            // Scrolling down & past threshold - hide navbar
            setIsVisible(false);
          } else {
            // Scrolling up or at top - show navbar
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current && 
        !navRef.current.contains(event.target) && 
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Navigation items with dropdowns based on IQ Group site (exact titles from iq-groups.vercel.app)
  // Split into main nav and right nav
  const mainNavItems = [
    {
      name: 'About',
      path: '/about',
      megaMenu: 'about',
      dropdown: [
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
        { name: 'Quality Policy', path: '/quality-insights#quality-policy' },
        { name: 'Certifications', path: '/quality-insights#certifications' },
        // { name: 'Testing Procedures', path: '/quality-insights/testing-procedures' },
        // { name: 'Quality Assurance', path: '/quality-insights/quality-assurance' }
      ]
    }
  ];

  const rightNavItems = [
    {
      name: 'Careers',
      path: '/careers',
      megaMenu: 'careers',
      dropdown: [
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
      
      { name: 'Insights', path: '/resources#INSIGHTS' },
      { name: 'News', path: '/resources#news' },
    ]
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  
  // Handle hover menu
  const handleMouseEnter = (item) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (item.megaMenu) {
      setHoveredItem(item.megaMenu);
      setIsDropdownVisible(true);
    }
  };
  
  const handleMouseLeave = () => {
    // Use timeout to prevent immediate closing
    timeoutRef.current = setTimeout(() => {
      closeDropdown();
    }, 100); // Small delay to allow moving to dropdown
  };
  
  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  
  const handleDropdownMouseLeave = () => {
    closeDropdown();
  };
  
  const closeDropdown = () => {
    setIsDropdownVisible(false);
    // Keep hoveredItem for a moment to allow animation
    setTimeout(() => {
      if (!isDropdownVisible) {
        setHoveredItem(null);
      }
    }, 300);
  };
  
  // Check if section has many items (for layout adjustment)
  const hasManyItems = (section) => {
    const allItems = [...mainNavItems, ...rightNavItems, resourcesItem];
    const item = allItems.find(item => item.megaMenu === section);
    return item && item.dropdown && item.dropdown.length > 8;
  };

  // All nav items for mobile menu
  const allNavItems = [...mainNavItems, ...rightNavItems];

  // Find hovered item's position for dropdown arrow alignment
  const getHoveredItemPosition = () => {
    const allItems = [...mainNavItems, ...rightNavItems];
    const item = allItems.find(item => item.megaMenu === hoveredItem);
    
    if (!item || !navRef.current) return 50;
    
    // Find the DOM element for the hovered item
    const navItems = navRef.current.querySelectorAll('.nav-item');
    let hoveredElement = null;
    
    navItems.forEach((navItem) => {
      if (navItem.dataset.megaMenu === item.megaMenu) {
        hoveredElement = navItem;
      }
    });
    
    if (!hoveredElement) return 50;
    
    // Calculate the center position of the hovered element
    const rect = hoveredElement.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    
    // Return position as percentage of navbar width
    return ((rect.left + rect.width / 2) - navRect.left) / navRect.width * 100;
  };

  // Add global styles for 3D animations
  const globalStyles = `
    .perspective-500 {
      perspective: 500px;
    }
    
    .transform-style-3d {
      transform-style: preserve-3d;
      transition: transform 0.5s;
    }
    
    .rotate-x-180 {
      transform: rotateX(180deg);
    }
    
    .backface-hidden {
      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .front-face {
      transform: rotateX(0deg);
      backface-visibility: hidden;
    }
    
    .back-face {
      transform: rotateX(180deg);
      backface-visibility: hidden;
    }
    
    @keyframes summersault {
      0% { transform: rotateX(0deg); }
      100% { transform: rotateX(360deg); }
    }
    
    .nav-item-text:hover {
      animation: summersault 0.6s ease forwards;
      animation-iteration-count: 1;
    }
    
    .dropdown-arrow {
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid white;
      position: absolute;
      top: -8px;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .dropdown-animation {
      animation: fadeIn 0.3s ease forwards;
    }
  `;

  return (
    <>
      {/* Top Banner for Resources - Fixed to top, hidden on mobile */}
      {!isMobile && (
        <div className="bg-[#0e3364] fixed top-0 w-full z-50 text-white text-center py-1 text-sm">
          <Link href={resourcesItem.path} className="hover:underline">
            Discover our Resources →
          </Link>
        </div>
      )}
      
      {/* Main Navbar */}
      <header
        ref={navRef}
        className={`fixed ${!isMobile ? 'top-[28px]' : 'top-[0px]'} left-0 w-full z-40 transition-all duration-300 min-h-[10vh] 
        ${isScrolled ? 'bg-[#fbfbfb] text-[#0e3364] shadow-md' : 'bg-transparent text-white'}
          ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}
        `}
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            {isScrolled ? (<Link href="/" className="flex items-center">
              <div className="flex items-center pt-[30px] md:pt-[0px]">
                <img
                  src="/logo/3.png"
                  alt="IQ Groups Logo"
                  width={60}
                  style={{
                    transform: 'scale(1.5)'
                  }}
                  height={60}
                  priority="true"
                />
              </div>
            </Link>) : (

            <Link href="/" className="flex items-center">
              <div className="flex items-center pt-[50px] md:pt-[0px] lg:mt-[30px]">
                <img
                  src="/logo/2.png"
                  alt="IQ Groups Logo"
                  width={100}
                  
                  height={100}
                  priority="true"
                />
              </div>
            </Link>)
            }

            {/* Desktop Navigation - Main Nav */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-4">
              <ul className="flex space-x-6">
                {mainNavItems.map((item, index) => (
                  <li 
                    key={index} 
                    className="relative group nav-item"
                    data-mega-menu={item.megaMenu}
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setIsDropdownVisible(false)}
                  >
                    <div className="flex items-center font-medium text-base">
                      <Link 
                        href={item.path}
                        className="tracking-wide py-2 group relative perspective-500"
                        aria-expanded={hoveredItem === item.megaMenu}
                      >
                        {/* 3D Animation Wrapper */}
                        <span className=" inline-block">
                          {item.name}
                        </span>
                        
                        {item.dropdown && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 inline-block transition-transform duration-300 ${
                              hoveredItem === item.megaMenu ? 'rotate-360' : ''
                            }`} 
                          />
                        )}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Navigation - Right Nav */}
            <div className="hidden lg:flex items-center space-x-6">
              {rightNavItems.map((item, index) => (
                <div 
                  key={index}
                  className="relative group nav-item"
                  data-mega-menu={item.megaMenu}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link 
                    href={item.path}
                    className="text-base font-medium tracking-wide  py-2 group relative perspective-500"
                    aria-expanded={hoveredItem === item.megaMenu}
                  >
                    {/* 3D Animation Wrapper */}
                    <span className=" inline-block">
                      {item.name}
                    </span>
                    
                    {item.dropdown && (
                      <ChevronDown 
                        size={14} 
                        className={`ml-1 inline-block transition-transform duration-300 ${
                          hoveredItem === item.megaMenu ? 'rotate-360' : ''
                        }`} 
                      />
                    )}
                  </Link>
                </div>
              ))}
              
              {/* Contact Button */}
              <Link
                href="/contact"
                className={`bg-transparent border ${isScrolled || hoveredItem ? 'border-[#0e3364] hover:bg-[#0e3364] hover:text-white' : 'border-white hover:bg-white hover:text-[#0e3364]'} px-4 py-1 text-sm font-medium transition-colors duration-300 rounded-none`}
                aria-label="Contact DTRE"
              >
                CONTACT
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 ${isScrolled || hoveredItem ? 'text-[#0e3364]' : 'text-white'}`}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mega Menu Dropdown */}
        {hoveredItem && (
          <div 
            ref={dropdownRef}
            className={`absolute left-0 right-0 top-full bg-white shadow-lg z-50 transition-all duration-300 transform origin-top rounded-b-lg ${
              isDropdownVisible 
                ? 'opacity-100 translate-y-0 dropdown-animation' 
                : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
            role="region"
            aria-label={`${[...mainNavItems, ...rightNavItems, resourcesItem].find(item => item.megaMenu === hoveredItem)?.name} dropdown menu`}
          >
            {/* Upward pointing arrow */}
            <div 
              className="dropdown-arrow-container absolute"
              style={{ 
                left: `${getHoveredItemPosition()}%`,
                transform: 'translateX(-50%)' 
              }}
            >
              <div className="dropdown-arrow"></div>
            </div>
            
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Left Column - Title and Description */}
                <div className="md:col-span-1">
                  <h2 className="text-[#0e3364] text-3xl font-bold uppercase font-lato mb-4">
                    {hoveredItem === 'research' ? 'Research & Insights' : [...mainNavItems, ...rightNavItems, resourcesItem].find(item => item.megaMenu === hoveredItem)?.name}
                  </h2>
                  {!hasManyItems(hoveredItem) && (
                    <p className="text-gray-600 mb-6">
                      {getDescriptionForSection(hoveredItem)}
                    </p>
                  )}
                  <Link 
                    href={[...mainNavItems, ...rightNavItems, resourcesItem].find(item => item.megaMenu === hoveredItem)?.path || '/'}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
                  >
                    <span className="bg-blue-100 p-3 rounded mr-3 group-hover:bg-blue-200 font-lato uppercase transition-colors">
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </span>
                    <span>View All</span>
                  </Link>
                </div>

                {/* Right Columns - Cards */}
                <div className={`md:col-span-3 grid grid-cols-1 font-lato ${
                  hasManyItems(hoveredItem) 
                    ? 'md:grid-cols-3 gap-3' 
                    : 'md:grid-cols-2 gap-5'
                }`}>
                  {[...mainNavItems, ...rightNavItems, resourcesItem].find(item => item.megaMenu === hoveredItem)?.dropdown.map((item, index) => (
                    <Link 
                      key={index} 
                      href={item.path}
                      className="block group"
                    >
                      <div onClick={() => setIsDropdownVisible(false)} className={`bg-[#f5f7fa] rounded-md transition-all duration-300 hover:shadow-md ${
                        hasManyItems(hoveredItem) ? 'p-4' : 'p-6'
                      }`}>
                        <div className="flex justify-between items-start">
                          <h3 className={`font-semibold text-[#0e3364] ${
                            hasManyItems(hoveredItem) ? 'text-base' : 'text-lg mb-2'
                          }`}>
                            {item.name}
                          </h3>
                          <div className="text-[#0e3364]">
                            <svg 
                              width={hasManyItems(hoveredItem) ? "16" : "20"}
                              height={hasManyItems(hoveredItem) ? "16" : "20"}
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </div>
                        </div>
                        {!hasManyItems(hoveredItem) && (
                          <p className="text-gray-600 text-sm">
                            {item.description || getItemDescription(hoveredItem, item.name)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black opacity-50" onClick={toggleMobileMenu}></div>
            <nav className="fixed inset-y-0 right-0 h-[100vh] w-80 max-w-[80%] bg-[#0e3364] p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold tracking-tight text-white">IQ Group</span>
                </div>
                <button onClick={toggleMobileMenu} className="text-white" aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
              
              <ul className="space-y-4">
                {/* Resources item at the top for mobile */}
                <li className="py-2 border-b border-blue-400">
                  {resourcesItem.dropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle('resources')}
                        className="flex items-center justify-between w-full text-left text-white font-medium"
                        aria-expanded={activeDropdown === 'resources'}
                      >
                        <span className="text-xl">{resourcesItem.name}</span>
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform ${
                            activeDropdown === 'resources' ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </button>
                      
                      {activeDropdown === 'resources' && (
                        <ul className="mt-3 space-y-2">
                          {resourcesItem.dropdown.map((dropdownItem, idx) => (
                            <li key={idx}>
                              <Link
                                href={dropdownItem.path}
                                className="block text-white opacity-80 hover:opacity-100 pl-4"
                                onClick={toggleMobileMenu}
                              >
                                {dropdownItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={resourcesItem.path}
                      className="block text-white text-xl hover:opacity-80"
                      onClick={toggleMobileMenu}
                    >
                      {resourcesItem.name}
                    </Link>
                  )}
                </li>

                {/* Main navigation items */}
                {mainNavItems.map((item, index) => (
                  <li key={index} className="py-2 border-b border-blue-400">
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.megaMenu)}
                          className="flex items-center justify-between w-full text-left text-white font-medium"
                          aria-expanded={activeDropdown === item.megaMenu}
                        >
                          <span className="text-xl">{item.name}</span>
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform ${
                              activeDropdown === item.megaMenu ? 'rotate-180' : 'rotate-0'
                            }`}
                          />
                        </button>
                        
                        {activeDropdown === item.megaMenu && (
                          <ul className="mt-3 space-y-2">
                            {item.dropdown.map((dropdownItem, idx) => (
                              <li key={idx}>
                                <Link
                                  href={dropdownItem.path}
                                  className="block text-white opacity-80 hover:opacity-100 pl-4"
                                  onClick={toggleMobileMenu}
                                >
                                  {dropdownItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.path}
                        className="block text-white text-xl hover:opacity-80"
                        onClick={toggleMobileMenu}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}

                {/* Right navigation items */}
                {rightNavItems.map((item, index) => (
                  <li key={index} className="py-2 border-b border-blue-400">
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.megaMenu)}
                          className="flex items-center justify-between w-full text-left text-white font-medium"
                          aria-expanded={activeDropdown === item.megaMenu}
                        >
                          <span className="text-xl">{item.name}</span>
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform ${
                              activeDropdown === item.megaMenu ? 'rotate-180' : 'rotate-0'
                            }`}
                          />
                        </button>
                        
                        {activeDropdown === item.megaMenu && (
                          <ul className="mt-3 space-y-2">
                            {item.dropdown.map((dropdownItem, idx) => (
                              <li key={idx}>
                                <Link
                                  href={dropdownItem.path}
                                  className="block text-white opacity-80 hover:opacity-100 pl-4"
                                  onClick={toggleMobileMenu}
                                >
                                  {dropdownItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.path}
                        className="block text-white text-xl hover:opacity-80"
                        onClick={toggleMobileMenu}
                        target={item.name === 'CSR' ? '_blank' : '_self'}
                        rel={item.name === 'CSR' ? 'noopener noreferrer' : ''}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}

                {/* Contact button */}
                <li className="py-2">
                  <Link
                    href="/contact"
                    className="block text-white text-xl hover:opacity-80"
                    onClick={toggleMobileMenu}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
      
      {/* Add a spacer to push content below the fixed navbar */}
      <div className={`${!isMobile ? 'h-[72px]' : 'h-[0px]'}`}></div>
      
      {/* Add global styles for 3D animations */}
      <style jsx global>{globalStyles}</style>
    </>
  );
};

// Helper function to get descriptions for each section
function getDescriptionForSection(section) {
  switch (section) {
    case 'services':
      return 'Comprehensive real estate services tailored to your specific needs across industrial, logistics, science, and technology sectors.';
    case 'research':
      return 'We surface and deliver verifiable long-term industry trends, as well as the granular, asset-by-asset understandings that unlock actionable recommendations for our clients.';
    case 'about':
      return 'Learn about what we do, our approach, core values, leadership team, and our global presence across key markets worldwide.';
    case 'companies':
      return 'Explore our diverse portfolio of specialized companies delivering excellence in materials, energy, and investments worldwide.';
    case 'industries':
      return 'Discover the wide range of industries we serve with high-quality materials and specialized solutions.';
    case 'quality':
      return 'Our commitment to quality is backed by rigorous standards, comprehensive certifications, and thorough testing procedures.';
    case 'resources':
      return 'Access our latest insights, articles, and analysis on industry trends, market developments, and strategic perspectives.';
    case 'careers':
      return 'Join our global team and discover exciting career opportunities in a dynamic and growing organization.';
    case 'csr':
      return 'Learn about our corporate social responsibility initiatives and our commitment to sustainable development.';
    case 'people':
      return 'Meet our leadership team and the talented professionals who drive our success across global markets.';
    default:
      return 'Explore our offerings and discover how we can help your business succeed.';
  }
}

// Helper function to get descriptions for specific items
function getItemDescription(section, itemName) {
  // Companies descriptions
  if (section === 'companies') {
    switch (itemName) {
      case 'IQ Ferro Alloys':
        return 'Premium ferro alloys for steel and foundry industries with consistent quality and reliable supply.';
      case 'IQ Minerals & Metals':
        return 'Comprehensive range of minerals and metals serving diverse industrial applications worldwide.';
      case 'IQ Coke & Coal':
        return 'High-quality metallurgical coke and coal products for industrial and energy applications.';
      case 'IQ Green Energy':
        return 'Sustainable energy solutions and materials supporting the global transition to cleaner technologies.';
      case 'IQ International Chemical Supply':
        return 'Supplying high-quality chemicals and raw materials to industries worldwide.';
      case 'IQ Noble Alloys':
        return 'Specialized noble and rare metal alloys for high-performance industrial applications.';
      case 'IQ Angel Investments':
        return 'Strategic investments in promising ventures with a focus on industrial innovation.';
      case 'DAB Worldwide':
        return 'Global logistics and distribution network ensuring timely delivery of materials worldwide.';
      default:
        return 'Explore our specialized division delivering excellence in global logistics and material supply.';
    }
  }
  
  // For other sections, provide generic descriptions
  return 'Click to learn more about our offerings and solutions in this area.';
}

export default NavbarNew;