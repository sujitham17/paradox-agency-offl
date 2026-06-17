import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Services() {
  const servicesList = [
    {
      num: 'S — 01',
      icon: '🧲',
      title: 'B2B Lead Generation',
      desc: 'We engineer multi-channel outbound and inbound systems that fill your calendar with decision-makers — not tire-kickers. Account-based targeting, intent data, and conversion-optimised funnels.',
      tags: ['LinkedIn Ads', 'Cold Outreach', 'ABM', 'SEO Funnels']
    },
    {
      num: 'S — 02',
      icon: '📱',
      title: 'Social Media Marketing',
      desc: 'Content that earns attention, not buys it. We create scroll-stopping content strategies across platforms — building brand authority that makes lead generation easier every month.',
      tags: ['LinkedIn', 'Instagram', 'Meta Ads', 'TikTok']
    },
    {
      num: 'S — 03',
      icon: '⚙️',
      title: 'Paid Advertising',
      desc: 'Every dollar tracked, every click optimised. We manage paid campaigns on Google, Meta, and LinkedIn with obsessive A/B testing and bid strategies that consistently lower your CPL.',
      tags: ['Google Ads', 'Meta Ads', 'Retargeting']
    },
    {
      num: 'S — 04',
      icon: '🔍',
      title: 'SEO & Content Marketing',
      desc: 'Organic growth that compounds. We rank your brand for the exact terms your buyers type at 2am — turning search intent into pipeline. Long-form content, technical SEO, and link building.',
      tags: ['Technical SEO', 'Content Strategy', 'Link Building']
    },
    {
      num: 'S — 05',
      icon: '✉️',
      title: 'Email & CRM Automation',
      desc: 'Your hottest leads are already in your database. We build nurture sequences, re-engagement flows, and CRM pipelines that turn dormant contacts into active revenue.',
      tags: ['HubSpot', 'Klaviyo', 'Drip Campaigns']
    },
    {
      num: 'S — 06',
      icon: '📊',
      title: 'Revenue Reporting & Analytics',
      desc: 'No vanity metrics. We build custom dashboards that connect marketing spend to closed revenue — so you always know which campaigns pay, and which ones to cut.',
      tags: ['GA4', 'Attribution', 'Custom Dashboards']
    }
  ];

  return (
    <section id="services" className="py-20 px-6 md:px-12 bg-white border-b-3 border-black text-left">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary mb-3">
            Services
          </p>
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-black leading-none uppercase mb-6">
            Simple to Say.<br /><span className="text-primary">Complex to Execute.</span>
          </h2>
          <p className="font-poppins text-lg text-gray-700 leading-relaxed">
            The paradox of great marketing is that the best campaigns look effortless. 
            Behind that effortlessness is a very deliberate machine.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <ScrollReveal key={index} delay={index * 80}>
              <div className="bg-white border-3 border-black p-8 h-full flex flex-col justify-between neo-shadow neo-shadow-hover hover:border-primary transition-all">
                <div>
                  {/* Meta Row */}
                  <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
                    <span className="font-montserrat font-black text-xs text-gray-500 uppercase tracking-widest">
                      {service.num}
                    </span>
                    <span className="text-2xl" role="img" aria-label="Service Icon">
                      {service.icon}
                    </span>
                  </div>
                  <h3 className="font-montserrat font-black text-xl text-black uppercase mb-4">
                    {service.title}
                  </h3>
                  <p className="font-poppins text-sm text-gray-600 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>
                {/* Tag badges */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="bg-cream text-black font-montserrat font-bold text-[10px] uppercase tracking-wider px-2.5 py-1.5 border-2 border-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
