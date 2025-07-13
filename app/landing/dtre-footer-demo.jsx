'use client'
import React from 'react';
import DTREStyleFooter from './dtre-footer';

export default function DTREFooterDemo() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-white p-8">
        <h1 className="text-3xl font-bold mb-4">DTRE Footer Demo</h1>
        <p className="mb-4">This page demonstrates the DTRE-style footer implementation.</p>
        <p>Scroll down to see the footer.</p>
        
        {/* Add some space to make scrolling necessary */}
        <div className="h-[1vh]"></div>
      </main>
      
      <DTREStyleFooter />
    </div>
  );
} 