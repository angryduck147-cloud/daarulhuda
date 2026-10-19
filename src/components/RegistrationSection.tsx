import React, { useState } from 'react';
import { RegistrationData } from '../types';
import { PONDOK_INFO, REGISTRATION_REQUIREMENTS, REGISTRATION_REQUIREMENTS_EN, REGISTRATION_REQUIREMENTS_AR } from '../data/initialData';
import { GoldDivider, IslamicStarIcon } from './IslamicOrnament';
import { Language, TRANSLATIONS } from '../data/translations';

interface RegistrationSectionProps {
  currentLang: Language;
  onRegisterSuccess: (newData: RegistrationData) => void;
  onOpenCheckStatus: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  currentLang,
  onRegisterSuccess,
  onOpenCheckStatus,
}) => {
  const [step, setStep] = useState<number>(1);
  const t = TRANSLATIONS[currentLang].registrationSection;
  const tMem = t.memorizationLevels;

  const [formData, setFormData] = useState({
    fullName: '',
    nisn: '',
    birthPlace: '',
    birthDate: '',
    previousSchool: '',
    currentMemorization: 'Juz 30 (Sebagian)',
    fatherName: '',
    motherName: '',
    occupation: '',
    whatsappNumber: '',
    address: '',
    track: 'reguler' as 'reguler' | 'beasiswa_yatim_dhuafa',
    bankSenderName: '',
    transferDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [submittedResult, setSubmittedResult] = useState<RegistrationData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMsg('');
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.fullName.trim()) {
        setErrorMsg(t.errName);
        return;
      }
      if (!formData.previousSchool.trim()) {
        setErrorMsg(t.errSchool);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.fatherName.trim() && !formData.motherName.trim()) {
        setErrorMsg(t.errParent);
        return;
      }
      if (!formData.whatsappNumber.trim()) {
        setErrorMsg(t.errPhone);
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.bankSenderName.trim()) {
      setErrorMsg(t.errSender);
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const regNumber = `PSB-DH-2027-${randomSuffix}`;

    const newRecord: RegistrationData = {
      id: `reg-${Date.now()}`,
      registrationNumber: regNumber,
      submittedAt: new Date().toLocaleString(
        currentLang === 'AR' ? 'ar-SA' : currentLang === 'EN' ? 'en-US' : 'id-ID'
      ),
      student: {
        fullName: formData.fullName,
        nisn: formData.nisn || '-',
        birthPlace: formData.birthPlace || (currentLang === 'AR' ? 'إندونيسيا' : currentLang === 'EN' ? 'Indonesia' : 'Indonesia'),
        birthDate: formData.birthDate || '-',
        previousSchool: formData.previousSchool,
        currentMemorization: formData.currentMemorization,
      },
      parent: {
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        occupation: formData.occupation || (currentLang === 'AR' ? 'أعمال حرة' : currentLang === 'EN' ? 'Private Sector' : 'Wiraswasta'),
        whatsappNumber: formData.whatsappNumber,
        address: formData.address || '-',
      },
      track: formData.track,
      payment: {
        bankSenderName: formData.bankSenderName,
        transferDate: formData.transferDate,
        transferAmount: 300000,
        notes: formData.notes,
      },
      status: 'Menunggu Verifikasi',
    };

    onRegisterSuccess(newRecord);
    setSubmittedResult(newRecord);
    setStep(4);
  };

  const generateWhatsAppMessage = (adminPhone: string) => {
    if (!submittedResult) return '#';
    let text = '';
    if (currentLang === 'AR') {
      text = `بسم الله الرحمن الرحيم، تأكيد تسجيل طالبة جديدة في معهد دار الهدى:

الصيغة المعتمدة:
${submittedResult.student.fullName} # ${submittedResult.payment.transferDate} # ${submittedResult.payment.bankSenderName} # ${submittedResult.parent.whatsappNumber}

رقم التسجيل الإلكتروني: ${submittedResult.registrationNumber}
المسار: ${submittedResult.track === 'reguler' ? 'المسار العام' : 'مسار منحة الأيتام والمحتاجين'}
المدرسة السابقة: ${submittedResult.student.previousSchool}
المحفوظ من القرآن: ${submittedResult.student.currentMemorization}

نرجو التكرم بالإفادة بشأن موعد المقابلة واستكمال الوثائق. جزاكم الله خيراً.`;
    } else if (currentLang === 'EN') {
      text = `Bismillah, New Female Student Registration Confirmation for Daarul Huda IBS:

Official Brochure Format:
${submittedResult.student.fullName} # ${submittedResult.payment.transferDate} # ${submittedResult.payment.bankSenderName} # ${submittedResult.parent.whatsappNumber}

Registration ID: ${submittedResult.registrationNumber}
Track: ${submittedResult.track === 'reguler' ? 'Regular Track' : '100% Scholarship Track (Orphans / Underprivileged)'}
Previous School: ${submittedResult.student.previousSchool}
Current Memorization: ${submittedResult.student.currentMemorization}

Kindly advise on the verification schedule and placement test. Thank you.`;
    } else {
      text = `Bismillah, Konfirmasi Pendaftaran Santriwati Baru Daarul Huda IBS:

Format Resmi Brosur:
${submittedResult.student.fullName} # ${submittedResult.payment.transferDate} # ${submittedResult.payment.bankSenderName} # ${submittedResult.parent.whatsappNumber}

No. Registrasi Web: ${submittedResult.registrationNumber}
Jalur: ${submittedResult.track === 'reguler' ? 'Jalur Reguler' : 'Jalur Beasiswa Yatim & Dhuafa 100%'}
Asal Sekolah: ${submittedResult.student.previousSchool}
Jumlah Hafalan: ${submittedResult.student.currentMemorization}

Mohon petunjuk verifikasi berkas dan jadwal tes seleksi. Jazakumullahu khairan.`;
    }

    const encoded = encodeURIComponent(text);
    return `https://wa.me/${adminPhone}?text=${encoded}`;
  };

  const activeRequirements = currentLang === 'AR'
    ? REGISTRATION_REQUIREMENTS_AR
    : currentLang === 'EN'
    ? REGISTRATION_REQUIREMENTS_EN
    : REGISTRATION_REQUIREMENTS;

  return (
    <section id="pendaftaran" className="py-16 sm:py-20 md:py-28 bg-[#0f1612] text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        <GoldDivider
          subtitle={t.subtitle}
          title={t.title}
          light
        />

        <p className="max-w-2xl mx-auto text-center text-xs sm:text-sm text-slate-400 mb-8 sm:mb-10 font-normal">
          {t.desc}
        </p>

        {/* Syarat Singkat */}
        <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl bg-[#131d17] border border-white/10 text-xs">
          <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
            <span className="font-semibold text-[#7E9F8B] uppercase tracking-wider flex items-center gap-1.5">
              <IslamicStarIcon className="w-4 h-4 text-[#7E9F8B]" />
              {t.reqTitle}
            </span>
            <button
              type="button"
              onClick={onOpenCheckStatus}
              className="font-medium text-slate-300 hover:text-white underline text-[11px] sm:text-xs"
            >
              {t.checkStatusBtn}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 font-normal">
            {activeRequirements.map((req, rIdx) => (
              <div key={rIdx} className="flex items-center gap-2">
                <span className="text-[#7E9F8B]">✓</span>
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-step Form Card */}
        <div className="rounded-xl bg-[#131d17] border border-white/10 shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#17221c] p-4 sm:p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#7E9F8B] uppercase tracking-wider">
                  {t.formTag}
                </span>
                <h3 className={`text-lg sm:text-xl font-bold text-white mt-0.5 ${
                  currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
                }`}>
                  {step === 1 && t.step1Title}
                  {step === 2 && t.step2Title}
                  {step === 3 && t.step3Title}
                  {step === 4 && t.step4Title}
                </h3>
              </div>
              <div className="text-xs text-slate-400">
                {t.stepCounter.replace('{current}', String(step))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
              <div className={`h-1 rounded-full ${step >= 1 ? 'bg-[#F5A623]' : 'bg-white/10'}`} />
              <div className={`h-1 rounded-full ${step >= 2 ? 'bg-[#F5A623]' : 'bg-white/10'}`} />
              <div className={`h-1 rounded-full ${step >= 3 ? 'bg-[#F5A623]' : 'bg-white/10'}`} />
              <div className={`h-1 rounded-full ${step >= 4 ? 'bg-[#F5A623]' : 'bg-white/10'}`} />
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-8">
            {errorMsg && (
              <div className="mb-6 p-3.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            {/* STEP 1: DATA SANTRIWATI */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldFullName}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={currentLang === 'AR' ? 'مثال: عائشة نور فاطمة' : currentLang === 'EN' ? 'E.g., Aisyah Nur Fathimah' : 'Contoh: Aisyah Nur Fathimah'}
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldNisn}
                    </label>
                    <input
                      type="text"
                      name="nisn"
                      value={formData.nisn}
                      onChange={handleChange}
                      placeholder={currentLang === 'AR' ? 'الرقم القومي المدرسي' : currentLang === 'EN' ? 'National Student ID (if any)' : 'Nomor Induk Siswa Nasional'}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldPreviousSchool}
                    </label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      placeholder={currentLang === 'AR' ? 'اسم المدرسة الابتدائية' : currentLang === 'EN' ? 'E.g., SD IT Al-Ihsan / Elementary School' : 'Contoh: SD IT Al-Ihsan / MI Muhammadiyah'}
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldBirthPlace}
                    </label>
                    <input
                      type="text"
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleChange}
                      placeholder={currentLang === 'AR' ? 'المدينة / المحافظة' : currentLang === 'EN' ? 'City / Place of Birth' : 'Kota / Kabupaten'}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldBirthDate}
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldCurrentMemorization}
                    </label>
                    <select
                      name="currentMemorization"
                      value={formData.currentMemorization}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white focus:outline-none focus:border-white/30"
                    >
                      <option value="Belum Ada Hafalan">{tMem.zero}</option>
                      <option value="Juz 30 (Sebagian)">{tMem.juz30Part}</option>
                      <option value="1 - 2 Juz Mutqin">{tMem.juz1to2}</option>
                      <option value="3 - 5 Juz Mutqin">{tMem.juz3to5}</option>
                      <option value="Diatas 5 Juz">{tMem.over5}</option>
                    </select>
                  </div>
                </div>

                <div className={`pt-4 flex ${currentLang === 'AR' ? 'justify-start' : 'justify-end'}`}>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-[#F5A623] hover:bg-[#E59715] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>{t.btnNext}</span>
                    <span>{currentLang === 'AR' ? '←' : '→'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: DATA ORANG TUA */}
            {step === 2 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldFatherName}
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder={currentLang === 'AR' ? 'اسم الأب كاملاً' : currentLang === 'EN' ? 'Father\'s Full Name' : 'Nama Lengkap Ayah'}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldMotherName}
                    </label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      placeholder={currentLang === 'AR' ? 'اسم الأم كاملاً' : currentLang === 'EN' ? 'Mother\'s Full Name' : 'Nama Lengkap Ibu'}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldWhatsapp}
                    </label>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      placeholder="081234567890"
                      required
                      dir="ltr"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldOccupation}
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder={currentLang === 'AR' ? 'وظيفة ولي الأمر' : currentLang === 'EN' ? 'E.g., Teacher / Entrepreneur' : 'Contoh: PNS / Wiraswasta'}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldAddress}
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                      placeholder={currentLang === 'AR' ? 'العنوان والمدينة والمحافظة' : currentLang === 'EN' ? 'Street, District, City/Regency' : 'Jalan, Kelurahan, Kecamatan, Kota/Kabupaten'}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    {currentLang === 'AR' ? '→' : '←'} {t.btnBack}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-[#F5A623] hover:bg-[#E59715] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>{t.btnNext}</span>
                    <span>{currentLang === 'AR' ? '←' : '→'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: JALUR & PEMBAYARAN */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    {t.fieldTrackLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        formData.track === 'reguler'
                          ? 'border-[#F5A623] bg-white/5'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="track"
                        value="reguler"
                        checked={formData.track === 'reguler'}
                        onChange={handleChange}
                        className="mt-1 text-[#F5A623] focus:ring-0"
                      />
                      <div>
                        <span className={`block font-bold text-white text-sm ${
                          currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
                        }`}>
                          {t.trackRegulerTitle}
                        </span>
                        <span className="block text-xs text-slate-400 mt-1">
                          {t.trackRegulerDesc}
                        </span>
                      </div>
                    </label>

                    <label
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        formData.track === 'beasiswa_yatim_dhuafa'
                          ? 'border-[#F5A623] bg-white/5'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="track"
                        value="beasiswa_yatim_dhuafa"
                        checked={formData.track === 'beasiswa_yatim_dhuafa'}
                        onChange={handleChange}
                        className="mt-1 text-[#F5A623] focus:ring-0"
                      />
                      <div>
                        <span className={`block font-bold text-white text-sm ${
                          currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
                        }`}>
                          {t.trackScholarshipTitle}
                        </span>
                        <span className="block text-xs text-slate-400 mt-1">
                          {t.trackScholarshipDesc}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Info Rekening */}
                <div className="p-4 rounded-lg bg-[#0e1612] border border-white/10 text-xs">
                  <span className="text-[#7E9F8B] font-semibold block">
                    {t.transferInfo}
                  </span>
                  <p className="text-slate-300 mt-1" dir="ltr">
                    BRI: <strong>{PONDOK_INFO.bankInfo.accountNumber}</strong> a.n. {PONDOK_INFO.bankInfo.accountHolder}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldSenderName}
                    </label>
                    <input
                      type="text"
                      name="bankSenderName"
                      value={formData.bankSenderName}
                      onChange={handleChange}
                      placeholder={currentLang === 'AR' ? 'اسم صاحب الحساب المحول منه' : currentLang === 'EN' ? 'Sender bank account name' : 'Nama pemilik rekening saat transfer'}
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldTransferDate}
                    </label>
                    <input
                      type="date"
                      name="transferDate"
                      value={formData.transferDate}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.fieldNotes}
                    </label>
                    <input
                      type="text"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder={currentLang === 'AR' ? 'أي ملاحظات ترغب بإضافتها' : currentLang === 'EN' ? 'Additional message (optional)' : 'Catatan pendaftaran'}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#0e1612] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    {currentLang === 'AR' ? '→' : '←'} {t.btnBack}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-[#F5A623] hover:bg-[#E59715] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>{t.btnSubmit}</span>
                    <span>✓</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: HASIL RESMI */}
            {step === 4 && submittedResult && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-[#17221c] border border-white/15 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-[#7E9F8B] uppercase tracking-wider">
                        {t.resultSuccessTitle}
                      </span>
                      <h4 className={`text-xl font-bold text-white mt-0.5 ${
                        currentLang === 'AR' ? 'font-arabic' : 'font-serif-royal'
                      }`}>
                        {submittedResult.student.fullName}
                      </h4>
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#E5B869] bg-black/40 px-3 py-1 rounded border border-white/10" dir="ltr">
                        {submittedResult.registrationNumber}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 block">
                        {t.schoolLabel}
                      </span>
                      <span>{submittedResult.student.previousSchool}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">
                        {t.trackLabel}
                      </span>
                      <span className="text-[#E5B869]">
                        {submittedResult.track === 'reguler'
                          ? t.trackRegulerTitle
                          : t.trackScholarshipTitle}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">
                        {t.parentLabel}
                      </span>
                      <span>{submittedResult.parent.fatherName || submittedResult.parent.motherName} ({submittedResult.parent.whatsappNumber})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">
                        {t.senderLabel}
                      </span>
                      <span>{submittedResult.payment.bankSenderName} ({submittedResult.payment.transferDate})</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {t.statusLabel}{' '}
                      <strong className="text-emerald-400">
                        {currentLang === 'AR' ? 'بانتظار التحقق والمقابلة' : currentLang === 'EN' ? 'Pending Verification' : 'Menunggu Verifikasi'}
                      </strong>
                    </span>
                    <span>{submittedResult.submittedAt}</span>
                  </div>
                </div>

                {/* Konfirmasi WhatsApp */}
                <div className="p-5 rounded-xl bg-[#0e1612] border border-white/10 text-xs">
                  <h5 className="font-semibold text-white mb-1">
                    {t.resultNextStepTitle}
                  </h5>
                  <p className="text-slate-400 mb-3 leading-relaxed">
                    {t.resultNextStepDesc}
                  </p>

                  <div className="p-3 rounded bg-black/40 font-mono text-[#E5B869] mb-4 text-xs" dir="ltr">
                    {submittedResult.student.fullName} # {submittedResult.payment.transferDate} # {submittedResult.payment.bankSenderName} # {submittedResult.parent.whatsappNumber}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PONDOK_INFO.admins.map((adm, aIdx) => {
                      const adminLabel = currentLang === 'AR' && (adm as any).labelAr
                        ? (adm as any).labelAr
                        : currentLang === 'EN' && (adm as any).labelEn
                        ? (adm as any).labelEn
                        : adm.label;

                      return (
                        <a
                          key={aIdx}
                          href={generateWhatsAppMessage(adm.raw)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-3 rounded-lg bg-[#19241e] hover:bg-[#202f27] border border-white/10 text-center font-semibold text-xs text-white transition-colors"
                        >
                          <span className="text-[#7E9F8B] block text-[11px]">
                            {adminLabel}
                          </span>
                          <span className="text-slate-300 font-mono text-xs" dir="ltr">{adm.number}</span>
                          <span className="block mt-1 text-[10px] text-[#F5A623]">
                            {t.sendViaWa}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    {t.btnPrint}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedResult(null);
                      setStep(1);
                    }}
                    className="text-xs font-semibold text-[#7E9F8B] hover:text-white"
                  >
                    {t.btnRegisterAnother}
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
