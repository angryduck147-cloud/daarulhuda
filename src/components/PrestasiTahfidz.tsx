import React from 'react';
import { FAST_MEMORIZERS } from '../data/initialData';
import { GoldDivider, IslamicStarIcon, QuranIcon } from './IslamicOrnament';
import { Language, TRANSLATIONS } from '../data/translations';

interface PrestasiTahfidzProps {
  currentLang: Language;
}

export const PrestasiTahfidz: React.FC<PrestasiTahfidzProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].excellenceSection;

  return (
    <section id="prestasi" className="py-16 sm:py-20 md:py-28 bg-[#0c120f] text-white relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20">
        
        <GoldDivider
          subtitle={t.subtitle}
          title={t.title}
          light
        />

        <p className="max-w-2xl mx-auto text-center text-sm text-slate-400 mb-16 font-normal">
          {t.desc}
        </p>

        {/* Grid Kartu Prestasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FAST_MEMORIZERS.map((item, idx) => {
            const studentName = currentLang === 'AR' && item.nameAr
              ? item.nameAr
              : currentLang === 'EN' && item.nameEn
              ? item.nameEn
              : item.name;

            const achievement = currentLang === 'AR' && item.achievementAr
              ? item.achievementAr
              : currentLang === 'EN' && item.achievementEn
              ? item.achievementEn
              : item.achievement;

            const duration = currentLang === 'AR' && item.durationAr
              ? item.durationAr
              : currentLang === 'EN' && item.durationEn
              ? item.durationEn
              : item.duration;

            return (
              <div
                key={item.id}
                className="p-6 rounded-xl bg-[#111814] border border-white/10 hover:border-white/20 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] font-medium text-[#7E9F8B]">
                    {t.mutqinBadge}
                  </span>
                </div>

                <h4 className={`font-bold text-white ${
                  currentLang === 'AR' ? 'font-arabic text-lg' : 'font-serif-royal text-base md:text-lg'
                }`}>
                  {studentName}
                </h4>

                <div className="mt-3 p-3 rounded-lg bg-[#0d1410] border border-white/5">
                  <div className="text-xs text-slate-400">
                    {achievement}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#E5B869] flex items-center gap-1.5">
                    <IslamicStarIcon className="w-3.5 h-3.5 text-[#E5B869] shrink-0" />
                    <span>{t.timeLabel} {duration}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                  <QuranIcon className="w-3.5 h-3.5 text-[#7E9F8B]" />
                  <span>{t.methodDesc}</span>
                </div>
              </div>
            );
          })}

          {/* Banner Beasiswa Yatim Dhuafa 100% */}
          <div className="p-6 rounded-xl bg-[#141d18] border border-emerald-600/30 shadow-sm flex flex-col justify-between text-center relative">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-500/15 text-[#7E9F8B] font-semibold text-[11px] uppercase tracking-wider mb-3">
                {t.scholarshipTag}
              </span>
              <h4 className={`text-xl md:text-2xl font-bold text-white ${
                currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
              }`}>
                {t.scholarshipTitle}{' '}
                <span className="text-[#F5A623]">
                  {currentLang === 'AR' ? '١٠٠٪' : '100%'}
                </span>
              </h4>
              <p className="mt-1.5 text-xs text-slate-300 font-medium">
                {t.scholarshipSubtitle}
              </p>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed font-normal">
                {t.scholarshipDesc}
              </p>
            </div>

            <a
              href="#pendaftaran"
              className="mt-5 inline-block w-full py-2.5 px-4 text-xs font-bold text-slate-900 bg-[#F5A623] hover:bg-[#E59715] rounded-lg transition-colors"
            >
              {t.scholarshipBtn}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
