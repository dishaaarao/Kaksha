import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Palette, Sparkles, ArrowRight } from 'lucide-react';

const Signup = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/auth/signup`, {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsAuthenticated?.(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col lg:flex-row font-outfit text-[#1D1D1F] selection:bg-black/5">
      
      {/* 🎨 LEFT COL - CREATIVE INSPIRATION (Procreate Vibe) */}
      <div className="hidden lg:flex w-1/2 bg-[#1D1D1F] p-24 flex-col justify-between relative overflow-hidden">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img src="https://education.procreate.com/img/images/art-of-learning.png?w=1200" className="w-full h-full object-contain scale-150 rotate-12" alt="" />
         </div>
         
         <div className="relative z-10 flex flex-col gap-6">
            <Link to="/" className="text-white text-3xl font-black tracking-[-0.04em] uppercase">kaksha</Link>
            <span className="text-white/40 font-bold uppercase tracking-[0.4em] text-xs">creative fuel for students</span>
         </div>

         <div className="relative z-10">
            <h2 className="text-[6rem] font-black text-white leading-none tracking-[-0.05em] uppercase italic mb-12">
               The Art of <br />
               Potential.
            </h2>
            <p className="text-2xl text-white/50 font-medium max-w-sm leading-tight tracking-tight">
               Every student is an artist, and every lesson is a masterpiece waiting to be born.
            </p>
         </div>

         <div className="relative z-10 text-white/20 font-black text-[12vw] leading-none select-none lowercase absolute -bottom-10 -left-10">create</div>
      </div>

      {/* 📝 RIGHT COL - THE FORM (Clean Minimalist) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-white p-16 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-black/5 relative overflow-hidden"
         >
            {/* Form Sparkle */}
            <div className="absolute top-10 right-10 text-[#FF6DDF] opacity-20"><Sparkles size={40} /></div>

            <div className="mb-14 text-center lg:text-left">
               <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase italic">Create your masterpiece</h3>
               <p className="text-xl font-bold opacity-40">Join the KAKSHA community and start your journey.</p>
            </div>

            {error && (
               <div className="bg-red-50 text-red-600 p-6 rounded-3xl mb-10 font-bold text-sm tracking-tight border border-red-100 italic">
                  — {error}
               </div>
            )}

            <form onSubmit={handleSignup} className="space-y-8">
               <div className="space-y-6">
                  <div className="relative">
                     <p className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-3 ml-6">name</p>
                     <input 
                        type="text" 
                        placeholder="e.g. Pablo Picasso" 
                        required 
                        className="w-full h-18 bg-[#F7F7F7] px-8 py-5 rounded-full border-[3px] border-transparent focus:border-black transition-all outline-none font-bold text-lg"
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                     />
                  </div>
                  <div className="relative">
                     <p className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-3 ml-6">email</p>
                     <input 
                        type="email" 
                        placeholder="e.g. artist@kaksha.art" 
                        required 
                        className="w-full h-18 bg-[#F7F7F7] px-8 py-5 rounded-full border-[3px] border-transparent focus:border-black transition-all outline-none font-bold text-lg"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                     />
                  </div>
                  <div className="relative">
                     <p className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-3 ml-6">password</p>
                     <input 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        className="w-full h-18 bg-[#F7F7F7] px-8 py-5 rounded-full border-[3px] border-transparent focus:border-black transition-all outline-none font-bold text-lg"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                     />
                  </div>
                  <div className="relative">
                     <p className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-3 ml-6">confirm password</p>
                     <input 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        className="w-full h-18 bg-[#F7F7F7] px-8 py-5 rounded-full border-[3px] border-transparent focus:border-black transition-all outline-none font-bold text-lg"
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                     />
                  </div>
               </div>

               <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full py-7 rounded-full bg-black text-white font-black text-sm uppercase tracking-[0.4em] hover:bg-[#FF6DDF] transition-all duration-700 shadow-2xl active:scale-95 disabled:opacity-50 mt-10"
               >
                  {loading ? 'Creating...' : 'Launch Kaksha'}
               </button>
            </form>

            <div className="mt-14 text-center">
               <p className="font-bold opacity-30 text-sm italic">
                  Already have an account? <Link to="/login" className="text-black underline underline-offset-8 inline-flex items-center gap-2 hover:text-[#FF6DDF] transition-colors">Start here <ArrowRight size={14} /></Link>
               </p>
            </div>
         </motion.div>
      </div>
    </div>
  );
};

export default Signup;
