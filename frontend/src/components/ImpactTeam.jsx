import React from 'react';

const LinkedinIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TeamMember = ({ image, name, tags, linkedin }) => (
  <a 
    href={linkedin}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-impact-white border-2 border-black p-4 flex flex-col items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-[6px] h-full justify-between hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group text-current no-underline"
  >
    <div className="w-full aspect-square border-2 border-black mb-6 overflow-hidden relative bg-gray-100">
      <img 
        src={image} 
        alt={name} 
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
      />
      
      {/* LinkedIn Floating Icon Badge */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-impact-white border border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#0077b5] group-hover:text-white transition-all z-10">
        <LinkedinIcon className="w-4 h-4 text-black group-hover:text-white transition-colors" />
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
         <h3 className="text-lg md:text-xl font-bold font-sans text-white uppercase tracking-tight">{name}</h3>
      </div>
    </div>
    <div className="flex flex-col items-center gap-1.5 w-full mt-auto">
      {tags.map((tag, i) => (
        <span 
          key={i}
          className={`${
            i === 0 
              ? 'bg-[#e03131] text-white' 
              : 'bg-[var(--color-impact-beige)] text-black'
          } text-[10px] font-sans font-bold px-2 h-[36px] flex items-center justify-center border border-black rounded-[2px] tracking-wide text-center w-full max-w-[200px]`}
        >
          {tag}
        </span>
      ))}
    </div>
  </a>
);

export default function ImpactTeam() {
  const team = [
    {
      name: 'Sujitha',
      image: '/suji%20professional.png',
      tags: ['Founder & CEO', 'Brand Strategist', 'Growth Architect', 'Digital Expert'],
      linkedin: 'https://www.linkedin.com/in/sujitha17/'
    },
    {
      name: 'Saiful Azman',
      image: '/saif%20professional.png',
      tags: ['Founder & CGO', 'Paid Social & Ads Strategist', 'Performance Marketer', 'Conversion Specialist'],
      linkedin: 'https://www.linkedin.com/in/saiful-azman-s/'
    },
    {
      name: 'Vasigaran',
      image: '/vasi%20professional.png',
      tags: ['Founder & COO', 'Creative Director', 'AI & Automation Specialist', 'CRM Architect'],
      linkedin: 'https://www.linkedin.com/in/vasigaran-s/'
    }
  ];

  return (
    <section id="team" className="relative overflow-hidden py-24 bg-[var(--color-impact-beige)] px-6 md:px-12 border-b-2 border-black">
      {/* Tech-blueprint grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:12px_12px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Split Layout: Left side Story, Right side Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Origin Story */}
          <div className="lg:col-span-5 flex flex-col items-start text-left bg-impact-white border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-[6px]">
            <p className="font-sans font-bold text-xs uppercase tracking-widest text-[#046bd2] mb-1">
              / ORIGIN
            </p>
            <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-black uppercase tracking-tight mb-6">
              A Short, True Story.
            </h2>
            
            <div className="space-y-4 text-sm md:text-base font-body text-gray-700 leading-relaxed">
              <p>
                We didn't start as an agency. We started as freelancers — working independently with brands and founders across the globe. Different people, different time zones, different clients.
              </p>
              <p>
                Over time, our paths crossed. And we realized something! We all shared the same mindset: <strong className="text-[#e03131] font-bold">results matter more than noise</strong>. That's when it clicked.
              </p>
              <p>
                Instead of working in silos, we came together. Not to build just another agency, but to build a team that truly understands <strong className="text-[#046bd2] font-bold">what moves the needle</strong>. That's how Paradox was born.
              </p>
              <p>
                Today, we operate as a <strong className="text-[#e03131] font-bold">unified team</strong> with one goal: to help brands <strong className="text-[#046bd2] font-bold">grow globally</strong>! Not just in reach, but in <strong className="text-[#e03131] font-bold">real revenue</strong>.
              </p>
            </div>
          </div>
          
          {/* Right Column: Founder Grid */}
          <div className="lg:col-span-7 flex flex-col items-start w-full">
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-black uppercase leading-tight tracking-tight mb-8">
              Meet The Founders
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              {team.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
