import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, User, Lock } from 'lucide-react';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated?.(true);
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, setIsAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsAuthenticated?.(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center p-8 md:p-16 font-outfit text-[#1D1D1F] selection:bg-black/5">
      
      {/* Background Subtle Watermark */}
      <div className="absolute top-[10%] left-[-10%] opacity-10 font-black text-[25vw] pointer-events-none select-none lowercase leading-none">hello</div>
      <div className="absolute bottom-[10%] right-[-10%] opacity-10 font-black text-[25vw] pointer-events-none select-none lowercase leading-none rotate-12">again</div>

      <motion.div 
         initial={{ opacity: 0, scale: 0.95, y: 30 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         className="w-full max-w-lg bg-white p-14 md:p-20 rounded-[4rem] shadow-[0_50px_150px_rgba(0,0,0,0.06)] relative overflow-hidden flex flex-col items-center"
      >
         {/* Form Decor */}
         <div className="absolute top-10 left-10 text-[#FF6DDF] opacity-20 rotate-12"><Sparkles size={32} /></div>
         <div className="absolute top-[20%] right-[-40px] w-24 h-24 rounded-full bg-[#FF6DDF]/5 border-[3px] border-[#FF6DDF]/20 blur-xl"></div>

         <div className="mb-14 text-center">
            <Link to="/" className="text-2xl font-black mb-10 block opacity-90 uppercase tracking-tighter italic">kaksha</Link>
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase italic leading-tight tracking-tight">The Art of <br /> Return</h2>
            <p className="text-base font-bold opacity-30 tracking-tight uppercase">Continue your creative learning journey.</p>
         </div>

         {error && (
            <div className="w-full bg-red-50 text-red-600 p-6 rounded-3xl mb-10 font-bold text-sm tracking-tight border border-red-100 italic transition-all">
               — {error}
            </div>
         )}

         <form onSubmit={handleLogin} className="w-full space-y-8">
            <div className="space-y-6">
               <div className="relative group">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-3 ml-6">your email</p>
                  <div className="relative">
                     <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20"><User size={20} /></span>
                     <input 
                        type="email" 
                        placeholder="artist@kaksha.art" 
                        required 
                        className="w-full h-18 bg-[#F7F7F7] pl-16 pr-8 py-5 rounded-full border-[3px] border-transparent focus:border-black transition-all outline-none font-bold text-lg group-hover:bg-[#E5E5E5]"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                     />
                  </div>
               </div>
               
               <div className="relative group">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-3 ml-6">password</p>
                  <div className="relative">
                     <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20"><Lock size={20} /></span>
                     <input 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        className="w-full h-18 bg-[#F7F7F7] pl-16 pr-8 py-5 rounded-full border-[3px] border-transparent focus:border-black transition-all outline-none font-bold text-lg group-hover:bg-[#E5E5E5]"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                     />
                  </div>
                  <div className="mt-4 flex justify-end">
                     <a href="#" className="text-xs font-black opacity-30 hover:opacity-100 transition-opacity uppercase tracking-widest italic underline underline-offset-4">Forgot artwork?</a>
                  </div>
               </div>
            </div>

            <button 
               disabled={loading}
               type="submit" 
               className="w-full py-7 rounded-full bg-black text-white font-black text-sm uppercase tracking-[0.4em] hover:bg-[#FF6DDF] transition-all duration-700 shadow-2xl active:scale-95 disabled:opacity-50 mt-4"
            >
               {loading ? 'Authenticating...' : 'Enter Masterpiece'}
            </button>
         </form>

         <div className="mt-14 text-center">
            <p className="font-bold opacity-30 text-sm italic">
               First time here? <Link to="/signup" className="text-black underline underline-offset-8 inline-flex items-center gap-2 hover:text-[#FF6DDF] transition-colors">Start creation <ArrowRight size={14} /></Link>
            </p>
         </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-12 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
         © 2026 KAKSHA / ALL CANVAS PROTECTED.
      </div>
    </div>
  );
};

export default Login;
