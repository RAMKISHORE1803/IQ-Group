'use client';

import { useEffect, useRef } from "react";

import Landing from "./landing/page";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const smoother = useRef(null);
  const wrapper = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    // Initialize ScrollSmoother
    smoother.current = ScrollSmoother.create({
      wrapper: wrapper.current,
      content: content.current,
      smooth: 1.5, // How long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // Enables the effects like smooth scrolling
      smoothTouch: 0.1, // Much shorter smooth time for touch devices (default is NO smoothing for touch devices)
    });

    // Clean up on component unmount
    return () => {
      if (smoother.current) {
        smoother.current.kill();
      }
    };
  }, []);

  return (
    <div ref={wrapper} className="smooth-wrapper min-h-screen">
      <div ref={content} className="smooth-content min-h-screen">
        <Landing />
      </div>
    </div>
  );
}
