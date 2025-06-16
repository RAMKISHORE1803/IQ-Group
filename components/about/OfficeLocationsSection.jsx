'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Office locations data from https://www.iqgroup.in/contact.html
const offices = [
  {
    city: "Mumbai",
    country: "India",
    address: "714 – Samartha Aishwarya, Off. New Link Road, Opp. Highland Park, Andheri-W, Mumbai – 400053",
    phone: "+91-9987998036",
    email: "info@iqgroup.in",
    isHeadquarters: true,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.2130606086077!2d72.8251698!3d19.1463518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7a7a7a7a7a7%3A0x3be7b7a7a7a7a7a7!2s714%20%E2%80%93%20Samartha%20Aishwarya%2C%20Off.%20New%20Link%20Road%2C%20Opp.%20Highland%20Park%2C%20Andheri-W%2C%20Mumbai%20%E2%80%93%20400053!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin"
  },
  {
    city: "Hong Kong",
    country: "China",
    address: "1611B, 16/F, HO KING COMMERCIAL CENTRE, 2-16 FA YUEN, STREET, MONGKOK, KOWLOON, HONGKONG",
    phone: "+91-9987998037",
    email: "hongkong@iqgroup.in",
    isHeadquarters: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0649872311106!2d114.1682325!3d22.3178332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400eeeeeeeeee%3A0x340400eeeeeeeeee!2s1611B%2C%2016%2FF%2C%20HO%20KING%20COMMERCIAL%20CENTRE%2C%202-16%20FA%20YUEN%2C%20STREET%2C%20MONGKOK%2C%20KOWLOON%2C%20HONGKONG!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin"
  },
  {
    city: "Taiyuan",
    country: "China",
    address: "296, Beida Street, Xinghualing District 030009, Taiyuan, China",
    phone: "+91-2235112519",
    email: "china@iqgroup.in",
    isHeadquarters: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.3925952562997!2d112.5665359!3d37.8706503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3611a2d2d2d2d2d2%3A0x3611a2d2d2d2d2d2!2s296%2C%20Beida%20Street%2C%20Xinghualing%20District%20030009%2C%20Taiyuan%2C%20China!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin"
  },
  {
    city: "Visakhapatnam",
    country: "India",
    address: "5th Floor, Door No. 9-14-1, Suite No. 504, Kotu Empire, VIP Road, Siripuram, Visakhapatnam, Andhra Pradesh - 530006",
    phone: "+91-2235112520",
    email: "vizag@iqgroup.in",
    isHeadquarters: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.2130606086077!2d83.3251698!3d17.7263518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431389f3f3f3%3A0x3a39431389f3f3f3!2s5th%20Floor%2C%20Door%20No.%209-14-1%2C%20Suite%20No.%20504%2C%20Kotu%20Empire%2C%20VIP%20Road%2C%20Siripuram%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20-%20530006!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin"
  },
  {
    city: "Chennai",
    country: "India",
    address: "NO.1/1A, UR NAGAR, ANNA NAGAR WEST EXTN, Chennai, Tamil Nadu, 600050",
    phone: "+91-9987998036",
    email: "chennai@iqgroup.in",
    isHeadquarters: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2130606086077!2d80.2051698!3d13.0863518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52671d1d1d1d1d%3A0x3a52671d1d1d1d1d!2sNO.1%2F1A%2C%20UR%20NAGAR%2C%20ANNA%20NAGAR%20WEST%20EXTN%2C%20Chennai%2C%20Tamil%20Nadu%2C%20600050!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin"
  },
  {
    city: "Kolkata",
    country: "India",
    address: "2nd floor, 89- Bonfield Lane, Kolkata - 700001",
    phone: "+91-9987998037",
    email: "kolkata@iqgroup.in",
    isHeadquarters: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.2130606086077!2d88.3451698!3d22.5663518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027747474747%3A0x3a027747474747!2s2nd%20floor%2C%2089-%20Bonfield%20Lane%2C%20Kolkata%20-%20700001!5e0!3m2!1sen!2sin!4v1654612031797!5m2!1sen!2sin"
  }
];

// Office Card Component
function OfficeCard({ city, country, address, phone, email, isHeadquarters, index, onClick, isActive }) {
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const card = cardRef.current;
    if (!card) return;
    
    // Animate card on scroll
    gsap.fromTo(card,
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=50",
          toggleActions: "play none none none"
        },
        delay: index * 0.1 // Stagger effect
      }
    );
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, [index]);
  
  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-300 ${isHeadquarters ? 'border-2 border-[#324390]' : ''} ${isActive ? 'ring-2 ring-[#324390] transform scale-[1.02]' : 'hover:shadow-lg hover:scale-[1.01]'}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-lato font-bold text-[#324390]">{city}</h3>
          <p className="text-gray-600 font-onest">{country}</p>
        </div>
        {isHeadquarters && (
          <span className="bg-[#324390] text-white text-xs px-2 py-1 rounded-full">
            Headquarters
          </span>
        )}
      </div>
      
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
      </div>
    </div>
  );
}

export default function OfficeLocationsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const mapRef = useRef(null);
  const [activeOffice, setActiveOffice] = useState(0); // Default to Mumbai (headquarters)
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const map = mapRef.current;
    
    if (!section || !heading || !subtitle || !map) return;
    
    // Animate heading and subtitle on scroll
    gsap.fromTo([heading, subtitle],
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate map on scroll
    gsap.fromTo(map,
      { 
        scale: 0.95, 
        opacity: 0 
      },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: map,
          start: "top bottom-=50",
          toggleActions: "play none none none"
        }
      }
    );
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  // Handle office card click
  const handleOfficeClick = (index) => {
    setActiveOffice(index);
    
    // Animate map change
    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current,
        { opacity: 0.7, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
    
    // Scroll to map if on mobile
    if (window.innerWidth < 768) {
      const mapElement = document.getElementById('office-map');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  return (
    <section 
      id="office-locations" 
      ref={sectionRef}
      className="py-24 bg-[#f5f5f5]"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
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
        
        {/* World Map */}
        <div 
          ref={mapRef}
          className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-16"
        >
          <div id="office-map" className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg transition-all duration-500">
            <iframe
              src={offices[activeOffice].mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`IQ Group ${offices[activeOffice].city} Office`}
              className="absolute inset-0"
            ></iframe>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500 font-onest">
              Currently viewing: <span className="font-medium text-[#324390]">{offices[activeOffice].city}, {offices[activeOffice].country}</span>
            </p>
            <a 
              href={`https://www.google.com/maps/search/${encodeURIComponent(offices[activeOffice].address)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-[#324390] hover:underline"
            >
              <span className="mr-1">View on Google Maps</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
        
        {/* Office Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office, index) => (
            <OfficeCard
              key={index}
              city={office.city}
              country={office.country}
              address={office.address}
              phone={office.phone}
              email={office.email}
              isHeadquarters={office.isHeadquarters}
              index={index}
              onClick={() => handleOfficeClick(index)}
              isActive={activeOffice === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 