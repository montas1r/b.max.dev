"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="py-24 scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-headline font-bold mb-6">The Human Behind the Code</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              My journey started with a curiosity for how things work, from disassembling mechanical watches to building my first static website in 2015. Today, I'm a developer who believes that perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.
            </p>
            <p>
              I specialize in bridging the gap between complex backend architectures and intuitive, pixel-perfect frontends. Clean code isn't just a preference—it's my philosophy for building sustainable systems.
            </p>
            <p>
              When I'm not in front of a terminal, you'll likely find me soldering custom split mechanical keyboards or exploring mountain trails.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="aspect-square rounded-2xl bg-secondary/30 border border-border flex items-center justify-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
          <div className="text-primary/20 font-headline text-9xl font-bold select-none">B.M</div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="p-4 rounded-lg bg-background/80 backdrop-blur-md border border-border">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Current Focus</p>
              <p className="text-sm font-medium">Distributed AI Workflows</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
