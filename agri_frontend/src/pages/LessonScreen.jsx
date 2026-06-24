import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Play, ArrowRight, Sparkles } from 'lucide-react';

const IndigenousApp = () => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="min-h-screen bg-[#FDF8F1] text-[#4A3728] p-6 font-serif selection:bg-orange-200">
      {/* Soft, Organic Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="space-y-1">
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-orange-600/70">Language Journey</h2>
          <p className="text-2xl font-black italic">The Morning Sun</p>
        </div>
        <div className="w-12 h-12 rounded-full border-2 border-[#4A3728] flex items-center justify-center bg-white shadow-[4px_4px_0px_0px_rgba(74,55,40,1)]">
          <span className="font-bold">12</span>
        </div>
      </header>

      <main className="max-w-md mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, rotate: -2, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, rotate: -5 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-white border-[3px] border-[#4A3728] rounded-[2rem] p-8 shadow-[8px_8px_0px_0px_rgba(74,55,40,1)] relative overflow-hidden"
          >
            {/* Decorative Background Blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-6">
                VOCABULARY
              </span>

              <div className="flex flex-col items-center gap-6 mb-10">
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 bg-[#4A3728] rounded-3xl flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform"
                >
                  <Play fill="currentColor" size={40} />
                </motion.div>
                
                <div className="text-center">
                  <h3 className="text-4xl font-black mb-2 tracking-tight underline decoration-orange-300 decoration-4">
                    Nya:wëh
                  </h3>
                  <p className="text-lg text-gray-500 italic">"Thank you"</p>
                </div>
              </div>

              {/* Unique Interaction: Recording Pulse */}
              <div className="space-y-4">
                <p className="text-center text-sm font-medium opacity-60">Tap to practice speaking</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-6 rounded-2xl bg-white border-2 border-dashed border-[#4A3728] flex items-center justify-center gap-3 hover:bg-orange-50 transition-colors group"
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <Mic className="group-hover:text-orange-600" />
                  <span className="font-bold uppercase tracking-widest text-sm">Record</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-4 mt-12">
          {[0, 1, 2].map((i) => (
            <button 
              key={i}
              onClick={() => setActiveCard(i)}
              className={`h-2 rounded-full transition-all duration-500 ${activeCard === i ? 'w-8 bg-[#4A3728]' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>
      </main>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ y: -5 }}
        className="fixed bottom-10 right-10 bg-orange-500 text-white p-5 rounded-full shadow-[6px_6px_0px_0px_rgba(74,55,40,1)] border-2 border-[#4A3728]"
      >
        <ArrowRight size={28} strokeWidth={3} />
      </motion.button>
    </div>
  );
};

export default IndigenousApp;