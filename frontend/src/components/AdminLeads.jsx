import React, { useState, useEffect } from 'react';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBudget, setFilterBudget] = useState('All');
  const [deleteStatus, setDeleteStatus] = useState({ id: null, loading: false });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch leads from database');
      }
      const data = await response.json();
      setLeads(data);
      setError(null);
    } catch (err) {
      console.error('Fetch leads error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead?')) return;
    
    setDeleteStatus({ id, loading: true });
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete lead from database');
      }
      
      // Remove from state
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleteStatus({ id: null, loading: false });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied email to clipboard: ${text}`);
  };

  // Filter & Search Leads logic
  const filteredLeads = leads.filter((lead) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(query) ||
      lead.lastName.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.company.toLowerCase().includes(query) ||
      (lead.challenge && lead.challenge.toLowerCase().includes(query));

    const matchesBudget = filterBudget === 'All' || lead.budget === filterBudget;

    return matchesSearch && matchesBudget;
  });

  return (
    <div className="py-12 px-6 md:px-12 bg-white min-h-[calc(100vh-100px)] text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-3 border-black pb-6 mb-10 gap-6">
          <div>
            <h1 className="font-montserrat font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-2">
              Leads Portal
            </h1>
            <p className="font-poppins text-sm text-gray-500">
              Manage prospective clients and strategy call bookings from MongoDB.
            </p>
          </div>
          {/* Summary counters */}
          <div className="flex gap-4">
            <div className="bg-primary text-white p-4 neo-border neo-shadow font-montserrat">
              <div className="text-[10px] uppercase font-bold tracking-wider">Total Leads</div>
              <div className="text-2xl font-black">{leads.length}</div>
            </div>
            <div className="bg-accent text-black p-4 neo-border neo-shadow font-montserrat">
              <div className="text-[10px] uppercase font-bold tracking-wider">Filtered</div>
              <div className="text-2xl font-black">{filteredLeads.length}</div>
            </div>
          </div>
        </div>

        {/* Dashboard Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Search bar */}
          <div className="md:col-span-2 flex flex-col">
            <label className="font-montserrat font-bold text-xs uppercase text-black mb-2">
              Search Database
            </label>
            <input
              type="text"
              placeholder="Search by name, email, company, or challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-3 border-3 border-black font-poppins text-sm neo-shadow focus:outline-none focus:border-primary focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[3px_3px_0px_0px_#000000]"
            />
          </div>

          {/* Budget filter select */}
          <div className="flex flex-col">
            <label className="font-montserrat font-bold text-xs uppercase text-black mb-2">
              Filter by Budget
            </label>
            <select
              value={filterBudget}
              onChange={(e) => setFilterBudget(e.target.value)}
              className="p-3 border-3 border-black font-poppins text-sm neo-shadow bg-white focus:outline-none focus:border-primary focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[3px_3px_0px_0px_#000000]"
            >
              <option value="All">All Budgets</option>
              <option value="Under $2,000">Under $2,000</option>
              <option value="$2,000 – $5,000">$2,000 – $5,000</option>
              <option value="$5,000 – $15,000">$5,000 – $15,000</option>
              <option value="$15,000 – $50,000">$15,000 – $50,000</option>
              <option value="$50,000+">$50,000+</option>
            </select>
          </div>
        </div>

        {/* Loading / Error States */}
        {loading ? (
          <div className="text-center py-20 font-montserrat font-black text-xl text-black">
            LOADING LEADS FROM DATABASE...
          </div>
        ) : error ? (
          <div className="bg-red-50 border-3 border-red-500 p-8 text-center neo-shadow">
            <h3 className="font-montserrat font-black text-lg text-red-700 uppercase mb-2">
              Error Connecting to Backend
            </h3>
            <p className="font-poppins text-sm text-red-600 mb-6">{error}</p>
            <button 
              onClick={fetchLeads}
              className="bg-red-700 hover:bg-red-800 text-white font-montserrat font-bold text-xs uppercase px-5 py-3 neo-border neo-shadow cursor-pointer"
            >
              Retry Database Connection
            </button>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-cream border-3 border-black p-12 text-center neo-shadow">
            <h3 className="font-montserrat font-black text-xl text-black uppercase mb-2">
              No Leads Found
            </h3>
            <p className="font-poppins text-sm text-gray-500">
              {leads.length === 0 
                ? 'Your MongoDB is empty. Submit a strategy call form on the landing page!' 
                : 'No leads match your active filters or search terms.'}
            </p>
          </div>
        ) : (
          /* Leads List */
          <div className="flex flex-col gap-6">
            {filteredLeads.map((lead) => (
              <div 
                key={lead._id}
                className="bg-white border-3 border-black p-6 sm:p-8 neo-shadow relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-primary transition-all"
              >
                {/* Lead Details */}
                <div className="space-y-4 max-w-3xl">
                  {/* Name and budget */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-montserrat font-black text-xl text-black uppercase">
                      {lead.firstName} {lead.lastName}
                    </h3>
                    <span className="bg-accent text-black font-montserrat font-black text-[9px] uppercase px-2.5 py-1 border-2 border-black">
                      {lead.budget} Budget
                    </span>
                    <span className="text-gray-400 font-poppins text-xs select-none">
                      {new Date(lead.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Company & Email row */}
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                    <div className="font-poppins text-gray-600">
                      <strong className="text-black font-semibold">Company:</strong> {lead.company}
                    </div>
                    <div className="font-poppins text-gray-600 flex items-center gap-2">
                      <strong className="text-black font-semibold">Email:</strong> {lead.email}
                      <button 
                        onClick={() => copyToClipboard(lead.email)}
                        className="text-[10px] text-primary hover:underline font-bold uppercase cursor-pointer"
                        title="Copy email to clipboard"
                      >
                        [Copy]
                      </button>
                    </div>
                  </div>

                  {/* Challenges description */}
                  {lead.challenge && (
                    <div className="bg-[#f8f9fa] border-2 border-black p-4 text-xs font-poppins text-gray-700 leading-relaxed">
                      <strong className="block font-montserrat font-bold text-[9px] uppercase text-black tracking-wider mb-1.5">
                        Biggest Growth Challenge:
                      </strong>
                      {lead.challenge}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <button
                  disabled={deleteStatus.id === lead._id && deleteStatus.loading}
                  onClick={() => handleDelete(lead._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-montserrat font-black text-xs uppercase px-4 py-2.5 border-3 border-black neo-shadow neo-shadow-hover neo-shadow-active self-start md:self-center cursor-pointer disabled:opacity-50"
                >
                  {deleteStatus.id === lead._id && deleteStatus.loading ? 'Deleting...' : 'Delete Lead'}
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
