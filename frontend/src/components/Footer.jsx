import React from 'react';

export default function Footer({ setView }) {
  const handleNavClick = (anchor) => {
    setView('landing');
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#f8f9fa] border-t-3 border-black py-12 px-6 md:px-12 text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Brand info */}
        <div>
          <button 
            onClick={() => handleNavClick('hero')} 
            className="font-montserrat font-black text-2xl text-black uppercase focus:outline-none cursor-pointer"
          >
            paradox<span className="text-primary">.</span>
          </button>
          <p className="font-poppins text-xs text-gray-500 mt-2">
            Turning contradictions into conversions.
          </p>
        </div>

        {/* Navigation list */}
        <nav className="font-montserrat font-bold text-xs uppercase tracking-wide">
          <ul className="flex flex-wrap gap-6 text-gray-600">
            <li>
              <button onClick={() => handleNavClick('value')} className="hover:text-primary transition-colors cursor-pointer">
                Approach
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('services')} className="hover:text-primary transition-colors cursor-pointer">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('cases')} className="hover:text-primary transition-colors cursor-pointer">
                Case Studies
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('contact')} className="hover:text-primary transition-colors cursor-pointer">
                Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Copyright */}
        <div className="font-poppins text-[10px] text-gray-400 font-medium md:text-right select-none">
          &copy; 2026 Paradox Agency.
        </div>

      </div>
    </footer>
  );
}
