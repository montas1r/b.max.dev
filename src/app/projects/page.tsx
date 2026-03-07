"use client";

import React, { useState, useEffect } from 'react';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectDetail } from '@/components/portfolio/ProjectDetail';
import { AddProjectDialog } from '@/components/portfolio/AddProjectDialog';
import { PortfolioItem } from '@/types/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Loader2, LayoutGrid } from 'lucide-react';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const db = useFirestore();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const projectsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: projects, loading } = useCollection<PortfolioItem>(projectsQuery);

  return (
    <main className="container mx-auto px-6 md:px-12 max-w-6xl py-20 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tighter">
            My <span className="text-primary">Projects</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A dynamic collection of my technical builds and professional works.
          </p>
        </div>
        <AddProjectDialog />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse uppercase tracking-widest text-xs">
            Fetching documents...
          </p>
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {projects.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <ProjectCard item={item} onClick={setSelectedProject} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-32 border border-dashed border-border rounded-2xl bg-card/20"
        >
          <LayoutGrid className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground italic mb-6">No projects found in the cloud.</p>
          <AddProjectDialog />
        </motion.div>
      )}

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
              &copy; {year} Built with Firestore & Next.js
            </p>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <a href="https://github.com/montas1r" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/montasir-karim-bd7/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="https://twitter.com/_m0n7asir_" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
