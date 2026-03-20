import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero({ index, setIndex, slideImages }) {
  return (
    <section id="home" className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slideImages[index]})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <motion.h1
          key={`title-${index}`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
        >
          {index === 0 && "Rooted in Nature"}
          {index === 1 && "Freshly Harvested"}
          {index === 2 && "Handpicked Quality"}
        </motion.h1>

        <div className="flex gap-4 justify-center">
          <Link to="/products" className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full font-bold transition-all shadow-lg">
            Our Products
          </Link>
          <Link to="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 px-8 py-3 rounded-full font-bold transition-all">
            Learn More
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 flex gap-2 z-20">
        {slideImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 transition-all duration-300 rounded-full ${i === index ? "w-8 bg-green-500" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}