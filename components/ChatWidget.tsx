import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { generateResponse } from '../services/gemini';

interface Message {
    role: 'user' | 'assistant';
    text: string;
}

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
            const responseText = await generateResponse(userMsg);
            setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I encountered an error." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-80 md:w-96 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
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

            {/* Chat Toggle Button - Styled to match Header CTA (White Pill) */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition-colors group shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:animate-pulse" />}
            </motion.button>
        </div>
    );
};

export default ChatWidget;