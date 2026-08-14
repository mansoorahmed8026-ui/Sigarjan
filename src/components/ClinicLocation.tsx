import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  Navigation,
  Building2,
  CalendarCheck,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const ClinicLocation: React.FC = () => {
  const { config } = useClinic();
  const { clinic, doctor, schedule } = config;
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false);

  // Check if clinic is currently open (4 PM - 12 AM)
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const currentHour = now.getHours(); // 0 - 23
      const dayIndex = now.getDay(); // 0 is Sunday
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDayName = dayNames[dayIndex];

      const todaySchedule = schedule.find(s => s.day === currentDayName);

      if (todaySchedule && todaySchedule.status === 'open') {
        // Open between 16:00 (4 PM) and 24:00 (12 AM)
        if (currentHour >= 16 && currentHour < 24) {
          setIsOpenNow(true);
          return;
        }
      }
      setIsOpenNow(false);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, [schedule]);

  const formattedWhatsAppUrl = `https://wa.me/${clinic.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Dr. SAFEER MENGAL, I would like to get location details and book an appointment.`
  )}`;

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-4 h-4 text-teal-700" />
            <span>Clinic Location & Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Visit Dr. SAFEER MENGAL Clinic
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Conveniently located in {clinic.city}, KPK, Pakistan. Serving patients from Mansehra, Abbottabad, Peshawar & surrounding region.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Details & Schedule */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Status Badge Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Current Clinic Status:
                </span>
                {isOpenNow ? (
                  <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Open Now (4 PM - 12 AM)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Opens at 4:00 PM</span>
                  </span>
                )}
              </div>

              {/* Clinic Basic Info Items */}
              <div className="space-y-3 pt-2 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Address</h4>
                    <p className="font-semibold text-slate-900 mt-0.5">{clinic.address}</p>
                    <p className="text-xs text-slate-500">{clinic.city}, {clinic.province}, {clinic.country}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Call & WhatsApp</h4>
                    <p className="font-semibold text-slate-900 mt-0.5">Phone: {clinic.phone}</p>
                    <p className="text-xs text-emerald-700 font-medium">WhatsApp: {clinic.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</h4>
                    <p className="font-semibold text-slate-900 mt-0.5">{clinic.email}</p>
                  </div>
                </div>
              </div>

              {/* Get Directions Action Button */}
              <div className="pt-2">
                <a
                  href={clinic.googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl shadow transition-all"
                >
                  <Navigation className="w-4 h-4 text-amber-300" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Weekly Timings Schedule Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-700" />
                <span>Weekly Consultation Schedule</span>
              </h3>

              <div className="divide-y divide-slate-100 text-xs">
                {schedule.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{item.day}</span>
                    <span
                      className={`font-medium ${
                        item.status === 'open' ? 'text-teal-800 font-semibold' : 'text-rose-600 font-semibold'
                      }`}
                    >
                      {item.displayRange}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Google Map & Regional Coverage */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Embedded Google Map Box */}
            <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-md overflow-hidden">
              <div className="relative w-full h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-slate-100">
                <iframe
                  title="Dr Safeer Mengal Clinic Location Map"
                  src={clinic.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="text-slate-600">
                  <strong>Location Note:</strong> Pakistan, KPK, Mansehra (Accessible from Hazara Expressway & Peshawar route).
                </div>
                <a
                  href={clinic.googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 font-bold hover:underline shrink-0 flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <Navigation className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Urgent / Emergency Notice */}
            <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Emergency & Urgent Care Guidance:</strong> {clinic.emergencyGuidance} Speech therapy appointments are scheduled by prior reservation.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
