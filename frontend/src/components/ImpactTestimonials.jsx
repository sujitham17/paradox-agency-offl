import React, { useState, useEffect } from 'react';
import CardSwap, { Card } from './CardSwap';

export default function ImpactTestimonials() {
  const testimonials = [
    {
      name: 'Surya Velmayil',
      subtitle: 'Editor, Screenplay Writer',
      logo: '/surya-logo.jpeg',
      quote: '"I\'ve been a freelance video editor stuck with local clients. Paradox build my personal brand from scratch, be it positioning content and everything. In a month,I got an international lead and few high budget indian leads. Will continue to work wth the team and not stopping anytime soon. Thanks, Team Paradox!"',
    },
    {
      name: 'MyHanoiTrip',
      subtitle: 'Travel Agency',
      logo: '/my-hanoi-logo.jpeg',
      quote: '"We collaborated with Paradox Agency for content writing and voice-over support for our Vietnam travel campaigns. The storytelling and emotional tone in the voiceovers helped us connect better with our target audience. The content felt natural, engaging, and aligned with our brand vision. Great attention to detail and consistency throughout the project."',
    },
    {
      name: 'Muvidha Styles',
      subtitle: 'Clothing Brand',
      logo: '/muvidha-logo.jpeg',
      quote: '"I have been working with Paradox team, for content writing and voice overs. They deeply focus on the quality and final output, flexible to multiple iterations even at 2 a.m. I am part of them and wish to be a part of them for continuous growth."',
    },
    {
      name: 'EduPath Consulting Services',
      subtitle: 'Education Consultancy',
      logo: '/edupath-logo.jpeg',
      quote: '"We approached Paradox to run our Meta Ads campaign. What surprised us wasn\'t just the results, it was the speed. Within just 5 days, they hit our 30-day target. By day 30, they had delivered 4x the results we initially aimed for. We also received great feedback from our partner companies about their creative ideas. From strategy to execution, everything was perfectly aligned. If you\'re looking for a team that fulfills promises faster than expected, Paradox is the right choice."',
    }
  ];

  const [cardWidth, setCardWidth] = useState(560);
  const [cardHeight, setCardHeight] = useState(300);
  const [cardDist, setCardDist] = useState(12);
  const [vertDist, setVertDist] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCardWidth(w - 40);
        setCardHeight(345);
        setCardDist(8);
        setVertDist(8);
      } else if (w < 768) {
        setCardWidth(440);
        setCardHeight(290);
        setCardDist(10);
        setVertDist(10);
      } else {
        setCardWidth(560);
        setCardHeight(300);
        setCardDist(12);
        setVertDist(12);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-[var(--color-impact-beige)] px-6 md:px-12 border-b-2 border-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="font-sans font-bold text-xs uppercase tracking-widest text-[#046bd2] mb-3">
            CLIENT TESTIMONIALS
          </p>
          <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-black uppercase leading-tight tracking-tight mb-4">
            Skeptics Turned<br /><span className="text-[#046bd2]">True Believers.</span>
          </h2>
          <p className="text-sm md:text-base font-body text-gray-700 max-w-2xl mx-auto leading-relaxed">
            The greatest paradox of working with us: the clients who trusted us the least became the ones who swear by us the most.
          </p>
        </div>

        {/* Card Swapper Container */}
        <div className="w-full overflow-visible mt-10">
          <CardSwap
            width={cardWidth}
            height={cardHeight}
            cardDistance={cardDist}
            verticalDistance={vertDist}
            delay={5000}
            pauseOnHover={false}
          >
            {testimonials.map((t, index) => (
              <Card
                key={index}
                className="bg-impact-white border-2 border-black p-6 md:p-8 flex flex-col justify-between text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-[6px] select-none"
              >
                <div className="flex-grow flex flex-col justify-between h-full">
                  {/* Quote Text */}
                  <p className="text-sm font-body text-gray-700 leading-relaxed mb-6 select-none">
                    {t.quote}
                  </p>

                  {/* Profile Footer */}
                  <div className="flex items-center gap-3 mt-auto border-t border-gray-200 pt-4">
                    <div className="w-10 h-10 rounded-full border border-black overflow-hidden bg-impact-white flex items-center justify-center flex-shrink-0">
                      <img
                        src={t.logo}
                        alt={`${t.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-black uppercase">{t.name}</h4>
                      <p className="font-sans text-xs text-gray-500">{t.subtitle}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}

