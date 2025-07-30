'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Office locations data from https://www.iqgroup.in/contact.html
const offices = [
  {
    id: "mumbai",
    city: "Mumbai",
    country: "India",
    address: "714 – Samartha Aishwarya, Off. New Link Road, Opp. Highland Park, Andheri-W, Mumbai – 400053",
    phone: "+91-9987998036",
    email: "info@iqgroup.in",
    isHeadquarters: true,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.2130606086077!2d72.8251698!3d19.1463518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7a7a7a7a7a7%3A0x3be7b7a7a7a7a7a7!2s714%20%E2%80%93%20Samartha%20Aishwarya%2C%20Off.%20New%20Link%20Road%2C%20Opp.%20Highland%20Park%2C%20Andheri-W%2C%20Mumbai%20%E2%80%93%20400053!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin"
  },
  {
    id: "hongkong",
    
    country: "Hong Kong",
    address: "1611B, 16/F, HO KING COMMERCIAL CENTRE, 2-16 FA YUEN, STREET, MONGKOK, KOWLOON, HONGKONG",
    phone: "+91-9987998037",
    email: "hongkong@iqgroup.in",
    isHeadquarters: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0649872311106!2d114.1682325!3d22.3178332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400eeeeeeeeee%3A0x340400eeeeeeeeee!2s1611B%2C%2016%2FF%2C%20HO%20KING%20COMMERCIAL%20CENTRE%2C%202-16%20FA%20YUEN%2C%20STREET%2C%20MONGKOK%2C%20KOWLOON%2C%20HONGKONG!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin"
  },
  {
    id: "taiyuan",
    city: "Taiyuan",
    country: "China",
    address: "296, Beida Street, Xinghualing District 030009, Taiyuan, China",
    phone: "+91-2235112519",
    email: "china@iqgroup.in",
    isHeadquarters: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.3925952562997!2d112.5665359!3d37.8706503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3611a2d2d2d2d2d2%3A0x3611a2d2d2d2d2d2!2s296%2C%20Beida%20Street%2C%20Xinghualing%20District%20030009%2C%20Taiyuan%2C%20China!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin"
  },
  {
    id: "bhubaneshwar",
  
    country: "UAE",
    address: "FDRK 1714 , Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates",
    phone: "",
    email: "",
    isHeadquarters: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d884.5113918116481!2d85.82611452445246!3d20.342135867210306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190912f38d3af3%3A0x1f494ea2535cd4a0!2sPatia%20Rd%2C%20Kanan%20Vihar%2C%20Chandrasekharpur%2C%20Bhubaneswar%2C%20Odisha%20751017!5e0!3m2!1spt-PT!2sin!4v1753870894941!5m2!1spt-PT!2sin"
  }
];

// Accordion Item Component
function AccordionItem({ id, city, country, address, phone, email, isHeadquarters, isActive, onMouseEnter, index, mapUrl }) {
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
            {isHeadquarters && (
              <span className="ml-3 bg-[#324390] text-white text-xs px-2 py-1 rounded-full">
                Headquarters
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
                  title={`IQ Group ${city} Office`}
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

export default function OfficeLocationsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const [activeOffice, setActiveOffice] = useState("mumbai"); // Default to Mumbai (headquarters)
  const [isMapTransitioning, setIsMapTransitioning] = useState(false);
  const [displayedMap, setDisplayedMap] = useState(null);
  
  // Handle office accordion hover
  const handleOfficeHover = (id) => {
    if (activeOffice === id) return; // Don't transition if hovering the same item
    
    setIsMapTransitioning(true);
    // Set the new active office
    setActiveOffice(id);
  };
  
  // Find the active office
  const activeOfficeData = offices.find(office => office.id === activeOffice) || offices[0];
  
  // Handle map preloading and transitions
  useEffect(() => {
    // Set the initial displayed map
    if (!displayedMap) {
      setDisplayedMap(activeOfficeData);
      return;
    }

    // If transitioning, wait for fade out then update the displayed map
    if (isMapTransitioning) {
      const timer = setTimeout(() => {
        setDisplayedMap(activeOfficeData);
        setIsMapTransitioning(false);
      }, 300); // Match this with the CSS transition duration
      
      return () => clearTimeout(timer);
    }
  }, [activeOffice, isMapTransitioning, displayedMap, activeOfficeData]);
  
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
      id="office-locations" 
      ref={sectionRef}
      className="py-24 bg-[#f5f5f5]"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-lato text-[#324390] mb-4"
          >
            Our Global Presence
          </h2>
          <p 
            ref={subtitleRef}
            className="text-gray-700 font-onest text-lg"
          >
            With offices strategically located across the globe, we ensure seamless operations and local expertise.
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
                    title={`IQ Group ${displayedMap.city} Office`}
                    className={`absolute inset-0 w-full h-full shadow-lg transition-opacity duration-300 ease-in-out ${isMapTransitioning ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsMapTransitioning(false)}
                  ></iframe>
                )}
              </div>
              <div className="bg-[#324390]/10 p-6 rounded-lg transition-all duration-300 ease-in-out">
                <h3 className="font-lato font-bold text-[#324390] mb-4 lg:text-[24px] transition-opacity duration-300 ease-in-out">
                  {displayedMap?.city}{displayedMap?.city ? "," : ""} {displayedMap?.country}
                  {displayedMap?.isHeadquarters && " - Global Headquarters"}
                </h3>
                <p className="text-gray-700 font-onest font-light lg:text-[18px] transition-opacity duration-300 ease-in-out">
                  Our offices are strategically positioned to serve clients across industries and geographies, ensuring responsive service and local expertise with global reach.
                </p>
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
              {offices.map((office, index) => (
                <AccordionItem
                  key={office.id}
                  id={office.id}
                  city={office.city}
                  country={office.country}
                  address={office.address}
                  phone={office.phone}
                  email={office.email}
                  isHeadquarters={office.isHeadquarters}
                  isActive={activeOffice === office.id}
                  onMouseEnter={handleOfficeHover}
                  index={index}
                  mapUrl={office.mapUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 