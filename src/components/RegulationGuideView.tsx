import React, { useState } from 'react';
import { 
  Scale, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  FileCheck, 
  Cpu, 
  GraduationCap, 
  ShieldCheck,
  Search,
  ExternalLink,
  Building2
} from 'lucide-react';

export const RegulationGuideView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'kepmen56' | 'pedomanTka' | 'perkaban' | 'faq' | 'sop'>('kepmen56');
  const [searchFaq, setSearchFaq] = useState('');

  const faqs = [
    {
      q: 'Apa status Kepmendikdasmen Nomor 56 Tahun 2026 terhadap regulasi sebelumnya?',
      a: 'Berdasarkan Diktum Keempat Kepmendikdasmen No. 56 Tahun 2026 (ditetapkan 6 Maret 2026), keputusan ini secara resmi mencabut dan menyatakan tidak berlaku Kepmendikdasmen No. 95/M/2025. Regulasi ini menjadi pedoman operasional tunggal yang mengintegrasikan TKA dan Asesmen Nasional (AN).'
    },
    {
      q: 'Berapa skala penilaian hasil TKA untuk jenjang SMA/MA/SMK menurut Kepmen 56/2026?',
      a: 'Sesuai Bab X Halaman 49-50, capaian TKA jenjang SMA/MA/SMK dilaporkan dalam bentuk skor skala 200 sampai 800 dengan 2 angka di belakang koma (desimal), bukan skala 0-100. Capaian dikelompokkan ke dalam kategori: Baik, Memadai, dan Kurang.'
    },
    {
      q: 'Apa syarat untuk memperoleh "Predikat Istimewa" pada Sertifikat Hasil TKA (SHTKA)?',
      a: 'Berdasarkan Bab X Kepmen 56/2026, predikat istimewa diberikan kepada murid yang memperoleh skor minimal 725,00 (tujuh ratus dua puluh lima koma nol nol) pada seluruh mata pelajaran yang diujikan (Bahasa Indonesia, Bahasa Inggris, Matematika, dan 2 Mapel Pilihan).'
    },
    {
      q: 'Bagaimana pembagian alokasi waktu dan jadwal 4 hari ujian TKA-AN SMA?',
      a: 'Sesuai Bab VIII: Hari I menguji Bahasa Indonesia (60 mnt) + Survei Karakter (20 mnt); Hari II Bahasa Inggris (50 mnt) + Sulingjar Siswa (20 mnt); Hari III Matematika (70 mnt); dan Hari IV Mapel Pilihan 1 (50 mnt) + Mapel Pilihan 2 (50 mnt). Setiap hari didahului 10 menit latihan sistem.'
    },
    {
      q: 'Bagaimana peran Penyelia Pengawas dari Perguruan Tinggi Negeri (PTN)?',
      a: 'Sesuai Bab VII, Kemendikdasmen bekerja sama dengan PTN di mana dosen/staf PTN bertindak sebagai Penyelia Pengawas Daring. Penyelia memantau kelancaran dan integritas seluruh ruang tes secara live melalui tautan video conference yang disiarkan oleh pengawas ruang.'
    },
    {
      q: 'Berapa rasio komputer terhadap peserta yang diizinkan untuk SMA?',
      a: 'Rasio komputer klien terhadap total peserta per hari adalah maksimal 1 : 4 (1 komputer untuk 4 sesi harian bergantian) ditambah minimal 10% unit komputer cadangan (reserve) di tiap ruang laboratorium CBT.'
    },
    {
      q: 'Apakah TKA menjadi penentu kelulusan murid dari SMA?',
      a: 'TIDAK. Berdasarkan Kepmendikdasmen No. 56 Tahun 2026, TKA bukan penentu kelulusan. TKA digunakan untuk seleksi akademik (SNBP/SNBT/Kedinasan), penyetaraan jalur nonformal/informal, dan pengendalian mutu pendidikan nasional.'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchFaq.toLowerCase()) || 
    f.a.toLowerCase().includes(searchFaq.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 mb-1">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            LANDASAN YURIDIS & KERANGKA KEBIJAKAN TERKINI
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Panduan Regulasi Resmi Penyelenggaraan TKA SMA
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kepmendikdasmen No. 56 Tahun 2026 dan Perkaban No. 045/H/AN/2025.
          </p>
        </div>

        {/* Sub tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveSubTab('kepmen56')}
            className={`px-3 py-1.5 rounded-md transition ${
              activeSubTab === 'kepmen56'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ★ Kepmendikdasmen 56/2026
          </button>
          <button
            onClick={() => setActiveSubTab('pedomanTka')}
            className={`px-3 py-1.5 rounded-md transition ${
              activeSubTab === 'pedomanTka'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Prinsip &amp; Penyelenggara TKA
          </button>
          <button
            onClick={() => setActiveSubTab('perkaban')}
            className={`px-3 py-1.5 rounded-md transition ${
              activeSubTab === 'perkaban'
                ? 'bg-white text-blue-800 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Perkaban 45/2025
          </button>
          <button
            onClick={() => setActiveSubTab('sop')}
            className={`px-3 py-1.5 rounded-md transition ${
              activeSubTab === 'sop'
                ? 'bg-white text-blue-800 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SOP Kedaruratan
          </button>
          <button
            onClick={() => setActiveSubTab('faq')}
            className={`px-3 py-1.5 rounded-md transition ${
              activeSubTab === 'faq'
                ? 'bg-white text-blue-800 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tanya Jawab (FAQ)
          </button>
        </div>
      </div>

      {/* ================= SUBTAB 0: KEPMENDIKDASMEN NO. 56 TAHUN 2026 (REGULASI UTAMA) ================= */}
      {activeSubTab === 'kepmen56' && (
        <div className="space-y-5 text-xs">
          {/* Banner Pencabutan Kepmen 95/M/2025 */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-4 rounded-xl">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-950 text-sm">
                  Diktum Keempat Kepmendikdasmen No. 56 Tahun 2026 (Ditetapkan 6 Maret 2026)
                </h3>
                <p className="text-amber-900 mt-1 leading-relaxed">
                  Secara resmi <strong>mencabut dan menyatakan tidak berlaku</strong> Keputusan Menteri Pendidikan Dasar dan Menengah Nomor 95/M/2025 tentang Pedoman Penyelenggaraan Asesmen Nasional. Seluruh operasional TKA SMA dan Asesmen Nasional (AN) kini diatur secara terintegrasi di bawah Kepmen No. 56 Tahun 2026.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Penilaian Skala 200-800 & Predikat Istimewa */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Bab X: Sistem Penilaian Skala 200 - 800 &amp; Predikat Istimewa
              </h3>
              <div className="space-y-2 text-slate-700 leading-relaxed">
                <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-100 space-y-1">
                  <strong className="text-indigo-950">Skala Nilai Resmi SMA/MA/SMK:</strong>
                  <p className="text-[11px] text-slate-700">
                    Hasil TKA dilaporkan dalam rentang <strong>skor 200 sampai 800</strong> dengan 2 desimal di belakang koma (misal: 745,50). Berbeda dari jenjang SD/SMP yang menggunakan skala 0-100.
                  </p>
                  <div className="grid grid-cols-3 gap-1 pt-1 text-center font-bold">
                    <span className="bg-emerald-100 text-emerald-800 py-1 rounded text-[10px]">Baik</span>
                    <span className="bg-blue-100 text-blue-800 py-1 rounded text-[10px]">Memadai</span>
                    <span className="bg-amber-100 text-amber-800 py-1 rounded text-[10px]">Kurang</span>
                  </div>
                </div>
                <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 space-y-1">
                  <strong className="text-amber-950 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> Kriteria Predikat Istimewa:
                  </strong>
                  <p className="text-[11px] text-slate-700">
                    Dianugerahkan kepada murid yang memperoleh skor minimal <strong>725,00</strong> pada setiap mata pelajaran yang diujikan (Bahasa Indonesia, Bahasa Inggris, Matematika, dan 2 Mapel Pilihan).
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Pengawasan Silang & Peran Penyelia Dosen PTN */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Bab VII: Struktur Pengawasan &amp; Penyelia Pengawas PTN Daring
              </h3>
              <div className="space-y-2 text-slate-700 leading-relaxed">
                <p>
                  Untuk menjamin akuntabilitas dan integritas pengujian tanpa kompromi, Kepmen 56/2026 menetapkan hierarki pengawasan nasional:
                </p>
                <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-100 space-y-1.5">
                  <div>
                    <strong className="text-blue-950">1. Penyelia Pengawas (Dosen/Staff PTN):</strong>
                    <p className="text-[11px] text-slate-600">Melakukan supervisi daring secara live melalui ruang vcon untuk memvalidasi presensi, ketertiban ruang, dan ketaatan proktor.</p>
                  </div>
                  <div>
                    <strong className="text-blue-950">2. Pendamping Penyelia:</strong>
                    <p className="text-[11px] text-slate-600">Pejabat/Pengawas dari Dinas Pendidikan Provinsi Jawa Tengah dan Cabang Dinas Wilayah I-XIII.</p>
                  </div>
                  <div>
                    <strong className="text-blue-950">3. Pengawas Ruang Silang:</strong>
                    <p className="text-[11px] text-slate-600">Guru silang murni antar-satuan pendidikan yang dilengkapi smartphone berkamera untuk terhubung dengan Penyelia PTN.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Jadwal 4 Hari & 4 Sesi Harian SMA */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Bab VIII: Alokasi Waktu, 4 Sesi Harian, &amp; Rasio PC 1 : 4
              </h3>
              <div className="space-y-2 text-slate-700 leading-relaxed">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] space-y-1">
                  <div className="flex justify-between font-semibold text-slate-900">
                    <span>Sesi 1: 07.00 - 08.30 WIB</span>
                    <span>Sesi 2: 09.00 - 10.30 WIB</span>
                  </div>
                  <div className="flex justify-between font-semibold text-slate-900">
                    <span>Sesi 3: 11.00 - 12.30 WIB</span>
                    <span>Sesi 4: 13.00 - 14.30 WIB</span>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-100 space-y-1">
                  <strong className="text-emerald-950">Ketentuan Rasio Sarpras CBT:</strong>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700 pl-1">
                    <li>Rasio komputer klien terhadap peserta: <strong>maksimal 1 : 4</strong> (1 PC untuk 4 gelombang sesi per hari).</li>
                    <li>Wajib menyediakan minimal <strong>10% unit komputer cadangan</strong> aktif di setiap lab.</li>
                    <li>Genset otomatis berdaya penuh dan UPS server standby minimal 30 menit saat pemadaman.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 4: Sulingjar Guru & Kepala Sekolah */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
                <BookOpen className="w-4 h-4 text-rose-600" />
                Bab IX: Pelaksanaan Survei Lingkungan Belajar (Sulingjar)
              </h3>
              <div className="space-y-2 text-slate-700 leading-relaxed">
                <p>
                  Sebagai bagian integral Asesmen Nasional terpadu, seluruh Pendidik dan Kepala Satuan Pendidikan SMA Negeri maupun Swasta wajib mengisi Sulingjar:
                </p>
                <div className="p-3 bg-rose-50/70 rounded-lg border border-rose-100 space-y-1 text-[11px]">
                  <p>
                    <strong>Periode Pengisian:</strong> Diberikan rentang waktu <strong>4 (empat) pekan</strong> secara mandiri melalui laman resmi Kemendikdasmen.
                  </p>
                  <p>
                    <strong>Cakupan Asesmen:</strong> Iklim keamanan sekolah, iklim kebinekaan, kualitas pembelajaran di kelas, serta kepemimpinan instruksional kepala sekolah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBTAB 1: PEDOMAN PENYELENGGARAAN TKA (KEPMENDIKDASMEN NO. 56 TAHUN 2026) ================= */}
      {activeSubTab === 'pedomanTka' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Card 1: Ketentuan Umum & Prinsip */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Prinsip Pokok Penyelenggaraan TKA (Kepmen 56/2026)
            </h3>
            <div className="space-y-2 text-slate-700 leading-relaxed">
              <p>
                Tes Kemampuan Akademik (TKA) adalah kegiatan pengukuran capaian akademik murid pada mata pelajaran tertentu pada jenjang pendidikan dasar dan menengah yang diselenggarakan secara terstandar nasional.
              </p>
              <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-100 space-y-1">
                <strong className="text-blue-900">Tiga Prinsip Utama Penyelenggaraan TKA:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                  <li><strong>Kejujuran:</strong> Menjunjung tinggi integritas dalam seluruh tahapan persiapan dan pelaksanaan ujian.</li>
                  <li><strong>Kerahasiaan:</strong> Menjaga seluruh materi dan data hasil ujian dari akses yang tidak sah.</li>
                  <li><strong>Akuntabilitas:</strong> Menjamin setiap proses dapat dipertanggungjawabkan secara hukum, teknis, dan metodologis.</li>
                </ul>
              </div>
              <p>
                Bertujuan memperoleh capaian akademik terstandar untuk seleksi akademik perguruan tinggi (PTN/Kedinasan), penyetaraan jalur nonformal/informal, serta acuan penjaminan mutu pendidikan oleh Pengawas Sekolah dan Dinas Pendidikan Provinsi Jawa Tengah.
              </p>
            </div>
          </div>

          {/* Card 2: Pelaksanaan & Syarat Satdik */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              Pelaksana & Persyaratan Satuan Pendidikan SMA
            </h3>
            <div className="space-y-2 text-slate-700 leading-relaxed">
              <p>
                Pelaksana TKA adalah Satuan Pendidikan SMA Negeri dan Swasta yang <strong>terakreditasi</strong>. Satuan pendidikan yang belum terakreditasi wajib menginduk ke sekolah pelaksana yang ditetapkan Cabang Dinas.
              </p>
              <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-100 space-y-1">
                <strong className="text-emerald-950">Persyaratan Minimal Pelaksana Mandiri:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                  <li><strong>Sarana:</strong> Komputer klien rasio 1:4 per hari, cadangan minimal 10%, daya listrik stabil (PLN + Genset/UPS), dan bandwidth memadai.</li>
                  <li><strong>Petugas:</strong> Proktor Utama dan Teknisi yang telah bersertifikat/terlatih serta pengawas ruang silang.</li>
                </ul>
              </div>
              <p>
                <strong>Mata Uji SMA Terdiri Atas:</strong>
                <br />a. Bahasa Indonesia (Wajib)
                <br />b. Matematika (Wajib)
                <br />c. Bahasa Inggris (Wajib)
                <br />d. 2 Mata Pelajaran Pilihan sesuai peminatan/prodi PTN.
              </p>
            </div>
          </div>

          {/* Card 3: Sertifikat Hasil TKA (SHTKA) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Hasil Ujian & Pemanfaatan SHTKA (Skala 200 - 800)
            </h3>
            <div className="space-y-2 text-slate-700 leading-relaxed">
              <p>
                Hasil TKA diterbitkan oleh Kementerian dalam bentuk angka (skala 200-800) dan kategori capaian (Baik, Memadai, Kurang) yang tercantum dalam Sertifikat Hasil Tes Kemampuan Akademik (SHTKA).
              </p>
              <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-100 space-y-1">
                <strong className="text-indigo-950">Pemanfaatan Hasil TKA SMA:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                  <li>Menjadi pertimbangan utama dalam seleksi penerimaan mahasiswa baru perguruan tinggi (PTN - SNBP/SNBT).</li>
                  <li>Menyetarakan hasil belajar pendidikan nonformal/informal dengan formal.</li>
                  <li>Acuan pengendalian mutu pendidikan oleh Pemerintah Daerah Provinsi dan Pengawas SMA Jateng.</li>
                </ul>
              </div>
              <p>
                Memuat nomor unik sertifikat, data diri, nilai mapel wajib + 2 mapel pilihan, dan tanda pengesahan elektronik.
              </p>
            </div>
          </div>

          {/* Card 4: Pemantauan, Evaluasi & Laporan Pengawas */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileCheck className="w-4 h-4 text-amber-600" />
              Pemantauan, Evaluasi, dan Pelaporan Pengawas SMA
            </h3>
            <div className="space-y-2 text-slate-700 leading-relaxed">
              <p>
                Pemerintah Daerah Provinsi Jawa Tengah melalui Pengawas SMA berwenang memantau, mengevaluasi, dan melaporkan pelaksanaan TKA jenjang SMA.
              </p>
              <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-100 space-y-1">
                <strong className="text-amber-950">Muatan Wajib Laporan Monev TKA:</strong>
                <ol className="list-decimal list-inside space-y-1 text-slate-800 pl-1 font-medium">
                  <li>Kesiapan Satuan Pendidikan dalam pelaksanaan TKA;</li>
                  <li>Keterlaksanaan TKA (kehadiran & sesi);</li>
                  <li>Kendala/masalah dalam pelaksanaan TKA;</li>
                  <li>Tindak lanjut dan strategi dalam penanganan kendala; dan</li>
                  <li>Kesimpulan dan saran rekomendasi mutu.</li>
                </ol>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                * Dilaporkan oleh Pengawas SMA ke Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah serta Kementerian.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBTAB 2: PERKABAN NO. 45 TAHUN 2025 ================= */}
      {activeSubTab === 'perkaban' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">
              Kerangka Asesmen TKA SMA/MA/Sederajat (Perkaban No. 045/H/AN/2025)
            </h3>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Ditetapkan oleh Kepala BSKAP Toni Toharudin pada 14 Juli 2025.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase text-blue-700">1. Pilihan Ganda Sederhana</h4>
              <p className="text-slate-600 leading-relaxed">
                Menyajikan satu pokok soal dengan beberapa opsi pilihan (A, B, C, D, E) dengan <strong>hanya satu pilihan jawaban yang benar</strong>.
              </p>
              <div className="text-[11px] bg-white p-2 rounded border border-slate-200 text-slate-700">
                Cocok untuk mengukur knowing & recall rumus, identifikasi data tersurat, serta kalkulasi dasar.
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase text-indigo-700">2. PGK MCMA (Multiple Answers)</h4>
              <p className="text-slate-600 leading-relaxed">
                Terdapat kemungkinan <strong>lebih dari satu pilihan jawaban benar</strong>. Peserta diminta memilih semua opsi yang dianggap benar.
              </p>
              <div className="text-[11px] bg-white p-2 rounded border border-slate-200 text-slate-700">
                Menguji pemahaman komprehensif, multi-kondisi pada sains, serta sintesis argumen wacana panjang.
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase text-emerald-700">3. PGK Kategori</h4>
              <p className="text-slate-600 leading-relaxed">
                Menyajikan tabel pernyataan yang semuanya wajib direspon (misal pilihan <strong>"Benar / Salah"</strong> atau <strong>"Sesuai / Tidak Sesuai"</strong>).
              </p>
              <div className="text-[11px] bg-white p-2 rounded border border-slate-200 text-slate-700">
                Menguji evaluasi keakuratan teks, penarikan kesimpulan induktif/deduktif, serta logika kritis wacana.
              </div>
            </div>
          </div>

          {/* Integrasi Koding & KA */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 space-y-2 mt-4">
            <h4 className="font-bold text-blue-950 text-xs flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-700" />
              Kaitan dengan Capaian Pembelajaran Koding dan Kecerdasan Artifisial (Fase E & F SMA)
            </h4>
            <p className="text-slate-700 leading-relaxed">
              Sesuai dokumen Kurikulum Koding & KA Fase E dan F (Kepala BSKAP), literasi logika komputasional, penalaran berbasis data, algoritma, serta pemahaman etika AI (machine learning, prompt engineering, privasi data) diintegrasikan langsung ke dalam butir-butir soal TKA Matematika, Fisika, dan Bahasa Inggris Lanjut.
            </p>
          </div>
        </div>
      )}

      {/* ================= SUBTAB 3: SOP KEDARURATAN ================= */}
      {activeSubTab === 'sop' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              Standar Operasional Prosedur (SOP) Penanganan Kedaruratan Sesi TKA
            </h3>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Protokol resmi mitigasi cepat yang wajib dipedomani oleh Proktor, Teknisi, dan Pengawas Ruang Silang.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Protokol Pemadaman Listrik PLN</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-6">
                <li>UPS otomatis menahan beban server CBT dan switch jaringan minimal 15-30 menit.</li>
                <li>Teknisi menyalakan genset cadangan maksimal 5 menit sejak pemadaman terjadi.</li>
                <li>Jika mati lampu &gt; 30 menit dan genset bermasalah, pengawas menghentikan sesi dan proktor mencatat durasi waktu yang hilang untuk kompensasi atau penjadwalan susulan.</li>
              </ul>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Protokol Gangguan Jaringan / Server Freeze</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-6">
                <li>Pengawas meminta seluruh peserta tetap tenang dan tidak menutup peramban ujian.</li>
                <li>Teknisi mengalihkan ke saluran internet cadangan (modem 4G/5G backup router).</li>
                <li>Jawaban murid secara berkala tersimpan otomatis di basis data lokal/cloud sehingga tidak akan hilang saat reconnect.</li>
              </ul>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
                <span>Protokol Kerusakan Hardware PC Klien</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-6">
                <li>Murid segera dipindahkan ke salah satu komputer cadangan (reserve PC) yang siap sedia di lab.</li>
                <li>Proktor melakukan reset login pada dashboard pengawas agar murid dapat melanjutkan dari butir soal terakhir.</li>
                <li>Pengawas memberikan tambahan waktu kompensasi sejumlah menit perpindahan PC (maksimal 10 menit).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBTAB 4: FAQ ================= */}
      {activeSubTab === 'faq' && (
        <div className="space-y-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari topik pertanyaan atau jawaban..."
              value={searchFaq}
              onChange={(e) => setSearchFaq(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1.5 text-xs">
                <h4 className="font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-slate-600 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
