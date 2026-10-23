import React, { useState, useEffect } from 'react';
import { School, KkaItem, MonevEvaluation, KkaTahap } from '../types/tka';
import { OFFICIAL_KKA_CHECKLIST, CABANG_DINAS_DATA } from '../data/mockData';
import confetti from 'canvas-confetti';
import { 
  ClipboardCheck, 
  CheckCircle, 
  AlertCircle, 
  Printer, 
  Save, 
  HelpCircle, 
  Sparkles, 
  Info,
  Calendar,
  UserCheck,
  Shield,
  FileSpreadsheet,
  Check,
  Building,
  Filter
} from 'lucide-react';

interface KkaFormViewProps {
  schools: School[];
  selectedSchoolId?: string;
  onSaveEvaluation: (evaluation: MonevEvaluation, updatedSchool: School) => void;
  onViewReport?: (evaluation: MonevEvaluation) => void;
}

export const KkaFormView: React.FC<KkaFormViewProps> = ({
  schools,
  selectedSchoolId,
  onSaveEvaluation,
  onViewReport
}) => {
  const [activeSchoolId, setActiveSchoolId] = useState<string>(
    selectedSchoolId || (schools.length > 0 ? schools[0].id : '')
  );

  const activeSchool = schools.find(s => s.id === activeSchoolId) || schools[0];

  // Identitas & Jadwal Monitoring sesuai dokumen
  const [cabangDinas, setCabangDinas] = useState<string>(activeSchool?.cabangDinas || 'Cabang Dinas Wilayah I (Kota & Kab. Semarang)');
  const [tglPersiapan, setTglPersiapan] = useState<string>('15 Oktober 2026');
  const [tglPelaksanaan, setTglPelaksanaan] = useState<string>('20 - 22 Oktober 2026');
  const [tglPasca, setTglPasca] = useState<string>('23 Oktober 2026');

  // Petugas Monev & Kepsek
  const [petugasNama, setPetugasNama] = useState<string>('Drs. H. Mulyadi, M.Pd.');
  const [petugasNip, setPetugasNip] = useState<string>('196805141994121002');
  const [kotaTandaTangan, setKotaTandaTangan] = useState<string>('Semarang');
  const [tglTandaTangan, setTglTandaTangan] = useState<string>('22 Oktober 2026');

  // Filter tampilan tahap
  const [filterTahap, setFilterTahap] = useState<string>('Semua');

  // Update cabang dinas saat sekolah berubah
  useEffect(() => {
    if (activeSchool?.cabangDinas) {
      setCabangDinas(activeSchool.cabangDinas);
    }
  }, [activeSchoolId]);

  // Inisialisasi 38 Indikator Kunci dari Dokumen PDF Resmi
  const [items, setItems] = useState<KkaItem[]>(() => {
    return OFFICIAL_KKA_CHECKLIST.map((item, idx) => ({
      ...item,
      // Default realistis: sebagian besar 2, beberapa 1 untuk simulasi dinamis
      skorInput: idx === 1 || idx === 16 || idx === 32 ? 1 : 2,
      catatan: ''
    }));
  });

  // Halaman 5 Dokumen: Form Analisis Ketidaksesuaian & Rekomendasi
  const [temuan, setTemuan] = useState<string>(
    'Ditemukan fluktuasi pasokan daya PLN pada ruang Lab Komputer 2 saat Sesi 1 dan perlunya peremajaan baterai UPS cadangan.'
  );
  const [penyebab, setPenyebab] = useState<string>(
    'Beban puncak jaringan listrik lokal meningkat dan pemeliharaan berkala UPS belum terjadwal sebelum gladi bersih.'
  );
  const [dampak, setDampak] = useState<string>(
    'Komputer proktor sempat beralih ke stabilizer namun tidak sampai mematikan sesi ujian. Sesi tetap tuntas sesuai jadwal.'
  );
  const [rekomendasi, setRekomendasi] = useState<string>(
    '1. Satuan pendidikan segera melakukan uji beban genset dan penggantian aki UPS pada ruang server.\n2. Mengoptimalkan koordinasi berkala dengan PLN Unit Pelaksana Pelayanan Pelanggan setempat selama masa TKA.'
  );

  // Sync saat ada pergantian sekolah dari luar
  useEffect(() => {
    if (selectedSchoolId) {
      setActiveSchoolId(selectedSchoolId);
    }
  }, [selectedSchoolId]);

  // Perhitungan Skor Resmi Dokumen:
  // Skor per butir: 0, 1, 2
  // Skor Maksimal = 38 butir * 2 = 76
  // Nilai Akhir (Skala 100) = (Skor Total / 76) * 100
  const skorTotal = items.reduce((acc, curr) => acc + curr.skorInput, 0);
  const nilaiAkhir = Number(((skorTotal / 76) * 100).toFixed(2));

  const getPredikat = (nilai: number): 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang' => {
    if (nilai >= 85) return 'Sangat Baik';
    if (nilai >= 70) return 'Baik';
    if (nilai >= 55) return 'Cukup';
    return 'Kurang';
  };

  const predikat = getPredikat(nilaiAkhir);

  const handleScoreChange = (no: number, val: 0 | 1 | 2) => {
    setItems(prev => prev.map(item => 
      item.no === no ? { ...item, skorInput: val } : item
    ));
  };

  const handleCatatanChange = (no: number, note: string) => {
    setItems(prev => prev.map(item => 
      item.no === no ? { ...item, catatan: note } : item
    ));
  };

  const handleQuickFill = (mode: 'perfect' | 'standard' | 'reset') => {
    setItems(prev => prev.map((item, idx) => ({
      ...item,
      skorInput: mode === 'perfect' ? 2 : mode === 'reset' ? 0 : (idx % 7 === 0 ? 1 : 2)
    })));
  };

  const handleSave = () => {
    const evaluation: MonevEvaluation = {
      id: `eval-${Date.now()}`,
      schoolId: activeSchool.id,
      schoolName: activeSchool.nama,
      npsn: activeSchool.npsn,
      kabKota: activeSchool.kabKota,
      cabangDinas,
      tanggalMonev: {
        persiapan: tglPersiapan,
        pelaksanaan: tglPelaksanaan,
        pascaPelaksanaan: tglPasca
      },
      namaPetugasMonev: petugasNama,
      nipPetugas: petugasNip,
      jabatanPetugas: 'Pengawas Sekolah Pembina / Tim Monev TKA',
      items,
      skorTotal,
      nilai: nilaiAkhir,
      predikat,
      temuanKetidaksesuaian: temuan,
      penyebabKetidaksesuaian: penyebab,
      dampakPelaksanaan: dampak,
      rekomendasiTindakLanjut: rekomendasi,
      namaKepalaSekolah: activeSchool.kepalaSekolah,
      nipKepalaSekolah: '197103181997022001'
    };

    const updatedSchool: School = {
      ...activeSchool,
      skorKesiapan: Math.round(nilaiAkhir),
      gradeKesiapan: nilaiAkhir >= 90 ? 'A' : nilaiAkhir >= 80 ? 'B' : nilaiAkhir >= 70 ? 'C' : 'D',
      predikatKka: predikat,
      terakhirDievaluasi: tglPelaksanaan.split('-')[0].trim() || '2026-10-22'
    };

    onSaveEvaluation(evaluation, updatedSchool);

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const filteredItems = items.filter(it => 
    filterTahap === 'Semua' ? true : it.tahap === filterTahap
  );

  return (
    <div className="space-y-6">
      {/* Top Action & Status Card */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" />
              INSTRUMEN RESMI TAHUN 2026 (38 INDIKATOR KUNCI)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              oleh PENGAWAS SMA JATENG
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Instrumen Monitoring & Evaluasi Keterlaksanaan TKA oleh PENGAWAS SMA JATENG
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Format resmi evaluasi 3 Tahapan: <strong>Tahap Persiapan</strong>, <strong>Tahap Pelaksanaan</strong>, dan <strong>Tahap Pasca-Pelaksanaan</strong> yang dilaksanakan langsung oleh <strong>Pengawas SMA Provinsi Jawa Tengah</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Fills */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => handleQuickFill('perfect')}
              className="px-2 py-1 text-slate-700 hover:bg-white rounded transition text-[11px] font-medium"
              title="Isi semua skor dengan 2 (Lengkap)"
            >
              Semua Lengkap (2)
            </button>
            <button
              onClick={() => handleQuickFill('standard')}
              className="px-2 py-1 text-slate-700 hover:bg-white rounded transition text-[11px] font-medium"
              title="Isi kombinasi realistis"
            >
              Realistis
            </button>
            <button
              onClick={() => handleQuickFill('reset')}
              className="px-2 py-1 text-rose-700 hover:bg-white rounded transition text-[11px] font-medium"
              title="Reset ke 0"
            >
              Reset (0)
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-300 transition"
          >
            <Printer className="w-4 h-4" /> Cetak Instrumen Fisik
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <Save className="w-4 h-4" /> Simpan Hasil Monev
          </button>
        </div>
      </div>

      {/* Identitas Satuan Pendidikan & Skor Ringkas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:hidden">
        {/* Identitas Sekolah */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              Identitas Satuan Pendidikan yang Dimonev
            </h3>
            <span className="text-xs text-slate-500">Pilih SMA yang dievaluasi:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Nama Satuan Pendidikan:</label>
              <select
                value={activeSchoolId}
                onChange={(e) => setActiveSchoolId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900 focus:bg-white outline-none"
              >
                {schools.map(s => (
                  <option key={s.id} value={s.id}>{s.nama} ({s.statusPelaksanaan})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">NPSN & Kabupaten/Kota:</label>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium">
                {activeSchool.npsn} • {activeSchool.kabKota}
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Cabang Dinas Pendidikan Wilayah:</label>
              <select
                value={cabangDinas}
                onChange={(e) => setCabangDinas(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-800 font-medium outline-none truncate"
              >
                {CABANG_DINAS_DATA.map(cd => (
                  <option key={cd.id} value={cd.label}>{cd.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Kepala Sekolah:</label>
              <input
                type="text"
                value={activeSchool.kepalaSekolah}
                readOnly
                className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-700"
              />
            </div>

            <div className="sm:col-span-2 bg-amber-50/70 p-3 rounded-xl border border-amber-300">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-amber-800" />
                  Petugas Monev (Pengawas SMA Jateng)
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded border border-amber-300">
                  oleh PENGAWAS SMA JATENG
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-600 font-medium mb-0.5">Nama Pengawas SMA:</label>
                  <input
                    type="text"
                    value={petugasNama}
                    onChange={(e) => setPetugasNama(e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-lg p-1.5 text-xs text-slate-800 font-semibold outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-600 font-medium mb-0.5">NIP Pengawas SMA:</label>
                  <input
                    type="text"
                    value={petugasNip}
                    onChange={(e) => setPetugasNip(e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-lg p-1.5 text-xs text-slate-800 font-semibold outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tanggal 3 Tahapan */}
          <div className="pt-2 border-t border-slate-100">
            <span className="block text-[11px] font-bold text-slate-600 uppercase mb-2">
              Jadwal Tanggal Monitoring:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 block">1. Tahap Persiapan:</span>
                <input
                  type="text"
                  value={tglPersiapan}
                  onChange={(e) => setTglPersiapan(e.target.value)}
                  className="w-full bg-transparent font-medium text-slate-800 outline-none"
                />
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 block">2. Tahap Pelaksanaan:</span>
                <input
                  type="text"
                  value={tglPelaksanaan}
                  onChange={(e) => setTglPelaksanaan(e.target.value)}
                  className="w-full bg-transparent font-medium text-slate-800 outline-none"
                />
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 block">3. Pasca Pelaksanaan:</span>
                <input
                  type="text"
                  value={tglPasca}
                  onChange={(e) => setTglPasca(e.target.value)}
                  className="w-full bg-transparent font-medium text-slate-800 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Score Widget (Halaman 5 PDF) */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-xl p-5 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">
                Rekapitulasi Nilai Instrumen
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                predikat === 'Sangat Baik' ? 'bg-emerald-500 text-white' :
                predikat === 'Baik' ? 'bg-blue-500 text-white' :
                predikat === 'Cukup' ? 'bg-amber-500 text-white' :
                'bg-rose-500 text-white'
              }`}>
                {predikat}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] uppercase text-slate-300 block">Skor Total</span>
                <span className="text-3xl font-black">{skorTotal}</span>
                <span className="text-[10px] text-slate-400 block">dari maks 76</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] uppercase text-slate-300 block">Nilai Akhir</span>
                <span className="text-3xl font-black text-amber-300">{nilaiAkhir}</span>
                <span className="text-[10px] text-slate-400 block">Skala 100</span>
              </div>
            </div>

            <div className="mt-3 text-center text-xs text-slate-300">
              Predikat: <strong className="text-white">{predikat}</strong>
              <div className="text-[10px] text-slate-400 mt-1">
                *) Rumus: (Skor Total / 76) × 100
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            Beri tanda centang (v) pada skor 0, 1, atau 2 untuk tiap indikator.
          </div>
        </div>
      </div>

      {/* Filter Tabs on Screen */}
      <div className="flex items-center justify-between gap-2 print:hidden bg-white p-3 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600 font-semibold mr-1">Filter Tahap:</span>
          {['Semua', 'TAHAP PERSIAPAN', 'TAHAPAN PELAKSANAAN', 'TAHAP PASCA-PELAKSANAAN'].map((tahap) => (
            <button
              key={tahap}
              onClick={() => setFilterTahap(tahap)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                filterTahap === tahap
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tahap === 'TAHAP PERSIAPAN' ? 'A. Persiapan (22)' :
               tahap === 'TAHAPAN PELAKSANAAN' ? 'B. Pelaksanaan (13)' :
               tahap === 'TAHAP PASCA-PELAKSANAAN' ? 'C. Pasca (3)' : 'Semua (38 Butir)'}
            </button>
          ))}
        </div>
        <span className="text-slate-500 font-medium">
          Menampilkan {filteredItems.length} Indikator Kunci
        </span>
      </div>

      {/* ================= OFFICIAL KKA TABLE (MATCHES PDF EXACTLY) ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden print:border-none print:shadow-none">
        {/* Printable Header */}
        <div className="p-6 md:p-8 border-b border-slate-200 bg-slate-50/70 text-center space-y-1">
          <h2 className="font-black text-lg md:text-xl text-slate-900 uppercase tracking-tight">
            INSTRUMEN MONITORING DAN EVALUASI KETERLAKSANAAN TKA
          </h2>
          <h3 className="font-extrabold text-sm md:text-base text-slate-800 uppercase tracking-wide">
            JENJANG SMA PROVINSI JAWA TENGAH TAHUN 2026
          </h3>
          <p className="text-xs md:text-sm font-black text-amber-700 uppercase tracking-wider pt-0.5">
            OLEH PENGAWAS SMA JATENG
          </p>
          <div className="pt-4 max-w-2xl mx-auto text-left text-xs grid grid-cols-12 gap-1 text-slate-800">
            <span className="col-span-4 font-semibold text-slate-600">Nama Sekolah</span>
            <span className="col-span-1 text-center">:</span>
            <span className="col-span-7 font-bold text-slate-900">{activeSchool.nama}</span>

            <span className="col-span-4 font-semibold text-slate-600">NPSN</span>
            <span className="col-span-1 text-center">:</span>
            <span className="col-span-7 font-mono font-medium">{activeSchool.npsn}</span>

            <span className="col-span-4 font-semibold text-slate-600">Kabupaten/Kota</span>
            <span className="col-span-1 text-center">:</span>
            <span className="col-span-7">{activeSchool.kabKota}</span>

            <span className="col-span-4 font-semibold text-slate-600">Cabang Dinas</span>
            <span className="col-span-1 text-center">:</span>
            <span className="col-span-7">{cabangDinas}</span>

            <span className="col-span-4 font-semibold text-slate-600">Petugas Monev</span>
            <span className="col-span-1 text-center">:</span>
            <span className="col-span-7 font-bold text-slate-900">{petugasNama} (PENGAWAS SMA JATENG)</span>

            <span className="col-span-4 font-semibold text-slate-600">Tanggal Monitoring</span>
            <span className="col-span-1 text-center">:</span>
            <div className="col-span-7 space-y-0.5">
              <div>1. Persiapan : {tglPersiapan}</div>
              <div>2. Pelaksanaan : {tglPelaksanaan}</div>
              <div>3. Pasca Pelaksanaan : {tglPasca}</div>
            </div>
          </div>
        </div>

        {/* The 38 Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-200 text-slate-800 font-bold border-b border-slate-300">
                <th className="p-2.5 text-center w-12 border-r border-slate-300">No.</th>
                <th className="p-2.5 border-r border-slate-300 min-w-[280px]">Indikator Kunci</th>
                <th className="p-2 text-center border-r border-slate-300 w-28">
                  <div>Skor*)</div>
                  <div className="grid grid-cols-3 text-[11px] pt-1 border-t border-slate-300">
                    <span className="border-r border-slate-300">0</span>
                    <span className="border-r border-slate-300">1</span>
                    <span>2</span>
                  </div>
                </th>
                <th className="p-2.5 border-r border-slate-300 min-w-[220px]">Bukti Fisik</th>
                <th className="p-2.5 min-w-[180px]">Catatan Petugas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Grouping rows by Tahap */}
              {['TAHAP PERSIAPAN', 'TAHAPAN PELAKSANAAN', 'TAHAP PASCA-PELAKSANAAN'].map((tahapHeader) => {
                const stageItems = filteredItems.filter(it => it.tahap === tahapHeader);
                if (stageItems.length === 0) return null;

                const stageLetter = tahapHeader === 'TAHAP PERSIAPAN' ? 'A.' :
                                    tahapHeader === 'TAHAPAN PELAKSANAAN' ? 'B.' : 'C.';

                return (
                  <React.Fragment key={tahapHeader}>
                    {/* Tahap Header Row */}
                    <tr className="bg-emerald-50/80 font-black text-slate-900 border-y border-emerald-200">
                      <td className="p-2 text-center font-bold border-r border-slate-200">{stageLetter}</td>
                      <td colSpan={4} className="p-2 uppercase tracking-wide text-emerald-950 font-bold">
                        {tahapHeader}
                      </td>
                    </tr>

                    {/* Stage Items */}
                    {stageItems.map((item) => (
                      <tr key={item.no} className="hover:bg-slate-50/70 transition">
                        <td className="p-2.5 text-center font-bold text-slate-700 border-r border-slate-200 align-top">
                          {item.no}.
                        </td>

                        <td className="p-2.5 text-slate-900 leading-relaxed border-r border-slate-200 align-top">
                          {item.indikatorKunci}
                        </td>

                        {/* Interactive 0, 1, 2 Checkbox columns */}
                        <td className="p-1 border-r border-slate-200 align-middle">
                          <div className="grid grid-cols-3 h-full text-center">
                            {[0, 1, 2].map((val) => {
                              const isChecked = item.skorInput === val;
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => handleScoreChange(item.no, val as 0 | 1 | 2)}
                                  className={`py-2 flex items-center justify-center font-bold text-xs transition border-r last:border-r-0 border-slate-200 ${
                                    isChecked
                                      ? 'bg-emerald-600 text-white font-black'
                                      : 'hover:bg-slate-100 text-slate-400'
                                  }`}
                                  title={`Pilih Skor ${val}`}
                                >
                                  {isChecked ? 'v' : ''}
                                </button>
                              );
                            })}
                          </div>
                        </td>

                        <td className="p-2.5 text-slate-600 text-[11px] leading-relaxed border-r border-slate-200 align-top">
                          {item.buktiFisik}
                        </td>

                        <td className="p-2 align-top">
                          <input
                            type="text"
                            placeholder="Catatan verifikasi..."
                            value={item.catatan || ''}
                            onChange={(e) => handleCatatanChange(item.no, e.target.value)}
                            className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white text-xs p-1 outline-none text-slate-800"
                          />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}

              {/* Total Calculation Row (From PDF Halaman 4 & 5) */}
              <tr className="bg-amber-50 font-black text-slate-900 border-t-2 border-slate-300 text-xs">
                <td colSpan={2} className="p-3 text-right uppercase tracking-wider font-extrabold border-r border-slate-300">
                  Jumlah Skor & Rekapitulasi:
                </td>
                <td className="p-2 text-center font-black text-sm bg-amber-100 text-amber-950 border-r border-slate-300">
                  {skorTotal} <span className="text-[10px] font-normal text-slate-600">/ 76</span>
                </td>
                <td colSpan={2} className="p-2 text-slate-800">
                  Nilai Akhir: <strong className="text-base text-blue-900">{nilaiAkhir}</strong> | Predikat:{' '}
                  <span className={`px-2 py-0.5 rounded font-black text-white ${
                    predikat === 'Sangat Baik' ? 'bg-emerald-600' :
                    predikat === 'Baik' ? 'bg-blue-600' :
                    predikat === 'Cukup' ? 'bg-amber-600' : 'bg-rose-600'
                  }`}>
                    {predikat}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 italic">
          *) Beri tanda "v" pada pilihan yang sesuai (0 = Tidak/Belum Tersedia, 1 = Sebagian/Kurang Lengkap, 2 = Lengkap/Sesuai Pedoman).
        </div>

        {/* ================= HALAMAN 5 PDF: TEMUAN & REKOMENDASI ================= */}
        <div className="p-6 md:p-8 border-t border-slate-200 space-y-5 bg-white">
          <h4 className="font-bold text-sm text-slate-900 uppercase border-b border-slate-200 pb-2">
            Catatan Hasil Monitoring & Evaluasi (Halaman 5 Format Resmi)
          </h4>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Temuan Ketidaksesuaian TKA :
              </label>
              <textarea
                rows={2}
                value={temuan}
                onChange={(e) => setTemuan(e.target.value)}
                placeholder="Tuliskan temuan ketidaksesuaian jika ada..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Penyebab Terjadi Ketidaksesuaian :
              </label>
              <textarea
                rows={2}
                value={penyebab}
                onChange={(e) => setPenyebab(e.target.value)}
                placeholder="Faktor penyebab teknis/prosedural..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Dampak pada Pelaksanaan TKA :
              </label>
              <textarea
                rows={2}
                value={dampak}
                onChange={(e) => setDampak(e.target.value)}
                placeholder="Dampak terhadap kelancaran sesi dan peserta didik..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Rekomendasi dan Tindak Lanjut Perbaikan :
              </label>
              <textarea
                rows={3}
                value={rekomendasi}
                onChange={(e) => setRekomendasi(e.target.value)}
                placeholder="Rekomendasi perbaikan konkret yang harus ditindaklanjuti..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              />
            </div>
          </div>

          {/* Official Signatures (Matches PDF Halaman 5) */}
          <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <p className="text-slate-600">Mengetahui,</p>
              <p className="font-bold text-slate-900 mt-0.5">Kepala Sekolah</p>
              <div className="h-24 flex items-center justify-center italic text-slate-400">
                [Tanda Tangan & Cap Sekolah]
              </div>
              <p className="font-bold text-slate-900 underline">{activeSchool.kepalaSekolah}</p>
              <p className="text-[11px] text-slate-500">NIP. 197103181997022001</p>
            </div>

            <div>
              <p className="text-slate-600">
                {kotaTandaTangan}, {tglTandaTangan}
              </p>
              <p className="font-bold text-slate-900 mt-0.5">Pengawas Sekolah</p>
              <p className="text-[11px] font-bold text-amber-800">PENGAWAS SMA JATENG</p>
              <div className="h-20 flex items-center justify-center italic text-slate-400">
                [Tanda Tangan Pengawas]
              </div>
              <p className="font-bold text-slate-900 underline">{petugasNama}</p>
              <p className="text-[11px] text-slate-500">NIP. {petugasNip}</p>
              <p className="text-[10px] text-slate-600 font-semibold">Pengawas SMA Prov. Jawa Tengah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
