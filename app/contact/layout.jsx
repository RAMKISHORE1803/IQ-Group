'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import IQGroupFooter from '../landing/footer';

export default function ContactLayout({ children }) {
  const contentWrapperRef = useRef(null);
  const footerRef = useRef(null);
  const [footerTransform, setFooterTransform] = useState('translateY(100%)');

  // Calculate footer position based on scroll
  const handleScroll = useCallback(() => {
    if (!contentWrapperRef.current || !footerRef.current) return;
    
    // Get content dimensions
    const contentRect = contentWrapperRef.current.getBoundingClientRect();
    const contentBottom = contentRect.bottom;
    
    // Get viewport height
    const viewportHeight = window.innerHeight;
    
    // Calculate how close we are to the bottom
    // Start showing footer when we're 300px from reaching the end
    const triggerDistance = 300;
    const distanceFromBottom = contentBottom - viewportHeight;
    
    if (distanceFromBottom <= triggerDistance && distanceFromBottom >= 0) {
      // Calculate progress (0 to 1) based on how close we are to the bottom
      const progress = 1 - (distanceFromBottom / triggerDistance);
      
      // Apply transform and opacity based on progress
      setFooterTransform(`translateY(${100 - (progress * 100)}%)`);
      
    } else if (distanceFromBottom < 0) {
      // Fully show footer when we've scrolled past the end
      setFooterTransform('translateY(0%)');
      
    } else {
      // Hide footer when we're not near the end
      setFooterTransform('translateY(100%)');
      
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="relative bg-white">
      {/* Main content */}
      <div ref={contentWrapperRef} className="min-h-screen">
        {children}
        {/* Spacer to ensure content is tall enough */}
        <div style={{ height: '40vh' }}></div>
      </div>
      
      {/* Footer - fixed position at bottom */}
      <div 
        ref={footerRef} 
        className="fixed bottom-0 left-0 w-full z-40"
        style={{ 
          transform: footerTransform,
          transition: 'transform 0.1s linear',
          willChange: 'transform, opacity'
        }}
      >
        <IQGroupFooter />
      </div>
    </div>
  );
}
