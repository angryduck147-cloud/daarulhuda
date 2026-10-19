import React, { useState } from 'react';
import { IslamicStarIcon } from './IslamicOrnament';
import { Language, TRANSLATIONS } from '../data/translations';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId?: string;
  currentLang: Language;
  onPhotoUploaded: (targetId: string, imageSrc: string, title?: string, category?: string) => void;
}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  isOpen,
  onClose,
  targetId = 'general',
  currentLang,
  onPhotoUploaded,
}) => {
  const [photoMode, setPhotoMode] = useState<'upload' | 'url'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState<'Tahfidz Al-Qur\'an' | 'Kajian Kitab' | 'Ekstrakurikuler' | 'Keasramaan'>('Tahfidz Al-Qur\'an');
  const [urlInput, setUrlInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const t = TRANSLATIONS[currentLang].modals.uploadPhoto;
  const tGal = TRANSLATIONS[currentLang].gallerySection.categories;

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg(t.errSize);
        return;
      }
      setSelectedFile(file);
      setErrorMsg('');

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSrc = photoMode === 'upload' ? previewUrl : urlInput.trim();

    if (!finalSrc) {
      setErrorMsg(t.errEmpty);
      return;
    }

    onPhotoUploaded(targetId, finalSrc, customTitle || undefined, customCategory);
    onClose();
    setPreviewUrl('');
    setSelectedFile(null);
    setUrlInput('');
    setCustomTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-[#121915] border border-white/15 rounded-xl shadow-2xl overflow-hidden text-white">
        
        {/* Header */}
        <div className="p-5 bg-[#0e1612] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IslamicStarIcon className="w-4 h-4 text-[#7E9F8B]" />
            <h3 className="font-serif-royal text-base font-bold text-white">
              {t.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="p-3 rounded-lg bg-[#0e1612] border border-white/10 text-xs text-slate-300 leading-relaxed font-normal">
            💡 {t.tip}
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/30 text-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Mode Switcher */}
          <div className="flex rounded-lg bg-[#0e1612] p-1 border border-white/10 text-xs font-medium">
            <button
              type="button"
              onClick={() => setPhotoMode('upload')}
              className={`flex-1 py-1.5 rounded-md transition-colors ${
                photoMode === 'upload'
                  ? 'bg-white/15 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabUpload}
            </button>
            <button
              type="button"
              onClick={() => setPhotoMode('url')}
              className={`flex-1 py-1.5 rounded-md transition-colors ${
                photoMode === 'url'
                  ? 'bg-white/15 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabUrl}
            </button>
          </div>

          {/* Upload Input */}
          {photoMode === 'upload' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.selectFileLabel}
              </label>
              <div className="border border-dashed border-white/20 rounded-lg p-5 text-center bg-[#0d1410] hover:border-white/40 transition-colors">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-slate-200 font-medium transition-colors"
                >
                  <svg className="w-4 h-4 text-[#7E9F8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{selectedFile ? selectedFile.name : t.chooseFileBtn}</span>
                </label>
                <p className="text-[11px] text-slate-500 mt-2">
                  Format JPG, PNG, WebP (Max. 5MB)
                </p>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.urlLabel}
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                placeholder={t.urlPlaceholder}
                className="w-full px-3.5 py-2 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
              />
            </div>
          )}

          {/* Preview Box */}
          {previewUrl && (
            <div className="rounded-lg overflow-hidden border border-white/10 max-h-48 flex items-center justify-center bg-black/40">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-48 w-auto object-contain"
                onError={() => setErrorMsg('Gagal memuat gambar dari URL.')}
              />
            </div>
          )}

          {/* Metadata if adding new general gallery item */}
          {targetId === 'general' && (
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.titleLabel}
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder={t.titlePlaceholder}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.categoryLabel}
                </label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white focus:outline-none focus:border-white/30"
                >
                  <option value="Tahfidz Al-Qur'an">{tGal.tahfidz}</option>
                  <option value="Kajian Kitab">{tGal.kitab}</option>
                  <option value="Ekstrakurikuler">{tGal.ekskul}</option>
                  <option value="Keasramaan">{tGal.dorm}</option>
                </select>
              </div>
            </div>
          )}

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-[#F5A623] hover:bg-[#E59715] rounded-lg transition-colors"
            >
              {t.saveBtn}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
