"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

interface Story {
  quote: string;
  name: string;
  title: string;
  image: string;
}

interface InfiniteMovingCardsDemoProps {
  stories?: Story[];
}

export default function InfiniteMovingCardsDemo({ stories = defaultSuccessStories }: InfiniteMovingCardsDemoProps) {
  return (
    <div className="lg:min-h-[50vh] rounded-md flex flex-col antialiased bg-gray-50 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-start relative overflow-hidden">
      
      <InfiniteMovingCards
        items={stories}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const defaultSuccessStories = [
  {
    quote:
      "IQ Group's consistent supply of high-grade iron ore allowed us to maintain production during a critical global shortage, saving us an estimated €2.3M in potential downtime.",
    name: "European Steel Manufacturing Co.",
    title: "Uninterrupted Production During Supply Crisis",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote:
      "By implementing IQ Group's specialized alloy solutions, we reduced production defects by 37% while improving overall product performance in high-stress applications.",
    name: "Asian Steel Group",
    title: "Quality Improvement & Cost Reduction",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote: "Our partnership with IQ Group enabled us to develop a new high-performance steel grade that's now our flagship product, increasing our market share by 14% in just 18 months.",
    name: "North American Steel Corp",
    title: "Market-Leading Product Innovation",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote:
      "IQ Group's integrated supply chain solution reduced our raw material inventory by 28% while maintaining 99.7% production uptime—a game-changer for our operational efficiency.",
    name: "Global Manufacturing Alliance",
    title: "Supply Chain Transformation",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
  },
  {
    quote:
      "With IQ Group's sustainable materials program, we've reduced our carbon footprint by 22% while meeting increasing regulatory requirements and customer demand for greener steel.",
    name: "Industrial Metals Corp",
    title: "Sustainable Manufacturing Leadership",
    image: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=2070&auto=format&fit=crop"
  },
]; 