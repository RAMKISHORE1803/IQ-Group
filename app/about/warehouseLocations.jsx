'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, ExternalLink, ChevronDown, Warehouse } from 'lucide-react';
import { motion } from 'framer-motion';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Warehouse locations data
const warehouses = [
    // {
    //     id: "mumbai",
    //     city: "Mumbai",
    //     country: "India",
    //     address: "Plot No. 5, JNPT SEZ, Navi Mumbai, Maharashtra - 400707",
    //     phone: "+91-9987998036",
    //     email: "warehouse.mumbai@iqgroup.in",
    //     isPrimary: true,
    //     mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6930606086077!2d72.9651698!3d18.9563518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1d1d1d1d1d1%3A0x3be7c1d1d1d1d1d1!2sJNPT%20SEZ%2C%20Navi%20Mumbai%2C%20Maharashtra%20-%20400707!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin",
    //     capacity: "50,000 sq. ft.",
    //     specialization: "Bulk Materials, Alloys, Minerals"
    // },
    {
        id: "vizag",
        city: "Visakhapatnam",
        country: "India",
        address: "Plot No. 42, VSEZ, Duvvada, Visakhapatnam, Andhra Pradesh - 530046",
        phone: "+91-2235112520",
        email: "warehouse.vizag@iqgroup.in",
        isPrimary: false,
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.2130606086077!2d83.1551698!3d17.6863518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431389f3f3f3%3A0x3a39431389f3f3f3!2sVSEZ%2C%20Duvvada%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20-%20530046!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin",
        capacity: "35,000 sq. ft.",
        specialization: "Ferro Alloys, Minerals"
    },
    {
        id: "chennai",
        city: "Chennai",
        country: "India",
        address: "Plot No. 23, Chennai Port Trust, Chennai, Tamil Nadu - 600001",
        phone: "+91-9987998037",
        email: "warehouse.chennai@iqgroup.in",
        isPrimary: false,
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2130606086077!2d80.2851698!3d13.0963518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52671d1d1d1d1d%3A0x3a52671d1d1d1d1d!2sChennai%20Port%20Trust%2C%20Chennai%2C%20Tamil%20Nadu%20-%20600001!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin",
        capacity: "25,000 sq. ft.",
        specialization: "Coke & Coal, Noble Alloys"
    },
    {
        id: "kolkata",
        city: "Kolkata",
        country: "India",
        address: "Plot No. 17, Kolkata Port Trust, Kolkata, West Bengal - 700001",
        phone: "+91-9987998038",
        email: "warehouse.kolkata@iqgroup.in",
        isPrimary: false,
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.2130606086077!2d88.3251698!3d22.5463518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027747474747%3A0x3a027747474747!2sKolkata%20Port%20Trust%2C%20Kolkata%2C%20West%20Bengal%20-%20700001!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin",
        capacity: "30,000 sq. ft.",
        specialization: "Minerals & Metals, Ferro Alloys"
    }
];

