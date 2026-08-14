import React from 'react';
import {
  Calendar,
  ShieldCheck,
  Award,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
  Stethoscope,
  Users,
  CheckCircle2,
  Star
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface HeroProps {
  onOpenAppointment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment }) => {
  const { config } = useClinic();
  const { doctor, clinic, stats } = config;

  const formattedWhatsAppUrl = `https://wa.me/${clinic.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Dr. SAFEER MENGAL, I would like to book a speech therapy session.`
  )}`;

  return (
    <section id="home" className="relative bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white py-14 lg:py-24 overflow-hidden">
      
      {/* Decorative background glow & mesh circles */}
      <div className="absolute top-0 right-10 -mt-16 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-20 w-[450px] h-[450px] bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Professional Credential Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#065f46] text-xs font-extrabold uppercase tracking-wider shadow-md border border-emerald-200/80">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Stethoscope className="w-4 h-4 text-[#065f46]" />
              <span>Certified Speech-Language Pathologist (SLP)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#065f46] tracking-tight leading-[1.1] uppercase drop-shadow-sm">
              Expert Speech & Language Therapy in <span className="text-[#d4af37] bg-gradient-to-r from-[#d4af37] to-[#b8860b] bg-clip-text text-transparent underline decoration-emerald-300 decoration-wavy decoration-2">{clinic.city}</span>
            </h1>

            {/* Subheading / Description */}
            <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transforming communication for children and adults. Specialized clinical therapy for speech delay, stammering/stuttering, articulation, autism spectrum support, and post-stroke rehabilitation by <strong className="text-slate-900 font-bold">{doctor.name}</strong>.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <button
                onClick={onOpenAppointment}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#d4af37] to-[#b8962f] hover:from-[#c29f2f] hover:to-[#a18125] text-white font-extrabold text-base px-8 py-4 rounded-full shadow-xl shadow-amber-900/15 transition-all hover:scale-[1.03] active:scale-95"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>

              <a
                href={formattedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base px-7 py-4 rounded-full shadow-lg shadow-emerald-900/15 transition-all hover:scale-[1.03]"
              >
                <MessageCircle className="w-5 h-5 text-emerald-200" />
                <span>WhatsApp: {clinic.whatsapp}</span>
              </a>
            </div>

            {/* Quick Feature Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-sm hover:border-emerald-300 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Bs in Speech-Language Pathology</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-sm hover:border-emerald-300 transition-colors">
                <Clock className="w-4 h-4 text-[#065f46]" />
                <span>Clinic: 04:00 PM - 12:00 AM</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-sm hover:border-amber-300 transition-colors">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>{clinic.address}, {clinic.city}</span>
              </div>
            </div>

            {/* Key Clinical Stats Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0">
              <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 text-center shadow-md hover:shadow-lg hover:border-amber-300 transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-[#d4af37] group-hover:scale-105 transition-transform">
                  {doctor.experienceYears}+ Yrs
                </div>
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Clinical Practice
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 text-center shadow-md hover:shadow-lg hover:border-emerald-300 transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-[#065f46] group-hover:scale-105 transition-transform">
                  1000+
                </div>
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Happy Patients
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 text-center shadow-md hover:shadow-lg hover:border-amber-300 transition-all group">
                <div className="text-2xl sm:text-3xl font-black text-[#d4af37] group-hover:scale-105 transition-transform">
                  100%
                </div>
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Dedicated Care
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Doctor Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-white p-4 sm:p-5 rounded-3xl shadow-2xl border-2 border-slate-200/80 hover:border-[#d4af37]/50 transition-all max-w-md mx-auto group">
              
              {/* Top Accent Pill Badge */}
              <div className="absolute -top-3 right-6 z-20 bg-gradient-to-r from-[#065f46] to-emerald-900 text-white text-[10px] font-extrabold uppercase px-3.5 py-1 rounded-full shadow-md border border-emerald-400/30 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Lead Speech Specialist</span>
              </div>

              {/* Doctor Image Header */}
              <div className="relative rounded-2xl overflow-hidden aspect-4/5 bg-slate-100 shadow-inner">
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#065f46]/95 via-[#065f46]/20 to-transparent" />
                
                {/* Floating Rating Pill */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/40 flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>5.0 Rated Specialist</span>
                </div>

                {/* Overlay Doctor Card */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="bg-[#065f46]/90 backdrop-blur-md p-4 rounded-xl border border-emerald-400/40 shadow-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[#d4af37] text-xs font-extrabold uppercase tracking-wider">
                        Available for Consultation
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {doctor.name}
                    </h3>
                    <p className="text-emerald-100 text-xs mt-0.5 font-semibold">
                      {doctor.qualifications} • Speech Therapist
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact & Address snippet */}
              <div className="mt-4 p-4 bg-slate-50/90 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">Direct Phone Booking:</span>
                  <a href={`tel:${clinic.phone}`} className="font-black text-[#065f46] hover:underline flex items-center gap-1 text-sm">
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                    {clinic.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="font-extrabold text-slate-900">Consultation Fee:</span>
                  <span className="font-black text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md border border-amber-200">
                    Contact us on WhatsApp about fees
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
