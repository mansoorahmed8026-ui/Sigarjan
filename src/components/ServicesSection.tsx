import React, { useState } from 'react';
import {
  MessageSquareText,
  Sparkles,
  Volume2,
  Activity,
  Mic,
  HeartPulse,
  FileCheck2,
  Video,
  Clock,
  User,
  Check,
  Calendar,
  Tag,
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { ServiceItem } from '../types/clinic';

interface ServicesSectionProps {
  onOpenAppointment: (serviceName?: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  MessageSquareText: <MessageSquareText className="w-6 h-6 text-teal-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-sky-600" />,
  Volume2: <Volume2 className="w-6 h-6 text-amber-600" />,
  Activity: <Activity className="w-6 h-6 text-emerald-600" />,
  Mic: <Mic className="w-6 h-6 text-purple-600" />,
  HeartPulse: <HeartPulse className="w-6 h-6 text-rose-600" />,
  FileCheck2: <FileCheck2 className="w-6 h-6 text-indigo-600" />,
  Video: <Video className="w-6 h-6 text-blue-600" />
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAppointment }) => {
  const { config } = useClinic();
  const { services, doctor } = config;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const filteredServices = services.filter(service => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <section id="services" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-4 h-4 text-teal-700" />
            <span>Clinical Speech & Language Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Therapy Services
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Personalized, evidence-based speech and language therapy tailored for children, teens, and adults in {config.clinic.city}.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Services ({services.length})
          </button>
          <button
            onClick={() => setActiveCategory('pediatric')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'pediatric'
                ? 'bg-teal-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Pediatric Speech & Language
          </button>
          <button
            onClick={() => setActiveCategory('adult')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'adult'
                ? 'bg-teal-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Adult & Stroke Rehab
          </button>
          <button
            onClick={() => setActiveCategory('specialized')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'specialized'
                ? 'bg-teal-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Stuttering & Assessment
          </button>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map(service => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <div
                key={service.id}
                className={`group bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  service.isPopular
                    ? 'border-teal-300 shadow-lg shadow-teal-900/5 ring-1 ring-teal-300/50'
                    : 'border-slate-200/90 hover:border-teal-200 hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Service Image Header if available */}
                  {service.imageUrl && (
                    <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                      
                      {service.isPopular && (
                        <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                          High Demand
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur p-2 rounded-xl shadow">
                        {iconMap[service.iconName] || <Stethoscope className="w-5 h-5 text-teal-600" />}
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    {/* Header Details */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                          {service.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {service.name}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Meta info tags */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-lg">
                        <User className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{service.suitableAge}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    {/* Detailed expandable section */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-2 bg-slate-50/80 p-3 rounded-xl animate-in fade-in duration-200">
                        <p className="font-semibold text-slate-800">Therapy Method & Details:</p>
                        <p className="leading-relaxed">{service.fullDesc}</p>
                        <p className="text-[11px] text-teal-800 font-medium">
                          ✓ Conducted by {doctor.name} ({doctor.qualifications})
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                    className="w-full text-center text-xs font-semibold text-slate-500 hover:text-teal-700 py-1 transition-colors"
                  >
                    {isExpanded ? 'Hide Details' : 'Read Full Description'}
                  </button>

                  <button
                    onClick={() => onOpenAppointment(service.name)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-700 to-sky-800 hover:from-teal-800 hover:to-sky-900 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <Calendar className="w-4 h-4 text-emerald-300" />
                    <span>Book Session</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          * Session pricing and custom therapy packages are customizable. Fees can be discussed and confirmed on WhatsApp or at the clinic desk during your initial consultation.
        </div>

      </div>
    </section>
  );
};
