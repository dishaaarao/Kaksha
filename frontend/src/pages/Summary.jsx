import { useState } from 'react';
import axios from 'axios';
import { AlignLeft, Loader2, Send, Copy, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Summary = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateSummary = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/generate-summary', { text }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 font-outfit">
      <div className="mb-12">
        <h1 className="text-6xl font-black text-[#0A0A0A] dark:text-white flex items-center gap-4 italic uppercase leading-none tracking-tighter">
          <div className="bg-[#A89EFF]/10 text-[#A89EFF] p-3 rounded-2xl border border-[#A89EFF]/20">
             <AlignLeft size={32} />
          </div>
          The <span className="text-[#694AFF]">Abstract</span>
        </h1>
        <p className="text-xl text-[#0A0A0A]/40 dark:text-white/40 mt-4 font-bold tracking-tight">
          Condense long narratives into essential strokes. Precision for every page.
        </p>
      </div>

      <div className="glass-card rounded-[3rem] p-6 shadow-2xl border-black/5 dark:border-white/5 mb-12 relative overflow-hidden group">
        <form onSubmit={generateSummary} className="relative z-10 flex flex-col gap-6">
           <textarea
             value={text}
             onChange={(e) => setText(e.target.value)}
             className="w-full bg-[#F2F0E7]/50 dark:bg-white/5 border-2 border-transparent rounded-[2.5rem] p-8 text-xl text-[#0A0A0A] dark:text-white focus:border-[#694AFF]/30 outline-none resize-y min-h-[220px] font-bold tracking-tight placeholder:opacity-30"
             placeholder="Paste your lengthy text here..."
           />
           <div className="flex justify-between items-center px-6">
             <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-30"><Type size={18} /> {text.length} strokes</span>
             <button
               type="submit"
               disabled={loading || !text.trim()}
               className="bg-[#0A0A0A] hover:bg-[#694AFF] text-white font-black py-5 px-12 rounded-2xl shadow-2xl shadow-black/10 hover:shadow-[#694AFF]/20 hover:-translate-y-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-4 active:scale-95 text-xs uppercase tracking-[0.3em]"
             >
               {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={20} />}
               {loading ? 'Condensing...' : 'Generate Abstract'}
             </button>
           </div>
        </form>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Quick Summary */}
            <div className="glass-card rounded-2xl p-8 border-l-4 border-pink-500 shadow-sm relative overflow-hidden group">
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quick Summary</h2>
               <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                 {result.summary}
               </p>
               <button onClick={() => navigator.clipboard.writeText(result.summary)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                 <Copy size={20} />
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bullet Points */}
              <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 text-pink-500">Key Takeaways</h3>
                <ul className="space-y-3">
                  {result.bullet_points?.map((val, idx) => (
                    <li key={idx} className="flex items-start text-slate-700 dark:text-slate-300">
                      <span className="text-pink-500 font-bold mr-3 mt-1 shadow-sm">•</span>
                      <span className="leading-relaxed">{val}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Keywords */}
              <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 text-pink-500">Important Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywords?.map((kw, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-500/20 text-sm font-medium shadow-sm transition-transform hover:scale-105"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Summary;
