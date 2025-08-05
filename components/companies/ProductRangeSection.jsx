'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable ProductRangeSection component for company pages
 * 
 * @param {Object} props
 * @param {string} props.id - Section ID for anchor links
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {Array} props.products - Array of product objects with {title, description, image}
 * @param {string} props.background - Background color (default: 'white')
 * @param {string} props.sectionNumber - Optional section number (e.g., "03")
 * @param {string} props.sectionTitle - Optional section title for the section number (e.g., "IN THIS SECTION")
 */
const ProductRangeSection = ({
  id,
  title,
  subtitle,
  products,
  background = 'white',
  sectionNumber,
  sectionTitle = 'IN THIS SECTION'
}) => {
  // State for selected product
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for scroll container and animation
  const sectionRef = useRef(null);
  const rightPaneRef = useRef(null);
  const imageContainerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const numberRef = useRef(null);
  const sectionTitleRef = useRef(null);
  const productsGridRef = useRef(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Animation setup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const section = sectionRef.current;
    if (!section) return;
    
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Animate section number and title if they exist
    if (numberRef.current) {
      tl.fromTo(
        numberRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
    
    if (sectionTitleRef.current) {
      tl.fromTo(
        sectionTitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }
    
    // Animate main title
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }
    
    // Animate subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }
    
    // Animate products grid
    if (productsGridRef.current) {
      tl.fromTo(
        productsGridRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );
    }
    
    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [sectionNumber, title, subtitle]);

  // Effect for image transition
  useEffect(() => {
    if (!imageContainerRef.current) return;
    
    gsap.fromTo(
      imageContainerRef.current,
      { opacity: 0.5, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [selectedProduct]);
  
  // Generate placeholder background based on product title
  const getBackgroundColor = (title) => {
    // Simple hash function to generate a color based on the title
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate a dark blue to light blue hue variation
    const h = 220; // Blue hue
    const s = 70 + (hash % 20); // Saturation 70-90%
    const l = 25 + (hash % 20); // Lightness 25-45%
    
    return `hsl(${h}, ${s}%, ${l}%)`;
  };
  
  // Determine background color class
  const bgClass = background === 'gray' ? 'bg-gray-50' : 'bg-white';
  
  // Product Card Component with hover effect
  const ProductCard = ({ product }) => (
    <motion.div
      ref={imageContainerRef}
      className="relative h-96 bg-cover bg-center bg-no-repeat overflow-hidden group cursor-pointer flex-shrink-0 "
      style={{ 
        backgroundImage: product.image ? `url(${product.image})` : 'none',
       
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-20" />
      
      {/* Category Label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black bg-opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          MATERIAL
        </span>
      </div>
      
      {/* Floating Glassy overlay - small at bottom, full card on hover */}
      <motion.div
        className="absolute bg-white/70 bg-opacity-40 backdrop-blur-md rounded-lg overflow-hidden"
        initial={{ 
          bottom: "16px",
          left: "16px",
          right: "16px",
          top: "auto",
          height: "120px"
        }}
        whileHover={{ 
          top: "0px",
          bottom: "0px",
          left: "0px",
          right: "0px",
          height: "100%",
          borderRadius: "0px",
          zIndex: 50,
          opacity: 1
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0, 0.2, 1],
          type: "tween"
        }}
      >
        {/* Default content - always visible */}
        <div className="relative z-10 p-4">
          <p className="text-xs text-gray-600 font-medium mb-1">
            PRODUCT DETAILS
          </p>
          <h3 className="font-lato font-light text-[30px] line-clamp-2 group-hover:line-clamp-none text-ellipsis overflow-hidden text-black leading-tight transition-all duration-300">
            {product.title}
          </h3>
        </div>
        
        {/* Expanded content - only visible on hover for desktop */}
        <div className="px-4 pb-4 opacity-0 group-hover:opacity-100">
          <div className="text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4">
            <p className="mt-2">{product.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
  
  // Desktop layout with fixed image pane
  const DesktopLayout = () => (
    <div className="flex ">
      {/* Left pane (75% width) - Scrollable product grid */}
      <div className="w-3/4 pr-8">
        <div ref={productsGridRef} className="grid grid-cols-3 gap-4 font-onest font-light justify-center">
          {products.map((product, index) => (
            <div
              key={index}
              className={`p-4 cursor-pointer transition-colors duration-200 lg:mb-4  ${
                selectedProduct.title === product.title
                  ? 'bg-[#203663] text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <h3 className=" font-onest font-regular   text-[18px]"> <span className='text-[#203663] font-medium'>{index + 1}.</span> {product.title}</h3>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right pane (25% width) - Fixed image */}
      <div className="w-1/4 relative lg:mt-[-80px]" ref={rightPaneRef}>
        <div className="sticky top-1/4">
          <ProductCard product={selectedProduct} />
          {/* <p className="mt-4 text-sm text-gray-600">{selectedProduct.description}</p> */}
        </div>
      </div>
    </div>
  );
  
  // Toggle expanded product in mobile view
  const toggleExpandedProduct = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };
  
  // Mobile layout with stacked items
  const MobileLayout = () => (
    <div className="space-y-6">
      {products.map((product, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="p-4 cursor-pointer bg-gray-50 flex justify-between items-center"
            onClick={() => toggleExpandedProduct(index)}
          >
            <h3 className="font-semibold text-[#203663]">{product.title}</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${
                expandedProductId === index ? 'transform rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          
          {/* Collapsible content */}
          {expandedProductId === index && (
            <div className="p-4 border-t border-gray-200">
              <div className="mb-4 h-48 overflow-hidden rounded-lg">
                <ProductCard product={product} />
              </div>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
  
  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-16 md:py-24 px-4 md:px-8 lg:px-24 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          {sectionNumber && (
            <div className="mb-8">
              <p ref={sectionTitleRef} className="text-sm uppercase tracking-wider font-lato  text-gray-500 mb-2">{sectionTitle}</p>
              <span ref={numberRef} className="text-4xl font-bold font-lato text-[#203663]">{sectionNumber}</span>
            </div>
          )}
          <h2 ref={titleRef} className="text-3xl uppercase md:text-4xl font-bold font-lato text-[#203663] mb-6">{title}</h2>
          {subtitle && (
            <p ref={subtitleRef} className="text-xl text-gray-700 font-lato">{subtitle}</p>
          )}
        </div>
        
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </section>
  );
};

export default ProductRangeSection;