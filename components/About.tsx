import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    // Reduced vertical padding (py-32 -> py-24) and max-w-6xl -> max-w-5xl
    <div className="py-16 md:py-24 px-4 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1" // Text first on mobile
        >
          <h2 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">About Me</h2>
          
          {/* *** MODIFIED H3 TO INCLUDE GRADIENT TEXT EFFECT *** */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Engineering excellence, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">delivering impact.</span>
          </h3>
          
          <p className="text-secondary text-base md:text-lg leading-relaxed mb-6">
            As the CEO of <strong>Desk Work Solution (DWS)</strong>, I lead a team of passionate developers and creative minds dedicated to building world-class software. My focus is on bridging the gap between complex business requirements and user-friendly digital solutions.
          </p>
          <p className="text-secondary text-base md:text-lg leading-relaxed">
            From enterprise-grade ERP systems to cutting-edge mobile applications, my mission is to empower organizations with technology that drives growth, efficiency, and innovation.
          </p>
          
          <div className="mt-8 flex gap-8">
            <div>
              <span className="block text-2xl md:text-3xl font-bold text-white">250+</span>
              <span className="text-xs md:text-sm text-secondary">Projects Delivered</span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-bold text-white">Global</span>
              <span className="text-xs md:text-sm text-secondary">Client Base</span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-bold text-white">100%</span>
              <span className="text-xs md:text-sm text-secondary">Commitment</span>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative order-1 md:order-2" // Image second on mobile
        >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface relative z-10 border border-white/5">
                <img 
                    src="https://static.vecteezy.com/system/resources/previews/025/501/052/large_2x/team-of-software-developers-working-on-computers-while-sitting-at-desk-in-modern-office-inside-a-software-company-office-and-workers-rearview-ai-generated-free-photo.jpg" 
                    alt="Coding" 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
            </div>
            {/* Decorative element - Smaller offset on desktop */}
            <div className="absolute -top-6 -right-6 w-full h-full border border-white/10 rounded-2xl -z-0 hidden md:block"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
