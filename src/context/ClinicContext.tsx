import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppConfig,
  DoctorProfile,
  ClinicInfo,
  ServiceItem,
  ConditionItem,
  ScheduleDay,
  Testimonial,
  FAQItem,
  GalleryImage,
  AppointmentRequest,
  PaymentSettings,
  WebsiteSeo,
  SocialLinks
} from '../types/clinic';
import { initialClinicConfig } from '../data/initialData';

const CONFIG_STORAGE_KEY = 'dr_safeer_clinic_config_v1';
const APPOINTMENTS_STORAGE_KEY = 'dr_safeer_clinic_appointments_v1';

interface ClinicContextType {
  config: AppConfig;
  appointments: AppointmentRequest[];
  isAdminLoggedIn: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  updateDoctor: (doctor: DoctorProfile) => void;
  updateClinic: (clinic: ClinicInfo) => void;
  saveService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  saveCondition: (condition: ConditionItem) => void;
  deleteCondition: (id: string) => void;
  updateSchedule: (schedule: ScheduleDay[]) => void;
  saveFAQ: (faq: FAQItem) => void;
  deleteFAQ: (id: string) => void;
  saveTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  saveGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
  updatePayment: (payment: PaymentSettings) => void;
  updateSeo: (seo: WebsiteSeo) => void;
  updateSocial: (social: SocialLinks) => void;
  addAppointment: (apptData: Omit<AppointmentRequest, 'id' | 'createdAt' | 'status'>) => AppointmentRequest;
  updateAppointmentStatus: (id: string, status: AppointmentRequest['status'], adminDoctorNotes?: string) => void;
  deleteAppointment: (id: string) => void;
  resetToDefault: () => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

const initialSampleAppointments: AppointmentRequest[] = [
  {
    id: 'SLP-2026-1042',
    patientName: 'Zainab Bibi',
    guardianName: 'Muhammad Tariq',
    age: '4 Years',
    phone: '03001234567',
    whatsapp: '+92 3001234567',
    email: 'tariq.m@example.com',
    city: 'Mansehra',
    preferredDate: '2026-08-15',
    preferredTime: '05:00 PM',
    patientType: 'new',
    consultationType: 'in_person',
    serviceRequired: 'Speech Delay Therapy',
    preferredLanguage: 'Urdu',
    notes: 'Child understands Urdu but relies on pointing gestures.',
    status: 'Pending',
    createdAt: '2026-08-12T14:30:00Z',
    adminDoctorNotes: 'Initial consultation slot reserved.'
  },
  {
    id: 'SLP-2026-1089',
    patientName: 'Hamza Khan',
    guardianName: 'Self',
    age: '24 Years',
    phone: '03339876543',
    whatsapp: '+92 3339876543',
    email: 'hamza.k@example.com',
    city: 'Abbottabad',
    preferredDate: '2026-08-16',
    preferredTime: '06:30 PM',
    patientType: 'new',
    consultationType: 'online',
    serviceRequired: 'Stuttering & Fluency Support',
    preferredLanguage: 'English',
    notes: 'Stutters when speaking in public or interviews.',
    status: 'Confirmed',
    createdAt: '2026-08-11T10:15:00Z',
    adminDoctorNotes: 'Online video link prepared.'
  }
];

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.doctor) {
          parsed.doctor.photoUrl = initialClinicConfig.doctor.photoUrl;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load clinic config from localStorage', e);
    }
    return initialClinicConfig;
  });

  const [appointments, setAppointments] = useState<AppointmentRequest[]>(() => {
    try {
      const saved = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load appointments from localStorage', e);
    }
    return initialSampleAppointments;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Save changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save clinic config', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
    } catch (e) {
      console.error('Failed to save appointments', e);
    }
  }, [appointments]);

  const loginAdmin = (pin: string) => {
    // Default security PIN: "1234" or "safeer" or "03313296955"
    if (pin === '1234' || pin === 'safeer' || pin === '03313296955' || pin.toLowerCase() === 'admin') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  const updateDoctor = (doctor: DoctorProfile) => {
    setConfig(prev => ({ ...prev, doctor }));
  };

  const updateClinic = (clinic: ClinicInfo) => {
    setConfig(prev => ({ ...prev, clinic }));
  };

  const saveService = (service: ServiceItem) => {
    setConfig(prev => {
      const exists = prev.services.some(s => s.id === service.id);
      let updatedServices: ServiceItem[];
      if (exists) {
        updatedServices = prev.services.map(s => (s.id === service.id ? service : s));
      } else {
        updatedServices = [service, ...prev.services];
      }
      return { ...prev, services: updatedServices };
    });
  };

  const deleteService = (id: string) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  const saveCondition = (condition: ConditionItem) => {
    setConfig(prev => {
      const exists = prev.conditions.some(c => c.id === condition.id);
      let updated: ConditionItem[];
      if (exists) {
        updated = prev.conditions.map(c => (c.id === condition.id ? condition : c));
      } else {
        updated = [condition, ...prev.conditions];
      }
      return { ...prev, conditions: updated };
    });
  };

  const deleteCondition = (id: string) => {
    setConfig(prev => ({
      ...prev,
      conditions: prev.conditions.filter(c => c.id !== id)
    }));
  };

  const updateSchedule = (schedule: ScheduleDay[]) => {
    setConfig(prev => ({ ...prev, schedule }));
  };

  const saveFAQ = (faq: FAQItem) => {
    setConfig(prev => {
      const exists = prev.faqs.some(f => f.id === faq.id);
      let updated: FAQItem[];
      if (exists) {
        updated = prev.faqs.map(f => (f.id === faq.id ? faq : f));
      } else {
        updated = [...prev.faqs, faq];
      }
      return { ...prev, faqs: updated };
    });
  };

  const deleteFAQ = (id: string) => {
    setConfig(prev => ({
      ...prev,
      faqs: prev.faqs.filter(f => f.id !== id)
    }));
  };

  const saveTestimonial = (testimonial: Testimonial) => {
    setConfig(prev => {
      const exists = prev.testimonials.some(t => t.id === testimonial.id);
      let updated: Testimonial[];
      if (exists) {
        updated = prev.testimonials.map(t => (t.id === testimonial.id ? testimonial : t));
      } else {
        updated = [testimonial, ...prev.testimonials];
      }
      return { ...prev, testimonials: updated };
    });
  };

  const deleteTestimonial = (id: string) => {
    setConfig(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  const saveGalleryImage = (image: GalleryImage) => {
    setConfig(prev => {
      const exists = prev.gallery.some(g => g.id === image.id);
      let updated: GalleryImage[];
      if (exists) {
        updated = prev.gallery.map(g => (g.id === image.id ? image : g));
      } else {
        updated = [image, ...prev.gallery];
      }
      return { ...prev, gallery: updated };
    });
  };

  const deleteGalleryImage = (id: string) => {
    setConfig(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== id)
    }));
  };

  const updatePayment = (payment: PaymentSettings) => {
    setConfig(prev => ({ ...prev, payment }));
  };

  const updateSeo = (seo: WebsiteSeo) => {
    setConfig(prev => ({ ...prev, seo }));
  };

  const updateSocial = (social: SocialLinks) => {
    setConfig(prev => ({ ...prev, social }));
  };

  const addAppointment = (apptData: Omit<AppointmentRequest, 'id' | 'createdAt' | 'status'>): AppointmentRequest => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newAppt: AppointmentRequest = {
      ...apptData,
      id: `SLP-2026-${randomNum}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setAppointments(prev => [newAppt, ...prev]);
    return newAppt;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentRequest['status'], adminDoctorNotes?: string) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status, adminDoctorNotes: adminDoctorNotes ?? a.adminDoctorNotes } : a))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const resetToDefault = () => {
    setConfig(initialClinicConfig);
    setAppointments(initialSampleAppointments);
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    localStorage.removeItem(APPOINTMENTS_STORAGE_KEY);
  };

  return (
    <ClinicContext.Provider
      value={{
        config,
        appointments,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        updateDoctor,
        updateClinic,
        saveService,
        deleteService,
        saveCondition,
        deleteCondition,
        updateSchedule,
        saveFAQ,
        deleteFAQ,
        saveTestimonial,
        deleteTestimonial,
        saveGalleryImage,
        deleteGalleryImage,
        updatePayment,
        updateSeo,
        updateSocial,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        resetToDefault
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
