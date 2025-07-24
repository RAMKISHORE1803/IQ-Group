"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Global Sourcing Network",
    description:
      "Our extensive network spans across continents, connecting premium material sources with industries worldwide. We carefully select partners who share our commitment to quality, sustainability, and ethical business practices.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#324390,#4A5CA0)] text-white">
        <Image 
          src="/Images/HeroSection/global-map.png" 
          alt="Global Sourcing Network"
          width={300}
          height={200}
          className="object-contain"
        />
      </div>
    ),
  },
  {
    title: "Quality Assurance",
    description:
      "Every material undergoes rigorous testing and certification. Our comprehensive quality control system ensures consistent excellence from source to delivery, giving manufacturers the confidence to build their reputation on our materials.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/Images/QualityCertificate/usa-accreditation.svg"
          width={200}
          height={200}
          className="h-full w-full object-contain p-8"
          alt="Quality Certification"
        />
      </div>
    ),
  },
  {
    title: "Logistics Excellence",
    description:
      "Our strategic infrastructure with storage hubs and bulk terminals enables seamless global distribution. We manage high-volume delivery without delay or compromise, ensuring materials reach you exactly when needed.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#203663,#324390)] text-white">
        <Image 
          src="/Images/market/logistics.png" 
          alt="Logistics Excellence"
          width={300}
          height={200}
          className="object-contain"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=300";
          }}
        />
      </div>
    ),
  },
  {
    title: "Industry Expertise",
    description:
      "With over 20 years of experience across diverse sectors, we understand the unique material requirements of each industry we serve. From steel to aerospace, ceramics to batteries, our technical knowledge drives your success.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,#1E3157,#324390)] text-white">
        <Image 
          src="/Images/products/ferro-alloys/ferro-silicon.jpg" 
          alt="Industry Expertise"
          width={300}
          height={200}
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=300";
          }}
        />
      </div>
    ),
  },
];

export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
} 