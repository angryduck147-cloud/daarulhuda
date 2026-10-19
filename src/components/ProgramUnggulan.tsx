import React from 'react';
import { GRADUATION_TARGETS, EXCELLENT_FACILITIES, EXTRACURRICULARS } from '../data/initialData';
import { GoldDivider, IslamicStarIcon } from './IslamicOrnament';
import { Language, TRANSLATIONS } from '../data/translations';

interface ProgramUnggulanProps {
  currentLang: Language;
}

export const ProgramUnggulan: React.FC<ProgramUnggulanProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].curriculumSection;

  return (
    <section id="program" className="py-16 sm:py-20 md:py-28 bg-[#0f1612] text-white relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20">
        
        {/* Section 1: Target Lulusan */}
        <div>
          <GoldDivider
            subtitle={t.subtitle}
            title={t.title}
            light
          />

          <p className="max-w-2xl mx-auto text-center text-sm text-slate-400 mb-16 font-normal">
            {t.desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GRADUATION_TARGETS.map((target, idx) => {
              const targetTitle = currentLang === 'AR' && target.titleAr
                ? target.titleAr
                : currentLang === 'EN' && target.titleEn
                ? target.titleEn
                : target.title;

              const targetDesc = currentLang === 'AR' && target.descAr
                ? target.descAr
                : currentLang === 'EN' && target.descEn
                ? target.descEn
                : target.desc;

              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#131d17] border border-white/10 hover:border-white/20 transition-all flex items-start gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-[#7E9F8B] flex items-center justify-center shrink-0">
                    <IslamicStarIcon className="w-5 h-5 text-[#A3B899]" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-white ${
                      currentLang === 'AR' ? 'font-arabic text-base' : 'font-serif-royal text-base md:text-lg'
                    }`}>
                      {targetTitle}
                    </h4>
                    <p className="mt-1.5 text-xs text-slate-400 leading-relaxed font-normal">
                      {targetDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Fasilitas Unggul */}
        <div id="fasilitas" className="mt-24">
          <GoldDivider
            subtitle={t.facilitiesSubtitle}
            title={t.facilitiesTitle}
            light
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXCELLENT_FACILITIES.map((fac, idx) => {
              const facName = currentLang === 'AR' && fac.nameAr
                ? fac.nameAr
                : currentLang === 'EN' && fac.nameEn
                ? fac.nameEn
                : fac.name;

              const facDesc = currentLang === 'AR' && fac.descAr
                ? fac.descAr
                : currentLang === 'EN' && fac.descEn
                ? fac.descEn
                : fac.desc;

              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#131d17] border border-white/10 hover:border-white/20 transition-all shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3 text-xs text-[#7E9F8B] font-semibold">
                    <span>{t.facilityPrefix} 0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7E9F8B]"></span>
                  </div>
                  <h4 className={`font-bold text-white ${
                    currentLang === 'AR' ? 'font-arabic text-base' : 'font-serif-royal text-base md:text-lg'
                  }`}>
                    {facName}
                  </h4>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed font-normal">
                    {facDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: 8 Ekstrakurikuler */}
        <div className="mt-24">
          <GoldDivider
            subtitle={t.ekskulSubtitle}
            title={t.ekskulTitle}
            light
          />

          <p className="max-w-xl mx-auto text-center text-xs text-slate-400 mb-10 font-normal">
            {t.ekskulDesc}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {EXTRACURRICULARS.map((ekskul, idx) => {
              const ekskulName = currentLang === 'AR' && ekskul.nameAr
                ? ekskul.nameAr
                : currentLang === 'EN' && ekskul.nameEn
                ? ekskul.nameEn
                : ekskul.name;

              const ekskulCat = currentLang === 'AR' && ekskul.categoryAr
                ? ekskul.categoryAr
                : currentLang === 'EN' && ekskul.categoryEn
                ? ekskul.categoryEn
                : ekskul.category;

              const ekskulDesc = currentLang === 'AR' && ekskul.descAr
                ? ekskul.descAr
                : currentLang === 'EN' && ekskul.descEn
                ? ekskul.descEn
                : ekskul.desc;

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#131d17] border border-white/10 hover:border-white/20 transition-all text-center group"
                >
                  <div className="w-8 h-8 mx-auto rounded-full bg-white/5 text-slate-300 flex items-center justify-center font-bold text-xs group-hover:bg-[#F5A623] group-hover:text-slate-950 transition-colors">
                    0{idx + 1}
                  </div>
                  <h5 className={`mt-3 font-bold text-sm text-white ${
                    currentLang === 'AR' ? 'font-arabic text-base' : 'font-serif-royal'
                  }`}>
                    {ekskulName}
                  </h5>
                  <span className="inline-block mt-1 text-[11px] text-[#7E9F8B]">
                    {ekskulCat}
                  </span>
                  <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 font-normal">
                    {ekskulDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
