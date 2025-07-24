"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  items = [
    
  ]
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-[1300px]  overflow-hidden ",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[400px] max-w-full shrink-0"
            key={item.name + idx}
          >
            <motion.div
              className="relative aspect-[4/3] bg-cover bg-center bg-no-repeat overflow-hidden group cursor-pointer flex-shrink-0 "
              style={{ 
                backgroundImage: `url(${item.image})`
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black opacity-20" />
              
              {/* Category Label */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-black bg-opacity-60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  {item.category || "SUCCESS STORY"}
                </span>
              </div>
              
              {/* Floating Glassy overlay - small at bottom, full card on hover */}
              <motion.div
                className="absolute bg-white/70 bg-opacity-40 backdrop-blur-md rounded-lg overflow-hidden"
                initial={{ 
                  bottom: "16px",
                  left: "16px",
                  right: "16px",
                  top: "auto",
                  height: "120px"
                }}
                whileHover={{ 
                  top: "0px",
                  bottom: "0px",
                  left: "0px",
                  right: "0px",
                  height: "100%",
                  borderRadius: "0px",
                  zIndex: 50,
                  opacity: 1
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.4, 0, 0.2, 1],
                  type: "tween"
                }}
              >
                {/* Default content - always visible */}
                <div className="relative z-10 p-4">
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-lato font-light text-[28px] line-clamp-2 group-hover:line-clamp-none text-ellipsis overflow-hidden text-black leading-tight transition-all duration-300">
                    {item.name}
                  </h3>
                </div>
                
                {/* Expanded content - only visible on hover for desktop */}
                <div className="px-4 pb-4 opacity-0 group-hover:opacity-100">
                  <div className="text-gray-800 text-[16px] font-onest font-light leading-relaxed mb-4">
                    <p className="italic mb-4">&quot;{item.quote}&quot;</p>
                    <p className="font-medium text-[#1a365d] mt-2">{item.title}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}; 