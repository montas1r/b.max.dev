
"use client";

import React, { useState, useEffect } from 'react';
import { Hero } from '@/components/portfolio/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', id: 'home' },
];

export default function PortfolioPage() {
  const [year, setYear] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Background blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] electric-blur opacity-10 pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] electric-blur opacity-5 pointer-events-none z-0" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md px-4 py-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <h2 className="font-headline font-bold text-xl tracking-tight">
              b.<span className="text-primary">max</span>.dev
            </h2>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-all hover:text-primary relative py-1",
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" 
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Availability Badge */}
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full border border-border">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Open for work
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border mt-4 py-4 overflow-hidden"
            >
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "text-sm font-bold uppercase tracking-widest py-2 px-2 rounded-lg transition-all",
                      activeSection === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-[80vh] flex items-center">
          <Hero />
        </section>

        <footer className="py-12 border-t border-border mt-20 opacity-60">
          <div className="flex flex-col md:row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <h2 className="font-headline text-lg font-bold">b.max.dev</h2>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                &copy; {year} Crafted with technical precision.
              </p>
            </div>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
