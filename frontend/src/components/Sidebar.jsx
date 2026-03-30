import { NavLink } from 'react-router-dom';
import { BookOpen, MessageSquare, FileText, CheckSquare, AlignLeft, Grid, LogOut, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ onLogout }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Grid size={22} /> },
    { name: 'AI Notes', path: '/notes', icon: <FileText size={22} /> },
    { name: 'Flashcards', path: '/flashcards', icon: <BookOpen size={22} /> },
    { name: 'AI Quiz', path: '/quiz', icon: <CheckSquare size={22} /> },
    { name: 'Summary', path: '/summary', icon: <AlignLeft size={22} /> },
    { name: 'Chat Tutor', path: '/chat', icon: <MessageSquare size={22} /> },
  ];

  return (
    <aside className="w-80 h-screen bg-[#110C24] dark:bg-[#0A0A0E] text-white flex flex-col transition-all duration-500 overflow-hidden font-outfit border-r border-white/5 shadow-2xl z-50">
      
      {/* Brand Section */}
      <div className="p-10 mb-8">
        <NavLink to="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#110C24] shadow-2xl transition-transform group-hover:rotate-12 duration-500">
            <span className="text-2xl font-black italic tracking-tighter">K</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tighter leading-none lowercase group-hover:text-[#694AFF] transition-colors">
               kaksha
            </h1>
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-white/50 transition-colors">
               Premium AI
            </span>
          </div>
        </NavLink>
      </div>

      <nav className="flex-1 px-6 space-y-3 overflow-y-auto no-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-5 px-8 py-5 rounded-[2.5rem] transition-all duration-500 group relative ${
                isActive
                  ? 'bg-[#694AFF] text-white shadow-[0_20px_40px_rgba(105,74,255,0.3)] scale-[1.02]'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`transition-all duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </div>
                <span className="font-black text-sm uppercase tracking-widest">{item.name}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 rounded-[2.5rem] blur-xl opacity-50 pointer-events-none"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Profile/Logout */}
      <div className="p-6 mt-auto">
        <div className="p-6 bg-white/5 rounded-[3rem] mb-6 flex items-center gap-4 border border-white/5 relative overflow-hidden group transition-all hover:bg-white/10">
           <div className="w-12 h-12 rounded-full bg-[#A89EFF] flex items-center justify-center font-black animate-pulse">
              DR
           </div>
           <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-black truncate">Disha Rao</span>
              <span className="text-[10px] uppercase tracking-widest text-[#72E3C6] font-black">Pro Scholar</span>
           </div>
           <div className="absolute top-[-20%] right-[-10%] w-16 h-16 bg-[#694AFF]/20 blur-xl rounded-full"></div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-4 px-8 py-5 w-full rounded-full bg-white/5 text-white/40 hover:bg-red-500/10 hover:text-red-400 font-black transition-all duration-500 uppercase tracking-widest text-xs group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Surrender Session</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
