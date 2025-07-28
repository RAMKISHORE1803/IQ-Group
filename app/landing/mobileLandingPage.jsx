'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import AboutSection from './about-section';
import CompanySection from './company-section';
import GlobalConstructionPlatform from './globalMap';
import IndustriesSection from './industries-section'; 
import DTREHeroCarousel from './dtreHero';
import BCGCareersSection from './careerSection';
import InsightsSection from './insight-section';
import BusinessStatistics from './BusinessStatistics';
import IQGroupFooter from './footer';
import QualityCertificationsSection from './QualityCertificationsSection';
import CustomerMarqueeSection from '../../components/customer-marquee-section';
import Associates from '../../components/associates';
import HomepageTweetMarquee from '../../components/HomepageTweetMarquee';

export default function MobileLandingPage() {
  const contentWrapperRef = useRef(null);
  const footerRef = useRef(null);
  const [footerTransform, setFooterTransform] = useState('translateY(100%)');

  // Simple footer scroll handler for mobile - no complex animations to worry about
  const handleFooterScroll = useCallback(() => {
    if (!contentWrapperRef.current || !footerRef.current) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    
    // Calculate how close we are to the bottom
    const scrollableHeight = documentHeight - viewportHeight;
    const triggerDistance = 200; // Smaller trigger distance for mobile
    const distanceFromBottom = scrollableHeight - scrollTop;
    
    if (distanceFromBottom <= triggerDistance && distanceFromBottom >= 0) {
      const progress = 1 - (distanceFromBottom / triggerDistance);
      setFooterTransform(`translateY(${100 - (progress * 100)}%)`);
    } else if (distanceFromBottom < 0) {
      setFooterTransform('translateY(0%)');
    } else {
      setFooterTransform('translateY(100%)');
    }
  }, []);

  useEffect(() => {
    // Add scroll event listener for footer
    window.addEventListener('scroll', handleFooterScroll, { passive: true });
    
    // Initial check
    handleFooterScroll();

    return () => {
      window.removeEventListener('scroll', handleFooterScroll);
    };
  }, [handleFooterScroll]);

  return (
    <div className="bg-[#000000] z-[2]">
      <main className="relative" ref={contentWrapperRef}>
        {/* Hero Section */}
        <DTREHeroCarousel />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Company Section */}
        <div className='bg-[#fbfbfb]'>
          <CompanySection />
          <CustomerMarqueeSection />
        </div>
        
        {/* Global Map - Simple static version for mobile */}
        <div className="bg-[#000]">
          <div className="h-[8vh] bg-[#000]"></div>
          <GlobalConstructionPlatform />
          <div className="h-[5vh] bg-[#000]"></div>
        </div>
        
        {/* Industries and other sections */}
        <div className="bg-[#fbfbfb]">
          <Associates />
          <IndustriesSection />
          <BCGCareersSection />
          <InsightsSection />
          <HomepageTweetMarquee />
          <QualityCertificationsSection />
          <div className="h-[5vh]"></div>
          <BusinessStatistics />
        </div>
        
        {/* Bottom spacer */}
        <div style={{ height: '20vh' }}></div>
      </main>
      
      {/* Footer - fixed position at bottom */}
      <div 
        ref={footerRef} 
        className="fixed bottom-0 left-0 w-full z-40"
        style={{ 
          transform: footerTransform,
          transition: 'transform 0.15s ease-out',
          willChange: 'transform'
        }}
      >
        <IQGroupFooter />
      </div>
    </div>
  );
}