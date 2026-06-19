"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ProjectDetail } from '@/components/portfolio/ProjectDetail';
import { AddProjectDialog } from '@/components/portfolio/AddProjectDialog';
import { EditProjectDialog } from '@/components/portfolio/EditProjectDialog';
import { DeleteProjectDialog } from '@/components/portfolio/DeleteProjectDialog';
import { PortfolioItem } from '@/types/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/supabase/provider'; 
import { Loader2, LayoutGrid } from 'lucide-react';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null);
  const [deletingProject, setDeletingProject] = useState<PortfolioItem | null>(null);
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [year, setYear] = useState<number | null>(null);

  const { user, supabase } = useUser();
  const isAdmin = !!user;

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // [FIXED] Abstracted into a stable, reusable function using useCallback
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false }); 

      if (error) {
        console.error("Supabase query details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(error.message);
      }
      
      setProjects((data as PortfolioItem[]) || []);
    } catch (err: any) {
      console.error("Error fetching projects from Supabase:", err?.message || err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Initial fetch execution on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
        {/* [FIXED] Pass fetchProjects to handle fresh renders after creating items */}
        {isAdmin && <AddProjectDialog onSuccess={fetchProjects} />}
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
                <ProjectCard 
                  item={item} 
                  onClick={setSelectedProject} 
                  onEdit={isAdmin ? setEditingProject : undefined}
                  onDelete={isAdmin ? setDeletingProject : undefined}
                />
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
          {isAdmin && <AddProjectDialog onSuccess={fetchProjects} />}
        </motion.div>
      )}

      <ProjectDetail 
        item={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        onEdit={isAdmin ? (item) => {
          setSelectedProject(null);
          setEditingProject(item);
        } : undefined}
        onDelete={isAdmin ? (item) => {
          setSelectedProject(null);
          setDeletingProject(item);
        } : undefined}
      />

      {isAdmin && (
        <>
          {/* [FIXED] Wired up onSuccess tracking for both mutation dialogues */}
          <EditProjectDialog 
            project={editingProject}
            isOpen={!!editingProject}
            onOpenChange={(open) => !open && setEditingProject(null)}
            onSuccess={fetchProjects}
          />

          <DeleteProjectDialog 
            project={deletingProject}
            isOpen={!!deletingProject}
            onOpenChange={(open) => !open && setDeletingProject(null)}
            onSuccess={fetchProjects}
          />
        </>
      )}

      <footer className="py-12 border-t border-border mt-20 opacity-60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="font-headline text-lg font-bold">b.max.dev</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              &copy; {year} Built with Supabase & Next.js
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