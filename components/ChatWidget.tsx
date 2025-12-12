import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    text: string;
}

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
);

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', text: "Hello! I'm the AI Assistant for Aziz mughal. Ask me about Desk Work Solution (DWS), our software services, or how to schedule a consultation." }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isLoading]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg = inputValue;
        setInputValue('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            // Simulated response for demo
            setTimeout(() => {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    text: "Thank you for your message! This is a demo response. In production, this would connect to your AI service." 
                }]);
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I encountered an error." }]);
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    const handleWhatsAppClick = () => {
        const phoneNumber = '923313103442';
        const message = encodeURIComponent('Hi, I would like to connect with you!');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-2 w-72 sm:w-72 md:w-80 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[400px] sm:h-[450px]"
                    >
                        {/* Chat Header */}
                        <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Sparkles size={16} className="text-accent" />
                                <span className="font-semibold text-sm">Aziz's Assistant</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-secondary hover:text-white">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                                            msg.role === 'user'
                                                ? 'bg-white text-black rounded-tr-none'
                                                : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            
                            {/* Typing Indicator */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-1.5 w-fit">
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/5 border-t border-white/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about DWS or Aziz's..."
                                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent/50 transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/10 hover:bg-accent text-white rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-white/10"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WhatsApp Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                className="p-3 md:p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20BA5A] transition-colors group shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                title="Contact via WhatsApp"
            >
                <WhatsAppIcon size={24} />
            </motion.button>

            {/* Chat Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 md:p-4 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition-colors group shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                title="Open AI Chat"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:animate-pulse" />}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
