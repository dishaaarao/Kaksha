import { useState } from 'react';
import axios from 'axios';
import { FileText, Loader2, Save, Send, Sparkles, Download, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotesGenerator = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateNotes = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:5001/api/generate-notes', { text: topic }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to generate notes. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const text = notes.headings.map(h => `${h.heading}\n${h.points.map(p => `• ${p}`).join('\n')}`).join('\n\n');
    navigator.clipboard.writeText(`${notes.title}\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#0A0A0A] text-white shadow-2xl mb-6">
          <FileText size={36} />
        </div>
        <h1 className="text-6xl font-black text-[#0A0A0A] dark:text-white tracking-tighter mb-4 italic uppercase leading-none">
          The <span className="text-[#694AFF]">Draftsman</span>
        </h1>
        <p className="text-xl text-[#0A0A0A]/40 dark:text-white/40 max-w-2xl mx-auto font-bold tracking-tight">
          Etch your knowledge into structured masterpieces. Turning chaos into clarity.
        </p>
      </motion.div>

      <div className="glass-card rounded-[3rem] p-6 shadow-2xl border-black/5 dark:border-white/5 mb-12 relative overflow-hidden group">
        <form onSubmit={generateNotes} className="relative z-10 flex flex-col gap-6">
          <div className="relative">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#F2F0E7]/50 dark:bg-white/5 border-2 border-transparent rounded-[2rem] p-8 text-xl text-[#0A0A0A] dark:text-white focus:border-[#694AFF]/30 outline-none resize-none transition-all min-h-[200px] font-bold tracking-tight placeholder:opacity-30"
              placeholder="What are we drafting today? (e.g., Quantum Physics, Renaissance Art...)"
            />
            <div className="absolute top-8 right-10 opacity-20">
              <Sparkles size={28} className="text-[#694AFF] animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between items-center px-6">
            <p className="text-sm font-black text-[#0A0A0A]/30 uppercase tracking-widest italic">Tip: Provide source text for a finer sketch.</p>
            <button
              type="submit"
              disabled={loading || !topic.trim()}
              className="bg-[#0A0A0A] hover:bg-[#694AFF] text-white font-black py-5 px-12 rounded-2xl shadow-2xl shadow-black/10 hover:shadow-[#694AFF]/20 hover:-translate-y-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-4 active:scale-95 text-xs uppercase tracking-[0.3em]"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={20} />}
              {loading ? 'Drafting...' : 'Begin Work'}
            </button>
          </div>
        </form>
        {error && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-red-500 mt-6 px-8 text-center font-bold bg-red-500/10 py-3 rounded-2xl border border-red-500/20"
          >
            {error}
          </motion.p>
        )}
      </div>

      <AnimatePresence>
        {notes && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            {/* Document Header */}
            <div className="glass-card rounded-[3rem] p-12 border-white/10 shadow-3xl relative">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-2 border-slate-100 dark:border-white/5 pb-10 mb-10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"></span>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Generated by Kaksha AI</p>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {notes.title || 'Mastery Guide'}
                  </h2>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 transition-all font-bold"
                  >
                    {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all font-bold group">
                    <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Document Content */}
              <div className="grid grid-cols-1 gap-12">
                {notes.headings?.map((section, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 to-transparent"></div>
                    <div className="absolute left-[-12px] top-1 w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-black text-[10px] shadow-lg shadow-indigo-500/30">
                      {idx + 1}
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white/90 mb-6 tracking-tight">
                      {section.heading}
                    </h3>
                    
                    <ul className="space-y-6">
                      {section.points?.map((point, pIdx) => (
                        <li key={pIdx} className="group flex items-start gap-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-all">
                          <div className="mt-2.5 w-2 h-2 rounded-full bg-indigo-500/40 group-hover:bg-indigo-500 transition-colors"></div>
                          <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -z-10 top-20 left-1/2 -translate-x-1/2 w-full h-[80%] bg-indigo-600/5 blur-[120px] rounded-full"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotesGenerator;
