import React from 'react';
import { Smartphone, Megaphone, Cpu } from 'lucide-react';

const ServiceCard = ({ id, icon: Icon, title, description, tags }) => (
  <div className="bg-impact-white border-2 border-black p-8 flex flex-col items-start text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all rounded-[6px] h-full justify-between">
    <div className="w-full">
      {/* Top Header Row of Card */}
      <div className="flex items-center justify-between mb-6 w-full">
        <span className="text-[#046bd2] font-sans font-bold text-xs tracking-wider">
          {id}
        </span>
        <div className="w-10 h-10 bg-black flex items-center justify-center text-white flex-shrink-0 select-none">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold font-sans mb-3 text-black tracking-tight leading-snug">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm font-body text-gray-700 leading-relaxed mb-8">
        {description}
      </p>
    </div>

    {/* Tags at the bottom */}
    <div className="flex flex-wrap gap-2 w-full mt-auto h-[52px] items-start">
      {tags.map((tag, i) => (
        <span 
          key={i} 
          className="bg-[#e03131] text-white text-[9px] font-sans font-bold px-2 py-0.5 border border-black rounded-[2px] tracking-wide"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default function ImpactServices() {
  const services = [
    {
      id: 'S - 01',
      icon: Smartphone,
      title: 'Social Media Management',
      description: 'We turn your social channels into growth engines with consistent content, audience engagement, and brand positioning that builds trust and drives demand.',
      tags: ['CONTENT STRATEGY', 'CONTENT CREATION', 'COMMUNITY MANAGEMENT']
    },
    {
      id: 'S - 02',
      icon: Megaphone,
      title: 'Meta & Google Ads',
      description: 'From awareness to conversions, we create and optimize high-performing ad campaigns across Meta and Google to generate qualified leads and maximize ROI.',
      tags: ['META ADS', 'GOOGLE ADS', 'RETARGETING']
    },
    {
      id: 'S - 03',
      icon: Cpu,
      title: 'CRM & AI Automation',
      description: 'Streamline your sales process with automated lead nurturing, CRM workflows, and AI-powered systems that save time and increase conversions.',
      tags: ['CRM SETUP', 'AI AUTOMATION', 'LEAD NURTURING']
    }
  ];

  return (
    <section id="services" className="relative overflow-hidden py-24 bg-[var(--color-impact-beige)] px-6 md:px-12 border-b-2 border-black">
      {/* Tech-blueprint grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:12px_12px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="font-sans font-bold text-xs uppercase tracking-widest text-[#046bd2] mb-3">
            SERVICES
          </p>
          <h2 className="text-3xl md:text-5xl font-sans mb-4 text-black uppercase leading-tight tracking-tight">
            Simple to Say.<br/>
            <span className="font-extrabold">Complex to Execute.</span>
          </h2>
          <p className="text-sm md:text-base font-body text-gray-700 max-w-2xl mx-auto leading-relaxed">
            The paradox of great marketing is that the best campaigns look effortless. Behind that effortlessness is a very deliberate machine.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
