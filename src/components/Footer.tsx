import React, { useEffect } from 'react';
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Heart,
  ChevronRight,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface FooterProps {
  onOpenAppointment: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAppointment,
  onOpenPrivacy,
  onOpenTerms,
  onOpenAdmin
}) => {
  const { config } = useClinic();
  const { clinic, doctor, services } = config;

  // Inject LocalBusiness / MedicalBusiness Structured Data JSON-LD
  useEffect(() => {
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': 'MedicalClinic',
      name: clinic.clinicName,
      medicalSpecialty: 'Speech-Language Pathology',
      description: `Professional speech and language therapy clinic in ${clinic.city}, KPK led by ${doctor.name} (${doctor.qualifications}).`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: clinic.address,
        addressLocality: clinic.city,
        addressRegion: clinic.province,
        addressCountry: clinic.country
      },
      telephone: clinic.phone,
      email: clinic.email,
      openingHours: 'Mo-Sa 16:00-24:00',
      founder: {
        '@type': 'Person',
        name: doctor.name,
        jobTitle: doctor.title
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'medical-clinic-jsonld';
    script.text = JSON.stringify(jsonLdData);

    const existingScript = document.getElementById('medical-clinic-jsonld');
    if (existingScript) {
      existingScript.remove();
    }
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('medical-clinic-jsonld');
      if (s) s.remove();
    };
  }, [clinic, doctor]);

  const formattedWhatsAppUrl = `https://wa.me/${clinic.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello ${doctor.name}, I would like to inquire about speech therapy services.`
  )}`;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Doctor info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-sky-600 flex items-center justify-center text-white font-bold shadow">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-tight">
                  {clinic.clinicName}
                </h3>
                <p className="text-xs text-amber-300 font-semibold mt-0.5">
                  {doctor.name} ({doctor.qualifications})
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Certified Speech-Language Pathologist providing evidence-based evaluation, pediatric speech delay therapy, stuttering support, and adult speech rehabilitation in {clinic.city}, KPK.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <a
                href={formattedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800 hover:bg-emerald-900 transition-colors flex items-center gap-1.5 font-bold text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#home" className="hover:text-teal-300 flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-300 flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>About Doctor ({doctor.name})</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Speech Therapy Services</span>
                </a>
              </li>
              <li>
                <a href="#conditions" className="hover:text-teal-300 flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Conditions We Treat</span>
                </a>
              </li>
              <li>
                <a href="#fees" className="hover:text-teal-300 flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Fees & Pricing</span>
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-teal-300 flex items-center gap-1 transition-colors">
                  <ChevronRight className="w-3 h-3 text-teal-500" />
                  <span>Patient FAQs</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Therapy Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Therapy Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {services.slice(0, 6).map(s => (
                <li key={s.id}>
                  <button
                    onClick={() => onOpenAppointment(s.name)}
                    className="hover:text-teal-300 flex items-center gap-1 transition-colors text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-teal-500 shrink-0" />
                    <span>{s.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Clinic Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{clinic.address}, {clinic.city}, {clinic.province}, {clinic.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{clinic.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {clinic.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{clinic.email}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-slate-900 text-amber-300 font-medium">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Timings: {clinic.openingHoursSummary}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Required Healthcare Disclaimers Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 text-xs text-slate-400">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 leading-relaxed">
              <p>
                <strong className="text-amber-300 font-bold">Medical Disclaimer:</strong> The information provided on this website is for general educational purposes and does not replace professional medical evaluation, diagnosis or treatment. Please consult a qualified healthcare professional regarding your individual needs.
              </p>
              <p className="text-rose-300 font-medium">
                In case of an urgent medical emergency, contact your local emergency service or seek immediate medical care.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>{clinic.clinicName}</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-300 transition-colors font-bold text-amber-400/80"
            >
              Admin Dashboard
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
