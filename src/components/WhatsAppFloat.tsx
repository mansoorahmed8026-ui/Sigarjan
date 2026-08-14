import React, { useState } from 'react';
import { MessageCircle, X, Send, Calendar } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const WhatsAppFloat: React.FC = () => {
  const { config } = useClinic();
  const { doctor, clinic, services } = config;
  const [isOpen, setIsOpen] = useState(false);

  const [messageData, setMessageData] = useState({
    patientName: '',
    age: '',
    preferredDate: '',
    preferredTime: '05:00 PM',
    service: services[0]?.name || 'Speech Delay Therapy',
    consultationType: 'In-Person Clinic',
    city: clinic.city || 'Mansehra'
  });

  const formattedWhatsAppNumber = clinic.whatsapp.replace(/[^0-9]/g, '');

  const generatedWhatsAppText = `Hello ${doctor.name}, I would like to book a speech therapy appointment.

Patient Name: ${messageData.patientName || '[Name]'}
Age: ${messageData.age || '[Age]'}
Preferred Date: ${messageData.preferredDate || '[Date]'}
Preferred Time: ${messageData.preferredTime}
Service: ${messageData.service}
Consultation Type: ${messageData.consultationType}
City: ${messageData.city}`;

  const finalWhatsAppUrl = `https://wa.me/${formattedWhatsAppNumber}?text=${encodeURIComponent(
    generatedWhatsAppText
  )}`;

  return (
    <>
      {/* Sticky Floating Action Button */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/80"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-slate-950 text-emerald-500 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-xs font-extrabold uppercase tracking-wider pr-1">
            Book via WhatsApp
          </span>
        </button>
      </div>

      {/* Quick Pre-filled WhatsApp Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            
            {/* Header */}
            <div className="bg-emerald-700 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">
                    WhatsApp Quick Booking
                  </h4>
                  <p className="text-emerald-100 text-xs">
                    {doctor.name} • {clinic.whatsapp}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Patient Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zainab Bibi"
                  value={messageData.patientName}
                  onChange={e => setMessageData({ ...messageData, patientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Age:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Years"
                    value={messageData.age}
                    onChange={e => setMessageData({ ...messageData, age: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    City:
                  </label>
                  <input
                    type="text"
                    value={messageData.city}
                    onChange={e => setMessageData({ ...messageData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Preferred Date:
                  </label>
                  <input
                    type="date"
                    value={messageData.preferredDate}
                    onChange={e => setMessageData({ ...messageData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Consultation Type:
                  </label>
                  <select
                    value={messageData.consultationType}
                    onChange={e => setMessageData({ ...messageData, consultationType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="In-Person Clinic">In-Person Clinic</option>
                    <option value="Online Video">Online Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Service Required:
                </label>
                <select
                  value={messageData.service}
                  onChange={e => setMessageData({ ...messageData, service: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Preview Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-700">
                <p className="font-bold text-slate-500 mb-1">Message Preview:</p>
                <p className="whitespace-pre-wrap font-sans text-slate-800">
                  {generatedWhatsAppText}
                </p>
              </div>

              <a
                href={finalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 rounded-xl shadow transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Open WhatsApp & Send</span>
              </a>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
