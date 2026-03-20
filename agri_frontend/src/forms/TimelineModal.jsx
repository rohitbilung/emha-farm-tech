import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const TimelineModal = ({ isOpen, onClose, batch }) => {
  if (!batch) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden z-20 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
              <div>
                <h2 className="text-xl font-black text-stone-900 uppercase tracking-tighter">Product Timeline</h2>
                <p className="text-xs font-bold text-green-600 font-mono">{batch.batchId} — {batch.productName}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition text-stone-400"><X /></button>
            </div>

            {/* Scrollable Timeline */}
            <div className="p-10 overflow-y-auto custom-scrollbar">
              <div className="relative border-l-2 border-dashed border-stone-200 ml-4 space-y-12">
                {batch.timeline.length > 0 ? (
                  batch.timeline.map((step, index) => (
                    <div key={index} className="relative pl-10">
                      {/* Stepper Icon */}
                      <div className={`absolute -left-[13px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${index === 0 ? 'bg-green-500' : 'bg-stone-300'}`}>
                        {index === 0 && <CheckCircle2 size={12} className="text-white" />}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded">
                              {step.stage}
                            </span>
                            <span className="text-xs font-bold text-stone-400 flex items-center gap-1">
                              <Calendar size={12} /> {step.date}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-stone-800 leading-relaxed mb-3">
                            {step.desc}
                          </p>
                        </div>

                        {/* Media Preview */}
                        {step.media && step.media !== "..." && (
                          <div className="w-36 h-36 rounded-2xl overflow-hidden border border-stone-100 shadow-sm flex-shrink-0 bg-stone-50">
                            {/* Check if the URL ends in a common video format */}
                            {step.media.match(/\.(mp4|webm|ogg)$/i) ? (
                              <video
                                src={step.media}
                                className="w-full h-full object-cover"
                                muted
                                loop
                                playsInline
                                onMouseOver={e => e.target.play()}
                                onMouseOut={e => e.target.pause()}
                              />
                            ) : (
                              <img
                                src={step.media}
                                alt={step.stage}
                                className="w-full h-full object-cover hover:scale-110 transition duration-500"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))) : (
                  <div className="flex flex-col items-center justify-center py-10 px-6">
                    {/* A decorative element representing an empty path */}
                    <div className="flex flex-col items-center gap-1 mb-4">
                      <div className="w-1 h-1 rounded-full bg-stone-400" />
                      <div className="w-px h-8 bg-gradient-to-b from-stone-400 to-transparent" />
                    </div>

                    <div className="text-center">
                      <p className="text-[25px] font-black text-stone-400 uppercase tracking-[0.2em]">
                        Journey Pending
                      </p>
                      <p className="text-s font-medium text-stone-500 mt-1 italic">
                        No timeline stages have been recorded yet.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Information */}
            <div className="p-6 bg-stone-50 border-t border-stone-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <MapPin size={18} className="text-stone-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Farm Origin</p>
                <p className="text-xs font-bold text-stone-700">{batch.farmName}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TimelineModal;