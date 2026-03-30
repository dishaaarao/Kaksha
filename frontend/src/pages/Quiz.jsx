import { useState } from 'react';
import axios from 'axios';
import { CheckSquare, Loader2, Send, ChevronRight, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Quiz = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuiz = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/generate-quiz', { text: topic }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setQuiz(res.data);
      setUserAnswers({});
      setSubmitted(false);
      setScore(0);
    } catch (err) {
      console.error(err);
      alert('Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qIndex, option) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const submitQuiz = () => {
    let newScore = 0;
    quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 font-outfit">
      <div className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-6xl font-black text-[#0A0A0A] dark:text-white flex items-center gap-4 italic uppercase leading-none tracking-tighter">
            <div className="bg-[#72E3C6]/10 text-[#72E3C6] p-3 rounded-2xl border border-[#72E3C6]/20">
              <CheckSquare size={32} />
            </div>
            The <span className="text-[#0D9488]">Critique</span>
          </h1>
          <p className="text-xl text-[#0A0A0A]/40 dark:text-white/40 mt-4 font-bold tracking-tight">
            Test your vision. AI-sculpted challenges to sharpen your mastery.
          </p>
        </div>
      </div>

      {!quiz.length ? (
        <div className="glass-card rounded-[3rem] p-6 shadow-2xl border-black/5 dark:border-white/5 relative overflow-hidden group">
          <form onSubmit={generateQuiz} className="relative z-10 flex flex-col gap-6">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#F2F0E7]/50 dark:bg-white/5 border-2 border-transparent rounded-[2.5rem] p-8 text-xl text-[#0A0A0A] dark:text-white focus:border-[#72E3C6]/30 outline-none resize-none transition-all min-h-[160px] font-bold tracking-tight placeholder:opacity-30"
              placeholder="E.g., World War II history, Quantum Mechanics..."
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className="bg-[#0A0A0A] hover:bg-[#72E3C6] text-white font-black py-5 px-12 rounded-2xl shadow-2xl shadow-black/10 hover:shadow-[#72E3C6]/20 hover:-translate-y-1 transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-4 active:scale-95 text-xs uppercase tracking-[0.3em]"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={20} />}
                {loading ? 'Curating...' : 'Begin Critique'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {submitted && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card rounded-2xl p-8 mb-8 text-center bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500/20"
            >
              <Award size={64} className="text-orange-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Quiz Completed!</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                You scored <span className="font-bold text-orange-600 dark:text-orange-400">{score}</span> out of {quiz.length}
              </p>
              <button
                onClick={() => setQuiz([])}
                className="mt-6 font-medium text-orange-600 dark:text-orange-400 hover:underline"
              >
                Create another quiz
              </button>
            </motion.div>
          )}

          <div className="space-y-8">
            {quiz.map((q, qIndex) => (
              <div key={qIndex} className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex gap-3">
                  <span className="text-orange-500">{qIndex + 1}.</span> {q.question}
                </h3>
                <div className="space-y-3">
                  {q.options.map((opt, oIndex) => {
                    const isSelected = userAnswers[qIndex] === opt;
                    const isCorrect = opt === q.answer;
                    
                    let optionClass = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:shadow-sm";
                    
                    if (submitted) {
                       if (isCorrect) {
                         optionClass = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 shadow-sm";
                       } else if (isSelected && !isCorrect) {
                         optionClass = "bg-red-50 dark:bg-red-900/20 border-red-500";
                       } else {
                         optionClass = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50";
                       }
                    } else if (isSelected) {
                       optionClass = "bg-orange-50 dark:bg-orange-500/10 border-orange-500 shadow-sm";
                    }

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleSelectOption(qIndex, opt)}
                        disabled={submitted}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium text-slate-700 dark:text-slate-200 flex items-center justify-between ${optionClass}`}
                      >
                        {opt}
                        {submitted && isCorrect && <span className="text-emerald-500 font-bold ml-4 border-emerald-500">Correct</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {!submitted && (
            <div className="flex justify-end pt-4">
              <button
                onClick={submitQuiz}
                disabled={Object.keys(userAnswers).length !== quiz.length}
                className="py-4 px-8 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 shadow-lg shadow-orange-600/20 flex items-center gap-2"
              >
                Submit Answers <ChevronRight size={20} />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
