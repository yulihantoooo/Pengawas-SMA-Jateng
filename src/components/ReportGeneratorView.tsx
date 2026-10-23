import React, { useState } from 'react';
import { School, IncidentReport, SHTKACertificate } from '../types/tka';
import { INITIAL_SHTKA } from '../data/mockData';
import { 
  FileText, 
  Award, 
  Printer, 
  Download, 
  CheckCircle, 
  QrCode, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  ExternalLink,
  Sparkles,
  School as SchoolIcon
} from 'lucide-react';

interface ReportGeneratorViewProps {
  schools: School[];
  incidents: IncidentReport[];
}

export const ReportGeneratorView: React.FC<ReportGeneratorViewProps> = ({
  schools,
  incidents
}) => {
  const [activeReportTab, setActiveReportTab] = useState<'monevReport' | 'shtkaCert'>('monevReport');

  // Monev report customizable parameters
  const [provinsi, setProvinsi] = useState('Jawa Tengah');
  const [cabangDinas, setCabangDinas] = useState('Cabang Dinas Pendidikan Wilayah I (Kota & Kab. Semarang)');
  const [nomorLaporan, setNomorLaporan] = useState('421.3/902/Disdikbud-Monev/TKA/2026');
  const [tanggalLaporan, setTanggalLaporan] = useState('22 Oktober 2026');
  const [namaPengawas, setNamaPengawas] = useState('Drs. H. Mulyadi, M.Pd.');
  const [nipPengawas, setNipPengawas] = useState('196805141994121002');

  // SHTKA Certificate customizable parameters
  const [certData, setCertData] = useState<SHTKACertificate>(INITIAL_SHTKA);
  const [selectedStudentSchool, setSelectedStudentSchool] = useState<string>(schools[0]?.id || '');

  const handlePrint = () => {
    window.print();
  };

  const totalMurid = schools.reduce((a, b) => a + b.jumlahPesertaKelas12, 0);
  const mandiriCount = schools.filter(s => s.statusPelaksanaan.includes('Mandiri')).length;
  const avgScore = Math.round(schools.reduce((a, b) => a + (b.skorKesiapan || 80), 0) / (schools.length || 1));

  return (
    <div className="space-y-6">
      {/* Tab Selector */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveReportTab('monevReport')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeReportTab === 'monevReport'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Laporan Monev Resmi (Pasal 21)</span>
          </button>

          <button
            onClick={() => setActiveReportTab('shtkaCert')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeReportTab === 'shtkaCert'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Sertifikat Hasil TKA SMA (Format 1)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <Printer className="w-4 h-4" /> Cetak / Unduh Dokumen (PDF)
          </button>
        </div>
      </div>

      {/* ================= TAB 1: LAPORAN MONEV RESMI PASAL 21 ================= */}
      {activeReportTab === 'monevReport' && (
        <div className="space-y-4">
          {/* Customization controls in screen mode */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3 print:hidden">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Nomor Laporan Resmi:</label>
              <input
                type="text"
                value={nomorLaporan}
                onChange={(e) => setNomorLaporan(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded p-1.5 font-mono text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Nama Instansi / Cabang Dinas:</label>
              <input
                type="text"
                value={cabangDinas}
                onChange={(e) => setCabangDinas(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-slate-800 font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Penanggung Jawab / Tim Monev:</label>
              <input
                type="text"
                value={namaPengawas}
                onChange={(e) => setNamaPengawas(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* PRINTABLE OFFICIAL REPORT DOCUMENT */}
          <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-md max-w-4xl mx-auto text-slate-900 print:shadow-none print:border-none print:p-0">
            {/* Kop Surat Resmi */}
            <div className="border-b-4 border-double border-slate-900 pb-4 text-center space-y-1">
              <h3 className="font-extrabold text-base uppercase tracking-wider text-slate-900">
                PEMERINTAH PROVINSI JAWA TENGAH
              </h3>
              <h2 className="font-black text-xl uppercase tracking-tight text-slate-950">
                DINAS PENDIDIKAN DAN KEBUDAYAAN
              </h2>
              <p className="font-semibold text-xs text-slate-700 uppercase">
                {cabangDinas.toUpperCase()}
              </p>
              <p className="text-[11px] text-slate-500 italic">
                Jalan Pemuda Nomor 134, Kota Semarang 50132 • Telp: (024) 3515301 • Laman: disdikbud.jatengprov.go.id
              </p>
            </div>

            {/* Title Document */}
            <div className="my-6 text-center space-y-1">
              <h4 className="font-black text-base uppercase underline underline-offset-4 tracking-tight">
                LAPORAN HASIL PEMANTAUAN DAN EVALUASI PELAKSANAAN TES KEMAMPUAN AKADEMIK (TKA)
              </h4>
              <p className="font-bold text-xs text-slate-700">
                JENJANG SMA NEGERI DAN SWASTA PROVINSI JAWA TENGAH TAHUN AJARAN 2025/2026
              </p>
              <p className="text-[11px] font-mono text-slate-600">
                Nomor: {nomorLaporan}
              </p>
              <p className="text-[10px] text-slate-500 italic">
                Disusun Berdasarkan Pedoman Penyelenggaraan TKA dan Asesmen Nasional Keputusan Menteri Pendidikan Dasar dan Menengah Republik Indonesia Nomor 56 Tahun 2026
              </p>
            </div>

            {/* Document Content */}
            <div className="space-y-6 text-xs leading-relaxed text-slate-800">
              {/* Bagian A: Kesiapan Satuan Pendidikan */}
              <section className="space-y-2">
                <h5 className="font-bold text-sm text-slate-950 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                  <span>A.</span> KESIAPAN SATUAN PENDIDIKAN DALAM PELAKSANAAN TKA
                </h5>
                <p>
                  Berdasarkan instrumen Kertas Kerja Asesmen (KKA) yang telah diverifikasi pada {schools.length} Satuan Pendidikan SMA di wilayah kerja {cabangDinas}, diperoleh data kesiapan sebagai berikut:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2">
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                    <span className="block text-[10px] text-slate-500 uppercase">Total Peserta TKA</span>
                    <strong className="text-base text-slate-900 font-bold">{totalMurid} Murid</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                    <span className="block text-[10px] text-slate-500 uppercase">Status Mandiri</span>
                    <strong className="text-base text-slate-900 font-bold">{mandiriCount} SMA</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                    <span className="block text-[10px] text-slate-500 uppercase">Status Menginduk</span>
                    <strong className="text-base text-slate-900 font-bold">{schools.length - mandiriCount} SMA</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-center">
                    <span className="block text-[10px] text-slate-500 uppercase">Rata-rata Skor KKA</span>
                    <strong className="text-base text-emerald-800 font-bold">{avgScore}% (Grade A)</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600">
                  Seluruh satuan pendidikan pelaksana mandiri telah memenuhi rasio komputer minimal 1:3 terhadap peserta per sesi, didukung genset cadangan dengan kapasitas penuh dan instalasi UPS pada ruang server CBT.
                </p>
              </section>

              {/* Bagian B: Keterlaksanaan TKA */}
              <section className="space-y-2">
                <h5 className="font-bold text-sm text-slate-950 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                  <span>B.</span> KETERLAKSANAAN TES KEMAMPUAN AKADEMIK &amp; ASESMEN NASIONAL (TKA-AN)
                </h5>
                <p>
                  Pelaksanaan TKA berlangsung dalam 4 (empat) sesi harian terjadwal sesuai <strong>Kepmendikdasmen No. 56 Tahun 2026 (Bab VIII)</strong> dengan proporsi kehadiran peserta didik mencapai <strong>99.4%</strong>. Seluruh ruang ujian menerapkan sistem pengawasan silang antar-SMA dan diselia secara daring melalui video conference oleh <strong>Penyelia Perguruan Tinggi Negeri (PTN)</strong> mitra Disdikbud Jateng.
                </p>
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-2">Nama SMA</th>
                        <th className="p-2">NPSN</th>
                        <th className="p-2">Peserta</th>
                        <th className="p-2">Ruang/PC</th>
                        <th className="p-2 text-center">S1 (07.00)</th>
                        <th className="p-2 text-center">S2 (09.00)</th>
                        <th className="p-2 text-center">S3 (11.00)</th>
                        <th className="p-2 text-center">S4 (13.00)</th>
                        <th className="p-2 text-center">Penyelia PTN</th>
                        <th className="p-2 text-right">Skor &amp; Predikat KKA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {schools.map(s => (
                        <tr key={s.id}>
                          <td className="p-2 font-semibold text-slate-900">{s.nama}</td>
                          <td className="p-2 font-mono text-slate-600">{s.npsn}</td>
                          <td className="p-2">{s.jumlahPesertaKelas12}</td>
                          <td className="p-2">{s.jumlahRuangUjian} R / {s.jumlahKomputerUtama} PC</td>
                          <td className="p-2 text-center text-emerald-700">{s.sesiHariIni.sesi1}</td>
                          <td className="p-2 text-center text-blue-700">{s.sesiHariIni.sesi2}</td>
                          <td className="p-2 text-center text-slate-600">{s.sesiHariIni.sesi3}</td>
                          <td className="p-2 text-center text-slate-600">{s.sesiHariIni.sesi4}</td>
                          <td className="p-2 text-center font-medium text-indigo-700">{s.statusPenyeliaPtn || 'Terhubung'}</td>
                          <td className="p-2 text-right">
                            <span className="font-bold text-slate-900">{s.skorKesiapan || 85}</span>
                            <span className="text-[10px] text-emerald-700 font-semibold block">{s.predikatKka || 'Sangat Baik'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Bagian C: Kendala / Masalah Lapangan */}
              <section className="space-y-2">
                <h5 className="font-bold text-sm text-slate-950 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                  <span>C.</span> KENDALA / MASALAH DALAM PELAKSANAAN TKA
                </h5>
                <p>
                  Selama pemantauan di lapangan, tercatat beberapa kendala teknis dan non-teknis yang berhasil dihimpun dalam sistem tiket insiden:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                  {incidents.map((inc) => (
                    <li key={inc.id}>
                      <strong>[{inc.kodeTiket}] {inc.schoolName}:</strong> {inc.deskripsiMasalah} (Status: {inc.status})
                    </li>
                  ))}
                  <li>
                    Fluktuasi tegangan daya listrik lokal di sub-rayon yang sempat mengaktifkan alarm UPS ruang server.
                  </li>
                </ul>
              </section>

              {/* Bagian D: Tindak Lanjut & Mitigasi */}
              <section className="space-y-2">
                <h5 className="font-bold text-sm text-slate-950 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                  <span>D.</span> TINDAK LANJUT DAN STRATEGI PENANGANAN KENDALA
                </h5>
                <p>
                  Langkah-langkah penanganan yang telah dieksekusi oleh Tim Teknisi, Proktor, dan Pengawas Ruang:
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-2 text-slate-700">
                  <li>
                    Penggantian unit klien bermasalah ke PC cadangan (reserve) dalam waktu di bawah 5 menit dan penambahan waktu kompensasi otomatis.
                  </li>
                  <li>
                    Aktivasi koneksi modem cadangan 4G LTE High-Gain saat koneksi ISP fiber optik mengalami gangguan sesaat.
                  </li>
                  <li>
                    Pendataan siswa yang berhalangan hadir karena sakit untuk diikutsertakan dalam <em>Jadwal Sesi TKA Susulan</em> resmi sesuai ketentuan BSKAP Kemendikdasmen.
                  </li>
                </ol>
              </section>

              {/* Bagian E: Kesimpulan & Saran */}
              <section className="space-y-2">
                <h5 className="font-bold text-sm text-slate-950 flex items-center gap-1.5 border-b border-slate-200 pb-1">
                  <span>E.</span> KESIMPULAN DAN SARAN REKOMENDASI
                </h5>
                <p className="font-medium text-slate-900">
                  <strong>Kesimpulan:</strong> Pelaksanaan Tes Kemampuan Akademik (TKA) Jenjang SMA di lingkungan {cabangDinas} secara umum berjalan dengan tertib, lancar, dan memenuhi prinsip <strong>Kejujuran, Kerahasiaan, dan Akuntabilitas</strong> sebagaimana diatur dalam Kepmendikdasmen No. 56 Tahun 2026.
                </p>
                <p>
                  <strong>Saran:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                  <li>Mendorong satuan pendidikan yang masih berstatus "Menginduk" untuk mengajukan pengadaan lab komputer pada DAK fisik tahun berikutnya agar dapat mandiri penuh.</li>
                  <li>Memperkuat pelatihan berkala teknisi dan proktor dalam menangani varian soal pilihan ganda kompleks (PGK MCMA dan Kategori) pada aplikasi CBT.</li>
                  <li>Menjaga koordinasi berkala dengan PLN dan penyedia jasa internet (ISP) selama pekan pelaksanaan TKA.</li>
                </ul>
              </section>

              {/* Tanda Tangan Resmi */}
              <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <p className="text-slate-600">Mengetahui,</p>
                  <p className="font-bold text-slate-900 mt-0.5">Kepala Cabang Dinas Pendidikan</p>
                  <div className="h-20 flex items-center justify-center italic text-slate-400">
                    [Tanda Tangan & Cap Dinas]
                  </div>
                  <p className="font-bold text-slate-900 underline">Dr. USMAN EFFENDI, S.Pd., M.Pd.</p>
                  <p className="text-[11px] text-slate-500">NIP. 196807151992031005</p>
                </div>

                <div>
                  <p className="text-slate-600">Semarang, {tanggalLaporan}</p>
                  <p className="font-bold text-slate-900 mt-0.5">Ketua Tim Monitoring & Evaluasi</p>
                  <div className="h-20 flex items-center justify-center italic text-slate-400">
                    [Tanda Tangan Pengawas Monev]
                  </div>
                  <p className="font-bold text-slate-900 underline">{namaPengawas}</p>
                  <p className="text-[11px] text-slate-500">NIP. {nipPengawas}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: SERTIFIKAT HASIL TKA (SHTKA FORMAT 1 - KEPMEN 56/2026) ================= */}
      {activeReportTab === 'shtkaCert' && (
        <div className="space-y-4">
          {/* Certificate Customizer Bar */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-4 gap-3 print:hidden">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Nama Lengkap Murid:</label>
              <input
                type="text"
                value={certData.namaSiswa}
                onChange={(e) => setCertData({ ...certData, namaSiswa: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded p-1.5 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">NISN:</label>
              <input
                type="text"
                value={certData.nisn}
                onChange={(e) => setCertData({ ...certData, nisn: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded p-1.5 font-mono text-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Mapel Pilihan 1 &amp; Skor (200-800):</label>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={certData.nilai.mapelPilihan1.nama}
                  onChange={(e) => setCertData({
                    ...certData,
                    nilai: {
                      ...certData.nilai,
                      mapelPilihan1: { ...certData.nilai.mapelPilihan1, nama: e.target.value }
                    }
                  })}
                  className="w-2/3 bg-white border border-slate-300 rounded p-1.5 text-slate-900 font-medium"
                />
                <input
                  type="number"
                  step="0.25"
                  min="200"
                  max="800"
                  value={certData.nilai.mapelPilihan1.nilai}
                  onChange={(e) => setCertData({
                    ...certData,
                    nilai: {
                      ...certData.nilai,
                      mapelPilihan1: { ...certData.nilai.mapelPilihan1, nilai: Number(e.target.value) }
                    }
                  })}
                  className="w-1/3 bg-white border border-slate-300 rounded p-1.5 font-bold text-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Mapel Pilihan 2 &amp; Skor (200-800):</label>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={certData.nilai.mapelPilihan2.nama}
                  onChange={(e) => setCertData({
                    ...certData,
                    nilai: {
                      ...certData.nilai,
                      mapelPilihan2: { ...certData.nilai.mapelPilihan2, nama: e.target.value }
                    }
                  })}
                  className="w-2/3 bg-white border border-slate-300 rounded p-1.5 text-slate-900 font-medium"
                />
                <input
                  type="number"
                  step="0.25"
                  min="200"
                  max="800"
                  value={certData.nilai.mapelPilihan2.nilai}
                  onChange={(e) => setCertData({
                    ...certData,
                    nilai: {
                      ...certData.nilai,
                      mapelPilihan2: { ...certData.nilai.mapelPilihan2, nilai: Number(e.target.value) }
                    }
                  })}
                  className="w-1/3 bg-white border border-slate-300 rounded p-1.5 font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* OFFICIAL SHTKA CERTIFICATE CANVAS (Kepmendikdasmen No. 56 Tahun 2026) */}
          <div className="bg-[#fbfbf9] p-8 md:p-12 rounded-2xl border-8 border-double border-amber-900/30 shadow-2xl max-w-3xl mx-auto text-slate-900 relative overflow-hidden print:shadow-none print:border-4 print:p-6 print:m-0">
            {/* Watermark Logo Garuda background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
              <div className="w-96 h-96 rounded-full border-12 border-amber-900/20 flex items-center justify-center text-7xl font-black text-amber-900">
                TKA
              </div>
            </div>

            {/* Header Garuda */}
            <div className="text-center space-y-2 relative z-10">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-600/40 flex items-center justify-center shadow-inner text-amber-700 font-serif text-2xl font-black">
                ★
              </div>
              <div>
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                  KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH
                </h3>
                <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-800">
                  REPUBLIK INDONESIA
                </h4>
              </div>
              <div className="pt-2">
                <h2 className="font-serif font-black text-xl md:text-2xl text-slate-950 uppercase tracking-tight">
                  SERTIFIKAT HASIL TES KEMAMPUAN AKADEMIK
                </h2>
                <p className="font-semibold text-xs tracking-widest uppercase text-slate-700">
                  JENJANG SEKOLAH MENENGAH ATAS (SMA/MA)
                </p>
                <p className="text-xs text-slate-600 font-medium">
                  TAHUN AJARAN {certData.tahunAjaran}
                </p>
              </div>

              {/* Predikat Istimewa Banner (Kepmen 56/2026 Bab X) */}
              {certData.isPredikatIstimewa && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 px-4 py-1.5 rounded-full border border-amber-600/40 font-black text-xs tracking-wider uppercase shadow-md animate-pulse">
                  <Sparkles className="w-4 h-4 text-amber-900" />
                  PREDIKAT ISTIMEWA (SKOR SELURUH MATA UJI &ge; 725,00)
                  <Sparkles className="w-4 h-4 text-amber-900" />
                </div>
              )}
            </div>

            {/* Legal basis quote */}
            <p className="text-[11px] text-slate-600 text-justify mt-4 leading-relaxed relative z-10">
              Berdasarkan <strong>Keputusan Menteri Pendidikan Dasar dan Menengah Republik Indonesia Nomor 56 Tahun 2026</strong> tentang Pedoman Penyelenggaraan Tes Kemampuan Akademik dan Asesmen Nasional, Kementerian menerbitkan Sertifikat Hasil Tes Kemampuan Akademik (SHTKA) kepada:
            </p>

            {/* Student Info Table */}
            <div className="my-4 space-y-1.5 text-xs relative z-10 bg-white/70 p-4 rounded-xl border border-amber-900/15">
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-4 text-slate-600">Nama Lengkap</span>
                <span className="col-span-1 text-center">:</span>
                <span className="col-span-7 font-bold text-slate-900 uppercase tracking-wide">
                  {certData.namaSiswa}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-4 text-slate-600">Tempat, Tanggal Lahir</span>
                <span className="col-span-1 text-center">:</span>
                <span className="col-span-7 text-slate-800">
                  {certData.tempatLahir}, {certData.tanggalLahir}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-4 text-slate-600">Nomor Induk Siswa Nasional (NISN)</span>
                <span className="col-span-1 text-center">:</span>
                <span className="col-span-7 font-mono font-bold text-slate-900">
                  {certData.nisn}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-4 text-slate-600">Nomor Sertifikat SHTKA</span>
                <span className="col-span-1 text-center">:</span>
                <span className="col-span-7 font-mono text-slate-800">
                  {certData.nomorSertifikat}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-4 text-slate-600">Sekolah Asal &amp; NPSN</span>
                <span className="col-span-1 text-center">:</span>
                <span className="col-span-7 text-slate-800">
                  {certData.sekolahAsal} (NPSN: {certData.npsnAsal})
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-4 text-slate-600">Sekolah Pelaksana TKA</span>
                <span className="col-span-1 text-center">:</span>
                <span className="col-span-7 text-slate-800">
                  {certData.sekolahPelaksana} (NPSN: {certData.npsnPelaksana})
                </span>
              </div>
            </div>

            {/* Grades Table (Scale 200 - 800 Bab X Kepmen 56/2026) */}
            <div className="border border-slate-300 rounded-lg overflow-hidden my-4 bg-white relative z-10 shadow-xs">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                    <th className="p-2.5 text-center w-12 border-r border-slate-200">No.</th>
                    <th className="p-2.5 text-left border-r border-slate-200">Mata Pelajaran yang Diujikan</th>
                    <th className="p-2.5 text-center w-28 border-r border-slate-200">
                      Nilai TKA <br/>
                      <span className="text-[10px] font-normal text-slate-500">(Skala 200 - 800)</span>
                    </th>
                    <th className="p-2.5 text-center w-36">Kategori Capaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {/* Wajib */}
                  <tr>
                    <td className="p-2 text-center font-bold border-r border-slate-200">1</td>
                    <td className="p-2 font-medium border-r border-slate-200">Bahasa Indonesia (Hari I)</td>
                    <td className="p-2 text-center font-bold border-r border-slate-200 text-slate-900 font-mono">
                      {certData.nilai.bahasaIndonesia.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="p-2 text-center font-semibold text-emerald-800">{certData.nilai.kategoriBIndo}</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-center font-bold border-r border-slate-200">2</td>
                    <td className="p-2 font-medium border-r border-slate-200">Bahasa Inggris (Hari II)</td>
                    <td className="p-2 text-center font-bold border-r border-slate-200 text-slate-900 font-mono">
                      {certData.nilai.bahasaInggris.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="p-2 text-center font-semibold text-emerald-800">{certData.nilai.kategoriBInggris}</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-center font-bold border-r border-slate-200">3</td>
                    <td className="p-2 font-medium border-r border-slate-200">Matematika (Hari III)</td>
                    <td className="p-2 text-center font-bold border-r border-slate-200 text-slate-900 font-mono">
                      {certData.nilai.matematika.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="p-2 text-center font-semibold text-emerald-800">{certData.nilai.kategoriMatematika}</td>
                  </tr>
                  
                  {/* Header Pilihan */}
                  <tr className="bg-slate-50 font-bold text-slate-700 italic">
                    <td colSpan={4} className="p-1.5 px-4 text-[11px]">
                      Mata Pelajaran Pilihan Hari IV (Sesuai Pilihan Program Studi Murid):
                    </td>
                  </tr>

                  {/* Pilihan 1 & 2 */}
                  <tr>
                    <td className="p-2 text-center font-bold border-r border-slate-200">4</td>
                    <td className="p-2 font-medium border-r border-slate-200">{certData.nilai.mapelPilihan1.nama}</td>
                    <td className="p-2 text-center font-bold border-r border-slate-200 text-slate-900 font-mono">
                      {certData.nilai.mapelPilihan1.nilai.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="p-2 text-center font-semibold text-emerald-800">{certData.nilai.mapelPilihan1.kategori}</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-center font-bold border-r border-slate-200">5</td>
                    <td className="p-2 font-medium border-r border-slate-200">{certData.nilai.mapelPilihan2.nama}</td>
                    <td className="p-2 text-center font-bold border-r border-slate-200 text-slate-900 font-mono">
                      {certData.nilai.mapelPilihan2.nilai.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="p-2 text-center font-semibold text-emerald-800">{certData.nilai.mapelPilihan2.kategori}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Asesmen Nasional Integrated Section */}
            {certData.asesmenNasional && (
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs space-y-1 my-3 relative z-10">
                <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider block">
                  Hasil Capaian Asesmen Nasional (AN) Terintegrasi
                </span>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-white p-1.5 rounded border border-blue-100">
                    <span className="text-[10px] text-slate-500 block">Literasi Membaca</span>
                    <strong className="text-blue-900">{certData.asesmenNasional.literasiMembaca}</strong>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-blue-100">
                    <span className="text-[10px] text-slate-500 block">Numerasi</span>
                    <strong className="text-blue-900">{certData.asesmenNasional.numerasi}</strong>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-blue-100">
                    <span className="text-[10px] text-slate-500 block">Survei Karakter</span>
                    <strong className="text-blue-900">{certData.asesmenNasional.surveiKarakter}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Footer & QR Code Verification */}
            <div className="pt-4 flex flex-col sm:flex-row items-end justify-between gap-4 text-xs relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 bg-white p-1 rounded-lg border border-slate-300 flex items-center justify-center shadow-xs">
                  <div className="w-full h-full bg-slate-900 rounded flex flex-col items-center justify-center text-white text-[8px] font-mono text-center p-1">
                    <QrCode className="w-10 h-10 text-white" />
                    <span>VERIFIKASI</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 max-w-[200px] leading-tight">
                  <span className="font-bold text-slate-700 block">Validasi Digital Kemendikdasmen</span>
                  Sertifikat ini sah dan diterbitkan secara elektronik oleh BSKAP sesuai UU ITE No. 11/2008 Pasal 5.
                </div>
              </div>

              <div className="text-center sm:text-right text-xs">
                <p className="text-slate-600">Diterbitkan pada tanggal {certData.tanggalTerbit}</p>
                <p className="text-slate-700 font-semibold mt-0.5">Kepala Satuan Pendidikan Pelaksana,</p>
                <div className="h-16 flex items-center justify-end">
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> TTE Tersertifikasi BSrE
                  </span>
                </div>
                <p className="font-bold text-slate-900 underline">Dra. Hj. Nurul Hidayati, M.Pd.</p>
                <p className="text-[11px] text-slate-500">NIP. 197103181997022001</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
