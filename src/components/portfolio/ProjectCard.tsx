"use client";

import React from 'react';
import Image from 'next/image';
import { PortfolioItem } from '@/types/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
}

export function ProjectCard({ item, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card 
        className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col"
        onClick={() => onClick(item)}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="mb-4 flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="bg-secondary/50 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-headline font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {item.description}
          </p>
          <div className="mt-auto flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
            VIEW DETAILS
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}