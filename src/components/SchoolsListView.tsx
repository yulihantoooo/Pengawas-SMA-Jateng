import React, { useState } from 'react';
import { School, SchoolStatus, Accreditation } from '../types/tka';
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  FileCheck2, 
  AlertTriangle, 
  Wifi, 
  Zap, 
  User, 
  Phone, 
  CheckCircle,
  X
} from 'lucide-react';

import { JATENG_CABANG_DINAS, CABANG_DINAS_DATA } from '../data/mockData';

interface SchoolsListViewProps {
  schools: School[];
  onSelectSchoolForKka: (school: School) => void;
  onAddSchool: (newSchool: School) => void;
}

export const SchoolsListView: React.FC<SchoolsListViewProps> = ({
  schools,
  onSelectSchoolForKka,
  onAddSchool
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKabKota, setFilterKabKota] = useState('Semua');
  const [filterCabdin, setFilterCabdin] = useState('Semua');
  const [filterStatusSekolah, setFilterStatusSekolah] = useState('Semua');
  const [filterStatusPelaksanaan, setFilterStatusPelaksanaan] = useState('Semua');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding new school
  const [nama, setNama] = useState('');
  const [npsn, setNpsn] = useState('');
  const [kabKota, setKabKota] = useState('Kota Semarang');
  const [cabangDinas, setCabangDinas] = useState(CABANG_DINAS_DATA[0].label);
  const [statusSekolah, setStatusSekolah] = useState<'Negeri' | 'Swasta'>('Negeri');
  const [statusPelaksanaan, setStatusPelaksanaan] = useState<SchoolStatus>('Mandiri');
  const [akreditasi, setAkreditasi] = useState<Accreditation>('A');
  const [kepalaSekolah, setKepalaSekolah] = useState('');
  const [proktorUtama, setProktorUtama] = useState('');
  const [teknisi, setTeknisi] = useState('');
  const [kontakProktor, setKontakProktor] = useState('');
  const [jumlahPesertaKelas12, setJumlahPesertaKelas12] = useState<number>(200);
  const [jumlahRuangUjian, setJumlahRuangUjian] = useState<number>(3);
  const [jumlahKomputerUtama, setJumlahKomputerUtama] = useState<number>(70);
  const [bandwidthMbps, setBandwidthMbps] = useState<number>(100);
  const [sumberListrikUtama, setSumberListrikUtama] = useState<'PLN' | 'PLN + Genset' | 'PLN + Genset + UPS'>('PLN + Genset + UPS');
  const [modelPelaksanaan, setModelPelaksanaan] = useState<'Semi-Online CBT' | 'Full-Online CBT'>('Semi-Online CBT');

  const filteredSchools = schools.filter(s => {
    const matchSearch = s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.npsn.includes(searchTerm) ||
                        s.kepalaSekolah.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKab = filterKabKota === 'Semua' || s.kabKota === filterKabKota;
    const matchCabdin = filterCabdin === 'Semua' || s.cabangDinas === filterCabdin || s.cabangDinas.includes(filterCabdin);
    const matchStatusSekolah = filterStatusSekolah === 'Semua' || s.statusSekolah === filterStatusSekolah;
    const matchStatusLaksana = filterStatusPelaksanaan === 'Semua' || s.statusPelaksanaan === filterStatusPelaksanaan;
    return matchSearch && matchKab && matchCabdin && matchStatusSekolah && matchStatusLaksana;
  });

  const kabKotaList = ['Semua', ...Array.from(new Set(schools.map(s => s.kabKota))).sort()];
  const cabdinList = ['Semua', ...CABANG_DINAS_DATA.map(c => c.label)];

  const handleCreateSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !npsn) return;

    const newSchool: School = {
      id: `sch-${Date.now()}`,
      npsn,
      nama,
      kabKota,
      cabangDinas,
      provinsi: 'Jawa Tengah',
      statusSekolah,
      statusPelaksanaan,
      akreditasi,
      kepalaSekolah: kepalaSekolah || 'Kepala Sekolah',
      proktorUtama: proktorUtama || 'Proktor Sekolah',
      teknisi: teknisi || 'Teknisi Jaringan',
      kontakProktor: kontakProktor || '0812-xxxx-xxxx',
      jumlahPesertaKelas12: Number(jumlahPesertaKelas12) || 100,
      jumlahRuangUjian: Number(jumlahRuangUjian) || 2,
      jumlahKomputerUtama: Number(jumlahKomputerUtama) || 40,
      jumlahKomputerCadangan: Math.ceil((Number(jumlahKomputerUtama) || 40) * 0.1),
      bandwidthMbps: Number(bandwidthMbps) || 50,
      sumberListrikUtama,
      modelPelaksanaan,
      skorKesiapan: 88,
      gradeKesiapan: 'B',
      predikatKka: 'Baik',
      terakhirDievaluasi: new Date().toISOString().split('T')[0],
      sesiHariIni: {
        sesi1: 'Belum Mulai',
        sesi2: 'Belum Mulai',
        sesi3: 'Belum Mulai',
        sesi4: 'Belum Mulai'
      }
    };

    onAddSchool(newSchool);
    setShowAddModal(false);
    // Reset basic form
    setNama('');
    setNpsn('');
    setKepalaSekolah('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Filters */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              DINAS PENDIDIKAN & KEBUDAYAAN PROVINSI JAWA TENGAH
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              oleh PENGAWAS SMA JATENG
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Direktori SMA Negeri & Swasta Pelaksana TKA
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Data pemantauan SMA Negeri dan Swasta di 13 Cabang Dinas Pendidikan Jawa Tengah oleh <strong>PENGAWAS SMA JATENG</strong>.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Daftarkan SMA Baru (Jateng)
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3 text-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama SMA, NPSN, atau Kepala Sekolah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="text-slate-500 font-medium">
            Ditemukan: <strong className="text-slate-900">{filteredSchools.length}</strong> SMA di Jawa Tengah
          </div>
        </div>

        {/* Filter Pills / Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Status:</span>
            <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {['Semua', 'Negeri', 'Swasta'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatusSekolah(st)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                    filterStatusSekolah === st
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st === 'Semua' ? 'Semua SMA' : `SMA ${st}`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Cabang Dinas:</span>
            <select
              value={filterCabdin}
              onChange={(e) => setFilterCabdin(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 font-medium text-slate-800 outline-none max-w-xs truncate"
            >
              {cabdinList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Kab/Kota:</span>
            <select
              value={filterKabKota}
              onChange={(e) => setFilterKabKota(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 font-medium text-slate-800 outline-none"
            >
              {kabKotaList.map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Pelaksanaan:</span>
            <select
              value={filterStatusPelaksanaan}
              onChange={(e) => setFilterStatusPelaksanaan(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 font-medium text-slate-800 outline-none"
            >
              <option value="Semua">Semua Moda</option>
              <option value="Mandiri">Mandiri</option>
              <option value="Mandiri Ditumpangi">Mandiri Ditumpangi</option>
              <option value="Menginduk">Menginduk</option>
            </select>
          </div>
        </div>

        {/* Wilayah 1 s.d. 12 Quick Selector Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-slate-100 text-[11px]">
          <span className="text-slate-500 font-semibold shrink-0">Cabdin Wilayah (1 s.d. 12):</span>
          <button
            onClick={() => setFilterCabdin('Semua')}
            className={`px-2.5 py-1 rounded-md font-semibold transition shrink-0 ${
              filterCabdin === 'Semua' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua Wilayah
          </button>
          {CABANG_DINAS_DATA.map(cd => (
            <button
              key={cd.id}
              onClick={() => setFilterCabdin(cd.label)}
              className={`px-2 py-1 rounded-md font-semibold transition shrink-0 border ${
                filterCabdin === cd.label || filterCabdin.includes(cd.nama)
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title={cd.label}
            >
              Wilayah {cd.wilayahRomawi}
            </button>
          ))}
        </div>
      </div>

      {/* School Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden"
          >
            {/* Card Header */}
            <div className="p-5 border-b border-slate-100 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1 ${
                    school.statusSekolah === 'Negeri'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-purple-100 text-purple-800 border border-purple-200'
                  }`}>
                    SMA {school.statusSekolah}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {school.nama}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    NPSN: <span className="font-mono text-slate-700">{school.npsn}</span> • {school.kabKota}
                  </p>
                </div>

                <div className="text-right">
                  <span className={`inline-block text-xs font-black px-2 py-1 rounded-lg ${
                    school.gradeKesiapan === 'A' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    school.gradeKesiapan === 'B' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                    'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {school.skorKesiapan || 80}% (Grade {school.gradeKesiapan || 'B'})
                  </span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {school.statusPelaksanaan}
                </span>
                <span className="text-slate-500 font-medium text-[11px]">
                  Akreditasi {school.akreditasi} • {school.modelPelaksanaan}
                </span>
              </div>
            </div>

            {/* Card Body: Specs & Infrastructure */}
            <div className="p-5 space-y-3 text-xs bg-slate-50/40 flex-1">
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Peserta Didik</span>
                  <strong className="text-slate-900 text-sm font-extrabold">{school.jumlahPesertaKelas12}</strong>
                  <span className="text-[11px] text-slate-500 block">Murid Kelas XII</span>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Ruang CBT</span>
                  <strong className="text-slate-900 text-sm font-extrabold">{school.jumlahRuangUjian} Ruang</strong>
                  <span className="text-[11px] text-slate-500 block">{school.jumlahKomputerUtama} PC Utama</span>
                </div>
              </div>

              {/* Power & Network */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" /> Sumber Daya Listrik:
                  </span>
                  <strong className="text-slate-800">{school.sumberListrikUtama}</strong>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-blue-500" /> Kapasitas Bandwidth:
                  </span>
                  <strong className="text-slate-800">{school.bandwidthMbps} Mbps Dedicated</strong>
                </div>
              </div>

              {/* Officials */}
              <div className="pt-2 border-t border-slate-200/60 space-y-1 text-[11px] text-slate-500">
                <div>Kepsek: <strong className="text-slate-700">{school.kepalaSekolah}</strong></div>
                <div>Proktor: <strong className="text-slate-700">{school.proktorUtama}</strong> ({school.kontakProktor})</div>
              </div>
            </div>

            {/* Card Footer: Action */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-400">
                Dievaluasi: {school.terakhirDievaluasi || 'Belum'}
              </span>
              <button
                onClick={() => onSelectSchoolForKka(school)}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition"
              >
                <FileCheck2 className="w-3.5 h-3.5" /> Isi KKA Monev
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add School Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Daftarkan Satuan Pendidikan SMA Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSchool} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama SMA Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: SMA Negeri 5 Cemerlang"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">NPSN (8 Digit) *</label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    placeholder="Contoh: 20108899"
                    value={npsn}
                    onChange={(e) => setNpsn(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kabupaten / Kota di Jawa Tengah</label>
                  <input
                    type="text"
                    placeholder="Contoh: Kota Semarang, Kab. Banyumas..."
                    value={kabKota}
                    onChange={(e) => setKabKota(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Cabang Dinas Pendidikan Wilayah</label>
                  <select
                    value={cabangDinas}
                    onChange={(e) => setCabangDinas(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium"
                  >
                    {JATENG_CABANG_DINAS.filter(c => c !== 'Semua Cabang Dinas').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Status Satdik & Akreditasi</label>
                  <div className="flex gap-2">
                    <select
                      value={statusSekolah}
                      onChange={(e) => setStatusSekolah(e.target.value as any)}
                      className="w-1/2 bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                    >
                      <option value="Negeri">Negeri</option>
                      <option value="Swasta">Swasta</option>
                    </select>
                    <select
                      value={akreditasi}
                      onChange={(e) => setAkreditasi(e.target.value as any)}
                      className="w-1/2 bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                    >
                      <option value="A">Akreditasi A</option>
                      <option value="B">Akreditasi B</option>
                      <option value="C">Akreditasi C</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Status Penyelenggaraan TKA</label>
                  <select
                    value={statusPelaksanaan}
                    onChange={(e) => setStatusPelaksanaan(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium"
                  >
                    <option value="Mandiri">Mandiri</option>
                    <option value="Mandiri Ditumpangi">Mandiri Ditumpangi</option>
                    <option value="Menginduk">Menginduk (Belum Terakreditasi/Sarpras Terbatas)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Model Pelaksanaan CBT</label>
                  <select
                    value={modelPelaksanaan}
                    onChange={(e) => setModelPelaksanaan(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  >
                    <option value="Semi-Online CBT">Semi-Online CBT (Server Lokal)</option>
                    <option value="Full-Online CBT">Full-Online CBT (Cloud Server)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Jumlah Peserta Kelas XII</label>
                  <input
                    type="number"
                    min={1}
                    value={jumlahPesertaKelas12}
                    onChange={(e) => setJumlahPesertaKelas12(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Jumlah PC Utama & Ruang</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="PC Utama"
                      value={jumlahKomputerUtama}
                      onChange={(e) => setJumlahKomputerUtama(Number(e.target.value))}
                      className="w-1/2 bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                    />
                    <input
                      type="number"
                      placeholder="Ruang"
                      value={jumlahRuangUjian}
                      onChange={(e) => setJumlahRuangUjian(Number(e.target.value))}
                      className="w-1/2 bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kapasitas Bandwidth (Mbps)</label>
                  <input
                    type="number"
                    value={bandwidthMbps}
                    onChange={(e) => setBandwidthMbps(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Cadangan Daya Listrik</label>
                  <select
                    value={sumberListrikUtama}
                    onChange={(e) => setSumberListrikUtama(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  >
                    <option value="PLN + Genset + UPS">PLN + Genset + UPS (Sangat Direkomendasikan)</option>
                    <option value="PLN + Genset">PLN + Genset</option>
                    <option value="PLN">Hanya PLN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Kepala Sekolah</label>
                  <input
                    type="text"
                    placeholder="Nama beserta gelar"
                    value={kepalaSekolah}
                    onChange={(e) => setKepalaSekolah(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Proktor Utama & No. Kontak</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nama Proktor"
                      value={proktorUtama}
                      onChange={(e) => setProktorUtama(e.target.value)}
                      className="w-1/2 bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                    />
                    <input
                      type="text"
                      placeholder="0812-xxxx"
                      value={kontakProktor}
                      onChange={(e) => setKontakProktor(e.target.value)}
                      className="w-1/2 bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm"
                >
                  Simpan Satuan Pendidikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
