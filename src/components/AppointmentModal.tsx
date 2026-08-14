import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Video,
  Building2,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { AppointmentRequest } from '../types/clinic';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const { config, addAppointment } = useClinic();
  const { doctor, clinic, services } = config;

  const [formData, setFormData] = useState({
    patientName: '',
    guardianName: '',
    age: '',
    phone: '',
    whatsapp: '',
    email: '',
    city: clinic.city || 'Mansehra',
    preferredDate: '',
    preferredTime: '05:00 PM',
    patientType: 'new' as 'new' | 'existing',
    consultationType: 'in_person' as 'in_person' | 'online',
    serviceRequired: preselectedService || services[0]?.name || 'Speech Delay Therapy',
    preferredLanguage: 'Urdu',
    notes: ''
  });

  const [createdAppointment, setCreatedAppointment] = useState<AppointmentRequest | null>(null);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceRequired: preselectedService }));
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone) {
      alert('Please fill in the patient name and contact phone number.');
      return;
    }

    const appt = addAppointment({
      patientName: formData.patientName,
      guardianName: formData.guardianName || 'N/A',
      age: formData.age || 'Not specified',
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      email: formData.email || 'N/A',
      city: formData.city,
      preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: formData.preferredTime,
      patientType: formData.patientType,
      consultationType: formData.consultationType,
      serviceRequired: formData.serviceRequired,
      preferredLanguage: formData.preferredLanguage,
      notes: formData.notes
    });

    setCreatedAppointment(appt);
  };

  const generatedWhatsAppText = createdAppointment
    ? `Hello Dr. SAFEER MENGAL, I would like to book a speech therapy appointment.

Appointment Ref: ${createdAppointment.id}
Patient Name: ${createdAppointment.patientName}
Guardian Name: ${createdAppointment.guardianName || 'N/A'}
Age: ${createdAppointment.age}
Preferred Date: ${createdAppointment.preferredDate}
Preferred Time: ${createdAppointment.preferredTime}
Service: ${createdAppointment.serviceRequired}
Consultation Type: ${createdAppointment.consultationType === 'in_person' ? 'In-Person Clinic' : 'Online Consultation'}
City: ${createdAppointment.city}
Phone: ${createdAppointment.phone}
Language: ${createdAppointment.preferredLanguage}
Notes: ${createdAppointment.notes || 'None'}`
    : '';

  const whatsappUrl = `https://wa.me/${clinic.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    generatedWhatsAppText
  )}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedWhatsAppText);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  };

  const handleResetForm = () => {
    setCreatedAppointment(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>Direct Clinic Booking</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Book Appointment with {doctor.name}
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              {clinic.clinicName} • {clinic.address}, {clinic.city}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {createdAppointment ? (
            /* Success Screen after submission */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                  Request Saved Locally
                </span>
                <h4 className="text-2xl font-bold text-slate-900 mt-2">
                  Appointment Reference: {createdAppointment.id}
                </h4>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Thank you, <strong>{createdAppointment.patientName}</strong>! Your request has been recorded. To confirm instantly with Dr. Safeer Mengal, send the generated message via WhatsApp below.
                </p>
              </div>

              {/* Formatted WhatsApp Message Preview Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs font-mono text-slate-800 space-y-2 relative">
                <div className="flex items-center justify-between text-slate-500 text-[11px] font-sans pb-2 border-b border-slate-200">
                  <span className="font-bold uppercase tracking-wider text-teal-800">WhatsApp Message Template:</span>
                  <button
                    onClick={handleCopyText}
                    className="flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold"
                  >
                    {copiedWhatsApp ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedWhatsApp ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-800">
                  {generatedWhatsAppText}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message on WhatsApp</span>
                </a>

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Consultation Type Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, consultationType: 'in_person' }))}
                  className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    formData.consultationType === 'in_person'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>In-Person Clinic ({clinic.city})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, consultationType: 'online' }))}
                  className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    formData.consultationType === 'online'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Video className="w-4 h-4 text-sky-400" />
                  <span>Online Video Consultation</span>
                </button>
              </div>

              {/* Patient Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zainab Bibi / Ahmad Khan"
                    value={formData.patientName}
                    onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Parent / Guardian Name (If Child)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Muhammad Tariq"
                    value={formData.guardianName}
                    onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Age
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3.5 Years"
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number *
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 3313296955"
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mansehra / Abbottabad / Peshawar"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={e => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.priceDisplay})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Time (Clinic: 4 PM - 12 AM)
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                  >
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                    <option value="09:00 PM">09:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                    <option value="11:00 PM">11:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Consultation Language
                </label>
                <div className="flex gap-4 text-xs font-medium text-slate-800">
                  {['Urdu', 'English', 'Pashto'].map(lang => (
                    <label key={lang} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredLanguage"
                        value={lang}
                        checked={formData.preferredLanguage === lang}
                        onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value })}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                      <span>{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Brief Medical / Speech Concerns Note
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your child or patient's speech difficulties or previous doctor diagnoses..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-700 to-sky-800 hover:from-teal-800 hover:to-sky-900 text-white font-bold text-base py-3.5 rounded-xl shadow-lg shadow-teal-900/10 transition-all"
                >
                  Submit Appointment Request
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
