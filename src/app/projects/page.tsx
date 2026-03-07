"use client";

import React, { useState, useEffect } from 'react';
import { portfolioItems } from '@/lib/data';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectDetail } from '@/components/portfolio/ProjectDetail';
import { PortfolioItem } from '@/types/portfolio';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <main className="container mx-auto px-6 md:px-12 max-w-6xl py-20 relative z-10">
      <div className="mb-16 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tighter">
          Selected <span className="text-primary">Works</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A showcase of projects that define my technical expertise and problem-solving approach.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <ProjectCard item={item} onClick={setSelectedProject} />
          </motion.div>
        ))}
      </div>

      <ProjectDetail 
        item={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

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
