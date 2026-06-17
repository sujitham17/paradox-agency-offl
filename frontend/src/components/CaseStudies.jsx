import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function CaseStudies() {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const cases = [
    {
      id: 'case-1',
      badge: 'SaaS / B2B',
      title: 'CloudOps Co. — "Our buyers don\'t click ads."',
      before: [
        '12 leads/month from paid channels',
        'CPL averaging $420',
        '2% lead-to-close rate',
        'No content strategy in place',
        'Sales team spending 60% on cold calls'
      ],
      after: [
        '180 qualified leads/month',
        'CPL reduced to $94',
        '28% lead-to-close rate',
        'LinkedIn thought leadership driving 40% of leads',
        'Sales team focused on warm, inbound conversations'
      ],
      stats: [
        { num: '15×', label: 'Lead Volume Growth' },
        { num: '78%', label: 'CPL Reduction' },
        { num: '$1.2M', label: 'New ARR Attributed' },
        { num: '6mo', label: 'Time to Result' }
      ]
    },
    {
      id: 'case-2',
      badge: 'E-Commerce / DTC',
      title: 'Rowan & Co. — "We\'ve tried Meta ads. They don\'t work."',
      before: [
        'ROAS of 0.8× (losing money on ads)',
        'No email nurture sequence',
        '14% cart abandonment recovery rate',
        '$38 average customer acquisition cost',
        'No retargeting or lookalike strategy'
      ],
      after: [
        'ROAS of 4.7× (ads now profit centres)',
        '7-email post-click nurture flow live',
        '62% cart abandonment recovery',
        '$11 customer acquisition cost',
        'Full-funnel retargeting driving 30% of revenue'
      ],
      stats: [
        { num: '4.7×', label: 'Return on Ad Spend' },
        { num: '71%', label: 'Drop in CAC' },
        { num: '$840K', label: 'Additional Rev (Yr 1)' },
        { num: '4mo', label: 'Time to Profitability' }
      ]
    },
    {
      id: 'case-3',
      badge: 'Professional Services',
      title: 'Meridian Legal — "Content marketing takes years to work."',
      before: [
        '100% of clients came from referrals',
        'Zero digital presence or SEO rank',
        'No CRM or lead tracking system',
        'Growth completely unpredictable',
        '0 inbound enquiries per month'
      ],
      after: [
        'Ranking page 1 for 18 commercial intent keywords',
        '2,400 monthly organic visitors',
        'Full HubSpot CRM implementation',
        '45 qualified inbound enquiries/month',
        'Revenue predictability achieved — planned hiring'
      ],
      stats: [
        { num: '45', label: 'Monthly Inbound Leads' },
        { num: '2,400', label: 'Monthly Org Visitors' },
        { num: '$560K', label: 'Pipeline Value Created' },
        { num: '9mo', label: 'Time to SEO Dominance' }
      ]
    }
  ];

  return (
    <section id="cases" className="py-20 px-6 md:px-12 bg-cream border-b-3 border-black text-left">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary mb-3">
            Case Studies
          </p>
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-black leading-none uppercase mb-6">
            The Brands Who<br /><span className="text-primary">Doubted Us First.</span>
          </h2>
          <p className="font-poppins text-lg text-gray-700 leading-relaxed">
            Every client came to us stuck. Convinced their market was "different," their product "too niche," 
            their buyers "impossible to reach online." The paradox: the harder the case, the bigger the result.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="flex flex-col gap-6 max-w-5xl">
          {cases.map((cs, idx) => {
            const isOpen = openId === cs.id;
            return (
              <ScrollReveal key={cs.id} delay={idx * 100}>
                <div className="bg-white border-3 border-black neo-shadow transition-all">
                  {/* Header Button */}
                  <button
                    onClick={() => toggleAccordion(cs.id)}
                    className="w-full text-left p-6 sm:p-8 flex items-center justify-between font-montserrat font-black uppercase text-sm sm:text-base cursor-pointer focus:outline-none select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <span className="bg-accent text-black text-[10px] font-extrabold uppercase px-2.5 py-1 border-2 border-black inline-block w-fit">
                        {cs.badge}
                      </span>
                      <h3 className="text-black inline-block mt-1 sm:mt-0">
                        {cs.title}
                      </h3>
                    </div>
                    <span className="font-black text-xl ml-4 select-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {/* Body Content */}
                  <div className={`
                    transition-all duration-300 ease-in-out overflow-hidden
                    ${isOpen ? 'max-h-[1000px] border-t-3 border-black p-6 sm:p-8' : 'max-h-0'}
                  `}>
                    {/* Before / After Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {/* Before Column */}
                      <div className="bg-[#f1f3f5] border-3 border-black p-6 neo-shadow">
                        <div className="bg-black text-white font-montserrat font-extrabold text-xs uppercase px-2.5 py-1 w-fit border-b-3 border-r-3 border-black -mt-6 -ml-6 mb-6">
                          Before Paradox
                        </div>
                        <ul className="font-poppins text-sm text-gray-700 space-y-2 list-disc pl-5">
                          {cs.before.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* After Column */}
                      <div className="bg-blue-50 border-3 border-black p-6 neo-shadow">
                        <div className="bg-primary text-white font-montserrat font-extrabold text-xs uppercase px-2.5 py-1 w-fit border-b-3 border-r-3 border-black -mt-6 -ml-6 mb-6">
                          After Paradox
                        </div>
                        <ul className="font-poppins text-sm text-gray-800 space-y-2 list-disc pl-5 font-semibold">
                          {cs.after.map((item, i) => (
                            <li key={i} className="text-primary">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Stats Grid Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t-3 border-black pt-6">
                      {cs.stats.map((stat, i) => (
                        <div key={i} className="text-center sm:text-left">
                          <div className="font-montserrat font-black text-2xl sm:text-3xl text-black">
                            {stat.num}
                          </div>
                          <div className="font-montserrat font-bold text-[10px] text-gray-500 uppercase tracking-wide mt-1">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
