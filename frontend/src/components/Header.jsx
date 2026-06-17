import React from 'react';

export default function Header() {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-impact-white border-b-2 border-black py-4 px-6 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo containing Icon and Text */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          <img src="/paradox-icon.png" alt="Paradox Icon" className="h-[28px] w-auto object-contain" />
          <img src="/paradox-text.png" alt="Paradox Logo" className="h-[18px] w-auto object-contain" />
        </button>

        {/* Desktop Nav & CTA */}
        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => handleScroll('approach')}
            className="font-bold text-[0.95rem] text-black hover:text-[#046bd2] transition-colors font-sans cursor-pointer"
          >
            Approach
          </button>
          <button 
            onClick={() => handleScroll('services')}
            className="font-bold text-[0.95rem] text-black hover:text-[#046bd2] transition-colors font-sans cursor-pointer"
          >
            Services
          </button>
          <button 
            onClick={() => handleScroll('results')}
            className="font-bold text-[0.95rem] text-black hover:text-[#046bd2] transition-colors font-sans cursor-pointer"
          >
            Results
          </button>
          <button 
            onClick={() => handleScroll('testimonials')}
            className="font-bold text-[0.95rem] text-black hover:text-[#046bd2] transition-colors font-sans cursor-pointer"
          >
            Testimonials
          </button>

          <button 
            onClick={() => handleScroll('contact')}
            className="bg-[#e03131] hover:bg-[#c92a2a] text-white px-[18px] py-[8px] font-bold text-[0.95rem] font-sans border-2 border-black rounded-[4px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ml-4"
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu toggle (simple version for this replica) */}
        <button 
          className="md:hidden flex flex-col justify-between w-[26px] h-[18px] bg-transparent border-none cursor-pointer focus:outline-none"
          onClick={() => handleScroll('contact')}
        >
          <span className="w-full h-[3px] bg-black"></span>
          <span className="w-full h-[3px] bg-black"></span>
          <span className="w-full h-[3px] bg-black"></span>
        </button>
      </div>
    </header>
  );
}
