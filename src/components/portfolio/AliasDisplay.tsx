"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function AliasDisplay() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group cursor-default select-none">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`font-headline text-6xl md:text-8xl font-bold tracking-tighter alias-glow transition-all duration-300 ${glitch ? 'skew-x-2 translate-x-1' : ''}`}
      >
        <span className="text-foreground">b.</span>
        <span className="text-primary">max</span>
        <span className="text-foreground">.dev</span>
      </motion.h1>
      
      {/* Decorative dots */}
      <div className="absolute -top-4 -right-4 flex gap-1">
        <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-primary/20 animate-pulse delay-75" />
        <div className="w-2 h-2 rounded-full bg-primary/10 animate-pulse delay-150" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs md:text-sm text-center md:text-left"
      >
        Digital Architect & Creative Developer
      </motion.p>
    </div>
  );
}