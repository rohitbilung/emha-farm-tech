import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Testimonials({ testimonials }) {
    const [index, setIndex] = useState(0);

    // Auto-slide every 8 seconds
    useEffect(() => {
        if (testimonials.length <= 1) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    if (!testimonials || testimonials.length === 0) return null;

    const current = testimonials[index];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Quote className="mx-auto text-green-100 mb-8" size={80} fill="currentColor" />
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12">What Our Community Says</h2>
                </motion.div>

                <div className="relative min-h-[300px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="w-full"
                        >
                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            
                            <p className="text-xl md:text-2xl text-stone-700 italic leading-relaxed mb-8">
                                "{current.message || current.feedback || current.comments}"
                            </p>
                            
                            <div>
                                <h4 className="font-bold text-stone-900 text-lg">{current.name}</h4>
                                <p className="text-green-600 font-medium">{current.role || 'Verified Customer'}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                {testimonials.length > 1 && (
                    <div className="flex justify-center gap-3 mt-12">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-1.5 transition-all duration-500 rounded-full ${
                                    i === index ? "w-8 bg-green-600" : "w-2 bg-stone-200"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}