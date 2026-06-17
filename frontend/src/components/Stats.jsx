import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

function StatCounter({ target, prefix = '', suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasStarted(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, { threshold: 0.3 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic Ease Out
      
      setCount(easeProgress * target);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  // Format count cleanly
  const displayVal = Number.isInteger(target) ? Math.floor(count) : count.toFixed(1);

  return (
    <div ref={ref} className="font-montserrat font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black">
      {prefix}{displayVal}{suffix}
    </div>
  );
}

export default function Stats() {
  const statsList = [
    { target: 340, prefix: '', suffix: '%', label: 'Avg. % ROI Increase' },
    { target: 12, prefix: '$', suffix: 'M+', label: 'Revenue Generated' },
    { target: 98, prefix: '', suffix: '%', label: 'Client Retention Rate' },
    { target: 47, prefix: '', suffix: '', label: 'Brands Transformed' }
  ];

  return (
    <section id="cause-effect" className="py-20 px-6 md:px-12 bg-accent border-b-3 border-black text-left">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 border-b-3 border-black pb-8 max-w-4xl">
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-black leading-none uppercase">
            LEAD GENERATION IS NOT MAGIC,
            <span className="block text-primary mt-2">IT'S CAUSE AND EFFECT.</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsList.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="bg-white border-3 border-black p-8 neo-shadow neo-shadow-hover hover:-translate-y-1 transition-all">
                <StatCounter 
                  target={stat.target} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                />
                <div className="font-montserrat font-extrabold text-sm text-gray-800 mt-4 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
