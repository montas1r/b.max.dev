
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';

export function Hero() {
  const handleEmailClick = () => {
    window.location.href = "mailto:hello@bmax.dev";
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center p-8 text-center md:text-left md:items-start max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
          Full-Stack Developer
        </span>
        <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter mb-6">
          Hi, I'm <span className="text-primary">B. Max</span>.
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
          I build scalable web applications with a focus on user experience and technical precision.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="group gap-2 px-8" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button size="lg" variant="outline" onClick={handleEmailClick} className="gap-2 px-8">
            <Mail className="w-4 h-4" />
            Get In Touch
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
