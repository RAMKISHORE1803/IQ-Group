'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the HeroCarousel component to reduce initial load time
const HeroCarousel = dynamic(() => import('@/components/hero/HeroCarousel'), {
  ssr: true,
  loading: () => <HeroLoading />
});

// Loading placeholder
function HeroLoading() {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#010A4E] to-[#041174] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-white rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen">
      <Suspense fallback={<HeroLoading />}>
        <HeroCarousel />
      </Suspense>
    </section>
  );
} 