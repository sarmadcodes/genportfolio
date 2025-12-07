import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Users, Zap } from 'lucide-react';

const principles = [
  {
    title: 'First Principles Thinking',
    description: 'Deconstruct problems to their fundamental truths and build up from there, avoiding the trap of analogy.',
    icon: <Lightbulb size={24} />
  },
  {
    title: 'Long-Term Games',
    description: 'Compound interest applies to relationships and knowledge, not just money. We play for decades, not quarters.',
    icon: <Target size={24} />
  },
  {
    title: 'Radical Candor',
    description: 'Growth happens when we care personally but challenge directly. Truth is the ultimate efficiency.',
    icon: <Users size={24} />
  },
  {
    title: 'Velocity over Speed',
    description: 'Speed is distance over time. Velocity is speed with direction. We move fast, but with purpose.',
    icon: <Zap size={24} />
  }
];

const Philosophy: React.FC = () => {
  return (
    <div className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Philosophy</h2>
        <h3 className="text-3xl md:text-5xl font-bold">How I Operate</h3>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {principles.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="p-6 bg-surface/50 border border-white/5 rounded-2xl hover:bg-surface transition-colors"
          >
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h4 className="text-xl font-bold mb-3">{item.title}</h4>
            <p className="text-secondary text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Philosophy;