'use client';

import { forwardRef } from 'react';

const OverlayContentWrapper = forwardRef(({ children, className = "" }, ref) => {
  return (
    <div 
      ref={ref}
      className={`relative bg-[#fbfbfb] ${className}`}
      style={{ 
        zIndex: 10, // Above pinned GlobalMap
        minHeight: '100vh' // Ensure enough content to scroll over
      }}
    >
      {children}
    </div>
  );
});

OverlayContentWrapper.displayName = 'OverlayContentWrapper';

export default OverlayContentWrapper;