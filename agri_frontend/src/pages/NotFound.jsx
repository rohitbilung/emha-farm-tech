import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Home, Trash2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-12 rounded-3xl shadow-xl border border-stone-100 max-w-md"
      >
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trash2 size={40} className="text-green-700" />
        </div>
        
        <h1 className="text-8xl font-black text-stone-200 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Oops! Harvest Not Found</h2>
        <p className="text-stone-500 mb-8 leading-relaxed">
          It looks like the page you are looking for has been moved or doesn't exist in our fields.
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg hover:shadow-green-500/30"
        >
          <Home size={18} />
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}