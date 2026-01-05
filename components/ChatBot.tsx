'use client';

import { useChat } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBot() {
  // CONFIG: Kita kembali ke metode standar (handleSubmit)
  // Kita tambahkan 'as any' untuk menghindari error TypeScript yang kamu alami sebelumnya
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    onError: (error: any) => {
      console.error("Chat Error:", error);
      alert("Gagal terhubung. Cek console (F12) untuk detail.");
    },
  } as any) as any;
  
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke bawah
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // FUNGSI PENGIRIM MANUAL (SOLUSI APPEND MISSING)
  // Kita paksa panggil handleSubmit dengan event palsu
  const handleSendManual = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input || input.trim() === '') return;

    try {
      // Membuat objek event palsu agar handleSubmit mau berjalan
      const mockEvent = { preventDefault: () => {} };
      handleSubmit(mockEvent);
    } catch (err) {
      console.error("Gagal submit:", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-zinc-950 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold text-sm">AI Assistant</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:text-zinc-300" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 p-4 bg-zinc-50 dark:bg-zinc-950/50">
              <div className="flex flex-col gap-4">
                {messages.length === 0 && (
                  <div className="text-center text-zinc-500 text-sm mt-10">
                    <p>👋 Halo! Ada yang bisa saya bantu tentang materi ini?</p>
                  </div>
                )}
                
                {/* Render Messages */}
                {messages.map((m: any, index: number) => (
                  <div key={m.id || index} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                        m.role === 'user'
                          ? 'bg-zinc-900 text-white rounded-br-none'
                          : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                
                {/* Indikator Loading */}
                {isLoading && (
                   <div className="flex justify-start">
                     <div className="bg-zinc-100 rounded-2xl px-4 py-2 text-xs text-zinc-500 flex items-center gap-2">
                       <Loader2 className="w-3 h-3 animate-spin" />
                       Sedang berpikir...
                     </div>
                   </div>
                )}

                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <form onSubmit={handleSendManual} className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange} // Gunakan handler bawaan
                placeholder="Tanya sesuatu..."
                className="flex-1 focus-visible:ring-zinc-400"
                disabled={isLoading} 
              />
              <Button 
                type="submit" // Trigger form onSubmit
                size="icon" 
                disabled={!input || input.trim() === '' || isLoading} 
                className="bg-zinc-900 hover:bg-zinc-800 text-white"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-zinc-900 text-white shadow-lg flex items-center justify-center hover:bg-zinc-800 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
