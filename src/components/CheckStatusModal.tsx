import React, { useState } from 'react';
import { RegistrationData } from '../types';
import { IslamicStarIcon } from './IslamicOrnament';
import { Language, TRANSLATIONS } from '../data/translations';

interface CheckStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  registrations: RegistrationData[];
}

export const CheckStatusModal: React.FC<CheckStatusModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  registrations,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const t = TRANSLATIONS[currentLang].modals.checkStatus;

  if (!isOpen) return null;

  const filtered = registrations.filter((reg) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      reg.registrationNumber.toLowerCase().includes(term) ||
      reg.student.fullName.toLowerCase().includes(term) ||
      reg.parent.whatsappNumber.includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[#121915] border border-white/15 rounded-xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-[#0e1612] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <IslamicStarIcon className="w-4 h-4 text-[#7E9F8B]" />
            <div>
              <h3 className={`text-base font-bold text-white ${
                currentLang === 'AR' ? 'font-arabic text-lg' : 'font-serif-royal'
              }`}>
                {t.title}
              </h3>
              <p className="text-[11px] text-slate-400 font-normal">
                {t.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-[#141d18] border-b border-white/10 shrink-0">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.placeholder}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
            />
            <svg
              className={`w-4 h-4 text-slate-400 absolute ${currentLang === 'AR' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Content List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm">
                {t.notFound}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                {t.notFoundHint}
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-lg bg-[#141f19] border border-white/10 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#E5B869] bg-black/40 px-2 py-0.5 rounded border border-white/10" dir="ltr">
                      {item.registrationNumber}
                    </span>
                    <h4 className={`text-base font-bold text-white mt-1.5 ${
                      currentLang === 'AR' ? 'font-arabic text-lg' : 'font-serif-royal'
                    }`}>
                      {item.student.fullName}
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                      {currentLang === 'AR' ? 'بانتظار التحقق' : currentLang === 'EN' ? 'Pending Verification' : item.status}
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-1">
                      {item.submittedAt}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block">{t.school}</span>
                    <span>{item.student.previousSchool}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t.track}</span>
                    <span className="text-[#E5B869]">
                      {item.track === 'reguler' ? t.trackReguler : t.trackScholarship}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t.parent}</span>
                    <span dir="ltr">{item.parent.whatsappNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t.sender}</span>
                    <span>{item.payment.bankSenderName} ({item.payment.transferDate})</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0e1612] border-t border-white/10 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            {currentLang === 'AR' ? 'إغلاق' : currentLang === 'EN' ? 'Close' : 'Tutup'}
          </button>
        </div>

      </div>
    </div>
  );
};
