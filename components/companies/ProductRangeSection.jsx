'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlareCard } from '@/components/ui/glare-card';

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
      <div className="w-1/4 relative" ref={rightPaneRef}>
        <div className="sticky top-1/4">
          <GlareCard className="flex items-center justify-center w-full h-auto aspect-square">
            <div 
              ref={imageContainerRef}
              className="w-full h-full flex items-center justify-center"
              style={{ 
                backgroundColor: selectedProduct.image ? 'transparent' : getBackgroundColor(selectedProduct.title) 
              }}
            >
              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="h-full w-full absolute inset-0 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.backgroundColor = getBackgroundColor(selectedProduct.title);
                    e.target.parentNode.innerHTML += `<div class="text-white text-center p-4"><h3 class="font-semibold">${selectedProduct.title}</h3></div>`;
                  }}
                />
              ) : (
                <div className="text-white text-center p-4">
                  <h3 className="font-semibold">{selectedProduct.title}</h3>
                </div>
              )}
            </div>
          </GlareCard>
          <p className="mt-4 text-sm text-gray-600">{selectedProduct.description}</p>
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
              <GlareCard className="flex items-center justify-center w-full h-auto aspect-video mb-4">
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: product.image ? 'transparent' : getBackgroundColor(product.title) 
                  }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full absolute inset-0 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.backgroundColor = getBackgroundColor(product.title);
                        e.target.parentNode.innerHTML += `<div class="text-white text-center p-4"><h3 class="font-semibold">${product.title}</h3></div>`;
                      }}
                    />
                  ) : (
                    <div className="text-white text-center p-4">
                      <h3 className="font-semibold">{product.title}</h3>
                    </div>
                  )}
                </div>
              </GlareCard>
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