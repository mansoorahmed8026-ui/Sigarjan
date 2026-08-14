import { AppConfig } from '../types/clinic';
import doctorPhoto from '../assets/images/doctor_exact_uploaded_photo_1786632924171.jpg';

export const initialClinicConfig: AppConfig = {
  doctor: {
    name: 'Dr SAFEER MENGAL',
    title: 'Speech Therapist / Speech-Language Pathologist',
    qualifications: 'BS in Speech-Language Pathology (SLP)',
    specialization: 'Pediatric & Adult Speech, Language, Articulation & Stuttering Therapy',
    experienceYears: 4,
    patientsHelped: 1000,
    registrationDetails: 'Khyber Medical University / Clinical Practice Peshawar & Mansehra',
    languages: ['Urdu', 'English', 'Pashto'],
    bio: 'Dr. Safeer Mengal is a dedicated and certified Speech-Language Pathologist specializing in evidence-based therapy for children and adults experiencing speech delays, articulation difficulties, stuttering, voice issues, and post-stroke communication challenges in Mansehra and KPK.',
    photoUrl: doctorPhoto,
    expertiseAreas: [
      'Speech Delay in Children',
      'Language Development',
      'Articulation & Sound Pronunciation',
      'Stuttering & Fluency Support',
      'Voice Therapy',
      'Communication Skills Enhancement',
      'Pediatric Speech Therapy',
      'Adult Post-Stroke Rehabilitation',
      'Social Communication & Pragmatics'
    ]
  },
  clinic: {
    clinicName: 'Dr SAFEER MENGAL Clinic',
    doctorName: 'Dr SAFEER MENGAL',
    address: 'Main Clinic, Mansehra, KPK, Pakistan',
    city: 'Mansehra',
    province: 'KPK',
    country: 'Pakistan',
    phone: '03313296955',
    whatsapp: '+92 3313296955',
    email: 'safeermengal0019@gmail.com',
    openingHoursSummary: 'Monday - Saturday: 4:00 PM to 12:00 AM',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105432.18956903823!2d73.13689405!3d34.3312845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de31ebffbbbd67%3A0xb3574d7522530ecf!2sMansehra%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
    googleMapsDirectUrl: 'https://maps.google.com/?q=Mansehra+KPK+Pakistan',
    emergencyGuidance: 'For acute emergency care, please contact local hospital services immediately.'
  },
  services: [
    {
      id: 'srv-1',
      name: 'Speech Delay Therapy',
      shortDesc: 'Comprehensive clinical therapy for children experiencing delays in speaking first words or forming sentences.',
      fullDesc: 'Tailored 1-on-1 sessions designed to stimulate speech sounds, vocabulary building, and sentence construction using interactive play-based and structured communication techniques.',
      suitableAge: 'Toddlers & Children (1.5 - 10 years)',
      duration: '45 - 60 Minutes',
      priceDisplay: 'Contact us on WhatsApp about fees.',
      iconName: 'MessageSquareText',
      category: 'pediatric',
      isPopular: true,
      imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'srv-2',
      name: 'Language Delay Therapy',
      shortDesc: 'Helping children understand language (receptive) and express thoughts clearly (expressive).',
      fullDesc: 'Targeted support for comprehension difficulties, following multi-step directions, grammar formation, and expanding vocabulary.',
      suitableAge: 'Children & Adolescents (2 - 16 years)',
      duration: '45 Minutes',
      priceDisplay: 'Contact us on WhatsApp about fees.',
      iconName: 'Sparkles',
      category: 'pediatric',
      imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'srv-3',
      name: 'Articulation & Pronunciation Therapy',
      shortDesc: 'Correction of speech sound errors, lisping, or unclear pronunciation of specific letters/sounds.',
      fullDesc: 'Systematic phonetic placement, oral-motor exercise guidance, and sound repetition drills to ensure clear speech output.',
      suitableAge: 'All Ages (Children & Adults)',
      duration: '40 - 50 Minutes',
      priceDisplay: 'Contact us on WhatsApp about fees.',
      iconName: 'Volume2',
      category: 'pediatric',
      isPopular: true,
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'srv-4',
      name: 'Stuttering & Fluency Support',
      shortDesc: 'Evidence-based fluency shaping and stuttering management techniques to build confident, smooth speech.',
      fullDesc: 'Relaxation strategies, breathing control, easy onset techniques, and anxiety reduction during speaking situations.',
      suitableAge: 'Children, Teens & Adults',
      duration: '45 Minutes',
      priceDisplay: 'Contact us on WhatsApp about fees.',
      iconName: 'Activity',
      category: 'specialized',
      isPopular: true,
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'srv-5',
      name: 'Voice Therapy',
      shortDesc: 'Rehabilitation for hoarseness, vocal strain, pitch issues, and voice fatigue.',
      fullDesc: 'Vocal hygiene guidance, pitch control exercises, resonance therapy, and breathing techniques for optimal vocal health.',
      suitableAge: 'Adolescents & Adults',
      duration: '45 Minutes',
      priceDisplay: 'Contact us on WhatsApp about fees.',
      iconName: 'Mic',
      category: 'adult',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'srv-6',
      name: 'Adult Speech & Stroke Rehabilitation',
      shortDesc: 'Targeted communication recovery for adults experiencing aphasia, dysarthria, or speech loss after stroke/injury.',
      fullDesc: 'Functional communication exercises, word-retrieval techniques, and motor-speech therapy to restore daily independence.',
      suitableAge: 'Adults & Seniors',
      duration: '50 Minutes',
      priceDisplay: 'Contact us on WhatsApp about fees.',
      iconName: 'HeartPulse',
      category: 'adult',
      imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'srv-7',
      name: 'Initial Clinical Assessment & Consultation',
      shortDesc: 'Thorough evaluation of speech, language, articulation, and oral motor skills to diagnose and plan custom therapy.',
      fullDesc: 'Standardized assessment, family discussion, personalized goal setting, and a clinical guidance roadmap provided to parents/patients.',
      suitableAge: 'All Ages',
      duration: '60 Minutes',
      priceDisplay: 'Contact us on WhatsApp about fees.',
      iconName: 'FileCheck2',
      category: 'specialized',
      isPopular: true,
      imageUrl: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'srv-8',
      name: 'Online Tele-Speech Consultation',
      shortDesc: 'Convenient online video speech therapy sessions from the comfort of your home.',
      fullDesc: 'Interactive digital tools, parent-guided home practice guidance, and live therapy tailored for families unable to visit in person.',
      suitableAge: 'All Ages',
      duration: '45 Minutes',
      priceDisplay: 'Contact us on WhatsApp about fees.',
      iconName: 'Video',
      category: 'specialized',
      imageUrl: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=800'
    }
  ],
  conditions: [
    {
      id: 'cond-1',
      title: 'Speech Delay',
      shortExplanation: 'When a child is not meeting expected speech milestones for their age (e.g. fewer words than peers).',
      commonSigns: [
        'Not babbling by 12 months',
        'Fewer than 15-20 words by 18-24 months',
        'Difficulty imitating sounds or words',
        'Relying mainly on gestures rather than verbal words'
      ],
      whenToConsult: 'Consider clinical assessment if your child is 2+ years old and speaks fewer than 50 clear words or struggles to combine two words.',
      iconName: 'Baby'
    },
    {
      id: 'cond-2',
      title: 'Language Delay (Expressive & Receptive)',
      shortExplanation: 'Challenges understanding spoken language or forming structured sentences to express thoughts.',
      commonSigns: [
        'Difficulty following simple multi-step instructions',
        'Limited vocabulary compared to age group',
        'Struggling to answer basic questions',
        'Incorrect word order or grammar in spoken sentences'
      ],
      whenToConsult: 'Consider assessment if a child understands less than expected or gets frustrated trying to communicate feelings.',
      iconName: 'Brain'
    },
    {
      id: 'cond-3',
      title: 'Articulation & Sound Mispronunciation',
      shortExplanation: 'Difficulty pronouncing specific speech sounds (e.g., "r", "s", "l", "th") clearly.',
      commonSigns: [
        'Substituting one sound for another (e.g., "wabbit" for "rabbit")',
        'Omitting ending sounds in words',
        'Unclear speech that family or strangers struggle to comprehend'
      ],
      whenToConsult: 'Recommended if speech remains difficult for unfamiliar listeners to understand past age 3.5 - 4 years.',
      iconName: 'Smile'
    },
    {
      id: 'cond-4',
      title: 'Stuttering & Stammering (Fluency Disorder)',
      shortExplanation: 'Disruptions in the smooth flow of speech, such as sound repetitions, prolongations, or blocks.',
      commonSigns: [
        'Repeating sounds, syllables, or words ("b-b-ball")',
        'Stretching out sounds ("sssssun")',
        'Facial tension or struggle when trying to speak',
        'Avoiding certain words or speaking situations'
      ],
      whenToConsult: 'Consult early if stuttering persists for more than 6 months or causes visible distress or avoidance.',
      iconName: 'Activity'
    },
    {
      id: 'cond-5',
      title: 'Voice Strain & Hoarseness',
      shortExplanation: 'Persistent roughness, breathiness, weak voice, or vocal strain affecting speech clarity.',
      commonSigns: [
        'Chronic throat clearing or vocal discomfort',
        'Voice sounding raspy or cracking frequently',
        'Loss of voice pitch control after speaking for short periods'
      ],
      whenToConsult: 'Consult an SLP if hoarseness lasts longer than 2 weeks without a cold or flu.',
      iconName: 'VolumeX'
    },
    {
      id: 'cond-6',
      title: 'Post-Stroke Communication Difficulties (Aphasia)',
      shortExplanation: 'Loss of speech or difficulty comprehending language following a stroke or neurological condition.',
      commonSigns: [
        'Difficulty recalling names of common objects',
        'Slurred speech (dysarthria)',
        'Struggling to write or read familiar words'
      ],
      whenToConsult: 'Early intervention post-discharge significantly enhances speech recovery and functional communication.',
      iconName: 'HeartPulse'
    }
  ],
  schedule: [
    { day: 'Monday', openTime: '16:00', closeTime: '00:00', status: 'open', displayRange: '4:00 PM - 12:00 AM' },
    { day: 'Tuesday', openTime: '16:00', closeTime: '00:00', status: 'open', displayRange: '4:00 PM - 12:00 AM' },
    { day: 'Wednesday', openTime: '16:00', closeTime: '00:00', status: 'open', displayRange: '4:00 PM - 12:00 AM' },
    { day: 'Thursday', openTime: '16:00', closeTime: '00:00', status: 'open', displayRange: '4:00 PM - 12:00 AM' },
    { day: 'Friday', openTime: '16:00', closeTime: '00:00', status: 'open', displayRange: '4:00 PM - 12:00 AM' },
    { day: 'Saturday', openTime: '16:00', closeTime: '00:00', status: 'open', displayRange: '4:00 PM - 12:00 AM' },
    { day: 'Sunday', openTime: '16:00', closeTime: '00:00', status: 'open', displayRange: '4:00 PM - 12:00 AM (By Appointment)' }
  ],
  testimonials: [
    {
      id: 'test-1',
      patientName: 'Kashif R. (Parent)',
      review: 'Dr. Safeer Mengal provided exceptional guidance for my 3-year-old son who had speech delay. Within a few months of therapy in Mansehra, my son started forming complete sentences. Very patient and professional doctor.',
      rating: 5,
      date: '2026-02-10',
      serviceReceived: 'Speech Delay Therapy',
      isVerified: true
    },
    {
      id: 'test-2',
      patientName: 'Ayesha M.',
      review: 'I consulted Dr. Safeer online for stuttering techniques. His exercises and encouragement helped me overcome my speaking anxiety before job interviews. Highly recommended speech pathologist in KPK.',
      rating: 5,
      date: '2026-01-22',
      serviceReceived: 'Stuttering & Fluency Support',
      isVerified: true
    },
    {
      id: 'test-3',
      patientName: 'Tariq H. (Family Member)',
      review: 'My father experienced speech difficulty after a minor stroke. Dr. Safeer designed a simple and effective rehabilitation plan. His communication and care are top notch.',
      rating: 5,
      date: '2025-11-15',
      serviceReceived: 'Adult Speech Rehabilitation',
      isVerified: true
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What does a Speech-Language Pathologist (SLP) do?',
      answer: 'A Speech-Language Pathologist assesses, diagnoses, and treats speech sound disorders, language delays, stuttering, voice problems, and communication challenges in both children and adults.',
      category: 'general'
    },
    {
      id: 'faq-2',
      question: 'At what age can a child start speech therapy?',
      answer: 'Children can be evaluated as early as 18-24 months if parents notice speech delays or lack of response. Early intervention provides the best long-term language outcomes.',
      category: 'pediatric'
    },
    {
      id: 'faq-3',
      question: 'How long is each therapy session at Dr SAFEER MENGAL clinic?',
      answer: 'Standard clinical sessions last between 45 to 60 minutes depending on the patient’s age, attention span, and specific therapy goals.',
      category: 'appointments'
    },
    {
      id: 'faq-4',
      question: 'Do you offer online tele-speech consultations?',
      answer: 'Yes! Online video consultation is available for patients residing outside Mansehra or those who prefer therapy sessions from home.',
      category: 'appointments'
    },
    {
      id: 'faq-5',
      question: 'What are the consultation fees?',
      answer: 'Please contact us on WhatsApp (+92 3313296955) about fees and custom package details.',
      category: 'fees'
    },
    {
      id: 'faq-6',
      question: 'What should I bring to the first initial assessment?',
      answer: 'Please bring any previous medical or developmental records, school reports (if applicable), and list any specific words or sounds your child struggles with.',
      category: 'general'
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
      title: 'Pediatric Therapy Room',
      altText: 'Pediatric speech therapy room with interactive play tools in Mansehra clinic',
      category: 'therapy_room'
    },
    {
      id: 'gal-2',
      url: doctorPhoto,
      title: 'Dr. Safeer Mengal',
      altText: 'Dr Safeer Mengal Speech-Language Pathologist profile picture',
      category: 'doctor'
    },
    {
      id: 'gal-3',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      title: 'Clinic Consultation Desk',
      altText: 'Clean modern speech clinic room environment',
      category: 'clinic'
    },
    {
      id: 'gal-4',
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      title: 'Adult Rehabilitation Session',
      altText: 'Adult communication therapy session environment',
      category: 'therapy_room'
    }
  ],
  payment: {
    whatsappDealMessage: 'Contact Dr. Safeer Mengal on WhatsApp to discuss payment terms and details.',
    accountDetailsInfo: 'Payment can be settled directly at the clinic desk in Mansehra or via online bank transfer / JazzCash / EasyPaisa details shared during WhatsApp booking.',
    isEnabled: true,
    contactNumber: '+92 3313296955'
  },
  seo: {
    title: 'Dr. Safeer Mengal - Speech & Language Clinic in Mansehra, KPK',
    metaDescription: 'Dr. Safeer Mengal (BS SLP) - Certified Speech Therapist in Mansehra, Pakistan. Expert therapy for speech delay, stuttering, articulation, and voice disorders.',
    keywords: ['Speech Therapist Mansehra', 'Speech Therapy Clinic KPK', 'Dr Safeer Mengal SLP', 'Pediatric Speech Delay Pakistan', 'Stuttering Treatment Mansehra'],
    ogImage: doctorPhoto
  },
  social: {
    whatsapp: 'https://wa.me/923313296955',
    facebook: '',
    instagram: '',
    youtube: ''
  }
};
