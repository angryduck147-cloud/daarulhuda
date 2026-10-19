import React from 'react';

// Bintang 8 Sudut Islami
export const IslamicStarIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-[#A3B899]" }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="22" width="56" height="56" rx="3" fill="currentColor" fillOpacity="0.85" />
    <rect x="22" y="22" width="56" height="56" rx="3" transform="rotate(45 50 50)" fill="currentColor" fillOpacity="0.85" />
    <circle cx="50" cy="50" r="14" fill="#0C120F" />
    <circle cx="50" cy="50" r="8" fill="currentColor" />
  </svg>
);

// Lambang Al-Qur'an dan Pena Emas
export const QuranIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-[#C59B27]" }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 46C18 43 28 43 32 46C36 43 46 43 54 46V18C46 15 36 15 32 18C28 15 18 15 10 18V46Z" fill="currentColor" fillOpacity="0.1" />
    <line x1="32" y1="18" x2="32" y2="46" />
    <path d="M10 46L24 54L32 46L40 54L54 46" strokeWidth="1.5" />
    <circle cx="32" cy="28" r="2" fill="currentColor" />
  </svg>
);

// Garis Pemisah Berornamen Halus & Teduh
export const GoldDivider: React.FC<{ title?: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light = false }) => (
  <div className="flex flex-col items-center justify-center my-6 text-center">
    {subtitle && (
      <span className="text-xs font-semibold tracking-widest uppercase mb-1.5 text-[#7E9F8B]">
        {subtitle}
      </span>
    )}
    <div className="flex items-center gap-3 w-full max-w-sm px-4">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/15"></div>
      <IslamicStarIcon className="w-4 h-4 text-[#A3B899] shrink-0" />
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/15"></div>
    </div>
    {title && (
      <h2 className={`mt-3 text-2xl md:text-3xl font-serif-royal font-bold ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
    )}
  </div>
);

// Wadah Gambar / Foto Islami dengan Fallback Anggun
interface IslamicImageFrameProps {
  src?: string;
  alt: string;
  className?: string;
  category?: string;
  onUploadRequest?: () => void;
  aspectRatio?: 'landscape' | 'square' | 'portrait';
}

export const IslamicImageFrame: React.FC<IslamicImageFrameProps> = ({
  src,
  alt,
  className = "w-full h-full",
  category = "Kegiatan",
  onUploadRequest,
}) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const showFallback = !src || hasError;

  return (
    <div className={`relative overflow-hidden group select-none bg-[#111915] ${className}`}>
      {!showFallback && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {isLoading && !showFallback && (
        <div className="absolute inset-0 bg-[#0d1411] flex items-center justify-center">
          <IslamicStarIcon className="w-6 h-6 text-slate-500 animate-spin" />
        </div>
      )}

      {showFallback && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#121c17] via-[#0e1612] to-[#0a100d] flex flex-col items-center justify-center p-6 text-center border border-white/5">
          <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-3">
            <QuranIcon className="w-6 h-6 text-[#A3B899]" />
          </div>

          <span className="text-[10px] font-semibold tracking-wider text-[#7E9F8B] uppercase mb-1">
            {category}
          </span>
          <h4 className="text-xs md:text-sm font-serif-royal font-semibold text-slate-200 line-clamp-2 max-w-[85%]">
            {alt}
          </h4>

          {onUploadRequest && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onUploadRequest();
              }}
              className="mt-3 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-all"
            >
              <span>+ Isi Foto</span>
            </button>
          )}
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none border border-white/5 group-hover:border-white/15 transition-colors"></div>
    </div>
  );
};
