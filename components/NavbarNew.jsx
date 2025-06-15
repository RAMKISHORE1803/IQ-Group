'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import NavDropdown from './ui/NavDropdown';

const NavbarNew = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
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
  const navItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About',
      path: '/about',
      megaMenu: 'about',
      dropdown: [
        { name: 'Company Overview', path: '/about/overview' },
        { name: 'Leadership Team', path: '/about/leadership' },
        { name: 'Our History', path: '/about/history' },
        { name: 'Global Presence', path: '/about/presence' }
      ]
    },
    {
      name: 'Companies',
      path: '/companies',
      megaMenu: 'companies',
      dropdown: [
        { name: 'IQ Ferro Alloys', path: '/companies/ferro-alloys' },
        { name: 'IQ Minerals & Metals', path: '/companies/minerals-metals' },
        { name: 'IQ Coke & Coal', path: '/companies/coke-coal' },
        { name: 'IQ Green Energy', path: '/companies/green-energy' },
        { name: 'IQ International Chemical Supply', path: '/companies/chemical-supply' },
        { name: 'IQ Noble Alloys', path: '/companies/noble-alloys' },
        { name: 'IQ Angel Investments', path: '/companies/angel-investments' },
        { name: 'DAB Worldwide', path: '/companies/dab-worldwide' }
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
      name: 'Quality & Certs',
      path: '/quality',
      megaMenu: 'quality',
      dropdown: [
        { name: 'Quality Policy', path: '/quality/policy' },
        { name: 'Certifications', path: '/quality/certifications' },
        { name: 'Testing Procedures', path: '/quality/testing' },
        { name: 'Quality Assurance', path: '/quality/assurance' }
      ]
    },
    {
      name: 'Resources',
      path: '/resources',
      megaMenu: 'resources',
      dropdown: [
        { name: 'Articles', path: '/resources/articles' },
        { name: 'Insights', path: '/resources/insights' },
        { name: 'Perspectives', path: '/resources/perspectives' },
        { name: 'Analysis', path: '/resources/analysis' }
      ]
    },
    {
      name: 'Careers',
      path: '/careers',
      megaMenu: 'careers',
      dropdown: [
        { name: 'Open Positions', path: '/careers/positions' },
        { name: 'Why Join Us', path: '/careers/why-join' },
        { name: 'Life at IQ Group', path: '/careers/life' },
        { name: 'Application Portal', path: '/careers/apply' }
      ]
    },
    {
      name: 'CSR',
      path: '/csr',
      megaMenu: 'csr',
      dropdown: [
        { name: 'Overview', path: '/csr/overview' },
        { name: 'Initiatives', path: '/csr/initiatives' },
        { name: 'Foundation', path: '/csr/foundation' }
      ]
    }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
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
    const item = navItems.find(item => item.megaMenu === section);
    return item && item.dropdown && item.dropdown.length > 8;
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || hoveredItem
          ? 'bg-[#203663] shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white text-[#203663] flex items-center justify-center font-bold text-lg rounded">
                IQ
              </div>
              <span className="text-xl font-bold tracking-wide text-white">IQ GROUP</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-4">
            <ul className="flex space-x-6">
              {navItems.map((item, index) => (
                <li 
                  key={index} 
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center">
                    <Link 
                      href={item.path}
                      className={`uppercase text-sm font-medium tracking-wide text-white py-2 border-b-2 ${
                        hoveredItem === item.megaMenu ? 'border-white' : 'border-transparent hover:border-white'
                      }`}
                    >
                      {item.name}
                      {item.dropdown && (
                        <ChevronDown 
                          size={14} 
                          className={`ml-1 inline-block transition-transform duration-300 ${
                            hoveredItem === item.megaMenu ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="uppercase text-sm font-medium tracking-wide text-white py-2 border-b-2 border-transparent hover:border-white"
            >
              CONTACT US
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white"
              aria-label="Toggle mobile menu"
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
          className={`absolute left-0 right-0 top-full bg-white shadow-lg z-50 transition-all duration-300 transform origin-top ${
            isDropdownVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Left Column - Title and Description */}
              <div className="md:col-span-1">
                <h2 className="text-[#203663] text-3xl font-bold mb-4">
                  {navItems.find(item => item.megaMenu === hoveredItem)?.name}
                </h2>
                {!hasManyItems(hoveredItem) && (
                  <p className="text-gray-600 mb-6">
                    {getDescriptionForSection(hoveredItem)}
                  </p>
                )}
                <Link 
                  href={navItems.find(item => item.megaMenu === hoveredItem)?.path || '/'}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
                >
                  <span className="bg-blue-100 p-3 rounded mr-3 group-hover:bg-blue-200 transition-colors">
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
              <div className={`md:col-span-3 grid grid-cols-1 ${
                hasManyItems(hoveredItem) 
                  ? 'md:grid-cols-3 gap-3' 
                  : 'md:grid-cols-2 gap-5'
              }`}>
                {navItems.find(item => item.megaMenu === hoveredItem)?.dropdown.map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.path}
                    className="block group"
                  >
                    <div className={`bg-blue-50 rounded-md transition-all duration-300 hover:shadow-md ${
                      hasManyItems(hoveredItem) ? 'p-4' : 'p-6'
                    }`}>
                      <div className="flex justify-between items-start">
                        <h3 className={`font-semibold text-[#203663] ${
                          hasManyItems(hoveredItem) ? 'text-base' : 'text-lg mb-2'
                        }`}>
                          {item.name}
                        </h3>
                        <div className="text-[#203663]">
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
                          {getItemDescription(hoveredItem, item.name)}
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
          <nav className="relative h-full w-80 max-w-[80%] bg-[#203663] p-6 overflow-y-auto float-right">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white text-[#203663] flex items-center justify-center font-bold text-sm rounded">
                  IQ
                </div>
                <span className="text-lg font-bold tracking-wide text-white">IQ GROUP</span>
              </div>
              <button onClick={toggleMobileMenu} className="text-white">
                <X size={24} />
              </button>
            </div>
            
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index} className="py-2 border-b border-blue-400">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className="flex items-center justify-between w-full text-left text-white font-medium"
                      >
                        <span className="text-xl">{item.name}</span>
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform ${
                            activeDropdown === index ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </button>
                      
                      {activeDropdown === index && (
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
              <li className="py-2 border-b border-blue-400">
                <Link
                  href="/contact"
                  className="block text-white text-xl hover:opacity-80"
                  onClick={toggleMobileMenu}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

// Helper function to get descriptions for each section
function getDescriptionForSection(section) {
  switch (section) {
    case 'about':
      return 'Learn about our company history, leadership team, and our global presence as we continue to grow and innovate.';
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