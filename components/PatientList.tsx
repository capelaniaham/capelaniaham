
import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { PatientStatus, ReligiousAffiliation } from '../types';

const INITIAL_PATIENTS = [
  { id: '1', name: 'Maria Oliveira', bed: '201-A', sector: 'Oncologia', status: PatientStatus.STABLE, religion: ReligiousAffiliation.CATHOLIC, admissionDate: '2023-10-15' },
  { id: '2', name: 'João Santos', bed: '304', sector: 'UTI', status: PatientStatus.CRITICAL, religion: ReligiousAffiliation.EVANGELICAL, admissionDate: '2023-10-20' },
  { id: '3', name: 'Ana Pereira', bed: '105-B', sector: 'Pediatria', status: PatientStatus.OBSERVATION, religion: ReligiousAffiliation.SPIRITIST, admissionDate: '2023-10-22' },
  { id: '4', name: 'Carlos Lima', bed: '412', sector: 'Cardiologia', status: PatientStatus.STABLE, religion: ReligiousAffiliation.NONE, admissionDate: '2023-10-18' },
];

const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: PatientStatus) => {
    switch (status) {
      case PatientStatus.CRITICAL: return 'bg-rose-50 text-rose-600 border-rose-100';
      case PatientStatus.STABLE: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case PatientStatus.OBSERVATION: return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, leito ou setor..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
            <span>Filtros</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
            <Plus size={18} />
            <span>Novo Paciente</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm font-medium uppercase tracking-wider">
              <th className="px-6 py-4">Paciente</th>
              <th className="px-6 py-4">Leito/Setor</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Religião</th>
              <th className="px-6 py-4">Entrada</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {INITIAL_PATIENTS.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{p.name}</div>
                  <div className="text-xs text-slate-500">ID: #{p.id.padStart(4, '0')}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium">{p.bed}</div>
                  <div className="text-xs text-slate-500">{p.sector}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(p.status)}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {p.religion}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(p.admissionDate).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
