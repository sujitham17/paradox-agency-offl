import React from 'react';

export default function Marquee({ onViewDetails }) {
  const caseStudies = [
    {
      company: 'My Hanoi Trip',
      category: 'Travel Agency',
      logo: '/my-hanoi-logo.jpeg',
      service: 'Campaign Voice-overs & Storytelling',
      result: '2x leads through organic content',
      textColor: 'text-[#046bd2]',
      buttonColor: 'bg-[#046bd2] hover:bg-[#0352a2]',
    },
    {
      company: 'Muvidha Styles',
      category: 'Clothing Brand',
      logo: '/muvidha-logo.jpeg',
      service: 'High-Quality Voice-overs & Content',
      result: '4x revenue, 4M+ views in 1 Reel',
      textColor: 'text-[#e03131]',
      buttonColor: 'bg-[#e03131] hover:bg-[#bd2424]',
    },
    {
      company: 'EduPath Consulting',
      category: 'Educational Consultancy',
      logo: '/edupath-logo.jpeg',
      service: 'Meta Ads Strategy & Execution',
      result: 'Smashed 30-day lead goal in 5 days',
      textColor: 'text-[#046bd2]',
      buttonColor: 'bg-[#046bd2] hover:bg-[#0352a2]',
    },
    {
      company: 'Surya Velmayil',
      category: 'Video Editor & Writer',
      logo: '/surya-logo.jpeg',
      service: 'Personal Brand Strategy & Positioning',
      result: '3 High-Ticket Clients in 30 days',
      textColor: 'text-[#e03131]',
      buttonColor: 'bg-[#e03131] hover:bg-[#bd2424]',
    }
  ];

  const renderCard = (study, index, loopKey) => (
    <div 
      key={`${loopKey}-${index}`} 
      className="w-[290px] md:w-[330px] h-[440px] flex-shrink-0 border-2 border-black bg-impact-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-[12px] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-rotate-1 flex flex-col justify-between text-left select-none"
    >
      {/* Top Banner (Theme Beige background with Dot Grid pattern) */}
      <div className="h-[120px] bg-[var(--color-impact-beige)] relative flex items-center justify-center border-b-2 border-black">
        {/* Dotted matrix background pattern */}
        <div className="bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px] opacity-10 absolute inset-0"></div>
        
        {/* Logo Container */}
        <div className="w-20 h-20 rounded-full border-2 border-black overflow-hidden bg-impact-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative z-10">
          <img 
            src={study.logo} 
            alt={`${study.company} logo`} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow flex flex-col justify-between text-center">
        <div>
          {/* Category */}
          <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500 block mb-0.5">
            {study.category}
          </span>
          {/* Company Name */}
          <h3 className="text-sm md:text-base font-sans font-extrabold text-black uppercase tracking-tight leading-tight">
            {study.company}
          </h3>
          
          <div className="w-8 h-[2px] bg-black mx-auto my-2.5"></div>
          
          {/* What We Did */}
          <span className={`text-[9px] font-sans ${study.textColor} block uppercase font-bold tracking-wider mb-0.5`}>
            What We Did
          </span>
          <p className="text-xs font-body font-medium text-gray-600 px-2 leading-relaxed">
            {study.service}
          </p>
        </div>

        {/* Results */}
        <div className="my-2">
          <span className="text-[9px] font-sans text-gray-400 font-bold tracking-widest block uppercase mb-1">
            Result Given
          </span>
          <p className="text-xs md:text-sm font-sans font-black text-black uppercase leading-tight px-1 min-h-[40px] flex items-center justify-center">
            {study.result}
          </p>
        </div>

        {/* Learn More Button */}
        <div>
          <button 
            onClick={() => onViewDetails(study.company)}
            className={`w-full py-2 border-2 border-black font-sans font-bold text-[10px] md:text-xs uppercase tracking-wider text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] rounded-[4px] cursor-pointer flex items-center justify-center gap-1.5 ${study.buttonColor}`}
          >
            View Details &rarr;
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="results-marquee" className="py-12 bg-[var(--color-impact-beige)] border-b-2 border-black overflow-hidden text-left">
      {/* Infinite Scrolling Track */}
      <div className="relative border-y-2 border-black py-10 bg-impact-white overflow-hidden select-none">
        <div className="animate-marquee flex gap-8 w-max">
          {/* First loop of cards */}
          {caseStudies.map((study, i) => renderCard(study, i, 'loop1'))}
          {/* Second loop (duplicate for infinite scroll) */}
          {caseStudies.map((study, i) => renderCard(study, i, 'loop2'))}
        </div>
      </div>
    </section>
  );
}
