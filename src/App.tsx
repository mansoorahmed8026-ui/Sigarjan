import React, { useState } from 'react';
import { ClinicProvider } from './context/ClinicContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutDoctor } from './components/AboutDoctor';
import { ServicesSection } from './components/ServicesSection';
import { ConditionsSection } from './components/ConditionsSection';
import { PricingSection } from './components/PricingSection';
import { GallerySection } from './components/GallerySection';
import { ClinicLocation } from './components/ClinicLocation';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { PrivacyModal } from './components/PrivacyModal';
import { TermsModal } from './components/TermsModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleOpenAppointment = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setIsAppointmentOpen(true);
  };

  return (
    <ClinicProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-[#d4af37] selection:text-white">
        {/* Navigation Bar */}
        <Navbar
          onOpenAppointment={handleOpenAppointment}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero onOpenAppointment={() => handleOpenAppointment()} />
          <AboutDoctor onOpenAppointment={() => handleOpenAppointment()} />
          <ServicesSection onOpenAppointment={handleOpenAppointment} />
          <ConditionsSection onOpenAppointment={handleOpenAppointment} />
          <PricingSection onOpenAppointment={handleOpenAppointment} />
          <GallerySection />
          <ClinicLocation />
          <TestimonialsSection />
          <FaqSection onOpenAppointment={handleOpenAppointment} />
          <ContactSection onOpenAppointment={() => handleOpenAppointment()} />
        </main>

        {/* Footer */}
        <Footer
          onOpenAppointment={() => handleOpenAppointment()}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenTerms={() => setIsTermsOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Modals & Floating Action Widgets */}
        <AppointmentModal
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
          preselectedService={preselectedService}
        />

        <PrivacyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />

        <TermsModal
          isOpen={isTermsOpen}
          onClose={() => setIsTermsOpen(false)}
        />

        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />

        <WhatsAppFloat />
      </div>
    </ClinicProvider>
  );
}
