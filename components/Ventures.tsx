import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Venture } from '../types';

const ventures: Venture[] = [
  {
    id: '1',
    name: 'Desk Work Solution',
    role: 'Founder & CEO',
    description: 'A premier software house specializing in custom web development, mobile apps, and enterprise digital transformation.',
    tags: ['Software Development', 'IT Consultancy', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: 'https://deskworksol.com/'
  },
  {
    id: '2',
    name: 'Enterprise ERP System',
    role: 'Lead Architect',
    description: 'A comprehensive resource planning tool built for manufacturing logistics, improving operational efficiency by 40%.',
    tags: ['SaaS', 'B2B', 'Cloud'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'FinTech Mobile App',
    role: 'Product Owner',
    description: 'Secure and intuitive mobile banking application developed for a client, featuring real-time transactions.',
    tags: ['FinTech', 'Mobile App', 'Security'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'E-Commerce Platform',
    role: 'Development Lead',
    description: 'Scalable multi-vendor marketplace solution capable of handling high-volume traffic and transactions.',
    tags: ['E-Commerce', 'Web Dev', 'Scalability'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const Ventures: React.FC = () => {
  return (
    // Reduced vertical padding (py-24 -> py-20)
    <div className="py-16 md:py-20 bg-surface/30">
      {/* Reduced max-w-7xl to max-w-6xl for tighter desktop view */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-14 md:flex justify-between items-end"
        >
          <div>
            <h2 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Ventures</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Featured Work</h3>
          </div>
          <button className="hidden md:flex items-center gap-2 text-secondary hover:text-white transition-colors mt-4 md:mt-0 group">
            <a href="https://deskworksol.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Visit Company Website <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </button>
        </motion.div>

        {/* Grid remains responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ventures.map((venture, index) => (
            <motion.div
              key={venture.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative bg-background border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={venture.image} 
                  alt={venture.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-1">{venture.name}</h4>
                    <p className="text-xs md:text-sm text-accent font-medium">{venture.role}</p>
                  </div>
                  {venture.link && (
                      <a href={venture.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full text-white/50 group-hover:text-white group-hover:bg-white/10 transition-colors">
                        <ExternalLink size={20} />
                      </a>
                  )}
                </div>
                <p className="text-sm text-secondary mb-6 line-clamp-2">{venture.description}</p>
                <div className="flex flex-wrap gap-2">
                  {venture.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-3 py-1 bg-white/5 rounded-full text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
             <a href="https://deskworksol.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full gap-2 text-white border border-white/10 py-4 rounded-xl">
                Visit DWS Website <ArrowRight size={16} />
            </a>
        </div>
      </div>
    </div>
  );
};

export default Ventures;
