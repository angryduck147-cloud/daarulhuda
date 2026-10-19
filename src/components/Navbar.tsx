import React, { useState } from 'react';
import { IslamicStarIcon } from './IslamicOrnament';
import { Language, TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onToggleLang: (lang: Language) => void;
  onOpenCheckStatus: () => void;
  onOpenBrochure: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onToggleLang,
  onOpenCheckStatus,
  onOpenBrochure,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang].nav;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b110e]/95 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand / Logo Zone */}
        <a href="#" className="flex items-center gap-2 sm:gap-3 shrink-0 group min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-[#14231b] border border-emerald-600/40 p-1 flex items-center justify-center shadow-md group-hover:border-amber-400/60 transition-colors shrink-0">
            <IslamicStarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#7E9F8B] group-hover:text-amber-400 transition-colors" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className={`text-xs sm:text-base lg:text-lg font-bold tracking-wider text-white leading-none truncate ${
              currentLang === 'AR' ? 'font-arabic text-sm sm:text-xl' : 'font-serif-royal uppercase'
            }`}>
              {currentLang === 'AR' ? 'معهد دار الهدى' : 'DAARUL HUDA'}
            </span>
            <span className="text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-slate-400 font-sans uppercase mt-0.5 sm:mt-1 truncate hidden xs:block">
              {currentLang === 'AR' ? 'الإسلامي للبنات' : 'ISLAMIC BOARDING SCHOOL'}
            </span>
          </div>
        </a>

        {/* Center Nav Links - tuned for 2xl / xl responsive laptop display without squeezing */}
        <nav className="hidden 2xl:flex items-center gap-4 text-xs font-bold tracking-wider text-slate-300">
          <a href="#slideshow" className="text-[#E5B869] hover:text-amber-300 transition-colors whitespace-nowrap">
            {t.home}
          </a>
          <span className="text-slate-600 text-[10px]">•</span>
          <a href="#masyayikh" className="hover:text-white transition-colors whitespace-nowrap">
            {t.about}
          </a>
          <span className="text-slate-600 text-[10px]">•</span>
          <a href="#prestasi" className="hover:text-white transition-colors whitespace-nowrap">
            {t.excellence}
          </a>
          <span className="text-slate-600 text-[10px]">•</span>
          <a href="#program" className="hover:text-white transition-colors whitespace-nowrap">
            {t.curriculum}
          </a>
          <span className="text-slate-600 text-[10px]">•</span>
          <a href="#fasilitas" className="hover:text-white transition-colors whitespace-nowrap">
            {t.facilities}
          </a>
          <span className="text-slate-600 text-[10px]">•</span>
          <a href="#biaya" className="hover:text-white transition-colors whitespace-nowrap">
            {t.fees}
          </a>
          <span className="text-slate-600 text-[10px]">•</span>
          <a href="#galeri" className="hover:text-white transition-colors whitespace-nowrap">
            {t.gallery}
          </a>
          <span className="text-slate-600 text-[10px]">•</span>
          <a href="#kontak" className="hover:text-white transition-colors whitespace-nowrap">
            {t.contact}
          </a>
        </nav>

        {/* Compact Nav for 1024px - 1439px Laptop screens */}
        <nav className="hidden xl:flex 2xl:hidden items-center gap-2.5 text-[11px] font-semibold tracking-wider text-slate-300">
          <a href="#slideshow" className="text-[#E5B869] hover:text-amber-300 transition-colors whitespace-nowrap">
            {t.home}
          </a>
          <a href="#masyayikh" className="hover:text-white transition-colors whitespace-nowrap">
            {t.about}
          </a>
          <a href="#prestasi" className="hover:text-white transition-colors whitespace-nowrap">
            {t.excellence}
          </a>
          <a href="#program" className="hover:text-white transition-colors whitespace-nowrap">
            {t.curriculum}
          </a>
          <a href="#biaya" className="hover:text-white transition-colors whitespace-nowrap">
            {t.fees}
          </a>
          <a href="#galeri" className="hover:text-white transition-colors whitespace-nowrap">
            {t.gallery}
          </a>
        </nav>

        {/* Right Zone: 3-Language Selector + Cek Status + Daftar PSB - Guaranteed No Clipping */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Active 3-Way Language Switch: ID | EN | عربي */}
          <div className="flex items-center text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-400 bg-[#141d18] border border-white/15 rounded-lg p-0.5 sm:px-1.5 sm:py-1 gap-0.5 sm:gap-1 shadow-sm shrink-0">
            <button
              type="button"
              onClick={() => onToggleLang('ID')}
              title="Bahasa Indonesia"
              className={`px-1.5 sm:px-2 py-0.5 rounded transition-colors ${
                currentLang === 'ID'
                  ? 'text-white font-bold bg-white/20 shadow-sm'
                  : 'hover:text-white text-slate-400'
              }`}
            >
              ID
            </button>
            <span className="text-slate-600 text-[9px]">|</span>
            <button
              type="button"
              onClick={() => onToggleLang('EN')}
              title="English"
              className={`px-1.5 sm:px-2 py-0.5 rounded transition-colors ${
                currentLang === 'EN'
                  ? 'text-white font-bold bg-white/20 shadow-sm'
                  : 'hover:text-white text-slate-400'
              }`}
            >
              EN
            </button>
            <span className="text-slate-600 text-[9px]">|</span>
            <button
              type="button"
              onClick={() => onToggleLang('AR')}
              title="اللغة العربية"
              className={`px-1.5 sm:px-2 py-0.5 rounded transition-colors font-arabic text-[11px] sm:text-xs ${
                currentLang === 'AR'
                  ? 'text-amber-300 font-bold bg-white/20 shadow-sm'
                  : 'hover:text-white text-slate-400'
              }`}
            >
              عربي
            </button>
          </div>

          {/* Cek Status Button (Desktop only) */}
          <button
            type="button"
            onClick={onOpenCheckStatus}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-300 bg-[#101b15] hover:bg-[#15251d] border border-emerald-600/40 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{t.checkStatus}</span>
          </button>

          {/* Daftar PSB Button (Always fully visible, shrink-0, perfectly fitted on both Laptop and Mobile) */}
          <a
            href="#pendaftaran"
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-slate-900 bg-[#F5A623] hover:bg-[#E59715] rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <svg className="w-3.5 h-3.5 text-slate-950 shrink-0 hidden xs:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span>{t.registerPSB}</span>
          </a>

          {/* Mobile & Tablet hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none shrink-0"
            aria-label="Toggle navigation"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0e1612] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs text-slate-400">
              {currentLang === 'AR' ? 'اختر اللغة:' : currentLang === 'EN' ? 'Language:' : 'Pilih Bahasa:'}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onToggleLang('ID')}
                className={`px-2.5 py-1 rounded text-xs ${currentLang === 'ID' ? 'bg-white/20 text-white font-bold' : 'text-slate-400'}`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('EN')}
                className={`px-2.5 py-1 rounded text-xs ${currentLang === 'EN' ? 'bg-white/20 text-white font-bold' : 'text-slate-400'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('AR')}
                className={`px-2.5 py-1 rounded text-xs font-arabic ${currentLang === 'AR' ? 'bg-white/20 text-amber-300 font-bold' : 'text-slate-400'}`}
              >
                عربي
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <a
              href="#slideshow"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              {t.home}
            </a>
            <a
              href="#masyayikh"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              {t.about}
            </a>
            <a
              href="#prestasi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              {t.excellence}
            </a>
            <a
              href="#program"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              {t.curriculum}
            </a>
            <a
              href="#fasilitas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              {t.facilities}
            </a>
            <a
              href="#biaya"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              {t.fees}
            </a>
            <a
              href="#galeri"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              {t.gallery}
            </a>
            <a
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              {t.contact}
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckStatus();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-center text-emerald-300 bg-[#101b15] border border-emerald-600/40 rounded-lg"
            >
              {t.checkStatus}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrochure();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-center text-slate-300 bg-white/5 border border-white/10 rounded-lg"
            >
              {t.officialBrochure}
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
