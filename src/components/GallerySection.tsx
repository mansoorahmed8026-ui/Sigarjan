import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, X } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const GallerySection: React.FC = () => {
  const { config } = useClinic();
  const { gallery, clinic } = config;
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const filteredGallery = gallery.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-4 h-4 text-teal-700" />
            <span>Clinic Visuals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clinic Environment & Practice
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Take a look inside our clean, child-friendly therapy space in {clinic.city}.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Images ({gallery.length})
          </button>
          <button
            onClick={() => setActiveTab('therapy_room')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'therapy_room'
                ? 'bg-teal-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Therapy Rooms
          </button>
          <button
            onClick={() => setActiveTab('doctor')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'doctor'
                ? 'bg-teal-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Doctor Profile
          </button>
          <button
            onClick={() => setActiveTab('clinic')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'clinic'
                ? 'bg-teal-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Clinic Building
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item.url)}
              className="group relative bg-slate-100 rounded-2xl overflow-hidden aspect-4/3 cursor-pointer shadow-sm hover:shadow-xl transition-all border border-slate-200"
            >
              <img
                src={item.url}
                alt={item.altText || item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <h4 className="text-white font-bold text-sm">{item.title}</h4>
                  <p className="text-slate-300 text-xs mt-0.5 capitalize">{item.category.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-amber-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={activeImage}
                alt="Clinic visual preview"
                className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-slate-700"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
