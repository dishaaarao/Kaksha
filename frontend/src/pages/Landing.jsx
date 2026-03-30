import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const Landing = () => {
  const { scrollYProgress } = useScroll();
  const [openFaq, setOpenFaq] = useState(null);
  const [studentIndex, setStudentIndex] = useState(0);

  // Student Slideshow Logic - High-Res User Provided Images
  const studentImages = [
    "/images/student1.jpg",
    "/images/student2.jpg",
    "/images/student3.png",
    "/images/student4.png"
  ];
  
  // High-Fidelity Motion Config
  const springConfig = { stiffness: 60, damping: 20, restDelta: 0.001 };
  const yParallax = useSpring(useTransform(scrollYProgress, [0, 0.4], [0, -80]), springConfig);

  useEffect(() => {
    const timer = setInterval(() => {
       setStudentIndex(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const faqs = [
    { q: "Is Kaksha AI effective for all subjects?", a: "Yes! Our AI models are trained on diverse academic datasets ranging from STEM to Humanities, ensuring high-quality notes for any field of study." },
    { q: "Can I download my notes for offline study?", a: "Absolutely. You can export your notes to PDF, Markdown, or even sync them directly to your favorite note-taking apps." },
    { q: "How are the flashcards generated?", a: "We use advanced NLP to extract key concepts, definitions, and formulas from your study materials, creating cards optimized for active recall." }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-outfit overflow-x-hidden selection:bg-[#E5E5E5]">
      
      {/* FIXED HEADER - ULTRA CLEAN */}
      <nav className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-10 md:px-24 z-[100] bg-white/90 backdrop-blur-2xl border-b border-black/5">
         <div className="flex items-center gap-6 group cursor-pointer">
            <span className="text-2xl font-black tracking-[-0.04em] text-black uppercase">kaksha</span>
         </div>
         <div className="hidden md:flex items-center gap-14 font-black text-[11px] tracking-[0.2em] opacity-50 uppercase">
            <Link to="/about" className="hover:opacity-100 transition-opacity">About</Link>
            <a href="#" className="hover:opacity-100 transition-opacity">Education</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Support</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Community</a>
         </div>
         <div className="flex items-center gap-3">
            <Link
               to="/login"
               className="flex items-center gap-3 font-black text-xs uppercase tracking-[0.3em] bg-transparent text-black px-8 py-3 rounded-full border border-black/10 hover:border-black/30 hover:bg-black/5 transition-all"
            >
               Login <ArrowUpRight size={14} />
            </Link>
            <Link
               to="/signup"
               className="flex items-center gap-3 font-black text-xs uppercase tracking-[0.3em] bg-black text-white px-8 py-3 rounded-full hover:bg-[#694AFF] transition-all"
            >
               Signup <ArrowUpRight size={14} />
            </Link>
         </div>
      </nav>

      {/* 1. HERO SECTION - CLEAN & CENTERED */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center bg-white overflow-hidden pt-12">
         
         {/* MAIN HERO STACK */}
         <div className="relative z-20 w-full max-w-[1200px] mx-auto flex flex-col items-center">
            
            <h1 className="sr-only">The Art of Learning - Kaksha AI Study Assistant</h1>
            
            <div className="relative w-full flex items-center justify-center mb-10">
               <motion.img 
                  style={{ y: yParallax }}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src="https://education.procreate.com/img/images/art-of-learning.png?w=1800&s=ed72e485fe1966a41995e9d1caa7468e" 
                  className="w-full md:w-[74%] h-auto object-contain z-10 select-none pointer-events-none" 
                  alt="The Art of Learning Illustration" 
               />
            </div>

            {/* Subheading - Refined Scale */}
            <div className="relative z-30 flex flex-col items-center">
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="flex flex-col items-center"
               >
                  <p className="text-base md:text-lg font-bold max-w-xl mx-auto mb-8 leading-snug opacity-30 tracking-tight text-black">
                     Study smarter, not harder. Kaksha transforms your lecture notes <br className="hidden md:block"/> into structured masterpieces instantly using high-performance AI.
                  </p>

                  <div className="flex items-center gap-4">
                     <Link to="/signup" className="px-10 py-4 rounded-full bg-black text-white font-black text-[9px] uppercase tracking-[0.4em] hover:bg-[#694AFF] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)] active:scale-95">
                        Signup
                     </Link>
                     <Link to="/login" className="px-10 py-4 rounded-full bg-transparent text-black font-black text-[9px] uppercase tracking-[0.4em] border border-black/10 hover:border-black/30 hover:bg-black/5 transition-all active:scale-95">
                        Login
                     </Link>
                  </div>
               </motion.div>
            </div>
         </div>

         {/* Scroll Indicator */}
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
         >
            <ChevronDown size={24} className="animate-bounce" />
         </motion.div>
      </section>

      {/* 2. IGNITE SECTION - THE IPAD SHOWCASE */}
      <section className="bg-white py-48 md:py-80 px-10 md:px-24 border-b border-black/5">
         <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-left">
            
            <div className="relative order-2 lg:order-1">
               <img 
                  src="https://education.procreate.com/images/ignite-md.jpg" 
                  className="w-full h-auto rounded-[3.5rem] shadow-[0_80px_150px_rgba(0,0,0,0.08)] border border-black/5" 
                  alt="" 
               />
            </div>

            <div className="flex flex-col items-start px-2 order-1 lg:order-2">
               <span className="text-[#A89EFF] font-black text-[12px] tracking-[0.5em] uppercase mb-12 block">Absolute Mastery</span>
               <h2 className="text-[3.5rem] md:text-[5rem] font-bold leading-[0.9] tracking-[-0.05em] mb-12 italic">
                  Accelerate <br /> your exams.
               </h2>
               <p className="text-lg md:text-xl font-bold opacity-30 leading-snug tracking-tight mb-20 max-w-xl">
                  Notes come to life with Kaksha. Effortlessly convert complex topics into interactive study guides, flashcards, and quizzes designed for your success.
               </p>
               
               <div className="flex gap-20 py-16 border-t border-black/5 w-full">
                  <div>
                     <span className="text-4xl font-black mb-2 block tracking-tighter italic">10k+</span>
                     <span className="text-[10px] font-black uppercase opacity-30 tracking-widest">Studying hours saved</span>
                  </div>
                  <div>
                     <span className="text-4xl font-black mb-2 block leading-none italic">A+</span>
                     <span className="text-[10px] font-black uppercase opacity-30 tracking-widest">Academic Excellence</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. INTERACTIVE EXPERIENCE - STUDIO EDITION */}
      <section className="relative h-[80vh] md:h-screen w-full overflow-hidden flex items-center justify-center bg-[#0A0A0A] py-32 px-10 md:px-24">
         
         {/* BACKGROUND MASKED TEXT LAYERS */}
         <div className="absolute inset-0 flex flex-col justify-center gap-4 md:gap-8 select-none pointer-events-none">
            
            {/* ROW 1: STATIC/AUTO SCROLL */}
            <div className="flex whitespace-nowrap opacity-10">
               <motion.div 
                  animate={{ x: [0, -1200] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="text-[8rem] md:text-[14rem] font-black text-[#F2F0E7] uppercase tracking-tighter leading-none pr-32"
               >
                  Learning Learning Learning Learning
               </motion.div>
            </div>

            {/* ROW 2: CURSOR INTERACTIVE (BEIGE FOCUS) */}
            <div className="flex whitespace-nowrap relative z-10 transition-transform duration-75">
               <motion.div 
                  style={{ x: useSpring(useTransform(scrollYProgress, [0.4, 0.7], [0, -500]), springConfig) }}
                  className="text-[8rem] md:text-[14rem] font-black italic text-[#F2F0E7] uppercase tracking-tighter leading-none"
               >
                  Mastery Mastery Mastery Mastery
               </motion.div>
            </div>

            {/* ROW 3: REVERSE AUTO SCROLL */}
            <div className="flex whitespace-nowrap opacity-5">
               <motion.div 
                  animate={{ x: [-1200, 0] }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                  className="text-[8rem] md:text-[14rem] font-black text-[#F2F0E7] uppercase tracking-tighter leading-none pr-32"
               >
                  Draftsman Draftsman Draftsman Draftsman
               </motion.div>
            </div>
         </div>

         {/* CENTRAL CIRCULAR PORTRAIT WITH SLIDESHOW */}
         <motion.div 
            initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-[240px] h-[240px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-[8px] md:border-[16px] border-[#F2F0E7] shadow-[0_100px_150px_rgba(0,0,0,0.8)] bg-white"
         >
            <AnimatePresence mode="wait">
               <motion.img 
                  key={studentIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                     duration: 0.8, 
                     ease: [0.16, 1, 0.3, 1]
                  }}
                  src={studentImages[studentIndex]} 
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" 
                  alt="Student Studying" 
               />
            </AnimatePresence>
         </motion.div>

         {/* Floating Badge - Minimalist */}
         <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-20 bg-[#F2F0E7] text-black p-8 rounded-[2.5rem] shadow-2xl z-30 hidden lg:block"
         >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] block mb-2 opacity-30 text-center">Kaksha Exclusive</span>
            <span className="text-xl font-black italic uppercase leading-none text-center block">The New standard<br/>of study</span>
         </motion.div>
      </section>

      {/* 4. FINAL FAQ & FOOTER */}
      <section className="bg-[#F9F9F9] pt-64 pb-32 px-10 md:px-24 relative rounded-t-[100px] mt-24">
         <div className="max-w-4xl mx-auto mb-64 relative z-10 text-center">
            <h2 className="text-[6rem] md:text-[8rem] font-bold tracking-[-0.05em] mb-32 opacity-10 uppercase italic">Questions?</h2>
            <div className="space-y-8 text-left">
               {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-[3rem] p-12 cursor-pointer shadow-sm border border-black/5" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                     <div className="flex justify-between items-center px-4">
                        <span className="text-2xl font-black tracking-tight uppercase italic opacity-80">{faq.q}</span>
                        <div className={`p-4 rounded-full transition-transform duration-700 ${openFaq === i ? 'rotate-180 opacity-100' : 'opacity-20'}`}>
                          <ChevronDown size={32} />
                        </div>
                     </div>
                     <AnimatePresence>
                        {openFaq === i && (
                           <motion.p 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-10 px-4 text-xl font-bold opacity-40 leading-relaxed max-w-4xl"
                           >
                              {faq.a}
                           </motion.p>
                        )}
                     </AnimatePresence>
                  </div>
               ))}
            </div>
         </div>

         <div className="max-w-7xl mx-auto pt-32 flex flex-col items-center gap-24 border-t border-black/5">
            <span className="text-[120px] md:text-[180px] font-black tracking-[-0.07em] opacity-5 leading-none select-none">kaksha</span>
            
            <div className="w-full flex justify-between items-center font-black text-[10px] uppercase tracking-[0.5em] opacity-30">
               <span>© 2026 KAKSHA</span>
               <div className="flex gap-12">
                  <Link to="/about" className="hover:opacity-100 transition-opacity">Framework</Link>
                  <a href="#" className="hover:opacity-100 transition-opacity">Legal</a>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Landing;
