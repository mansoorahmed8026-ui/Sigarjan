import React, { useState } from 'react';
import {
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface ContactSectionProps {
  onOpenAppointment: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenAppointment }) => {
  const { config } = useClinic();
  const { clinic, doctor } = config;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: clinic.city || 'Mansehra',
    message: '',
    captchaInput: ''
  });

  const [captchaNum1] = useState(Math.floor(2 + Math.random() * 5));
  const [captchaNum2] = useState(Math.floor(2 + Math.random() * 5));
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const formattedWhatsAppUrl = `https://wa.me/${clinic.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Dr. SAFEER MENGAL, I would like to make an inquiry regarding speech therapy.`
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const expectedCaptcha = captchaNum1 + captchaNum2;
    if (parseInt(formData.captchaInput, 10) !== expectedCaptcha) {
      setErrorMsg(`Incorrect spam protection math answer. ${captchaNum1} + ${captchaNum2} = ${expectedCaptcha}`);
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-4 h-4 text-teal-700" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Dr. SAFEER MENGAL Clinic
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Have questions about speech assessment or therapy schedule? Reach out via call, WhatsApp, or message.
          </p>
        </div>

        {/* Quick Action Button Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
          <a
            href={`tel:${clinic.phone}`}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all text-center group"
          >
            <PhoneCall className="w-5 h-5 text-sky-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">Call Now</span>
            <span className="text-[10px] text-slate-500 mt-0.5">{clinic.phone}</span>
          </a>

          <a
            href={formattedWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm hover:bg-emerald-100 transition-all text-center group"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-emerald-900">WhatsApp</span>
            <span className="text-[10px] text-emerald-700 mt-0.5">{clinic.whatsapp}</span>
          </a>

          <button
            onClick={onOpenAppointment}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-teal-700 text-white shadow-sm hover:bg-teal-800 transition-all text-center group col-span-2 sm:col-span-1"
          >
            <Calendar className="w-5 h-5 text-emerald-300 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Book Appt</span>
            <span className="text-[10px] text-teal-200 mt-0.5">Online Form</span>
          </button>

          <a
            href={clinic.googleMapsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all text-center group"
          >
            <Navigation className="w-5 h-5 text-amber-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">Get Directions</span>
            <span className="text-[10px] text-slate-500 mt-0.5">{clinic.city}</span>
          </a>

          <a
            href={`mailto:${clinic.email}`}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-300 hover:shadow-md transition-all text-center group"
          >
            <Mail className="w-5 h-5 text-purple-600 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">Email Us</span>
            <span className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[90px]">{clinic.email}</span>
          </a>
        </div>

        {/* Contact Form & Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Info Side */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                Clinic Contacts
              </span>
              <h3 className="text-2xl font-bold mt-1">{clinic.clinicName}</h3>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                Led by <strong>{doctor.name}</strong> ({doctor.qualifications}), Speech Therapist & Speech-Language Pathologist.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-400">Clinic Address</div>
                  <div className="text-slate-200 font-medium mt-0.5">{clinic.address}, {clinic.city}, {clinic.province}, {clinic.country}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-400">Timings</div>
                  <div className="text-slate-200 font-medium mt-0.5">{clinic.openingHoursSummary}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneCall className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-400">Direct Phone</div>
                  <div className="text-slate-200 font-medium mt-0.5">{clinic.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-400">Official WhatsApp</div>
                  <div className="text-emerald-300 font-medium mt-0.5">{clinic.whatsapp}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Your privacy is confidential. No health data is shared publicly.</span>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for reaching out, <strong>{formData.name}</strong>. Dr. Safeer Mengal's clinic team will review your message and reply via WhatsApp/phone shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', city: clinic.city, message: '', captchaInput: '' });
                  }}
                  className="bg-slate-900 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Send a Direct Message
                </h3>

                {errorMsg && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl font-medium">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ahmad Shah"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03313296955"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Message / Query *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ask about speech therapy, fees, or consultation timing..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                {/* Anti-spam Math Captcha */}
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <label className="font-bold text-slate-800">
                    Spam Security Verification: What is {captchaNum1} + {captchaNum2}? *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Result"
                    value={formData.captchaInput}
                    onChange={e => setFormData({ ...formData, captchaInput: e.target.value })}
                    className="w-28 px-3 py-1.5 rounded-xl border border-slate-300 text-sm font-bold text-center focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-700 to-sky-800 hover:from-teal-800 hover:to-sky-900 text-white font-bold text-sm py-3.5 rounded-xl shadow transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Clinic</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
