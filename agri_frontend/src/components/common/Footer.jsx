import React from 'react';
import { Leaf, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-800 text-stone-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

        {/* Column 1: Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-2xl">
            <Leaf className="text-green-500" fill="currentColor" size={28} />
            <span>EmhaFarm</span>
          </div>
          <p className="text-sm leading-relaxed text-stone-400">
            Nurturing the earth to provide you with the pure organic products.
            Sustainable farming for a healthier generation.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#home" className="hover:text-green-500 transition">Our Farm</a></li>
            <li><Link to="/products" className="hover:text-green-500 transition">Harvest Shop</Link></li>
            <li><a href="#" className="hover:text-green-500 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-500 transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-6">Manufacturing Unit</h4>
          <ul className="space-y-3 text-sm text-stone-400">
            <li>Kunmuru , Jharbeda </li>
            <li>Rajgangpur, Sundergarh</li>
            <li>Odisha - 770070</li>
            <li><p className="text-sm leading-relaxed text-stone-400">
              emhafarm2026@gmail.com<br />
              +91 8984273765
            </p></li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h4 className="text-white font-bold mb-6">Follow the Growth</h4>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, link: '#' },
              { Icon: Facebook, link: '#' },
              { Icon: Youtube, link: '#' }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.link}
                whileHover={{ y: -5, scale: 1.1 }}
                className="bg-stone-800 p-3 rounded-full hover:bg-green-600 hover:text-white transition-colors"
              >
                <social.Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-400 mx-auto my-6"></div>
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider uppercase">
        <p>© {currentYear} EmhaFarm Pvt. Ltd. All rights reserved.</p>

        <div className="flex items-center gap-1">
          <span>Made with</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Heart size={14} className="text-red-500" fill="currentColor" />
          </motion.div>
          <span>by</span>
          <a href="https://redbilung.in/" target='_blank' className="text-white hover:text-green-500 transition font-bold underline underline-offset-4">
            RedBilung
          </a>
        </div>
      </div>
    </footer>
  );
}