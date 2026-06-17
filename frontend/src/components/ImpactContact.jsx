import React, { useState } from 'react';

export default function ImpactContact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    budget: '',
    challenge: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Split full name into firstName and lastName for backend schema validation compatibility
    const nameParts = formData.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || 'Inquirer';
    const lastName = nameParts.slice(1).join(' ') || 'Contact';

    const payload = {
      firstName,
      lastName,
      email: formData.email,
      company: formData.company.trim() || 'N/A',
      budget: formData.budget,
      challenge: formData.challenge
    };

    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ fullName: '', email: '', company: '', budget: '', challenge: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus('error');
    }
  };

  return (
    <>
      <section id="contact" className="relative overflow-hidden py-24 bg-[var(--color-impact-beige)] px-6 md:px-12 border-b-2 border-black">
        {/* Tech-blueprint grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:12px_12px]" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-[#046bd2] font-sans font-bold text-sm uppercase tracking-wider mb-2">
              GET IN TOUCH
            </p>
            <h2 className="text-black font-sans font-extrabold text-3xl md:text-5xl leading-tight mb-4">
              Let's Grow Your Brand
            </h2>
            <h3 className="text-black font-sans font-bold text-xl md:text-2xl mb-4">
              Ready to scale your revenue? Let's talk strategy.
            </h3>
            <p className="text-gray-800 font-body text-base leading-relaxed mb-8">
              Share your current marketing spend and goals. We'll audit your funnel and show you exactly where you're leaving money on the table.
            </p>
            
            {/* Contact details */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-impact-white border-2 border-black flex items-center justify-center rounded-[4px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <a href="mailto:paradoxagencyoffl@gmail.com" className="font-sans font-bold text-black hover:text-[#046bd2] transition-colors">
                  paradoxagencyoffl@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-impact-white border-2 border-black flex items-center justify-center rounded-[4px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <a href="tel:+918110010658" className="font-sans font-bold text-black hover:text-[#046bd2] transition-colors">
                  +91 81100 10658
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-impact-white border-2 border-black flex items-center justify-center rounded-[4px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
                <a href="https://instagram.com/paradoxagencyoffl" target="_blank" rel="noopener noreferrer" className="font-sans font-bold text-black hover:text-[#046bd2] transition-colors">
                  @paradoxagencyoffl
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-impact-white border-2 border-black flex items-center justify-center rounded-[4px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <a href="#" className="font-sans font-bold text-black hover:text-[#046bd2] transition-colors">
                  LinkedIn Company Page
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Inline Form Card */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-impact-white border-2 border-black p-8 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-[8px]">
              
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mb-4"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  <h3 className="text-2xl font-bold font-sans mb-2 text-black">Message Sent!</h3>
                  <p className="text-gray-700 font-body max-w-sm">
                    Thank you! We've received your project inquiry and will get back to you shortly. Let's create something extraordinary!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans font-bold text-xs tracking-wider text-black">
                      YOUR NAME *
                    </label>
                    <input 
                      required 
                      type="text" 
                      name="fullName" 
                      placeholder="Your full name"
                      value={formData.fullName} 
                      onChange={handleChange} 
                      className="w-full p-3 border-2 border-black rounded-[4px] focus:outline-none focus:ring-0 text-black font-body text-sm bg-white" 
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans font-bold text-xs tracking-wider text-black">
                      WORK EMAIL *
                    </label>
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      placeholder="you@brand.com"
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full p-3 border-2 border-black rounded-[4px] focus:outline-none focus:ring-0 text-black font-body text-sm bg-white" 
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans font-bold text-xs tracking-wider text-black">
                      COMPANY / BRAND NAME (Optional)
                    </label>
                    <input 
                      type="text" 
                      name="company" 
                      placeholder="Your brand name"
                      value={formData.company} 
                      onChange={handleChange} 
                      className="w-full p-3 border-2 border-black rounded-[4px] focus:outline-none focus:ring-0 text-black font-body text-sm bg-white" 
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans font-bold text-xs tracking-wider text-black">
                      PROJECT BUDGET *
                    </label>
                    <select 
                      required 
                      name="budget" 
                      value={formData.budget} 
                      onChange={handleChange} 
                      className="w-full p-3 border-2 border-black rounded-[4px] bg-white focus:outline-none focus:ring-0 text-black font-body text-sm cursor-pointer"
                    >
                      <option value="" disabled>Select your project budget...</option>
                      <option value="<$5k">&lt;$5k</option>
                      <option value="$5k-$10k">$5k-$10k</option>
                      <option value="$10k+">$10k+</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans font-bold text-xs tracking-wider text-black">
                      TELL US ABOUT YOUR PROJECT *
                    </label>
                    <textarea 
                      required
                      name="challenge" 
                      placeholder="Describe your vision, goals, and any specific requirements or ideas you have..."
                      value={formData.challenge} 
                      onChange={handleChange} 
                      rows="4" 
                      className="w-full p-3 border-2 border-black rounded-[4px] focus:outline-none focus:ring-0 text-black font-body text-sm bg-white resize-y"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm font-semibold p-3 bg-red-50 border border-red-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                      <span>Something went wrong. Please check your network and try again.</span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-[#e03131] hover:bg-[#c92a2a] text-white py-4 font-sans font-extrabold text-sm uppercase tracking-wider border-2 border-black rounded-[4px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer disabled:opacity-50 font-sans"
                  >
                    {status === 'submitting' ? 'Sending Message...' : 'SEND INQUIRY'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SVG Filter to turn black text white while keeping red and blue brand colors intact */}
      <svg style={{ display: 'none' }}>
        <filter id="white-text-preserve-colors" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="
            0 -1 -1  0  1
           -1  0 -1  0  1
           -1 -1  0  0  1
            0  0  0  1  0
          " />
        </filter>
      </svg>

      <footer className="bg-black text-gray-400 py-16 px-6 md:px-12 font-body border-t border-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12">
          
          {/* Column 1: Brand & Logo */}
          <div className="md:col-span-5 flex flex-col items-start space-y-4">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 cursor-pointer focus:outline-none bg-transparent border-none p-0 text-left"
            >
              <img src="/paradox-icon.png" alt="Paradox Icon" className="h-[32px] w-auto object-contain" />
              <img 
                src="/paradox-text.png" 
                alt="Paradox Logo" 
                className="h-[20px] w-auto object-contain" 
                style={{ filter: 'url(#white-text-preserve-colors)' }}
              />
            </button>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              We help brands scale revenue with high-precision lead generation, high-converting copy, and custom automation. No vanity metrics, just pipeline growth.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a 
                href="https://instagram.com/paradoxagencyoffl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-900 hover:bg-[#e03131] border border-gray-800 hover:border-black flex items-center justify-center rounded-full text-white transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/paradoxagencyoffl" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-900 hover:bg-[#0077b5] border border-gray-800 hover:border-black flex items-center justify-center rounded-full text-white transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h4 className="font-sans font-bold text-white uppercase text-xs tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('approach');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-gray-400"
                >
                  Approach
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-gray-400"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('results');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-gray-400"
                >
                  Results
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('testimonials');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-gray-400"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('team');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-gray-400"
                >
                  Founders
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <h4 className="font-sans font-bold text-white uppercase text-xs tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mt-0.5 flex-shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:paradoxagencyoffl@gmail.com" className="hover:text-white transition-colors break-all">
                  paradoxagencyoffl@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mt-0.5 flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+918110010658" className="hover:text-white transition-colors">
                  +91 81100 10658
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright info */}
        <div className="max-w-6xl mx-auto pt-8 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-gray-500 text-center sm:text-left">
            Copyright &copy; {new Date().getFullYear()} Paradox Agency.
          </p>
          <div className="flex gap-6 text-gray-500">
            <span className="italic text-[#e03131] font-bold">Turning contradictions into conversions.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
