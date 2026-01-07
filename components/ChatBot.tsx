'use client';

// KITA HAPUS TOTAL DEPENDENCY KE LIBRARY 'AI' YANG RUSAK
// import { useChat } from '@ai-sdk/react';  <-- HAPUS INI
// import { useChat } from 'ai/react';       <-- HAPUS INI

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Definisi tipe pesan sederhana
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot() {
  // --- MANUAL STATE MANAGEMENT (PENGGANTI useChat) ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // ---------------------------------------------------

  const [isOpen, setIsOpen] = useState(false);
  const [textInput, setTextInput] = useState(''); 
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke bawah saat ada pesan baru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // --- FUNGSI KIRIM MANUAL (FETCH API STANDAR) ---
  const handleSend = async () => {
    if (!textInput.trim() || isLoading) return;

    const userContent = textInput;
    setTextInput(''); // Kosongkan input

    // 1. Masukkan pesan user ke state lokal segera
    const newUserMessage: Message = { role: 'user', content: userContent };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // 2. Kirim ke API Route Anda
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Gagal terhubung ke server.');
      }

      if (!response.body) return;

      // 3. Siapkan pesan balasan kosong dari Assistant
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      // 4. Baca Stream (Streaming Text Response)
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        
        if (value) {
          const chunkValue = decoder.decode(value, { stream: true });
          
          // Update pesan terakhir (assistant) dengan potongan teks baru
          setMessages((prev) => {
            const updatedMessages = [...prev];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            
            // Pastikan kita mengupdate pesan assistant terakhir
            if (lastMessage && lastMessage.role === 'assistant') {
              lastMessage.content += chunkValue;
            }
            return updatedMessages;
          });
        }
      }
    } catch (err) {
      console.error("Manual Fetch Error:", err);
      // Tambahkan pesan error ke chat agar user tahu
      setMessages((prev) => [...prev, { role: 'assistant', content: "⚠️ Maaf, terjadi kesalahan koneksi ke AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
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
            <div className="p-4 bg-zinc-950 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold text-sm">AI Assistant SMI</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:text-zinc-300" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 p-4 bg-zinc-50 dark:bg-zinc-950/50">
              <div className="flex flex-col gap-4">
                {messages.length === 0 && (
                  <div className="text-center text-zinc-500 text-sm mt-10 px-4">
                    <p>👋 Halo! Bingung dengan materi kuliah atau coding? Tanyakan saja di sini!</p>
                  </div>
                )}
                
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-zinc-900 text-white rounded-br-none'
                          : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {/* Render content */}
                      {m.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                   <div className="flex justify-start">
                     <div className="bg-zinc-100 rounded-2xl px-4 py-2 text-xs text-zinc-500 flex items-center gap-2">
                       <Loader2 className="w-3 h-3 animate-spin" />
                       Sedang mengetik...
                     </div>
                   </div>
                )}

                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex gap-2 shrink-0">
              <Input
                autoFocus
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanya sesuatu..."
                className="flex-1 focus-visible:ring-zinc-400"
                // PASTIKAN TIDAK ADA DISABLED DI SINI
              />
              <Button 
                onClick={handleSend} 
                size="icon" 
                disabled={!textInput.trim() || isLoading} 
                className="bg-zinc-900 hover:bg-zinc-800 text-white shrink-0"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-zinc-900 text-white shadow-lg flex items-center justify-center hover:bg-zinc-800 transition-colors z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}