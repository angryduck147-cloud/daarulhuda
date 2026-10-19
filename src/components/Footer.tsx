import React from 'react';
import { PONDOK_INFO } from '../data/initialData';
import { IslamicStarIcon } from './IslamicOrnament';
import { Language, TRANSLATIONS } from '../data/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].footer;
  const tNav = TRANSLATIONS[currentLang].nav;

  const slogan = currentLang === 'AR' && (PONDOK_INFO as any).sloganAr
    ? (PONDOK_INFO as any).sloganAr
    : currentLang === 'EN' && (PONDOK_INFO as any).sloganEn
    ? (PONDOK_INFO as any).sloganEn
    : PONDOK_INFO.slogan;

  return (
    <footer id="kontak" className="bg-[#090e0c] text-white border-t border-white/10 pt-14 sm:pt-16 pb-12 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#14231b] border border-white/10 flex items-center justify-center">
                <IslamicStarIcon className="w-5 h-5 text-[#7E9F8B]" />
              </div>
              <div>
                <h4 className={`font-bold text-white text-base leading-tight ${
                  currentLang === 'AR' ? 'font-arabic text-lg' : 'font-serif-royal'
                }`}>
                  {currentLang === 'AR' ? PONDOK_INFO.arabicName : PONDOK_INFO.name}
                </h4>
                <p className="text-xs text-slate-400 font-arabic">
                  {PONDOK_INFO.arabicName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              {t.desc}
            </p>

            <div className="text-xs text-[#7E9F8B] font-semibold">
              ✦ {slogan}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className={`font-bold text-white text-xs tracking-wider uppercase ${
              currentLang === 'AR' ? 'font-arabic text-sm' : 'font-serif-royal'
            }`}>
              {t.quickLinks}
            </h5>
            <ul className="space-y-2 text-xs text-slate-400 font-normal">
              <li>
                <a href="#slideshow" className="hover:text-white transition-colors">
                  {tNav.home}
                </a>
              </li>
              <li>
                <a href="#masyayikh" className="hover:text-white transition-colors">
                  {tNav.about}
                </a>
              </li>
              <li>
                <a href="#prestasi" className="hover:text-white transition-colors">
                  {tNav.excellence}
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-white transition-colors">
                  {tNav.curriculum}
                </a>
              </li>
              <li>
                <a href="#fasilitas" className="hover:text-white transition-colors">
                  {tNav.facilities}
                </a>
              </li>
              <li>
                <a href="#biaya" className="hover:text-white transition-colors">
                  {tNav.fees}
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-white transition-colors">
                  {tNav.gallery}
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak Admin PSB */}
          <div className="space-y-3">
            <h5 className={`font-bold text-white text-xs tracking-wider uppercase ${
              currentLang === 'AR' ? 'font-arabic text-sm' : 'font-serif-royal'
            }`}>
              {t.contactTitle}
            </h5>
            <div className="space-y-2 text-xs">
              {PONDOK_INFO.admins.map((adm, idx) => {
                const adminLabel = currentLang === 'AR' && (adm as any).labelAr
                  ? (adm as any).labelAr
                  : currentLang === 'EN' && (adm as any).labelEn
                  ? (adm as any).labelEn
                  : adm.label;

                return (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#111915] border border-white/5">
                    <span className="text-[#7E9F8B] font-medium block text-[11px]">
                      {adminLabel}
                    </span>
                    <a
                      href={`https://wa.me/${adm.raw}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-slate-200 hover:text-white flex items-center justify-between mt-0.5"
                    >
                      <span dir="ltr">{adm.number}</span>
                      <span className="text-[10px] text-[#F5A623]">
                        {t.chatWa}
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rekening & Media Sosial */}
          <div className="space-y-3">
            <h5 className={`font-bold text-white text-xs tracking-wider uppercase ${
              currentLang === 'AR' ? 'font-arabic text-sm' : 'font-serif-royal'
            }`}>
              {t.socialTitle}
            </h5>

            <div className="p-3 rounded-lg bg-[#111915] border border-white/10 text-xs">
              <span className="text-slate-400 block text-[11px]">{t.bankNote}</span>
              <span className="text-sm font-mono font-bold text-[#E5B869] block mt-0.5" dir="ltr">
                BRI {PONDOK_INFO.bankInfo.accountNumber}
              </span>
              <span className="text-[11px] text-slate-300">
                {t.accountHolderPrefix}
                {PONDOK_INFO.bankInfo.accountHolder}
              </span>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-slate-500 block mb-1.5">{t.socialFollow}</span>
              <div className="space-y-1 text-xs text-slate-300">
                <div>
                  <span className="text-slate-500">Instagram:</span> {PONDOK_INFO.socials.instagram}
                </div>
                <div>
                  <span className="text-slate-500">TikTok:</span> {PONDOK_INFO.socials.tiktok}
                </div>
                <div>
                  <span className="text-slate-500">YouTube:</span> {PONDOK_INFO.socials.youtube}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} {t.copyright}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{PONDOK_INFO.subName}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
