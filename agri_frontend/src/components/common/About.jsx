import { motion } from 'framer-motion';
import { CheckCircle, Leaf, ShieldCheck, Zap } from 'lucide-react';

export default function About() {
  const highlights = [
    { icon: <Leaf size={24} className="text-green-600" />, text: "Regenerative Farming" },
    { icon: <ShieldCheck size={24} className="text-green-600" />, text: "Full Traceability" },
    { icon: <Zap size={24} className="text-green-600" />, text: "Tech-Driven Ag" },
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Visuals */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative grid grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <img 
              src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=600" 
              alt="Farmer" 
              className="rounded-3xl h-64 w-full object-cover shadow-lg mt-12"
            />
            <img 
              src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=600" 
              alt="Farmer" 
              className="rounded-3xl h-64 w-full object-cover shadow-lg mt-12"
            />
          </div>
          <div className="space-y-4">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600" 
              alt="The Field" 
              className="rounded-3xl h-[450px] w-full object-cover shadow-lg"
            />
            <div className="bg-green-600 p-8 rounded-3xl text-white">
              <h4 className="text-4xl font-bold mb-2">100%</h4>
              <p className="text-green-100 text-sm font-medium uppercase tracking-wider">Organic Certified Standards</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Narrative */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-green-600 font-bold tracking-widest uppercase text-sm">About EMHAFARM PVT LTD</span>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-4 mb-6 leading-tight">
            The Future of Agriculture <br />
            <span className="text-stone-400 font-medium">Starts with the Soil</span>
          </h2>
          
          <p className="text-stone-600 text-lg leading-relaxed mb-6">
            EMHAFARM is a pioneering technology-driven agricultural entity dedicated to closing the gap between the farm and the fork. We believe that transparency shouldn't be a luxury—it should be the standard for every household.
          </p>

          {/* UNIFIED MISSION & VISION BLOCK */}
          <div className="bg-stone-50 border-l-4 border-green-600 p-8 rounded-r-3xl mb-10 shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-3 italic">Our Mission & Vision</h3>
            <p className="text-stone-700 leading-relaxed">
              "EMHAFARM envisions building a technology-driven organic farming ecosystem that empowers 
              farmers, delivers healthy and fully traceable food to consumers, and regenerates the environment for 
              future generations. Our mission is to enable farmers to adopt sustainable organic practices through 
              technology, training, and infrastructure, improve soil health and farm productivity, ensure fair 
              market access, and provide transparent farm-to-fork traceability—creating a profitable, sustainable, 
              and trustworthy agricultural system..............."
            </p>
          </div>

          {/* Values Icons */}
          <div className="grid sm:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="bg-white shadow-sm border border-stone-100 w-12 h-12 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="text-stone-900 font-bold text-sm leading-tight">{item.text}</p>
              </div>
            ))}
          </div>

          {/* <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 bg-stone-900 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-green-700 transition-colors"
          >
            Read Our Full Story
          </motion.button> */}
        </motion.div>

      </div>
    </section>
  );
}