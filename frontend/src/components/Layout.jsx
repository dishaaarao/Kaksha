import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Sun, Moon, User, Bell, Search } from 'lucide-react';

const Layout = ({ darkMode, toggleDarkMode, isAuthenticated }) => {
  if (!isAuthenticated && !localStorage.getItem('token')) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const userName = JSON.parse(localStorage.getItem('user'))?.name || 'Explorer';

  return (
    <div className="flex h-screen bg-[#F4F1EA] dark:bg-[#0A0A0E] transition-colors duration-700 overflow-hidden font-outfit selection:bg-[#6D4AFF] selection:text-white">
      
      {/* Signature Peppermint Grain/Mesh Overlays */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-10 z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full bg-[#FF6DDF] blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#72E3C6] blur-[180px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Sidebar onLogout={handleLogout} />
      
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Elite Top Header */}
        <header className="h-24 flex items-center justify-between px-12 border-b border-[#110C24]/5 dark:border-white/5 bg-white/20 dark:bg-black/20 backdrop-blur-2xl sticky top-0 z-[100] transition-all duration-500">
          <div className="flex flex-col">
            <h2 className="text-2xl font-black text-[#110C24] dark:text-white tracking-tighter leading-none italic uppercase">
               Greetings, <span className="text-[#694AFF]">{userName}</span>
            </h2>
            <p className="text-[10px] font-black text-[#110C24]/30 dark:text-white/30 mt-2 uppercase tracking-[0.4em]">Elite Scholar session active</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-[#110C24]/5 dark:bg-white/5 px-6 py-3 rounded-full border border-[#110C24]/5 group focus-within:bg-white transition-all cursor-text">
               <Search size={16} className="text-[#110C24]/30" />
               <input type="text" placeholder="Search your vault..." className="bg-transparent border-none outline-none text-xs font-bold text-[#110C24] placeholder:text-[#110C24]/30 w-48" />
            </div>

            <button
               className="p-4 rounded-full bg-[#110C24]/5 dark:bg-white/5 text-[#110C24]/40 hover:scale-110 transition-transform relative"
            >
               <Bell size={20} />
               <div className="absolute top-3 right-3 w-2 h-2 bg-[#FF6DDF] rounded-full border-2 border-[#F4F1EA]"></div>
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-4 rounded-full bg-[#110C24] text-white hover:scale-110 transition-transform shadow-xl shadow-[#110C24]/20"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-12 md:p-16 relative scroll-smooth no-scrollbar">
          <div className="max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-[0.16, 1, 0.3, 1]">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
