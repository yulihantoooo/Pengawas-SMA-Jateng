/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { School, IncidentReport, MonevEvaluation } from './types/tka';
import { INITIAL_SCHOOLS, INITIAL_INCIDENTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { KkaFormView } from './components/KkaFormView';
import { SchoolsListView } from './components/SchoolsListView';
import { IncidentDeskView } from './components/IncidentDeskView';
import { RegulationGuideView } from './components/RegulationGuideView';
import { CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [schools, setSchools] = useState<School[]>(INITIAL_SCHOOLS);
  const [incidents, setIncidents] = useState<IncidentReport[]>(INITIAL_INCIDENTS);
  const [evaluations, setEvaluations] = useState<MonevEvaluation[]>([]);
  const [selectedSchoolIdForKka, setSelectedSchoolIdForKka] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSelectSchoolForKka = (school: School) => {
    setSelectedSchoolIdForKka(school.id);
    setActiveTab('kka');
  };

  const handleSaveEvaluation = (evalData: MonevEvaluation, updatedSchool: School) => {
    setEvaluations(prev => [evalData, ...prev]);
    setSchools(prev => prev.map(s => s.id === updatedSchool.id ? updatedSchool : s));
    showToast(`Penilaian KKA untuk ${updatedSchool.nama} berhasil disimpan (Nilai: ${evalData.nilai} / Predikat: ${evalData.predikat})`);
  };

  const handleAddSchool = (newSchool: School) => {
    setSchools(prev => [newSchool, ...prev]);
    showToast(`Satuan Pendidikan ${newSchool.nama} berhasil didaftarkan ke sistem.`);
  };

  const handleAddIncident = (newIncident: IncidentReport) => {
    setIncidents(prev => [newIncident, ...prev]);
    showToast(`Tiket kendala ${newIncident.kodeTiket} telah dilaporkan.`);
  };

  const handleUpdateIncident = (updated: IncidentReport) => {
    setIncidents(prev => prev.map(i => i.id === updated.id ? updated : i));
    showToast(`Tiket ${updated.kodeTiket} (${updated.schoolName}) berhasil ditandai selesai.`);
  };

  const handleQuickResolveIncident = (incidentId: string) => {
    setIncidents(prev => prev.map(i => {
      if (i.id === incidentId) {
        return {
          ...i,
          status: 'Selesai Teratasi',
          waktuSelesai: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
          tindakanMitigasi: i.tindakanMitigasi || 'Kendala telah ditangani oleh teknisi dan proktor sekolah.'
        };
      }
      return i;
    }));
    showToast('Tiket kendala berhasil diselesaikan secara cepat.');
  };

  const openIncidentsCount = incidents.filter(i => i.status !== 'Selesai Teratasi').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openIncidentsCount={openIncidentsCount}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            schools={schools}
            incidents={incidents}
            onSelectSchool={handleSelectSchoolForKka}
            onNavigateTab={setActiveTab}
            onOpenNewIncident={() => setActiveTab('incidents')}
            onQuickResolveIncident={handleQuickResolveIncident}
          />
        )}

        {activeTab === 'kka' && (
          <KkaFormView
            schools={schools}
            selectedSchoolId={selectedSchoolIdForKka}
            onSaveEvaluation={handleSaveEvaluation}
          />
        )}

        {activeTab === 'schools' && (
          <SchoolsListView
            schools={schools}
            onSelectSchoolForKka={handleSelectSchoolForKka}
            onAddSchool={handleAddSchool}
          />
        )}

        {activeTab === 'incidents' && (
          <IncidentDeskView
            incidents={incidents}
            schools={schools}
            onAddIncident={handleAddIncident}
            onUpdateIncident={handleUpdateIncident}
          />
        )}

        {activeTab === 'regulations' && (
          <RegulationGuideView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-xs text-slate-500 print:hidden mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="space-y-1">
            <p className="font-bold text-slate-800 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span>SIMONEV TKA SMA JATENG</span>
              <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded font-extrabold border border-amber-300">
                oleh PENGAWAS SMA JATENG
              </span>
              <span className="text-slate-400 font-normal">|</span>
              <span className="text-slate-600 font-medium">Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah</span>
            </p>
            <p className="text-[11px] text-slate-500">
              Instrumen Pemantauan &amp; Evaluasi TKA SMA Negeri &amp; Swasta di 13 Cabang Dinas Pendidikan se-Jawa Tengah &bull; Dikelola langsung oleh <strong>PENGAWAS SMA JATENG</strong> mengacu pada Kepmendikdasmen No. 56 Tahun 2026 dan Perkaban No. 045/H/AN/2025.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 whitespace-nowrap bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-700">PENGAWAS SMA JATENG</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
