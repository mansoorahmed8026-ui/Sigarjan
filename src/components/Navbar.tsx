import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  Calendar,
  Menu,
  X,
  MapPin,
  Clock,
  Settings
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface NavbarProps {
  onOpenAppointment: (serviceName?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAppointment, onOpenAdmin }) => {
  const { config } = useClinic();
  const { clinic, doctor } = config;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Conditions', href: '#conditions' },
    { name: 'Fees', href: '#fees' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact', href: '#contact' },
  ];

  const formattedWhatsAppUrl = `https://wa.me/${clinic.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Dr. SAFEER MENGAL, I would like to inquire about a speech therapy consultation.`
  )}`;

  return (
    <>
      {/* Top Professional Information Bar */}
      <div className="bg-[#065f46] text-slate-100 text-xs py-2 px-4 hidden md:block border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-100">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{clinic.address}, {clinic.city}</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-100">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Timings: {clinic.openingHoursSummary}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${clinic.phone}`}
              className="flex items-center gap-1 text-white hover:text-[#d4af37] transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>{clinic.phone}</span>
            </a>
            <span className="text-emerald-400">|</span>
            <a
              href={formattedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {clinic.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200'
            : 'bg-white py-4 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Branding */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#065f46] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-emerald-900 transition-colors">
              SM
            </div>
            <div>
              <span className="font-bold text-xl text-[#065f46] tracking-tight block leading-tight">
                Dr. SAFEER MENGAL
              </span>
              <span className="font-light text-slate-500 uppercase text-[10px] tracking-widest block">
                Speech Clinic • {clinic.city}
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold uppercase tracking-tight transition-all ${
                  idx === 0
                    ? 'text-[#065f46] border-b-2 border-[#065f46]'
                    : 'text-slate-600 hover:text-[#065f46] hover:bg-emerald-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Callouts */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenAppointment()}
              className="bg-[#d4af37] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-[#b8962f] transition-all flex items-center gap-2 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => onOpenAppointment()}
              className="bg-[#d4af37] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm"
            >
              Book
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#065f46] hover:bg-slate-100 border border-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-200">
            <div className="space-y-1 mb-4">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-emerald-50 hover:text-[#065f46] uppercase tracking-wider transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#d4af37] text-white font-bold py-3 rounded-full shadow text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Now</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
