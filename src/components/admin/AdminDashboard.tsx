import React, { useState } from 'react';
import {
  X,
  Settings,
  Calendar,
  User,
  Phone,
  Clock,
  DollarSign,
  Save,
  CheckCircle2,
  Lock,
  MessageCircle,
  MapPin,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { config, appointments, updateClinicConfig, removeAppointment } = useClinic();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'appointments' | 'doctor' | 'clinic'>('appointments');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states for config editing
  const [doctorData, setDoctorData] = useState({ ...config.doctor });
  const [clinicData, setClinicData] = useState({ ...config.clinic });

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === 'safeer123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect PIN or Password. (Default: admin123)');
    }
  };

  const handleSaveConfig = () => {
    updateClinicConfig({
      doctor: doctorData,
      clinic: clinicData
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#065f46] text-white p-6 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37] text-white flex items-center justify-center font-bold text-lg shadow">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Clinic Admin Portal</h3>
              <p className="text-xs text-emerald-200">
                Dr. SAFEER MENGAL Speech Clinic • Content & Appointment Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-emerald-200 hover:text-white rounded-xl hover:bg-emerald-900/50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#065f46] flex items-center justify-center mx-auto border border-emerald-100">
              <Lock className="w-8 h-8 text-[#065f46]" />
            </div>

            <div>
              <h4 className="text-2xl font-bold text-[#065f46]">Admin Access Security</h4>
              <p className="text-xs text-slate-500 mt-1">
                Enter your administrative PIN to manage appointments and clinic configuration.
              </p>
            </div>

            {loginError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl font-medium">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Password (admin123)"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center font-bold text-sm focus:ring-2 focus:ring-[#065f46] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#065f46] hover:bg-emerald-900 text-white font-bold text-sm py-3 rounded-xl shadow transition-all"
              >
                Access Dashboard
              </button>

              <div className="text-[11px] text-slate-400">
                Default Password: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-700">admin123</code>
              </div>
            </form>
          </div>
        ) : (
          /* Admin Dashboard Content */
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Top Stats Bar & Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'appointments'
                      ? 'bg-[#065f46] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Appointments ({appointments.length})
                </button>

                <button
                  onClick={() => setActiveTab('doctor')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'doctor'
                      ? 'bg-[#065f46] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Doctor Profile
                </button>

                <button
                  onClick={() => setActiveTab('clinic')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'clinic'
                      ? 'bg-[#065f46] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Clinic Info & Timings
                </button>
              </div>

              {saveSuccess && (
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Settings Saved Successfully!</span>
                </div>
              )}
            </div>

            {/* TAB 1: APPOINTMENTS LIST */}
            {activeTab === 'appointments' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-base">
                    Patient Appointment Requests
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">
                    Total Requests Recorded: {appointments.length}
                  </span>
                </div>

                {appointments.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                    No appointment requests recorded yet. User requests made on the website will show up here.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {appointments.map(appt => (
                      <div
                        key={appt.id}
                        className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3 relative hover:bg-white transition-colors"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-200 pb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#065f46] text-base">
                                {appt.patientName}
                              </span>
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {appt.consultationType === 'in_person' ? 'In-Person Clinic' : 'Online Video'}
                              </span>
                              <span className="text-xs text-slate-400 font-mono">
                                #{appt.id}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5">
                              Guardian: <strong>{appt.guardianName}</strong> • Age: <strong>{appt.age}</strong> • City: <strong>{appt.city}</strong>
                            </p>
                          </div>

                          <button
                            onClick={() => removeAppointment(appt.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                            title="Delete Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                          <div>
                            <span className="text-slate-400 font-medium">Service:</span>
                            <div className="font-semibold text-slate-900">{appt.serviceRequired}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-medium">Preferred Time:</span>
                            <div className="font-semibold text-slate-900">{appt.preferredDate} @ {appt.preferredTime}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 font-medium">Contact Phone:</span>
                            <div className="font-semibold text-emerald-700">{appt.phone}</div>
                          </div>
                        </div>

                        {appt.notes && (
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-600">
                            <strong>Note:</strong> {appt.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: DOCTOR PROFILE EDIT */}
            {activeTab === 'doctor' && (
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-base">
                  Update Doctor Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Doctor Name</label>
                    <input
                      type="text"
                      value={doctorData.name}
                      onChange={e => setDoctorData({ ...doctorData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Title & Role</label>
                    <input
                      type="text"
                      value={doctorData.title}
                      onChange={e => setDoctorData({ ...doctorData, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Qualifications</label>
                    <input
                      type="text"
                      value={doctorData.qualifications}
                      onChange={e => setDoctorData({ ...doctorData, qualifications: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Years of Experience</label>
                    <input
                      type="number"
                      value={doctorData.experienceYears}
                      onChange={e => setDoctorData({ ...doctorData, experienceYears: parseInt(e.target.value, 10) || 4 })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Biography / About Text</label>
                    <textarea
                      rows={3}
                      value={doctorData.bio}
                      onChange={e => setDoctorData({ ...doctorData, bio: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSaveConfig}
                    className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#b8962f] text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Doctor Profile</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: CLINIC INFO & SCHEDULE */}
            {activeTab === 'clinic' && (
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-base">
                  Update Clinic Contacts & Schedule Summary
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Clinic Name</label>
                    <input
                      type="text"
                      value={clinicData.clinicName}
                      onChange={e => setClinicData({ ...clinicData, clinicName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={clinicData.city}
                      onChange={e => setClinicData({ ...clinicData, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={clinicData.phone}
                      onChange={e => setClinicData({ ...clinicData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Official WhatsApp Number</label>
                    <input
                      type="text"
                      value={clinicData.whatsapp}
                      onChange={e => setClinicData({ ...clinicData, whatsapp: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={clinicData.address}
                      onChange={e => setClinicData({ ...clinicData, address: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Opening Hours Summary</label>
                    <input
                      type="text"
                      value={clinicData.openingHoursSummary}
                      onChange={e => setClinicData({ ...clinicData, openingHoursSummary: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSaveConfig}
                    className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#b8962f] text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Clinic Information</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
