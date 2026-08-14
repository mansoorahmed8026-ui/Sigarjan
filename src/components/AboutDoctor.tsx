import React from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle,
  Languages,
  Building2,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface AboutDoctorProps {
  onOpenAppointment: () => void;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({ onOpenAppointment }) => {
  const { config } = useClinic();
  const { doctor, clinic } = config;

  return (
    <section id="about" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-[#065f46] text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-4 h-4 text-[#065f46]" />
            <span>Certified Healthcare Professional</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#065f46] tracking-tight uppercase">
            About <span className="text-[#d4af37]">{doctor.name}</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Dedicated Speech-Language Pathologist providing personalized, compassionate speech therapy services in {clinic.city}, KPK, Pakistan.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Doctor Photo & Quick Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative bg-white p-3 rounded-3xl shadow-xl border border-slate-200">
              <div className="relative rounded-2xl overflow-hidden aspect-4/5 bg-slate-100">
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#065f46]/90 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="bg-[#065f46]/90 backdrop-blur-md p-3.5 rounded-xl border border-emerald-400/30">
                    <p className="text-[#d4af37] text-xs font-bold uppercase tracking-wider">
                      Speech-Language Pathologist
                    </p>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {doctor.name}
                    </h3>
                    <p className="text-emerald-100 text-xs mt-0.5">
                      {doctor.qualifications} • {doctor.experienceYears} Years Practice
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Language & Registration Highlights */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-[#065f46] shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Clinical Affiliation
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {doctor.registrationDetails}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Languages Spoken
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {doctor.languages.join(', ')}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Bio & Detailed Expertise */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Bio Card */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-2xl font-bold text-[#065f46] flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-[#d4af37]" />
                <span>Professional Background</span>
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {doctor.bio}
              </p>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
                <ShieldCheck className="w-5 h-5 text-[#065f46] shrink-0 mt-0.5" />
                <p>
                  <strong>Verified Clinical Practice:</strong> All consultations and therapy plans are conducted strictly according to clinical SLP standards, focusing on realistic, patient-centered functional communication goals.
                </p>
              </div>
            </div>

            {/* Key Qualifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-[#065f46] shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">Degree Qualification</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{doctor.qualifications}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Specialized SLP Education</div>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">Clinical Experience</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{doctor.experienceYears} Years Dedicated Practice</div>
                  <div className="text-xs text-slate-500 mt-0.5">Pediatric & Adult Speech</div>
                </div>
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-[#065f46] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <span>Areas of Clinical Expertise</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {doctor.expertiseAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 hover:border-emerald-300 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">{area}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  Have questions regarding your child or family member's speech progress?
                </p>
                <button
                  onClick={onOpenAppointment}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#b8962f] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Assessment</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
