import React from 'react';
import { 
  BarChart3, 
  ClipboardCheck, 
  School as SchoolIcon, 
  AlertTriangle, 
  BookOpen, 
  FileText, 
  Scale, 
  Clock, 
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openIncidentsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openIncidentsCount
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Monev', icon: BarChart3 },
    { id: 'kka', label: 'Instrumen KKA', icon: ClipboardCheck },
    { id: 'schools', label: 'Satuan Pendidikan', icon: SchoolIcon },
    { id: 'incidents', label: 'Pusat Kendala', icon: AlertTriangle, badge: openIncidentsCount },
    { id: 'regulations', label: 'Regulasi Resmi', icon: Scale },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-4 py-2 text-xs border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" /> REGULASI RESMI TERBARU
            </span>
            <span className="text-slate-300">
              Kepmendikdasmen No. 56 Tahun 2026 &bull; Pedoman Penyelenggaraan TKA &amp; AN Terpadu
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Sesi 2 Berjalan (09.00 - 10.30 WIB) • 4 Sesi/Hari</span>
            </span>
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden md:inline-block text-emerald-400 font-medium">Penyelia PTN Terhubung</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-inner border border-blue-400/30 text-white font-bold text-lg">
            TKA
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-bold text-lg tracking-tight text-white">SIMONEV TKA SMA JATENG</h1>
              <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                PROV. JAWA TENGAH
              </span>
              <span className="text-[10px] font-bold bg-amber-500/25 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40 uppercase tracking-wide">
                oleh PENGAWAS SMA JATENG
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Disdikbud Jawa Tengah • Instrumen &amp; Pemantauan oleh <span className="font-semibold text-amber-300">PENGAWAS SMA JATENG</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 text-[10px] rounded-full bg-rose-500 text-white font-bold animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('kka')}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition active:scale-95"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Isi KKA Baru</span>
          </button>
        </div>
      </div>

      {/* Mobile Scrollable Tabs */}
      <div className="lg:hidden flex overflow-x-auto border-t border-slate-800 px-2 py-1.5 gap-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-rose-500 text-white font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
