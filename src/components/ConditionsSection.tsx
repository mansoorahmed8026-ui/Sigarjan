import React, { useState } from 'react';
import {
  Baby,
  Brain,
  Smile,
  Activity,
  VolumeX,
  HeartPulse,
  AlertCircle,
  HelpCircle,
  Calendar,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

interface ConditionsSectionProps {
  onOpenAppointment: (serviceName?: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Baby: <Baby className="w-6 h-6 text-teal-600" />,
  Brain: <Brain className="w-6 h-6 text-sky-600" />,
  Smile: <Smile className="w-6 h-6 text-amber-600" />,
  Activity: <Activity className="w-6 h-6 text-emerald-600" />,
  VolumeX: <VolumeX className="w-6 h-6 text-rose-600" />,
  HeartPulse: <HeartPulse className="w-6 h-6 text-purple-600" />
};

export const ConditionsSection: React.FC<ConditionsSectionProps> = ({ onOpenAppointment }) => {
  const { config } = useClinic();
  const { conditions, clinic } = config;
  const [selectedConditionId, setSelectedConditionId] = useState<string>(conditions[0]?.id || '');

  const activeCondition = conditions.find(c => c.id === selectedConditionId) || conditions[0];

  return (
    <section id="conditions" className="py-16 lg:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-sky-700" />
            <span>Educational Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Communication Concerns We Assess & Treat
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Understand key signs and know when to seek early clinical evaluation for your child or loved one in {clinic.city}.
          </p>
        </div>

        {/* Layout Grid: Selector Column & Detailed Interactive View Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
              Select A Communication Concern:
            </p>
            {conditions.map(condition => {
              const isSelected = condition.id === activeCondition?.id;
              return (
                <button
                  key={condition.id}
                  onClick={() => setSelectedConditionId(condition.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]'
                      : 'bg-white text-slate-800 border-slate-200/80 hover:border-teal-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-slate-800' : 'bg-teal-50'}`}>
                      {iconMap[condition.iconName] || <Brain className="w-5 h-5 text-teal-600" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base leading-tight">
                        {condition.title}
                      </h3>
                      <p className={`text-xs mt-0.5 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {condition.shortExplanation}
                      </p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-teal-400' : 'bg-transparent'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Condition Card */}
          {activeCondition && (
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
              
              <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                <div className="p-3.5 rounded-2xl bg-teal-50 text-teal-700 shrink-0">
                  {iconMap[activeCondition.iconName] || <Brain className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {activeCondition.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    {activeCondition.shortExplanation}
                  </p>
                </div>
              </div>

              {/* Common Signs Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Common Signs & Indicators:</span>
                </h4>
                <ul className="space-y-2.5">
                  {activeCondition.commonSigns.map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to Consult SLP */}
              <div className="bg-teal-50/80 border border-teal-200 rounded-2xl p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-700" />
                  <span>When To Seek Clinical Assessment:</span>
                </h4>
                <p className="text-sm text-teal-950 font-medium leading-relaxed">
                  {activeCondition.whenToConsult}
                </p>
              </div>

              {/* Call to Action for Assessment */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Early clinical assessment provides the best path to progress.
                </p>
                <button
                  onClick={() => onOpenAppointment(activeCondition.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-700 to-sky-800 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-emerald-300" />
                  <span>Book Assessment for {activeCondition.title}</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Mandatory Educational Disclaimer */}
        <div className="mt-12 bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 text-amber-900 text-xs sm:text-sm flex items-start gap-3 max-w-4xl mx-auto">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Medical Disclaimer:</strong> This information is provided for general educational purposes only and does not replace an individual clinical assessment or diagnosis by a qualified healthcare professional.
          </div>
        </div>

      </div>
    </section>
  );
};
