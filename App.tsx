import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Ventures from './components/Ventures';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import { Linkedin, Github, Twitter } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-primary selection:bg-accent selection:text-white overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <Header />
      
      <main className="relative z-10">
        <section id="home" className="scroll-mt-32">
          <Hero />
        </section>
        
        <section id="about" className="scroll-mt-32">
          <About />
        </section>
        
        <section id="ventures" className="scroll-mt-32">
          <Ventures />
        </section>

        <section id="philosophy" className="scroll-mt-32">
          <Philosophy />
        </section>

        <section id="contact" className="scroll-mt-32">
          <Contact />
        </section>
      </main>

      <ChatWidget />
      
      <footer className="relative z-10 py-12 text-center text-secondary border-t border-white/5 bg-background">
        <div className="flex justify-center gap-6 mb-6">
            <a href="https://www.linkedin.com/in/azizmughal/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all duration-300">
                <Linkedin size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all duration-300">
                <Github size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all duration-300">
                <Twitter size={20} />
            </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Aziz Mughal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;