import React, { useState } from 'react';
import Header from './components/Header';
import ImpactHero from './components/ImpactHero';
import Marquee from './components/Marquee';
import ImpactFeatures from './components/ImpactFeatures';
import ImpactStats from './components/ImpactStats';
import ImpactServices from './components/ImpactServices';
import ImpactTestimonials from './components/ImpactTestimonials';
import ImpactTeam from './components/ImpactTeam';
import ImpactContact from './components/ImpactContact';
import AdminLeads from './components/AdminLeads';
import CaseStudyDetail from './components/CaseStudyDetail';

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'admin' | 'case-study'
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const handleViewCaseStudy = (companyName) => {
    setSelectedCaseStudy(companyName);
    setView('case-study');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-impact-beige)] text-black">
      {view === 'landing' && <Header />}
      
      {/* Main Content Area */}
      <main className="flex-grow">
        {view === 'landing' && (
          <>
            <ImpactHero />
            <Marquee onViewDetails={handleViewCaseStudy} />
            <ImpactFeatures />
            <ImpactStats />
            <ImpactServices />
            <ImpactTestimonials />
            <ImpactTeam />
            <ImpactContact />
            <button 
              onClick={() => setView('admin')} 
              className="fixed bottom-2 left-2 text-[10px] text-gray-500 hover:text-black opacity-20 hover:opacity-100 transition-opacity"
            >
              Admin
            </button>
          </>
        )}

        {view === 'case-study' && (
          <CaseStudyDetail 
            companyName={selectedCaseStudy} 
            onBack={() => setView('landing')} 
          />
        )}

        {view === 'admin' && (
          <div className="relative">
             <button 
              onClick={() => setView('landing')} 
              className="absolute top-4 right-4 z-50 bg-black text-white px-4 py-2 font-bold"
            >
              Back to Site
            </button>
             <AdminLeads />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
