import React from 'react';
import { Star, Quote, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const TestimonialsSection: React.FC = () => {
  const { config } = useClinic();
  const { testimonials, doctor, clinic } = config;

  return (
    <section className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-4 h-4 text-amber-700" />
            <span>Patient & Family Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Families Say About Dr. Safeer
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Real stories from parents and patients who received speech pathology care in {clinic.city}.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Star Ratings */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm italic leading-relaxed">
                  "{item.review}"
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    <span>{item.patientName}</span>
                    {item.isVerified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" title="Verified Patient Review" />
                    )}
                  </div>
                  <div className="text-teal-700 font-medium text-[11px] mt-0.5">
                    {item.serviceReceived}
                  </div>
                </div>

                <div className="text-slate-400 text-[11px]">
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Outcome Disclaimer */}
        <div className="mt-10 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          * Testimonials represent individual patient and parent experiences and do not guarantee identical treatment outcomes for every case. Patient full names are protected for privacy compliance.
        </div>

      </div>
    </section>
  );
};
