'use client';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactFormSection = () => {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const formContentRef = useRef(null);
  const leftSideRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    company: '',
    email: '',
    telephone: '',
    message: '',
    newsletter: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Enquiry submitted successfully! We will contact you soon.');
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const form = formRef.current;
    const title = titleRef.current;
    const formContent = formContentRef.current;
    const leftSide = leftSideRef.current;
    
    if (!form || !title || !formContent || !leftSide) return;
    
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: form,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Animate left side image
    tl.fromTo(
      leftSide,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    
    // Animate title
    tl.fromTo(
      title,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );
    
    // Animate form content
    tl.fromTo(
      formContent,
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
    <div className="flex flex-col md:flex-row min-h-[100vh] md:max-h-[100vh] overflow-hidden" ref={formRef}>
      {/* Left side - Image */}
      <div className="w-full md:w-2/5 relative" ref={leftSideRef}>
        <div 
          className="h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
            position: 'sticky',
            top: 0
          }}
        ></div>
      </div>

      {/* Right side - Contact Form */}
      <div className="w-full md:w-3/5 bg-[#f7f9fc] z-10 font-lato px-4 py-6 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto" ref={formContentRef}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            {/* Left column - Enquiry sections */}
            <div className="md:w-2/5">
              {/* General Enquiries Section */}
              <div className="mb-6">
                <div className="inline-block bg-[#e9f0f9] px-4 py-1 mb-2">
                  <span className="text-[#203663] font-medium text-sm">GENERAL ENQUIRIES</span>
                </div>
                <div className="mt-2">
                  <p className="text-gray-700">info@iqgroup.in</p>
                  <p className="text-gray-700">+91 22 4005 4242</p>
                </div>
              </div>

              {/* Press Enquiries Section */}
              
            </div>

            {/* Right column - Form */}
            <div className="md:w-3/5">
              <h2 
                ref={titleRef}
                className="text-2xl md:text-3xl lg:text-[42px] font-bold font-lato text-[#203663] mb-4"
              >
                Send an enquiry
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-[10px] gap-y-[40px]">
                <div className="mb-2 md:col-span-1">
                  <label htmlFor="firstName" className="block text-[#203663] text-sm mb-1">
                    First Name <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-2 md:col-span-1">
                  <label htmlFor="surname" className="block text-[#203663] text-sm mb-1">
                    Surname <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-2 md:col-span-1">
                  <label htmlFor="company" className="block text-[#203663] text-sm mb-1">
                    Company <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-2 md:col-span-1">
                  <label htmlFor="email" className="block text-[#203663] text-sm mb-1">
                    Email <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-2 md:col-span-1">
                  <label htmlFor="telephone" className="block text-[#203663] text-sm mb-1">
                    Telephone <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-2 md:col-span-2">
                  <label htmlFor="message" className="block text-[#203663] text-sm mb-1">
                    Message <span className="text-[#203663]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="2"
                    className="w-full border-b border-gray-300 py-1 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <div className="mb-4 md:col-span-2 flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="newsletter" className="text-gray-700 text-xs">
                    Sign me up for the IQ Group Insights newsletter
                  </label>
                </div>

                <div className="md:col-span-2 text-right">
                  <button
                    type="submit"
                    className="bg-[#203663] border border-[#203663] hover:bg-[#fbfbfb] cursor-pointer hover:text-[#203663] text-white px-6 py-2 transition-colors flex items-center ml-auto"
                  >
                    <span>Send enquiry</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[10vh] md:hidden bg-[#000]"></div>
    </div>
  );
};

export default ContactFormSection; 