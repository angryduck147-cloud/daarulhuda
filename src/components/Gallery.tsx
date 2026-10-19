import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { IslamicImageFrame, IslamicStarIcon } from './IslamicOrnament';
import { Language, TRANSLATIONS } from '../data/translations';

interface GalleryProps {
  items: GalleryItem[];
  currentLang: Language;
  onOpenUploadModal: (targetId?: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ items, currentLang, onOpenUploadModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const t = TRANSLATIONS[currentLang].gallerySection;
  const tCat = t.categories;

  const categories = [
    { key: 'Semua', label: tCat.all },
    { key: 'Tahfidz Al-Qur\'an', label: tCat.tahfidz },
    { key: 'Kajian Kitab', label: tCat.kitab },
    { key: 'Ekstrakurikuler', label: tCat.ekskul },
    { key: 'Keasramaan', label: tCat.dorm },
  ];

  const getCategoryLabel = (catKey: string) => {
    switch (catKey) {
      case 'Tahfidz Al-Qur\'an': return tCat.tahfidz;
      case 'Kajian Kitab': return tCat.kitab;
      case 'Ekstrakurikuler': return tCat.ekskul;
      case 'Keasramaan': return tCat.dorm;
      default: return catKey;
    }
  };

  const filteredItems = selectedCategory === 'Semua'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  return (
    <section id="galeri" className="py-16 sm:py-20 md:py-28 bg-[#0f1612] text-white relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E9F8B] uppercase tracking-wider mb-2">
              <IslamicStarIcon className="w-3.5 h-3.5 text-[#7E9F8B]" />
              <span>{t.tag}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white ${
              currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
            }`}>
              {t.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl font-normal">
              {t.desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenUploadModal()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-[#F5A623] hover:bg-[#E59715] rounded-lg transition-colors shadow-sm self-start md:self-auto shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>{t.addPhotoBtn}</span>
          </button>
        </div>

        {/* Filter Bar with Smooth Horizontal Scrolling on Mobile */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141d18] border border-white/10 mb-8 sm:mb-10 max-w-full overflow-x-auto pb-1.5 sm:pb-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.key
                  ? 'bg-white/10 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const itemTitle = currentLang === 'AR' && item.titleAr
              ? item.titleAr
              : currentLang === 'EN' && item.titleEn
              ? item.titleEn
              : item.title;

            const itemDesc = currentLang === 'AR' && item.descriptionAr
              ? item.descriptionAr
              : currentLang === 'EN' && item.descriptionEn
              ? item.descriptionEn
              : item.description;

            const itemDate = currentLang === 'AR' && item.dateAr
              ? item.dateAr
              : currentLang === 'EN' && item.dateEn
              ? item.dateEn
              : item.date;

            const catLabel = getCategoryLabel(item.category);

            return (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className="rounded-xl overflow-hidden bg-[#121915] border border-white/10 hover:border-white/20 shadow-sm cursor-pointer group transition-all"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <IslamicImageFrame
                    src={item.imagePath}
                    alt={itemTitle}
                    category={catLabel}
                    onUploadRequest={() => onOpenUploadModal(item.id)}
                  />

                  <div className={`absolute top-3 ${currentLang === 'AR' ? 'right-3' : 'left-3'} z-10 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-medium text-slate-300`}>
                    {catLabel}
                  </div>

                  {item.isUserUploaded && (
                    <div className={`absolute top-3 ${currentLang === 'AR' ? 'left-3' : 'right-3'} z-10 px-2 py-0.5 rounded bg-emerald-600/80 text-[10px] font-semibold text-white`}>
                      {t.newBadge}
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>{itemDate}</span>
                    <span className="text-[#7E9F8B]">{t.viewDetail}</span>
                  </div>
                  <h4 className={`font-bold text-white group-hover:text-[#E5B869] transition-colors line-clamp-1 ${
                    currentLang === 'AR' ? 'font-arabic text-base' : 'font-serif-royal text-base'
                  }`}>
                    {itemTitle}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
                    {itemDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-16 text-center text-slate-500 border border-dashed border-white/10 rounded-xl">
            <p className="text-sm">{t.emptyState}</p>
            <button
              type="button"
              onClick={() => onOpenUploadModal()}
              className="mt-2 text-xs text-[#7E9F8B] font-semibold underline"
            >
              {t.addNow}
            </button>
          </div>
        )}

        {/* Modal Lightbox */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="max-w-2xl w-full bg-[#121915] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full bg-black">
                <img
                  src={activePhoto.imagePath}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className={`absolute top-4 ${currentLang === 'AR' ? 'left-4' : 'right-4'} w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 border border-white/10`}
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-[#7E9F8B] mb-2">
                  <span>{getCategoryLabel(activePhoto.category)}</span>
                  <span>
                    {currentLang === 'AR' && activePhoto.dateAr
                      ? activePhoto.dateAr
                      : currentLang === 'EN' && activePhoto.dateEn
                      ? activePhoto.dateEn
                      : activePhoto.date}
                  </span>
                </div>
                <h3 className={`text-xl font-bold text-white ${
                  currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
                }`}>
                  {currentLang === 'AR' && activePhoto.titleAr
                    ? activePhoto.titleAr
                    : currentLang === 'EN' && activePhoto.titleEn
                    ? activePhoto.titleEn
                    : activePhoto.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed font-normal">
                  {currentLang === 'AR' && activePhoto.descriptionAr
                    ? activePhoto.descriptionAr
                    : currentLang === 'EN' && activePhoto.descriptionEn
                    ? activePhoto.descriptionEn
                    : activePhoto.description}
                </p>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      const id = activePhoto.id;
                      setActivePhoto(null);
                      onOpenUploadModal(id);
                    }}
                    className="text-xs text-[#7E9F8B] hover:text-white underline font-semibold"
                  >
                    {t.changeThisPhoto}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePhoto(null)}
                    className="px-4 py-1.5 text-xs rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    {currentLang === 'AR' ? 'إغلاق' : currentLang === 'EN' ? 'Close' : 'Tutup'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
