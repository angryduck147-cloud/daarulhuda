import React, { useState, useEffect, useRef } from 'react';
import { SlideItem } from '../types';
import { PONDOK_INFO, INITIAL_SLIDES } from '../data/initialData';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeroSlideshowProps {
  slides: SlideItem[];
  currentLang: Language;
  onOpenUploadModal: (slideId: string) => void;
  onOpenBrochure: () => void;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  slides,
  currentLang,
  onOpenUploadModal,
  onOpenBrochure,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const t = TRANSLATIONS[currentLang].hero;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex, slides.length]);

  const currentSlide = slides[currentIndex] || INITIAL_SLIDES[0];
  const matchingInitial = INITIAL_SLIDES.find((s) => s.id === currentSlide.id) || INITIAL_SLIDES[currentIndex] || INITIAL_SLIDES[0];

  const slideTitle = currentLang === 'AR'
    ? (currentSlide.titleAr || matchingInitial.titleAr || 'معهد دار الهدى الإسلامي للبنات')
    : currentLang === 'EN'
    ? (currentSlide.titleEn || matchingInitial.titleEn || currentSlide.title)
    : currentSlide.title;

  const slideSubtitle = currentLang === 'AR'
    ? (currentSlide.subtitleAr || matchingInitial.subtitleAr || 'برنامج تربوي متكامل لمدة ٦ سنوات قائم على الأدب والأخلاق وحفظ القرآن الكريم')
    : currentLang === 'EN'
    ? (currentSlide.subtitleEn || matchingInitial.subtitleEn || currentSlide.subtitle)
    : currentSlide.subtitle;

  const slideCategory = currentLang === 'AR'
    ? (currentSlide.categoryAr || matchingInitial.categoryAr || 'القبول والتسجيل الرسمي')
    : currentLang === 'EN'
    ? (currentSlide.categoryEn || matchingInitial.categoryEn || 'OFFICIAL ADMISSIONS')
    : currentSlide.category;


  // Clean kicker text without mixing languages
  const kickerText = currentLang === 'AR'
    ? `${slideCategory} · ${currentSlide.arabicTitle || matchingInitial.arabicTitle}`
    : currentLang === 'EN'
    ? `${slideCategory} · DAARUL HUDA IBS`
    : `${currentSlide.arabicTitle || matchingInitial.arabicTitle} · ${slideCategory}`;

  const slideAtmospheres = [
    "linear-gradient(rgba(10, 16, 13, 0.78), rgba(8, 13, 10, 0.90)), radial-gradient(circle at 75% 40%, rgba(139, 90, 43, 0.28), transparent 60%)",
    "linear-gradient(rgba(10, 16, 13, 0.80), rgba(8, 13, 10, 0.92)), radial-gradient(circle at 70% 30%, rgba(45, 106, 79, 0.30), transparent 65%)",
    "linear-gradient(rgba(10, 16, 13, 0.78), rgba(8, 13, 10, 0.90)), radial-gradient(circle at 80% 50%, rgba(180, 130, 60, 0.25), transparent 60%)",
    "linear-gradient(rgba(10, 16, 13, 0.78), rgba(8, 13, 10, 0.92)), radial-gradient(circle at 65% 45%, rgba(50, 85, 70, 0.30), transparent 60%)",
    "linear-gradient(rgba(10, 16, 13, 0.78), rgba(8, 13, 10, 0.90)), radial-gradient(circle at 75% 35%, rgba(120, 80, 40, 0.28), transparent 60%)",
  ];

  return (
    <section
      id="slideshow"
      className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] bg-[#0c120f] text-white flex items-center overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Layer with graceful fallback */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentSlide.imagePath}
          alt={slideTitle}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-opacity duration-1000"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        <div
          className="absolute inset-0"
          style={{ background: slideAtmospheres[currentIndex % slideAtmospheres.length] }}
        ></div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_100%] pointer-events-none opacity-40"></div>
      </div>

      {/* Main Hero Content - with safe padding on mobile so it never collides with edge controls */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-20 w-full relative z-10 py-12 sm:py-16">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Muted Sage Kicker */}
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className={`text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide text-[#7E9F8B] ${
              currentLang === 'AR' ? 'font-arabic' : ''
            }`}>
              {kickerText}
            </span>
          </div>

          {/* Majestic Headline */}
          <h1 className={`text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.25] ${
            currentLang === 'AR' ? 'font-arabic leading-[1.4]' : 'font-serif-royal'
          }`}>
            {slideTitle}
          </h1>

          {/* Calm, readable subtitle */}
          <p className="mt-3 sm:mt-5 text-xs sm:text-sm md:text-base text-slate-300/90 leading-relaxed max-w-xl font-normal">
            {slideSubtitle}
          </p>

          {/* CTA Button - hanya Pelajari Selengkapnya sesuai permintaan pengguna */}
          <div className="mt-6 sm:mt-8 flex items-center">
            <button
              type="button"
              onClick={onOpenBrochure}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-[#F5A623] hover:bg-[#E59715] rounded-lg transition-all shadow-md active:scale-95"
            >
              <span>{t.ctaLearnMore}</span>
              <svg className={`w-4 h-4 ${currentLang === 'AR' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slide Indicators & Mobile Control Row */}
          <div className="mt-8 sm:mt-12 flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={currentLang === 'AR' ? `الشريحة ${idx + 1}` : `${t.slidePrefix} ${idx + 1}`}
                  className={`transition-all ${
                    currentIndex === idx
                      ? 'w-7 sm:w-8 h-1 bg-[#F5A623] rounded-full'
                      : 'w-2 h-1 bg-white/30 hover:bg-white/60 rounded-full'
                  }`}
                />
              ))}
            </div>

            {/* Mobile-only prev/next buttons (next to indicators) to avoid overlaying headline text */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label={t.prevSlide}
                className="w-8 h-8 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center text-xs active:scale-95"
              >
                <svg className="w-4 h-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={currentLang === 'AR' ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label={t.nextSlide}
                className="w-8 h-8 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center text-xs active:scale-95"
              >
                <svg className="w-4 h-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={currentLang === 'AR' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Desktop & Tablet Navigation Arrows on Outer Edges (hidden on mobile to prevent text overlap) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label={t.prevSlide}
        className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        <svg className="w-5 h-5 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={currentLang === 'AR' ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label={t.nextSlide}
        className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        <svg className="w-5 h-5 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={currentLang === 'AR' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
        </svg>
      </button>

      {/* Floating WhatsApp Widget in Bottom Right (Compact on mobile) */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2">
        <a
          href={`https://wa.me/${PONDOK_INFO.admins[2].raw}?text=${encodeURIComponent(
            currentLang === 'AR'
              ? 'السلام عليكم، أود الاستفسار عن تفاصيل تسجيل الطالبات الجدد بمعهد دار الهدى الإسلامي.'
              : currentLang === 'EN'
              ? 'Assalamu\'alaikum, I would like to inquire about Daarul Huda Islamic Boarding School student admissions.'
              : 'Assalamu\'alaikum, saya ingin bertanya mengenai Penerimaan Santriwati Baru (PSB) Daarul Huda IBS.'
          )}`}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center px-3.5 py-2 rounded-full bg-[#17201a]/90 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-200 hover:text-white shadow-xl transition-all hover:border-emerald-500/40"
        >
          <span>{t.tanyaPanitia} ({PONDOK_INFO.admins[2].number})</span>
        </a>

        <a
          href={`https://wa.me/${PONDOK_INFO.admins[2].raw}?text=${encodeURIComponent(
            currentLang === 'AR'
              ? 'السلام عليكم، أود الاستفسار عن تفاصيل تسجيل الطالبات الجدد بمعهد دار الهدى الإسلامي.'
              : currentLang === 'EN'
              ? 'Assalamu\'alaikum, I would like to inquire about Daarul Huda Islamic Boarding School student admissions.'
              : 'Assalamu\'alaikum, saya ingin bertanya mengenai Penerimaan Santriwati Baru (PSB) Daarul Huda IBS.'
          )}`}
          target="_blank"
          rel="noreferrer"
          aria-label={t.waChatAria}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.948 3.19.948 3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.585-5.767-5.768-5.767zm7.394 5.766c-.001 4.076-3.318 7.393-7.394 7.393-1.309 0-2.535-.357-3.606-.983l-4.425 1.159 1.18-4.312c-.732-1.127-1.155-2.464-1.156-3.882.001-4.076 3.318-7.393 7.394-7.393 4.075 0 7.393 3.317 7.394 7.393z" />
          </svg>
        </a>
      </div>

    </section>
  );
};
