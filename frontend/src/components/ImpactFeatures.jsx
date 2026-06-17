import React from 'react';
import { Target, BarChart2, Filter } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="impact-card-white h-full p-8 flex flex-col items-center text-center bg-impact-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group cursor-pointer">
    <div className="w-12 h-12 bg-black text-white mb-6 flex items-center justify-center select-none transition-all duration-300 group-hover:bg-[#e03131] group-hover:shadow-[0_0_25px_rgba(224,49,49,0.8)] group-hover:-translate-y-3">
      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
    </div>
    <h3 className="text-xl font-bold font-sans mb-4 text-center text-[#e03131] leading-tight">{title}</h3>
    <p className="text-sm font-body text-gray-600 leading-relaxed text-center">
      {description}
    </p>
  </div>
);

export default function ImpactFeatures() {
  const features = [
    {
      icon: Target,
      title: 'Precision Over Volume',
      description: "We identify your highest-value ICP segments and go narrow — delivering campaigns that attract buyers, not browsers. Less spray. More precision. Better leads.",
    },
    {
      icon: BarChart2,
      title: 'Data-First, Creative-Led',
      description: "We let data tell us where to aim, then let bold creative do the persuading. The paradox: the most data-driven campaigns feel the most human.",
    },
    {
      icon: Filter,
      title: 'Full-Funnel Ownership',
      description: "From awareness to booked call-we own every stage. No handoff gaps, no attribution mysteries. Just a pipeline that closes.",
    }
  ];

  return (
    <section id="approach" className="relative overflow-hidden py-24 bg-[var(--color-impact-beige)] px-4 border-b-2 border-black">
      {/* Tech-blueprint grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:12px_12px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-sans mb-4 text-black uppercase leading-tight">
            The Contradiction<br/>
            That Converts
          </h2>
          <p className="text-lg font-body text-gray-800 max-w-2xl mx-auto leading-relaxed">
            Most agencies give you more-more ads, more posts, more spend. We give you less noise and more signal. Our approach is built on a simple paradox: <strong className="text-[#e03131] font-bold">focus narrows</strong>, <strong className="text-[#046bd2] font-bold">results expand</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
