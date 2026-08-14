import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Calendar } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface FaqSectionProps {
  onOpenAppointment: (serviceName?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenAppointment }) => {
  const { config } = useClinic();
  const { faqs, clinic, doctor } = config;

  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-teal-700" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Common Patient Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            Find clear answers about speech therapy, child developmental speech milestones, fees, and booking in {clinic.city}.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search questions (e.g. fees, age, online consultation)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-colors ${
                activeCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => setActiveCategory('general')}
              className={`px-3.5 py-1.5 rounded-xl transition-colors ${
                activeCategory === 'general' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              General SLP
            </button>
            <button
              onClick={() => setActiveCategory('pediatric')}
              className={`px-3.5 py-1.5 rounded-xl transition-colors ${
                activeCategory === 'pediatric' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Pediatric Care
            </button>
            <button
              onClick={() => setActiveCategory('appointments')}
              className={`px-3.5 py-1.5 rounded-xl transition-colors ${
                activeCategory === 'appointments' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveCategory('fees')}
              className={`px-3.5 py-1.5 rounded-xl transition-colors ${
                activeCategory === 'fees' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Fees & Package
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              No matching questions found. Feel free to contact us directly on WhatsApp!
            </div>
          ) : (
            filteredFaqs.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-sm hover:border-slate-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-lg shrink-0 transition-transform ${isOpen ? 'bg-teal-50 text-teal-700 rotate-180' : 'text-slate-400'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-base">
            Have a specific question about your child's speech?
          </h3>
          <p className="text-xs text-slate-600 max-w-lg mx-auto">
            Dr. Safeer Mengal is available to answer your initial questions and schedule a full assessment in {clinic.city}.
          </p>
          <button
            onClick={() => onOpenAppointment()}
            className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow transition-all"
          >
            <Calendar className="w-4 h-4 text-emerald-300" />
            <span>Book Initial Consultation</span>
          </button>
        </div>

      </div>
    </section>
  );
};
