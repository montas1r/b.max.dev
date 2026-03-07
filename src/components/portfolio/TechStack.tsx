"use client";

import React from 'react';
import { techStack } from '@/lib/data';
import { motion } from 'framer-motion';

export function TechStack() {
  return (
    <section id="stack" className="py-24 scroll-mt-24">
      <div className="mb-12">
        <h2 className="text-3xl font-headline font-bold mb-4">The Tech Stack</h2>
        <div className="w-12 h-1 bg-primary rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {techStack.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold text-primary uppercase tracking-widest mb-6">
              {group.category}
            </h3>
            <ul className="space-y-3">
              {group.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
