import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion'; // Added useMotionValue for drag
import { ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
// --- Types & Data ---

interface Venture {
  id: string;
  name: string;
  role: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
}

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

// --- Hooks (Kept as is) ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  return isMobile;
};

const useVisibleItems = () => {
  const [visibleItems, setVisibleItems] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return visibleItems;
};

// --- Component ---
const MotionImage = motion.img;
const Ventures: React.FC = () => {
  const isMobile = useIsMobile();
  const visibleItems = useVisibleItems();
  const carouselRef = useRef<HTMLDivElement>(null); // Ref for carousel bounds

  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // DRAG / TOUCH State
  const x = useMotionValue(0); // Motion value for tracking drag
  const [isDragging, setIsDragging] = useState(false);

  // Duplicate ventures array for seamless infinite loop (3 sets)
  const duplicatedVentures = [...ventures, ...ventures, ...ventures];

  // Auto-scroll logic - SLIDE, STOP, SLIDE
  useEffect(() => {
    if (isPaused || isDragging) return; // Stop if paused or currently dragging

    // Total time for one cycle: 1.0s (slide) + 1.0s (stop) = 2.0s
    const slideDuration = 1000; 
    const pauseDuration = 1000;
    const intervalTime = slideDuration + pauseDuration;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        // Keep moving forward until the end of the first set (ventures.length)
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  // Navigation Logic
  const nextSlide = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev + 1));
  };
  
  const prevSlide = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => {
      // Allow going into the "negative" space of the duplicated array (for seamless prev)
      if (prev <= 0) {
        // Jump back to the equivalent position in the second set
        return ventures.length - 1; 
      }
      return prev - 1;
    });
  };

  // --- Drag / Swipe Handlers ---
  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    setIsPaused(true); // Pause auto-scroll after a manual drag

    const dragThreshold = 50; // Pixels needed to trigger a slide

    if (info.offset.x > dragThreshold) {
      // Dragged right (prev slide)
      prevSlide();
    } else if (info.offset.x < -dragThreshold) {
      // Dragged left (next slide)
      nextSlide();
    } 
    // If not past the threshold, the current index will be re-applied on the next animation cycle.
  };

  // Transitions
  const mobileTransition = { duration: 0.7, delay: 0.3 };
  const desktopTransition = { duration: 0.0 };
  const carouselTransition = { 
    type: "tween",
    ease: "easeInOut",
    duration: 1.0 // Slower duration for slide-stop-slide effect
  };

  // Calculate the X offset percentage based on the current index
  const xOffset = `-${currentIndex * (100 / visibleItems)}%`;

  return (
    <div className="py-16 md:py-20 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          // Centered Header for Mobile/Small Screens
          className="mb-12 md:mb-14 flex flex-col md:flex-row justify-between items-center md:items-end" 
        >
          {/* Centering the text on small screens */}
          <div className="text-center md:text-left"> 
            <h2 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Ventures</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Featured Work</h3>
          </div>
          
          {/* Desktop Controls (Kept as is) */}
          <div className="hidden md:flex items-center gap-6"> 
             <div className="flex gap-2">
                <button 
                   onClick={prevSlide}
                  className="p-3 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 text-white transition-all active:scale-95"
                  aria-label="Previous Slide"
                >
                  <ArrowLeft size={20} />
                </button>
                <button 
                   onClick={nextSlide}
                  className="p-3 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 text-white transition-all active:scale-95"
                  aria-label="Next Slide"
                >
                  <ArrowRight size={20} />
                </button>
             </div>
            <button className="flex items-center gap-2 text-secondary hover:text-white transition-colors group">
              <a href="https://deskworksol.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Visit Company Website <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </button>
          </div>
        </motion.div>

        {/* --- Carousel Container --- */}
        <div 
           className="relative group/slider"
           onMouseEnter={() => setIsPaused(true)}
           onMouseLeave={() => setIsPaused(false)}
        >
          {/* Mobile Navigation Arrows (Can be kept or removed if relying only on swipe) */}
          <div className="md:hidden absolute top-1/2 -translate-y-1/2 left-0 z-20">
            <button onClick={prevSlide} className="p-2 bg-black/50 backdrop-blur-sm rounded-r-lg text-white border border-l-0 border-white/10">
              <ArrowLeft size={20} />
            </button>
          </div>
          <div className="md:hidden absolute top-1/2 -translate-y-1/2 right-0 z-20">
            <button onClick={nextSlide} className="p-2 bg-black/50 backdrop-blur-sm rounded-l-lg text-white border border-r-0 border-white/10">
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Slider Track Wrapper */}
          <div className="overflow-hidden" ref={carouselRef}>
            <motion.div
              className="flex cursor-grab"
              animate={{ x: xOffset }} // Use calculated offset
              transition={carouselTransition} // Use new 1.0s transition
              style={{ x }} // Bind Framer Motion X value for dragging
              drag="x" // Enable horizontal dragging
              dragConstraints={{ left: 0, right: 0 }} // Limits: not needed since we calculate the slide
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              onAnimationComplete={() => {
                // Seamless Looping: When we pass the first set of ventures, reset the index
                if (currentIndex >= ventures.length) {
                  setCurrentIndex(0);
                }
              }}
            >
              {/* Note: The 'key' now ensures uniqueness across the duplicated array */}
              {duplicatedVentures.map((venture, index) => (
                <div 
                  key={`${venture.id}-${index}`}
                  style={{ width: `${100 / visibleItems}%` }}
                  className="flex-shrink-0 px-3"
                >
                  {/* ... Card Content (Kept as is) ... */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % ventures.length) * 0.1, duration: 0.6 }}
                    className="h-full group relative bg-background border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <MotionImage 
                        src={venture.image}
                        alt={venture.name}
                        initial={{ filter: 'grayscale(100%)' }}
                        whileInView={{ filter: 'grayscale(0%)' }}
                        transition={isMobile ? mobileTransition : desktopTransition}
                        className="w-full h-full object-cover transform                                    group-hover:scale-110                                    transition-transform duration-700                                   md:filter md:grayscale md:group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 md:block hidden bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>
                    <div className="p-6 md:p-8 flex-1 flex flex-col">
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
                      <p className="text-sm text-secondary mb-6 line-clamp-2 flex-grow">{venture.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {venture.tags.map(tag => (
                          <span key={tag} className="text-xs font-medium px-3 py-1 bg-white/5 rounded-full text-secondary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Progress Indicator Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {ventures.map((_, index) => (
              <button
                key={index}
                // Use modulo to correctly highlight the dot based on the full index
                onClick={() => {
                    setIsPaused(true);
                    setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === (currentIndex % ventures.length)
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Footer Link */}
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
