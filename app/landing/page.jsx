'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import AboutSection from './about-section';
import CompanySection from './company-section';
import GlobalConstructionPlatform from './globalMap';
import IndustriesSection from './industries-section';
import BCGCareersSection from './careerSection';
import InsightsSection from './insight-section';
import BusinessStatistics from './BusinessStatistics';
import IQGroupFooter from './footer';
import QualityCertificationsSection from './QualityCertificationsSection';
import CustomerMarqueeSection from '../../components/customer-marquee-section';
import Associates from '../../components/associates';
import HomepageTweetMarquee from '../../components/HomepageTweetMarquee';
import HeroSection from './hero-section';
import DesktopGlobalMapAnimation from '../landingComponent/DesktopGlobalMap';
import MobileGlobalMapAnimation from '../landingComponent/MobileGLobalMap';
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

export default function LandingPage() {
  // const globalMapWrapperRef = useRef(null);
  // const globalMapContentRef = useRef(null);
  const industriesRef = useRef(null);
  // const scrollTriggersRef = useRef([]); // Track our specific triggers
  const contentWrapperRef = useRef(null);
  const footerRef = useRef(null);
  const [footerTransform, setFooterTransform] = useState('translateY(100%)');

  

  // Calculate footer position based on scroll
    const handleFooterScroll = useCallback(() => {
      if (!contentWrapperRef.current || !footerRef.current) return;
      
    
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      
      const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
      const triggerDistance = 300;
      
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
      // Only keep footer scroll logic
      window.addEventListener('scroll', handleFooterScroll);
      handleFooterScroll();
    
      const handleResize = debounce(() => {
        handleFooterScroll();
      }, 250);
      
      window.addEventListener('resize', handleResize);
    
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleFooterScroll);
      };
    }, [handleFooterScroll]);

  // useEffect(() => {
  //   if (typeof window === 'undefined') return;

  //   gsap.registerPlugin(ScrollTrigger);

    // const setupCurtainReveal = () => {
    //   if (!globalMapWrapperRef.current || !globalMapContentRef.current) return;

    //   // Clear only OUR triggers, not all triggers
    //   scrollTriggersRef.current.forEach(trigger => trigger.kill());
    //   scrollTriggersRef.current = [];

     
    //   gsap.set([globalMapWrapperRef.current, globalMapContentRef.current], {
    //     clearProps: "all"
    //   });

     
    //   gsap.set(globalMapWrapperRef.current, {
    //     overflow: 'hidden',
    //     position: 'relative',
    //     height: '100vh'
    //   });

      
    //   gsap.set(globalMapContentRef.current, {
    //     y: '-20vh', 
    //     willChange: 'transform'
    //   });

     
    //   const trigger1 = ScrollTrigger.create({
    //     trigger: globalMapWrapperRef.current,
    //     start: "top 90%",   
    //     end: "top 10%",     
    //     scrub: 1,             
    //     markers: false,
    //     invalidateOnRefresh: true,
    //     animation: gsap.to(globalMapContentRef.current, {
    //       y: 0,
    //       ease: "none", 
    //     }),
        
    //     onLeave: () => {
    //       console.log("GlobalMap animation complete - releasing constraints");
          
    //       gsap.set(globalMapWrapperRef.current, {
    //         height: 'auto',
    //         overflow: 'visible',
    //         position: 'relative'
    //       });
          
    //       gsap.set(globalMapContentRef.current, {
    //         y: 0,
    //         transform: 'none',
    //         willChange: 'auto'
    //       });
          
         
    //       ScrollTrigger.refresh();
    //     },
        
    //     onEnterBack: () => {
    //       console.log("Re-entering GlobalMap animation area");
          
    //       gsap.set(globalMapWrapperRef.current, {
    //         height: '100vh',
    //         overflow: 'hidden',
    //         position: 'relative'
    //       });
          
    //       gsap.set(globalMapContentRef.current, {
    //         willChange: 'transform'
    //       });
    //     }
    //   });

    //   scrollTriggersRef.current.push(trigger1);
    // };

    // const setupIndustriesAnimation = () => {
    //   if (!industriesRef.current || !globalMapContentRef.current) return;
      
    //   const trigger2 = ScrollTrigger.create({
    //     trigger: globalMapContentRef.current,
    //     start: "bottom bottom",
    //     endTrigger: industriesRef.current,
    //     end: "top top",
    //     pin: globalMapContentRef.current,
    //     pinSpacing: false,
    //     scrub: 1.5, 
    //     markers: false,
    //     animation: gsap.fromTo(industriesRef.current, {
    //       yPercent: 0,
    //       willChange: 'transform'
    //     }, {
    //       y: 0,
    //       ease: "power2.inOut",
    //     })
    //   });

    //   scrollTriggersRef.current.push(trigger2);
    // };

    // const initTimeout = setTimeout(() => {
    //   setupCurtainReveal();
    //   setupIndustriesAnimation();
    // }, 100);

    // Add scroll event listener for footer
    // window.addEventListener('scroll', handleFooterScroll);
    
    // Initial check
    // handleFooterScroll();

    // const handleResize = debounce(() => {
    //   setupCurtainReveal();
    //   setupIndustriesAnimation();
    //   handleFooterScroll();
    // }, 250);
    
    // window.addEventListener('resize', handleResize);

    // return () => {
    //   clearTimeout(initTimeout);
    //   window.removeEventListener('resize', handleResize);
    //   window.removeEventListener('scroll', handleFooterScroll);
      
      
    //   scrollTriggersRef.current.forEach(trigger => trigger.kill());
    //   scrollTriggersRef.current = [];
    // };
  // }, [handleFooterScroll]);

  return (
    <div className="bg-[#000000] z-[2]">
      <main className="relative" ref={contentWrapperRef}>
        {/* Normal scrolling sections */}
        {/* <DTREHeroCarousel /> */}
        <HeroSection />
          <AboutSection />
          
        {/* <QualitySection /> */}
        <div className='bg-[#fbfbfb]'>
          
          <CompanySection />
          <CustomerMarqueeSection />
          
        </div>
        
        {/* GlobalMap wrapper */}
        {/* <div ref={globalMapWrapperRef} className="relative hidden md:block">
          <div className='md:block hidden h-[15vh] bg-[#000]'></div>
          <div ref={globalMapContentRef} className="will-change-transform">
          <GlobalConstructionPlatform />
          <div className='md:block hidden h-[10vh] bg-[#000]'></div>
          </div>
          
        </div> */}

        {/* Desktop GlobalMap Animation */}
<DesktopGlobalMapAnimation industriesRef={industriesRef}>
  <GlobalConstructionPlatform />
</DesktopGlobalMapAnimation>

{/* Mobile GlobalMap Animation */}
<MobileGlobalMapAnimation>
  <GlobalConstructionPlatform />
</MobileGlobalMapAnimation>

       {/* <div className='md:hidden block '>
        
        <GlobalConstructionPlatform />
        <div className='h-[10vh]'></div>
       </div>
         */}
        {/* Industries section */}
        <div ref={industriesRef} className="min-h-[70vh] xl:min-h-[100vh] bg-[#fbfbfb] text-white text-4xl">
          {/* <Associates /> */}
        
            <Associates/>

        
          <IndustriesSection/>
          
         
         
           
           <InsightsSection/>

           <HomepageTweetMarquee />
           
           {/* <div className="h-[5vh]"></div> */}
          <QualityCertificationsSection />
          <div className="h-[5vh]"></div>
          <BCGCareersSection />
          <div className='md:h-[6vh]'></div>
          <BusinessStatistics/>
          
        </div>
        
        {/* Spacer to ensure content is tall enough */}
        {/* <div style={{ height: '30vh' }}></div> */}
      </main>
      
      {/* Footer - fixed position at bottom */}
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