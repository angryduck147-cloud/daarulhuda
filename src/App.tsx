/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlideshow } from './components/HeroSlideshow';
import { Masyayikh } from './components/Masyayikh';
import { ProgramUnggulan } from './components/ProgramUnggulan';
import { PrestasiTahfidz } from './components/PrestasiTahfidz';
import { Investment } from './components/Investment';
import { Gallery } from './components/Gallery';
import { RegistrationSection } from './components/RegistrationSection';
import { Footer } from './components/Footer';
import { UploadPhotoModal } from './components/UploadPhotoModal';
import { CheckStatusModal } from './components/CheckStatusModal';
import { BrochureModal } from './components/BrochureModal';
import { INITIAL_SLIDES, INITIAL_GALLERY } from './data/initialData';
import { SlideItem, GalleryItem, RegistrationData } from './types';
import { Language } from './data/translations';

export default function App() {
  // Language state (ID, EN, or AR)
  const [lang, setLang] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('daarul_huda_lang');
      if (savedLang === 'AR' || savedLang === 'EN' || savedLang === 'ID') {
        return savedLang;
      }
      return 'ID';
    } catch {
      return 'ID';
    }
  });

  // Sync HTML lang and dir attributes for authentic RTL / Arabic experience
  useEffect(() => {
    try {
      if (lang === 'AR') {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
      } else if (lang === 'EN') {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
      } else {
        document.documentElement.lang = 'id';
        document.documentElement.dir = 'ltr';
      }
      localStorage.setItem('daarul_huda_lang', lang);
    } catch (e) {
      console.error(e);
    }
  }, [lang]);

  // Decoupled Slide Images dictionary so stale local storage never overwrites multilingual texts
  const [slideImages, setSlideImages] = useState<Record<string, string>>(() => {
    try {
      const savedImages = localStorage.getItem('daarul_huda_slide_images');
      if (savedImages) {
        return JSON.parse(savedImages);
      }
      // Migrate old format if exists
      const oldSaved = localStorage.getItem('daarul_huda_slides');
      if (oldSaved) {
        const parsed = JSON.parse(oldSaved);
        const map: Record<string, string> = {};
        if (Array.isArray(parsed)) {
          parsed.forEach((item, idx) => {
            if (item.imagePath && !item.imagePath.startsWith('/images/slideshow/')) {
              map[item.id] = item.imagePath;
              map[`slide-${idx + 1}`] = item.imagePath;
            }
          });
        }
        return map;
      }
      return {};
    } catch {
      return {};
    }
  });

  // Save slide image overrides
  useEffect(() => {
    try {
      localStorage.setItem('daarul_huda_slide_images', JSON.stringify(slideImages));
    } catch (e) {
      console.error(e);
    }
  }, [slideImages]);

  // Derived current slides list combining canonical translations with custom user images
  const slides: SlideItem[] = INITIAL_SLIDES.map((slide, idx) => ({
    ...slide,
    imagePath: slideImages[slide.id] || slideImages[`slide-${idx + 1}`] || slide.imagePath,
  }));

  // Gallery custom uploads & image overrides
  const [galleryImages, setGalleryImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('daarul_huda_gallery_images');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [userGalleryItems, setUserGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('daarul_huda_user_gallery');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('daarul_huda_gallery_images', JSON.stringify(galleryImages));
    } catch (e) {
      console.error(e);
    }
  }, [galleryImages]);

  useEffect(() => {
    try {
      localStorage.setItem('daarul_huda_user_gallery', JSON.stringify(userGalleryItems));
    } catch (e) {
      console.error(e);
    }
  }, [userGalleryItems]);

  // Combined gallery items
  const galleryItems: GalleryItem[] = [
    ...userGalleryItems,
    ...INITIAL_GALLERY.map((g) => ({
      ...g,
      imagePath: galleryImages[g.id] || g.imagePath,
    })),
  ];

  // Registrations state
  const [registrations, setRegistrations] = useState<RegistrationData[]>(() => {
    try {
      const saved = localStorage.getItem('daarul_huda_registrations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('daarul_huda_registrations', JSON.stringify(registrations));
    } catch (e) {
      console.error(e);
    }
  }, [registrations]);

  // Modals
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadTargetId, setUploadTargetId] = useState<string>('general');
  const [checkStatusOpen, setCheckStatusOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handler for user uploading or replacing a photo
  const handlePhotoUploaded = (targetId: string, imageSrc: string, title?: string, category?: string) => {
    // 1. If target is a slideshow slide
    if (targetId.startsWith('slide-')) {
      setSlideImages((prev) => ({
        ...prev,
        [targetId]: imageSrc,
      }));
      const toast = lang === 'AR'
        ? 'تم تحديث صورة الشريحة بنجاح!'
        : lang === 'EN'
        ? 'Slide image successfully updated!'
        : 'Foto slideshow berhasil diperbarui!';
      showToast(toast);
      return;
    }

    // 2. If target is an existing gallery item
    if (targetId.startsWith('gal-')) {
      setGalleryImages((prev) => ({
        ...prev,
        [targetId]: imageSrc,
      }));
      const toast = lang === 'AR'
        ? 'تم تحديث صورة النشاط بنجاح!'
        : lang === 'EN'
        ? 'Activity photo successfully updated!'
        : 'Foto kegiatan galeri berhasil diperbarui!';
      showToast(toast);
      return;
    }

    // 3. New user-uploaded gallery item
    const newItem: GalleryItem = {
      id: `gal-user-${Date.now()}`,
      title: title || (lang === 'AR' ? 'نشاط جديد للطالبات' : lang === 'EN' ? 'New Student Activity' : 'Kegiatan Santriwati Baru'),
      titleEn: title || 'New Student Activity',
      titleAr: title || 'نشاط جديد للطالبات',
      category: (category as any) || 'Tahfidz Al-Qur\'an',
      date: lang === 'AR' ? 'الآن' : lang === 'EN' ? 'Just now' : 'Baru Saja',
      dateEn: 'Just now',
      dateAr: 'الآن',
      imagePath: imageSrc,
      description: lang === 'AR'
        ? 'توثيق أنشطة طالبات معهد دار الهدى الإسلامي للبنات المرفوعة يدوياً.'
        : lang === 'EN'
        ? 'Daarul Huda female students activity documentation uploaded by user.'
        : 'Dokumentasi kegiatan santriwati Daarul Huda Islamic Boarding School yang diunggah secara mandiri.',
      descriptionEn: 'Daarul Huda female students activity documentation uploaded by user.',
      descriptionAr: 'توثيق أنشطة طالبات معهد دار الهدى الإسلامي للبنات المرفوعة يدوياً.',
      isUserUploaded: true,
    };

    setUserGalleryItems((prev) => [newItem, ...prev]);
    const toast = lang === 'AR'
      ? 'تمت إضافة الصورة إلى المعرض بنجاح!'
      : lang === 'EN'
      ? 'New photo successfully added to gallery!'
      : 'Foto baru berhasil ditambahkan ke galeri!';
    showToast(toast);
  };

  const handleRegisterSuccess = (newData: RegistrationData) => {
    setRegistrations((prev) => [newData, ...prev]);
    const toast = lang === 'AR'
      ? `تم حفظ طلب تسجيل الطالبة ${newData.student.fullName} بنجاح!`
      : lang === 'EN'
      ? `Registration for ${newData.student.fullName} successfully submitted!`
      : `Pendaftaran ${newData.student.fullName} berhasil disimpan di web!`;
    showToast(toast);
  };

  return (
    <div className={`min-h-screen bg-[#0c120f] flex flex-col selection:bg-[#F5A623] selection:text-slate-950 ${
      lang === 'AR' ? 'font-arabic' : 'font-sans'
    }`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#1a261f] border border-white/20 text-white font-medium text-xs shadow-2xl flex items-center gap-2">
          <span className="text-[#7E9F8B]">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Top Bar with functional 3-Language Toggle (ID | EN | AR) */}
      <Navbar
        currentLang={lang}
        onToggleLang={setLang}
        onOpenCheckStatus={() => setCheckStatusOpen(true)}
        onOpenBrochure={() => setBrochureOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Slideshow (Fully Multilingual & Calm Serene Aesthetics) */}
        <HeroSlideshow
          slides={slides}
          currentLang={lang}
          onOpenUploadModal={(targetId) => {
            setUploadTargetId(targetId);
            setUploadModalOpen(true);
          }}
          onOpenBrochure={() => setBrochureOpen(true)}
        />

        {/* 2. Dewan Masyayikh & Pembina Profil */}
        <Masyayikh
          currentLang={lang}
          onOpenUploadModal={(targetId) => {
            setUploadTargetId(targetId);
            setUploadModalOpen(true);
          }}
        />

        {/* 3. Program 6 Tahun, Target Lulusan, Fasilitas, Ekstrakurikuler */}
        <ProgramUnggulan currentLang={lang} />

        {/* 4. Rekam Jejak Tahfidz Cepat 30 Juz & Beasiswa 100% */}
        <PrestasiTahfidz currentLang={lang} />

        {/* 5. Galeri Kegiatan Sekolah (Filter & Upload Mandiri) */}
        <Gallery
          items={galleryItems}
          currentLang={lang}
          onOpenUploadModal={(targetId) => {
            setUploadTargetId(targetId || 'general');
            setUploadModalOpen(true);
          }}
        />

        {/* 6. Investasi Biaya Pendidikan & Rekening BRI */}
        <Investment currentLang={lang} />

        {/* 7. Formulir Pendaftaran Santriwati Baru (Online di Web Lebih Dulu) */}
        <RegistrationSection
          currentLang={lang}
          onRegisterSuccess={handleRegisterSuccess}
          onOpenCheckStatus={() => setCheckStatusOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer currentLang={lang} />

      {/* Modal Upload / Ganti Foto Mandiri */}
      <UploadPhotoModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        targetId={uploadTargetId}
        currentLang={lang}
        onPhotoUploaded={handlePhotoUploaded}
      />

      {/* Modal Cek Status Pendaftaran */}
      <CheckStatusModal
        isOpen={checkStatusOpen}
        onClose={() => setCheckStatusOpen(false)}
        currentLang={lang}
        registrations={registrations}
      />

      {/* Modal Brosur Resmi Digital */}
      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        currentLang={lang}
      />

    </div>
  );
}
