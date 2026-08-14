import React from 'react';
import { X, FileText, AlertTriangle } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { config } = useClinic();
  const { clinic, doctor } = config;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8">
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold">Terms & Conditions</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 text-xs sm:text-sm text-slate-700 space-y-4 max-h-[70vh] overflow-y-auto leading-relaxed">
          <h4 className="font-bold text-slate-900 text-base">1. Clinical Consultations</h4>
          <p>
            All consultations provided by <strong>{doctor.name}</strong> ({doctor.qualifications}) are scheduled by appointment at <strong>{clinic.clinicName}</strong> in {clinic.city} or online.
          </p>

          <h4 className="font-bold text-slate-900 text-base">2. Educational Website Disclaimer</h4>
          <p>
            Information provided on this website is for general educational awareness regarding speech and language development and does not constitute a formal clinical diagnosis without an in-person or live tele-assessment.
          </p>

          <h4 className="font-bold text-slate-900 text-base">3. Appointment Cancellations & Rescheduling</h4>
          <p>
            If you need to reschedule or cancel an appointment, please notify the clinic via WhatsApp or phone at least 2 hours prior to your scheduled time slot.
          </p>

          <h4 className="font-bold text-slate-900 text-base">4. Emergency Medical Disclaimer</h4>
          <p>
            In case of an acute medical emergency, please visit your local hospital emergency department immediately.
          </p>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800"
          >
            Close Terms
          </button>
        </div>
      </div>
    </div>
  );
};
