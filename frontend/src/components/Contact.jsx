import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    budget: '',
    challenge: ''
  });
  
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          budget: '',
          challenge: ''
        });
        
        // Reset success state after a timeout
        setTimeout(() => {
          setStatus((prev) => ({ ...prev, success: false }));
        }, 5000);
      } else {
        throw new Error(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Submit lead error:', err);
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12 bg-[#f8f9fa] border-b-3 border-black text-left">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side Column: Text and Perks */}
          <div className="lg:col-span-6">
            <p className="font-montserrat font-bold text-xs uppercase tracking-widest text-primary mb-3">
              Contact Us
            </p>
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-black leading-none uppercase mb-6">
              Talk Less.<br /><span className="text-primary">Grow More.</span>
            </h2>
            <p className="font-poppins text-lg text-gray-700 leading-relaxed mb-10">
              Stop reading about leads and start receiving them. Tell us where you are, and we'll show you 
              exactly how the Paradox method will work for your brand — no templates, no cookie-cutter proposals.
            </p>

            <div className="flex flex-col gap-6">
              {/* Perk 1 */}
              <ScrollReveal delay={0}>
                <div className="bg-white border-3 border-black p-6 neo-shadow neo-shadow-hover flex gap-5">
                  <span className="text-2xl" role="img" aria-label="perk">📞</span>
                  <div>
                    <h4 className="font-montserrat font-black text-base text-black uppercase mb-1">
                      Free 30-Min Strategy Call
                    </h4>
                    <p className="font-poppins text-xs text-gray-600 leading-relaxed">
                      Walk away with a clear picture of what's holding your pipeline back and one actionable fix — even if you don't hire us.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Perk 2 */}
              <ScrollReveal delay={100}>
                <div className="bg-white border-3 border-black p-6 neo-shadow neo-shadow-hover flex gap-5">
                  <span className="text-2xl" role="img" aria-label="perk">📋</span>
                  <div>
                    <h4 className="font-montserrat font-black text-base text-black uppercase mb-1">
                      Custom Lead Gen Audit
                    </h4>
                    <p className="font-poppins text-xs text-gray-600 leading-relaxed">
                      We review your current marketing stack, ad accounts, and funnel — and deliver a prioritised roadmap within 5 business days.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Perk 3 */}
              <ScrollReveal delay={200}>
                <div className="bg-white border-3 border-black p-6 neo-shadow neo-shadow-hover flex gap-5">
                  <span className="text-2xl" role="img" aria-label="perk">🚀</span>
                  <div>
                    <h4 className="font-montserrat font-black text-base text-black uppercase mb-1">
                      Campaigns Live in 30 Days
                    </h4>
                    <p className="font-poppins text-xs text-gray-600 leading-relaxed">
                      No 3-month onboarding. We move fast. First leads typically arrive within the first 30 days of engagement.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Side Column: Form */}
          <div className="lg:col-span-6 w-full">
            <ScrollReveal delay={150}>
              <div className="bg-white border-3 border-black p-8 neo-shadow-lg w-full">
                <h3 className="font-montserrat font-black text-xl text-black uppercase mb-6 pb-3 border-b-3 border-black">
                  Tell Us About Your Brand
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="font-montserrat font-bold text-xs uppercase text-black mb-2" htmlFor="firstName">
                        First Name*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        placeholder="Alex"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="p-3 border-3 border-black font-poppins text-sm neo-shadow focus:outline-none focus:border-primary focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[3px_3px_0px_0px_#000000]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-montserrat font-bold text-xs uppercase text-black mb-2" htmlFor="lastName">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        placeholder="Carter"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="p-3 border-3 border-black font-poppins text-sm neo-shadow focus:outline-none focus:border-primary focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[3px_3px_0px_0px_#000000]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="font-montserrat font-bold text-xs uppercase text-black mb-2" htmlFor="email">
                      Work Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="p-3 border-3 border-black font-poppins text-sm neo-shadow focus:outline-none focus:border-primary focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[3px_3px_0px_0px_#000000]"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col">
                    <label className="font-montserrat font-bold text-xs uppercase text-black mb-2" htmlFor="company">
                      Company / Brand*
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      required
                      placeholder="Your Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className="p-3 border-3 border-black font-poppins text-sm neo-shadow focus:outline-none focus:border-primary focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[3px_3px_0px_0px_#000000]"
                    />
                  </div>

                  {/* Monthly Budget */}
                  <div className="flex flex-col">
                    <label className="font-montserrat font-bold text-xs uppercase text-black mb-2" htmlFor="budget">
                      Monthly Marketing Budget*
                    </label>
                    <select
                      name="budget"
                      id="budget"
                      required
                      value={formData.budget}
                      onChange={handleChange}
                      className="p-3 border-3 border-black font-poppins text-sm neo-shadow bg-white focus:outline-none focus:border-primary focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[3px_3px_0px_0px_#000000]"
                    >
                      <option value="" disabled>Select a range</option>
                      <option value="Under $2,000">Under $2,000</option>
                      <option value="$2,000 – $5,000">$2,000 – $5,000</option>
                      <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                      <option value="$15,000 – $50,000">$15,000 – $50,000</option>
                      <option value="$50,000+">$50,000+</option>
                    </select>
                  </div>

                  {/* Challenge Description */}
                  <div className="flex flex-col">
                    <label className="font-montserrat font-bold text-xs uppercase text-black mb-2" htmlFor="challenge">
                      What's your biggest challenge right now?
                    </label>
                    <textarea
                      name="challenge"
                      id="challenge"
                      placeholder="E.g. We're getting website traffic but no leads are converting. Our cost per lead is too high..."
                      value={formData.challenge}
                      onChange={handleChange}
                      rows="3"
                      className="p-3 border-3 border-black font-poppins text-sm neo-shadow focus:outline-none focus:border-primary focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[3px_3px_0px_0px_#000000] resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button & Status */}
                  <div>
                    {status.error && (
                      <div className="mb-4 bg-red-100 border-2 border-red-500 text-red-700 font-poppins text-xs px-3 py-2">
                        {status.error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status.loading || status.success}
                      className={`
                        w-full py-4 border-3 border-black font-montserrat font-black text-sm uppercase text-center cursor-pointer transition-all
                        ${status.success 
                          ? 'bg-success text-white translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_#000000]'
                          : 'bg-primary text-white neo-shadow neo-shadow-hover neo-shadow-active hover:bg-blue-600'
                        }
                      `}
                    >
                      {status.loading && 'Submitting...'}
                      {status.success && '✓ Call Booked! We\'ll touch base within 24h.'}
                      {!status.loading && !status.success && 'Book My Free Strategy Call \u2192'}
                    </button>
                  </div>

                  <p className="text-[11px] font-poppins text-gray-500 text-center select-none">
                    No spam. No hard sell. Just a genuine conversation about your growth.
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
