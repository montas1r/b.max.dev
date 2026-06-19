"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, Shield, ShieldCheck } from 'lucide-react';
import { useUser } from '@/supabase';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  
];

export function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isAdmin = user && !user.isAnonymous;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto max-w-6xl px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <h2 className="font-headline font-bold text-xl tracking-tight">
            b.<span className="text-primary">max</span>.dev
          </h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-all hover:text-primary relative py-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeNavTab" 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" 
                  />
                )}
              </Link>
            );
          })}
          
          <Link 
            href="/admin" 
            className={cn(
              "flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors",
              isAdmin ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            {isAdmin ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
            {isAdmin ? "Admin" : "Login"}
          </Link>
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
            className="md:hidden border-t border-border mt-4 py-4 overflow-hidden bg-background"
          >
            <nav className="flex flex-col gap-2 px-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-sm font-bold uppercase tracking-widest py-3 px-4 rounded-lg transition-all",
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-widest py-3 px-4 rounded-lg text-primary bg-primary/5"
              >
                Admin Access
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}