import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Palette, PenTool, Globe, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AboutUs = () => {
  const { scrollYProgress } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const springConfig = { stiffness: 60, damping: 20, restDelta: 0.001 };
  const yHero = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, -60]), springConfig);
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Dynamic Circle Position based on Mouse
  // We want it to move opposite to the mouse
  const circleX = useSpring(useTransform(() => mousePos.x, [0, 1], ['70%', '10%']), springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-outfit overflow-x-hidden selection:bg-[#E5E5E5]">
      
      {/* FIXED HEADER */}
      <nav className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-10 md:px-24 z-[100] bg-white/90 backdrop-blur-2xl border-b border-black/5">
         <div className="flex items-center gap-6 group cursor-pointer">
            <Link to="/" className="text-xl font-black tracking-[-0.04em] text-black uppercase">kaksha</Link>
         </div>
         <div className="hidden md:flex items-center gap-10 font-black text-[9px] tracking-[0.2em] opacity-40 uppercase">
            <Link to="/about" className="opacity-100">About</Link>
            <a href="#" className="hover:opacity-100 transition-opacity">Education</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Support</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Community</a>
         </div>
         <div className="flex items-center gap-3">
            <Link
               to="/login"
               className="flex items-center gap-2 font-black text-[9px] uppercase tracking-[0.3em] bg-transparent text-black px-6 py-2.5 rounded-full border border-black/10 hover:border-black/30 hover:bg-black/5 transition-all"
            >
               Login <ArrowUpRight size={12} />
            </Link>
            <Link
               to="/signup"
               className="flex items-center gap-2 font-black text-[9px] uppercase tracking-[0.3em] bg-black text-white px-6 py-2.5 rounded-full hover:bg-[#694AFF] transition-all"
            >
               Signup <ArrowUpRight size={12} />
            </Link>
         </div>
      </nav>

      {/* 1. HERO SECTION - INTELLIGENT REVEAL */}
      <section className="relative h-screen flex flex-col items-center justify-center px-10 text-center bg-white overflow-hidden">
         
         {/* INTERACTIVE BACKGROUND CIRCLE */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
               animate={{ 
                  x: (0.5 - mousePos.x) * 120 + 'vw',
                  y: (0.5 - mousePos.y) * 40 + 'vh'
               }}
               transition={{ type: "spring", stiffness: 40, damping: 20 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] md:w-[25vw] md:h-[25vw] rounded-full bg-black/40 blur-[60px]"
            />
            {/* Minimal backdrop semicircle */}
            <div className="absolute -left-[5vw] top-1/2 -translate-y-1/2 w-[15vw] h-[30vw] rounded-r-full bg-black/20 blur-[40px]"></div>
         </div>

         {/* Background Procedural Grid */}
         <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }}></div>
         
         <motion.div 
            style={{ y: yHero, opacity: opacityHero }}
            className="relative z-10 flex flex-col items-center max-w-4xl"
         >
            <motion.span 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 0.3, y: 0 }}
               transition={{ duration: 1, delay: 0.5 }}
               className="text-[9px] font-black uppercase mb-10 block tracking-[0.5em]"
            >
               The Disha Creation
            </motion.span>
            
            <div className="flex flex-col items-center overflow-hidden">
               <motion.h1 
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="text-[4.5rem] md:text-[7.5rem] font-black leading-[0.85] tracking-[-0.06em] uppercase italic"
               >
                  The Art
               </motion.h1>
               <motion.h1 
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="text-[4.5rem] md:text-[7.5rem] font-black leading-[0.85] tracking-[-0.06em] uppercase italic mb-10"
               >
                  of Study.
               </motion.h1>
            </div>
            
            <motion.p 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 0.4, y: 0 }}
               transition={{ duration: 1.2, delay: 1 }}
               className="text-lg md:text-xl font-bold max-w-2xl leading-relaxed tracking-tight"
            >
               Powered by intelligence. Guided by aesthetics. Kaksha transforms your chaotic raw data into structured academic masterpieces with procedural precision.
            </motion.p>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 2, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
         >
            <ChevronDown size={24} className="animate-bounce" />
         </motion.div>
      </section>

      {/* 2. THE VISION - ALGORITHMIC DRAFTING (Architecture 01) */}
      <section className="relative bg-[#F9F9F9] py-48 md:py-80 px-10 md:px-24 overflow-hidden">
         {/* Decorative Background Technical Text */}
         <div className="absolute top-20 right-[-10%] text-[15vw] font-black text-black/[0.02] select-none pointer-events-none uppercase italic">
            Precision
         </div>

         <div className="max-w-[1500px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
               
               {/* PRODUCT STUDIO PREVIEW (6/12 columns) - SCALED DOWN VERSION */}
               <div className="lg:col-span-12 xl:col-span-7 relative group flex justify-center items-center py-10 min-h-[420px]">
                  {/* Cinematic Background Elements */}
                  <div className="absolute inset-0 bg-[#F2F2F2] rounded-[2.5rem] shadow-inner overflow-hidden border border-black/5">
                     <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#694AFF]/5 via-transparent to-transparent blur-[100px]"></div>
                  </div>

                  <motion.div 
                     initial={{ scale: 0.9, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                     className="relative z-20 flex items-center justify-center w-full h-full"
                  >
                     {/* The iPhone Mockup - Scaled for Better Fit */}
                     <div className="relative w-[180px] md:w-[210px] aspect-[9/19.5] bg-[#0A0A0A] rounded-[2.8rem] p-2.5 shadow-[0_40px_80px_rgba(0,0,0,0.2)] border-[6px] border-[#1A1A1A] overflow-hidden group/product">
                        {/* Realistic Glass Reflection Overlay */}
                        <div className="absolute inset-0 z-50 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40 group-hover/product:opacity-20 transition-opacity"></div>
                        
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-20 bg-[#1A1A1A] rounded-b-xl z-50"></div>
                        
                        {/* Image Slideshow (AI Manifestation) - Dynamic Gallery */}
                        <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-black">
                           {/* Layered Crossfade Slideshow */}
                           <div className="absolute inset-0 z-10">
                              {[
                                 "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074",
                                 "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064",
                                 "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1974",
                                 "https://images.unsplash.com/photo-1625314887424-9f190599bd56?q=80&w=1974"
                              ].map((img, i) => (
                                 <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ 
                                       opacity: [0, 1, 1, 0],
                                       scale: [1.1, 1, 1, 1.05]
                                    }}
                                    transition={{ 
                                       duration: 12, 
                                       repeat: Infinity, 
                                       delay: i * 12,
                                       ease: "easeInOut",
                                       times: [0, 0.2, 0.8, 1]
                                    }}
                                    className="absolute inset-0"
                                 >
                                    <img src={img} className="w-full h-full object-cover brightness-[0.4] contrast-125" alt="AI Context" />
                                 </motion.div>
                              ))}
                              {/* Dark Overlay for Text Legibility */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 z-20"></div>
                           </div>

                           {/* Brand Overlay (High Contrast) */}
                           <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-40 flex justify-center pointer-events-none">
                              <motion.span 
                                 animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                 className="text-white text-[12px] md:text-[14px] font-black uppercase tracking-[0.6em] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] italic"
                              >
                                 kaksha.io
                              </motion.span>
                           </div>
                        </div>
                     </div>

                     {/* Floating UI Chips - Highlighting Kaksha Features (Cursor-Reactive) */}
                     {[
                        { label: "Analysing...", top: "15%", left: "8%", delay: 0 },
                        { label: "Transcription", top: "45%", left: "10%", delay: 1.5 },
                        { label: "PDF Parsing", bottom: "15%", left: "12%", delay: 0.8 },
                        { label: "Flashcards", bottom: "12%", right: "32%", delay: 2 }, // Repositioned for visibility
                        { label: "Synthesis", bottom: "35%", right: "12%", delay: 1 },
                        { label: "Quiz Builder", top: "15%", right: "12%", delay: 0.4 },
                        { label: "Brain Map", top: "40%", right: "15%", delay: 1.2 }
                     ].map((chip, i) => (
                        <motion.div
                           key={i}
                           animate={{ y: [0, -10, 0] }}
                           whileHover={{ scale: 1.1, x: (i % 2 === 0 ? 10 : -10), y: (i % 2 === 0 ? -10 : 10) }}
                           transition={{ duration: 5, repeat: Infinity, delay: chip.delay, ease: "easeInOut" }}
                           className="absolute hidden xl:flex items-center gap-2 bg-white/95 backdrop-blur-xl border border-black/5 px-3 py-1.5 rounded-full shadow-sm z-30 whitespace-nowrap cursor-pointer transition-shadow hover:shadow-lg"
                           style={{ top: chip.top, bottom: chip.bottom, left: chip.left, right: chip.right }}
                        >
                           <span className="w-1 h-1 rounded-full bg-[#694AFF]"></span>
                           <span className="text-[7px] font-black uppercase tracking-widest opacity-60 text-black">{chip.label}</span>
                        </motion.div>
                     ))}
                  </motion.div>

                  {/* Technical HUD Overlay (Scaled down) */}
                  <div className="absolute top-8 left-8 z-30 flex flex-col gap-1.5 text-[7px] font-black uppercase text-black/20 tracking-[0.3em] pointer-events-none">
                     <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#694AFF] animate-pulse"></span>
                        <span className="text-black/40">Neural_Live</span>
                     </div>
                     <span>Core: 0x229AF</span>
                  </div>

                  {/* Floating Metric Card (Positioned inside the Bottom-Right) */}
                  <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-40 pointer-events-none">
                     <motion.div 
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-black text-white p-6 md:p-8 rounded-[2.2rem] shadow-2xl border border-white/10 flex flex-col gap-2 scale-90 md:scale-100 origin-bottom-right"
                     >
                        <span className="text-[7px] font-bold uppercase opacity-30 tracking-[0.5em]">Network Accuracy</span>
                        <div className="flex items-end gap-2 leading-none">
                           <span className="text-3xl md:text-4xl font-black italic tracking-tighter">99.8%</span>
                           <ArrowUpRight size={18} className="text-[#694AFF] mb-1.5" />
                        </div>
                     </motion.div>
                  </div>
               </div>

               {/* CONTENT BOX (5/12 columns) */}
               <div className="lg:col-span-5 flex flex-col items-start lg:pl-10">
                  <div className="flex items-center gap-4 mb-10">
                     <span className="h-[1px] w-12 bg-black/10"></span>
                     <span className="text-black/30 font-black text-[9px] tracking-[0.4em] uppercase">Architecture 01</span>
                  </div>

                  <h2 className="text-[3rem] md:text-[5rem] font-black leading-[0.85] tracking-[-0.05em] mb-12 italic uppercase">
                     <span className="block font-normal not-italic opacity-30 text-[0.6em] mb-2 tracking-normal">Drafted with</span>
                     AI Precision.
                  </h2>

                  <p className="text-lg md:text-xl font-bold opacity-30 leading-relaxed tracking-tight mb-20">
                     Kaksha began as an experiment in cognitive efficiency. We built a system that doesn't just record; it understands.
                     <br /><br />
                     Every generated summary and flashcard is synthesized with the precision an AI applies to its most complex neural architectures.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12 w-full pt-16 border-t border-black/5">
                     <div className="flex flex-col gap-1">
                        <span className="text-4xl font-black italic tracking-tighter">100k+</span>
                        <span className="text-[9px] font-black uppercase opacity-20 tracking-widest leading-loose">Masterpieces Synced</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-4xl font-black italic tracking-tighter text-[#694AFF]">Global.</span>
                        <span className="text-[9px] font-black uppercase opacity-20 tracking-widest leading-loose">Neural Accuracy</span>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* 3. THE PILLARS - NEURAL NETWORK EDITION */}
      <section className="relative py-32 md:py-56 px-10 md:px-24 bg-[#0A0A0A] text-[#F2F0E7]">
         <div className="max-w-[1500px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
               <h2 className="text-[3rem] md:text-[4.5rem] font-black italic uppercase tracking-tighter leading-[0.9]">
                  The <br/> Pillars.
               </h2>
               <p className="text-base font-bold opacity-20 max-w-xs tracking-tight text-right uppercase leading-relaxed">
                  Our system is built on cognitive principles that define the next generation of study.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                  { title: "Synthesis", desc: "We take the entropic chaos of lecture audio and distill it into elegant, structured knowledge graphs.", icon: <Palette size={24} /> },
                  { title: "Verification", desc: "Academic rigor is at our core. Every fact is cross-referenced through advanced model hallucination checks.", icon: <PenTool size={24} /> },
                  { title: "Universal", desc: "Knowledge is global. Our AI breaks language barriers to empower every student on the planet.", icon: <Globe size={24} /> }
               ].map((item, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1, duration: 0.8 }}
                     whileHover={{ y: -10, backgroundColor: "#151515" }}
                     className="p-10 rounded-[2.5rem] bg-[#111111] border border-white/5 transition-all duration-500 group cursor-default"
                  >
                     <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                        {item.icon}
                     </div>
                     <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tighter">{item.title}</h3>
                     <p className="text-sm font-bold opacity-30 leading-relaxed tracking-tight group-hover:opacity-100 transition-opacity duration-500">{item.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. FINAL CTA - DEPLOY THE INTELLECT */}
      <section className="py-48 flex flex-col items-center justify-center px-10 text-center bg-white text-black relative overflow-hidden">
         <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
         >
            <span className="text-[9px] font-black uppercase tracking-[0.5em] mb-10 opacity-30">The Future is Generative</span>
            <h2 className="text-[3rem] md:text-[5rem] font-bold leading-[0.9] tracking-[-0.04em] mb-16 uppercase italic">
               Join the <br /> Creation.
            </h2>
            
            <Link to="/signup" className="group flex flex-col items-center gap-8">
               <div className="w-32 h-32 rounded-full border-[6px] border-black flex items-center justify-center group-hover:bg-black transition-all duration-700 shadow-lg overflow-hidden relative">
                  <motion.div 
                     animate={{ y: [0, -80, 0] }}
                     transition={{ duration: 3, repeat: Infinity }}
                  >
                     <ArrowUpRight size={48} className="group-hover:text-white transition-colors" strokeWidth={3} />
                  </motion.div>
               </div>
               <span className="text-lg font-black uppercase tracking-[0.4em] italic">Deploy the IntellecT</span>
            </Link>
         </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-10 md:px-24 border-t border-black/5 bg-[#F9F9F9] flex flex-col md:flex-row justify-between items-center gap-8 text-black/20">
         <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
            <span className="text-xl font-black tracking-tighter uppercase italic text-black/60">kaksha</span>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase">The Art Studio of AI Learning.</span>
         </div>
         <div className="flex gap-10 font-black text-[9px] uppercase tracking-[0.2em]">
            <Link to="/" className="hover:text-black transition-colors">Surface</Link>
            <Link to="/login" className="hover:text-black transition-colors">Sketch</Link>
            <Link to="/signup" className="hover:text-black transition-colors">Masterpiece</Link>
         </div>
      </footer>
    </div>
  );
};

export default AboutUs;



