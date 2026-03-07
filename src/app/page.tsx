"use client";

import React, { useState, useEffect } from 'react';
import { AliasDisplay } from '@/components/portfolio/AliasDisplay';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectDetail } from '@/components/portfolio/ProjectDetail';
import { AppSidebar } from '@/components/portfolio/AppSidebar';
import { portfolioItems } from '@/lib/data';
import { PortfolioItem, PortfolioCategory } from '@/types/portfolio';
import { motion } from 'framer-motion';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

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
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background selection:bg-primary selection:text-primary-foreground">
        <AppSidebar />
        
        <SidebarInset className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Background blobs */}
          <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] electric-blur opacity-10 pointer-events-none z-0" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] electric-blur opacity-5 pointer-events-none z-0" />

          {/* Sticky Header with Sidebar Toggle */}
          <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-colors" />
              <div className="h-4 w-px bg-border hidden md:block" />
              <h2 className="font-headline font-bold text-lg tracking-tight hidden md:block">
                b.<span className="text-primary">max</span>.dev
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
               {/* Mobile only logo/title */}
               <h2 className="font-headline font-bold text-sm tracking-tight md:hidden">
                b.<span className="text-primary">max</span>.dev
              </h2>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full border border-border">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Available for hire
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex flex-col items-center justify-center p-8">
              <div className="container mx-auto max-w-5xl z-10">
                <AliasDisplay />
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="mt-12 flex flex-col md:flex-row gap-6 md:items-center"
                >
                  <div className="h-px bg-border flex-1" />
                  <p className="text-muted-foreground text-sm max-w-md text-center md:text-left leading-relaxed">
                    Building systems that matter. Obsessed with elegant code, intuitive user experiences, and the intersection of hardware and software.
                  </p>
                </motion.div>
              </div>
            </section>

            <main className="container mx-auto px-6 md:px-12 pb-32 max-w-7xl space-y-32 z-10 relative">
              {categories.map((category) => {
                const id = category.toLowerCase().replace(' ', '-');
                const items = portfolioItems.filter(item => item.category === category);
                
                if (items.length === 0) return null;

                return (
                  <section key={category} id={id} className="scroll-mt-24">
                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
                      <div className="space-y-2">
                        <h2 className="text-4xl font-headline font-bold text-foreground">
                          {category}
                        </h2>
                        <div className="w-12 h-1 bg-primary rounded-full" />
                      </div>
                      <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.3em]">
                        {items.length} {items.length === 1 ? 'Project' : 'Projects'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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

            <footer className="container mx-auto px-8 py-12 border-t border-border mt-20 z-10 relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex flex-col items-center md:items-start gap-2">
                  <h2 className="font-headline text-lg font-bold">b.max.dev</h2>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    &copy; {year} Crafted with precision.
                  </p>
                </div>
                
                <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors">Github</a>
                  <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                </div>
              </div>
            </footer>
          </div>
        </SidebarInset>
      </div>

      <ProjectDetail 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </SidebarProvider>
  );
}
