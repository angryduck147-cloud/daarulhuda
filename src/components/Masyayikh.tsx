import React from 'react';
import { MASYAYIKH_DATA } from '../data/initialData';
import { GoldDivider, IslamicImageFrame } from './IslamicOrnament';
import { Language, TRANSLATIONS } from '../data/translations';

interface MasyayikhProps {
  currentLang: Language;
  onOpenUploadModal: (targetId: string) => void;
}

export const Masyayikh: React.FC<MasyayikhProps> = ({ currentLang, onOpenUploadModal }) => {
  const t = TRANSLATIONS[currentLang].masyayikhSection;

  return (
    <section id="masyayikh" className="py-16 sm:py-20 md:py-28 bg-[#0c120f] text-white relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20 relative z-10">
        
        <GoldDivider
          subtitle={t.subtitle}
          title={t.title}
          light
        />

        <p className="max-w-2xl mx-auto text-center text-sm text-slate-400 mb-16 font-normal">
          {t.desc}
        </p>

        {/* Grid Dewan Pengajar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MASYAYIKH_DATA.map((item) => {
            const memberName = currentLang === 'AR' && item.nameAr
              ? item.nameAr
              : currentLang === 'EN' && item.nameEn
              ? item.nameEn
              : item.name;

            const memberRole = currentLang === 'AR' && item.roleAr
              ? item.roleAr
              : currentLang === 'EN' && item.roleEn
              ? item.roleEn
              : item.role;

            const memberTitle = currentLang === 'AR' && item.titleDescriptionAr
              ? item.titleDescriptionAr
              : currentLang === 'EN' && item.titleDescriptionEn
              ? item.titleDescriptionEn
              : item.titleDescription;

            const memberQualifications = currentLang === 'AR' && item.qualificationsAr
              ? item.qualificationsAr
              : currentLang === 'EN' && item.qualificationsEn
              ? item.qualificationsEn
              : item.qualifications;

            return (
              <div
                key={item.id}
                className="rounded-xl bg-[#111814] border border-white/10 p-5 flex flex-col justify-between hover:border-white/20 transition-all shadow-sm"
              >
                <div>
                  {/* Frame Foto Masyayikh */}
                  <div className="w-full aspect-[4/5] rounded-lg overflow-hidden mb-4 border border-white/10">
                    <IslamicImageFrame
                      src={item.imagePath}
                      alt={memberName}
                      category={memberRole}
                      onUploadRequest={() => onOpenUploadModal(item.id)}
                    />
                  </div>

                  {/* Badge Role */}
                  <div className="inline-block px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#7E9F8B] text-[11px] font-semibold uppercase tracking-wider mb-2">
                    {memberRole}
                  </div>

                  {/* Name */}
                  <h3 className={`font-bold text-white leading-snug ${
                    currentLang === 'AR' ? 'font-arabic text-lg' : 'font-serif-royal text-base md:text-lg'
                  }`}>
                    {memberName}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {memberTitle}
                  </p>

                  {/* Qualifications List */}
                  <ul className="mt-4 space-y-2 border-t border-white/5 pt-3">
                    {memberQualifications.map((q, qIdx) => (
                      <li key={qIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                        <span className="text-[#A3B899] mt-0.5">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-4 pt-3 border-t border-white/5 ${currentLang === 'AR' ? 'text-left' : 'text-right'}`}>
                  <button
                    type="button"
                    onClick={() => onOpenUploadModal(item.id)}
                    className="text-[11px] text-slate-400 hover:text-slate-200 underline"
                  >
                    {t.changePhoto}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visi & Misi Box */}
        <div className="mt-14 sm:mt-20 rounded-2xl bg-[#111814] border border-white/10 p-5 sm:p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Visi */}
            <div className={`lg:col-span-5 border-b lg:border-b-0 pb-6 lg:pb-0 ${
              currentLang === 'AR'
                ? 'lg:border-l lg:pl-8 border-white/10'
                : 'lg:border-r lg:pr-8 border-white/10'
            }`}>
              <span className="text-xs font-semibold tracking-wider text-[#7E9F8B] uppercase">
                {t.visiLabel}
              </span>
              <h3 className={`mt-1 text-2xl font-bold text-white ${
                currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
              }`}>
                {t.visiTitle}
              </h3>
              <p className={`mt-4 text-base text-slate-200 leading-relaxed italic p-5 rounded-xl bg-[#0d1410] border border-white/5 ${
                currentLang === 'AR' ? 'font-arabic text-lg not-italic leading-relaxed' : 'font-serif-royal'
              }`}>
                {t.visiQuote}
              </p>
            </div>

            {/* Misi */}
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold tracking-wider text-[#7E9F8B] uppercase">
                {t.misiLabel}
              </span>
              <h3 className={`mt-1 text-2xl font-bold text-white mb-4 ${
                currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
              }`}>
                {t.misiTitle}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#0d1410] border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {currentLang === 'AR' ? '١' : '1'}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {t.misi1}
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#0d1410] border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {currentLang === 'AR' ? '٢' : '2'}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {t.misi2}
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#0d1410] border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {currentLang === 'AR' ? '٣' : '3'}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {t.misi3}
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#0d1410] border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-white/10 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {currentLang === 'AR' ? '٤' : '4'}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {t.misi4}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
