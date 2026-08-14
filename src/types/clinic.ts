export interface DoctorProfile {
  name: string;
  title: string;
  qualifications: string;
  specialization: string;
  experienceYears: number;
  patientsHelped: number;
  registrationDetails: string;
  languages: string[];
  bio: string;
  photoUrl: string;
  expertiseAreas: string[];
}

export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  suitableAge: string;
  duration: string;
  priceDisplay: string; // e.g. "Rs. 1500" or "Contact on WhatsApp"
  iconName: string;
  imageUrl?: string;
  category: 'pediatric' | 'adult' | 'specialized';
  isPopular?: boolean;
}

export interface ConditionItem {
  id: string;
  title: string;
  shortExplanation: string;
  commonSigns: string[];
  whenToConsult: string;
  iconName: string;
}

export interface ScheduleDay {
  day: string; // e.g. "Monday"
  openTime: string; // e.g. "16:00"
  closeTime: string; // e.g. "24:00" or "12:00 PM"
  status: 'open' | 'closed' | 'holiday';
  displayRange: string; // "4:00 PM - 12:00 AM"
}

export interface ClinicInfo {
  clinicName: string;
  doctorName: string;
  address: string;
  city: string;
  province: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHoursSummary: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectUrl: string;
  emergencyGuidance: string;
}

export interface Testimonial {
  id: string;
  patientName: string; // Privacy safe, e.g. "Ahmad R. (Parent)"
  review: string;
  rating: number; // 1-5
  date: string;
  serviceReceived: string;
  isVerified?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pediatric' | 'appointments' | 'fees';
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  altText: string;
  category: 'clinic' | 'therapy_room' | 'doctor';
}

export interface AppointmentRequest {
  id: string; // SLP-2026-XXXX
  patientName: string;
  guardianName?: string;
  age: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  preferredDate: string;
  preferredTime: string;
  patientType: 'new' | 'existing';
  consultationType: 'in_person' | 'online';
  serviceRequired: string;
  preferredLanguage: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Rescheduled';
  createdAt: string;
  adminDoctorNotes?: string;
}

export interface PaymentSettings {
  whatsappDealMessage: string;
  accountDetailsInfo: string;
  isEnabled: boolean;
  contactNumber: string;
}

export interface WebsiteSeo {
  title: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
}

export interface SocialLinks {
  whatsapp: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface AppConfig {
  doctor: DoctorProfile;
  clinic: ClinicInfo;
  services: ServiceItem[];
  conditions: ConditionItem[];
  schedule: ScheduleDay[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  gallery: GalleryImage[];
  payment: PaymentSettings;
  seo: WebsiteSeo;
  social: SocialLinks;
}
