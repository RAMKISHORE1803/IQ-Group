"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import TweetEmbed from "./TweetEmbed";

// Loading skeleton component for tweets
const TweetSkeleton = () => (
  <div className="animate-pulse bg-white rounded-lg shadow-md md:max-h-[400px] max-h-[300px] overflow-hidden p-4">
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
  tweetUrls = [],
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
  const [error, setError] = useState(null);

  // Convert x.com URLs to twitter.com URLs
  const normalizedTweetUrls = tweetUrls?.map(url => 
    url?.replace('x.com', 'twitter.com') || ""
  ).filter(url => url.length > 0);
  
  // Initialize animation after component mounts
  useEffect(() => {
    if (!normalizedTweetUrls || normalizedTweetUrls.length === 0) {
      setError("No valid tweet URLs provided");
      setLoading(false);
      return;
    }
    
    // Give time for tweets to render before starting animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Increased timeout for better loading chance
    
    return () => clearTimeout(timer);
  }, [normalizedTweetUrls]);

  // Set up animation after loading state changes
  useEffect(() => {
    if (error || loading || !scrollerRef.current) return;
    
    try {
      // Clone the content for seamless looping
      if (scrollerRef.current && scrollerRef.current.children.length > 0) {
        const scrollerContent = Array.from(scrollerRef.current.children);
        
        // Only clone if we have actual content
        if (scrollerContent.length > 0) {
          scrollerContent.forEach((item) => {
            if (item && scrollerRef.current) {
              const duplicatedItem = item.cloneNode(true);
              scrollerRef.current.appendChild(duplicatedItem);
            }
          });
        }
      }
      
      // Set animation properties
      if (containerRef.current) {
        // Set direction
        containerRef.current.style.setProperty(
          "--animation-direction",
          direction === "left" ? "forwards" : "reverse"
        );
        
        // Set speed
        let animationDuration = "50s";
        if (speed === "fast") {
          animationDuration = "45s";
        } else if (speed === "slow") {
          animationDuration = "100s";
        }
        containerRef.current.style.setProperty("--animation-duration", animationDuration);
        
        // Start animation
        setStart(true);
      }
    } catch (err) {
      console.error("Error setting up animation:", err);
      setError("Failed to set up animation");
    }
  }, [loading, direction, speed]);
  
  // If we have an error, show it
  if (error && !loading) {
    return (
      <div className={`tweet-marquee-container py-8 ${className}`}>
        {showTitle && (
          <div className="container mx-auto px-4 md:px-0 mb-8">
            <h2 className="font-bold font-lato text-left text-[#203663] mb-4 md:pt-4 lg:text-[40px]">
              {title}
            </h2>
          </div>
        )}
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          Error loading tweets: {error}
        </div>
      </div>
    );
  }
  
  // If we have no tweets, don't render anything
  if (!normalizedTweetUrls || normalizedTweetUrls.length === 0) {
    return null;
  }
  
  return (
    <div className={`tweet-marquee-container py-8 ${className}`}>
      {/* Title Section */}
      {/* {showTitle && (
        <div className="container mx-auto px-4 md:px-0 mb-8">
          <h2 className="font-bold font-lato text-left text-[#203663] mb-4 md:pt-4 lg:text-[40px]">
            {title}
          </h2>
        </div>
      )} */}
      
      {/* Marquee Section */}
      <div
        ref={containerRef}
        className="scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
      >
        {loading ? (
          <div className="flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4">
            {Array(4).fill(0).map((_, idx) => (
              <div
                className="relative w-[400px] max-w-full  flex-shrink-0 px-4"
                key={`skeleton-${idx}`}
              >
                <div className="tweet-card bg-white rounded-lg shadow-md overflow-hidden h-full">
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
                className="relative w-[500px] max-w-full flex-shrink-0 "
                key={`tweet-${idx}`}
              >
                <div className="tweet-card bg-white shadow-md overflow-hidden min-h-[400px] md:min-h-[600px] md:max-h-[600px] max-h-[300px] ">
                  <Suspense fallback={<TweetSkeleton />}>
                    <TweetEmbed tweetUrl={url} className="h-full w-full"/>
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