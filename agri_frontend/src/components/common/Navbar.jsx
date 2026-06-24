import { useState } from 'react';
import { Leaf, Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthModal } from '../../forms/AuthModel';

export default function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Define which links show up where
  // 'all' means it shows everywhere, 'home' means only on the landing page
  const navLinks = [
    { name: 'Home', path: '/', type: 'link', showOn: 'all' },
    { name: 'About', path: '#about', type: 'anchor', showOn: 'home' },
    { name: 'Products', path: '/products', type: 'link', showOn: 'all' },
    { name: 'Contact', path: '#contact', type: 'anchor', showOn: 'home' },
  ];

  // Filter the links based on current path
  const visibleLinks = navLinks.filter(link =>
    link.showOn === 'all' || (isHomePage && link.showOn === 'home')
  );

  const closeAll = () => {
    setIsMobileNavOpen(false);
    setIsAuthOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={closeAll} className="flex items-center gap-2 text-green-700 font-bold text-2xl">
            {/* <Leaf fill="currentColor" /> */}
            <img
              // src="https://res.cloudinary.com/dxatj7ogd/image/upload/v1773898926/uploads/ybx6wjknehf7cyzzujmn.png"
              src="https://res.cloudinary.com/dxatj7ogd/image/upload/v1774332863/uploads/ozcesk4eeoqqnmg7vlwg.png"
              alt="EmhaFarm Logo"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Desktop Links (Dynamically Filtered) */}
          <div className="hidden md:flex gap-8 font-medium text-stone-600">
            {visibleLinks.map((link) => (
              link.type === 'anchor' ? (
                <a key={link.name} href={link.path} className="hover:text-green-600 transition">
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} to={link.path} className="hover:text-green-600 transition">
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Actions Area */}
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="p-2 rounded-full bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition-all duration-300"
            >
              <User size={24} />
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              className="md:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-full transition"
              onClick={() => {
                setIsMobileNavOpen(!isMobileNavOpen);
                setIsAuthOpen(false);
              }}
            >
              {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION LINKS */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-stone-100 absolute left-0 w-full overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6 font-semibold text-stone-700">
                {visibleLinks.map((link) => (
                  link.type === 'anchor' ? (
                    <a key={link.name} href={link.path} onClick={closeAll} className="hover:text-green-600">
                      {link.name}
                    </a>
                  ) : (
                    <Link key={link.name} to={link.path} onClick={closeAll} className="hover:text-green-600">
                      {link.name}
                    </Link>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background overlay */}
        {(isAuthOpen || isMobileNavOpen) && (
          <div
            className="fixed inset-0 z-[-1] bg-black/5"
            onClick={closeAll}
          />
        )}
      </nav>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}