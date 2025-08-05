import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Main Page Transition Wrapper Component
const PageTransitionWrapper = ({ 
  children, 
  className = "",
  transitionKey,
  duration = 1.2,
  overlayColor = "from-gray-900 via-black to-gray-900",
  loadingDots = true,
  overlayImage = "/logo/3.png"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Start the blue overlay animation immediately
    const timer = setTimeout(() => {
      // Only show the content after the overlay animation has started
      setIsVisible(true);
      setInitialLoad(false);
    }, 300); // Slight delay to ensure overlay starts first

    return () => clearTimeout(timer);
  }, [transitionKey]);

  return (
    <>
      {/* Blue overlay animation - Always starts first */}
      {/* <AnimatePresence onExitComplete={() => setAnimationComplete(true)}>
        {!animationComplete && (
          <motion.div
            key={`overlay-${transitionKey}`}
            className={`fixed inset-0 z-50 bg-[#203663] pointer-events-none w-[200vw] flex flex-row justify-center items-center`}
            initial={{ x: '0%' }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 2,
              ease: [0.76, 0, 0.24, 1] 
            }}
          >
            <div className='w-[100vw] h-[100vh] bg-[#203663]'></div>
            <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-[#203663]'>
                <Image src="/logo/2.png" alt="logo" width={700} height={400} />
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Page Content with Entry Animation - Delayed */}
      {/* <AnimatePresence mode="wait"> */}
        <motion.div
          // key={transitionKey}
          // className={`min-h-screen ${className}`}
          // initial={{ opacity: 0 }}
          // animate={{ opacity: isVisible ? 1 : 0 }}
          // exit={{ opacity: 0 }}
          // transition={{ 
          //   duration: 0.3, 
          //   delay: 1, // Longer delay to ensure blue animation is well underway
          //   ease: [0.34, 1, 0.22, 1]
          // }}
          // style={{ 
          //   visibility: initialLoad ? 'hidden' : 'visible' // Hide content completely on initial load
          // }}
        >
          {children}
        </motion.div>
      {/* </AnimatePresence> */}
    </>
  );
};

export default PageTransitionWrapper;