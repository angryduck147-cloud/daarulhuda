export interface SlideItem {
  id: string;
  title: string;
  titleEn?: string;
  titleAr?: string;
  subtitle: string;
  subtitleEn?: string;
  subtitleAr?: string;
  arabicTitle: string;
  category: string;
  categoryEn?: string;
  categoryAr?: string;
  imagePath: string;
  badgeText: string;
  badgeTextEn?: string;
  badgeTextAr?: string;
  ctaText?: string;
  ctaTextEn?: string;
  ctaTextAr?: string;
  ctaTarget?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleEn?: string;
  titleAr?: string;
  category: 'Semua' | 'Tahfidz Al-Qur\'an' | 'Kajian Kitab' | 'Ekstrakurikuler' | 'Keasramaan';
  date: string;
  dateEn?: string;
  dateAr?: string;
  imagePath: string;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  isUserUploaded?: boolean;
}

export interface RegistrationData {
  id: string;
  registrationNumber: string;
  submittedAt: string;
  student: {
    fullName: string;
    nisn: string;
    birthPlace: string;
    birthDate: string;
    previousSchool: string;
    currentMemorization: string;
  };
  parent: {
    fatherName: string;
    motherName: string;
    occupation: string;
    whatsappNumber: string;
    address: string;
  };
  track: 'reguler' | 'beasiswa_yatim_dhuafa';
  payment: {
    bankSenderName: string;
    transferDate: string;
    transferAmount: number;
    notes?: string;
  };
  status: 'Menunggu Verifikasi' | 'Terverifikasi' | 'Siap Tes Seleksi';
}

export interface MasyayikhMember {
  id: string;
  name: string;
  nameEn?: string;
  nameAr?: string;
  role: 'Penasehat' | 'Pembina' | 'Direktris';
  roleEn?: string;
  roleAr?: string;
  titleDescription: string;
  titleDescriptionEn?: string;
  titleDescriptionAr?: string;
  qualifications: string[];
  qualificationsEn?: string[];
  qualificationsAr?: string[];
  imagePath: string;
}

export interface FastMemorizer {
  id: string;
  name: string;
  nameEn?: string;
  nameAr?: string;
  achievement: string;
  achievementEn?: string;
  achievementAr?: string;
  duration: string;
  durationEn?: string;
  durationAr?: string;
}

export interface TargetItem {
  title: string;
  titleEn?: string;
  titleAr?: string;
  desc: string;
  descEn?: string;
  descAr?: string;
}

export interface FacilityItem {
  name: string;
  nameEn?: string;
  nameAr?: string;
  desc: string;
  descEn?: string;
  descAr?: string;
}

export interface ExtracurricularItem {
  name: string;
  nameEn?: string;
  nameAr?: string;
  category: string;
  categoryEn?: string;
  categoryAr?: string;
  desc: string;
  descEn?: string;
  descAr?: string;
}

