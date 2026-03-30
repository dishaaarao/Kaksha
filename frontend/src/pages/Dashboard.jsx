import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, FileText, CheckSquare, AlignLeft, ArrowRight, Sparkles, TrendingUp, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { name: 'AI Notes', path: '/notes', icon: <FileText size={24} />, desc: 'Transform raw thoughts into structured masterpieces.', color: 'bg-white', text: 'text-[#0A0A0A]', accent: 'text-[#694AFF]' },
  { name: 'Flashcards', path: '/flashcards', icon: <BookOpen size={24} />, desc: 'Sketch 5 power cards to etch concepts in your mind.', color: 'bg-[#FFD3F8]', text: 'text-[#0A0A0A]', accent: 'text-[#FF6DDF]' },
  { name: 'AI Quiz', path: '/quiz', icon: <CheckSquare size={24} />, desc: 'Test your vision with AI-sculpted challenges.', color: 'bg-[#72E3C6]', text: 'text-[#0A0A0A]', accent: 'text-[#0D9488]' },
  { name: 'Summary', path: '/summary', icon: <AlignLeft size={24} />, desc: 'Condense long narratives into essential strokes.', color: 'bg-[#A89EFF]', text: 'text-white', accent: 'text-white' },
  { name: 'Chat Tutor', path: '/chat', icon: <MessageSquare size={24} />, desc: 'Consult your mentor 24/7 in the digital studio.', color: 'bg-[#0A0A0A]', text: 'text-white', accent: 'text-[#72E3C6]' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 25, stiffness: 120 }
  }
};

const Dashboard = () => {
  const userName = JSON.parse(localStorage.getItem('user'))?.name || 'Artist';

  return (
    <div className="py-10 pb-24 font-outfit">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="px-5 py-2 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white text-[10px] font-black uppercase tracking-[0.3em] border border-black/10 dark:border-white/10">
            Studio Live
          </span>
          <Sparkles className="text-[#FFD3A3]" size={18} />
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black text-[#0A0A0A] dark:text-white mb-8 tracking-tighter leading-[0.8] italic uppercase">
          Welcome <br/>
          <span className="text-[#694AFF]">
            {userName}
          </span>
        </h1>
        
        <p className="text-2xl text-[#0A0A0A]/60 dark:text-white/60 max-w-2xl font-bold leading-tight tracking-tight">
          Your personal AI Atelier is ready. <br/>Select a tool and begin your masterpiece.
        </p>
      </motion.div>

      {/* Stats Quick View - Refined Studio Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: <TrendingUp size={22}/>, label: 'Creation Streak', value: '5 Days', color: 'bg-[#FF6DDF]', text: 'text-[#0A0A0A]' },
          { icon: <Zap size={22}/>, label: 'Studio Power', value: 'Maximized', color: 'bg-[#72E3C6]', text: 'text-[#0A0A0A]' },
          { icon: <Clock size={22}/>, label: 'Art Time', value: '12.5h', color: 'bg-[#A89EFF]', text: 'text-white' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i*0.1 }}
            className={`${stat.color} rounded-[3rem] p-10 flex flex-col gap-6 shadow-2xl transition-transform hover:-translate-y-2 cursor-default border border-black/5`}
          >
            <div className={`w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white`}>
              {stat.icon}
            </div>
            <div>
              <p className={`text-[11px] font-black uppercase tracking-[0.4em] opacity-40 mb-2 ${stat.text}`}>{stat.label}</p>
              <p className={`text-5xl font-black leading-none ${stat.text} tracking-tighter italic uppercase`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Link to={feature.path} className="block group h-full">
              <div className={`${feature.color} rounded-[4rem] p-12 h-full transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative overflow-hidden flex flex-col justify-between border border-black/5 hover:border-black/10 shadow-sm`}>
                <div>
                   <div className={`w-20 h-20 rounded-[2.5rem] bg-[#0A0A0A]/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-700`}>
                      <span className={`${feature.accent}`}>{feature.icon}</span>
                   </div>
                   <h3 className={`text-4xl font-black mb-6 tracking-tighter leading-none italic uppercase ${feature.text}`}>
                     {feature.name}
                   </h3>
                   <p className={`font-bold text-lg mb-10 leading-relaxed opacity-60 ${feature.text}`}>
                     {feature.desc}
                   </p>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className={`font-black text-[12px] uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity ${feature.text}`}>Enter Studio</span>
                  <div className={`w-14 h-14 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-12`}>
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Decorative Vignette Overlay */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000`}></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
