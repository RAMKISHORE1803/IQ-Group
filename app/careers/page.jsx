'use client';
import HeroSection from "@/components/contact/herosection";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import OpenPositionsCarousel from "@/components/careers/OpenPositionsCarousel";
import LifeAtIQSection from "@/components/careers/LifeAtIQSection";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fade-in animation for sections
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const section = sectionRef.current;
    if (!section) return;
    
    // Set initial state (invisible)
    gsap.set(section, { 
      opacity: 0,
      y: 30
    });
    
    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 40%",
        toggleActions: "play none none none"
      }
    });
    
    // Animate to visible
    tl.to(section, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: delay
    });
    
    return () => {
      // Clean up
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [delay]);
  
  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

// Accordion Item Component
const AccordionItem = ({ id, title, content, isActive, onClick, index }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => onClick(id)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center">
          <span className="font-lato lg:text-[32px] font-bold text-[#1a365d]">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown className="w-6 h-6 text-[#1a365d]" />
        </motion.div>
      </button>
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
          {content}
        </div>
      </motion.div>
    </div>
  );
};

// WhyJoinUs Component
const WhyJoinUs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const [activeItem, setActiveItem] = useState("growth"); // Default open item

  const handleItemClick = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  const benefits = [
    {
      id: "growth",
      title: "Career Growth & Development",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Clear advancement paths across our global network</li>
          <li>World-class technical and leadership training</li>
          <li>Mentorship from industry pioneers</li>
          <li>Educational assistance for continuous evolution</li>
        </ul>
      ),
    },
    {
      id: "culture",
      title: "Collaborative Culture",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Diverse perspectives driving innovation</li>
          <li>Borderless teamwork across continents</li>
          <li>Open communication at all levels</li>
          <li>Recognition that celebrates excellence</li>
        </ul>
      ),
    },
    {
      id: "innovation",
      title: "Innovation & Impact",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Bridge global supply chains with groundbreaking solutions</li>
          <li>Direct contribution to industries that shape our world</li>
          <li>Freedom to challenge conventions and explore new approaches</li>
          <li>Work with sustainable practices defining tomorrow's trade</li>
        </ul>
      ),
    },
    {
      id: "benefits",
      title: "Comprehensive Benefits",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Competitive compensation tailored to regional excellence</li>
          <li>Health and wellness programs that prioritize your wellbeing</li>
          <li>Flexible arrangements respecting work-life harmony</li>
          <li>International travel connecting our global presence</li>
        </ul>
      ),
    },
    {
      id: "global",
      title: "Global Exposure",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Collaborate across India, Hong Kong, China and beyond</li>
          <li>Cross-cultural projects expanding your worldview</li>
          <li>International assignments for boundless growth</li>
          <li>Insights into global markets that enhance your expertise</li>
        </ul>
      ),
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;

    if (!section || !title || !leftCol || !rightCol) return;

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
      ref={sectionRef}
      className="py-12 md:py-20 px-4 md:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="font-lato font-bold text-[#1a365d] lg:text-[42px] mb-10"
        >
          Why Join IQ Group?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative">
          {/* Left column - Image and description - Now sticky */}
          <div ref={leftColRef} className="lg:sticky lg:top-24 lg:self-start">
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Team collaboration at IQ Group"
                className="object-cover w-full max-h-[298px] shadow-lg"
              />
            </div>
            <div className="bg-[#1a365d]/10 p-6 rounded-lg">
              <h3 className="font-lato font-bold text-[#1a365d] mb-4 lg:text-[24px]">
                Our Commitment to Excellence
              </h3>
              <p className="text-gray-700 font-onest font-light lg:text-[18px]">
                We don't just distribute raw materials. We bridge possibilities. With responsibility, quality, and transparency at our core, we unite global expertise to transform industrial resourcefulness.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="bg-[#1a365d] text-white px-3 py-1 rounded-full text-sm">
                  Responsibility
                </span>
                <span className="bg-[#1a365d] text-white px-3 py-1 rounded-full text-sm">
                  Quality
                </span>
                <span className="bg-[#1a365d] text-white px-3 py-1 rounded-full text-sm">
                  Commitment
                </span>
                <span className="bg-[#1a365d] text-white px-3 py-1 rounded-full text-sm">
                  Transparency
                </span>
                <span className="bg-[#1a365d] text-white px-3 py-1 rounded-full text-sm">
                  Team Work
                </span>
              </div>
            </div>
          </div>

          {/* Right column - Accordion - Scrollable */}
          <div ref={rightColRef} className="space-y-0 max-h-[800px] lg:overflow-y-auto lg:pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {benefits.map((benefit, index) => (
              <AccordionItem
                key={benefit.id}
                id={benefit.id}
                title={benefit.title}
                content={benefit.content}
                isActive={activeItem === benefit.id}
                onClick={handleItemClick}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Application Form Component
const ApplicationForm = () => {
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
    position: '',
    experience: '',
    resume: null,
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Application submitted successfully! We will contact you soon.');
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
    <div className="flex flex-col md:flex-row min-h-screen" id="apply-now" ref={formRef}>
      {/* Left side - Image */}
      <div className="w-full md:w-2/5 relative" ref={leftSideRef}>
        <div 
          className="h-[50vh] md:h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2047&auto=format&fit=crop')`,
            position: 'sticky',
            top: 0
          }}
        ></div>
      </div>

      {/* Right side - Application Form */}
      <div className="w-full md:w-3/5 bg-[#f7f9fc] z-10 font-lato px-4 py-12 md:p-16 lg:p-24">
        <div className="max-w-4xl mx-auto" ref={formContentRef}>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-12">
            {/* Left column - Career sections */}
            <div className="md:w-2/5">
              {/* Career Opportunities Section */}
              <div className="mb-12">
                <div className="inline-block bg-[#e9f0f9] px-4 py-2 mb-4">
                  <span className="text-[#203663] font-medium text-sm">CAREER OPPORTUNITIES</span>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700">careers@iqgroup.com</p>
                  <p className="text-gray-700">+91 22 4005 4242</p>
                </div>
              </div>

              {/* Internship Enquiries Section */}
              <div>
                <div className="inline-block bg-[#e9f0f9] px-4 py-2 mb-4">
                  <span className="text-[#203663] font-medium text-sm">INTERNSHIP ENQUIRIES</span>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700 font-medium">HR Department</p>
                  <p className="text-gray-700">internships@iqgroup.com</p>
                  <p className="text-gray-700">+91 22 4005 4243</p>
                </div>
              </div>
            </div>

            {/* Right column - Form */}
            <div className="md:w-3/5">
              <h2 
                ref={titleRef}
                className="text-3xl md:text-4xl font-bold font-lato text-[#203663] mb-8"
              >
                Apply Now
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="firstName" className="block text-[#203663] mb-2">
                    First Name <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="surname" className="block text-[#203663] mb-2">
                    Surname <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                {/* <div className="mb-6">
                  <label htmlFor="company" className="block text-[#203663] mb-2">
                    Current Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div> */}

                <div className="mb-6">
                  <label htmlFor="email" className="block text-[#203663] mb-2">
                    Email <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="telephone" className="block text-[#203663] mb-2">
                    Telephone <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="position" className="block text-[#203663] mb-2">
                    Position Applying For <span className="text-[#203663]">*</span>
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  >
                    <option value="">Select a position</option>
                    <option value="sales">Sales Manager</option>
                    <option value="supply">Supply Chain Analyst</option>
                    <option value="marketing">Marketing Specialist</option>
                    <option value="quality">Quality Control Engineer</option>
                    <option value="finance">Financial Analyst</option>
                    <option value="business">Business Development Executive</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="experience" className="block text-[#203663] mb-2">
                    Years of Experience <span className="text-[#203663]">*</span>
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="resume" className="block text-[#203663] mb-2">
                    Upload Resume (PDF) <span className="text-[#203663]">*</span>
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-[#203663] mb-2">
                    Cover Letter / Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-[#203663] transition-colors bg-transparent"
                    placeholder="Tell us why you want to join IQ Group..."
                  ></textarea>
                </div>

                <div className="mb-8 flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="newsletter" className="text-gray-700 text-sm">
                    Sign me up for the IQ Group career updates and opportunities
                  </label>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-[#203663] border border-[#203663] hover:bg-[#fbfbfb] cursor-pointer hover:text-[#203663] text-white px-8 py-4 transition-colors flex items-center"
                  >
                    <span>Submit Application</span>
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
    </div>
  );
};

export default function CareerPage() {
  const introRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const intro = introRef.current;
    if (!intro) return;
    
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: intro,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Animate intro section
    tl.fromTo(
      intro.querySelectorAll('.animate-item'),
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power2.out" 
      }
    );
    
    return () => {
      // Clean up ScrollTrigger
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);
  
  return (
    <main>
      <HeroSection 
        subtitle="Join our team and shape the future of global trade"
        backgroundImage="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1740&auto=format&fit=crop"
        sideText="CAREER"
        navTitle="CAREER"
      />
      <div className="relative z-20 bg-white"> 
        <div 
          ref={introRef}
          className="w-full max-w-7xl md:max-w-[1300px] flex flex-wrap justify-between mx-auto px-4 py-12 bg-[#ffffff]"
        >
          <div className="w-full md:w-1/2 lg:text-[38px] font-lato leading-[1.1] text-[#1a365d] font-bold animate-item">
            There's nowhere like IQ Group to build your legacy.
          </div>
          <div className="w-full md:w-1/2 flex items-center text-[17px] font-onest text-[#1a365d] animate-item">
            We don't just offer jobs. We craft careers. Develop skills that matter, gain experiences that count, and build a future that rewards.
          </div>
         </div>
        
        {/* Life at IQ Group Section */}
        <FadeInSection>
          <LifeAtIQSection />
        </FadeInSection>
        
        {/* Why Join Us Section */}
        <WhyJoinUs />
        
        {/* Open Positions Carousel */}
        <FadeInSection>
          <OpenPositionsCarousel />
        </FadeInSection>
      </div>
      
      {/* Application Form */}
      <ApplicationForm />
    </main>
  );
}