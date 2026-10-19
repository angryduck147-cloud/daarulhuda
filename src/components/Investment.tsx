import React, { useState } from 'react';
import { PONDOK_INFO } from '../data/initialData';
import { GoldDivider, IslamicStarIcon } from './IslamicOrnament';
import { Language, TRANSLATIONS } from '../data/translations';

interface InvestmentProps {
  currentLang: Language;
}

export const Investment: React.FC<InvestmentProps> = ({ currentLang }) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[currentLang].feesSection;

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(PONDOK_INFO.bankInfo.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatPrice = (amount: number) => {
    if (currentLang === 'AR') {
      if (amount === 300000) return '٣٠٠،٠٠٠ روبية';
      if (amount === 800000) return '٨٠٠،٠٠٠ روبية';
      if (amount === 8000000) return '٨،٠٠٠،٠٠٠ روبية';
      return `${amount} روبية`;
    }
    if (currentLang === 'EN') {
      return `IDR ${amount.toLocaleString('en-US')}`;
    }
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  return (
    <section id="biaya" className="py-16 sm:py-20 md:py-28 bg-[#0c120f] text-white relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20">
        
        <GoldDivider
          subtitle={t.subtitle}
          title={t.title}
          light
        />

        <p className="max-w-2xl mx-auto text-center text-sm text-slate-400 mb-16 font-normal">
          {t.desc}
        </p>

        {/* 3 Kartu Biaya Utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Biaya Pendaftaran */}
          <div className="p-7 rounded-xl bg-[#121915] border border-white/10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#7E9F8B] uppercase">
                {t.regFeeTag}
              </span>
              <h3 className={`mt-1 text-lg font-bold text-white ${
                currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
              }`}>
                {t.regFeeTitle}
              </h3>
              <div className={`mt-4 text-3xl font-bold text-white ${
                currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
              }`}>
                {formatPrice(300000)}
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed font-normal">
                {t.regFeeDesc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400">
              {t.regFeeNote}
            </div>
          </div>

          {/* Infak Bulanan */}
          <div className="p-7 rounded-xl bg-[#141f19] border border-emerald-600/30 flex flex-col justify-between shadow-sm relative">
            <div className={`absolute top-4 ${currentLang === 'AR' ? 'left-4' : 'right-4'} px-2 py-0.5 rounded bg-white/10 text-slate-300 font-semibold text-[10px] uppercase`}>
              {t.monthlyPeriod}
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#7E9F8B] uppercase">
                {t.monthlyTag}
              </span>
              <h3 className={`mt-1 text-lg font-bold text-white ${
                currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
              }`}>
                {t.monthlyTitle}
              </h3>
              <div className={`mt-4 text-3xl font-bold text-[#F5A623] ${
                currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
              }`}>
                {formatPrice(800000)}
              </div>
              <p className="mt-3 text-xs text-slate-300 leading-relaxed font-normal">
                {t.monthlyDesc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
              {t.monthlyNote}
            </div>
          </div>

          {/* Biaya Daftar Ulang */}
          <div className="p-7 rounded-xl bg-[#121915] border border-white/10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#7E9F8B] uppercase">
                {t.reRegTag}
              </span>
              <h3 className={`mt-1 text-lg font-bold text-white ${
                currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
              }`}>
                {t.reRegTitle}
              </h3>
              <div className={`mt-4 text-3xl font-bold text-white ${
                currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
              }`}>
                {formatPrice(8000000)}
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed font-normal">
                {t.reRegDesc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400">
              {t.reRegNote}
            </div>
          </div>

        </div>

        {/* Petunjuk & Rekening */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Petunjuk Pendaftaran */}
          <div className="lg:col-span-7 rounded-xl bg-[#121915] border border-white/10 p-6 sm:p-8">
            <h4 className={`text-base font-bold text-white mb-5 flex items-center gap-2 ${
              currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
            }`}>
              <IslamicStarIcon className="w-4 h-4 text-[#7E9F8B]" />
              <span>{t.instructionTitle}</span>
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/10 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {currentLang === 'AR' ? '١' : '1'}
                </span>
                <div>
                  <h5 className="text-sm font-semibold text-white">{t.instruction1Title}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.instruction1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/10 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {currentLang === 'AR' ? '٢' : '2'}
                </span>
                <div>
                  <h5 className="text-sm font-semibold text-white">{t.instruction2Title}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.instruction2Desc}
                  </p>
                  <code className="block mt-1.5 p-2 rounded bg-black/40 border border-white/10 text-xs text-[#E5B869] font-mono" dir="ltr">
                    {t.instructionFormatCode}
                  </code>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/10 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {currentLang === 'AR' ? '٣' : '3'}
                </span>
                <div>
                  <h5 className="text-sm font-semibold text-white">{t.instruction3Title}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.instruction3Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/10 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {currentLang === 'AR' ? '٤' : '4'}
                </span>
                <div>
                  <h5 className="text-sm font-semibold text-white">{t.instruction4Title}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.instruction4Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kotak Rekening */}
          <div className="lg:col-span-5 rounded-xl bg-[#141f19] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#7E9F8B] uppercase tracking-wider">
                {t.bankOfficialTitle}
              </span>
              <h4 className={`mt-1 text-xl font-bold text-white ${
                currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
              }`}>
                {t.bankName}
              </h4>
              
              <div className="mt-4 p-4 rounded-lg bg-[#0e1612] border border-white/10">
                <div className="text-xs text-slate-400 mb-1">{t.accountNumberLabel}</div>
                <div className="text-xl font-mono font-bold text-[#E5B869] tracking-wider" dir="ltr">
                  {PONDOK_INFO.bankInfo.accountNumber}
                </div>
                <div className="mt-1.5 text-xs text-slate-300">
                  {t.accountHolderLabel} <strong className="text-white">{PONDOK_INFO.bankInfo.accountHolder}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={copyAccountNumber}
                className="mt-3 w-full py-2.5 px-4 text-xs font-semibold text-slate-900 bg-[#F5A623] hover:bg-[#E59715] rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {copied ? t.copySuccess : t.copyBtn}
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <a
                href="#pendaftaran"
                className="text-xs font-semibold text-[#7E9F8B] hover:text-white underline"
              >
                {t.continueFormLink}
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
