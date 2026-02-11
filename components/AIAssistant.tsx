
import React, { useState } from 'react';
import { Sparkles, Send, Lightbulb, MessageCircle } from 'lucide-react';
import { generatePastoralInsight } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await generatePastoralInsight(input);
    setResponse(result || "");
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <section className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Sparkles size={120} />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Lumen AI</h2>
              <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Suporte Inteligente à Capelania</p>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Descreva o caso ou situação do paciente..."
              className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[140px] resize-none font-medium"
            />
            <button 
              onClick={handleAsk}
              disabled={loading || !input.trim()}
              className="absolute bottom-4 right-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl disabled:opacity-30"
            >
              {loading ? <i className="fas fa-circle-notch fa-spin mr-2"></i> : <Send size={16} className="mr-2 inline" />}
              {loading ? 'Analisando...' : 'Consultar IA'}
            </button>
          </div>
        </div>
      </section>

      {response && (
        <div className="bg-white rounded-[2.5rem] p-8 border border-blue-100 shadow-sm animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-widest mb-4">
            <Lightbulb size={20} />
            <span>Sugestão Pastoral</span>
          </div>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-medium">
            {response}
          </div>
        </div>
      )}

      {!response && !loading && (
        <div className="grid md:grid-cols-2 gap-4">
          <button 
            onClick={() => setInput("Paciente jovem com diagnóstico terminal, família muito abalada e sem base religiosa definida. Como abordar?")}
            className="p-6 bg-white rounded-2xl border border-slate-100 text-left hover:border-blue-300 transition-all group"
          >
            <MessageCircle className="mb-3 text-blue-500 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-slate-800 text-sm mb-1">Casos Terminais</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Abordagem sem base religiosa definida.</p>
          </button>
          <button 
            onClick={() => setInput("Colaborador da UTI muito estressado, sentindo-se culpado por perdas recentes. Como acolher?")}
            className="p-6 bg-white rounded-2xl border border-slate-100 text-left hover:border-blue-300 transition-all group"
          >
            <MessageCircle className="mb-3 text-emerald-500 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-slate-800 text-sm mb-1">Apoio à Equipe</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Lidando com a síndrome de burnout e culpa.</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
