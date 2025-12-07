import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Ventures', href: '#ventures' },
  { name: 'Philosophy', href: '#philosophy' },
];

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll spy & styling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = [...navLinks.map(link => link.href.substring(1)), 'contact'];
      const scrollPosition = window.scrollY + 300; // Middle of screen offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Pill Header (No change) */}
      <motion.header 
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="fixed top-6 left-1/2 z-50 hidden md:block"
        style={{ x: "-50%" }}
      >
        <div className={`
          flex items-center gap-1 p-2 pl-6 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-2xl
          ${scrolled ? 'bg-black/40 border-white/10' : 'bg-white/5 border-white/5'}
        `}>
          {/* Navigation Links */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                  ${activeSection === link.href.substring(1) ? 'text-white' : 'text-secondary hover:text-white hover:bg-white/5'}
                `}
              >
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </nav>

          <div className="w-px h-6 bg-white/10 mx-2"></div>

          {/* Schedule Button */}
          <button 
             onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
             className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
          >
            <Calendar size={16} />
            <span>Schedule Meeting</span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Header Toggle (Updated) */}
      <div className="fixed top-6 left-0 right-0 z-50 md:hidden px-6">
        <div className="flex justify-between items-center w-full">
            {/* Mobile Badge */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block"
            >
                <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                    <span className="text-xs font-semibold text-accent uppercase tracking-widest text-white/80">
                        CEO • Tech Innovator
                    </span>
                </div>
            </motion.div>
            
            {/* Hamburger Button (Moved to top-right) */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-4 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl text-white"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (No change) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`text-3xl font-bold ${activeSection === link.href.substring(1) ? 'text-white' : 'text-secondary'}`}
              >
                {link.name}
              </motion.a>
            ))}
            
             <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                }}
                className="mt-4 flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-bold"
             >
                <Calendar size={20} />
                <span>Schedule Meeting</span>
             </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;