"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import TweetEmbed from "./TweetEmbed";



// Loading skeleton component for tweets
const TweetSkeleton = () => (
  <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden p-4">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
    <div className="mt-4 flex justify-between">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </div>
  </div>
);

const TweetMarquee = ({
  tweetUrls,
  title = "LATEST UPDATES FROM TWITTER",
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = "",
  showTitle = true,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tweetsRendered, setTweetsRendered] = useState(false);

  // Initialize animation after component mounts
  useEffect(() => {
    if (tweetUrls.length > 0) {
      // Give time for tweets to render before starting animation
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [tweetUrls]);

  // Set up animation after loading state changes
  useEffect(() => {
    if (!loading && scrollerRef.current) {
      const setupAnimation = () => {
        if (containerRef.current && scrollerRef.current) {
          try {
            // Clone the content for seamless looping
            const scrollerContent = Array.from(scrollerRef.current.children);
            scrollerContent.forEach((item) => {
              const duplicatedItem = item.cloneNode(true);
              if (scrollerRef.current) {
                scrollerRef.current.appendChild(duplicatedItem);
              }
            });
            
            // Set animation properties
            getDirection();
            getSpeed();
            setStart(true);
            setTweetsRendered(true);
          } catch (error) {
            console.error("Error setting up animation:", error);
          }
        }
      };
      
      setupAnimation();
      
      // Add a mutation observer to detect when tweets are fully loaded
      const observer = new MutationObserver((mutations) => {
        if (!tweetsRendered) {
          setupAnimation();
        }
      });
      
      observer.observe(scrollerRef.current, { 
        childList: true, 
        subtree: true, 
        attributes: true 
      });
      
      return () => observer.disconnect();
    }
  }, [loading, tweetsRendered]);
  
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "45s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "50s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "100s");
      }
    }
  };
  
  // Convert x.com URLs to twitter.com URLs
  const normalizedTweetUrls = tweetUrls.map(url => 
    url.replace('x.com', 'twitter.com')
  );
  
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
        {loading ? (
          <div className="flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4">
            {Array(4).fill(0).map((_, idx) => (
              <div
                className="relative w-[400px] max-w-full flex-shrink-0 px-4"
                key={`skeleton-${idx}`}
              >
                <div className="tweet-card bg-white rounded-lg shadow-md overflow-hidden h-[220px]">
                  <TweetSkeleton />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollerRef}
            className={`flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 ${
              start ? "animate-scroll" : ""
            } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
          >
            {normalizedTweetUrls.map((url, idx) => (
              <div
                className="relative w-[400px] max-w-full flex-shrink-0 "
                key={`tweet-${idx}`}
              >
                <div className="tweet-card bg-white rounded-lg shadow-md overflow-hidden h-[300px]">
                  <Suspense fallback={<TweetSkeleton />}>
                    <TweetEmbed tweetUrl={url} />
                  </Suspense>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetMarquee; 