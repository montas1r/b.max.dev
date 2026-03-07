"use client";

import React, { useState, useEffect } from 'react';
import { AliasDisplay } from '@/components/portfolio/AliasDisplay';
import { SectionNav } from '@/components/portfolio/SectionNav';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectDetail } from '@/components/portfolio/ProjectDetail';
import { portfolioItems } from '@/lib/data';
import { PortfolioItem, PortfolioCategory } from '@/types/portfolio';
import { motion } from 'framer-motion';

const categories: PortfolioCategory[] = [
  'Continuous Works',
  'Build Projects',
  'Skills Learning',
  'Works',
  'Hobbies'
];

export default function PortfolioPage() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleOpenDetail = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] electric-blur opacity-20 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] electric-blur opacity-10 pointer-events-none" />

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="container mx-auto max-w-6xl">
          <AliasDisplay />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex flex-col md:flex-row gap-6 md:items-center"
          >
            <div className="h-px bg-border flex-1" />
            <p className="text-muted-foreground text-sm max-w-md">
              Building systems that matter. Obsessed with elegant code, intuitive user experiences, and the intersection of hardware and software.
            </p>
          </motion.div>
        </div>
      </header>

      <SectionNav />

      <main className="container mx-auto px-4 py-20 max-w-6xl space-y-32">
        {categories.map((category) => {
          const id = category.toLowerCase().replace(' ', '-');
          const items = portfolioItems.filter(item => item.category === category);
          
          if (items.length === 0) return null;

          return (
            <section key={category} id={id} className="scroll-mt-24">
              <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-4xl font-headline font-bold text-foreground">
                    {category}
                  </h2>
                  <div className="w-12 h-1 bg-primary rounded-full" />
                </div>
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
                  {items.length} {items.length === 1 ? 'Entry' : 'Entries'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <ProjectCard item={item} onClick={handleOpenDetail} />
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="container mx-auto px-4 py-12 border-t border-border mt-20 text-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-headline text-xl font-bold">b.max.dev</h2>
          <div className="flex gap-4 text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            &copy; {year} b.max.dev. Crafted with precision.
          </p>
        </div>
      </footer>

      <ProjectDetail 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}
