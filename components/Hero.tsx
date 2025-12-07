import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, Globe, ExternalLink } from 'lucide-react';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Mouse parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate normalized position (-0.5 to 0.5)
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  // Smooth out the mouse movement
  const xSpring = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const ySpring = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Parallax transforms
  const xBackground = useTransform(xSpring, [-0.5, 0.5], [-20, 20]);
  const yBackground = useTransform(ySpring, [-0.5, 0.5], [-20, 20]);
  const xContent = useTransform(xSpring, [-0.5, 0.5], [-10, 10]);
  const yContent = useTransform(ySpring, [-0.5, 0.5], [-10, 10]);
  
  // Scroll effects
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <div 
      ref={ref} 
      // UPDATED: items-start and pt-16 md:pt-32 to move content higher and align to top
      className="relative min-h-screen flex items-start pt-16 md:pt-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
        {/* Background Grid & Ambience with Parallax */}
        <motion.div 
            style={{ x: xBackground, y: yBackground }}
            className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        >
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-500/20 blur-[120px]"></div>
             <div className="absolute left-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Column: Text Content */}
            <motion.div 
                style={{ opacity, y, x: xContent }}
                className="text-left order-1"
            >
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* UPDATED: Added 'hidden' for mobile, 'md:inline-block' for desktop */}
                    <div className="hidden md:inline-block px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="text-xs md:text-sm font-semibold text-accent uppercase tracking-widest">
                            CEO • Tech Innovator • Leader
                        </span>
                    </div>
                    
                    {/* Name Size Reduced: elegant and balanced */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-7 tracking-tight leading-tight">
                        <span className="block text-white">Aziz</span>
                        <span className="block text-secondary/60">Mughal.</span>
                    </h1>
                    
                    <p className="text-lg text-secondary mb-8 leading-relaxed max-w-xl">
                        Driving digital transformation and engineering excellence as the founder of Desk Work Solution. Building the future, one line of code at a time.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-lg hover:shadow-white/20"
                        >
                            About Me
                        </button>
                        <a 
                            href="https://deskworksol.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm"
                        >
                            Visit DWS <ExternalLink size={18} />
                        </a>
                    </div>

                    <div className="flex gap-6 mt-12 opacity-60">
                        <a href="https://www.linkedin.com/in/azizmughal/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={24} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Github size={24} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={24} /></a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Right Column: Profile Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ x: useTransform(xSpring, [-0.5, 0.5], [15, -15]), y: useTransform(ySpring, [-0.5, 0.5], [15, -15]) }}
                className="order-2 flex justify-center md:justify-end"
            >
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                    {/* Glassmorphic Container */}
                    <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-sm transform rotate-3"></div>
                    <div className="absolute inset-0 bg-surface border border-white/5 rounded-[2rem] overflow-hidden transform -rotate-2 shadow-2xl">
                         <img 
                            src="https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg" 
                            alt="Aziz Mughal" 
                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform"
                        />
                    </div>
                    
                    {/* Floating Badge */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3"
                    >
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div>
                            <p className="text-xs text-secondary uppercase tracking-wider">Status</p>
                            <p className="text-sm font-bold text-white">Building DWS</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            style={{ opacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-secondary flex flex-col items-center gap-2"
        >
            <span className="text-xs uppercase tracking-widest opacity-50">Scroll</span>
            <ArrowDown size={16} className="animate-bounce" />
        </motion.div>
    </div>
  );
};

export default Hero;