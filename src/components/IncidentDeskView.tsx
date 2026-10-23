import React, { useState } from 'react';
import { IncidentReport, School } from '../types/tka';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw,
  X,
  FileQuestion,
  Users
} from 'lucide-react';

interface IncidentDeskViewProps {
  incidents: IncidentReport[];
  schools: School[];
  onAddIncident: (newIncident: IncidentReport) => void;
  onUpdateIncident: (updatedIncident: IncidentReport) => void;
}

export const IncidentDeskView: React.FC<IncidentDeskViewProps> = ({
  incidents,
  schools,
  onAddIncident,
  onUpdateIncident
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [filterSeverity, setFilterSeverity] = useState<string>('Semua');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [resolvingIncident, setResolvingIncident] = useState<IncidentReport | null>(null);

  // New incident form state
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(schools[0]?.id || '');
  const [ruang, setRuang] = useState('Lab Komputer 1');
  const [sesi, setSesi] = useState<number>(2);
  const [kategori, setKategori] = useState<IncidentReport['kategori']>('Jaringan Internet');
  const [tingkatKeparahan, setTingkatKeparahan] = useState<'Rendah' | 'Sedang' | 'Kritis'>('Kritis');
  const [deskripsiMasalah, setDeskripsiMasalah] = useState('');
  const [pelapor, setPelapor] = useState('Proktor Ruang 1');
  const [dampakSiswa, setDampakSiswa] = useState<number>(5);
  const [tindakanMitigasiAwal, setTindakanMitigasiAwal] = useState('');

  // Resolving modal form
  const [mitigationNote, setMitigationNote] = useState('');
  const [petugasPenyelesai, setPetugasPenyelesai] = useState('Tim Teknisi & Proktor');
  const [perluSesiSusulan, setPerluSesiSusulan] = useState(false);

  const filteredIncidents = incidents.filter(inc => {
    const matchStatus = filterStatus === 'Semua' ? true : inc.status === filterStatus;
    const matchSeverity = filterSeverity === 'Semua' ? true : inc.tingkatKeparahan === filterSeverity;
    const matchSearch = inc.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        inc.kodeTiket.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        inc.deskripsiMasalah.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSeverity && matchSearch;
  });

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const sch = schools.find(s => s.id === selectedSchoolId) || schools[0];
    const newInc: IncidentReport = {
      id: `inc-${Date.now()}`,
      kodeTiket: `TKA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      schoolId: sch.id,
      schoolName: sch.nama,
      kabKota: sch.kabKota,
      ruang,
      sesi,
      kategori,
      tingkatKeparahan,
      deskripsiMasalah,
      waktuLapor: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      pelapor: pelapor || sch.proktorUtama,
      status: 'Dalam Penanganan',
      tindakanMitigasi: tindakanMitigasiAwal || 'Sedang dilakukan troubleshooting lapangan.',
      dampakSiswa,
      perluSesiSusulan: false
    };

    onAddIncident(newInc);
    setShowAddModal(false);
    setDeskripsiMasalah('');
    setTindakanMitigasiAwal('');
  };

  const handleConfirmResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingIncident) return;

    const updated: IncidentReport = {
      ...resolvingIncident,
      status: 'Selesai Teratasi',
      tindakanMitigasi: mitigationNote || resolvingIncident.tindakanMitigasi || 'Kendala telah diselesaikan oleh teknisi.',
      petugasPenyelesai: petugasPenyelesai || 'Teknisi Sekolah & Pengawas',
      waktuSelesai: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      perluSesiSusulan
    };

    onUpdateIncident(updated);
    setResolvingIncident(null);
    setMitigationNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            PASAL 21 AYAT (2) HURUF C & D: KENDALA DAN MITIGASI
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Pusat Penanganan Kendala & Insiden Sesi TKA
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pencatatan gangguan teknis (jaringan, listrik, server CBT, hardware PC) dan eksekusi mitigasi resmi secara akuntabel.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Laporkan Kendala Baru
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari tiket, nama SMA, atau deskripsi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 outline-none"
            >
              <option value="Semua">Semua Status</option>
              <option value="Baru">Baru</option>
              <option value="Dalam Penanganan">Dalam Penanganan</option>
              <option value="Selesai Teratasi">Selesai Teratasi</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Tingkat:</span>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 outline-none"
            >
              <option value="Semua">Semua Tingkat</option>
              <option value="Kritis">Kritis (Ujian Freeze)</option>
              <option value="Sedang">Sedang (Perorangan)</option>
              <option value="Rendah">Rendah (Peringatan)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Incidents Table / Cards */}
      <div className="space-y-4">
        {filteredIncidents.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 opacity-80" />
            <h3 className="font-bold text-slate-800 text-sm">Tidak Ada Kendala Sesuai Filter</h3>
            <p className="text-xs text-slate-500 mt-1">Seluruh sesi ujian berjalan kondusif tanpa laporan gangguan aktif.</p>
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const isResolved = incident.status === 'Selesai Teratasi';
            return (
              <div
                key={incident.id}
                className={`bg-white rounded-xl border p-5 shadow-sm transition space-y-4 ${
                  isResolved ? 'border-slate-200/90 opacity-90' :
                  incident.tingkatKeparahan === 'Kritis' ? 'border-rose-300 bg-rose-50/10' :
                  'border-amber-300 bg-amber-50/10'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                      {incident.kodeTiket}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {incident.schoolName}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {incident.ruang} • Sesi {incident.sesi} • Dilaporkan {incident.waktuLapor} oleh <strong>{incident.pelapor}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      incident.tingkatKeparahan === 'Kritis' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      incident.tingkatKeparahan === 'Sedang' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {incident.tingkatKeparahan}
                    </span>

                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-blue-100 text-blue-800 border border-blue-300 animate-pulse'
                    }`}>
                      {isResolved ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {incident.status}
                    </span>
                  </div>
                </div>

                {/* Issue details & mitigation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Uraian Masalah:</span>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {incident.deskripsiMasalah}
                    </p>
                    <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-3">
                      <span>Kategori: <strong>{incident.kategori}</strong></span>
                      <span>Dampak: <strong className="text-rose-600">{incident.dampakSiswa} Murid</strong></span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Tindakan Mitigasi & Solusi:</span>
                    <p className="text-slate-800 leading-relaxed">
                      {incident.tindakanMitigasi || 'Menunggu verifikasi teknisi lapangan.'}
                    </p>
                    {isResolved && incident.waktuSelesai && (
                      <div className="text-[11px] text-emerald-700 pt-1 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" />
                        <span>Selesai pukul {incident.waktuSelesai} oleh {incident.petugasPenyelesai || 'Tim Teknis'}</span>
                      </div>
                    )}
                    {incident.perluSesiSusulan && (
                      <div className="mt-1 inline-block bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        Direkomendasikan Sesi Susulan Resmi (Pasal 21)
                      </div>
                    )}
                  </div>
                </div>

                {/* Action button if not resolved */}
                {!isResolved && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setResolvingIncident(incident);
                        setMitigationNote(incident.tindakanMitigasi || '');
                      }}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selesaikan & Catat Solusi
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal: New Incident */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                Catat Laporan Kendala Pelaksanaan TKA
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Satuan Pendidikan SMA *</label>
                <select
                  value={selectedSchoolId}
                  onChange={(e) => setSelectedSchoolId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium"
                >
                  {schools.map(s => (
                    <option key={s.id} value={s.id}>{s.nama}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Ruang Ujian</label>
                  <input
                    type="text"
                    value={ruang}
                    onChange={(e) => setRuang(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Sesi Ujian</label>
                  <select
                    value={sesi}
                    onChange={(e) => setSesi(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  >
                    <option value={1}>Sesi 1 (07:30 - 09:30)</option>
                    <option value={2}>Sesi 2 (09:30 - 11:30)</option>
                    <option value={3}>Sesi 3 (13:00 - 15:00)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kategori Kendala</label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  >
                    <option value="Jaringan Internet">Jaringan Internet (ISP)</option>
                    <option value="Listrik / Daya">Listrik / Daya PLN</option>
                    <option value="Aplikasi CBT / Server">Aplikasi CBT / Server</option>
                    <option value="Hardware PC Klien">Hardware PC Klien</option>
                    <option value="Peserta / Tata Tertib">Peserta / Tata Tertib</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tingkat Keparahan</label>
                  <select
                    value={tingkatKeparahan}
                    onChange={(e) => setTingkatKeparahan(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium"
                  >
                    <option value="Kritis">Kritis (Ujian Satu Lab Terhenti)</option>
                    <option value="Sedang">Sedang (1-3 Siswa Terkendala)</option>
                    <option value="Rendah">Rendah (Peringatan Sistem)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Deskripsi Kejadian Kendala *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Ceritakan detail kendala teknis atau situasi yang terjadi..."
                  value={deskripsiMasalah}
                  onChange={(e) => setDeskripsiMasalah(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Jumlah Murid Terdampak</label>
                  <input
                    type="number"
                    min={0}
                    value={dampakSiswa}
                    onChange={(e) => setDampakSiswa(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Pelapor</label>
                  <input
                    type="text"
                    value={pelapor}
                    onChange={(e) => setPelapor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Langkah Penanganan Awal yang Sedang Diambil</label>
                <input
                  type="text"
                  placeholder="Misal: Reset router, pindah komputer cadangan..."
                  value={tindakanMitigasiAwal}
                  onChange={(e) => setTindakanMitigasiAwal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold shadow-sm"
                >
                  Kirim Laporan Tiket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Resolve Incident */}
      {resolvingIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Penyelesaian Tiket: {resolvingIncident.kodeTiket}
              </h3>
              <button
                onClick={() => setResolvingIncident(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmResolve} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-slate-800">{resolvingIncident.schoolName}</strong>
                <p className="text-slate-600 mt-1">{resolvingIncident.deskripsiMasalah}</p>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Uraian Solusi / Tindakan Mitigasi yang Telah Diterapkan *
                </label>
                <textarea
                  required
                  rows={3}
                  value={mitigationNote}
                  onChange={(e) => setMitigationNote(e.target.value)}
                  placeholder="Jelaskan tindakan nyata: misal beralih ke genset dalam 3 menit, siswa dipindah ke PC cadangan dan jawaban di-restore..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Nama Petugas Teknisi / Proktor yang Menyelesaikan:
                </label>
                <input
                  type="text"
                  value={petugasPenyelesai}
                  onChange={(e) => setPetugasPenyelesai(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="chk-susulan"
                  checked={perluSesiSusulan}
                  onChange={(e) => setPerluSesiSusulan(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600"
                />
                <label htmlFor="chk-susulan" className="text-amber-900 leading-tight cursor-pointer">
                  <strong>Apakah Murid Terdampak Memerlukan Sesi Susulan Resmi?</strong>
                  <span className="block text-[11px] text-amber-700 mt-0.5">
                    Centang jika murid kehilangan waktu &gt; 30 menit atau sakit sesuai ketentuan Pasal 21.
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setResolvingIncident(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-sm"
                >
                  Tandai Selesai Teratasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
