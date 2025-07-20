'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionNavigation from '@/components/companies/SectionNavigation';
import Link from 'next/link';
import ProductRangeSection from '@/components/companies/ProductRangeSection';
import SectionWithCards from '@/components/companies/SectionWithCards';
import HeroSection from '@/components/about/HeroSection';
import InfiniteMovingCardsDemo from '@/components/ui/infinite-moving-cards-demo';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable Industry Page Template
 * 
 * @param {Object} props
 * @param {string} props.title - Industry title
 * @param {string} props.subtitle - Hero section subtitle
 * @param {string} props.backgroundImage - URL for hero background image
 * @param {string} props.sideText - Side text for hero section (defaults to industry title)
 * @param {Object} props.overviewData - Data for overview section
 * @param {string} props.overviewData.subtitle - Overview section subtitle
 * @param {Array} props.overviewData.cards - Array of overview cards
 * @param {Object} props.challengesData - Data for industry challenges section
 * @param {string} props.challengesData.subtitle - Challenges section subtitle
 * @param {Array} props.challengesData.cards - Array of challenge cards
 * @param {Object} props.materialsData - Data for materials section
 * @param {string} props.materialsData.title - Materials section title
 * @param {string} props.materialsData.subtitle - Materials section subtitle
 * @param {Array} props.materialsData.products - Array of material products
 * @param {Object} props.successStoriesData - Data for success stories section
 * @param {string} props.successStoriesData.subtitle - Success stories section subtitle
 * @param {boolean} props.showSuccessStories - Whether to show the success stories section
 */
export default function IndustryPageTemplate({
  title,
  subtitle,
  backgroundImage,
  sideText,
  overviewData,
  challengesData,
  materialsData,
  successStoriesData = {
    subtitle: "Real results from our partnerships with leading industry manufacturers worldwide"
  },
  showSuccessStories = true
}) {
  // Create section links based on which sections are included
  const sectionLinks = [
    {
      title: "Overview",
      link: "#overview"
    },
    {
      title: "Industry Challenges",
      link: "#challenges"
    },
    {
      title: "Key Materials",
      link: "#key-materials"
    }
  ];

  // Add success stories link if that section is shown
  if (showSuccessStories) {
    sectionLinks.push({
      title: "Success Stories",
      link: "#success-stories"
    });
  }

  const overviewRef = useRef(null);
  const challengesRef = useRef(null);
  const keyMaterialsRef = useRef(null);
  const successStoriesRef = useRef(null);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      // Initialize scroll animations if needed
      ScrollTrigger.refresh();

      // Create animation for each section
      const sections = [
        { ref: overviewRef, delay: 0 },
        { ref: challengesRef, delay: 0.1 },
        { ref: keyMaterialsRef, delay: 0.2 }
      ];

      // Add success stories section if it's shown
      if (showSuccessStories) {
        sections.push({ ref: successStoriesRef, delay: 0.3 });
      }

      sections.forEach(({ ref, delay }) => {
        if (!ref.current) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }).fromTo(
          ref.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay, ease: 'power2.out' }
        );
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      // Clean up any ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [showSuccessStories]);

  return (
    <div className="industry-page bg-white">
      {/* Hero Section */}
      <HeroSection 
        title=""
        subtitle={subtitle}
        backgroundImage={backgroundImage}
        sideText={sideText || title.toUpperCase()}
        navTitle="INDUSTRIES"
      />

      {/* Main Content */}
      <div className="relative z-20 bg-white">
        <SectionNavigation links={sectionLinks} />
        
        {/* Overview Section using SectionWithCards */}
        <div ref={overviewRef} id="overview">
          <SectionWithCards
            title={`${title} Overview`}
            subtitle={overviewData.subtitle}
            cards={overviewData.cards}
            background="white"
            sectionNumber="01"
          />
        </div>
        
        {/* Industry Challenges Section using SectionWithCards */}
        <div ref={challengesRef} id="challenges">
          <SectionWithCards
            title="Industry Challenges"
            subtitle={challengesData.subtitle}
            cards={challengesData.cards}
            background="gray"
            sectionNumber="02"
          />
        </div>
        
        {/* Materials Section using ProductRangeSection */}
        <div ref={keyMaterialsRef}>
          <ProductRangeSection
            id="key-materials"
            title={materialsData.title}
            subtitle={materialsData.subtitle}
            products={materialsData.products}
            sectionNumber="03"
          />
        </div>

        {/* Success Stories Section */}
        {showSuccessStories && (
          <section 
            ref={successStoriesRef}
            id="success-stories"
            className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-24 bg-gray-50"
          >
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-wider font-lato text-gray-500 mb-2">IN THIS SECTION</p>
                  <span className="text-4xl font-bold font-lato text-[#203663]">04</span>
                </div>
                <h2 className="text-3xl uppercase md:text-4xl font-bold font-lato text-[#203663] mb-6">Success Stories</h2>
                <p className="text-xl text-gray-700 font-lato">{successStoriesData.subtitle}</p>
              </div>
              <InfiniteMovingCardsDemo />
            </div>
          </section>
        )}
      </div>
    </div>
  );
} 