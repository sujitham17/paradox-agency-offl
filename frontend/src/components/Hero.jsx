import React, { useState, useEffect } from 'react';
import ThreeScene from './ThreeScene';

export default function Hero() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const line1Text = 'STRATEGY THAT WORKS.';
  const line2Text = 'RESULTS THAT SHOW.';

  useEffect(() => {
    let index1 = 0;
    let index2 = 0;
    
    // Brief settle delay before starting
    const startTimeout = setTimeout(() => {
      const timer1 = setInterval(() => {
        if (index1 < line1Text.length) {
          setLine1((prev) => prev + line1Text.charAt(index1));
          index1++;
        } else {
          clearInterval(timer1);
          // Pause between lines, then type line 2
          const pauseTimeout = setTimeout(() => {
            const timer2 = setInterval(() => {
              if (index2 < line2Text.length) {
                setLine2((prev) => prev + line2Text.charAt(index2));
                index2++;
              } else {
                clearInterval(timer2);
              }
            }, 65);
          }, 350);
        }
      }, 65);
    }, 600);

    return () => {
      clearTimeout(startTimeout);
    };
  }, []);

  const handleLearnMore = () => {
    const el = document.getElementById('value');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-[#f8f9fa] border-b-3 border-black py-16 px-6 md:px-12 overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:24px_24px] opacity-70 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="bg-[#000000] p-4 neo-border mb-6">
            <img src="/paradox-logo-trans.png" alt="Paradox Logo" className="h-10 sm:h-12 object-contain" />
          </div>

          <h1 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-none tracking-tight mb-6 uppercase min-h-[90px] md:min-h-[140px]">
            <span className="text-primary">{line1}</span>
            <br />
            <span className="text-black">{line2}</span>
            {line2.length < line2Text.length && (
              <span className="inline-block w-1.5 h-8 sm:h-10 bg-black cursor-blink ml-1 align-middle"></span>
            )}
          </h1>

          <p className="font-poppins text-lg text-gray-700 max-w-xl mb-8 leading-relaxed">
            We help brands grow through smart strategy, sharp creative, and campaigns that actually convert. The ultimate marketing paradox: focus narrows, results expand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={handleLearnMore}
              className="bg-primary hover:bg-blue-600 text-white font-montserrat font-black text-sm uppercase px-8 py-4 neo-border neo-shadow neo-shadow-hover neo-shadow-active text-center cursor-pointer"
            >
              Know More &rarr;
            </button>
            <a 
              href="#contact"
              className="bg-accent hover:bg-yellow-400 text-black font-montserrat font-black text-sm uppercase px-8 py-4 neo-border neo-shadow neo-shadow-hover neo-shadow-active text-center cursor-pointer"
            >
              Book Strategy Call
            </a>
          </div>
        </div>

        {/* Right Side 3D Three.js Canvas */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="w-full max-w-[450px] lg:max-w-none">
            <ThreeScene />
          </div>
        </div>
      </div>
    </section>
  );
}
