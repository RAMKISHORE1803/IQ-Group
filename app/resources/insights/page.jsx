'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from './blogData';
import HeroSection from '@/app/resources/hero';
import SectionNavigation from '@/components/companies/SectionNavigation';

// Register GSAP plugins
if (typeof window !== 'undefined') {
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

// Resource Card Component
const InsightCard = ({ post }) => {
  return (
    <motion.div
      className="relative h-96 bg-cover bg-center bg-no-repeat overflow-hidden group cursor-pointer"
      style={{ 
        backgroundImage: `url(${post.heroImage})`,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-20" />
      
      {/* Category Label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black bg-opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          {post.type}
        </span>
        <span className="ml-2 text-white text-xs font-medium px-2 py-1 rounded-full bg-opacity-60 bg-gray-700">
          {post.date}
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
            {post.type}
          </p>
          <h3 className="font-lato font-light text-[30px] line-clamp-2 group-hover:line-clamp-none text-ellipsis overflow-hidden text-black leading-tight transition-all duration-300">
            {post.title}
          </h3>
        </div>
        
        {/* Expanded content - only visible on hover */}
        <div className="px-4 pb-4 opacity-0 group-hover:opacity-100">
          <p className="text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4">
            {post.subtitle}
          </p>
          <Link 
            href={`/resources/insights/${post.id}`}
            className="inline-flex items-center text-[16px] font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            → Read More
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Section Title Component
const SectionTitle = ({ number, title }) => {
  return (
    <div className="mb-12">
      <p className="text-sm uppercase tracking-wider font-lato text-gray-500 mb-2">INSIGHTS FROM SIDDHARTH BOTHRA</p>
      <span className="text-4xl font-bold text-[#1a365d] block mb-4">{number}</span>
      <h2 className="text-3xl uppercase md:text-4xl font-bold text-[#1a365d]">{title}</h2>
    </div>
  );
};

const sectionLinks = [
  {
    title: "INDUSTRY INSIGHTS",
    link: "#insights"
  }
];

export default function InsightsPage() {
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
        subtitle="Industry insights and market analysis from Siddharth Bothra, CEO of IQ Group, on metals, trade, and global markets."
        backgroundImage="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1740&auto=format&fit=crop"
        sideText="INSIGHTS"
        navTitle="INSIGHTS"
        sideTextHeight="290px"
      />
      <div className="relative z-20 bg-white"> 
        <SectionNavigation 
          links={sectionLinks}
        />

        {/* Insights Section */}
        <FadeInSection className="py-16 md:py-24 px-2 md:px-4 bg-white" id="insights">
          <div className="max-w-7xl lg:max-w-[1300px] mx-auto">
            <SectionTitle number="01" title="INDUSTRY INSIGHTS" />
            <div className="flex flex-wrap -mx-1">
              {blogPosts.map((post, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-1 mb-2">
                  <InsightCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </main>
  );
} 