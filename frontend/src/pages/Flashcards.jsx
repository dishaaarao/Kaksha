import { useState } from 'react';
import axios from 'axios';
import { BookOpen, Loader2, Send, Save, ArrowRight, ArrowLeft, RotateCw, Sparkles, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Flashcards = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const generateFlashcards = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/generate-flashcards', { text: topic }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFlashcards(res.data);
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to generate flashcards');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 50);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 50);
    }
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="max-w-5xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#0A0A0A] text-white shadow-2xl mb-6">
          <BookOpen size={36} />
        </div>
        <h1 className="text-6xl font-black text-[#0A0A0A] dark:text-white tracking-tighter mb-4 italic uppercase leading-none">
          The <span className="text-[#FF6DDF]">Flashcard</span>
        </h1>
        <p className="text-xl text-[#0A0A0A]/40 dark:text-white/40 max-w-2xl mx-auto font-bold tracking-tight">
          Etch concept cards in your mind. 10x faster recall with AI-sculpted decks.
        </p>
      </motion.div>

      {!flashcards.length ? (
        <div className="glass-card rounded-[3rem] p-6 shadow-2xl border-black/5 dark:border-white/5 relative overflow-hidden group">
          <form onSubmit={generateFlashcards} className="relative z-10 flex flex-col gap-6">
            <div className="relative">
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#F2F0E7]/50 dark:bg-white/5 border-2 border-transparent rounded-[2.5rem] p-8 text-xl text-[#0A0A0A] dark:text-white focus:border-[#FF6DDF]/30 outline-none resize-none transition-all min-h-[220px] font-bold tracking-tight placeholder:opacity-30"
                placeholder="What concepts shall we sketch today? (e.g., Photosynthesis, Civil Law...)"
              />
              <div className="absolute top-8 right-10 opacity-20">
                <Sparkles size={28} className="text-[#FF6DDF] animate-pulse" />
              </div>
            </div>
            <div className="flex justify-between items-center px-6">
              <p className="text-sm font-black text-[#0A0A0A]/30 uppercase tracking-widest italic tracking-wider">Tip: Be descriptive for more precise cards.</p>
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className="bg-[#0A0A0A] hover:bg-[#FF6DDF] text-white font-black py-5 px-12 rounded-2xl shadow-2xl shadow-black/10 hover:shadow-[#FF6DDF]/20 hover:-translate-y-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-4 active:scale-95 text-xs uppercase tracking-[0.3em]"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={20} />}
                {loading ? 'Sculpting...' : 'Ignite Canvas'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl mb-8 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
               <span className="px-5 py-2 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 font-black text-xs uppercase tracking-widest border border-slate-200 dark:border-white/5">
                Card {currentIndex + 1} / {flashcards.length}
              </span>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {setFlashcards([]); setTopic('');}}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-purple-500 hover:bg-purple-500/10 transition-all border border-slate-200 dark:border-white/5"
              >
                <RefreshCcw size={20} />
              </button>
              <button className="flex items-center gap-2 px-6 py-2 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/20 font-bold transition-all text-sm">
                <Save size={18} /> Save Deck
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ x: direction * 100, opacity: 0, rotateY: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="w-full max-w-2xl h-[450px] perspective-2000 cursor-pointer mb-12"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div 
                  className="absolute inset-0 backface-hidden glass-card rounded-[3rem] p-16 flex flex-col items-center justify-center text-center border-4 border-purple-500/10 shadow-[0_20px_50px_rgba(139,92,246,0.15)] bg-white dark:bg-slate-900 group"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute top-12 px-6 py-1 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Question</div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight group-hover:scale-105 transition-transform duration-500">
                    {currentCard.question}
                  </h2>
                  <div className="absolute bottom-12 flex items-center gap-3 text-slate-400 font-black text-xs uppercase tracking-widest animate-pulse">
                    <RotateCw size={16} /> Click to reveal answer
                  </div>
                </div>

                {/* Back */}
                <div 
                  className="absolute inset-0 backface-hidden glass-card rounded-[3rem] p-16 flex flex-col items-center justify-center text-center border-4 border-emerald-500/10 shadow-[0_20px_50px_rgba(16,185,129,0.15)] bg-gradient-to-br from-emerald-500/[0.03] to-white dark:to-slate-900"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                   <div className="absolute top-12 px-6 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Answer</div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed tracking-tight">
                    {currentCard.answer}
                  </p>
                  <div className="absolute bottom-12 flex items-center gap-3 text-slate-400 font-black text-xs uppercase tracking-widest">
                    <RotateCw size={16} /> Click to flip back
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-8 bg-white/40 dark:bg-slate-900/40 p-3 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-xl">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 text-slate-600 hover:text-purple-600 hover:scale-110 disabled:opacity-20 disabled:scale-100 transition-all flex items-center justify-center shadow-lg active:scale-90"
            >
              <ArrowLeft size={28} />
            </button>
            <div className="flex flex-col items-center min-w-[100px]">
              <div className="flex gap-1 mb-1">
                {flashcards.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-purple-500' : 'w-1.5 bg-slate-200 dark:bg-slate-700'}`}
                  ></div>
                ))}
              </div>
            </div>
            <button
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
              className="w-16 h-16 rounded-full bg-purple-600 text-white hover:bg-purple-700 hover:scale-110 disabled:opacity-20 disabled:scale-100 transition-all flex items-center justify-center shadow-[0_10px_30px_rgba(147,51,234,0.4)] active:scale-90"
            >
              <ArrowRight size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
