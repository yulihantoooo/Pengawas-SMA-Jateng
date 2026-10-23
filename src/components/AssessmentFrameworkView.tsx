import React, { useState } from 'react';
import { EXAM_SUBJECTS, AUTHENTIC_SAMPLE_QUESTIONS } from '../data/mockData';
import { ExamSubject, SampleQuestion } from '../types/tka';
import { 
  BookOpen, 
  HelpCircle, 
  Layers, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Award, 
  GraduationCap, 
  FileText,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';

export const AssessmentFrameworkView: React.FC = () => {
  const [selectedRumpun, setSelectedRumpun] = useState<string>('Semua');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [userSingleAnswer, setUserSingleAnswer] = useState<string>('');
  const [userMcmaAnswers, setUserMcmaAnswers] = useState<string[]>([]);
  const [userCategoryAnswers, setUserCategoryAnswers] = useState<{ [key: number]: string }>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const rumpunList = ['Semua', 'Umum', 'MIPA', 'IPS', 'Bahasa & Budaya', 'Vokasional'];

  const filteredSubjects = EXAM_SUBJECTS.filter(s => 
    selectedRumpun === 'Semua' ? true : s.rumpun === selectedRumpun
  );

  const activeQuestion: SampleQuestion = AUTHENTIC_SAMPLE_QUESTIONS[activeQuestionIndex];

  const handleSelectQuestion = (index: number) => {
    setActiveQuestionIndex(index);
    setUserSingleAnswer('');
    setUserMcmaAnswers([]);
    setUserCategoryAnswers({});
    setHasSubmitted(false);
  };

  const handleToggleMcma = (label: string) => {
    if (hasSubmitted) return;
    setUserMcmaAnswers(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const handleSelectCategory = (idx: number, opt: string) => {
    if (hasSubmitted) return;
    setUserCategoryAnswers(prev => ({ ...prev, [idx]: opt }));
  };

  // Grade calculation
  const isCorrect = () => {
    if (!hasSubmitted) return false;
    if (activeQuestion.bentukSoal === 'Pilihan Ganda Sederhana') {
      return userSingleAnswer === activeQuestion.kunciJawaban;
    }
    if (activeQuestion.bentukSoal === 'PGK MCMA') {
      const keys = (activeQuestion.kunciJawaban as string[]).sort();
      const userKeys = [...userMcmaAnswers].sort();
      return JSON.stringify(keys) === JSON.stringify(userKeys);
    }
    if (activeQuestion.bentukSoal === 'PGK Kategori') {
      const correctMap = activeQuestion.kunciJawaban as { [key: number]: string };
      return Object.keys(correctMap).every(k => correctMap[Number(k)] === userCategoryAnswers[Number(k)]);
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-blue-800/40">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          PERKABAN BSKAP NO. 045/H/AN/2025
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          Kerangka Asesmen TKA SMA/MA & Model Soal Terstandar
        </h2>
        <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-3xl leading-relaxed">
          Struktur asesmen nasional TKA dirancang untuk mengukur capaian akademik objektif, pemecahan masalah kontekstual, dan kemampuan bernalar tinggi (HOTS) tanpa diskriminasi standar nilai rapor antar satuan pendidikan.
        </p>

        {/* 3 Cognitive Levels summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800">
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Level 1: Knowing</span>
            <h4 className="font-bold text-xs text-white mt-0.5">Pengetahuan & Pemahaman</h4>
            <p className="text-[11px] text-slate-300 mt-1">
              Mengenali konsep, definisi, rumus dasar, dan prosedur rutin aritmetika/tata bahasa.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Level 2: Applying</span>
            <h4 className="font-bold text-xs text-white mt-0.5">Aplikasi & Pemodelan</h4>
            <p className="text-[11px] text-slate-300 mt-1">
              Memodelkan fenomena nyata, menghitung strategi optimasi, dan memecahkan soal terapan.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Level 3: Reasoning</span>
            <h4 className="font-bold text-xs text-white mt-0.5">Penalaran & Refleksi</h4>
            <p className="text-[11px] text-slate-300 mt-1">
              Menganalisis sebab-akibat, evaluasi bukti, perumusan argumen, dan pengambilan keputusan kritis.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Sample Question Simulator & Subject Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Question Simulator */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-slate-100 space-y-3 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Simulator 3 Bentuk Soal TKA Resmi
              </span>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {activeQuestion.bentukSoal}
              </span>
            </div>

            {/* Question Selector Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {AUTHENTIC_SAMPLE_QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    activeQuestionIndex === idx
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {q.mataUji} (#{idx + 1})
                </button>
              ))}
            </div>

            {/* Question Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 pt-1">
              <span className="bg-slate-200/80 px-2 py-0.5 rounded font-medium">
                Mata Uji: <strong>{activeQuestion.mataUji}</strong>
              </span>
              <span className="bg-slate-200/80 px-2 py-0.5 rounded font-medium">
                Elemen: <strong>{activeQuestion.elemen}</strong>
              </span>
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded font-bold">
                {activeQuestion.levelKognitif}
              </span>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 space-y-4 text-xs flex-1">
            {/* Stimulus if exists */}
            {activeQuestion.stimulus && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-800 leading-relaxed italic">
                <span className="not-italic font-bold text-[10px] text-slate-500 uppercase block mb-1">
                  Wacana Stimulus Kontekstual:
                </span>
                "{activeQuestion.stimulus}"
              </div>
            )}

            {/* Question Text */}
            <div className="font-semibold text-slate-900 text-sm leading-relaxed">
              {activeQuestion.pertanyaan}
            </div>

            {/* Rendering Pilihan Ganda Sederhana */}
            {activeQuestion.bentukSoal === 'Pilihan Ganda Sederhana' && activeQuestion.pilihan && (
              <div className="space-y-2 pt-2">
                {activeQuestion.pilihan.map((p) => {
                  const isSelected = userSingleAnswer === p.label;
                  const isAnswerKey = activeQuestion.kunciJawaban === p.label;
                  return (
                    <label
                      key={p.label}
                      onClick={() => !hasSubmitted && setUserSingleAnswer(p.label)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        hasSubmitted
                          ? isAnswerKey
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                            : isSelected
                            ? 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-white border-slate-200 text-slate-600 opacity-60'
                          : isSelected
                          ? 'bg-blue-50 border-blue-500 text-blue-950 font-medium'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.label}
                      </span>
                      <span className="pt-0.5 leading-relaxed">{p.teks}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Rendering PGK MCMA (Multiple Answers) */}
            {activeQuestion.bentukSoal === 'PGK MCMA' && activeQuestion.pilihan && (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] text-slate-500 font-medium">
                  <em>* Pilihan Ganda Kompleks: Centang semua jawaban yang dianggap benar (jawaban benar lebih dari satu).</em>
                </p>
                {activeQuestion.pilihan.map((p) => {
                  const isChecked = userMcmaAnswers.includes(p.label);
                  const isCorrectAnswer = (activeQuestion.kunciJawaban as string[]).includes(p.label);
                  return (
                    <label
                      key={p.label}
                      onClick={() => handleToggleMcma(p.label)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        hasSubmitted
                          ? isCorrectAnswer
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                            : isChecked
                            ? 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-white border-slate-200 text-slate-600 opacity-60'
                          : isChecked
                          ? 'bg-blue-50 border-blue-500 text-blue-950 font-medium'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                        isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="leading-relaxed">{p.teks}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Rendering PGK Kategori (Benar/Salah or Tepat/Tidak Tepat) */}
            {activeQuestion.bentukSoal === 'PGK Kategori' && activeQuestion.pilihanKategori && (
              <div className="space-y-3 pt-2">
                <p className="text-[11px] text-slate-500 font-medium">
                  <em>* PGK Kategori: Tentukan respon untuk masing-masing pernyataan berikut.</em>
                </p>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                        <th className="p-3 text-left">Pernyataan</th>
                        <th className="p-3 text-center w-40">Pilihan Respon</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeQuestion.pilihanKategori.map((row, idx) => {
                        const correctVal = (activeQuestion.kunciJawaban as any)[idx];
                        const userVal = userCategoryAnswers[idx];
                        return (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="p-3 text-slate-800 leading-relaxed font-medium">
                              {row.pernyataan}
                            </td>
                            <td className="p-3 text-center">
                              <div className="inline-flex gap-1 bg-slate-100 p-1 rounded-lg">
                                {row.opsi.map((opt) => {
                                  const isSelected = userVal === opt;
                                  const isCorrectKey = correctVal === opt;
                                  return (
                                    <button
                                      key={opt}
                                      type="button"
                                      disabled={hasSubmitted}
                                      onClick={() => handleSelectCategory(idx, opt)}
                                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                                        hasSubmitted
                                          ? isCorrectKey
                                            ? 'bg-emerald-600 text-white'
                                            : isSelected
                                            ? 'bg-rose-500 text-white'
                                            : 'text-slate-400'
                                          : isSelected
                                          ? 'bg-blue-600 text-white shadow'
                                          : 'text-slate-600 hover:text-slate-900'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Explanation box after submission */}
            {hasSubmitted && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                isCorrect()
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isCorrect() ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Jawaban Tepat!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Evaluasi & Pembahasan Kunci Jawaban:</span>
                    </>
                  )}
                </div>
                <p className="mt-1">{activeQuestion.pembahasan}</p>
              </div>
            )}
          </div>

          {/* Question Footer Buttons */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Contoh resmi Lampiran IV Perkaban No. 045/H/AN/2025
            </span>
            <div className="flex gap-2">
              {hasSubmitted ? (
                <button
                  onClick={() => {
                    setHasSubmitted(false);
                    setUserSingleAnswer('');
                    setUserMcmaAnswers([]);
                    setUserCategoryAnswers({});
                  }}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold px-4 py-2 rounded-lg transition"
                >
                  Ulangi Soal
                </button>
              ) : (
                <button
                  onClick={() => setHasSubmitted(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2 rounded-lg shadow-sm transition"
                >
                  Cek Kunci & Pembahasan
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Subjects & Curriculum Framework Directory */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-slate-100 space-y-3 bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Struktur Mata Uji TKA SMA (Wajib & 19 Pilihan)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Setiap murid SMA mengerjakan 3 mapel wajib dan 2 mapel pilihan sesuai minat studi.
              </p>
            </div>

            {/* Rumpun Filter */}
            <div className="flex gap-1 overflow-x-auto pb-1 text-xs">
              {rumpunList.map((rumpun) => (
                <button
                  key={rumpun}
                  onClick={() => setSelectedRumpun(rumpun)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedRumpun === rumpun
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {rumpun}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 space-y-2.5 max-h-[500px] overflow-y-auto divide-y divide-slate-100 text-xs">
            {filteredSubjects.map((sub) => (
              <div key={sub.id} className="pt-2.5 first:pt-0 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{sub.nama}</span>
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded ${
                      sub.kategori === 'Wajib'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {sub.kategori}
                    </span>
                  </div>
                  <span className="text-slate-500 font-semibold text-[11px]">
                    {sub.durasiMenit} Menit ({sub.jumlahSoal} Soal)
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {sub.deskripsi}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Rumpun: <strong>{selectedRumpun}</strong></span>
            <span>Total: <strong>{filteredSubjects.length} Mata Pelajaran</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
