import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Approach() {
  const pillars = [
    {
      icon: 'fa-bullseye',
      title: 'Precision Over Volume',
      desc: 'We identify your highest-value ICP segments and go narrow — delivering campaigns that attract buyers, not browsers. Less spray. More precision. Better leads.',
      color: 'bg-primary text-white'
    },
    {
      icon: 'fa-chart-column',
      title: 'Data-First, Creative-Led',
      desc: 'We let data tell us where to aim, then let bold creative do the persuading. The paradox: the most data-driven campaigns feel the most human.',
      color: 'bg-accent text-black'
    },
    {
      icon: 'fa-arrow-trend-up',
      title: 'Slow Build, Fast Results',
      desc: "We take 30 days to understand your brand deeply — so months 2–12 outperform every campaign you've ever run. The best shortcut is not skipping steps.",
      color: 'bg-neo-green text-white'
    },
    {
      icon: 'fa-filter',
      title: 'Full-Funnel Ownership',
      desc: 'From awareness to booked call — we own every stage. No handoff gaps, no attribution mysteries. Just a pipeline that closes.',
      color: 'bg-black text-white'
    }
  ];

  return (
    <section id="value" className="py-20 px-6 md:px-12 bg-white border-b-3 border-black text-left">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary mb-3">
            Why We're Different
          </p>
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-black leading-none uppercase mb-6">
            WHAT MAKES US DIFFERENT?
          </h2>
          <p className="font-poppins text-lg text-gray-700 leading-relaxed">
            Most agencies give you more — more ads, more posts, more spend. We give you less noise
            and more signal. Our approach is built on a simple paradox: <strong className="text-black font-semibold">focus narrows, results expand.</strong>
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={index} delay={index * 120} className="h-full">
              <div className="bg-white border-3 border-black p-8 h-full flex flex-col items-start neo-shadow neo-shadow-hover hover:border-primary transition-all">
                {/* Icon Box */}
                <div className={`w-12 h-12 flex items-center justify-center border-3 border-black mb-6 text-xl neo-shadow ${pillar.color}`}>
                  <i className={`fa-solid ${pillar.icon}`}></i>
                </div>
                <h3 className="font-montserrat font-black text-lg text-black uppercase mb-4">
                  {pillar.title}
                </h3>
                <p className="font-poppins text-sm text-gray-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
