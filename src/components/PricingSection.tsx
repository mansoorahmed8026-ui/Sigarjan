import React from 'react';
import {
  CreditCard,
  MessageCircle,
  Check,
  ShieldCheck,
  HelpCircle,
  Calendar,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface PricingSectionProps {
  onOpenAppointment: (serviceName?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenAppointment }) => {
  const { config } = useClinic();
  const { clinic, doctor, payment } = config;

  const formattedWhatsAppUrl = `https://wa.me/${clinic.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello ${doctor.name}, I would like to inquire about fee structure and book a speech therapy consultation.`
  )}`;

  const priceItems = [
    {
      title: 'Initial Clinical Assessment',
      price: 'Contact us on WhatsApp about fees.',
      subtitle: 'Contact on WhatsApp to discuss and deal',
      features: [
        'Comprehensive speech & language evaluation',
        '60-minute in-person or online session',
        'Standardized developmental milestone check',
        'Customized therapy roadmap & home goals'
      ],
      isPopular: true
    },
    {
      title: 'Speech Therapy Session',
      price: 'Contact us on WhatsApp about fees.',
      subtitle: 'Standard clinical session rate',
      features: [
        '45 to 50 minutes 1-on-1 direct therapy',
        'Articulation or language delay exercises',
        'Progress tracking after each session',
        'Parent guidance & home practice sheets'
      ],
      isPopular: false
    },
    {
      title: 'Online Video Consultation',
      price: 'Contact us on WhatsApp about fees.',
      subtitle: 'Convenient tele-speech therapy',
      features: [
        '45-minute live video session',
        'Interactive digital therapy tools',
        'Suitable for patients outside Mansehra',
        'Flexible evening appointment slots'
      ],
      isPopular: false
    },
    {
      title: 'Follow-up & Package Deal',
      price: 'Contact us on WhatsApp about fees.',
      subtitle: 'Contact on WhatsApp to deal',
      features: [
        'Re-evaluation of therapy milestones',
        'Multi-session package discounts',
        'Ongoing guidance for parents',
        'Customized schedule flexibility'
      ],
      isPopular: false
    }
  ];

  return (
    <section id="fees" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <CreditCard className="w-4 h-4 text-amber-700" />
            <span>Transparent Consultation Rates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Consultation & Therapy Fees
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Affordable, ethical speech pathology care in {clinic.city}. Fee packages can be tailored directly via WhatsApp consultation.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {priceItems.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 ${
                item.isPopular
                  ? 'border-teal-400 ring-2 ring-teal-400/20 shadow-xl relative'
                  : 'border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              <div>
                {item.isPopular && (
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full text-center mb-4">
                    Recommended First Step
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                
                <div className="my-4 pb-4 border-b border-slate-100">
                  <div className="text-sm sm:text-base font-extrabold text-[#065f46] leading-snug">
                    {item.price}
                  </div>
                  <div className="text-xs text-teal-700 font-medium mt-1">
                    {item.subtitle}
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => onOpenAppointment(item.title)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  <span>Book Appointment</span>
                </button>

                <a
                  href={formattedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs py-2.5 px-3 rounded-xl border border-emerald-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Deal on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp & Payment Method Guidance Box */}
        <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                Direct Clinic Deal & Booking
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Need to discuss custom package fees?
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Contact the clinic team directly on WhatsApp to discuss therapy session requirements, scheduling, and payment arrangements.
              </p>
              <p className="text-xs text-amber-300/90 italic font-medium pt-1">
                "Fees may vary depending on assessment, session type and clinical requirements."
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-2">
              <a
                href={formattedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 text-slate-950" />
                <span>WhatsApp: {payment.contactNumber}</span>
              </a>
              <span className="text-[11px] text-slate-400">
                Team WhatsApp Number: {payment.contactNumber}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
