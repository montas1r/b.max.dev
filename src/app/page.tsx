"use client";

import React, { useState, useEffect } from 'react';
import { Hero } from '@/components/portfolio/Hero';

export default function HomePage() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <main className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
      <section className="min-h-[80vh] flex items-center">
        <Hero />
      </section>

      <footer className="py-12 border-t border-border mt-20 opacity-60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
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
  );
}
