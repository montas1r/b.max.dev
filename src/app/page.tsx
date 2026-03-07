"use client";

import React, { useState, useEffect } from 'react';
import { Hero } from '@/components/portfolio/Hero';
import { TechStack } from '@/components/portfolio/TechStack';
import { About } from '@/components/portfolio/About';
import { Contact } from '@/components/portfolio/Contact';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectDetail } from '@/components/portfolio/ProjectDetail';
import { AppSidebar } from '@/components/portfolio/AppSidebar';
import { portfolioItems } from '@/lib/data';
import { PortfolioItem } from '@/types/portfolio';
import { motion } from 'framer-motion';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export default function PortfolioPage() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

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
              <div className="h-4 w-px bg-border" />
              <h2 className="font-headline font-bold text-lg tracking-tight">
                b.<span className="text-primary">max</span>.dev
              </h2>
            </div>
            
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full border border-border">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available for new projects
            </div>
          </header>

          <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
            <main className="container mx-auto px-6 md:px-12 max-w-6xl space-y-16">
              {/* Hero Section */}
              <section id="home" className="scroll-mt-24">
                <Hero />
              </section>

              {/* Selected Projects */}
              <section id="projects" className="py-24 scroll-mt-24">
                <div className="mb-12 border-b border-border pb-6 flex items-end justify-between">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-headline font-bold">Selected Work</h2>
                    <div className="w-12 h-1 bg-primary rounded-full" />
                  </div>
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest hidden sm:block">
                    Proof of concept & live products
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {portfolioItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <ProjectCard item={item} onClick={setSelectedItem} />
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Tech Stack */}
              <TechStack />

              {/* About Snippet */}
              <About />

              {/* Contact & Footer */}
              <Contact />

              <footer className="py-12 border-t border-border mt-20 opacity-60">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <h2 className="font-headline text-lg font-bold">b.max.dev</h2>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      &copy; {year} Crafted with technical precision.
                    </p>
                  </div>
                  <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                    <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                  </div>
                </div>
              </footer>
            </main>
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
