"use client";

import React from 'react';
import Image from 'next/image';
import { PortfolioItem } from '@/types/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Globe } from 'lucide-react';

interface ProjectCardProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
}

export function ProjectCard({ item, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col"
        onClick={() => onClick(item)}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
             <div className="flex gap-4">
               {item.liveUrl && (
                 <a 
                   href={item.liveUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   onClick={(e) => e.stopPropagation()}
                   className="text-primary hover:text-primary-foreground bg-primary/10 hover:bg-primary p-2 rounded-full transition-all"
                 >
                    <Globe className="w-5 h-5" />
                 </a>
               )}
               {item.links?.map(link => (
                 <a 
                   key={link.label}
                   href={link.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   onClick={(e) => e.stopPropagation()}
                   className="text-primary hover:text-primary-foreground bg-primary/10 hover:bg-primary p-2 rounded-full transition-all"
                 >
                    {link.label === 'GitHub' ? <Github className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                 </a>
               ))}
             </div>
          </div>
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="mb-4 flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="bg-secondary/50 text-[10px] uppercase tracking-wider">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-headline font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 italic">
            {item.description}
          </p>
          
          <div className="space-y-3 mt-2 border-t border-border pt-4">
            {item.problem && (
              <div className="text-[11px]">
                <span className="font-bold text-primary uppercase mr-2">Problem:</span>
                <span className="text-muted-foreground">{item.problem}</span>
              </div>
            )}
          </div>
          
          <div className="mt-auto pt-6 flex items-center text-xs font-bold text-primary uppercase tracking-widest group-hover:translate-x-1 transition-transform">
            Read Case Study
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}