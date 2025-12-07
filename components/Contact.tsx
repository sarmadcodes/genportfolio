import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Github, Send, Clock, MapPin, CheckCircle, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "696e8720-284e-45e3-900f-f1512b20c057"); // Ideally keep this safe, or use the public generic one if allowed

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            setIsSuccess(true);
        } else {
            console.error("Form submission failed", result);
        }
    } catch (error) {
        console.error("Error submitting form", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 px-4 bg-gradient-to-b from-transparent to-black/80 relative">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Column: Context */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">Open for opportunities</span>
          </div>
          
          <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">scale?</span>
          </h3>
          
          <p className="text-xl text-secondary mb-10 leading-relaxed max-w-lg">
            My calendar is open for high-impact discussions. Whether you're seeking seed capital or strategic guidance, let's make every second count.
          </p>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4 text-secondary group">
                <div className="p-3 bg-white/5 rounded-xl text-white group-hover:bg-accent group-hover:text-white transition-colors">
                    <Mail size={20} />
                </div>
                <div>
                    <span className="block text-xs uppercase tracking-wider opacity-50 mb-1">Direct Email</span>
                    <a href="mailto:hello@alexsterling.com" className="text-white text-lg font-medium hover:underline">hello@alexsterling.com</a>
                </div>
            </div>
            
            <div className="flex items-start gap-4 text-secondary group">
                <div className="p-3 bg-white/5 rounded-xl text-white group-hover:bg-accent group-hover:text-white transition-colors">
                    <Clock size={20} />
                </div>
                <div>
                    <span className="block text-xs uppercase tracking-wider opacity-50 mb-1">Response Time</span>
                    <span className="text-white text-lg font-medium">Within 24 Hours</span>
                </div>
            </div>

            <div className="flex items-start gap-4 text-secondary group">
                <div className="p-3 bg-white/5 rounded-xl text-white group-hover:bg-accent group-hover:text-white transition-colors">
                    <MapPin size={20} />
                </div>
                <div>
                    <span className="block text-xs uppercase tracking-wider opacity-50 mb-1">Base</span>
                    <span className="text-white text-lg font-medium">San Francisco / New York</span>
                </div>
            </div>
          </div>

          <div className="flex gap-4">
            {[
              { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/azizmughal/" },
              { icon: <Twitter size={20} />, href: "#" },
              { icon: <Github size={20} />, href: "#" },
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-surface text-secondary hover:text-white hover:bg-white/10 transition-all hover:-translate-y-1 border border-white/5"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#121214] border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-6">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                        <CheckCircle size={40} />
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold mb-2">Request Sent!</h4>
                        <p className="text-secondary max-w-xs mx-auto">Thank you for reaching out. I'll review your inquiry and get back to you shortly.</p>
                    </div>
                    <button 
                        onClick={() => setIsSuccess(false)}
                        className="text-sm font-semibold text-white hover:text-accent transition-colors underline"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <>
                    <div className="mb-8">
                        <h4 className="text-2xl font-bold mb-2">Schedule a Meeting</h4>
                        <p className="text-secondary">Please provide details about your inquiry.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input type="hidden" name="subject" value="New Portfolio Inquiry" />
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-secondary font-semibold ml-1">First Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Type here..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-accent focus:bg-white/10 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-secondary font-semibold ml-1">Last Name</label>
                                <input 
                                    type="text" 
                                    name="last_name"
                                    placeholder="Type here..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-accent focus:bg-white/10 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-secondary font-semibold ml-1">Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="john@company.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-accent focus:bg-white/10 transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-secondary font-semibold ml-1">Topic</label>
                            <div className="relative">
                                <select name="topic" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent focus:bg-white/10 transition-all appearance-none cursor-pointer">
                                    <option value="investment" className="bg-[#121214] text-white">Investment Proposal</option>
                                    <option value="speaking" className="bg-[#121214] text-white">Speaking Engagement</option>
                                    <option value="advisory" className="bg-[#121214] text-white">Advisory Role</option>
                                    <option value="other" className="bg-[#121214] text-white">Other Inquiry</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-secondary font-semibold ml-1">Message</label>
                            <textarea 
                                name="message"
                                rows={4}
                                placeholder="How can we work together?"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-accent focus:bg-white/10 transition-all resize-none"
                                required
                            ></textarea>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-white hover:bg-gray-200 text-black font-bold text-lg rounded-xl py-4 mt-2 transition-all active:scale-[0.99] flex items-center justify-center gap-2 group shadow-lg shadow-white/5 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>Processing <Loader2 size={18} className="animate-spin" /></>
                            ) : (
                                <>Confirm Meeting Request <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                            )}
                        </button>
                    </form>
                </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;