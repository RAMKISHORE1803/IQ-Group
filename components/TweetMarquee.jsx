'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

// Client Component wrapper that handles GSAP animations only
const TweetMarqueeWrapper = ({ 
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = "",
  title = "LATEST UPDATES FROM TWITTER",
  showTitle = true 
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    // GSAP Infinite Loop Carousel Animation
    const setupInfiniteCarousel = () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      // Kill existing animation
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Wait for tweets to load before setting up animation
      const checkAndSetup = () => {
        const children = Array.from(scroller.children);
        
        // Check if tweets are loaded by looking for tweet content
        const loadedTweets = scroller.querySelectorAll('[data-testid="tweet"]');
        const hasSkeletons = scroller.querySelectorAll('[data-testid="tweetSkeleton"]');
        
        // Wait if we still have skeletons or no tweets loaded
        if (children.length === 0 || (loadedTweets.length === 0 && hasSkeletons.length > 0)) {
          setTimeout(checkAndSetup, 200);
          return;
        }

        // Get the original tweet count (before cloning)
        const originalTweetCount = children.length;
        
        // Remove any existing clones first
        const existingClones = scroller.querySelectorAll('[data-clone="true"]');
        existingClones.forEach(clone => clone.remove());
        
        // Clone children for seamless loop
        const originalChildren = Array.from(scroller.children);
        const clonedChildren = originalChildren.map(child => {
          const clone = child.cloneNode(true);
          clone.setAttribute('data-clone', 'true');
          return clone;
        });
        
        // Append cloned children for seamless loop
        clonedChildren.forEach(clone => {
          scroller.appendChild(clone);
        });

        // Calculate distances
        const firstChild = originalChildren[0];
        if (!firstChild) return;
        
        const itemWidth = firstChild.getBoundingClientRect().width + 16; // 16px gap
        const totalItemsWidth = itemWidth * originalChildren.length;

        // Speed mapping (pixels per second)
        const speedMap = {
          slow: 50,
          normal: 100,
          fast: 200
        };
        const pixelsPerSecond = speedMap[speed] || 100;
        const duration = totalItemsWidth / pixelsPerSecond;

        // Set initial position
        gsap.set(scroller, {
          x: direction === 'left' ? 0 : -totalItemsWidth
        });

        // Create infinite loop animation
        animationRef.current = gsap.to(scroller, {
          x: direction === 'left' ? -totalItemsWidth : 0,
          duration: duration,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: function(x) {
              // Create seamless loop by resetting position
              const xNum = parseFloat(x);
              if (direction === 'left') {
                return ((xNum % totalItemsWidth) + totalItemsWidth) % totalItemsWidth - totalItemsWidth + "px";
              } else {
                return ((xNum % totalItemsWidth) - totalItemsWidth) % totalItemsWidth + "px";
              }
            }
          }
        });

        // Pause on hover if enabled
        if (pauseOnHover && containerRef.current) {
          const container = containerRef.current;
          
          const handleMouseEnter = () => {
            if (animationRef.current) animationRef.current.pause();
          };
          
          const handleMouseLeave = () => {
            if (animationRef.current) animationRef.current.play();
          };

          container.addEventListener('mouseenter', handleMouseEnter);
          container.addEventListener('mouseleave', handleMouseLeave);

          // Cleanup event listeners
          return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
          };
        }
      };

      // Initial setup with longer delay to ensure server components are rendered
      setTimeout(checkAndSetup, 1000);
    };

    // Setup animation after a brief delay to ensure DOM is ready
    const timeoutId = setTimeout(setupInfiniteCarousel, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [direction, speed, pauseOnHover, children]);

  return (
    <div className={`tweet-marquee-container py-8 ${className}`}>
      {/* Title Section */}
      {showTitle && (
        <div className="container mx-auto px-4 md:px-0 mb-8">
          <h2 className="font-bold font-lato text-left text-[#203663] mb-4 md:pt-4 lg:text-[40px]">
            {title}
          </h2>
        </div>
      )}
      
      {/* Marquee Section */}
      <div
        ref={containerRef}
        className="scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
      >
        <div
          ref={scrollerRef}
          className="flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default TweetMarqueeWrapper;