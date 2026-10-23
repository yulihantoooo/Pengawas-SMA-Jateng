export type SchoolStatus = 'Mandiri' | 'Mandiri Ditumpangi' | 'Menginduk';
export type Accreditation = 'A' | 'B' | 'C' | 'Belum Terakreditasi';
export type SesiStatus = 'Belum Mulai' | 'Berlangsung' | 'Selesai' | 'Terkendala';

export interface School {
  id: string;
  npsn: string;
  nama: string;
  kabKota: string;
  cabangDinas: string;
  provinsi: string;
  statusSekolah: 'Negeri' | 'Swasta';
  statusPelaksanaan: SchoolStatus;
  sekolahIndukId?: string; // jika menginduk
  sekolahIndukNama?: string;
  akreditasi: Accreditation;
  kepalaSekolah: string;
  proktorUtama: string;
  teknisi: string;
  kontakProktor: string;
  jumlahPesertaKelas12: number;
  jumlahRuangUjian: number;
  jumlahKomputerUtama: number;
  jumlahKomputerCadangan: number;
  bandwidthMbps: number;
  sumberListrikUtama: 'PLN' | 'PLN + Genset' | 'PLN + Genset + UPS';
  modelPelaksanaan: 'Semi-Online CBT' | 'Full-Online CBT';
  skorKesiapan?: number;
  gradeKesiapan?: 'A' | 'B' | 'C' | 'D';
  predikatKka?: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang';
  terakhirDievaluasi?: string;
  sesiHariIni: {
    sesi1: SesiStatus;
    sesi2: SesiStatus;
    sesi3: SesiStatus;
    sesi4: SesiStatus;
  };
  partisipasiSulingjarGuru?: number; // % guru yang sudah submit Sulingjar
  statusPenyeliaPtn?: 'Terkoneksi Vcon' | 'Standby' | 'Belum Terhubung';
}

export type KkaTahap = 'TAHAP PERSIAPAN' | 'TAHAPAN PELAKSANAAN' | 'TAHAP PASCA-PELAKSANAAN';

export interface KkaItem {
  no: number;
  tahap: KkaTahap;
  indikatorKunci: string;
  buktiFisik: string;
  skorInput: 0 | 1 | 2; // 0 = Tidak/Belum, 1 = Sebagian/Kurang, 2 = Lengkap/Sesuai
  catatan?: string;
}

export interface MonevEvaluation {
  id: string;
  schoolId: string;
  schoolName: string;
  npsn: string;
  kabKota: string;
  cabangDinas: string;
  tanggalMonev: {
    persiapan: string;
    pelaksanaan: string;
    pascaPelaksanaan: string;
  };
  namaPetugasMonev: string;
  nipPetugas: string;
  jabatanPetugas: string;
  items: KkaItem[];
  skorTotal: number; // sum of skorInput (max 76)
  nilai: number; // (skorTotal / 76) * 100
  predikat: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang';
  temuanKetidaksesuaian: string;
  penyebabKetidaksesuaian: string;
  dampakPelaksanaan: string;
  rekomendasiTindakLanjut: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
}

export interface IncidentReport {
  id: string;
  kodeTiket: string;
  schoolId: string;
  schoolName: string;
  kabKota: string;
  ruang: string;
  sesi: number;
  kategori: 'Jaringan Internet' | 'Listrik / Daya' | 'Aplikasi CBT / Server' | 'Hardware PC Klien' | 'Peserta / Tata Tertib' | 'Lainnya';
  tingkatKeparahan: 'Rendah' | 'Sedang' | 'Kritis';
  deskripsiMasalah: string;
  waktuLapor: string;
  pelapor: string;
  status: 'Baru' | 'Dalam Penanganan' | 'Selesai Teratasi';
  tindakanMitigasi?: string;
  waktuSelesai?: string;
  petugasPenyelesai?: string;
  dampakSiswa: number;
  perluSesiSusulan: boolean;
}

export interface ExamSubject {
  id: string;
  nama: string;
  kategori: 'Wajib' | 'Pilihan';
  rumpun: 'Umum' | 'MIPA' | 'IPS' | 'Bahasa & Budaya' | 'Vokasional';
  jumlahSoal: number;
  durasiMenit: number;
  deskripsi: string;
}

export interface SampleQuestion {
  id: string;
  mataUji: string;
  elemen: string;
  subElemen: string;
  kompetensi: string;
  levelKognitif: 'Level 1 (Pengetahuan/Knowing)' | 'Level 2 (Aplikasi/Applying)' | 'Level 3 (Penalaran/Reasoning)';
  bentukSoal: 'Pilihan Ganda Sederhana' | 'PGK MCMA' | 'PGK Kategori';
  stimulus?: string;
  stimulusImage?: string;
  pertanyaan: string;
  pilihan?: { label: string; teks: string }[];
  pilihanKategori?: { pernyataan: string; opsi: string[] }[];
  kunciJawaban: string | string[] | { [key: number]: string };
  pembahasan: string;
}

export interface SHTKACertificate {
  nomorSertifikat: string;
  namaSiswa: string;
  nisn: string;
  tempatLahir: string;
  tanggalLahir: string;
  sekolahAsal: string;
  npsnAsal: string;
  sekolahPelaksana: string;
  npsnPelaksana: string;
  tahunAjaran: string;
  tanggalPelaksanaan: string;
  tanggalTerbit: string;
  nilai: {
    bahasaIndonesia: number; // 200 - 800
    kategoriBIndo: 'Baik' | 'Memadai' | 'Kurang';
    matematika: number; // 200 - 800
    kategoriMatematika: 'Baik' | 'Memadai' | 'Kurang';
    bahasaInggris: number; // 200 - 800
    kategoriBInggris: 'Baik' | 'Memadai' | 'Kurang';
    mapelPilihan1: { nama: string; nilai: number; kategori: 'Baik' | 'Memadai' | 'Kurang' };
    mapelPilihan2: { nama: string; nilai: number; kategori: 'Baik' | 'Memadai' | 'Kurang' };
  };
  rataRata: number;
  kategoriUmum: string;
  isPredikatIstimewa: boolean; // Jika >= 725.00 pada masing-masing mata uji
  capaianAn?: {
    literasiMembaca: 'Mencapai Kompetensi Minimum' | 'Di Atas Kompetensi Minimum';
    numerasi: 'Mencapai Kompetensi Minimum' | 'Di Atas Kompetensi Minimum';
    surveiKarakter: string; // e.g. "Membudaya (8 Dimensi Terpenuhi)"
  };
  asesmenNasional?: {
    literasiMembaca: string;
    numerasi: string;
    surveiKarakter: string;
  };
  qrCodeUrl?: string;
}
