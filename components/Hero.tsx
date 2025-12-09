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

  // Parallax transforms - Reduced range for a less dramatic (smaller) feel
  const xBackground = useTransform(xSpring, [-0.5, 0.5], [-15, 15]); // Was -20, 20
  const yBackground = useTransform(ySpring, [-0.5, 0.5], [-15, 15]); // Was -20, 20
  const xContent = useTransform(xSpring, [-0.5, 0.5], [-7, 7]); // Was -10, 10
  const yContent = useTransform(ySpring, [-0.5, 0.5], [-7, 7]); // Was -10, 10
  
  // Scroll effects
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <div 
      ref={ref} 
      // Adjusted min-h-screen for better mobile view (full viewport height)
      className="relative min-h-[calc(100vh-60px)] md:min-h-screen flex items-start pt-28 md:pt-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
        {/* Background Grid & Ambience with Parallax */}
        <motion.div 
            style={{ x: xBackground, y: yBackground }}
            className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        >
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             {/* Reduced blur size for tighter feel */}
             <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[100px]"></div> {/* Was 600px, 120px blur */}
             <div className="absolute left-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[80px]"></div> {/* Was 500px, 100px blur */}
        </motion.div>

        {/* Reduced max-w-7xl to max-w-6xl for tighter desktop view */}
        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Column: Text Content - UPDATED: order-2 md:order-1 */}
            <motion.div 
                style={{ opacity, y, x: xContent }}
                className="text-left order-2 md:order-1" // Text is SECOND on mobile (bottom)
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
                    
                    {/* Headline: Aziz Mughal. on one line */}
                    <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold mb-6 md:mb-7 tracking-tight leading-tight">
                        <span className="text-white">Aziz</span>
                        <span className="text-secondary/60"> Mughal.</span>
                    </h1>
                    
                    {/* Adjusted text size for responsiveness */}
                    <p className="text-base md:text-lg text-secondary mb-8 leading-relaxed max-w-xl">
                        Driving digital transformation and engineering excellence as the founder of Desk Work Solution. Building the future, one line of code at a time.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-6 py-3 md:px-8 md:py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-lg hover:shadow-white/20 text-sm md:text-base"
                        >
                            About Me
                        </button>
                        <a 
                            href="https://deskworksol.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-6 py-3 md:px-8 md:py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm text-sm md:text-base"
                        >
                            Visit DWS <ExternalLink size={18} />
                        </a>
                        {/* LinkedIn Icon Button */}
                        <a 
                            href="https://www.linkedin.com/in/azizmughal/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-4 py-3 md:px-4 md:py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm text-sm md:text-base"
                        >
                            <Linkedin size={18} />
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Right Column: Profile Image - UPDATED: order-1 md:order-2 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ x: useTransform(xSpring, [-0.5, 0.5], [15, -15]), y: useTransform(ySpring, [-0.5, 0.5], [15, -15]) }}
                className="order-1 md:order-2 flex justify-center md:justify-end py-10" // Image is FIRST on mobile (top)
            >
                {/* UPDATED: Mobile size is now w-56 h-56 (smaller) */}
                <div className="relative w-56 h-56 md:w-80 md:h-80 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
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
                            <p className="text-sm font-bold text-white">Building Businesses</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>

        
    </div>
  );
};

export default Hero;
