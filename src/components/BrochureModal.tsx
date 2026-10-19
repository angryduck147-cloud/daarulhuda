import React from 'react';
import { PONDOK_INFO, REGISTRATION_REQUIREMENTS, REGISTRATION_REQUIREMENTS_EN, REGISTRATION_REQUIREMENTS_AR } from '../data/initialData';
import { IslamicStarIcon } from './IslamicOrnament';
import { Language, TRANSLATIONS } from '../data/translations';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose, currentLang }) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLang].modals.brochure;
  const activeRequirements = currentLang === 'AR'
    ? REGISTRATION_REQUIREMENTS_AR
    : currentLang === 'EN'
    ? REGISTRATION_REQUIREMENTS_EN
    : REGISTRATION_REQUIREMENTS;

  const quote = currentLang === 'AR' && (PONDOK_INFO as any).quoteAr
    ? (PONDOK_INFO as any).quoteAr
    : currentLang === 'EN' && (PONDOK_INFO as any).quoteEn
    ? (PONDOK_INFO as any).quoteEn
    : PONDOK_INFO.quote;

  const diplomas = currentLang === 'AR' && (PONDOK_INFO as any).diplomasAr
    ? (PONDOK_INFO as any).diplomasAr
    : currentLang === 'EN' && (PONDOK_INFO as any).diplomasEn
    ? (PONDOK_INFO as any).diplomasEn
    : PONDOK_INFO.diplomas;

  const slogan = currentLang === 'AR' && (PONDOK_INFO as any).sloganAr
    ? (PONDOK_INFO as any).sloganAr
    : currentLang === 'EN' && (PONDOK_INFO as any).sloganEn
    ? (PONDOK_INFO as any).sloganEn
    : PONDOK_INFO.slogan;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="max-w-4xl w-full bg-[#121915] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-white my-auto">
        
        {/* Top Action Bar */}
        <div className="p-4 bg-[#0e1612] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IslamicStarIcon className="w-4 h-4 text-[#7E9F8B]" />
            <span className={`font-bold text-white text-sm sm:text-base ${
              currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
            }`}>
              {t.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-[#F5A623] hover:bg-[#E59715] rounded-lg transition-colors"
            >
              {t.printBtn}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Brochure Body */}
        <div className="p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Header Banner */}
          <div className="text-center border-b border-white/10 pb-6">
            <span className="text-sm font-arabic text-[#7E9F8B] block mb-1">
              معهد دار الهدى الإسلامي للبنات
            </span>
            <h2 className={`text-2xl sm:text-3xl font-bold text-white tracking-wide ${
              currentLang === 'AR' ? 'font-arabic text-3xl' : 'font-serif-royal'
            }`}>
              {currentLang === 'AR' ? PONDOK_INFO.arabicName : PONDOK_INFO.name}
            </h2>
            <div className="inline-block mt-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#7E9F8B]">
              {slogan}
            </div>
            <p className={`mt-3 text-base font-bold text-slate-200 ${
              currentLang === 'AR' ? 'font-arabic text-lg' : 'font-serif-royal'
            }`}>
              {t.kicker}
            </p>
            <p className="text-xs text-slate-400 font-normal">
              {t.subkicker}
            </p>
          </div>

          {/* Quotes */}
          <div className="p-5 rounded-xl bg-[#0e1612] border border-white/5 text-center">
            <p className={`text-sm text-slate-200 italic leading-relaxed ${
              currentLang === 'AR' ? 'font-arabic text-base not-italic' : 'font-serif-royal'
            }`}>
              "{quote}"
            </p>
            <p className="text-xs text-slate-400 mt-2 font-normal">
              {diplomas}
            </p>
          </div>

          {/* 2-Column Grid Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            {/* Persyaratan */}
            <div className="p-5 rounded-xl bg-[#141f19] border border-white/10">
              <h4 className={`font-bold text-white text-sm mb-3 flex items-center gap-1.5 ${
                currentLang === 'AR' ? 'font-arabic text-base' : 'font-serif-royal'
              }`}>
                <IslamicStarIcon className="w-4 h-4 text-[#7E9F8B]" />
                <span>{t.requirements}</span>
              </h4>
              <ul className="space-y-1.5 text-slate-300 font-normal">
                {activeRequirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#7E9F8B]">✓</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Investasi Pendidikan */}
            <div className="p-5 rounded-xl bg-[#141f19] border border-white/10 flex flex-col justify-between">
              <div>
                <h4 className={`font-bold text-white text-sm mb-3 flex items-center gap-1.5 ${
                  currentLang === 'AR' ? 'font-arabic text-base' : 'font-serif-royal'
                }`}>
                  <IslamicStarIcon className="w-4 h-4 text-[#7E9F8B]" />
                  <span>{t.investment}</span>
                </h4>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center justify-between pb-1 border-b border-white/5">
                    <span>{currentLang === 'AR' ? 'رسوم التسجيل:' : currentLang === 'EN' ? 'Application Fee:' : 'Biaya Pendaftaran:'}</span>
                    <strong className="text-white" dir="ltr">Rp 300.000</strong>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-white/5">
                    <span>{t.monthlyLabel}</span>
                    <strong className="text-[#F5A623]" dir="ltr">Rp 800.000</strong>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-white/5">
                    <span>{t.reRegLabel}</span>
                    <strong className="text-white" dir="ltr">Rp 8.000.000</strong>
                  </div>
                </div>

                <div className="mt-4 p-2.5 rounded bg-[#0e1612] border border-white/5 text-[11px] text-slate-400 font-normal">
                  <strong className="text-[#7E9F8B] block mb-0.5">{t.scholarshipLabel}</strong>
                  {t.scholarshipText}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <span className="text-slate-400 block text-[11px] mb-0.5">
                  {currentLang === 'AR' ? 'الحساب الرسمي في بنك BRI:' : 'Rekening BRI Resmi:'}
                </span>
                <span className="text-sm font-mono font-bold text-[#E5B869] block" dir="ltr">
                  {PONDOK_INFO.bankInfo.accountNumber}
                </span>
                <span className="text-[11px] text-slate-300">
                  {currentLang === 'AR' ? 'باسم: ' : 'an. '}
                  {PONDOK_INFO.bankInfo.accountHolder}
                </span>
              </div>
            </div>

          </div>

          {/* Kontak Panitia PSB */}
          <div className="pt-2 border-t border-white/10">
            <h5 className={`font-bold text-white text-xs mb-3 uppercase tracking-wider ${
              currentLang === 'AR' ? 'font-arabic text-sm' : 'font-serif-royal'
            }`}>
              {t.contacts}
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {PONDOK_INFO.admins.map((adm, idx) => {
                const adminLabel = currentLang === 'AR' && (adm as any).labelAr
                  ? (adm as any).labelAr
                  : currentLang === 'EN' && (adm as any).labelEn
                  ? (adm as any).labelEn
                  : adm.label;

                return (
                  <div key={idx} className="p-3 rounded-lg bg-[#0e1612] border border-white/5">
                    <span className="text-[#7E9F8B] font-medium block text-[11px]">
                      {adminLabel}
                    </span>
                    <span className="font-mono text-slate-200 block text-xs mt-0.5" dir="ltr">
                      {adm.number}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
