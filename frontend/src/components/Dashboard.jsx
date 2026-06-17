import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const chartData = {
  revenue: {
    title: 'Aggregate Client Revenue Growth',
    labels: ['Q1 Pre', 'Q2 Pre', 'Q1 P1', 'Q2 P1', 'Q3 P1', 'Q4 P1'],
    before: [120, 115, 118, 122, 125, 130],
    after: [null, null, 130, 190, 290, 440],
    yLabel: 'Revenue (k$)',
    beforeColor: '#4e5a6a', // Slate grey
    afterColor: '#046bd2'   // Primary Blue
  },
  leads: {
    title: 'Monthly Qualified Leads Generated',
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    before: [18, 20, 17, 19, 21, 18],
    after: [null, null, 45, 98, 162, 240],
    yLabel: 'Leads Count',
    beforeColor: '#4e5a6a',
    afterColor: '#046bd2'
  },
  cpl: {
    title: 'Cost Per Lead (Client Average)',
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    before: [380, 390, 370, 400, 385, 395],
    after: [null, null, 280, 190, 130, 94],
    yLabel: 'CPL ($)',
    beforeColor: '#4e5a6a',
    afterColor: '#0ca678'   // Success green
  },
  conv: {
    title: 'Lead-to-Close Conversion Rate',
    labels: ['Q1 Pre', 'Q2 Pre', 'Q1 P1', 'Q2 P1', 'Q3 P1', 'Q4 P1'],
    before: [5, 6, 5, 6, 7, 6],
    after: [null, null, 10, 18, 26, 34],
    yLabel: 'Rate (%)',
    beforeColor: '#4e5a6a',
    afterColor: '#ffd23f'   // Neo yellow
  }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('revenue');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Update window width on resize to trigger chart re-render
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Custom Neo-Brutalist canvas chart renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const width = container.clientWidth;
    const height = 300;

    // Retina display support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    // Padding values
    const padding = { top: 30, right: 30, bottom: 40, left: 60 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    const data = chartData[activeTab];
    const allValues = [...data.before, ...data.after].filter(v => v !== null);
    const minVal = Math.min(...allValues) * 0.8;
    const maxVal = Math.max(...allValues) * 1.1;
    const dataCount = data.labels.length;

    const getX = (index) => padding.left + (index / (dataCount - 1)) * graphWidth;
    const getY = (value) => padding.top + graphHeight - ((value - minVal) / (maxVal - minVal)) * graphHeight;

    // Draw horizontal dashed grid lines & Y-axis labels
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const yVal = minVal + (i / gridLines) * (maxVal - minVal);
      const y = getY(yVal);
      
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.fillStyle = '#4e5a6a';
      ctx.font = 'bold 11px Poppins';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(yVal) + (activeTab === 'conv' ? '%' : ''), padding.left - 12, y + 4);
    }

    // Draw X-axis labels (Quarters / Months)
    ctx.textAlign = 'center';
    ctx.fillStyle = '#121212';
    ctx.font = 'bold 12px Montserrat';
    data.labels.forEach((label, i) => {
      ctx.fillText(label, getX(i), height - padding.bottom + 24);
    });

    // Draw Coordinate Axis Borders (Thick black borders)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    // Bottom border
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    // Left border
    ctx.moveTo(padding.left, padding.top - 10);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.stroke();

    // Helper to draw dataset lines & node circles
    const drawLinePath = (dataset, strokeColor) => {
      const points = [];
      dataset.forEach((val, i) => {
        if (val !== null) {
          points.push({ x: getX(i), y: getY(val) });
        }
      });

      if (points.length === 0) return;

      // Draw line
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      
      points.forEach((p, idx) => {
        if (idx === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      });
      ctx.stroke();

      // Draw nodes
      points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = strokeColor;
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    // Draw datasets
    drawLinePath(data.before, data.beforeColor);
    drawLinePath(data.after, data.afterColor);
  }, [activeTab, windowWidth]);

  return (
    <section id="dashboard" className="py-20 px-6 md:px-12 bg-cream border-b-3 border-black text-left">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary mb-3">
            Live Metrics
          </p>
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-black leading-none uppercase mb-6">
            Impossible Numbers.<br /><span className="text-primary">Real Results.</span>
          </h2>
          <p className="font-poppins text-lg text-gray-700 leading-relaxed">
            The paradox of performance marketing: the more precise your targeting, the more explosive your growth. 
            These are the numbers clients said couldn't be real — until they were theirs.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {Object.keys(chartData).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                px-5 py-3 font-montserrat font-black text-xs uppercase neo-border cursor-pointer transition-all
                ${activeTab === key 
                  ? 'bg-primary text-white translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_#000000]' 
                  : 'bg-white text-black neo-shadow neo-shadow-hover'
                }
              `}
            >
              {key === 'revenue' && 'Revenue Growth'}
              {key === 'leads' && 'Lead Volume'}
              {key === 'cpl' && 'Cost Per Lead'}
              {key === 'conv' && 'Conversion Rate'}
            </button>
          ))}
        </div>

        {/* Mini Summary Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ScrollReveal delay={0}>
            <div className="bg-white border-3 border-black p-6 neo-shadow neo-shadow-hover">
              <div className="font-montserrat font-bold text-xs uppercase text-gray-500 mb-2">Avg. Revenue Increase</div>
              <div className="font-montserrat font-black text-3xl text-black mb-1">$2.4M</div>
              <div className="font-montserrat font-bold text-xs text-primary">340% YoY Growth</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="bg-white border-3 border-black p-6 neo-shadow neo-shadow-hover">
              <div className="font-montserrat font-bold text-xs uppercase text-gray-500 mb-2">Leads Generated (Monthly)</div>
              <div className="font-montserrat font-black text-3xl text-black mb-1">3,800+</div>
              <div className="font-montserrat font-bold text-xs text-primary">Qualified Pipeline Leads</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="bg-accent border-3 border-black p-6 neo-shadow neo-shadow-hover">
              <div className="font-montserrat font-bold text-xs uppercase text-black mb-2">Avg. Cost Per Lead</div>
              <div className="font-montserrat font-black text-3xl text-black mb-1">&darr; 68%</div>
              <div className="font-montserrat font-bold text-xs text-black">vs. previous agency</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="bg-white border-3 border-black p-6 neo-shadow neo-shadow-hover">
              <div className="font-montserrat font-bold text-xs uppercase text-gray-500 mb-2">Avg. Lead-to-Close Rate</div>
              <div className="font-montserrat font-black text-3xl text-black mb-1">34%</div>
              <div className="font-montserrat font-bold text-xs text-primary">vs. 8% industry avg</div>
            </div>
          </ScrollReveal>
        </div>

        {/* Canvas Chart Card */}
        <ScrollReveal delay={150}>
          <div className="bg-white border-3 border-black p-6 sm:p-8 neo-shadow relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-3 border-black pb-4 mb-6 gap-4">
              <span className="font-montserrat font-black text-sm uppercase text-black tracking-wider">
                {chartData[activeTab].title}
              </span>
              {/* Legend */}
              <div className="flex items-center gap-6 font-montserrat font-bold text-xs uppercase text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 inline-block border-2 border-black rounded-full" style={{ backgroundColor: chartData[activeTab].beforeColor }}></span>
                  Before Paradox
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 inline-block border-2 border-black rounded-full" style={{ backgroundColor: chartData[activeTab].afterColor }}></span>
                  After Paradox
                </div>
              </div>
            </div>
            
            {/* Chart Wrapper */}
            <div ref={containerRef} className="w-full overflow-hidden">
              <canvas ref={canvasRef} className="w-full"></canvas>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
