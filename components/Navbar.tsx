
import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-10'}`}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="#" className="text-xl font-bold tracking-tighter text-white hover:scale-105 transition-transform group">
              SB<span className="text-indigo-500 group-hover:text-sky-400 transition-colors">.</span>
            </a>
            {PERSONAL_INFO.isAvailable && (
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 animate-fade-in">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-emerald-500/90 whitespace-nowrap">Available</span>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 hover:text-white transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Shabbir_Badsha_CV.pdf"
              className="px-6 py-2.5 bg-white text-slate-950 text-[9px] font-bold uppercase tracking-widest rounded-full hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
            >
              Get CV
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl text-slate-300`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#020617] z-[99] flex flex-col items-center justify-center space-y-10 transition-all duration-700 md:hidden ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl font-black tracking-tighter text-slate-300 hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
        <a
          href={PERSONAL_INFO.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          download="Shabbir_Badsha_CV.pdf"
          onClick={() => setIsMenuOpen(false)}
          className="px-10 py-4 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-2xl shadow-indigo-500/20"
        >
          Get CV
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
