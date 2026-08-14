import React from 'react';
import { X, ShieldCheck, Lock } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { config } = useClinic();
  const { clinic, doctor } = config;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8">
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold">Patient Privacy Policy</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 text-xs sm:text-sm text-slate-700 space-y-4 max-h-[70vh] overflow-y-auto leading-relaxed">
          <p>
            At <strong>{clinic.clinicName}</strong> led by <strong>{doctor.name}</strong>, we respect your confidentiality and treat all patient personal and medical information with strict privacy standard practices.
          </p>

          <h4 className="font-bold text-slate-900 text-base">1. Information We Collect</h4>
          <p>
            When booking an appointment or contacting us, we collect basic details including patient name, age, contact numbers (phone/WhatsApp), email, city, and brief descriptions of speech concerns.
          </p>

          <h4 className="font-bold text-slate-900 text-base">2. Purpose of Data Use</h4>
          <p>
            Your information is exclusively used to schedule consultations, conduct clinical speech evaluations, provide progress updates, and communicate session details with parents or adult patients.
          </p>

          <h4 className="font-bold text-slate-900 text-base">3. Confidentiality Safeguards</h4>
          <p>
            Patient information is never publicly displayed, published, or sold to third parties. Testimonials published on this website use pseudonymized names (e.g., initial letters) to protect individual identity.
          </p>

          <h4 className="font-bold text-slate-900 text-base">4. Contact Information</h4>
          <p>
            For privacy inquiries or to request data removal, contact us directly at <strong>{clinic.email}</strong> or phone <strong>{clinic.phone}</strong>.
          </p>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
