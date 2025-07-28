'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import AboutSection from './about-section';
import CompanySection from './company-section';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default function DesktopLandingPage() {
  const globalMapWrapperRef = useRef(null);
  const globalMapContentRef = useRef(null);
  const industriesRef = useRef(null);
  const scrollTriggersRef = useRef([]);
  const contentWrapperRef = useRef(null);
  const footerRef = useRef(null);
  const [footerTransform, setFooterTransform] = useState('translateY(100%)');
  const [isGlobalMapAnimating, setIsGlobalMapAnimating] = useState(false);
  const [isIndustriesAnimating, setIsIndustriesAnimating] = useState(false);
  const lastScrollTopRef = useRef(0);

  // Enhanced footer scroll handler for desktop
  const handleFooterScroll = useCallback(() => {
    if (!contentWrapperRef.current || !footerRef.current) return;
    
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingUp = currentScrollTop < lastScrollTopRef.current;
    lastScrollTopRef.current = currentScrollTop;
    
    // Hide footer during any GSAP animations
    if (isGlobalMapAnimating || isIndustriesAnimating) {
      setFooterTransform('translateY(100%)');
      return;
    }
    
    // Use a more conservative approach for desktop
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = documentHeight - viewportHeight;
    const triggerDistance = 400; // Larger trigger distance for desktop
    const distanceFromBottom = scrollableHeight - currentScrollTop;
    
    // Hide footer if scrolling up and not near bottom
    if (isScrollingUp && distanceFromBottom > triggerDistance) {
      setFooterTransform('translateY(100%)');
      return;
    }
    
    // Show footer when approaching bottom
    if (distanceFromBottom <= triggerDistance && distanceFromBottom >= 0) {
      const progress = 1 - (distanceFromBottom / triggerDistance);
      setFooterTransform(`translateY(${100 - (progress * 100)}%)`);
    } else if (distanceFromBottom < 0) {
      setFooterTransform('translateY(0%)');
    } else {
      setFooterTransform('translateY(100%)');
    }
  }, [isGlobalMapAnimating, isIndustriesAnimating]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const setupCurtainReveal = () => {
      if (!globalMapWrapperRef.current || !globalMapContentRef.current) return;

      // Clear previous triggers
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];

      // Reset animations
      gsap.set([globalMapWrapperRef.current, globalMapContentRef.current], {
        clearProps: "all"
      });

      // Desktop settings
      const wrapperHeight = '100vh';
      const initialOffset = '-20vh';
      const startPosition = "top 90%";
      const endPosition = "top 10%";

      // Set up wrapper
      gsap.set(globalMapWrapperRef.current, {
        overflow: 'hidden',
        position: 'relative',
        height: wrapperHeight
      });

      // Set initial position
      gsap.set(globalMapContentRef.current, {
        y: initialOffset,
        willChange: 'transform'
      });

      // Create the reveal animation
      const trigger1 = ScrollTrigger.create({
        trigger: globalMapWrapperRef.current,
        start: startPosition,
        end: endPosition,
        scrub: 1,
        markers: false,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        animation: gsap.to(globalMapContentRef.current, {
          y: 0,
          ease: "none",
        }),
        
        onEnter: () => {
          setIsGlobalMapAnimating(true);
        },
        
        onLeave: () => {
          console.log("GlobalMap animation complete");
          setIsGlobalMapAnimating(false);
          
          gsap.set(globalMapWrapperRef.current, {
            height: 'auto',
            overflow: 'visible',
            position: 'relative'
          });
          
          gsap.set(globalMapContentRef.current, {
            y: 0,
            transform: 'none',
            willChange: 'auto'
          });
          
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        },
        
        onEnterBack: () => {
          console.log("Re-entering GlobalMap animation");
          setIsGlobalMapAnimating(true);
          
          gsap.set(globalMapWrapperRef.current, {
            height: wrapperHeight,
            overflow: 'hidden',
            position: 'relative'
          });
          
          gsap.set(globalMapContentRef.current, {
            willChange: 'transform'
          });
        },
        
        onLeaveBack: () => {
          setIsGlobalMapAnimating(false);
        }
      });

      scrollTriggersRef.current.push(trigger1);
    };

    const setupIndustriesAnimation = () => {
      if (!industriesRef.current || !globalMapContentRef.current) return;
      
      const trigger2 = ScrollTrigger.create({
        trigger: globalMapContentRef.current,
        start: "bottom bottom",
        endTrigger: industriesRef.current,
        end: "top top",
        pin: globalMapContentRef.current,
        pinSpacing: false,
        scrub: 1.5,
        markers: false,
        refreshPriority: -2,
        animation: gsap.fromTo(industriesRef.current, {
          yPercent: 0,
          willChange: 'transform'
        }, {
          y: 0,
          ease: "power2.inOut",
        }),
        
        onEnter: () => {
          setIsIndustriesAnimating(true);
        },
        
        onLeave: () => {
          setIsIndustriesAnimating(false);
        },
        
        onEnterBack: () => {
          setIsIndustriesAnimating(true);
        },
        
        onLeaveBack: () => {
          setIsIndustriesAnimating(false);
        }
      });

      scrollTriggersRef.current.push(trigger2);
    };

    const initTimeout = setTimeout(() => {
      setupCurtainReveal();
      setupIndustriesAnimation();
      
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }, 100);

    // Add scroll event listener for footer
    window.addEventListener('scroll', handleFooterScroll, { passive: true });
    handleFooterScroll();

    const handleResize = debounce(() => {
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
      
      setupCurtainReveal();
      setupIndustriesAnimation();
      handleFooterScroll();
      
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }, 250);
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleFooterScroll);
      
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [handleFooterScroll]);

  return (
    <div className="bg-[#000000] z-[2]">
      <main className="relative" ref={contentWrapperRef}>
        {/* Normal scrolling sections */}
        <DTREHeroCarousel />
        <AboutSection />
          
        <div className='bg-[#fbfbfb]'>
          <CompanySection />
          <CustomerMarqueeSection />
        </div>
        
        {/* GlobalMap wrapper with animation */}
        <div ref={globalMapWrapperRef} className="relative">
          <div className="h-[15vh] bg-[#000]"></div>
          <div ref={globalMapContentRef} className="will-change-transform">
            <GlobalConstructionPlatform />
            <div className="h-[10vh] bg-[#000]"></div>
          </div>
        </div>
        
        {/* Industries section */}
        <div ref={industriesRef} className="min-h-[100vh] bg-[#fbfbfb] text-white text-4xl">
          <Associates/>
          <IndustriesSection/>
          <BCGCareersSection />
          <InsightsSection/>
          <HomepageTweetMarquee />
          <QualityCertificationsSection />
          <div className="h-[5vh]"></div>
          <BusinessStatistics/>
        </div>
        
        {/* Spacer */}
        <div style={{ height: '40vh' }}></div>
      </main>
      
      {/* Footer */}
      <div 
        ref={footerRef} 
        className="fixed bottom-0 left-0 w-full z-40"
        style={{ 
          transform: footerTransform,
          transition: 'transform 0.1s linear',
          willChange: 'transform'
        }}
      >
        <IQGroupFooter />
      </div>
    </div>
  );
}