// Accordion Item Component
function AccordionItem({ id, city, country, address, phone, email, isPrimary, isActive, onMouseEnter, index, mapUrl, capacity, specialization }) {
  return (
    <div 
      className="border-b border-gray-200 last:border-b-0"
      onMouseEnter={() => onMouseEnter(id)}
    >
      <div
        className="w-full py-6 flex cursor-pointer items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center">
          <span className="font-lato lg:text-[28px] font-bold text-[#324390]">
            {city}, {country}
            {isPrimary && (
              <span className="ml-3 bg-[#324390] text-white text-xs px-2 py-1 rounded-full">
                Primary Warehouse
              </span>
            )}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown className="w-6 h-6 text-[#324390]" />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
          marginBottom: isActive ? 24 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-4 text-[17px] font-onest text-gray-700 leading-relaxed">
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin size={18} className="text-[#324390] mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-700 font-onest">{address}</p>
            </div>
            
            <div className="flex items-center">
              <Phone size={18} className="text-[#324390] mr-3 flex-shrink-0" />
              <a href={`tel:${phone}`} className="text-gray-700 font-onest hover:text-[#324390]">
                {phone}
              </a>
            </div>
            
            <div className="flex items-center">
              <Mail size={18} className="text-[#324390] mr-3 flex-shrink-0" />
              <a href={`mailto:${email}`} className="text-gray-700 font-onest hover:text-[#324390]">
                {email}
              </a>
            </div>

            <div className="flex items-center">
              <Warehouse size={18} className="text-[#324390] mr-3 flex-shrink-0" />
              <span className="text-gray-700 font-onest">
                <strong>Capacity:</strong> {capacity} | <strong>Specialization:</strong> {specialization}
              </span>
            </div>
            
            {/* Map iframe for mobile view */}
            <div className="lg:hidden mt-4">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden h-[250px] relative">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`IQ Group ${city} Warehouse`}
                  className="absolute inset-0 w-full h-full shadow-md"
                ></iframe>
              </div>
              <div className="mt-3">
                <a 
                  href={`https://www.google.com/maps/search/${encodeURIComponent(address || '')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-[#324390] hover:underline text-sm"
                >
                  <span className="mr-1">View on Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WarehouseLocations() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const [activeWarehouse, setActiveWarehouse] = useState("mumbai"); // Default to Mumbai (primary)
  const [isMapTransitioning, setIsMapTransitioning] = useState(false);
  const [displayedMap, setDisplayedMap] = useState(null);
  
  // Handle warehouse accordion hover
  const handleWarehouseHover = (id) => {
    if (activeWarehouse === id) return; // Don't transition if hovering the same item
    
    setIsMapTransitioning(true);
    // Set the new active warehouse
    setActiveWarehouse(id);
  };
  
  // Find the active warehouse
  const activeWarehouseData = warehouses.find(warehouse => warehouse.id === activeWarehouse) || warehouses[0];
  
  // Handle map preloading and transitions
  useEffect(() => {
    // Set the initial displayed map
    if (!displayedMap) {
      setDisplayedMap(activeWarehouseData);
      return;
    }

    // If transitioning, wait for fade out then update the displayed map
    if (isMapTransitioning) {
      const timer = setTimeout(() => {
        setDisplayedMap(activeWarehouseData);
        setIsMapTransitioning(false);
      }, 300); // Match this with the CSS transition duration
      
      return () => clearTimeout(timer);
    }
  }, [activeWarehouse, isMapTransitioning, displayedMap, activeWarehouseData]);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    
    if (!section || !title || !subtitle || !leftCol || !rightCol) return;
    
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate title
    tl.fromTo(
      title,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
    
    // Animate subtitle
    tl.fromTo(
      subtitle,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // Animate left column
    tl.fromTo(
      leftCol,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    // Animate right column
    tl.fromTo(
      rightCol,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
    
    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);
  
  return (
    <section 
      id="warehouse-locations" 
      ref={sectionRef}
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-lato text-[#324390] mb-4"
          >
            Our Warehouse Network
          </h2>
          <p 
            ref={subtitleRef}
            className="text-gray-700 font-onest text-lg"
          >
            With strategically located warehouses across India, we ensure efficient storage and timely delivery of materials.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative">
            {/* Left column - Map and description - Sticky - Hidden on mobile */}
            <div ref={leftColRef} className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
              <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden rounded-lg relative h-[400px]">
                {displayedMap && (
                  <iframe
                    key={displayedMap.id}
                    src={displayedMap.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`IQ Group ${displayedMap.city} Warehouse`}
                    className={`absolute inset-0 w-full h-full shadow-lg transition-opacity duration-300 ease-in-out ${isMapTransitioning ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsMapTransitioning(false)}
                  ></iframe>
                )}
              </div>
              <div className="bg-[#324390]/10 p-6 rounded-lg transition-all duration-300 ease-in-out">
                <h3 className="font-lato font-bold text-[#324390] mb-4 lg:text-[24px] transition-opacity duration-300 ease-in-out">
                  {displayedMap?.city}, {displayedMap?.country}
                  {displayedMap?.isPrimary && " - Primary Warehouse"}
                </h3>
                <p className="text-gray-700 font-onest font-light lg:text-[18px] transition-opacity duration-300 ease-in-out">
                  Our warehouses are strategically positioned near major ports and industrial hubs, ensuring efficient storage and timely delivery of materials to our clients.
                </p>
                <div className="mt-4 text-gray-700 font-onest">
                  <p><strong>Capacity:</strong> {displayedMap?.capacity}</p>
                  <p><strong>Specialization:</strong> {displayedMap?.specialization}</p>
                </div>
                <div className="mt-6">
                  <a 
                    href={`https://www.google.com/maps/search/${encodeURIComponent(displayedMap?.address || '')}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#324390] hover:underline"
                  >
                    <span className="mr-1">View on Google Maps</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right column - Accordion - Scrollable */}
            <div ref={rightColRef} className="space-y-0 max-h-[800px] lg:overflow-y-auto lg:pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {warehouses.map((warehouse, index) => (
                <AccordionItem
                  key={warehouse.id}
                  id={warehouse.id}
                  city={warehouse.city}
                  country={warehouse.country}
                  address={warehouse.address}
                  phone={warehouse.phone}
                  email={warehouse.email}
                  isPrimary={warehouse.isPrimary}
                  isActive={activeWarehouse === warehouse.id}
                  onMouseEnter={handleWarehouseHover}
                  index={index}
                  mapUrl={warehouse.mapUrl}
                  capacity={warehouse.capacity}
                  specialization={warehouse.specialization}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 