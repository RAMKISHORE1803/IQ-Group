import React from 'react';

const FontDemo = () => {
  return (
    <section className="py-12 text-black bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Font Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-4">Geist Sans (Default)</h3>
            <p className="mb-4">This is text using the default Geist Sans font.</p>
            <p className="font-bold mb-4">This is bold text using Geist Sans.</p>
            <p className="italic mb-4">This is italic text using Geist Sans.</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-4 font-serif">Merriweather (Serif)</h3>
            <p className="mb-4 font-serif">This is text using the Merriweather serif font.</p>
            <p className="font-bold mb-4 font-serif">This is bold text using Merriweather.</p>
            <p className="italic mb-4 font-serif">This is italic text using Merriweather.</p>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-8">System Fonts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-4 font-times">Times New Roman</h3>
            <p className="mb-4 font-times">This is text using Times New Roman.</p>
            <p className="font-bold mb-4 font-times">This is bold text using Times New Roman.</p>
            <p className="italic mb-4 font-times">This is italic text using Times New Roman.</p>
            <p className="text-lg mb-4 text-times">Using text-times utility class.</p>
            <p className="heading-times mb-4">Using heading-times utility classes.</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-4 font-arial">Arial</h3>
            <p className="mb-4 font-arial">This is text using Arial.</p>
            <p className="font-bold mb-4 font-arial">This is bold text using Arial.</p>
            <p className="italic mb-4 font-arial">This is italic text using Arial.</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-4 font-georgia">Georgia</h3>
            <p className="mb-4 font-georgia">This is text using Georgia.</p>
            <p className="font-bold mb-4 font-georgia">This is bold text using Georgia.</p>
            <p className="italic mb-4 font-georgia">This is italic text using Georgia.</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-4 font-verdana">Verdana</h3>
            <p className="mb-4 font-verdana">This is text using Verdana.</p>
            <p className="font-bold mb-4 font-verdana">This is bold text using Verdana.</p>
            <p className="italic mb-4 font-verdana">This is italic text using Verdana.</p>
          </div>
        </div>
        
        <div className="mt-12 p-6 border rounded-lg">
          <h2 className="text-2xl font-bold mb-4">How to Use Fonts in Your Project</h2>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <pre className="font-mono text-sm">
              {`<!-- Using Tailwind classes -->
<p class="font-times">Times New Roman text</p>
<p class="font-serif">Merriweather text</p>

<!-- Using utility classes -->
<p class="text-times">Times New Roman text</p>
<p class="heading-times">Times New Roman heading</p>

<!-- Using inline styles -->
<p style="font-family: var(--font-times-new-roman)">Times New Roman text</p>`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FontDemo; 