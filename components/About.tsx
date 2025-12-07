import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="py-24 md:py-32 px-4 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">About Me</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Engineering excellence, delivering impact.
          </h3>
          <p className="text-secondary text-lg leading-relaxed mb-6">
            As the CEO of <strong>Desk Work Solution (DWS)</strong>, I lead a team of passionate developers and creative minds dedicated to building world-class software. My focus is on bridging the gap between complex business requirements and user-friendly digital solutions.
          </p>
          <p className="text-secondary text-lg leading-relaxed">
            From enterprise-grade ERP systems to cutting-edge mobile applications, my mission is to empower organizations with technology that drives growth, efficiency, and innovation.
          </p>
          
          <div className="mt-8 flex gap-8">
            <div>
              <span className="block text-3xl font-bold text-white">50+</span>
              <span className="text-sm text-secondary">Projects Delivered</span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-white">Global</span>
              <span className="text-sm text-secondary">Client Base</span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-white">100%</span>
              <span className="text-sm text-secondary">Commitment</span>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface relative z-10 border border-white/5">
                <img 
                    src="https://images.unsplash.com/photo-1553877616-1521346f3ac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                    alt="Coding" 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-white/10 rounded-2xl -z-0 hidden md:block"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;