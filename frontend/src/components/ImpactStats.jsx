import React, { useState, useEffect, useRef } from 'react';

const AnimatedNumber = ({ value, suffix = '', prefix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp = null;
          const duration = 2000; // 2 seconds animation
          
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            
            setCount(easeProgress * value);
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, [value]);
  
  return (
    <span ref={elementRef}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
};

const StatCard = ({ value, suffix, prefix, decimals, description, colorClass }) => (
  <div className="impact-card-white h-full justify-center">
    <h3 className={`text-4xl md:text-5xl font-sans font-bold mb-4 ${colorClass}`}>
      <AnimatedNumber value={value} suffix={suffix} prefix={prefix} decimals={decimals} />
    </h3>
    <p className="text-sm font-body text-gray-600 leading-relaxed text-center">
      {description}
    </p>
  </div>
);

export default function ImpactStats() {
  const stats = [
    {
      value: 70,
      suffix: '%+',
      description: 'Increase in brand visibility through strategic SEO, Meta Ads, and performance-driven digital marketing campaigns.',
      colorClass: 'text-[#046bd2]', // Blue
    },
    {
      value: 2,
      suffix: 'x ↑',
      description: 'Twice better click through rate of our ads than industry average. Great Ads = More Quality Clicks.',
      colorClass: 'text-[#e03131]', // Red
    },
    {
      value: 30,
      suffix: '% ↓',
      description: 'At least 30% lower CPMs on average. Perks of killer ads with a solid media buying strategy.',
      colorClass: 'text-[#046bd2]', // Blue
    },
    {
      value: 83.33,
      suffix: '%',
      decimals: 2,
      description: 'Execution to success rate. 8 out of 10 times we ideate and execute an ad, it deliver results.',
      colorClass: 'text-[#e03131]', // Red
    },
  ];

  return (
    <section id="results" className="py-24 bg-[var(--color-impact-beige)] px-4 border-b-2 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-sans mb-4 text-black uppercase">
            Advertising is not magic,<br/>it's cause and effect.
          </h2>
          <p className="text-lg font-body text-gray-800">Our methods are battle-tested.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
