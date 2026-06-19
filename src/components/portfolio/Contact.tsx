"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, Twitter, FileDown } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 scroll-mt-24 border-t border-border">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-headline font-bold mb-6">Get In Touch</h2>
        <p className="text-muted-foreground mb-10 text-lg">
          I'm currently available for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open.
        </p>
        
        <div className="flex flex-col items-center gap-8">
          <a 
            href="mailto:hello@bmax.dev" 
            className="text-2xl md:text-4xl font-headline font-bold hover:text-primary transition-colors underline decoration-primary/30 underline-offset-8"
          >
            hello@bmax.dev
          </a>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="gap-2" asChild>
              <a href="#"><FileDown className="w-4 h-4" /> Download CV</a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href="https://github.com/montas1r" target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" /></a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href="https://www.linkedin.com/in/montasir-karim-bd7/" target="_blank" rel="noopener noreferrer"><Linkedin className="w-4 h-4" /></a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href="https://twitter.com/_m0n7asir_" target="_blank" rel="noopener noreferrer"><Twitter className="w-4 h-4" /></a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}