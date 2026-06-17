import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Testimonials() {
  const testimonials = [
    {
      stars: '★★★★★',
      quote: 'I was convinced digital marketing wouldn\'t work for a B2B legal firm. Paradox proved me catastrophically wrong. Within 9 months we had more leads than we could handle — a genuine problem I didn\'t see coming.',
      initials: 'MR',
      name: 'Michael Reeves',
      role: 'Managing Partner, Meridian Legal',
      avatarBg: 'bg-primary text-white'
    },
    {
      stars: '★★★★★',
      quote: 'We\'d burned three agencies before Paradox. I was sceptical. Their onboarding was slower than I expected — but month three, something clicked. Month six, we hit our biggest revenue quarter ever.',
      initials: 'SK',
      name: 'Sophia Kim',
      role: 'CEO, CloudOps Co.',
      avatarBg: 'bg-accent text-black font-extrabold'
    },
    {
      stars: '★★★★★',
      quote: 'The paradox they promised — spend less, earn more — felt like a sales pitch. It wasn\'t. Our CPL dropped 71%, our ROAS tripled, and our team actually has time to think now instead of chasing cold leads.',
      initials: 'JP',
      name: 'James Patel',
      role: 'Head of Growth, Rowan & Co.',
      avatarBg: 'bg-neo-green text-white'
    },
    {
      stars: '★★★★★',
      quote: 'What separates Paradox from every other agency is accountability. They showed us exactly what was working, what wasn\'t, and why. No fluff, no creative excuses — just data, action, and results.',
      initials: 'AL',
      name: 'Amanda Lee',
      role: 'CMO, Structura Group',
      avatarBg: 'bg-accent text-black font-extrabold'
    },
    {
      stars: '★★★★★',
      quote: 'Our sales team used to spend 70% of their time on outreach. Today they spend 70% closing. Paradox flipped the equation. That shift alone is worth more than any single campaign metric.',
      initials: 'DW',
      name: 'David Walsh',
      role: 'Sales Director, NorthBridge SaaS',
      avatarBg: 'bg-primary text-white'
    },
    {
      stars: '★★★★★',
      quote: 'I thought SEO was a slow, painful, long game. Paradox got us ranking for our top 3 keywords in 5 months. Turns out the paradox is: if you do SEO right, it\'s the fastest investment you can make.',
      initials: 'HR',
      name: 'Hannah Ruiz',
      role: 'Founder, Bloom Health Co.',
      avatarBg: 'bg-neo-green text-white'
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-6 md:px-12 bg-white border-b-3 border-black text-left">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary mb-3">
            Client Testimonials
          </p>
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-black leading-none uppercase mb-6">
            Skeptics Turned<br /><span className="text-primary">True Believers.</span>
          </h2>
          <p className="font-poppins text-lg text-gray-700 leading-relaxed">
            The greatest paradox of working with us: the clients who trusted us the least 
            became the ones who swear by us the most.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <ScrollReveal key={index} delay={index * 60}>
              <div className="bg-white border-3 border-black p-8 h-full flex flex-col justify-between neo-shadow neo-shadow-hover hover:border-primary transition-all">
                <div>
                  <div className="text-accent text-xl font-bold tracking-widest mb-4">
                    {t.stars}
                  </div>
                  <blockquote className="font-poppins text-sm text-gray-700 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </blockquote>
                </div>
                {/* Author Info */}
                <div className="flex items-center gap-4 border-t-3 border-black pt-4 mt-2">
                  <div className={`w-10 h-10 flex items-center justify-center border-2 border-black font-montserrat font-bold text-xs rounded-none ${t.avatarBg}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-montserrat font-black text-sm text-black uppercase">
                      {t.name}
                    </div>
                    <div className="font-poppins text-[11px] text-gray-500 font-medium mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
