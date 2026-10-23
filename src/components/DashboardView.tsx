import React, { useState } from 'react';
import { School, IncidentReport, SesiStatus } from '../types/tka';
import { CABANG_DINAS_DATA, JATENG_CABANG_DINAS } from '../data/mockData';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowUpRight, 
  Wifi, 
  Zap, 
  Monitor, 
  FileCheck2, 
  Filter,
  PlusCircle,
  ExternalLink,
  MapPin,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';

interface DashboardViewProps {
  schools: School[];
  incidents: IncidentReport[];
  onSelectSchool: (school: School) => void;
  onNavigateTab: (tab: string) => void;
  onOpenNewIncident: () => void;
  onQuickResolveIncident: (incidentId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  schools,
  incidents,
  onSelectSchool,
  onNavigateTab,
  onOpenNewIncident,
  onQuickResolveIncident
}) => {
  const [filterKabKota, setFilterKabKota] = useState<string>('Semua');
  const [filterCabangDinas, setFilterCabangDinas] = useState<string>('Semua');
  const [filterStatusSekolah, setFilterStatusSekolah] = useState<string>('Semua');

  const filteredSchools = schools.filter(sch => {
    const matchKab = filterKabKota === 'Semua' ? true : sch.kabKota === filterKabKota;
    const matchCabdin = filterCabangDinas === 'Semua' 
      ? true 
      : sch.cabangDinas === filterCabangDinas || sch.cabangDinas.includes(filterCabangDinas);
    const matchStatus = filterStatusSekolah === 'Semua' ? true : sch.statusSekolah === filterStatusSekolah;
    return matchKab && matchCabdin && matchStatus;
  });

  const totalPeserta = filteredSchools.reduce((acc, curr) => acc + curr.jumlahPesertaKelas12, 0);
  const totalKomputer = filteredSchools.reduce((acc, curr) => acc + curr.jumlahKomputerUtama, 0);
  const avgKesiapan = Math.round(
    filteredSchools.reduce((acc, curr) => acc + (curr.skorKesiapan || 80), 0) / (filteredSchools.length || 1)
  );

  const negeriCount = filteredSchools.filter(s => s.statusSekolah === 'Negeri').length;
  const swastaCount = filteredSchools.filter(s => s.statusSekolah === 'Swasta').length;
  const mandiriCount = filteredSchools.filter(s => s.statusPelaksanaan.includes('Mandiri')).length;
  const mengindukCount = filteredSchools.filter(s => s.statusPelaksanaan === 'Menginduk').length;

  const openIncidents = incidents.filter(i => i.status !== 'Selesai Teratasi');

  const kabKotaList = ['Semua', ...Array.from(new Set(schools.map(s => s.kabKota))).sort()];
  const cabdinList = ['Semua', ...CABANG_DINAS_DATA.map(c => c.label)];

  const getStatusBadge = (status: SesiStatus) => {
    switch (status) {
      case 'Selesai':
        return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Selesai
        </span>;
      case 'Berlangsung':
        return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 animate-pulse">
          <Clock className="w-3 h-3 text-blue-500" /> Berlangsung
        </span>;
      case 'Terkendala':
        return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
          <AlertCircle className="w-3 h-3 text-rose-500" /> Terkendala
        </span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          Belum Mulai
        </span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome & Context Header */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border border-blue-800/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-300 via-indigo-400 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                DINAS PENDIDIKAN DAN KEBUDAYAAN PROVINSI JAWA TENGAH
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/25 text-amber-300 text-xs font-bold border border-amber-400/40">
                oleh PENGAWAS SMA JATENG
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
                Kepmendikdasmen No. 56 Tahun 2026 (TKA & AN Terpadu)
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Pusat Kendali Monev TKA SMA Jawa Tengah
              <span className="block text-base md:text-lg font-medium text-amber-300 mt-0.5">
                Instrumen Pemantauan &amp; Evaluasi oleh PENGAWAS SMA JATENG
              </span>
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Pemantauan terpadu kesiapan infrastruktur, 4 sesi ujian harian, rasio komputer 1:4, pengawasan silang daring oleh <strong>Penyelia Perguruan Tinggi Negeri (PTN)</strong>, dan survei Sulingjar untuk <strong>SMA Negeri &amp; Swasta</strong> di 13 Cabang Dinas Pendidikan se-Jawa Tengah oleh <strong>PENGAWAS SMA JATENG</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateTab('kka')}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-emerald-900/30 transition"
            >
              <FileCheck2 className="w-4 h-4" /> Buka Instrumen KKA (38 Butir)
            </button>
            <button
              onClick={onOpenNewIncident}
              className="flex items-center gap-2 bg-rose-600/90 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-rose-900/30 transition"
            >
              <PlusCircle className="w-4 h-4" /> Laporkan Kendala
            </button>
          </div>
        </div>

        {/* Sub-bar Filters for Jawa Tengah */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-300 font-medium">Status SMA:</span>
              <div className="flex gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
                {['Semua', 'Negeri', 'Swasta'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatusSekolah(st)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                      filterStatusSekolah === st
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {st === 'Semua' ? 'Semua SMA' : `SMA ${st}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-300 font-medium">Kab/Kota Jateng:</span>
              <select
                value={filterKabKota}
                onChange={(e) => setFilterKabKota(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs outline-none"
              >
                {kabKotaList.map(k => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-300 font-medium">Cabang Dinas:</span>
              <select
                value={filterCabangDinas}
                onChange={(e) => setFilterCabangDinas(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs outline-none max-w-xs truncate"
              >
                {cabdinList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-slate-300 text-xs">
            Menampilkan <strong className="text-emerald-400">{filteredSchools.length}</strong> SMA ({negeriCount} Negeri, {swastaCount} Swasta)
          </div>
        </div>

        {/* Quick Cabang Dinas Wilayah 1 s.d. 12 Selector Bar */}
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 overflow-x-auto text-[11px] pb-1">
          <span className="text-slate-400 font-semibold shrink-0 flex items-center gap-1">
            <Layers className="w-3 h-3 text-emerald-400" /> Cabdin Wilayah (1 s.d. 12):
          </span>
          <button
            onClick={() => setFilterCabangDinas('Semua')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition shrink-0 ${
              filterCabangDinas === 'Semua'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            Semua Wilayah
          </button>
          {CABANG_DINAS_DATA.map(cd => {
            const isSelected = filterCabangDinas === cd.label || filterCabangDinas.includes(cd.nama);
            return (
              <button
                key={cd.id}
                onClick={() => setFilterCabangDinas(cd.label)}
                className={`px-2 py-0.5 rounded text-[11px] transition shrink-0 border ${
                  isSelected
                    ? 'bg-emerald-400 text-slate-950 font-bold border-emerald-300 shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
                title={cd.label}
              >
                Wilayah {cd.wilayahRomawi}
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Sekolah */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Satuan Pendidikan</span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{filteredSchools.length}</span>
            <span className="text-xs text-slate-500">SMA</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center gap-2">
            <span className="text-emerald-700 font-semibold">{mandiriCount} Mandiri</span>
            <span>•</span>
            <span className="text-amber-700 font-semibold">{mengindukCount} Menginduk</span>
          </div>
        </div>

        {/* Card 2: Total Peserta */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Peserta TKA Kelas XII</span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalPeserta.toLocaleString('id-ID')}</span>
            <span className="text-xs text-slate-500">Murid Terdaftar</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center gap-1">
            <span className="text-emerald-600 font-medium">100% Terdaftar di Pusdatin Kemendikdasmen</span>
          </div>
        </div>

        {/* Card 3: Indeks Kesiapan Satdik (IKSP) */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rata-rata Skor KKA</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{avgKesiapan}%</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              {avgKesiapan >= 90 ? 'Grade A (Unggul)' : avgKesiapan >= 80 ? 'Grade B (Siap)' : 'Grade C'}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-600">
            Evaluasi 5 Dimensi Kesiapan & Kepatuhan
          </div>
        </div>

        {/* Card 4: Insiden Aktif */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kendala Lapangan</span>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              openIncidents.length > 0 ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'
            }`}>
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{openIncidents.length}</span>
            <span className="text-xs text-slate-500">Tiket Aktif</span>
          </div>
          <div className="mt-2 text-xs flex items-center justify-between">
            <span className={openIncidents.length > 0 ? 'text-rose-600 font-semibold' : 'text-emerald-600 font-medium'}>
              {openIncidents.length > 0 ? 'Perlu respon segera' : 'Semua sesi aman terkendali'}
            </span>
            <button
              onClick={() => onNavigateTab('incidents')}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-0.5"
            >
              Lihat <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Incident Alert Banner if any */}
      {openIncidents.length > 0 && (
        <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-rose-900 text-sm">
                  Peringatan Insiden Kritis: {openIncidents[0].kodeTiket} - {openIncidents[0].schoolName}
                </span>
                <span className="text-[10px] bg-rose-200 text-rose-800 font-bold px-1.5 py-0.5 rounded">
                  {openIncidents[0].tingkatKeparahan}
                </span>
              </div>
              <p className="text-rose-800 text-xs mt-0.5">
                {openIncidents[0].deskripsiMasalah} ({openIncidents[0].dampakSiswa} siswa terdampak pada Sesi {openIncidents[0].sesi}).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickResolveIncident(openIncidents[0].id)}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition"
            >
              Tandai Teratasi
            </button>
            <button
              onClick={() => onNavigateTab('incidents')}
              className="bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 text-xs px-3 py-1.5 rounded-lg font-semibold transition"
            >
              Buka Detail Helpdesk
            </button>
          </div>
        </div>
      )}

      {/* Dedicated Interactive 12 Cabang Dinas Grid */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-blue-100 text-blue-700">
                <MapPin className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-slate-900 text-base">
                Sebaran Kesiapan TKA 12 Cabang Dinas Pendidikan se-Jawa Tengah
              </h3>
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                Wilayah I s.d. XII (+ XIII)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Pantau kepatuhan sarpras PC 1:4, keterisian 4 sesi harian, dan rata-rata skor Instrumen KKA di masing-masing Cabang Dinas Pendidikan Jawa Tengah.
            </p>
          </div>

          {filterCabangDinas !== 'Semua' && (
            <button
              onClick={() => setFilterCabangDinas('Semua')}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg transition self-start sm:self-auto flex items-center gap-1"
            >
              Reset Filter Wilayah ({filterCabangDinas.split('(')[0].trim()})
            </button>
          )}
        </div>

        {/* 12 Cabang Dinas Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {CABANG_DINAS_DATA.map((cd) => {
            const cdSchools = schools.filter(s => s.cabangDinas === cd.label || s.cabangDinas.includes(cd.nama));
            const cdNegeri = cdSchools.filter(s => s.statusSekolah === 'Negeri').length;
            const cdSwasta = cdSchools.filter(s => s.statusSekolah === 'Swasta').length;
            const cdPeserta = cdSchools.reduce((acc, curr) => acc + curr.jumlahPesertaKelas12, 0);
            const cdAvg = cdSchools.length > 0 
              ? Math.round(cdSchools.reduce((acc, curr) => acc + (curr.skorKesiapan || 80), 0) / cdSchools.length)
              : 0;
            const isSelected = filterCabangDinas === cd.label || filterCabangDinas.includes(cd.nama);

            return (
              <div
                key={cd.id}
                onClick={() => setFilterCabangDinas(isSelected ? 'Semua' : cd.label)}
                className={`cursor-pointer rounded-xl p-3.5 border transition-all text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-400/40'
                    : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-800'
                    }`}>
                      Wilayah {cd.wilayahRomawi}
                    </span>
                    <span className="text-[11px] font-bold text-slate-700">
                      {cdAvg > 0 ? `${cdAvg}% KKA` : 'N/A'}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs leading-snug">
                    {cd.nama}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                    {cd.kabKota.join(', ')}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                  <div className="text-slate-600">
                    <strong className="text-slate-900 font-bold">{cdSchools.length}</strong> SMA
                    <span className="text-[10px] text-slate-400 ml-1">({cdNegeri}N / {cdSwasta}S)</span>
                  </div>
                  <div className="text-slate-500 text-[10px]">
                    {cdPeserta > 0 ? `${cdPeserta.toLocaleString('id-ID')} Siswa` : '-'}
                  </div>
                </div>

                <div className="mt-2">
                  <span className={`block text-center text-[10px] font-semibold py-1 rounded transition ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'
                  }`}>
                    {isSelected ? '✓ Wilayah Aktif Terpilih' : 'Filter Wilayah Ini'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time School Monitoring Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800 text-base">
                Status Keterlaksanaan 4 Sesi Harian Ujian TKA per SMA
              </h3>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded border border-blue-200">
                Kepmen 56/2026 (4 Sesi/Hari)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Sesi 1 (07.00 - 08.30) • Sesi 2 (09.00 - 10.30) • Sesi 3 (11.00 - 12.30) • Sesi 4 (13.00 - 14.30 WIB) • Rasio PC Maks 1:4
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('schools')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200/60 transition"
            >
              Lihat Seluruh Satuan Pendidikan <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200">
                <th className="py-3 px-3">Nama Satuan Pendidikan / NPSN</th>
                <th className="py-3 px-3">Model & Sarpras</th>
                <th className="py-3 px-2 text-center">Sesi 1</th>
                <th className="py-3 px-2 text-center">Sesi 2</th>
                <th className="py-3 px-2 text-center">Sesi 3</th>
                <th className="py-3 px-2 text-center">Sesi 4</th>
                <th className="py-3 px-3 text-center">Penyelia PTN (Daring)</th>
                <th className="py-3 px-3 text-center">Sulingjar Guru</th>
                <th className="py-3 px-2 text-center">Skor KKA</th>
                <th className="py-3 px-3 text-right">Aksi Monev</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSchools.map((school) => (
                <tr key={school.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded border ${
                        school.statusSekolah === 'Negeri'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-purple-50 text-purple-800 border-purple-200'
                      }`}>
                        SMA {school.statusSekolah}
                      </span>
                      <span className="font-semibold text-slate-900 text-sm truncate max-w-xs">{school.nama}</span>
                    </div>
                    <div className="text-slate-500 text-[11px] flex flex-wrap items-center gap-1.5 mt-0.5">
                      <span>NPSN: {school.npsn}</span>
                      <span>•</span>
                      <span>{school.kabKota}</span>
                      <span>•</span>
                      <span className="text-slate-600">{school.cabangDinas}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-800">{school.statusPelaksanaan} ({school.modelPelaksanaan})</div>
                    <div className="text-[11px] text-slate-500">
                      {school.jumlahPesertaKelas12} Siswa • {school.jumlahRuangUjian} R ({school.jumlahKomputerUtama} PC)
                    </div>
                  </td>

                  <td className="py-3 px-2 text-center">
                    {getStatusBadge(school.sesiHariIni.sesi1)}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {getStatusBadge(school.sesiHariIni.sesi2)}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {getStatusBadge(school.sesiHariIni.sesi3)}
                  </td>
                  <td className="py-3 px-2 text-center">
                    {getStatusBadge(school.sesiHariIni.sesi4)}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {school.statusPenyeliaPtn || 'Terhubung'}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className="font-bold text-slate-800 text-xs">
                        {school.partisipasiSulingjarGuru ?? 92}%
                      </span>
                      <span className="text-[10px] text-emerald-600 font-medium">Tuntas</span>
                    </div>
                  </td>

                  <td className="py-3 px-2 text-center">
                    <div className="inline-flex items-center gap-1 font-bold text-slate-900">
                      <span>{school.skorKesiapan || '-'}</span>
                      {school.gradeKesiapan && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                          school.gradeKesiapan === 'A' ? 'bg-emerald-100 text-emerald-800' :
                          school.gradeKesiapan === 'B' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {school.gradeKesiapan}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectSchool(school)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-sm transition"
                    >
                      Buka KKA
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid: Quick Insights & Official Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Box 1: Jadwal 4 Hari Terpadu TKA-AN SMA (Kepmen 56/2026 Bab VIII) */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Jadwal 4 Hari Ujian TKA-AN Terpadu</span>
          </div>
          <p className="text-xs text-slate-600">
            Sesuai <strong>Kepmendikdasmen No. 56 Tahun 2026 (Bab VIII)</strong>, TKA dan AN terintegrasi dalam 4 hari pelaksanaan:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800">Hari I: Bahasa Indonesia</span>
                <p className="text-[11px] text-slate-500">Literasi Membaca (60&apos;) + Survei Karakter (20&apos;) + Latihan (10&apos;)</p>
              </div>
              <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">90 Menit</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800">Hari II: Bahasa Inggris</span>
                <p className="text-[11px] text-slate-500">Bahasa Inggris (50&apos;) + Sulingjar Siswa (20&apos;) + Latihan (10&apos;)</p>
              </div>
              <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">80 Menit</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800">Hari III: Matematika</span>
                <p className="text-[11px] text-slate-500">Matematika / Numerasi (70&apos;) + Latihan (10&apos;)</p>
              </div>
              <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">80 Menit</span>
            </div>
            <div className="p-2 rounded-lg bg-indigo-50/60 border border-indigo-200/70 flex justify-between items-center">
              <div>
                <span className="font-bold text-indigo-900">Hari IV: 2 Mapel Pilihan</span>
                <p className="text-[11px] text-indigo-700">Pilihan 1 (50&apos;) + Pilihan 2 (50&apos;) + Latihan (10&apos;)</p>
              </div>
              <span className="font-semibold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">110 Menit</span>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('regulations')}
            className="w-full text-center text-xs text-blue-600 hover:text-blue-800 font-semibold pt-1 block"
          >
            Pelajari Regulasi &amp; Juknis Resmi Lengkap &rarr;
          </button>
        </div>

        {/* Box 2: Kompilasi Regulasi Kunci Kepmen 56/2026 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>Poin Regulasi Kepmendikdasmen 56/2026</span>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
              <strong className="text-slate-800">Diktum Keempat (Pencabutan):</strong>
              <p className="text-[11px] text-slate-500 mt-0.5">Mencabut &amp; menyatakan tidak berlaku Kepmendikdasmen No. 95/M/2025.</p>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
              <strong className="text-slate-800">Bab X (Skala Skor 200 - 800):</strong>
              <p className="text-[11px] text-slate-500 mt-0.5">Hasil TKA SMA dilaporkan dengan skala 200-800 (2 desimal), kategori Baik, Memadai, Kurang.</p>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
              <strong className="text-slate-800">Predikat Istimewa (&ge; 725,00):</strong>
              <p className="text-[11px] text-slate-500 mt-0.5">Diberikan bagi murid yang memperoleh skor minimal 725,00 pada seluruh mata uji.</p>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
              <strong className="text-slate-800">Bab VII (Pengawasan &amp; Penyelia PTN):</strong>
              <p className="text-[11px] text-slate-500 mt-0.5">Dosen PTN bertindak sebagai Penyelia Pengawas Daring via vcon, didampingi Disdikbud Jateng.</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('regulations')}
            className="w-full text-center text-xs text-emerald-700 hover:text-emerald-900 font-semibold pt-1 block"
          >
            Baca Rangkuman Regulasi Lengkap &rarr;
          </button>
        </div>

        {/* Box 3: Pusat Bantuan & Respon Cepat Kendala (Helpdesk) */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 rounded-xl p-5 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider uppercase text-rose-300 bg-rose-900/50 px-2 py-0.5 rounded border border-rose-700/50">
                Pusat Kendala &amp; Mitigasi
              </span>
              <span className="text-xs text-slate-400 font-mono">Disdikbud Jateng</span>
            </div>
            <h4 className="font-bold text-base mt-2">Helpdesk &amp; Penanganan Insiden Sesi</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Respon cepat mitigasi gangguan listrik, internet, token server, kendala hardware PC klien, dan pencatatan sesi susulan TKA se-Jawa Tengah.
            </p>
            <div className="mt-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[11px] space-y-1">
              <div className="flex justify-between items-center text-slate-300">
                <span>Tiket Kendala Terbuka:</span>
                <span className="font-bold text-rose-400">{openIncidents.length} Kasus</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Penyelia Dosen PTN:</span>
                <span className="font-bold text-emerald-400">Aktif Daring</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => onNavigateTab('incidents')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Buka Pusat Kendala (Helpdesk)
            </button>
            <p className="text-[11px] text-slate-400 text-center">
              Dukungan teknis standby selama 4 sesi harian berjalan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
